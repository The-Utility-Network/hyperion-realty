'use client';

import { useState, useEffect, useCallback } from 'react';
import { useNewsletterSubmit } from '@/hooks/useNewsletterForm';

export default function ExitIntentModal() {
    const [show, setShow] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const [email, setEmail] = useState('');
    const { status, message, submit } = useNewsletterSubmit();

    const handleClose = useCallback(() => {
        setShow(false);
        setDismissed(true);
        sessionStorage.setItem('hr_exit_dismissed', '1');
    }, []);

    useEffect(() => {
        // Don't show if already dismissed this session
        if (sessionStorage.getItem('hr_exit_dismissed')) {
            setDismissed(true);
            return;
        }

        const handleMouseLeave = (e: MouseEvent) => {
            // Trigger when cursor moves above the viewport (exit intent)
            if (e.clientY <= 0 && !dismissed) {
                setShow(true);
            }
        };

        // Delay attaching the listener so it doesn't fire immediately
        const timer = setTimeout(() => {
            document.addEventListener('mouseleave', handleMouseLeave);
        }, 5000);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [dismissed]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            submit(email.trim());
        }
    };

    if (!show || dismissed) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md animate-[fadeIn_0.3s_ease]"
                onClick={handleClose}
                style={{ animation: 'fadeIn 0.3s ease' }}
            />

            {/* Modal */}
            <div
                className="relative w-full max-w-lg bg-[#0a1122] border border-hr-gold/20 rounded-2xl shadow-[0_0_80px_rgba(212,175,55,0.15)] overflow-hidden"
                style={{ animation: 'slideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1)' }}
            >
                {/* Gold accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-hr-gold to-transparent" />

                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white border border-white/10 rounded-lg hover:border-white/30 transition-all text-sm z-10"
                >
                    ✕
                </button>

                <div className="p-10 text-center">
                    {status === 'success' ? (
                        <div className="py-8">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-hr-gold/10 border border-hr-gold/30 flex items-center justify-center">
                                <svg className="w-8 h-8 text-hr-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">You&apos;re On The List</h3>
                            <p className="text-gray-400 text-sm">{message}</p>
                            <button
                                onClick={handleClose}
                                className="mt-6 px-6 py-2 text-sm font-mono text-hr-gold border border-hr-gold/30 rounded-lg hover:bg-hr-gold/10 transition-all"
                            >
                                CONTINUE BROWSING
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hr-gold/30 bg-hr-gold/5 mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-hr-gold animate-pulse" />
                                <span className="text-[10px] font-mono tracking-widest text-hr-gold uppercase">Priority Access</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">
                                Don&apos;t Miss <span className="text-hr-gold">Genesis</span>
                            </h2>

                            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
                                The first tokenized property drops are invite-only. Join the priority queue to secure your position before the public liquidity pools open.
                            </p>

                            <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-hr-gold/50 focus:ring-1 focus:ring-hr-gold/30 transition-all font-mono text-sm"
                                />
                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full bg-hr-gold text-black font-bold py-3.5 rounded-lg hover:bg-[#b0922e] transition-all uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                                >
                                    {status === 'submitting' ? 'SECURING...' : 'SECURE MY POSITION'}
                                </button>
                                {status === 'error' && (
                                    <p className="text-red-400 text-xs font-mono">{message}</p>
                                )}
                            </form>

                            <p className="text-gray-600 text-[10px] font-mono mt-6 tracking-wider">
                                NO SPAM. EVER. ONLY GENESIS NOTIFICATIONS.
                            </p>
                        </>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px) scale(0.97); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </div>
    );
}
