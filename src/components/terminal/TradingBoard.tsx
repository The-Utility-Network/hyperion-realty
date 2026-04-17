'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TICK_MS = 2000;
const BASE_PRICE = 1.05;

const getTimeStr = (baseHours: number, baseMinutes: number, offsets: number) => {
    const totalMinutes = Math.floor(baseHours * 60 + baseMinutes + (offsets * 15));
    const hr = Math.floor(totalMinutes / 60) % 24;
    const min = Math.floor(totalMinutes % 60);
    return `${hr.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
};

export default function TradingBoard() {
    const [positionSize, setPositionSize] = useState<number>(10);
    
    // Abstract history values range theoretically from -4.5 to 4.5
    const [history, setHistory] = useState<number[]>([0, 0, -1, -1, 0, 1, 0]); 
    const historyRef = useRef<number[]>([0, 0, -1, -1, 0, 1, 0]);
    
    const [time, setTime] = useState(0); 
    const reqRef = useRef<number>(0);
    const startRef = useRef<number>(0);

    // Trade Mode State
    const [tradeMode, setTradeMode] = useState<'option' | 'spot'>('option');

    // Portfolio & Spot State
    const [portfolioValue, setPortfolioValue] = useState<number>(1000);
    const portfolioRef = useRef<number>(1000);
    
    const [spotHoldings, setSpotHoldings] = useState<number>(0);
    const spotHoldingsRef = useRef<number>(0);

    type OpenPosition = { id: string, size: number, entryPx: number };
    const [openPositions, setOpenPositions] = useState<OpenPosition[]>([]);
    const openPositionsRef = useRef<OpenPosition[]>([]);

    const [activeLinkTarget, setActiveLinkTarget] = useState<{posId: string, type: 'take_profit'|'stop_loss'} | null>(null);
    const [focusedPosId, setFocusedPosId] = useState<string | null>(null);

    type TradeType = { mode: 'option' | 'spot', type: string, size: number, px: number, rIdx: number, initialY: number, multiplier: string, result?: 'win' | 'loss' | 'expired', linkPosId?: string, entryPx?: number };
    const [trades, setTrades] = useState<Record<string, TradeType>>({});
    const tradesRef = useRef(trades);

    useEffect(() => {
        tradesRef.current = trades;
    }, [trades]);

    // Derived Display Constants relative to Mode
    const NUM_ROWS = tradeMode === 'option' ? 10 : 20;
    const NUM_COLS = tradeMode === 'option' ? 10 : 12;
    const HEAD_COL = 4;
    const PRICE_STEP = tradeMode === 'option' ? 0.01 : 0.005;
    const ROW_MULTIPLIER = tradeMode === 'option' ? 1 : 2;
    const CENTER_ROW = NUM_ROWS / 2;
    
    // Top-to-bottom array
    // e.g. Option: 1.05 + (5*0.01) = 1.10.  Spot: 1.05 + (10*0.005) = 1.10
    const Y_PRICES = Array.from({ length: NUM_ROWS }, (_, i) => BASE_PRICE + (CENTER_ROW * PRICE_STEP) - (i * PRICE_STEP));

    // Abstract Tick Loop
    useEffect(() => {
        const tickProcess = (timestamp: number) => {
            if (!startRef.current) startRef.current = timestamp;
            const elapsed = timestamp - startRef.current;
            const currentFloatTime = elapsed / TICK_MS;
            
            const neededTick = Math.floor(currentFloatTime) + 1;
            if (neededTick > historyRef.current.length - 8) { 
                const lastVal = historyRef.current[historyRef.current.length - 1];
                
                // Compound sine wave for unpredictable, high-amplitude volatility 
                const trend = (Math.sin(timestamp * 0.00015) * 3) + (Math.sin(timestamp * 0.0004) * 1.5); 
                const distanceToTarget = trend - lastVal;
                
                const p = Math.random();
                let nextVal = lastVal;
                
                // Occasional larger abstract jumps to catch up to rapid trend swings
                const step = p > 0.85 ? 1.0 : 0.5; 
                
                if (distanceToTarget > 0.5) nextVal += p > 0.3 ? step : p > 0.1 ? -step : 0;
                else if (distanceToTarget < -0.5) nextVal += p > 0.3 ? -step : p > 0.1 ? step : 0;
                else nextVal += p > 0.4 ? step : p > 0.8 ? -step : 0;

                if (nextVal < -4.5) nextVal = -4.5; 
                if (nextVal > 4.5) nextVal = 4.5; 
                
                historyRef.current = [...historyRef.current, nextVal];
                setHistory([...historyRef.current]);
            }
            
            setTime(currentFloatTime);
            reqRef.current = requestAnimationFrame(tickProcess);
        };
        
        reqRef.current = requestAnimationFrame(tickProcess);
        return () => cancelAnimationFrame(reqRef.current!);
    }, []);

    // Collision & Resolution separate block to access state hooks properly
    useEffect(() => {
        const currentTrades = { ...tradesRef.current };
        let modified = false;

        const headIndexInt = Math.floor(time);
        const frac = time - headIndexInt;
        const y0_abs = history[headIndexInt] ?? 0;
        const y1_abs = history[headIndexInt + 1] ?? y0_abs;
        const smoothFrac = (1 - Math.cos(frac * Math.PI)) / 2;
        const abstractCurrentY = y0_abs + (y1_abs - y0_abs) * smoothFrac;
        
        const physicalHeadY = CENTER_ROW + (abstractCurrentY * ROW_MULTIPLIER);

        Object.keys(currentTrades).forEach(tKey => {
            const tradeInfo = currentTrades[tKey];
            if (tradeInfo.result) return; 

            const [tAbsTick, tRIdx] = tKey.split('-').map(Number);
            const hitTolerance = tradeInfo.mode === 'option' ? 0.6 : 0.8;
            
            // Option Mode Collision (Time-based Expiration)
            if (tradeInfo.mode === 'option') {
                if (time >= tAbsTick && time < tAbsTick + 1) {
                    if (Math.abs(physicalHeadY - tRIdx) <= hitTolerance) {
                        modified = true;
                        currentTrades[tKey] = { ...tradeInfo, result: 'win' };
                        const payout = tradeInfo.size * parseFloat(tradeInfo.multiplier);
                        portfolioRef.current += payout;
                        setPortfolioValue(portfolioRef.current);
                    }
                } 
                else if (time >= tAbsTick + 1) {
                    modified = true;
                    currentTrades[tKey] = { ...tradeInfo, result: 'loss' };
                }
            } 
            // Spot Mode Collision (Infinite GTC Tripwires)
            else {
                // Ensure the head has reached the placement time so future placed limit orders aren't retroactively hit
                // tAbsTick is the coordinate relative to the scrolling window. The head is strictly at (time + HEAD_COL).
                // Wait, tAbsTick is the literal absolute column index placed at `windowStartIdx + viewIdx - HEAD_COL`.
                // Actually the head is always precisely on column HEAD_COL from the left. 
                // Using the exact physical math from the previous system, if `time >= tAbsTick`, the head has intersected it.
                if (time >= tAbsTick && Math.abs(physicalHeadY - tRIdx) <= hitTolerance) {
                    modified = true;
                    currentTrades[tKey] = { ...tradeInfo, result: 'win' };
                    
                    if (tradeInfo.type === 'limit_buy') {
                        spotHoldingsRef.current += tradeInfo.size; 
                        setSpotHoldings(spotHoldingsRef.current);
                        
                        const newPos = { id: `pos-${tKey}`, size: tradeInfo.size, entryPx: tradeInfo.px };
                        openPositionsRef.current = [...openPositionsRef.current, newPos];
                        setOpenPositions(openPositionsRef.current);

                    } else if (tradeInfo.type === 'take_profit' || tradeInfo.type === 'stop_loss') {
                        const linkedPos = openPositionsRef.current.find(p => p.id === tradeInfo.linkPosId);
                        if (linkedPos) {
                            openPositionsRef.current = openPositionsRef.current.filter(p => p.id !== tradeInfo.linkPosId);
                            setOpenPositions(openPositionsRef.current);
                            
                            spotHoldingsRef.current -= linkedPos.size;
                            setSpotHoldings(spotHoldingsRef.current);

                            const trueReturn = (linkedPos.size / linkedPos.entryPx) * tradeInfo.px;
                            portfolioRef.current += trueReturn;
                            setPortfolioValue(portfolioRef.current);
                            
                            // OCO Logic: Cancel any peer orders linked to this exact position 
                            Object.keys(currentTrades).forEach(peerKey => {
                                if (peerKey !== tKey) {
                                    const peerTrade = currentTrades[peerKey];
                                    if (!peerTrade.result && peerTrade.linkPosId === tradeInfo.linkPosId) {
                                        currentTrades[peerKey] = { ...peerTrade, result: 'expired' };
                                    }
                                }
                            });
                        }
                    }
                }
                // (Spot trades have no loss/expire condition, they sit indefinitely until hit)
            }
        });

        // Demo Rescue
        if (portfolioRef.current < 10 && spotHoldingsRef.current === 0 && openPositionsRef.current.length === 0) {
            const pendingCount = Object.values(currentTrades).filter(t => !t.result).length;
            if (pendingCount === 0) {
                portfolioRef.current = 1000;
                setPortfolioValue(1000);
            }
        }

        if (modified) setTrades(currentTrades);
    }, [time]); // Check collisions continually as time drifts

    // Mathematical rendering hooks
    const getPhysicalSmoothY = (t: number) => {
        const idx = Math.floor(t);
        const frac = t - idx;
        const y0_abs = history[idx] ?? 0;
        const y1_abs = history[idx + 1] ?? y0_abs;
        const smoothFrac = (1 - Math.cos(frac * Math.PI)) / 2;
        const abstractY = y0_abs + (y1_abs - y0_abs) * smoothFrac;
        return CENTER_ROW + (abstractY * ROW_MULTIPLIER);
    };

    const currentHeadY = getPhysicalSmoothY(time);

    const handleTapTrade = (rIdx: number, cIdx: number, price: number, activeTrade: any, multiplierStr: string) => {
        if (activeTrade) return;
        const key = `${cIdx}-${rIdx}`;

        if (tradeMode === 'option') {
            if (portfolioRef.current < positionSize) return;
            portfolioRef.current -= positionSize;
            setPortfolioValue(portfolioRef.current);
            setTrades(prev => ({ ...prev, [key]: { mode: 'option', type: 'option', size: positionSize, px: price, rIdx, initialY: currentHeadY, multiplier: multiplierStr } }));
        } else {
            if (activeLinkTarget) {
                const linkedPos = openPositions.find(p => p.id === activeLinkTarget.posId);
                if (!linkedPos) {
                     setActiveLinkTarget(null);
                     return;
                }
                
                setTrades(prev => {
                    const nextTrades = { ...prev };
                    
                    // Replace existing target of the same type for this position
                    Object.keys(nextTrades).forEach(k => {
                        if (nextTrades[k].linkPosId === linkedPos.id && nextTrades[k].type === activeLinkTarget.type) {
                            delete nextTrades[k];
                        }
                    });
                    
                    nextTrades[key] = { mode: 'spot', type: activeLinkTarget.type, size: linkedPos.size, px: price, rIdx, initialY: currentHeadY, multiplier: multiplierStr, linkPosId: linkedPos.id, entryPx: linkedPos.entryPx };
                    return nextTrades;
                });
                setActiveLinkTarget(null);
            } else {
                if (portfolioRef.current < positionSize) return; 
                portfolioRef.current -= positionSize;
                setPortfolioValue(portfolioRef.current);
                setTrades(prev => ({ ...prev, [key]: { mode: 'spot', type: 'limit_buy', size: positionSize, px: price, rIdx, initialY: currentHeadY, multiplier: multiplierStr } }));
            }
        }
    };

    const handleSwitchMode = (mode: 'option' | 'spot') => {
        setTradeMode(mode);
        setActiveLinkTarget(null);
        setFocusedPosId(null);
        setTrades({}); // Clear board to avoid physical mapping errors across densities
    };

    const headIndexInt = Math.floor(time);
    const fractionalProgress = time % 1;
    const windowStartIdx = headIndexInt; 
    
    const rowHeightPerc = 100 / NUM_ROWS;
    const colWidthPerc = 100 / NUM_COLS;
    
    const rowToY = (val: number) => (val * rowHeightPerc) + (rowHeightPerc / 2);
    const headX = (time - windowStartIdx + HEAD_COL) * colWidthPerc;
    
    const pathPoints = [];
    const tStart = Math.max(0, time - 5);
    for (let tStep = tStart; tStep <= time; tStep += 0.05) {
        const localX = (tStep - windowStartIdx + HEAD_COL) * colWidthPerc;
        const localY = rowToY(getPhysicalSmoothY(tStep));
        pathPoints.push(`${pathPoints.length === 0 ? 'M' : 'L'} ${localX} ${localY}`);
    }
    const dPath = pathPoints.join(' ');

    return (
        <div className="flex-1 h-full relative overflow-hidden flex flex-col bg-[#050914] z-0">
            {/* Header info */}
            <div className="absolute top-6 left-6 z-50 flex gap-6 pointer-events-none">
                <div className="flex items-center gap-3 mb-1 bg-black/60 p-2 px-4 rounded-xl border border-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                    <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest mt-0.5">Cash</span>
                    <span className={`text-xl font-mono font-bold flex items-end gap-1 ${portfolioValue > 1000 ? 'text-green-400' : 'text-hr-gold'}`}>
                        ${portfolioValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </span>
                    {tradeMode === 'spot' && (
                        <>
                            <div className="w-px h-6 bg-white/10 mx-2" />
                            <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest mt-0.5">Asset</span>
                            <span className="text-xl font-mono font-bold text-white flex items-end gap-1">
                                {spotHoldings.toFixed(0)} <span className="text-[10px] text-white/50 mb-[3px]">TKN</span>
                            </span>
                        </>
                    )}
                </div>
                <div className="flex items-center gap-3 mb-1">
                    <span className="text-2xl font-mono font-bold text-white">
                        ${(Y_PRICES[0] - (currentHeadY * PRICE_STEP)).toFixed(tradeMode==='option'?2:3)}
                    </span>
                    <span className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] font-mono rounded tracking-widest">+{PRICE_STEP} (+0.4%)</span>
                </div>
            </div>

            {/* Mode Switcher */}
            <div className="absolute top-20 left-6 z-50 flex items-center bg-black/60 border border-white/5 p-1 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-md">
                <button 
                    onClick={() => handleSwitchMode('option')}
                    className={`px-4 py-1.5 rounded-lg font-mono text-[10px] uppercase font-bold transition-all ${tradeMode === 'option' ? 'bg-hr-gold text-black shadow-[0_0_10px_rgba(212,175,55,0.4)]' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
                >
                    Options
                </button>
                <button 
                    onClick={() => handleSwitchMode('spot')}
                    className={`px-4 py-1.5 rounded-lg font-mono text-[10px] uppercase font-bold transition-all ${tradeMode === 'spot' ? 'bg-hr-gold text-black shadow-[0_0_10px_rgba(212,175,55,0.4)]' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
                >
                    Spot Limit
                </button>
            </div>
            
            {/* Real-time Order Linking UI */}
            {tradeMode === 'spot' && activeLinkTarget && (
                <div className="absolute top-32 left-6 z-50 animate-pulse bg-hr-gold/10 border border-hr-gold p-3 rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                    <p className="text-hr-gold text-[10px] font-mono font-bold tracking-widest">
                        {activeLinkTarget.type === 'take_profit' ? 'SELECT TAKE PROFIT TARGET' : 'SELECT STOP LOSS TARGET'}
                    </p>
                    <p className="text-white/60 text-[9px] font-mono mt-1">Tap grid to place order. Tap again to cancel.</p>
                </div>
            )}

            {/* Position Size Selector */}
            <div className="absolute bottom-12 right-16 z-30 flex items-center gap-2 bg-[#050914] border border-white/5 p-1 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                <span className="text-white/30 text-[10px] font-mono uppercase px-2">Size</span>
                {[10, 50, 100, 250].map(val => (
                    <button 
                        key={val}
                        onClick={() => setPositionSize(val)}
                        className={`px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold transition-all ${positionSize === val ? 'bg-hr-gold text-black shadow-[0_0_10px_rgba(212,175,55,0.3)]' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
                    >
                        {val}
                    </button>
                ))}
            </div>

            {/* Open Positions Drawer */}
            <AnimatePresence>
                {tradeMode === 'spot' && openPositions.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute bottom-12 left-6 z-50 flex flex-col gap-2 max-h-[300px] overflow-y-auto w-64 pr-2"
                    >
                        <h4 className="text-[10px] text-white/40 font-mono tracking-widest uppercase mb-1">Open Positions</h4>
                        {openPositions.map(pos => {
                            const curPrice = (Y_PRICES[0] - (currentHeadY * PRICE_STEP));
                            const pnlRaw = (pos.size / pos.entryPx) * curPrice;
                            const pnlDiff = pnlRaw - pos.size;
                            const isProfitable = pnlDiff >= 0;

                            return (
                                <div 
                                    key={pos.id} 
                                    onClick={(e) => {
                                        if ((e.target as HTMLElement).tagName !== 'BUTTON') {
                                            setFocusedPosId(prev => prev === pos.id ? null : pos.id);
                                        }
                                    }}
                                    className={`bg-black/80 backdrop-blur rounded-lg p-3 shadow-lg flex flex-col gap-2 relative overflow-hidden cursor-pointer border transition-colors ${focusedPosId === pos.id ? 'border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'border-white/10 hover:border-white/20'}`}
                                >
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${isProfitable ? 'bg-green-500' : 'bg-red-500'}`} />
                                    
                                    <div className="flex justify-between items-center pl-2">
                                        <span className="text-white text-[10px] font-mono font-bold tracking-widest">{pos.id.split('-')[1]}</span>
                                        <span className={`text-[10px] font-mono font-bold ${isProfitable ? 'text-green-400' : 'text-red-400'}`}>
                                            {isProfitable ? '+' : ''}{pnlDiff.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center pl-2 text-[9px] text-white/50 font-mono">
                                        <span>Entry: ${pos.entryPx.toFixed(3)}</span>
                                        <span>Val: ${pos.size}</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-1 mt-1 pl-1">
                                        <button 
                                            onClick={() => setActiveLinkTarget(prev => prev?.posId === pos.id && prev.type === 'take_profit' ? null : { posId: pos.id, type: 'take_profit' })}
                                            className={`text-[8px] font-bold py-1.5 rounded transition-colors ${activeLinkTarget?.posId === pos.id && activeLinkTarget?.type === 'take_profit' ? 'bg-hr-gold text-black' : 'bg-white/5 text-white hover:bg-white/10'}`}
                                        >
                                            SET TP
                                        </button>
                                        <button 
                                            onClick={() => setActiveLinkTarget(prev => prev?.posId === pos.id && prev.type === 'stop_loss' ? null : { posId: pos.id, type: 'stop_loss' })}
                                            className={`text-[8px] font-bold py-1.5 rounded transition-colors ${activeLinkTarget?.posId === pos.id && activeLinkTarget?.type === 'stop_loss' ? 'bg-hr-gold text-black' : 'bg-white/5 text-white hover:bg-white/10'}`}
                                        >
                                            SET SL
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>

            <div 
                className="absolute inset-0 top-0 bottom-8 z-10"
                style={{
                    transform: `translateX(-${fractionalProgress * colWidthPerc}%)`,
                    width: `${100 * (NUM_COLS / (NUM_COLS - 2))}%` 
                }}
            >
                <div className="absolute inset-0 flex flex-col pointer-events-none">
                    {Y_PRICES.map((_, i) => (
                        <div key={i} className="flex-1 border-b border-white/[0.03] w-full" />
                    ))}
                </div>
                <div className="absolute inset-0 flex pointer-events-none">
                    {Array.from({ length: NUM_COLS }).map((_, i) => (
                        <div key={i} className="flex-1 border-r border-[#1a1f2e]/60 h-full" />
                    ))}
                </div>

                <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.0" />
                            <stop offset="20%" stopColor="#d4af37" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#d4af37" stopOpacity="1" />
                        </linearGradient>
                        <filter id="glowLine" filterUnits="userSpaceOnUse" x="-50" y="-50" width="200" height="200">
                            <feGaussianBlur stdDeviation="1.0" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>
                    
                    <path
                        d={dPath}
                        fill="none"
                        stroke="url(#lineGrad)"
                        strokeWidth={tradeMode === 'option' ? "0.5" : "0.3"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#glowLine)"
                    />
                </svg>

                <div 
                    className="absolute z-30 w-2 h-2 bg-white rounded-full shadow-[0_0_15px_#fff]"
                    style={{
                        left: `${headX}%`,
                        top: `${rowToY(currentHeadY)}%`,
                        transform: 'translate(-50%, -50%)',
                        boxShadow: `0 0 10px rgba(255,255,255,0.8), 0 0 ${tradeMode === 'option' ? '30px' : '20px'} rgba(212,175,55,0.4)`
                    }}
                />

                <div className="absolute inset-0 z-20 grid" style={{ gridTemplateRows: `repeat(${NUM_ROWS}, 1fr)`, gridTemplateColumns: `repeat(${NUM_COLS}, 1fr)` }}>
                    {Y_PRICES.map((price, rIdx) => (
                        Array.from({ length: NUM_COLS }).map((_, viewIdx) => {
                            const absIdx = windowStartIdx + viewIdx;
                            const isFuture = viewIdx >= HEAD_COL + 1; 
                            
                            const tradeKey = `${absIdx - HEAD_COL}-${rIdx}`; 
                            const activeTrade = trades[tradeKey];
                            const isSpotTrade = activeTrade && activeTrade.mode === 'spot';
                            
                            const placedDistanceY = activeTrade ? Math.abs(activeTrade.rIdx - activeTrade.initialY) : Math.abs(rIdx - currentHeadY);
                            const distanceX = viewIdx - (HEAD_COL + fractionalProgress); 
                            const multiplierStr = isFuture || activeTrade 
                                ? (1 + (placedDistanceY * 0.4) + (isFuture ? distanceX * 0.05 : 0)).toFixed(2) 
                                : null;

                            if (!isFuture && (!activeTrade || isSpotTrade)) {
                                return <div key={`empty-${rIdx}-${absIdx}`} className="pointer-events-none" />;
                            }

                            const displayMultiplier = activeTrade ? activeTrade.multiplier : multiplierStr;

                            return (
                                <div key={`${rIdx}-${absIdx}`} className="relative w-full h-full p-0.5 group z-30">
                                    <button 
                                        onClick={() => handleTapTrade(rIdx, absIdx - HEAD_COL, price, activeTrade, multiplierStr!)}
                                        disabled={!isFuture || isSpotTrade}
                                        className={`w-full h-full rounded-sm flex flex-col items-center justify-center transition-all duration-300
                                        ${activeTrade && !isSpotTrade && !activeTrade.result 
                                            ? 'bg-hr-gold/20 border border-hr-gold/50 shadow-[0_0_10px_rgba(212,175,55,0.2)] z-30' 
                                            : activeLinkTarget ? 'bg-hr-gold/5 border hover:border-hr-gold/40 border-dashed border-hr-gold/10' : 'bg-transparent border border-transparent group-hover:border-white/10 group-hover:bg-white/[0.02] cursor-pointer'}`}
                                    >
                                        {activeTrade && !isSpotTrade ? (
                                            <AnimatePresence mode="wait">
                                                {!activeTrade.result ? (
                                                    <motion.div key="pending" className="flex flex-col items-center leading-none mt-0.5" exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.2 }}>
                                                        <span className="text-hr-gold font-black text-[9px] md:text-[10px] leading-none">${activeTrade.size}</span>
                                                        <span className="text-white/60 font-mono text-[7px] font-bold leading-none mt-0.5">{displayMultiplier}X</span>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div 
                                                        key="result"
                                                        initial={{ opacity: 0, scale: 0.5 }}
                                                        animate={{ opacity: 1, scale: activeTrade.result === 'win' ? 1.4 : 0.8 }}
                                                        className={`flex flex-col items-center font-black leading-none ${activeTrade.result === 'win' ? 'text-green-400 drop-shadow-[0_0_10px_#4ade80]' : 'text-red-500/70' } `}
                                                    >
                                                        {activeTrade.result === 'win' && <span className="text-[9px] md:text-[10px] leading-none">+$${(activeTrade.size * parseFloat(displayMultiplier!)).toFixed(1)}</span>}
                                                        {activeTrade.result === 'loss' && <span className="text-[9px] md:text-[10px] leading-none">-${activeTrade.size}</span>}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        ) : (
                                            isFuture && !isSpotTrade && (
                                                <>
                                                    <span className={`font-mono text-[7px] md:text-[8px] leading-none ${price > (Y_PRICES[0] - currentHeadY*PRICE_STEP) ? 'text-red-400/50' : price < (Y_PRICES[0] - currentHeadY*PRICE_STEP) ? 'text-green-400/50' : 'text-hr-gold/50'} group-hover:opacity-100 opacity-0 transition-opacity duration-300`}>
                                                        ${price.toFixed(tradeMode === 'option' ? 2 : 3)}
                                                    </span>
                                                    {tradeMode === 'option' && (
                                                        <span className="font-mono text-[6px] md:text-[8px] text-white/20 group-hover:text-hr-gold/60 transition-colors duration-300 leading-none mt-0.5">
                                                            {displayMultiplier}X
                                                        </span>
                                                    )}
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

            {/* DYNAMIC SPOT GTC INFINITE TRIPWIRES */}
            <div className="absolute inset-0 top-0 bottom-8 pointer-events-none z-10">
                {Object.entries(trades).filter(([, t]) => t.mode === 'spot').map(([tKey, t]) => {
                    const isBuy = t.type === 'limit_buy';
                    const isTP = t.type === 'take_profit';
                const isWin = t.result === 'win';
                const isGreen = isBuy || isTP;
                
                const isDimmed = focusedPosId !== null && !isBuy && t.linkPosId !== focusedPosId;
                
                const boxColor = isWin ? 'bg-green-500 shadow-[0_0_20px_#22c55e]' : isGreen ? 'bg-green-500/30 border-t border-green-400 shadow-[0_0_10px_#22c55e]' : 'bg-red-500/30 border-t border-red-400 shadow-[0_0_10px_#ef4444]';
                const textColor = isWin ? 'text-white' : isGreen ? 'text-green-200' : 'text-red-200';
                const borderColor = isGreen ? 'border-green-500/50' : 'border-red-500/50';
                
                return (
                    <AnimatePresence key={`tripwire-${tKey}`}>
                        {(!t.result || (t.result === 'win' && Math.floor(time) - Number(tKey.split('-')[0]) < 2)) && (
                            <motion.div 
                                initial={{ opacity: 0, width: '0%' }}
                                animate={{ opacity: isWin ? 0 : (isDimmed ? 0.15 : 1), width: '100%', backgroundColor: isWin ? '#4ade80' : 'transparent' }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: isWin ? 0.8 : 0.4 }}
                                className={`absolute left-0 right-0 h-4 z-10 pointer-events-none flex items-center pr-20 ${boxColor}`}
                                style={{ top: `calc(${rowToY(t.rIdx)}% - 8px)` }}
                            >
                                <span className={`ml-auto font-mono text-[8px] font-black tracking-widest ${textColor} bg-black/80 px-1.5 py-0.5 rounded border ${borderColor}`}>
                                    {isWin ? 'FILLED' : t.type === 'limit_buy' ? `LMT BUY $${t.size}` : `${isTP ? 'TP' : 'SL'} POS #${t.linkPosId?.split('-')[1]}`}
                                </span>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    );
                })}
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-8 border-t border-white/5 bg-[#03050a]/90 backdrop-blur z-30 overflow-hidden">
                <div 
                    className="h-full flex" 
                    style={{ width: `${100 * (NUM_COLS / (NUM_COLS - 2))}%`, transform: `translateX(-${fractionalProgress * colWidthPerc}%)` }}
                >
                    {Array.from({ length: NUM_COLS }).map((_, viewIdx) => {
                        const absIdx = windowStartIdx + viewIdx;
                        return (
                            <div key={`time-${absIdx}`} className={`flex-1 flex items-center justify-center text-[8px] font-mono ${viewIdx === HEAD_COL ? 'text-hr-gold font-bold' : 'text-white/30'}`}>
                                {getTimeStr(9, 30, absIdx)}
                            </div>
                        );
                    })}
                </div>
            </div>
            
            <div className="absolute right-0 top-0 bottom-8 w-16 border-l border-white/5 bg-[#03050a]/90 backdrop-blur z-40 grid" style={{ gridTemplateRows: `repeat(${NUM_ROWS}, 1fr)` }}>
                {Y_PRICES.map((p, i) => (
                    <div key={i} className="flex items-center justify-center text-[8px] font-mono text-white/50 leading-none border-b border-white/[0.02]">
                        ${p.toFixed(tradeMode === 'option' ? 2 : 3)}
                    </div>
                ))}
            </div>

            <div className="absolute top-0 bottom-8 left-0 w-32 bg-gradient-to-r from-[#050914] via-[#050914]/80 to-transparent z-40 pointer-events-none" />
        </div>
    );
}
