'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import ExchangeTerminal from '@/components/terminal/ExchangeTerminal';
import { useNewsletterSubmit } from '@/hooks/useNewsletterForm';

export default function Marketplace() {
    const [email, setEmail] = useState('');
    const { status, message, submit } = useNewsletterSubmit();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            submit(email.trim());
        }
    };

    return (
        <div className="min-h-screen bg-[#050914] text-white flex flex-col">
            <Navbar />
            
            <main className="flex-grow relative flex flex-col items-center pt-32 pb-24 overflow-hidden">
                {/* Immersive blurred background */}
                <div className="absolute inset-0 z-0 opacity-10 filter grayscale blur-[20px] scale-110 pointer-events-none">
                    <Image 
                        src="/artifacts/luxury_pool_terrace.png" 
                        alt="Background" 
                        fill 
                        className="object-cover"
                    />
                </div>
                
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#050914] via-[#050914]/90 to-[#050914] pointer-events-none" />

                {/* Header Text */}
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center mb-12">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border text-xs font-mono tracking-widest uppercase mb-6 text-hr-gold border-hr-gold/50 bg-hr-gold/10 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-hr-gold animate-pulse" />
                        Interface Demo
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tighter mb-4 leading-tight drop-shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                        Hyperion <span className="text-transparent bg-clip-text bg-gradient-to-r from-hr-gold to-yellow-200">Terminal</span>
                    </h1>
                    <p className="text-gray-400 font-light max-w-2xl mx-auto text-sm md:text-base">
                        Interact with the high-speed execution environment for liquid ERC20 real estate tokens. Tap the order book depth to simulate limit executions across primary yield assets. <strong className="text-hr-gold mt-2 block">Live spot trading commences in Q4 2027.</strong>
                    </p>
                </div>

                {/* Terminal Demo Area */}
                <div className="relative z-10 w-full px-4 md:px-8 mb-24">
                    <ExchangeTerminal />
                </div>

                {/* Primary Offerings / Bulletin Board */}
                {/* Primary Offerings / Bulletin Board */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full mb-32">
                    <div className="bg-gradient-to-b from-[#0a0f1c] to-[#050914] border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(212,175,55,0.05)] flex flex-col gap-12">
                        
                        {/* Header text */}
                        <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border text-[10px] font-mono tracking-widest uppercase mb-4 text-hr-gold border-hr-gold/30 bg-hr-gold/5">
                                    Market Origination
                                </div>
                                <h2 className="text-3xl lg:text-5xl font-extrabold uppercase tracking-tighter mb-4 text-white leading-tight">
                                    The Bulletin Board
                                </h2>
                                <p className="text-gray-400 font-light text-sm md:text-base leading-relaxed max-w-2xl">
                                    Before assets reach the highly-liquid secondary exchange, they originate on the Hyperion Bulletin Board. Similar to institutional syndication models, this primary ecosystem empowers investors to secure floor-level token allocations in fully vetted, institutional-grade commercial projects across the globe.
                                </p>
                            </div>
                            <div className="w-full md:w-1/3 shrink-0 bg-white/[0.02] border border-hr-gold/20 p-5 rounded-xl border-l-4 border-l-hr-gold">
                                <p className="text-gray-300 text-[10px] sm:text-xs font-mono uppercase tracking-widest leading-relaxed">
                                    <span className="text-hr-gold font-bold flex items-center gap-2 mb-2">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                        Notice: SEC Regulation D
                                    </span>
                                    To satisfy strict federal mandates, all primary offerings acquired via the Bulletin Board are locked upon closing. Investors must fulfill a mandatory <strong className="text-white">18-to-24 month holding period</strong> before positions mature into liquid tradable assets.
                                </p>
                            </div>
                        </div>
                        
                        {/* 3-Column Grid of Property Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            
                            {/* Card 1: Sunset */}
                            <div className="w-full bg-black/60 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer hover:border-hr-gold/50 transition-colors flex flex-col">
                                <div className="absolute -inset-1 bg-gradient-to-r from-hr-gold to-[#fff8] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-1000"></div>
                                <div className="relative">
                                    <div className="h-48 bg-white/5 relative">
                                        <Image src="/artifacts/loc_la.png" fill className="object-cover opacity-70 group-hover:opacity-100 transition-opacity" alt="Bulletin Property" />
                                        <div className="absolute top-4 left-4 bg-white text-black px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-sm border border-transparent shadow-lg">Accepting Funds</div>
                                        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur text-hr-gold px-2.5 py-1 text-[10px] font-mono border border-white/10 rounded-sm shadow-xl">12.5% Target IRR</div>
                                    </div>
                                    <div className="p-6 bg-[#03060c] flex-1 flex flex-col">
                                        <h4 className="font-black text-white text-lg mb-1 tracking-tighter uppercase">1428 Sunset Boulevard</h4>
                                        <p className="text-[10px] text-white/40 font-mono mb-6 uppercase tracking-widest">Los Angeles, CA • Retail Strip</p>
                                        
                                        <div className="w-full bg-white/5 h-2 rounded-full mb-3 overflow-hidden border border-white/5">
                                             <div className="h-full bg-hr-gold w-[70%]" />
                                        </div>
                                        <div className="flex justify-between text-xs font-mono mb-6">
                                            <span className="text-hr-gold font-bold">$4.2M Raised</span>
                                            <span className="text-white/40">Target: $6.0M</span>
                                        </div>

                                        <button className="w-full mt-auto bg-white/5 hover:bg-hr-gold/10 text-white hover:text-hr-gold transition-colors font-bold uppercase tracking-widest text-xs py-3 rounded-lg border border-white/10">
                                            Review Package
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Miami */}
                            <div className="w-full bg-black/60 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer hover:border-hr-gold/50 transition-colors flex flex-col">
                                <div className="absolute -inset-1 bg-gradient-to-r from-hr-gold to-[#fff8] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-1000"></div>
                                <div className="relative">
                                    <div className="h-48 bg-white/5 relative">
                                        <Image src="/artifacts/bulletin_miami_tower.png" fill className="object-cover opacity-70 group-hover:opacity-100 transition-opacity" alt="Bulletin Property" />
                                        <div className="absolute top-4 left-4 bg-white/10 backdrop-blur text-white px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-sm border border-white/20 shadow-lg">Due Diligence</div>
                                        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur text-hr-gold px-2.5 py-1 text-[10px] font-mono border border-white/10 rounded-sm shadow-xl">16.0% Target IRR</div>
                                    </div>
                                    <div className="p-6 bg-[#03060c] flex-1 flex flex-col">
                                        <h4 className="font-black text-white text-lg mb-1 tracking-tighter uppercase whitespace-nowrap overflow-hidden text-ellipsis">The Azure Horizon</h4>
                                        <p className="text-[10px] text-white/40 font-mono mb-6 uppercase tracking-widest">Miami, FL • High-Rise Resi</p>
                                        
                                        <div className="w-full bg-white/5 h-2 rounded-full mb-3 overflow-hidden border border-white/5">
                                             <div className="h-full bg-hr-gold w-[35%]" />
                                        </div>
                                        <div className="flex justify-between text-xs font-mono mb-6">
                                            <span className="text-hr-gold font-bold">$28.0M Raised</span>
                                            <span className="text-white/40">Target: $80.0M</span>
                                        </div>

                                        <button className="w-full mt-auto bg-white/5 hover:bg-hr-gold/10 text-white hover:text-hr-gold transition-colors font-bold uppercase tracking-widest text-xs py-3 rounded-lg border border-white/10">
                                            Review Package
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Card 3: Dallas */}
                            <div className="w-full bg-black/60 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer hover:border-hr-gold/50 transition-colors flex flex-col hidden md:flex">
                                <div className="absolute -inset-1 bg-gradient-to-r from-hr-gold to-[#fff8] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-1000"></div>
                                <div className="relative">
                                    <div className="h-48 bg-white/5 relative">
                                        <Image src="/artifacts/bulletin_logistics_center.png" fill className="object-cover opacity-70 group-hover:opacity-100 transition-opacity" alt="Bulletin Property" />
                                        <div className="absolute top-4 left-4 bg-hr-gold text-black border-hr-gold px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-sm border shadow-lg shadow-hr-gold/20 animate-pulse">Fully Funded</div>
                                        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur text-hr-gold px-2.5 py-1 text-[10px] font-mono border border-white/10 rounded-sm shadow-xl">8.5% Fixed Yield</div>
                                    </div>
                                    <div className="p-6 bg-[#03060c] flex-1 flex flex-col">
                                        <h4 className="font-black text-white text-lg mb-1 tracking-tighter uppercase whitespace-nowrap overflow-hidden text-ellipsis">Omega Freight Hub</h4>
                                        <p className="text-[10px] text-white/40 font-mono mb-6 uppercase tracking-widest">Dallas, TX • Indust Logistics</p>
                                        
                                        <div className="w-full bg-white/5 h-2 rounded-full mb-3 overflow-hidden border border-white/5">
                                             <div className="h-full bg-hr-gold w-[100%]" />
                                        </div>
                                        <div className="flex justify-between text-xs font-mono mb-6">
                                            <span className="text-hr-gold font-bold">Closed</span>
                                            <span className="text-white/40">Target Met: $12.5M</span>
                                        </div>

                                        <button className="w-full mt-auto bg-green-500/10 text-green-500 font-bold uppercase tracking-widest text-xs py-3 rounded-lg border border-green-500/20 cursor-default">
                                            Closing Escrow
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Interface Explainers */}
                <div className="relative z-10 max-w-6xl mx-auto px-6 w-full mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tighter mb-4 text-white">
                            Terminal Architecture
                        </h2>
                        <p className="text-gray-400 font-light max-w-2xl mx-auto md:text-lg">
                            The Hyperion Exchange Terminal is divided into four highly-specialized execution environments, granting unprecedented insight into the tokenized asset market.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Box 1: Execution Board (Span 8) */}
                        <div className="md:col-span-8 bg-black border border-white/10 p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:border-hr-gold/50 transition-colors">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-hr-gold/10 blur-[80px] rounded-full group-hover:bg-hr-gold/20 transition-all pointer-events-none" />
                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div className="mb-8 md:mb-12">
                                    <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-4">01. Live Execution Board</h3>
                                    <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl">
                                        An ultra-low latency canvas mapping historical price action. It utilizes deterministic collision detection against your active derivative projections, instantiating position vectors linearly against the ticker array to emulate authentic institutional tape threading.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                     <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10 flex flex-col">
                                         <span className="text-[10px] font-mono text-white/50 uppercase">Tick Rate</span>
                                         <span className="text-hr-gold font-bold">1ms</span>
                                     </div>
                                     <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10 flex flex-col">
                                         <span className="text-[10px] font-mono text-white/50 uppercase">Collision Engine</span>
                                         <span className="text-green-400 font-bold">Active</span>
                                     </div>
                                </div>
                            </div>
                        </div>

                        {/* Box 2: Deep Book (Span 4) */}
                        <div className="md:col-span-4 bg-black border border-white/10 p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:border-hr-gold/50 transition-colors">
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="mb-8">
                                     <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4">02. Deep Book</h3>
                                     <p className="text-gray-400 text-sm leading-relaxed">
                                        Classic institutional depth charting exposing raw bids and asks across the active spread.
                                     </p>
                                </div>
                                <div className="mt-auto space-y-3">
                                     <div className="h-2.5 w-full bg-red-500/20 rounded overflow-hidden">
                                         <div className="h-full bg-red-500 w-[65%]" />
                                     </div>
                                     <div className="h-2.5 w-full bg-green-500/20 rounded overflow-hidden">
                                         <div className="h-full bg-green-500 w-[85%]" />
                                     </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Box 3: Heatmap (Span 4) */}
                        <div className="md:col-span-4 bg-black border border-white/10 p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:border-hr-gold/50 transition-colors">
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="mb-8">
                                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4">03. Matrix</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        Condenses global real estate performance into a recursive, zero-padding treemap layout. 
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-1.5 mt-auto">
                                    <div className="bg-green-500 py-4 text-center text-xs font-black text-white rounded-sm drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]">+4.2%</div>
                                    <div className="bg-red-500 py-4 text-center text-xs font-black text-white rounded-sm drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">-1.1%</div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Box 4: Unified ID (Span 8) */}
                        <div className="md:col-span-8 bg-black border border-white/10 p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:border-hr-gold/50 transition-colors flex flex-col justify-center">
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-hr-gold/10 blur-[80px] rounded-full group-hover:bg-hr-gold/20 transition-all pointer-events-none" />
                            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center h-full">
                                 <div className="flex-1">
                                    <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-4">04. Unified ID & Limits</h3>
                                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                        Real estate requires airtight compliance. The core engine dynamically anchors user identities against hardcoded notional limits, tracking P&L metrics alongside autonomous, smart-contract driven dividend yields within a zero-trust wrapper.
                                    </p>
                                 </div>
                                 <div className="w-full md:w-auto bg-white/[0.03] border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                                     <span className="text-[10px] uppercase font-mono text-white/50 mb-2">Clearing Status</span>
                                     <span className="text-xl font-black text-hr-gold tracking-widest mb-4">VERIFIED</span>
                                     <div className="flex gap-2">
                                         <div className="w-6 h-1.5 bg-hr-gold rounded-full" />
                                         <div className="w-6 h-1.5 bg-hr-gold rounded-full border border-hr-gold/50" />
                                         <div className="w-6 h-1.5 bg-white/10 rounded-full" />
                                     </div>
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lifestyle Visual Break */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full mb-32 flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/2 relative order-2 md:order-1">
                        <div className="absolute inset-0 bg-hr-gold/10 blur-[100px] rounded-full pointer-events-none" />
                        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)]">
                            <Image 
                                src="/artifacts/trader_apartment_woman.png" 
                                alt="High-frequency tokenized real estate trading" 
                                width={800} height={800} 
                                className="object-cover w-full h-auto"
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 text-center md:text-left order-1 md:order-2">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border text-[10px] font-mono tracking-widest uppercase mb-6 text-white/50 border-white/10 bg-white/5">
                            Frictionless Liquidity
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tighter mb-6 text-white leading-tight">
                            Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-hr-gold to-yellow-200">Global Capital</span> From Anywhere
                        </h2>
                        <p className="text-gray-400 font-light text-sm md:text-base mb-8 leading-relaxed">
                            Hyperion dissolves the barrier between physical monoliths and liquid capital. Execute block trades on prime Manhattan commercial real estate while observing the sunset from a Tokyo penthouse. 
                            <br/><br/>
                            We offer the world's most aggressive traders unprecedented, frictionless access to traditionally illiquid tier-1 global assets.
                        </p>
                        <div className="flex gap-4 justify-center md:justify-start">
                            <div className="flex flex-col items-center md:items-start bg-black/50 border border-white/5 px-6 py-4 rounded-xl">
                                <span className="text-2xl font-black text-white">24/7</span>
                                <span className="text-[10px] font-mono text-hr-gold uppercase tracking-widest mt-1">Market Uptime</span>
                            </div>
                            <div className="flex flex-col items-center md:items-start bg-black/50 border border-white/5 px-6 py-4 rounded-xl">
                                <span className="text-2xl font-black text-white">T+0</span>
                                <span className="text-[10px] font-mono text-hr-gold uppercase tracking-widest mt-1">Atomic Settlement</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CRM-Integrated Waitlist Form */}
                <div className="relative z-10 max-w-xl mx-auto px-6 w-full text-center">
                    <h2 className="text-3xl font-extrabold uppercase tracking-tighter mb-4 text-white">
                        Institutional Access
                    </h2>
                    <p className="text-gray-400 text-sm mb-8">
                        The live exchange is currently ring-fenced for accredited beta participants. Secure your allocation to the primary liquidity pools.
                    </p>
                    
                    <div className="bg-black/80 backdrop-blur-2xl p-8 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        {status === 'success' ? (
                            <div className="py-4">
                                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-hr-gold/10 border border-hr-gold/30 flex items-center justify-center">
                                    <svg className="w-7 h-7 text-hr-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-hr-gold mb-2">Clearance Granted</h3>
                                <p className="text-sm text-gray-400">{message}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <input 
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address to connect" 
                                        className="w-full bg-[#03060c] border border-white/10 rounded-lg px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-hr-gold/50 focus:ring-1 focus:ring-hr-gold/50 transition-all font-mono text-sm text-center"
                                        required
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={status === 'submitting'}
                                    className="w-full bg-hr-gold text-black font-black py-4 rounded-lg hover:bg-[#b0922e] transition-colors uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {status === 'submitting' ? 'Authenticating...' : 'Secure Waitlist Position'}
                                </button>
                                {status === 'error' && (
                                    <p className="text-red-400 text-xs font-mono text-center pt-2">{message}</p>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
