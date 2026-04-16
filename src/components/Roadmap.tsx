'use client';

import { motion } from 'framer-motion';
import { Map, Hammer, Wallet, Globe2, Users } from 'lucide-react';
import React from 'react';

const roadmapData = [
    {
        num: '01',
        title: 'Asset Acquisition',
        duration: 'Current Phase',
        desc: 'Strictly identifying, vetting, and securing high-yield tier-1 commercial and hospitality assets. Capital structuring and absolute physical due diligence.',
        icon: Map,
        status: 'ACTIVE'
    },
    {
        num: '02',
        title: 'Deed Onchain Minting',
        duration: 'Upcoming Pipeline',
        desc: 'Developing the robust legal frameworks and deploying the ERC721 smart contracts necessary to securely anchor physical property deeds natively onchain.',
        icon: Hammer,
        status: 'UPCOMING'
    },
    {
        num: '03',
        title: 'Public Fractionalization',
        duration: 'Upcoming Pipeline',
        desc: 'Fractionalizing the secured NFT deeds into ERC20 liquidity pools, officially opening the tokenized properties to public retail investment.',
        icon: Wallet,
        status: 'UPCOMING'
    },
    {
        num: '04',
        title: 'Yield Distribution Engine',
        duration: 'Upcoming Pipeline',
        desc: 'Activating the automated distribution system, allowing rental incomes and trade-tax dividends to be routed directly to ERC20 holders seamlessly.',
        icon: Globe2,
        status: 'UPCOMING'
    },
    {
        num: '05',
        title: 'The Hyperion DAO',
        duration: 'Future Milestone',
        desc: 'Transitioning full governance of the overarching property portfolio to the token holders, forming a decentralized property management conglomerate.',
        icon: Users,
        status: 'UPCOMING'
    }
];

export default function Roadmap() {
    return (
        <section id="roadmap" className="py-32 relative bg-black border-y border-white/5">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none mix-blend-screen" />
            <div className="absolute top-0 right-0 w-1/2 h-[800px] bg-hr-gold/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="mb-20">
                    <span className="section-heading mb-3 block">Chronology</span>
                    <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">The Roadmap</h2>
                    <div className="h-1 w-24 my-8 bg-hr-gold" />
                </div>

                <div className="space-y-6">
                    {roadmapData.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, delay: i * 0.1 }}
                            className={`group relative overflow-hidden rounded-2xl border ${
                                item.status === 'ACTIVE' ? 'border-hr-gold/40 shadow-[0_0_40px_rgba(212,175,55,0.15)] bg-[#0f1422]' : 'border-white/5 bg-[#0a1122]/50 hover:bg-[#0f1422] hover:border-hr-gold/20'
                            } transition-all duration-500`}
                        >
                            {/* Giant Watermark Number */}
                            <div className="absolute -right-4 -bottom-10 text-[180px] font-black leading-none text-white opacity-[0.02] group-hover:opacity-[0.05] transition-opacity select-none pointer-events-none">
                                {item.num}
                            </div>

                            <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
                                
                                {/* Status Orb & Icon */}
                                <div className="flex-shrink-0 flex items-center gap-6">
                                    <div className="relative">
                                        {item.status === 'ACTIVE' && (
                                            <div className="absolute inset-0 bg-hr-gold rounded-full blur-[20px] opacity-40 animate-pulse" />
                                        )}
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border relative z-10 ${
                                            item.status === 'ACTIVE' ? 'bg-[#0d0800] border-hr-gold shadow-[inset_0_0_15px_rgba(212,175,55,0.4)]' : 'bg-black border-white/10'
                                        }`}>
                                            {React.createElement(item.icon, { size: 32, className: item.status === 'ACTIVE' ? 'text-hr-gold' : 'text-gray-500 group-hover:text-hr-gold transition-colors duration-500' })}
                                        </div>
                                    </div>
                                    <div className={`hidden md:flex flex-col gap-1 w-32`}>
                                        <div className={`text-xs font-bold uppercase tracking-widest ${item.status === 'ACTIVE' ? 'text-hr-gold' : 'text-gray-500'}`}>
                                            {item.duration}
                                        </div>
                                        <div className={`text-xs font-mono tracking-wider ${item.status === 'ACTIVE' ? 'text-white' : 'text-gray-600'}`}>
                                            {item.status}
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="hidden md:block w-px h-16 bg-white/10" />

                                {/* Body Text */}
                                <div className="flex-grow">
                                    <h3 className={`text-2xl font-bold mb-3 uppercase tracking-wide transition-colors duration-500 ${item.status === 'ACTIVE' ? 'text-hr-gold' : 'text-white group-hover:text-hr-gold'}`}>
                                        <span className="text-gray-600 mr-2">PHASE {item.num} //</span> {item.title}
                                    </h3>
                                    <p className={`text-sm md:text-base leading-relaxed ${item.status === 'ACTIVE' ? 'text-gray-300' : 'text-gray-500 group-hover:text-gray-400'}`}>
                                        {item.desc}
                                    </p>
                                </div>
                                
                                {/* Mobile Status block */}
                                <div className={`md:hidden flex flex-col gap-1 mt-4 border-t border-white/10 pt-4 w-full`}>
                                    <div className={`text-xs font-bold uppercase tracking-widest ${item.status === 'ACTIVE' ? 'text-hr-gold' : 'text-gray-500'}`}>
                                        {item.duration} &bull; {item.status}
                                    </div>
                                </div>

                            </div>
                            
                            {/* Hover gold framing line */}
                            <div className="absolute left-0 top-0 h-full w-1 bg-hr-gold scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500 ease-out" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
