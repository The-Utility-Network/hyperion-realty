'use client';

import { motion } from 'framer-motion';

export default function TerminalSidebar({ activeTab, setActiveTab }: { activeTab?: string, setActiveTab?: (t: string) => void }) {
    return (
        <div className="w-20 md:w-72 h-full bg-[#050914]/80 backdrop-blur-md border-r border-white/5 flex flex-col justify-between py-6">
            <div>
                {/* Brand Logo */}
                <div className="px-6 mb-12 flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-hr-gold to-yellow-600 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)] shrink-0">
                        <span className="text-black font-black text-xs">HR</span>
                    </div>
                    <span className="hidden md:block text-white font-black tracking-widest uppercase text-sm">
                        Hyperion
                    </span>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-2 px-3">
                    <SidebarItem icon="trade" label="Trade" active={activeTab === 'trade'} onClick={() => setActiveTab?.('trade')} />
                    <SidebarItem icon="orderbook" label="Order Book" active={activeTab === 'orderbook'} onClick={() => setActiveTab?.('orderbook')} />
                    <SidebarItem icon="heatmap" label="Markets" active={activeTab === 'heatmap'} onClick={() => setActiveTab?.('heatmap')} />
                    <SidebarItem icon="portfolio" label="Portfolio" active={activeTab === 'portfolio'} onClick={() => setActiveTab?.('portfolio')} />
                    <SidebarItem icon="profile" label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab?.('profile')} />
                </nav>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col px-4 gap-6">
                
                {/* Traded Asset Widget */}
                {activeTab === 'trade' && (
                    <div className="hidden md:flex flex-col bg-white/[0.02] border border-white/5 rounded-xl p-3 overflow-hidden">
                        <div className="h-28 w-full rounded-lg overflow-hidden relative mb-3">
                            <img src="/artifacts/luxury_exterior_light.png" alt="Property" className="object-cover w-full h-full" />
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-white/10">
                                <span className="text-[9px] font-mono text-green-400 font-bold uppercase tracking-widest flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                    Live
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-white">1428 Sunset Boulevard</span>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-[10px] text-white/40 font-mono">Los Angeles, CA</span>
                                <span className="text-[10px] text-hr-gold font-mono font-bold">$14.2M</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-center md:justify-start gap-3 opacity-50 hover:opacity-100 transition-opacity cursor-not-allowed px-2">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <span className="hidden md:block text-xs text-white/50 font-mono">Settings</span>
                </div>
            </div>
        </div>
    );
}

function SidebarItem({ icon, label, active = false, onClick }: { icon: string, label: string, active?: boolean, onClick?: () => void }) {
    return (
        <button onClick={onClick} className={`relative flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-300 group overflow-hidden ${active ? 'text-hr-gold' : 'text-gray-400 hover:text-white'}`}>
            {active && (
                <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-hr-gold/10 border border-hr-gold/20 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
            <div className="relative z-10 flex items-center justify-center w-6 h-6 shrink-0">
                {icon === 'trade' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                {icon === 'orderbook' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>}
                {icon === 'heatmap' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
                {icon === 'portfolio' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
                {icon === 'profile' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
            </div>
            <span className={`relative z-10 hidden md:block text-sm font-medium tracking-wide ${active ? 'text-hr-gold' : ''}`}>
                {label}
            </span>
        </button>
    );
}
