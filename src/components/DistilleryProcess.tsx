'use client';

import { motion } from 'framer-motion';
import { DiamondPercent, CircleDollarSign, Landmark, ShieldCheck } from 'lucide-react';

export default function TokenizationPipeline() {
    const nodes = [
        { 
            id: 1, 
            pos3d: { x: 200, y: 600 }, 
            offset2d: -283, 
            icon: Landmark, 
            title: "PHYSICAL ASSET",
            desc: "Prime Real Estate",
            delay: 0,
            color: "#d4af37"
        },
        { 
            id: 2, 
            pos3d: { x: 400, y: 400 }, 
            offset2d: 0, 
            icon: ShieldCheck, 
            title: "IMMUTABLE DEED",
            desc: "NFT Vault Anchor",
            delay: 1,
            color: "#ffffff"
        },
        { 
            id: 3, 
            pos3d: { x: 600, y: 200 }, 
            offset2d: 283, 
            icon: DiamondPercent, 
            title: "FRACTIONAL EQUITY",
            desc: "ERC20 Liquidity",
            delay: 2,
            color: "#d4af37"
        }
    ];

    return (
        <section className="py-24 relative w-full max-w-7xl mx-auto px-6 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="text-center mb-20 relative z-40">
                    <span className="section-heading mb-2 block text-hr-gold/80 font-mono tracking-widest text-[10px] uppercase">Infrastructure</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-white drop-shadow-md">
                        The <span className="text-hr-gold">Dual-Token</span> Pipeline
                    </h2>
                    <p className="text-gray-400 mt-6 max-w-2xl mx-auto font-light leading-relaxed">
                        Track the architectural flow of value. Physical property yields distribute trustlessly to fractional ERC20 owners, while secondary trading volume generates a perpetual reverse-flow to physically upgrade the asset.
                    </p>
                </div>

                {/* Hybrid 3D/2D Container */}
                <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center h-[500px]">
                    
                    {/* Layer 1: The 3D Isometric Grid (Deep Z-Index) */}
                    <div className="absolute inset-0 flex items-center justify-center perspective-[1200px] pointer-events-none z-10">
                        <motion.div 
                            className="relative w-[800px] h-[800px]"
                            style={{ 
                                transform: "rotateX(55deg) rotateZ(45deg)",
                                transformStyle: "preserve-3d" 
                            }}
                        >
                            {/* Grid Floor */}
                            <div className="absolute inset-0 bg-[#060b14]/80 border border-hr-gold/20 shadow-[0_0_100px_rgba(212,175,55,0.1)] rounded-3xl overflow-hidden backdrop-blur-sm" />
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_80%)] rounded-3xl" />

                            {/* Data SVG Pipelines */}
                            <svg className="absolute inset-0 w-full h-full overflow-visible" style={{ transform: 'translateZ(1px)' }}>
                                {/* Base Track */}
                                <path d="M200 600 L400 400 L600 200" fill="none" stroke="#d4af37" strokeWidth="2" strokeOpacity={0.2} strokeDasharray="6 6"/>
                                
                                {/* Forward Pulse: Asset -> ERC20 Yields (Gold) */}
                                <motion.path 
                                    d="M200 600 L400 400 L600 200" 
                                    fill="none" stroke="#d4af37" strokeWidth="6" strokeLinecap="round"
                                    initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                                    animate={{ 
                                        pathLength: [0, 0.25, 0.25, 0], 
                                        pathOffset: [0, 0, 0.75, 1], 
                                        opacity: [0, 1, 1, 0] 
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="drop-shadow-[0_0_12px_rgba(212,175,55,1)]"
                                />

                                {/* Backward Pulse: Trading Taxes -> Upgrade Physical Asset (Green) */}
                                <motion.path 
                                    d="M600 200 L400 400 L200 600" 
                                    fill="none" stroke="#22c55e" strokeWidth="6" strokeLinecap="round"
                                    initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                                    animate={{ 
                                        pathLength: [0, 0.25, 0.25, 0], 
                                        pathOffset: [0, 0, 0.75, 1], 
                                        opacity: [0, 1, 1, 0] 
                                    }}
                                    transition={{ duration: 3.5, delay: 1.5, repeat: Infinity, ease: "linear" }}
                                    className="drop-shadow-[0_0_12px_rgba(34,197,94,1)]"
                                />
                            </svg>

                            {/* 3D Glowing Pads */}
                            {nodes.map((node) => (
                                <div 
                                    key={`pad-${node.id}`}
                                    className="absolute"
                                    style={{ 
                                        left: node.pos3d.x - 60, 
                                        top: node.pos3d.y - 60, 
                                        width: 120, 
                                        height: 120,
                                        transformStyle: "preserve-3d" 
                                    }}
                                >
                                    {/* Glass Pad */}
                                    <motion.div 
                                        className="absolute inset-0 border border-hr-gold/50 bg-[#0a1122]/60 backdrop-blur-md rounded-2xl shadow-[inset_0_0_20px_rgba(212,175,55,0.1),_0_0_40px_rgba(212,175,55,0.15)]"
                                        animate={{ z: [0, 20, 0] }}
                                        transition={{ duration: 4, delay: node.delay, repeat: Infinity, ease: "easeInOut" }}
                                        style={{ transformStyle: "preserve-3d" }}
                                    >
                                        <div className="absolute inset-2 border border-hr-gold/20 rounded-xl bg-hr-gold/5" />
                                    </motion.div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Layer 2: The 2D UI Overlay (High Z-Index, Crisp Typography) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                        {nodes.map((node) => (
                            <div 
                                key={`ui-wrapper-${node.id}`}
                                className="absolute"
                                style={{ transform: `translate(${node.offset2d}px, 0)` }}
                            >
                                <motion.div
                                    key={`ui-${node.id}`}
                                    className="flex flex-col items-center justify-center pointer-events-auto"
                                    animate={{ y: [-20, -36, -20] }} // 16px perfectly matches the 20px Z-axis translation given a 55deg viewing angle.
                                    transition={{ duration: 4, delay: node.delay, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <div className="group flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-110">
                                        {/* Pure Crisp SVG Icon */}
                                        <div className="mb-4 relative">
                                            <div className="absolute inset-0 bg-black/50 blur-xl rounded-full" />
                                            <node.icon size={64} color={node.color} strokeWidth={1} className="relative z-10 drop-shadow-[0_0_20px_rgba(212,175,55,0.8)] mix-blend-screen" />
                                        </div>
                                        
                                        {/* High Fidelity Typography Block */}
                                        <div className="bg-[#050914]/90 backdrop-blur-xl border border-hr-gold/20 px-5 py-3 rounded-lg text-center shadow-[0_15px_30px_rgba(0,0,0,0.8)] group-hover:border-hr-gold/50 transition-colors">
                                            <div className="text-[11px] font-bold tracking-[0.2em] mb-1" style={{ color: node.color }}>{node.title}</div>
                                            <div className="text-[12px] text-white/50 font-light tracking-wide">{node.desc}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    {/* Legend Overlay */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40">
                        <div className="bg-[#050914]/90 backdrop-blur-xl px-6 py-4 border border-white/10 rounded-lg flex gap-8 shadow-2xl">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-1 bg-hr-gold shadow-[0_0_8px_#d4af37]" />
                                <span className="text-[10px] font-mono text-white/80 uppercase tracking-[0.15em]">Yield Distribution</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-1 bg-green-500 shadow-[0_0_8px_#22c55e]" />
                                <span className="text-[10px] font-mono text-white/80 uppercase tracking-[0.15em]">Secondary Trading Taxes</span>
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
        </section>
    );
}
