'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Process() {
    const steps = [
        {
            num: 1,
            title: 'Deed Tokenization (ERC721)',
            desc: 'The primary title of a premium commercial asset is securely minted as an immutable ERC721 NFT, establishing the unforgeable digital legal anchor entirely onchain.'
        },
        {
            num: 2,
            title: 'Fractional Issuance (ERC20)',
            desc: 'The ERC721 deed is fractionalized into highly liquid ERC20 tokens, allowing modern portfolios to diversify seamlessly by trading physical real estate like liquid equities.'
        },
        {
            num: 3,
            title: 'Receive Automated Income',
            desc: 'Rental revenue derived directly from physical tenants is securely and trustlessly distributed as smart-contract yields pro-rata to all ERC20 token holders.'
        },
        {
            num: 4,
            title: 'Trade & Appreciate',
            desc: 'Trade fractional tokens on secondary markets. Ecosystem volume yields a trading fee, creating a perpetual revenue stream used solely to physically improve the property.'
        }
    ];

    return (
        <section id="process" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="card p-10 md:p-16"
                >
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="section-heading mb-2 block">The Process</span>
                            <h2 className="text-3xl font-bold mb-8">From Brick to Blockchain</h2>
                            <ul className="space-y-8">
                                {steps.map((step) => (
                                    <li key={step.num} className="flex gap-6 group">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-black bg-hr-gold shrink-0 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all">
                                            {step.num}
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-2 text-lg text-white group-hover:text-hr-gold transition-colors">{step.title}</h4>
                                            <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative h-full min-h-[480px] rounded-xl overflow-hidden bg-[#050914] border border-hr-gold/20 flex flex-col group hover:border-hr-gold/50 transition-colors shadow-2xl">
                            <div className="relative w-full h-[260px] border-b border-hr-gold/10 overflow-hidden bg-black flex items-center justify-center">
                                <Image 
                                    src="/tokenization_schematic.png" 
                                    alt="Detailed technical schematic demonstrating the Hyperion protocol flow: from physical real estate asset, through the legal ERC721 deed framing, into fractional ERC20 distribution." 
                                    fill 
                                    className="object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-transparent to-transparent opacity-80" />
                                <div className="absolute inset-0 bg-hr-gold/5 mix-blend-overlay" />
                            </div>
                            <div className="text-center flex-grow flex flex-col justify-center p-8 relative z-10">
                                <h3 className="text-2xl font-bold mb-4 text-hr-gold uppercase tracking-wider">The Dual-Token Portfolio</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Our unique dual-layer tokenomics ensure absolute legal fidelity while unlocking unprecedented liquidity. By detaching the legal anchor (ERC721) from the fractional equity (ERC20), investors can seamlessly diversify their portfolios—and every trade continually funds the physical betterment of their own asset.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
