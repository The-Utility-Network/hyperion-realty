import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const terms = [
    { term: 'Dual-Token Architecture', category: 'PROTOCOL', def: 'The foundational Hyperion framework that deploys two complementary token standards — an ERC721 for immutable deed provenance and ERC20s for fractional liquid equity — to simultaneously secure physical property rights and enable frictionless secondary market trading.' },
    { term: 'ERC721 Deed Anchor', category: 'PROTOCOL', def: 'A Non-Fungible Token minted on Ethereum that represents the absolute legal ownership of a physical property\'s trust entity. It serves as the immutable onchain source of truth, stored in an institutional cold-storage multisig vault. It is never traded — only held as cryptographic proof of dominion.' },
    { term: 'ERC20 Fractional Supply', category: 'PROTOCOL', def: 'Standard fungible tokens minted against an ERC721 anchor, representing divisible equity in the underlying property. Adhering to the ERC20 standard grants instant compatibility with every DEX, AMM, lending protocol, and portfolio aggregator on the Ethereum Virtual Machine.' },
    { term: 'Perpetual Recycling Tax', category: 'TOKENOMICS', def: 'A 0.5% protocol-level fee applied to every secondary market trade of ERC20 property tokens. Revenue is locked into a dedicated treasury that exclusively funds physical capital improvements (structural, mechanical, aesthetic), creating a closed-loop flywheel where trading volume directly appreciates the underlying asset.' },
    { term: 'Yield Matrix', category: 'DISTRIBUTION', def: 'The automated smart contract engine that captures net rental income from physical tenants via fiat-to-stablecoin gateways and distributes USDC pro-rata to all ERC20 holders at the next block-snapshot interval. Eliminates all intermediary layers between tenant payment and investor receipt.' },
    { term: 'Block-Snapshot Distribution', category: 'DISTRIBUTION', def: 'The mechanism by which the Yield Matrix captures the precise state of the ERC20 holder registry at a specific block height. Every wallet holding property tokens at that exact moment receives their proportional share of rental yield, with LP positions attributed to the underlying liquidity provider.' },
    { term: 'Single-Asset LLC', category: 'LEGAL', def: 'A dedicated Limited Liability Company created for each individual property, serving as a legal firewall that isolates liability exposure. If catastrophic events affect one property, all other assets in the portfolio remain completely insulated. The LLC designates the ERC721 holder (the DAO multisig) as its sole governing member.' },
    { term: 'Transfer Hook Compliance', category: 'LEGAL', def: 'Embedded smart contract logic within the ERC20 token that queries an onchain attestation registry before settling any transfer. Both sender and receiver must hold valid KYC/AML credentials, enabling permissionless settlement speed while maintaining full securities law compliance.' },
    { term: 'Hyperion DAO', category: 'GOVERNANCE', def: 'The decentralized governance body that manages portfolio-level decisions (acquisitions, protocol parameters, treasury allocations) via the HPR governance token. Voting power follows quadratic dampening to prevent whale dominance, and all proposals require a 66% supermajority with a 48-hour execution timelock.' },
    { term: 'Quadratic Governance', category: 'GOVERNANCE', def: 'A voting power model where influence scales with the square root of token holdings rather than linearly. A holder with 10,000 HPR tokens receives approximately 10x (not 100x) the voting power of a holder with 100 tokens, ensuring collective community governance over concentrated whale control.' },
    { term: 'Supply Curve', category: 'TOKENOMICS', def: 'The total ERC20 token supply for each property, fixed immutably at mint time. Calibrated at 1 token = $1.00 of appraised equity. Cannot be inflated without a formal reappraisal process requiring multisig DAO approval and updated legal documentation anchored to the ERC721 metadata.' },
    { term: 'T+0 Settlement', category: 'TRADING', def: 'The near-instant transaction finality achieved by ERC20 property tokens on the Ethereum blockchain — typically completing in 12 seconds. This represents a 250,000x improvement over traditional real estate settlement timelines (T+Weeks to T+Months).' },
    { term: 'Fiat Off-Ramp Bridge', category: 'INFRASTRUCTURE', def: 'The banking API integration that converts physical rental income (fiat currency) into blockchain-native stablecoins (USDC) for automated distribution. The protocol maintains redundant integrations with at least three independent providers for failover resilience.' },
    { term: 'Multisig Cold Vault', category: 'SECURITY', def: 'The institutional-grade storage mechanism for ERC721 deed anchors, requiring 3-of-5 authorized signatories (transitioning to community-elected signatories during DAO maturation) to execute any transfer. Eliminates single-point-of-failure risk in deed custody.' },
    { term: 'Proposal Lifecycle', category: 'GOVERNANCE', def: 'The four-phase governance process: Discussion (7 days), Formal Vote (3 days with 500 HPR deposit), Timelock (48 hours for exit/objection), and deterministic Execution. Emergency proposals follow an accelerated 24-hour pathway with an 80% supermajority requirement.' },
];

