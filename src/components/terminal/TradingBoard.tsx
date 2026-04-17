'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Y-Axis Labels (Prices top to bottom)
const Y_PRICES = [1.10, 1.09, 1.08, 1.07, 1.06, 1.05, 1.04, 1.03, 1.02, 1.01];

const getTimeStr = (baseHours: number, baseMinutes: number, offsets: number) => {
    const totalMinutes = Math.floor(baseHours * 60 + baseMinutes + (offsets * 15));
    const hr = Math.floor(totalMinutes / 60) % 24;
    const min = Math.floor(totalMinutes % 60);
    return `${hr.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
};

export default function TradingBoard() {
    const [positionSize, setPositionSize] = useState<number>(10);
    
    // Core game state
    // We initialize with a long history so the screen is full of past data.
    const [history, setHistory] = useState<number[]>([5, 5, 4, 4, 5, 6, 5]); 
    const historyRef = useRef<number[]>([5, 5, 4, 4, 5, 6, 5]);
    
    const [time, setTime] = useState(0); 
    const reqRef = useRef<number>(0);
    const startRef = useRef<number>(0);

    // Portfolio State
    const [portfolioValue, setPortfolioValue] = useState<number>(100);
    const portfolioRef = useRef<number>(100);

    // Speed of simulation. 1 tick = 2 seconds.
    const TICK_MS = 2000;
    
    const [trades, setTrades] = useState<Record<string, { size: number, px: number, rIdx: number, initialY: number, multiplier: string, result?: 'win' | 'loss' }>>({});
    const tradesRef = useRef(trades);

    useEffect(() => {
        tradesRef.current = trades;
    }, [trades]);

    // High performance gameloop for buttery smooth rendering & collision detection
    useEffect(() => {
        const tickProcess = (timestamp: number) => {
            if (!startRef.current) startRef.current = timestamp;
            const elapsed = timestamp - startRef.current;
            const currentFloatTime = elapsed / TICK_MS;
            
            // Ensure we have enough history generated ahead of the integer time
            const neededTick = Math.floor(currentFloatTime) + 1;
            if (neededTick > historyRef.current.length - 8) { // Buffer of 8
                const lastVal = historyRef.current[historyRef.current.length - 1];
                
                // Create an interesting cyclical/organic price drift so it never stays stuck
                // Waves slowly between -3 and +3 rows of offset
                const trend = Math.sin(timestamp * 0.0002) * 3; 
                const target = 4.5 + trend; 
                const distanceToTarget = target - lastVal;
                
                const p = Math.random();
                let nextVal = lastVal;
                
                // Move towards the cyclical target more frequently than away
                if (distanceToTarget > 0.5) {
                    nextVal += p > 0.4 ? 1 : p > 0.15 ? -1 : 0;
                } else if (distanceToTarget < -0.5) {
                    nextVal += p > 0.4 ? -1 : p > 0.15 ? 1 : 0;
                } else {
                    nextVal += p > 0.3 ? 1 : p > 0.6 ? -1 : 0;
                }

                if (nextVal < 0.5) nextVal = 0.5; // never hard hit edges
                if (nextVal > 8.5) nextVal = 8.5; 
                
                historyRef.current = [...historyRef.current, nextVal];
                setHistory([...historyRef.current]);
            }
            
            // Smooth Interpolator (Same logic as render) to find exact Y of head on this frame
            const headIndexInt = Math.floor(currentFloatTime);
            const frac = currentFloatTime - headIndexInt;
            const y0 = historyRef.current[headIndexInt] ?? 5;
            const y1 = historyRef.current[headIndexInt + 1] ?? y0;
            const smoothFrac = (1 - Math.cos(frac * Math.PI)) / 2;
            const headCurrentYFloat = y0 + (y1 - y0) * smoothFrac;

            // Continuous Collision Detection against Trade Blocks
            const currentTrades = { ...tradesRef.current };
            let modified = false;

            Object.keys(currentTrades).forEach(tKey => {
                const tradeInfo = currentTrades[tKey];
                if (tradeInfo.result) return; // already resolved

                const [tAbsTick, tRIdx] = tKey.split('-').map(Number);
                
                // The head X coordinate is precisely `currentFloatTime` in this unit system.
                // If head is inside the X column space
                if (currentFloatTime >= tAbsTick && currentFloatTime < tAbsTick + 1) {
                    // Check Y overlap
                    if (Math.abs(headCurrentYFloat - tRIdx) <= 0.6) {
                        modified = true;
                        currentTrades[tKey] = { ...tradeInfo, result: 'win' };
                        // Payout!
                        const payout = tradeInfo.size * parseFloat(tradeInfo.multiplier);
                        portfolioRef.current += payout;
                        setPortfolioValue(portfolioRef.current);
                    }
                } 
                // If head misses and completely passes the X column
                else if (currentFloatTime >= tAbsTick + 1) {
                    modified = true;
                    currentTrades[tKey] = { ...tradeInfo, result: 'loss' };
                }
            });

            // Demo Rescue Condition: if you lose it all, reset once board clears
            if (portfolioRef.current < 10) {
                const pendingCount = Object.values(currentTrades).filter(t => !t.result).length;
                if (pendingCount === 0) {
                    portfolioRef.current = 100;
                    setPortfolioValue(100);
                }
            }

            if (modified) {
                setTrades(currentTrades);
            }
            
            setTime(currentFloatTime);
            reqRef.current = requestAnimationFrame(tickProcess);
        };
        
        reqRef.current = requestAnimationFrame(tickProcess);
        return () => cancelAnimationFrame(reqRef.current!);
    }, []);

    // Smooth Interpolator Helper
    const getSmoothY = (t: number) => {
        const idx = Math.floor(t);
        const frac = t - idx;
        const y0 = historyRef.current[idx] ?? 5;
        const y1 = historyRef.current[idx + 1] ?? y0;
        const smoothFrac = (1 - Math.cos(frac * Math.PI)) / 2;
        return y0 + (y1 - y0) * smoothFrac;
    };

    const currentHeadY = getSmoothY(time);

    const handleTapTrade = (rIdx: number, cIdx: number, price: number, activeTrade: any, multiplierStr: string) => {
        if (activeTrade) return;
        if (portfolioRef.current < positionSize) return; // Insufficient demo funds
        
        // Deduct from portfolio immediately
        portfolioRef.current -= positionSize;
        setPortfolioValue(portfolioRef.current);

        const key = `${cIdx}-${rIdx}`;
        setTrades(prev => ({
            ...prev,
            [key]: { size: positionSize, px: price, rIdx, initialY: currentHeadY, multiplier: multiplierStr }
        }));
    };

    // Calculate dynamic rendering geometries
    const headIndexInt = Math.floor(time);
    const fractionalProgress = time % 1;
    const windowStartIdx = headIndexInt; 
    
    // Math wrappers
    const rowToY = (val: number) => (val * 10) + 5;
    
    // The head is fixed at exactly column 4. 
    const headX = (time - windowStartIdx + 4) * 10;
    
    // Construct High-Res SVG path (sample 20 times per column)
    const pathPoints = [];
    const tStart = Math.max(0, time - 5);
    for (let tStep = tStart; tStep <= time; tStep += 0.05) {
        const localX = (tStep - windowStartIdx + 4) * 10;
        const localY = rowToY(getSmoothY(tStep));
        pathPoints.push(`${pathPoints.length === 0 ? 'M' : 'L'} ${localX} ${localY}`);
    }
    const dPath = pathPoints.join(' ');

    return (
        <div className="flex-1 h-full relative overflow-hidden flex flex-col bg-[#050914] z-0">
            {/* Header info */}
            <div className="absolute top-6 left-6 z-50 flex gap-6 pointer-events-none">
                <div className="flex items-center gap-3 mb-1 bg-black/60 p-2 px-4 rounded-xl border border-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                    <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest mt-0.5">Portfolio</span>
                    <span className={`text-xl font-mono font-bold ${portfolioValue > 100 ? 'text-green-400' : 'text-hr-gold'}`}>
                        ${portfolioValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </span>
                </div>
                <div className="flex items-center gap-3 mb-1">
                    <span className="text-2xl font-mono font-bold text-white">
                        ${(Y_PRICES[0] - (currentHeadY * 0.01)).toFixed(2)}
                    </span>
                    <span className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] font-mono rounded tracking-widest">+0.01 (+0.9%)</span>
                </div>
            </div>

            {/* Position Size Selector */}
            <div className="absolute bottom-12 right-16 z-30 flex items-center gap-2 bg-[#050914] border border-white/5 p-1 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                <span className="text-white/30 text-[10px] font-mono uppercase px-2">Pos Size</span>
                {[10, 50, 100, 250].map(val => (
                    <button 
                        key={val}
                        onClick={() => setPositionSize(val)}
                        disabled={portfolioValue < val}
                        className={`px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold transition-all 
                        ${portfolioValue < val ? 'opacity-30 cursor-not-allowed' : positionSize === val ? 'bg-hr-gold text-black shadow-[0_0_10px_rgba(212,175,55,0.3)]' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
                    >
                        ${val}
                    </button>
                ))}
            </div>

            {/* SMOOTH SLIDING WRAPPER for entire coordinate system */}
            <div 
                className="absolute inset-0 top-0 bottom-8 z-10"
                style={{
                    transform: `translateX(-${fractionalProgress * 10}%)`,
                    width: '125%' 
                }}
            >
                {/* 1. Underlying Static Grid Geometry aligned to the 10 cols */}
                <div className="absolute inset-0 flex flex-col pointer-events-none">
                    {Y_PRICES.map((_, i) => (
                        <div key={i} className="flex-1 border-b border-white/[0.03] w-full" />
                    ))}
                </div>
                <div className="absolute inset-0 flex pointer-events-none">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="flex-1 border-r border-[#1a1f2e]/60 h-full" />
                    ))}
                </div>

                {/* 2. Seamless High-Res SVG Path */}
                <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.0" />
                            <stop offset="20%" stopColor="#d4af37" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#d4af37" stopOpacity="1" />
                        </linearGradient>
                        <filter id="glowLine" filterUnits="userSpaceOnUse" x="-50" y="-50" width="200" height="200">
                            <feGaussianBlur stdDeviation="1.5" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        <filter id="hitGlow" filterUnits="userSpaceOnUse" x="-50" y="-50" width="200" height="200">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComponentTransfer in="blur" result="glow">
                                <feFuncA type="linear" slope="2"/>
                            </feComponentTransfer>
                            <feMerge>
                                <feMergeNode in="glow" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    
                    {/* The Continuous Trail */}
                    <path
                        d={dPath}
                        fill="none"
                        stroke="url(#lineGrad)"
                        strokeWidth="0.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#glowLine)"
                    />
                </svg>

                {/* DOM Based Pin Dot to avoid SVG distortion scaling */}
                <div 
                    className="absolute z-30 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_15px_#fff]"
                    style={{
                        left: `${headX}%`,
                        top: `${rowToY(currentHeadY)}%`,
                        transform: 'translate(-50%, -50%)',
                        boxShadow: '0 0 15px rgba(255,255,255,0.8), 0 0 30px rgba(212,175,55,0.4)'
                    }}
                />

                {/* 3. The Interactive CSS DOM Matrix Overlay */}
                <div className="absolute inset-0 z-20 grid" style={{ gridTemplateRows: 'repeat(10, 1fr)', gridTemplateColumns: 'repeat(10, 1fr)' }}>
                    {Y_PRICES.map((price, rIdx) => (
                        Array.from({ length: 10 }).map((_, viewIdx) => {
                            const absIdx = windowStartIdx + viewIdx;
                            const isFuture = viewIdx >= 5; 
                            
                            const tradeKey = `${absIdx - 4}-${rIdx}`; 
                            const activeTrade = trades[tradeKey];
                            
                            // Dynamic Payout based on placed-distance to arrive-distance
                            const placedDistanceY = activeTrade ? Math.abs(activeTrade.rIdx - activeTrade.initialY) : Math.abs(rIdx - currentHeadY);
                            // Multiplier: 1x base + 0.4x per row of distance + 0.1 per column of time
                            const distanceX = viewIdx - (4 + fractionalProgress); 
                            const multiplierStr = isFuture || activeTrade 
                                ? (1 + (placedDistanceY * 0.4) + (isFuture ? distanceX * 0.05 : 0)).toFixed(2) 
                                : null;

                            // Using absIdx in the key binds React state to the underlying data rather than the physical slot
                            if (!isFuture && !activeTrade) {
                                return <div key={`empty-${rIdx}-${absIdx}`} className="pointer-events-none" />;
                            }

                            // Show exact fixed multiplier string if placed, otherwise real-time hover projection
                            const displayMultiplier = activeTrade ? activeTrade.multiplier : multiplierStr;

                            return (
                                <div key={`${rIdx}-${absIdx}`} className="relative w-full h-full p-1 group">
                                    <button 
                                        onClick={() => handleTapTrade(rIdx, absIdx - 4, price, activeTrade, multiplierStr!)}
                                        disabled={!isFuture}
                                        className={`w-full h-full rounded flex flex-col items-center justify-center transition-all duration-300
                                        ${activeTrade && !activeTrade.result ? 'bg-hr-gold/20 border border-hr-gold/50 shadow-[0_0_20px_rgba(212,175,55,0.2)] z-30' : 'bg-transparent border border-transparent group-hover:border-white/10 group-hover:bg-white/[0.02] cursor-pointer'}`}
                                    >
                                        {activeTrade ? (
                                            <AnimatePresence mode="wait">
                                                {!activeTrade.result ? (
                                                    <motion.div key="pending" className="flex flex-col items-center" exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.2 }}>
                                                        <span className="text-hr-gold font-black text-xs md:text-sm px-1 py-0.5">${activeTrade.size}</span>
                                                        <span className="text-white/60 font-mono text-[8px] md:text-[9px] font-bold">{displayMultiplier}X</span>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div 
                                                        key="result"
                                                        initial={{ opacity: 0, scale: 0.5 }}
                                                        animate={{ opacity: 1, scale: activeTrade.result === 'win' ? 1.4 : 0.8 }}
                                                        className={`flex flex-col items-center font-black ${activeTrade.result === 'win' ? 'text-green-400 drop-shadow-[0_0_10px_#4ade80]' : 'text-red-500/70'} `}
                                                    >
                                                        {activeTrade.result === 'win' ? `+$${(activeTrade.size * parseFloat(displayMultiplier!)).toFixed(1)}` : `-$${activeTrade.size}`}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        ) : (
                                            isFuture && (
                                                <>
                                                    <span className={`font-mono text-[9px] md:text-[10px] ${price > (Y_PRICES[0] - currentHeadY*0.01) ? 'text-red-400/50' : price < (Y_PRICES[0] - currentHeadY*0.01) ? 'text-green-400/50' : 'text-hr-gold/50'} group-hover:opacity-100 opacity-0 transition-opacity duration-300`}>
                                                        ${price.toFixed(2)}
                                                    </span>
                                                    <span className="font-mono text-[8px] text-white/20 group-hover:text-hr-gold/60 transition-colors duration-300">
                                                        {displayMultiplier}X
                                                    </span>
                                                </>
                                            )
                                        )}
                                    </button>
                                </div>
                            );
                        })
                    ))}
                </div>
            </div>

            {/* Sliding X-Axis Labels */}
            <div className="absolute bottom-0 left-0 right-0 h-8 border-t border-white/5 bg-[#03050a]/90 backdrop-blur z-30 overflow-hidden">
                <div 
                    className="h-full flex" 
                    style={{ width: '125%', transform: `translateX(-${fractionalProgress * 10}%)` }}
                >
                    {Array.from({ length: 10 }).map((_, viewIdx) => {
                        const absIdx = windowStartIdx + viewIdx;
                        return (
                            <div key={`time-${absIdx}`} className={`flex-1 flex items-center justify-center text-[9px] font-mono ${viewIdx === 4 ? 'text-hr-gold font-bold' : 'text-white/30'}`}>
                                {getTimeStr(9, 30, absIdx)}
                            </div>
                        );
                    })}
                </div>
            </div>
            
            {/* Fixed Y-Axis Price Labels */}
            <div className="absolute right-0 top-0 bottom-8 w-14 border-l border-white/5 bg-[#03050a]/90 backdrop-blur z-40 grid" style={{ gridTemplateRows: 'repeat(10, 1fr)' }}>
                {Y_PRICES.map((p, i) => (
                    <div key={i} className="flex items-center justify-center text-[9px] font-mono text-white/50">
                        ${p.toFixed(2)}
                    </div>
                ))}
            </div>

            {/* Dark gradient fade for the left edge to simulate vanishing history */}
            <div className="absolute top-0 bottom-8 left-0 w-32 bg-gradient-to-r from-[#050914] via-[#050914]/80 to-transparent z-40 pointer-events-none" />
        </div>
    );
}
