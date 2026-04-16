'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
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
            
            <main className="flex-grow relative flex items-center justify-center pt-40 pb-12 overflow-hidden">
                {/* Immersive blurred background */}
                <div className="absolute inset-0 z-0 opacity-20 filter grayscale blur-[10px] scale-110">
                    <Image 
                        src="/artifacts/luxury_pool_terrace.png" 
                        alt="Background" 
                        fill 
                        className="object-cover"
                    />
                </div>
                
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#050914] via-[#050914]/80 to-[#050914]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-hr-gold/10 blur-[150px] rounded-full z-0 pointer-events-none" />

                <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border text-xs font-mono tracking-widest uppercase mb-8 text-hr-gold border-hr-gold/50 bg-hr-gold/10 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-hr-gold animate-pulse" />
                        Trading Infrastructure In Development
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter mb-8 leading-tight drop-shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                        The Core <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-hr-gold to-yellow-200">Exchange</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed mb-12">
                        We are currently architecting the proprietary Web3 interface for the Hyperion Realty tokenized trading layer. This secure terminal will grant unprecedented access to directly acquire fractional ERC20 equity in tier-1 commercial real estate targets. 
                    </p>

                    {/* CRM-Integrated Waitlist Form */}
                    <div className="max-w-md mx-auto bg-black/60 backdrop-blur-2xl p-8 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                        {status === 'success' ? (
                            <div className="py-4">
                                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-hr-gold/10 border border-hr-gold/30 flex items-center justify-center">
                                    <svg className="w-7 h-7 text-hr-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-hr-gold mb-2">Position Secured</h3>
                                <p className="text-sm text-gray-400">{message}</p>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-2xl font-bold mb-2">Priority Access</h3>
                                <p className="text-sm text-gray-500 mb-6">Join the whitelist to be notified exactly when the primary liquidity pools are deployed.</p>
                                
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <input 
                                            type="email" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email address" 
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-hr-gold/50 focus:ring-1 focus:ring-hr-gold/50 transition-all font-mono text-sm"
                                            required
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={status === 'submitting'}
                                        className="w-full bg-hr-gold text-black font-bold py-3 rounded-lg hover:bg-[#b0922e] transition-colors uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {status === 'submitting' ? 'Securing...' : 'Secure Position'}
                                    </button>
                                    {status === 'error' && (
                                        <p className="text-red-400 text-xs font-mono text-center">{message}</p>
                                    )}
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