export const metadata = {
    title: 'Hyperion Codex | Tokenized Real Estate Glossary',
    description: 'Master the terminology of the onchain real estate revolution. Comprehensive definitions for dual-token architectures, yield routing, governance mechanics, and fractionalization.',
};

export default function CodexPage() {
    // Group terms by category
    const categories = Array.from(new Set(terms.map(t => t.category)));

    return (
        <div className="min-h-screen bg-[#050914] text-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": terms.map(t => ({
                            "@type": "Question",
                            "name": t.term,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": t.def
                            }
                        }))
                    })
                }}
            />
            <Navbar />
            
            <div className="pt-40 pb-24 max-w-5xl mx-auto px-6">
                <div className="text-center mb-20">
                    <span className="text-[10px] font-mono tracking-[0.4em] text-hr-gold mb-4 block">HPR.KNOWLEDGE</span>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-hr-gold via-yellow-200 to-hr-gold">Codex</span>
                    </h1>
                    <div className="h-1 w-24 mx-auto my-8 bg-hr-gold" />
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
                        The definitive technical glossary for navigating the Hyperion Realty tokenization protocol. {terms.length} terms across {categories.length} domains.
                    </p>
                </div>

                {/* Category-grouped navigation */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {categories.map(cat => (
                        <a key={cat} href={`#cat-${cat.toLowerCase()}`} className="px-4 py-2 text-[10px] font-mono tracking-widest uppercase border border-white/10 rounded-full text-gray-400 hover:text-hr-gold hover:border-hr-gold/30 transition-all">
                            {cat}
                        </a>
                    ))}
                </div>

                {categories.map(cat => (
                    <div key={cat} id={`cat-${cat.toLowerCase()}`} className="mb-16">
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-xs font-mono tracking-[0.3em] text-hr-gold uppercase">{cat}</h2>
                            <div className="flex-grow h-px bg-white/5" />
                            <span className="text-xs font-mono text-gray-600">{terms.filter(t => t.category === cat).length} TERMS</span>
                        </div>
                        
                        <div className="space-y-4">
                            {terms.filter(t => t.category === cat).map((item, index) => (
                                <div key={index} className="group p-8 bg-black/50 border border-white/5 rounded-xl hover:border-hr-gold/20 transition-all duration-300">
                                    <h3 className="text-xl font-bold text-white group-hover:text-hr-gold transition-colors mb-4 flex items-center gap-3">
                                        <span className="text-[10px] font-mono text-hr-gold/40 tracking-widest border border-white/5 px-2 py-0.5 rounded bg-white/5">{item.category}</span>
                                        {item.term}
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed pl-6 border-l border-white/5">
                                        {item.def}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                
                <div className="mt-20 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/whitepaper" className="inline-block px-8 py-4 bg-hr-gold text-black font-bold tracking-widest uppercase text-sm hover:bg-[#b5943b] transition-all rounded shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                        Read Full Whitepaper
                    </Link>
                    <Link href="/blog" className="inline-block px-8 py-4 border border-hr-gold/40 text-hr-gold font-bold tracking-widest uppercase text-sm hover:bg-hr-gold hover:text-black transition-all rounded">
                        Browse the Journal
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    );
}
