'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const targets = [
    {
        title: 'Elite Commercial Hubs',
        desc: 'Sourcing iconic, high-occupancy commercial structures in major metropolitan centers to anchor stable, long-term yield distribution.',
        image: '/artifacts/luxury_exterior_light.png',
        alt: 'Exterior architectural view of an elite commercial office tower',
        targetYield: '8-12%',
        span: 'md:col-span-2'
    },
    {
        title: 'Premium Hospitality',
        desc: 'Curating world-class hotel and resort properties that leverage dynamic operational revenue for aggressive tokenized scaling.',
        image: '/artifacts/luxury_interior_lobby.png',
        alt: 'High-end interior lobby of a premium hospitality resort',
        targetYield: '10-15%',
        span: 'md:col-span-1'
    },
    {
        title: 'Luxury Residential',
        desc: 'Securing prime coastal and ultra-luxury residential domains, blending capital appreciation with high-demand rental channels.',
        image: '/artifacts/luxury_pool_terrace.png',
        alt: 'Luxury residential pool terrace overlooking the coast',
        targetYield: '6-10%',
        span: 'md:col-span-3'
    }
];

export default function TargetProperties() {
    return (
        <section id="pipeline" className="py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-hr-gold/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2" />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 md:flex justify-between items-end gap-8"
                >
                    <div className="max-w-3xl">
                        <div className="inline-block px-4 py-2 rounded-full border text-sm font-mono tracking-widest uppercase mb-4 text-hr-gold border-hr-gold/50 bg-hr-gold/5">
                            Acquisition Pipeline
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tighter mb-6">
                            The Calibration of <span className="text-hr-gold">Excellence</span>
                        </h2>
                        <p className="text-xl text-gray-300 font-light leading-relaxed">
                            Hyperion Realty does not compromise. Our specialized acquisition teams are meticulously sourcing completely off-market, institutional-grade real estate across the globe. These target asset classes represent the exact caliber of properties being actively lined up for our inaugural waves of ERC721 anchoring and public ERC20 fractional tokenization.
                        </p>
                    </div>
                    <div className="mt-8 md:mt-0 text-right">
                        <p className="font-mono text-hr-gold uppercase tracking-widest text-sm mb-2">Phase One Target Size</p>
                        <p className="text-4xl font-extrabold">$250M+</p>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {targets.map((target, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0a1122] ${target.span} min-h-[400px]`}
                        >
                            <Image 
                                src={target.image} 
                                alt={target.alt} 
                                fill 
                                className="object-cover opacity-80 brightness-110 contrast-[1.1] transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                            
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className="absolute top-6 right-6 backdrop-blur-md bg-black/40 border border-hr-gold/30 px-4 py-2 rounded-lg pointer-events-none">
                                    <p className="text-xs font-mono text-hr-gold uppercase tracking-wider mb-1">Target Yield</p>
                                    <p className="text-xl font-bold text-white">{target.targetYield}</p>
                                </div>
                                <h3 className="text-3xl font-extrabold text-white mb-3 tracking-wide">{target.title}</h3>
                                <p className="text-gray-300 font-light leading-relaxed md:w-3/4">
                                    {target.desc}
                                </p>
                            </div>
                            
                            {/* Hover gold framing line */}
                            <div className="absolute bottom-0 left-0 h-1 bg-hr-gold w-0 group-hover:w-full transition-all duration-700 ease-out" />
                        </motion.div>
                    ))}
                </div>
                <div className="mt-16 text-center">
                    <Link href="/locations" className="inline-block px-10 py-5 bg-[#0a1122] border border-hr-gold text-hr-gold font-bold tracking-widest uppercase text-sm hover:bg-hr-gold hover:text-black transition-all rounded shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                        Explore Global Targets Map
                    </Link>
                </div>
            </div>
        </section>
    );
}
