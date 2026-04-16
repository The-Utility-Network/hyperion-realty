'use client';

import { motion } from 'framer-motion';

export default function Mission() {
    return (
        <section id="mission" className="py-32 relative">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <div className="inline-block px-4 py-2 rounded-full border text-sm font-mono tracking-widest uppercase text-hr-gold border-hr-gold/50 bg-hr-gold/5 flex gap-3 items-center w-max">
                        <span className="w-2 h-2 rounded-full bg-hr-gold animate-pulse" />
                        Architecting the Future
                    </div>
                    <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter leading-tight">
                        Liquid <br/> <span className="text-hr-gold">Architecture</span>
                    </h2>
                    <div className="h-1 w-24 bg-hr-gold" />
                    <p className="text-xl text-gray-300 leading-relaxed font-light">
                        Hyperion Realty utilizes a revolutionary dual-token architecture to democratize high-yield real estate. The physical property’s primary deed is securely minted as an immutable ERC721 NFT, anchoring the legal foundation completely onchain. 
                    </p>
                    <p className="text-lg text-gray-400 leading-relaxed font-light">
                        From there, fractional ownership is distributed globally via highly liquid ERC20 tokens. This structure enables unprecedented portfolio diversification—allowing investors to fluidly trade fractional real estate exactly like traditional equities. Not only does this ensure the trustless distribution of rental yields to owners, but it introduces a new economic paradigm: secondary trading volume generates continuous protocol revenue, creating a perpetual fund to physically upgrade the underlying asset.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative w-full aspect-[4/5] lg:aspect-square rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.1)] border border-white/5"
                >
                    <img 
                        src="/artifacts/luxury_interior_lobby.png" 
                        alt="High-end luxury interior" 
                        className="object-cover w-full h-full opacity-90 transition-transform duration-1000 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-0 border border-hr-gold/20 rounded-2xl pointer-events-none" />
                </motion.div>
            </div>
        </section>
    );
}
