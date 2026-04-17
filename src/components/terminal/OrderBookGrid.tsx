'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock order book data mapped across 5 rows, 6 columns = 30 nodes
// Rows aligned visually with chart grid lines.
const DOM_DATA = [
    // Highest Asks (Top Row)
    { p: 1.10, s: '45K', t: 'ask' }, { p: 1.10, s: '3K', t: 'ask' }, { p: 1.09, s: '12K', t: 'ask' }, { p: 1.09, s: '55K', t: 'ask' }, { p: 1.09, s: '1K', t: 'ask' }, { p: 1.08, s: '4K', t: 'ask' },
    // Mid Asks
    { p: 1.08, s: '8K', t: 'ask' }, { p: 1.08, s: '2K', t: 'ask' }, { p: 1.07, s: '104K', t: 'ask' }, { p: 1.07, s: '9K', t: 'ask' }, { p: 1.06, s: '44K', t: 'ask' }, { p: 1.06, s: '12K', t: 'ask' },
    // The Spread / Active Zone (Middle Row)
    { p: 1.05, s: '11K', t: 'spread', current: true }, { p: 1.05, s: '8K', t: 'spread' }, { p: 1.05, s: '4K', t: 'spread' }, { p: 1.05, s: '1K', t: 'spread' }, { p: 1.04, s: '12K', t: 'bid' }, { p: 1.04, s: '34K', t: 'bid' },
    // Mid Bids
    { p: 1.03, s: '8K', t: 'bid' }, { p: 1.03, s: '2K', t: 'bid' }, { p: 1.03, s: '5K', t: 'bid' }, { p: 1.02, s: '45K', t: 'bid' }, { p: 1.02, s: '9K', t: 'bid' }, { p: 1.02, s: '11K', t: 'bid' },
    // Lowest Bids (Bottom Row)
    { p: 1.01, s: '100K', t: 'bid' }, { p: 1.01, s: '1M', t: 'bid' }, { p: 1.01, s: '33K', t: 'bid' }, { p: 1.00, s: '500K', t: 'bid' }, { p: 0.99, s: '2M', t: 'bid' }, { p: 0.98, s: '4M', t: 'bid' },
];

export default function OrderBookGrid() {
    const [selectedIdx, setSelectedIdx] = useState<number | null>(12); // Default selected
    const [positionSize, setPositionSize] = useState<number>(100);
    const [trades, setTrades] = useState<{ id: number; p: number; size: number; x: number; y: number }[]>([]);

    const handleTapTrade = (e: React.MouseEvent<HTMLButtonElement>, node: any, idx: number) => {
        setSelectedIdx(idx);
        
        const rect = e.currentTarget.getBoundingClientRect();
        const newTrade = {
            id: Date.now() + Math.random(),
            p: node.p,
            size: positionSize,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
        
        setTrades(prev => [...prev, newTrade]);

        setTimeout(() => {
            setTrades(prev => prev.filter(t => t.id !== newTrade.id));
        }, 1500);
    };

    return (
        <div className="w-full md:w-[550px] h-full p-6 flex flex-col">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <h3 className="text-white font-black tracking-widest uppercase text-sm mb-1">Execution Matrix</h3>
                    <p className="text-white/40 text-xs font-mono">1-Tap positioning</p>
                </div>
                <div className="text-right">
                    <span className="text-xs text-white/40 uppercase tracking-widest block mb-1">Spread</span>
                    <span className="text-hr-gold font-mono">$0.01</span>
                </div>
            </div>

            {/* Matrix Grid perfectly matching available height without scroll */}
            <div className="grid grid-cols-6 gap-1.5 flex-grow relative">
                {DOM_DATA.map((node, i) => {
                    const isSelected = selectedIdx === i;
                    const isAsk = node.t === 'ask';
                    const isBid = node.t === 'bid';
                    const isSpread = node.t === 'spread';

                    // Aesthetics mapping
                    let baseColor = "border-white/5 bg-white/[0.02] text-white/50 hover:bg-white/10";
                    if (isAsk) baseColor = "border-red-500/10 bg-red-400/[0.03] text-red-300/70 hover:bg-red-400/10";
                    if (isBid) baseColor = "border-green-500/10 bg-green-400/[0.03] text-green-300/70 hover:bg-green-400/10";
                    if (isSpread) baseColor = "border-hr-gold/20 bg-hr-gold/[0.05] text-hr-gold/80 hover:bg-hr-gold/10";
                    
                    if (isSelected) {
                        baseColor = "border-hr-gold bg-hr-gold/20 text-white shadow-[0_0_15px_rgba(212,175,55,0.4)] z-10";
                    }

                    return (
                        <motion.button
                            key={i}
                            onClick={(e) => handleTapTrade(e, node, i)}
                            className={`relative w-full h-full rounded border flex flex-col items-center justify-center transition-colors overflow-hidden ${baseColor}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {node.current && (
                                <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-hr-gold shadow-[0_0_5px_#d4af37] animate-pulse" />
                            )}
                            <span className={`text-xs md:text-sm font-bold font-mono ${isSelected ? 'text-white' : ''}`}>
                                ${node.p.toFixed(2)}
                            </span>
                            <span className={`text-[9px] uppercase font-mono ${isSelected ? 'text-hr-gold font-bold' : 'opacity-60'}`}>
                                {node.s}
                            </span>
                        </motion.button>
                    )
                })}

                {/* Floating execution feedbacks */}
                <AnimatePresence>
                    {trades.map(trade => (
                        <motion.div
                            key={trade.id}
                            initial={{ opacity: 1, y: 0, scale: 0.5 }}
                            animate={{ opacity: 0, y: -40, scale: 1.2 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="absolute pointer-events-none z-50 font-black font-mono text-hr-gold flex flex-col items-center drop-shadow-[0_0_5px_rgba(212,175,55,0.8)]"
                            style={{ 
                                left: '50%',
                                top: '40%',
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            <span className="text-lg">ENTRY</span>
                            <span className="text-white text-sm bg-black/80 px-2 py-0.5 rounded border border-white/20">${trade.size} @ ${trade.p.toFixed(2)}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Position Size Panel fits tightly at bottom */}
            <div className="mt-4 pt-4 border-t border-white/5">
                <div className="mb-2 flex justify-between items-center text-xs font-mono text-white/50">
                    <span>Position Size</span>
                    <span className="text-white font-bold">${positionSize}</span>
                </div>
                <div className="flex gap-2">
                    {[10, 50, 100, 500].map(val => (
                        <button 
                            key={val}
                            onClick={() => setPositionSize(val)}
                            className={`flex-1 py-2 rounded-lg border font-mono text-xs font-bold transition-colors ${positionSize === val ? 'bg-hr-gold text-black border-hr-gold' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'}`}
                        >
                            ${val}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
