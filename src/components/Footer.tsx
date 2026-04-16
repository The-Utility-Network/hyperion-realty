'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="relative bg-black border-t border-white/5 pt-24 pb-12 overflow-hidden text-sm">
            {/* Ambient Background elements */}
            <div className="absolute top-0 right-1/4 w-[500px] h-32 bg-hr-gold/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link href="/" className="flex items-center gap-3 mb-4 group cursor-pointer inline-flex">
                            <img
                                src="/HRLogoDarkSymbol.png"
                                alt="Hyperion Realty"
                                className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.3)] group-hover:scale-110 transition-transform duration-500"
                            />
                            <span className="text-xl font-bold text-white tracking-widest font-mono group-hover:text-hr-gold transition-colors">
                                HYPERION//REALTY
                            </span>
                        </Link>
                        <p className="text-hr-gold text-sm font-mono tracking-widest uppercase">Democratizing Real Estate</p>
                        <p className="text-gray-400 font-light leading-relaxed max-w-sm">
                            The architectural standard for onchain commercial real estate. Securing physical deeds with immutable NFT legal wrappers, and democratizing liquidity with ERC20 distributions.
                        </p>
                    </div>

                    {/* Infrastructure */}
                    <div>
                        <h4 className="text-white font-bold tracking-widest uppercase mb-6 text-xs drop-shadow-[0_0_10px_rgba(212,175,55,0.4)] text-hr-gold">Platform</h4>
                        <ul className="space-y-3">
                            <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">The Journal</Link></li>
                            <li><Link href="/whitepaper" className="text-gray-400 hover:text-white transition-colors">Technical Whitepaper</Link></li>
                            <li><Link href="/codex" className="text-gray-400 hover:text-white transition-colors">The Semantic Codex</Link></li>
                            <li><Link href="/marketplace" className="text-gray-400 hover:text-white flex gap-2 items-center transition-colors">Marketplace <span className="text-[9px] bg-hr-gold/20 text-hr-gold px-1.5 py-0.5 rounded border border-hr-gold/30">DEV</span></Link></li>
                        </ul>
                    </div>

                    {/* SEO: Compare */}
                    <div>
                        <h4 className="text-white font-bold tracking-widest uppercase mb-6 text-xs text-hr-gold">Analytics Hub</h4>
                        <ul className="space-y-3">
                            <li><Link href="/blog/hyperion-vs-traditional-reits" className="text-gray-400 hover:text-white transition-colors">Hyperion vs REITs</Link></li>
                            <li><Link href="/blog/fractional-vs-direct-ownership" className="text-gray-400 hover:text-white transition-colors">Fractional vs Direct</Link></li>
                            <li><Link href="/blog/erc721-vs-erc20-real-estate" className="text-gray-400 hover:text-white transition-colors">ERC721 vs ERC20 Specs</Link></li>
                            <li><Link href="/blog/automated-yield-distribution" className="text-gray-400 hover:text-white transition-colors">Automated Yield</Link></li>
                            <li><Link href="/blog/global-portfolio-diversification" className="text-gray-400 hover:text-white transition-colors">Global Diversification</Link></li>
                        </ul>
                    </div>

                    {/* SEO: Locations */}
                    <div>
                        <h4 className="text-white font-bold tracking-widest uppercase mb-6 text-xs text-hr-gold">Global Targets</h4>
                        <ul className="space-y-3">
                            <li><Link href="/locations/miami" className="text-gray-400 hover:text-white transition-colors">Miami Acquisitions</Link></li>
                            <li><Link href="/locations/dubai" className="text-gray-400 hover:text-white transition-colors">Dubai Real Estate</Link></li>
                            <li><Link href="/locations/new-york" className="text-gray-400 hover:text-white transition-colors">New York Portfolios</Link></li>
                            <li><Link href="/locations/london" className="text-gray-400 hover:text-white transition-colors">London Commercial</Link></li>
                            <li className="pt-2"><Link href="/locations" className="text-hr-gold hover:text-white transition-colors text-xs font-mono tracking-widest uppercase flex items-center gap-1">See All {'>'}{'>'}</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-gray-500 font-mono tracking-widest text-xs">
                        &copy; {new Date().getFullYear()} HYPERION REALTY SYSTEM
                    </div>
                    <div className="text-gray-600 font-mono tracking-widest text-[9px] uppercase border border-white/5 px-3 py-1 rounded bg-white/5">
                        OPERATIONAL STATUS: NOMINAL
                    </div>
                </div>
            </div>
        </footer>
    );
}
