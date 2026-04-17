'use client';

import { motion } from 'framer-motion';

export default function PriceChart() {
    // Synthetic data points for the path
    const points = "M0,300 C50,290 80,310 120,270 L130,220 L160,220 L180,180 L230,180 C260,180 280,210 320,210 C350,210 380,190 420,190";

    return (
        <div className="flex-1 h-full relative overflow-hidden flex flex-col pt-12 pb-6 px-4 md:px-12 border-r border-white/5">
            {/* Header info */}
            <div className="absolute top-6 left-6 md:left-12 z-10">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl md:text-3xl font-mono font-bold text-white">$1.05</span>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-mono rounded">+0.01 (+0.9%)</span>
                </div>
                <div className="text-gray-400 text-sm font-mono tracking-widest uppercase">
                    MIA-BRK-1 <span className="text-white/30 px-2">•</span> Vol: 1.4M
                </div>
            </div>

            {/* Glowing active node indicator */}
            <motion.div 
                className="absolute left-[410px] top-[242px] z-20 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <div className="w-12 h-12 bg-hr-gold/20 rounded-full animate-ping absolute" />
                <div className="w-4 h-4 bg-hr-gold rounded-full border-2 border-[#050914] shadow-[0_0_15px_#d4af37]" />
                <div className="absolute -top-10 whitespace-nowrap px-3 py-1 bg-white/10 backdrop-blur-md rounded border border-white/10 text-hr-gold font-mono text-sm shadow-xl">
                    +$0.01 / share
                </div>
            </motion.div>

            {/* SVG Chart area */}
            <div className="absolute inset-0 top-32 px-4 md:px-0">
                <svg className="w-full h-full" viewBox="0 0 500 400" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.1" />
                            <stop offset="50%" stopColor="#d4af37" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#d4af37" stopOpacity="1" />
                        </linearGradient>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="5" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>
                    
                    {/* Background grid lines */}
                    <g className="stroke-white/5" strokeWidth="1" strokeDasharray="4 4">
                        <line x1="0" y1="50" x2="500" y2="50" />
                        <line x1="0" y1="150" x2="500" y2="150" />
                        <line x1="0" y1="250" x2="500" y2="250" />
                        <line x1="0" y1="350" x2="500" y2="350" />
                    </g>
                    
                    {/* Animated Line */}
                    <motion.path
                        d={points}
                        fill="none"
                        stroke="url(#lineGrad)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#glow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                </svg>
            </div>

            {/* Bottom time scale */}
            <div className="mt-auto flex justify-between text-white/30 font-mono text-xs border-t border-white/5 pt-4">
                <span>09:30</span>
                <span>10:45</span>
                <span>12:00</span>
                <span>13:15</span>
                <span className="text-hr-gold">14:26 (LIVE)</span>
            </div>
        </div>
    );
}
