'use client';

import { useState, useEffect } from 'react';
import TerminalSidebar from './TerminalSidebar';
import TradingBoard from './TradingBoard';

export default function ExchangeTerminal() {
    const [activeTab, setActiveTab] = useState('trade');

    return (
        <div className="relative w-full max-w-7xl mx-auto h-[800px] md:h-[650px] bg-black/60 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col md:flex-row">
            {/* Ambient Background Glow inside the terminal */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-hr-gold/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#050914]/80 blur-[100px] rounded-full pointer-events-none" />
            
            {/* Components Layered Above */}
            <div className="relative z-10 flex flex-col md:flex-row w-full h-full">
                {/* 1. Sidebar */}
                <TerminalSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                
                {/* 2. Unified Trading Board (Chart + Matrix) OR Holdings */}
                {activeTab === 'trade' ? (
                    <TradingBoard />
                ) : (
                    <HoldingsPlaceholder tab={activeTab} />
                )}
            </div>
            
            {/* Mobile note for Order Book */}
            {activeTab === 'trade' && (
                <div className="md:hidden p-4 border-t border-white/5 bg-[#03060c] text-center">
                    <span className="text-xs font-mono text-hr-gold tracking-widest uppercase">Rotate device for full execution matrix</span>
                </div>
            )}
        </div>
    );
}

function HoldingsPlaceholder({ tab }: { tab: string }) {
    const titles = {
        book: "Global Market Heatmap",
        portfolio: "Your Vault Holdings",
        profile: "Investor Profile & Limits"
    };

    const assets = [
        { name: "1428 Sunset Boulevard", location: "Los Angeles, CA", size: "12,400 sq.ft.", price: "$14.2M", stake: "2.5%", value: "$355,000", img: "/artifacts/luxury_exterior_light.png" },
        { name: "The Crown Penthouse", location: "Dubai, UAE", size: "8,900 sq.ft.", price: "$28.5M", stake: "0.8%", value: "$228,000", img: "/artifacts/luxury_pool_terrace.png" },
        { name: "Soho Grand Loft", location: "New York, NY", size: "4,200 sq.ft.", price: "$8.1M", stake: "5.0%", value: "$405,000", img: "/artifacts/luxury_interior_lobby.png" },
    ];

    if (tab === 'heatmap') {
        return <MarketHeatmap />;
    }
    if (tab === 'orderbook') {
        return <LiveOrderBook />;
    }
    if (tab === 'profile') {
        return <InvestorProfile />;
    }

    return (
        <div className="flex-1 flex flex-col p-4 md:p-8 overflow-hidden bg-[#050914] relative z-0">
            <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-6">{titles[tab as keyof typeof titles]}</h2>
            
            {(tab === 'portfolio') && (
                <div className="flex flex-col gap-4">
                    <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/10 text-[10px] font-mono text-white/40 uppercase tracking-widest">
                        <div className="col-span-1"></div>
                        <div className="col-span-5">Asset</div>
                        <div className="col-span-2">Valuation</div>
                        <div className="col-span-2">Your Stake</div>
                        <div className="col-span-2 text-right">Holding Value</div>
                    </div>
                    {assets.map((asset, i) => (
                        <div key={i} className="flex flex-col lg:grid lg:grid-cols-12 gap-4 p-4 lg:px-6 items-center bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] transition-colors cursor-pointer group">
                            <div className="col-span-1 self-start lg:self-center w-full lg:w-auto">
                                <div className="w-16 h-16 lg:w-10 lg:h-10 rounded-xl overflow-hidden relative">
                                    <img src={asset.img} alt={asset.name} className="object-cover w-full h-full opacity-70 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                            <div className="col-span-5 flex flex-col text-center lg:text-left">
                                <span className="font-bold text-white text-sm">{asset.name}</span>
                                <span className="text-white/40 text-xs">{asset.location} • {asset.size}</span>
                            </div>
                            <div className="col-span-2 text-white/80 font-mono text-sm">{asset.price}</div>
                            <div className="col-span-2 text-hr-gold font-mono text-sm">{asset.stake}</div>
                            <div className="col-span-2 text-right text-green-400 font-mono font-bold text-sm bg-green-400/10 border border-green-400/20 py-1.5 px-3 rounded-lg w-full lg:w-auto mt-2 lg:mt-0 text-center lg:text-right">
                                {asset.value}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function InvestorProfile() {
    return (
        <div className="flex-1 flex flex-col p-4 md:p-8 overflow-hidden bg-[#050914] relative z-0">
            {/* Header / PFP */}
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 mb-6 pb-6 border-b border-white/10">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-hr-gold shadow-[0_0_30px_rgba(212,175,55,0.3)] shrink-0">
                    <img src="/artifacts/investor_pfp.png" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col mt-2">
                    <h2 className="text-3xl font-black text-white uppercase tracking-widest mb-2">Alexander Vance</h2>
                    <span className="text-white/50 font-mono text-sm uppercase tracking-widest mb-4">Tier 1 • Institutional Priority • VIP</span>
                    <div className="flex gap-4 justify-center md:justify-start">
                        <span className="bg-white/5 px-3 py-1 rounded text-xs font-mono text-white/50">Joined Oct 2024</span>
                        <span className="bg-hr-gold/10 border border-hr-gold/20 text-hr-gold px-3 py-1 rounded text-xs font-mono">KYC Level 3</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <h3 className="text-base font-bold text-white uppercase tracking-widest mb-4 border-l-4 border-hr-gold pl-4 text-center md:text-left">Performance Metrics (YTD)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex flex-col items-center md:items-start text-center md:text-left">
                    <span className="text-white/40 font-mono text-xs uppercase mb-2">Win / Loss Ratio</span>
                    <span className="text-3xl font-black text-white">68.4%</span>
                    <span className="text-green-400 text-[10px] font-mono mt-2">+2.4% vs S&P500 Re</span>
                </div>
                <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex flex-col items-center md:items-start text-center md:text-left">
                    <span className="text-white/40 font-mono text-xs uppercase mb-2">Realized Profit</span>
                    <span className="text-3xl font-black text-green-400">+$284.1K</span>
                    <span className="text-white/30 text-[10px] font-mono mt-2">144 Trades Executed</span>
                </div>
                <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex flex-col relative overflow-hidden items-center md:items-start text-center md:text-left">
                    <div className="absolute right-0 bottom-0 w-24 h-24 bg-hr-gold/10 blur-[30px] rounded-full" />
                    <span className="text-white/40 font-mono text-xs uppercase mb-2 relative z-10">Total Dividends</span>
                    <span className="text-3xl font-black text-hr-gold relative z-10">$41,208</span>
                    <span className="text-hr-gold/50 text-[10px] font-mono mt-2 relative z-10">Automatic Reinvestment ON</span>
                </div>
                <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex flex-col items-center md:items-start text-center md:text-left">
                    <span className="text-white/40 font-mono text-xs uppercase mb-2">Volume (30D)</span>
                    <span className="text-3xl font-black text-white">$1.2M</span>
                    <span className="text-white/30 text-[10px] font-mono mt-2">Top 4% of Platform</span>
                </div>
            </div>

            {/* Limits */}
            <h3 className="text-base font-bold text-white uppercase tracking-widest mb-4 border-l-4 border-hr-gold pl-4 text-center md:text-left">Account Limits</h3>
             <div className="bg-black/50 border border-white/10 p-5 rounded-xl">
                 <div className="flex flex-col md:flex-row justify-between text-xs font-mono text-white/50 mb-3 text-center md:text-left gap-2">
                     <span>Daily Notional Value Executed</span>
                     <span>$245,000 / $1,000,000</span>
                 </div>
                 <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                     <div className="bg-gradient-to-r from-hr-gold to-yellow-600 w-1/4 h-full" />
                 </div>
             </div>
        </div>
    );
}

function MarketHeatmap() {
    return (
        <div className="flex-1 flex flex-col p-4 md:p-6 overflow-hidden bg-[#050914] relative z-0 h-full">
            <div className="flex justify-between items-end mb-4 px-2">
                <div className="flex flex-col">
                    <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest leading-none">Global Heatmap</h2>
                    <span className="text-white/40 font-mono text-[10px] uppercase mt-2">Real-time Performance & Market Cap Flow</span>
                </div>
                <span className="text-black font-mono text-[10px] md:text-xs font-bold bg-hr-gold px-3 py-1 rounded shadow-[0_0_15px_rgba(212,175,55,0.4)]">24H VOL: $94.2M</span>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row gap-[2px] h-full min-h-[450px] bg-black p-[2px] border border-white/10">
                
                {/* Column 1: North America */}
                <div className="flex-[4] flex flex-col gap-[2px]">
                    <span className="text-[10px] uppercase font-mono text-white/50 w-full block text-center leading-none mt-1 pb-1 border-b border-white/5">North America</span>
                    <div className="flex-1 flex flex-col gap-[2px]">
                        {/* Mega cap row */}
                        <div className="flex-[3] flex gap-[2px]">
                            {/* West Coast Matrix */}
                            <div className="flex-[4] flex flex-col gap-[2px]">
                                <HeatmapBlock className="flex-[3] bg-[#008f39] text-white text-base md:text-xl" label="1428 Sunset Blvd" perf="+4.20%" />
                                <div className="flex-[1] flex gap-[2px]">
                                    <HeatmapBlock className="flex-[2] bg-[#00a844] text-[8px] text-white" label="Beverly" perf="+6.1%" />
                                    <HeatmapBlock className="flex-[1] bg-[#c21807] text-[7px] text-white" label="Malibu" perf="-3.2%" />
                                    <div className="flex-[1] flex flex-col gap-[2px]">
                                        <HeatmapBlock className="flex-[1] bg-[#005c29] text-[5px] text-white" label="Bel Air" perf="+1.1%" />
                                        <HeatmapBlock className="flex-[1] bg-[#8b0000] text-[5px] text-white" label="HW-9" perf="-7.4%" />
                                    </div>
                                    <HeatmapBlock className="flex-[2] bg-[#00a844] text-[8px] text-white" label="SF Modern" perf="+8.2%" />
                                    <HeatmapBlock className="flex-[1] bg-[#222222] text-[7px] text-white/50" label="OAK C" perf="0.0%" />
                                    <div className="flex-[1] flex flex-col gap-[2px]">
                                        <HeatmapBlock className="flex-[1] bg-[#ff3333] text-[4px] text-white" label="SD-V" perf="-4.5%" />
                                        <HeatmapBlock className="flex-[1] bg-[#008f39] text-[4px] text-white" label="SAC-T" perf="+2.8%" />
                                        <HeatmapBlock className="flex-[1] bg-[#005c29] text-[4px] text-white" label="SJC-L" perf="+0.4%" />
                                    </div>
                                    <HeatmapBlock className="flex-[2] bg-[#ff3333] text-[8px] text-white" label="La Jolla" perf="-5.6%" />
                                </div>
                            </div>
                            
                            {/* East Coast Matrix */}
                            <div className="flex-[2] flex flex-col gap-[2px]">
                                <HeatmapBlock className="flex-[3] bg-[#c21807] text-white text-sm md:text-base" label="Soho Grand Loft" perf="-1.80%" />
                                <div className="flex-[1] flex gap-[2px]">
                                    <HeatmapBlock className="flex-[2] bg-[#005c29] text-[7px] text-white" label="NY-3" perf="+1.2%" />
                                    <div className="flex-[1] flex flex-col gap-[2px]">
                                        <HeatmapBlock className="flex-1 bg-[#ff3333] text-[5px] text-white" label="BOS-A" perf="-4.5%" />
                                        <HeatmapBlock className="flex-1 bg-[#c21807] text-[5px] text-white" label="BOS-B" perf="-2.1%" />
                                    </div>
                                    <HeatmapBlock className="flex-[2] bg-[#00a844] text-[7px] text-white" label="PHI-9" perf="+6.1%" />
                                    <div className="flex-[1] flex flex-col gap-[2px]">
                                        <HeatmapBlock className="flex-[1] bg-[#008f39] text-[4px] text-white" label="NJ-1" perf="+2.1%" />
                                        <HeatmapBlock className="flex-[1] bg-[#8b0000] text-[4px] text-white" label="CT-P" perf="-7.2%" />
                                        <HeatmapBlock className="flex-[1] bg-[#222] text-[4px] text-white/50" label="RI-X" perf="0.0%" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-[2] flex gap-[2px]">
                            {/* Sunbelt Matrix */}
                            <div className="flex-[3] flex flex-col gap-[2px]">
                                <div className="flex-[3] flex gap-[2px]">
                                    <HeatmapBlock className="flex-[2] bg-[#005c29] text-white" label="Miami Vista" perf="+1.14%" />
                                    <HeatmapBlock className="flex-[1] bg-[#ff3333] text-[9px] text-white" label="Bel Air Estate" perf="-3.40%" />
                                </div>
                                <div className="flex-[1] flex gap-[2px]">
                                    <HeatmapBlock className="flex-1 bg-[#00a844] text-[6px] text-white" label="MIA-P" perf="+5.2%" />
                                    <HeatmapBlock className="flex-[2] bg-[#c21807] text-[6px] text-white" label="ORL-9" perf="-2.1%" />
                                    <HeatmapBlock className="flex-1 bg-[#ff3333] text-[6px] text-white" label="TPA-X" perf="-4.8%" />
                                    <HeatmapBlock className="flex-[2] bg-[#008f39] text-[7px] text-white" label="ATL-S" perf="+3.1%" />
                                    <div className="flex-1 flex flex-col gap-[2px]">
                                        <HeatmapBlock className="flex-1 bg-[#222] text-[4px] text-white/50" label="PBI" perf="0.0%" />
                                        <HeatmapBlock className="flex-1 bg-[#00a844] text-[4px] text-white" label="JAX" perf="+6.2%" />
                                    </div>
                                    <HeatmapBlock className="flex-[1] bg-[#005c29] text-[6px] text-white" label="Austin" perf="+0.8%" />
                                    <HeatmapBlock className="flex-[1] bg-[#008f39] text-[6px] text-white" label="Dallas" perf="+2.4%" />
                                    <div className="flex-1 flex flex-col gap-[2px]">
                                        <HeatmapBlock className="flex-1 bg-[#c21807] text-[4px] text-white" label="HOU-1" perf="-1.8%" />
                                        <HeatmapBlock className="flex-1 bg-[#ff3333] text-[4px] text-white" label="HOU-2" perf="-4.2%" />
                                        <HeatmapBlock className="flex-1 bg-[#8b0000] text-[4px] text-white" label="SAN-T" perf="-8.1%" />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Small cap overflow block */}
                            <div className="flex-[1] flex flex-col gap-[2px]">
                                <div className="flex-1 flex gap-[2px]">
                                    <HeatmapBlock className="flex-[2] bg-[#8b0000] text-[7px] text-white" label="NY Brown" perf="-6.20%" />
                                    <HeatmapBlock className="flex-[2] bg-[#008f39] text-[7px] text-white" label="Chicago Twr" perf="+3.10%" />
                                </div>
                                <div className="flex-1 flex gap-[2px]">
                                    <HeatmapBlock className="flex-[1] bg-[#222222] text-[7px] text-white/50" label="Mia Beach" perf="0.0%" />
                                    <HeatmapBlock className="flex-[1] bg-[#ff3333] text-[7px] text-white" label="DC Condo" perf="-4.50%" />
                                    <HeatmapBlock className="flex-[2] bg-[#c21807] text-[7px] text-white" label="LA Venice" perf="-2.10%" />
                                </div>
                                <div className="flex-1 flex gap-[2px]">
                                    <HeatmapBlock className="flex-[1] bg-[#00a844] text-[5px] text-white" label="VAN-9" perf="+6.1%" />
                                    <HeatmapBlock className="flex-[1] bg-[#005c29] text-[5px] text-white" label="TOR-2" perf="+1.2%" />
                                    <HeatmapBlock className="flex-[1] bg-[#ff3333] text-[5px] text-white" label="MTL-X" perf="-3.5%" />
                                    <HeatmapBlock className="flex-[1] bg-[#c21807] text-[5px] text-white" label="CAL-V" perf="-2.4%" />
                                    <HeatmapBlock className="flex-[1] bg-[#008f39] text-[5px] text-white" label="EDM-T" perf="+4.1%" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Column 2: EMEA & APAC */}
                <div className="flex-[6] flex flex-col gap-[2px]">
                    
                    {/* Row 1: Middle East */}
                    <div className="flex-[3] flex flex-col gap-[2px]">
                        <span className="text-[10px] uppercase font-mono text-white/50 w-full block text-center leading-none mt-1 pb-1 border-b border-white/5">Middle East</span>
                        <div className="flex-1 flex gap-[2px]">
                            <div className="flex-[4] flex flex-col gap-[2px]">
                                <HeatmapBlock className="flex-[3] bg-[#00a844] text-white" label="Crown Penthouse" perf="+6.10%" />
                                <div className="flex-[1] flex gap-[2px]">
                                    <HeatmapBlock className="flex-[2] bg-[#008f39] text-[8px] text-white" label="Marina Flat" perf="+2.80%" />
                                    <HeatmapBlock className="flex-[1] bg-[#005c29] text-[7px] text-white" label="DUB-A1" perf="+1.1%" />
                                    <HeatmapBlock className="flex-[1] bg-[#ff3333] text-[7px] text-white" label="DUB-L" perf="-4.8%" />
                                    <div className="flex-[1] flex flex-col gap-[2px]">
                                        <HeatmapBlock className="flex-[1] bg-[#c21807] text-[5px] text-white" label="DXB-X" perf="-2.9%" />
                                        <HeatmapBlock className="flex-[1] bg-[#00a844] text-[5px] text-white" label="DXB-Y" perf="+7.4%" />
                                    </div>
                                    <HeatmapBlock className="flex-[2] bg-[#008f39] text-[9px] text-white" label="Jumeirah" perf="+3.4%" />
                                </div>
                            </div>
                            <div className="flex-[2] flex flex-col gap-[2px]">
                                <HeatmapBlock className="flex-[2] bg-[#c21807] text-[10px] text-white" label="Palm Villa" perf="-2.40%" />
                                <div className="flex-[1] flex gap-[2px]">
                                    <HeatmapBlock className="flex-[1] bg-[#8b0000] text-[6px] text-white" label="PLM-1" perf="-6.1%" />
                                    <HeatmapBlock className="flex-[1] bg-[#ff3333] text-[6px] text-white" label="PLM-2" perf="-5.4%" />
                                    <div className="flex-[1] flex flex-col gap-[2px]">
                                        <HeatmapBlock className="flex-[1] bg-[#c21807] text-[4px] text-white" label="PLM-3" perf="-2.1%" />
                                        <HeatmapBlock className="flex-[1] bg-[#222] text-[4px] text-white/50" label="PLM-4" perf="0.0%" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex-[1] flex flex-col gap-[2px]">
                                <HeatmapBlock className="flex-[2] bg-[#005c29] text-[9px] text-white" label="Abu Dhabi Luxe" perf="+1.40%" />
                                <HeatmapBlock className="flex-[2] bg-[#ff3333] text-[8px] text-white" label="Doha Pearl" perf="-4.40%" />
                                <div className="flex-[1] flex gap-[2px]">
                                    <HeatmapBlock className="flex-[1] bg-[#c21807] text-[6px] text-white" label="Riyadh" perf="-1.2%" />
                                    <div className="flex-[1] flex flex-col gap-[2px]">
                                        <HeatmapBlock className="flex-[1] bg-[#008f39] text-[4px] text-white" label="MCT-1" perf="+2.1%" />
                                        <HeatmapBlock className="flex-[1] bg-[#005c29] text-[4px] text-white" label="MCT-2" perf="+0.8%" />
                                    </div>
                                    <HeatmapBlock className="flex-[1] bg-[#8b0000] text-[5px] text-white" label="KUW" perf="-6.8%" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Europe & APAC */}
                    <div className="flex-[4] flex gap-[2px]">
                        
                        {/* Europe Sub-sector */}
                        <div className="flex-[4] flex flex-col gap-[2px]">
                            <span className="text-[10px] uppercase font-mono text-white/50 w-full block text-center leading-none mt-1 pb-1 border-b border-white/5">Europe</span>
                            <div className="flex-1 flex flex-col gap-[2px]">
                                <div className="flex-[2] flex gap-[2px]">
                                    <div className="flex-[3] flex flex-col gap-[2px]">
                                        <div className="flex-[2] flex gap-[2px]">
                                            <HeatmapBlock className="flex-[3] bg-[#222222] text-[11px] text-white/50" label="Mayfair Flat" perf="0.00%" />
                                            <HeatmapBlock className="flex-[1] bg-[#008f39] text-[8px] text-white" label="Kensington" perf="+3.1%" />
                                        </div>
                                        <div className="flex-[1] flex gap-[2px]">
                                            <HeatmapBlock className="flex-[1] bg-[#ff3333] text-[6px] text-white" label="LON-C" perf="-4.2%" />
                                            <HeatmapBlock className="flex-[1] bg-[#c21807] text-[6px] text-white" label="LON-E" perf="-2.1%" />
                                            <HeatmapBlock className="flex-[1] bg-[#00a844] text-[6px] text-white" label="LON-W" perf="+6.4%" />
                                            <HeatmapBlock className="flex-[2] bg-[#005c29] text-[7px] text-white" label="Oxford St" perf="+1.8%" />
                                            <div className="flex-[1] flex flex-col gap-[2px]">
                                                <HeatmapBlock className="flex-[1] bg-[#8b0000] text-[4px] text-white" label="MNC" perf="-8.1%" />
                                                <HeatmapBlock className="flex-[1] bg-[#ff3333] text-[4px] text-white" label="LIV" perf="-3.5%" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-[2] flex flex-col gap-[2px]">
                                        <HeatmapBlock className="flex-[2] bg-[#008f39] text-white" label="Louvre Ap" perf="+2.20%" />
                                        <div className="flex-[1] flex gap-[2px]">
                                            <HeatmapBlock className="flex-[1] bg-[#00a844] text-[6px] text-white" label="PAR-S" perf="+5.1%" />
                                            <HeatmapBlock className="flex-[1] bg-[#ff3333] text-[6px] text-white" label="LYN-X" perf="-4.2%" />
                                            <HeatmapBlock className="flex-[1] bg-[#005c29] text-[6px] text-white" label="MRS-C" perf="+1.4%" />
                                            <HeatmapBlock className="flex-[2] bg-[#c21807] text-[6px] text-white" label="Riviera" perf="-2.8%" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-[1] flex gap-[2px]">
                                    <HeatmapBlock className="flex-[2] bg-[#c21807] text-[8px] text-white" label="Rome Villa" perf="-1.50%" />
                                    <HeatmapBlock className="flex-[1] bg-[#8b0000] text-[8px] text-white" label="Milan C" perf="-8.20%" />
                                    <HeatmapBlock className="flex-[1] bg-[#00a844] text-[6px] text-white" label="NAP-1" perf="+7.1%" />
                                    <HeatmapBlock className="flex-[2] bg-[#005c29] text-[8px] text-white" label="Berlin MZ" perf="+0.40%" />
                                    <HeatmapBlock className="flex-[1] bg-[#c21807] text-[6px] text-white" label="MUN-X" perf="-2.4%" />
                                    <div className="flex-[1] flex flex-col gap-[2px]">
                                        <HeatmapBlock className="flex-[1] bg-[#8b0000] text-[4px] text-white" label="FRA" perf="-6.5%" />
                                        <HeatmapBlock className="flex-[1] bg-[#ff3333] text-[4px] text-white" label="HAM" perf="-3.1%" />
                                    </div>
                                    <HeatmapBlock className="flex-[1] bg-[#ff3333] text-[8px] text-white" label="Monaco CA" perf="-3.80%" />
                                    <HeatmapBlock className="flex-[1] bg-[#008f39] text-[8px] text-white" label="Madrid PZ" perf="+4.10%" />
                                    <HeatmapBlock className="flex-[1] bg-[#005c29] text-[6px] text-white" label="BAR-K" perf="+1.8%" />
                                    <HeatmapBlock className="flex-[1] bg-[#c21807] text-[6px] text-white" label="VAL-A" perf="-2.9%" />
                                </div>
                            </div>
                        </div>

                        {/* APAC Sub-sector */}
                        <div className="flex-[3] flex flex-col gap-[2px]">
                            <span className="text-[10px] uppercase font-mono text-white/50 w-full block text-center leading-none mt-1 pb-1 border-b border-white/5">Asia Pacific</span>
                            <div className="flex-1 flex flex-col gap-[2px]">
                                <div className="flex-[2] flex gap-[2px]">
                                    <HeatmapBlock className="flex-[3] bg-[#00a844] text-white shadow-[0_0_20px_rgba(0,168,68,0.4)] z-10" label="Bay Sands" perf="+12.40%" />
                                    <div className="flex-[1] flex flex-col gap-[2px]">
                                        <HeatmapBlock className="flex-[1] bg-[#008f39] text-[5px] text-white" label="SIN-1" perf="+4.1%" />
                                        <HeatmapBlock className="flex-[1] bg-[#005c29] text-[5px] text-white" label="SIN-2" perf="+1.8%" />
                                        <HeatmapBlock className="flex-[1] bg-[#c21807] text-[5px] text-white" label="SIN-3" perf="-2.2%" />
                                        <HeatmapBlock className="flex-[1] bg-[#ff3333] text-[5px] text-white" label="KL-X" perf="-5.4%" />
                                        <HeatmapBlock className="flex-[1] bg-[#8b0000] text-[5px] text-white" label="JKT-V" perf="-8.1%" />
                                    </div>
                                </div>
                                <div className="flex-[1] flex gap-[2px]">
                                    <HeatmapBlock className="flex-[2] bg-[#ff3333] text-[9px] text-white" label="Shibuya" perf="-7.20%" />
                                    <div className="flex-[1] flex flex-col gap-[2px]">
                                        <HeatmapBlock className="flex-[1] bg-[#8b0000] text-[4px] text-white" label="OSA-1" perf="-8.5%" />
                                        <HeatmapBlock className="flex-[1] bg-[#c21807] text-[4px] text-white" label="KYT-X" perf="-2.4%" />
                                    </div>
                                    <HeatmapBlock className="flex-[2] bg-[#008f39] text-[9px] text-white" label="HK Peak" perf="+3.10%" />
                                    <div className="flex-[1] flex flex-col gap-[2px]">
                                        <HeatmapBlock className="flex-[1] bg-[#00a844] text-[4px] text-white" label="KOW-1" perf="+7.2%" />
                                        <HeatmapBlock className="flex-[1] bg-[#005c29] text-[4px] text-white" label="MCO-7" perf="+1.1%" />
                                    </div>
                                    <HeatmapBlock className="flex-[1] bg-[#222] text-[6px] text-white/50" label="SEO V" perf="0.0%" />
                                    <HeatmapBlock className="flex-[1] bg-[#00a844] text-[6px] text-white" label="SYD Q" perf="+5.8%" />
                                    <HeatmapBlock className="flex-[1] bg-[#c21807] text-[6px] text-white" label="MEL C" perf="-1.9%" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function HeatmapBlock({ className, label, perf }: { className: string, label: string, perf: string }) {
    return (
        <div className={`flex flex-col justify-center items-center flex-wrap transition-all cursor-pointer overflow-hidden leading-tight p-0.5 px-1 ${className}`}>
            <span className="font-bold tracking-tight text-center w-full break-words">{label}</span>
            <span className="font-mono opacity-80 text-center w-full mt-0.5 text-[0.8em]">{perf}</span>
        </div>
    );
}

function LiveOrderBook() {
    const [trades, setTrades] = useState<any[]>([]);
    const [bids, setBids] = useState<any[]>([]);
    const [asks, setAsks] = useState<any[]>([]);
    const targetPrice = 14.20;

    useEffect(() => {
        // Build initial spread
        const initialAsks = Array.from({length: 14}).map((_, i) => ({
            price: targetPrice + ((i + 1) * 0.01),
            size: Math.floor(Math.random() * 500) + 10,
        })).reverse();
        
        const initialBids = Array.from({length: 14}).map((_, i) => ({
            price: targetPrice - ((i + 1) * 0.01),
            size: Math.floor(Math.random() * 500) + 10,
        }));

        setAsks(initialAsks);
        setBids(initialBids);

        // Fill initial tape
        const initialTrades = Array.from({length: 30}).map((_, i) => {
            const isBuy = Math.random() > 0.5;
            return {
                time: new Date(Date.now() - i * 4000).toLocaleTimeString([], { hour12: false }),
                price: (targetPrice + (isBuy ? 0.01 : -0.01)).toFixed(2),
                size: Math.floor(Math.random() * 100) + 5,
                side: isBuy ? 'buy' : 'sell'
            };
        });
        setTrades(initialTrades);

        // Simulation Loop
        const interval = setInterval(() => {
            const isBuy = Math.random() > 0.5;
            const newTrade = {
                time: new Date().toLocaleTimeString([], { hour12: false }),
                price: (targetPrice + (isBuy ? 0.01 : -0.01)).toFixed(2),
                size: Math.floor(Math.random() * 80) + 5,
                side: isBuy ? 'buy' : 'sell'
            };
            setTrades(prev => [newTrade, ...prev.slice(0, 29)]);
            
            // Liquidity Jiggle
            setAsks(prev => prev.map(a => ({...a, size: Math.max(10, a.size + Math.floor(Math.random()*40)-20)})));
            setBids(prev => prev.map(b => ({...b, size: Math.max(10, b.size + Math.floor(Math.random()*40)-20)})));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const maxAskSize = Math.max(...asks.map(a => a.size), 1);
    const maxBidSize = Math.max(...bids.map(b => b.size), 1);

    return (
        <div className="flex-1 flex flex-col p-4 md:p-6 overflow-hidden bg-[#050914] relative z-0 h-full">
            <div className="flex justify-between items-end mb-4 px-2">
                <div className="flex flex-col">
                    <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest leading-none">Order Book</h2>
                    <span className="text-white/40 font-mono text-[10px] uppercase mt-2">1428 Sunset Boulevard • Depth Chart & Live Tape</span>
                </div>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row gap-4 h-full min-h-[450px]">
                
                {/* Left Column: Bids & Asks */}
                <div className="flex-[2] flex flex-col bg-black border border-white/10 rounded-xl overflow-hidden font-mono text-[10px] md:text-xs">
                    {/* Headers */}
                    <div className="flex justify-between px-4 py-2 border-b border-white/5 text-white/40 bg-white/[0.02]">
                        <span>Price (USDT)</span>
                        <span>Size (Token)</span>
                        <div className="w-1/3 text-right hidden lg:block">Total</div>
                    </div>

                    {/* Asks (Sell Orders - Top Half - Red) */}
                    <div className="flex-1 flex flex-col justify-end overflow-hidden">
                        {asks.map((ask, i) => (
                            <div key={`ask-${i}`} className="flex justify-between px-4 py-1 relative group hover:bg-white/[0.05] transition-colors cursor-pointer">
                                <div className="absolute right-0 top-0 bottom-0 bg-red-500/10" style={{ width: `${(ask.size / maxAskSize) * 100}%` }} />
                                <span className="text-red-500 z-10">{ask.price.toFixed(2)}</span>
                                <span className="text-white/80 z-10">{ask.size.toLocaleString()}</span>
                                <span className="w-1/3 text-right text-white/40 hidden lg:block z-10">{(ask.price * ask.size).toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                            </div>
                        ))}
                    </div>

                    {/* Market Middle */}
                    <div className="py-2 border-y border-white/10 flex items-center justify-center gap-4 bg-white/[0.02]">
                        <span className="text-xl font-bold text-hr-gold">{targetPrice.toFixed(2)}</span>
                        <span className="text-white/50 border border-white/10 px-2 py-0.5 rounded text-[10px]">Spread: 0.02</span>
                    </div>

                    {/* Bids (Buy Orders - Bottom Half - Green) */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        {bids.map((bid, i) => (
                            <div key={`bid-${i}`} className="flex justify-between px-4 py-1 relative group hover:bg-white/[0.05] transition-colors cursor-pointer">
                                <div className="absolute left-0 top-0 bottom-0 bg-green-500/10" style={{ width: `${(bid.size / maxBidSize) * 100}%` }} />
                                <span className="text-green-500 z-10">{bid.price.toFixed(2)}</span>
                                <span className="text-white/80 z-10">{bid.size.toLocaleString()}</span>
                                <span className="w-1/3 text-right text-white/40 hidden lg:block z-10">{(bid.price * bid.size).toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Live Tape */}
                <div className="flex-1 flex flex-col bg-black border border-white/10 rounded-xl overflow-hidden font-mono text-[10px] md:text-xs">
                    <div className="px-4 py-2 border-b border-white/5 text-white/40 bg-white/[0.02] flex justify-between">
                        <span>Time</span>
                        <span>Price</span>
                        <span>Size</span>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {trades.map((trade, i) => (
                            <div key={i} className={`flex justify-between px-4 py-1.5 border-b border-white/[0.02] ${i === 0 ? 'bg-white/[0.05]' : 'hover:bg-white/[0.02]'} transition-colors`}>
                                <span className="text-white/40">{trade.time}</span>
                                <span className={trade.side === 'buy' ? 'text-green-500' : 'text-red-500'}>{trade.price}</span>
                                <span className="text-white/80">{trade.size}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
