'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const teamMembers = [
    {
        name: 'Praful Patel',
        role: 'Chairman',
        desc: 'Providing elite strategic oversight and expansive global structuring to the Hyperion Trust.',
        image: '/artifacts/team/praful.jpg'
    },
    {
        name: 'Krishna Patel',
        role: 'Founder & CEO',
        desc: 'Driving the vision bridging real-world assets with blockchain provenance.',
        image: '/artifacts/team/krishna.png'
    }
];

export default function Team() {
    return (
        <section id="team" className="py-24 relative bg-black/20 border-t border-white/5">
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="section-heading mb-2 block">The Founders</span>
                    <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">Meet The Team</h2>
                    <div className="h-1 w-24 mx-auto my-6 bg-hr-gold" />
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {teamMembers.map((member, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="card text-center flex flex-col items-center group"
                        >
                            <div className="relative w-32 h-32 rounded-full bg-black border border-hr-gold/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)] overflow-hidden">
                                <Image 
                                    src={member.image} 
                                    alt={member.name} 
                                    fill 
                                    className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                                />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                            <div className="text-sm font-mono text-hr-gold mb-4 uppercase tracking-wider">{member.role}</div>
                            <p className="text-gray-400 text-sm leading-relaxed">{member.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
