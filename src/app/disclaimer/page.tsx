'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const sections = [
    {
        id: 'general-disclaimer',
        title: '1. General Investment Disclaimer',
        content: `
**THIS DOCUMENT CONTAINS IMPORTANT RISK DISCLOSURES. READ IT IN ITS ENTIRETY BEFORE MAKING ANY INVESTMENT DECISION.**

**Hyperion Realty LLC** ("Hyperion," "Company," "we") operates a technology platform facilitating fractional investment in commercial and premium real estate through blockchain-based tokenization. **Nothing on this platform, in our publications, or in communications from our representatives constitutes investment advice, financial advice, trading advice, tax advice, or legal advice.**

The information provided on the Hyperion platform, including property descriptions, yield projections, market analytics, comparative analyses, whitepapers, blog posts, and educational content, is provided solely for **general informational and educational purposes**. It should not be construed as a recommendation or solicitation to buy, sell, hold, or otherwise transact in any token, security, or real estate interest.

**You are solely responsible for evaluating the merits and risks of any investment decision.** We strongly recommend that you consult with qualified, licensed professionals—including a registered investment advisor, securities attorney, tax advisor, and real estate counsel—before making any investment through the Hyperion platform.

**Effective Date:** April 16, 2026
**Last Updated:** April 16, 2026
        `
    },
    {
        id: 'regulatory-status',
        title: '2. Regulatory Status & Securities Classification',
        content: `
**2.1 Token Classification**

Hyperion property tokens (ERC20 fractional interests) may constitute "securities" under United States federal and state securities laws, including the Securities Act of 1933, the Securities Exchange Act of 1934, and applicable state Blue Sky laws. The Company takes no position on whether any specific token offering constitutes a security in your jurisdiction.

**2.2 Regulatory Exemptions**

Token offerings conducted through the Hyperion platform may rely on one or more exemptions from registration, including but not limited to:

(a) **Regulation D (Rule 506(b) and 506(c))** — Available only to accredited investors as defined under SEC rules, with limited or no general solicitation depending on the specific exemption;

(b) **Regulation S** — Available only to non-U.S. persons in offshore transactions as defined under SEC rules;

(c) **Regulation A+ (Tier 2)** — Where applicable, following qualification by the SEC, available to both accredited and non-accredited investors subject to investment limits;

(d) **Equivalent exemptions** under the laws of other jurisdictions where offerings are conducted.

**2.3 Not Registered with the SEC**

HYPERION REALTY LLC IS NOT REGISTERED AS A BROKER-DEALER, INVESTMENT ADVISOR, OR INVESTMENT COMPANY WITH THE U.S. SECURITIES AND EXCHANGE COMMISSION (SEC), THE FINANCIAL INDUSTRY REGULATORY AUTHORITY (FINRA), OR ANY STATE SECURITIES REGULATORY AUTHORITY. THE HYPERION PLATFORM IS NOT REGISTERED AS A NATIONAL SECURITIES EXCHANGE OR ALTERNATIVE TRADING SYSTEM (ATS).

**2.4 No Regulatory Endorsement**

No federal, state, or foreign governmental authority has reviewed, approved, or endorsed the merits of any token offering on the Hyperion platform or the accuracy or adequacy of any offering materials. Any representation to the contrary is unlawful.

**2.5 Geographic Restrictions**

Token offerings may not be available in all jurisdictions. It is your responsibility to determine whether your participation in any offering complies with the laws of your jurisdiction. The Company reserves the right to restrict access to offerings based on geographic location, regulatory status, or investor qualification.
        `
    },
    {
        id: 'real-estate-risks',
        title: '3. Real Estate Investment Risks',
        content: `
Investment in real estate, whether directly or through tokenized fractional interests, involves substantial risks including the potential for **total loss of invested capital**. The following risk factors are illustrative and not exhaustive:

**3.1 Market Risk**

(a) Real estate values are subject to cyclical fluctuations and may decline significantly due to economic recessions, interest rate changes, demographic shifts, or oversupply;

(b) Commercial property valuations depend on capitalization rates, which are sensitive to monetary policy and investor sentiment;

(c) Past performance of real estate markets, specific properties, or the Hyperion portfolio is not indicative of future results;

(d) Real estate markets may experience prolonged periods of illiquidity where properties cannot be sold at fair value.

**3.2 Property-Specific Risks**

(a) **Vacancy Risk:** Tenants may default, fail to renew leases, or vacate, reducing or eliminating rental income;

(b) **Concentration Risk:** Individual property investments lack diversification. A single adverse event can materially affect returns;

(c) **Physical Deterioration:** Properties may suffer structural damage, environmental contamination, or deferred maintenance requiring significant capital expenditure;

(d) **Natural Disaster:** Properties are exposed to hurricanes, earthquakes, floods, wildfires, and other catastrophic events that may not be fully insurable;

(e) **Obsolescence:** Changes in market preferences, zoning, or technology may reduce a property's competitive position and value;

(f) **Environmental Liability:** Properties may be subject to environmental remediation obligations under CERCLA, state environmental laws, or equivalent foreign regulations.

**3.3 Operational Risks**

(a) Property management companies may underperform, breach their duties, or fail;

(b) Operating expenses may exceed projections due to inflation, supply chain disruptions, or regulatory mandates;

(c) Capital improvements may cost more or take longer than anticipated;

(d) Insurance coverage may be inadequate or unavailable for certain risks.

**3.4 Leverage & Financing Risks**

(a) Properties may be encumbered by mortgage debt. Debt service obligations take priority over equity distributions;

(b) Inability to refinance maturing debt on favorable terms could force property sales at distressed valuations;

(c) Rising interest rates increase debt service costs and reduce net cash flow available for distribution;

(d) Lender covenants may restrict property operations, distributions, or disposition.

**3.5 Tax & Regulatory Risks**

(a) Changes to tax laws may adversely affect the tax treatment of real estate investments, distributions, or capital gains;

(b) Property tax assessments may increase unpredictably;

(c) Zoning changes, building code amendments, or rent control regulations may restrict property use or rental rates;

(d) Transfer taxes, recording fees, or other governmental charges may apply to tokenized property transactions.
        `
    },
    {
        id: 'blockchain-risks',
        title: '4. Blockchain & Digital Asset Risks',
        content: `
Tokenized real estate involves the intersection of traditional real estate with blockchain technology, introducing unique and compounding risk categories:

**4.1 Smart Contract Risks**

(a) Smart contracts are software programs that may contain bugs, vulnerabilities, or logic errors not identified during audits;

(b) Exploits of smart contract vulnerabilities could result in loss of tokens, theft of distributed yield, or unauthorized minting;

(c) While Hyperion engages independent auditors, **no audit can guarantee the absence of all vulnerabilities**;

(d) Smart contract upgrades or migrations may introduce new risks or temporarily disrupt service;

(e) Interactions between Hyperion contracts and third-party protocols (DeFi, bridges, oracles) introduce composability risks.

**4.2 Blockchain Network Risks**

(a) The Ethereum network (or applicable L2) may experience congestion, causing delayed or failed transactions and elevated gas fees;

(b) Consensus mechanism changes (e.g., future hard forks) could create chain splits affecting token holdings;

(c) Network-level attacks (51% attacks, long-range attacks) could theoretically compromise transaction finality;

(d) Blockchain networks are experimental technology with limited operational history.

**4.3 Wallet & Custody Risks**

(a) Loss of private keys or seed phrases results in **permanent, irrecoverable loss** of all tokens stored in that wallet;

(b) The Company cannot recover, reset, or regenerate your private keys under any circumstances;

(c) Wallet software may contain vulnerabilities exploitable by malicious actors;

(d) Phishing attacks, social engineering, and malware may compromise wallet security;

(e) Hardware wallet failures, firmware bugs, or supply chain attacks may affect token access.

**4.4 Market & Liquidity Risks**

(a) Secondary markets for Hyperion tokens may be illiquid. There is **no guarantee** that a buyer will be available at any price;

(b) Token prices on secondary markets may deviate significantly from the net asset value (NAV) of the underlying property;

(c) Market makers and liquidity providers may withdraw, creating sudden illiquidity events;

(d) Token prices may be influenced by cryptocurrency market sentiment unrelated to underlying real estate fundamentals;

(e) De-pegging events in stablecoins used for yield distribution could affect the value of distributions received.

**4.5 Regulatory Risks**

(a) The regulatory classification of blockchain-based tokens is evolving globally. Future regulations may restrict, prohibit, or impose burdensome compliance requirements on tokenized securities;

(b) Regulatory action could render tokens non-transferable, delist them from exchanges, or require forced buybacks;

(c) Anti-money laundering regulations may impose additional KYC requirements, transaction monitoring, or reporting obligations affecting token transferability;

(d) Tax treatment of tokenized real estate interests may change adversely and retroactively.

**4.6 Oracle & Data Feed Risks**

(a) Smart contracts that rely on external data feeds (price oracles, property valuations) are vulnerable to oracle manipulation;

(b) Inaccurate or delayed oracle data could result in incorrect yield calculations or distribution errors;

(c) Oracle provider failures could disrupt protocol operations.
        `
    },
    {
        id: 'forward-looking',
        title: '5. Forward-Looking Statements',
        content: `
**5.1 Identification of Forward-Looking Statements**

The Hyperion platform, offering documents, whitepapers, blog posts, and marketing materials may contain "forward-looking statements" within the meaning of the Private Securities Litigation Reform Act of 1995 and equivalent provisions under other jurisdictions. Forward-looking statements include, but are not limited to:

- Projected rental yields, capitalization rates, and investment returns
- Anticipated property acquisition timelines and pipeline descriptions
- Expected protocol development milestones and feature releases
- Market growth projections for tokenized real estate
- Statements regarding future regulatory developments
- Descriptions of planned geographic expansion

Forward-looking statements are typically identified by words such as "anticipate," "believe," "estimate," "expect," "intend," "may," "plan," "project," "target," "will," "would," and similar expressions.

**5.2 No Guarantee of Forward-Looking Statements**

FORWARD-LOOKING STATEMENTS ARE BASED ON CURRENT EXPECTATIONS AND ASSUMPTIONS THAT ARE SUBJECT TO RISKS AND UNCERTAINTIES. ACTUAL RESULTS MAY DIFFER MATERIALLY FROM THOSE EXPRESSED OR IMPLIED. THE COMPANY UNDERTAKES NO OBLIGATION TO UPDATE OR REVISE ANY FORWARD-LOOKING STATEMENTS, WHETHER AS A RESULT OF NEW INFORMATION, FUTURE EVENTS, OR OTHERWISE.

**5.3 Yield Projections**

Any yield or return estimates presented on the platform are illustrative only and based on assumptions that may not materialize. Actual rental income depends on occupancy rates, tenant creditworthiness, market conditions, operating expenses, capital expenditure requirements, and numerous other factors beyond the Company's control. **Past yields are not indicative of future performance.**
        `
    },
    {
        id: 'conflicts',
        title: '6. Conflicts of Interest',
        content: `
**6.1 Company Conflicts**

You should be aware of the following potential conflicts of interest:

(a) **Fee Interest:** The Company earns fees from property acquisitions, ongoing management, and marketplace transactions. These fee interests may influence property selection, pricing, and operational decisions;

(b) **Affiliated Transactions:** Properties may be acquired from, managed by, or serviced by affiliates of The Utility Company LLC. While such transactions are conducted at arm's length, the inherent conflict should be considered;

(c) **Governance Influence:** The Company or its affiliates may hold governance tokens and vote on protocol matters, creating a potential conflict between protocol governance and commercial interests;

(d) **Information Asymmetry:** The Company possesses information about properties, tenants, and market conditions that may not be fully disclosed to token holders, despite our commitment to transparency;

(e) **Multi-Property Conflicts:** The Company manages multiple properties simultaneously. Allocation of management resources, capital, and opportunities across properties may involve discretionary decisions.

**6.2 Mitigation Measures**

The Company mitigates conflicts through:

- Independent property appraisals for all acquisitions
- Transparent fee disclosure in offering documents
- Onchain governance mechanisms for material decisions
- Periodic financial reporting and audit requirements
- Separation of property-level and protocol-level governance
        `
    },
    {
        id: 'no-guarantee',
        title: '7. No Guarantee of Returns',
        content: `
**7.1 Investment Returns**

THE COMPANY MAKES NO REPRESENTATION OR WARRANTY REGARDING THE RATE OF RETURN, IF ANY, ON YOUR INVESTMENT. INVESTMENT IN TOKENIZED REAL ESTATE INVOLVES THE RISK OF TOTAL LOSS OF YOUR INVESTED CAPITAL.

**7.2 Distribution of Yield**

Yield distributions are contingent upon the property generating net rental income after all operating expenses, debt service, reserves, and management fees. There may be periods where no distributions are made. The Company is not obligated to make distributions from sources other than net property income.

**7.3 Capital Appreciation**

There is no guarantee that the value of the underlying property or the market price of tokens will appreciate. Real estate markets are cyclical, and properties may lose value due to market conditions, physical deterioration, regulatory changes, or other factors.

**7.4 Comparison Disclaimers**

Comparative analyses between Hyperion tokens and other investment vehicles (REITs, direct ownership, syndications) are provided for educational purposes only. Such comparisons are inherently limited, may not account for all relevant factors, and should not be relied upon as the sole basis for investment decisions.

**7.5 Testimonials & Case Studies**

Any testimonials, case studies, or investor stories shared on the platform reflect individual experiences and are not representative of all investors. Individual results vary based on timing, investment amount, property selection, market conditions, and other factors.
        `
    },
    {
        id: 'third-party',
        title: '8. Third-Party Content & Links',
        content: `
**8.1 Third-Party Content**

The Hyperion platform may display, include, or link to content from third parties, including market data providers, news sources, analytical tools, and blockchain explorers. Third-party content is provided for convenience and informational purposes only.

THE COMPANY DOES NOT ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR THE ACCURACY, COMPLETENESS, OR RELIABILITY OF ANY THIRD-PARTY CONTENT. YOUR RELIANCE ON THIRD-PARTY CONTENT IS AT YOUR OWN RISK.

**8.2 External Links**

Links to external websites, decentralized applications, or services do not constitute endorsement. The Company is not responsible for the content, privacy practices, or security of external sites.

**8.3 Market Data**

Real estate market data, property valuations, comparable sales data, and market analytics displayed on the platform are derived from third-party sources believed to be reliable but not independently verified by the Company. Such data may be delayed, inaccurate, or incomplete.

**8.4 Blockchain Explorer Data**

Transaction data displayed from blockchain explorers reflects the state of the underlying blockchain network and may be subject to network reorganizations, delayed indexing, or display errors.
        `
    },
    {
        id: 'accredited',
        title: '9. Accredited Investor Requirements',
        content: `
**9.1 Definition**

Certain offerings on the Hyperion platform are available exclusively to "accredited investors" as defined in Rule 501(a) of Regulation D under the Securities Act of 1933. Generally, an accredited investor includes:

(a) A natural person with individual net worth, or joint net worth with a spouse or spousal equivalent, exceeding $1,000,000, excluding the value of the person's primary residence;

(b) A natural person with individual income exceeding $200,000 in each of the two most recent years, or joint income with a spouse or spousal equivalent exceeding $300,000, with a reasonable expectation of reaching the same level in the current year;

(c) A natural person holding in good standing one or more professional certifications, designations, or credentials designated by the SEC (Series 7, Series 65, Series 82);

(d) A "knowledgeable employee" of a private fund;

(e) Certain entities including banks, insurance companies, registered investment companies, business development companies, 501(c)(3) organizations, trusts, or entities with total assets exceeding $5,000,000.

**9.2 Verification**

The Company may verify accredited investor status through third-party verification services, review of financial documentation, or certification from a registered broker-dealer, SEC-registered investment adviser, licensed CPA, or attorney.

**9.3 Misrepresentation**

Misrepresentation of accredited investor status constitutes a material breach of these Terms and applicable securities laws. You may be subject to civil liability, regulatory sanctions, and forced disposition of tokens acquired through misrepresentation.

**9.4 Non-U.S. Investors**

Non-U.S. investors must comply with the investor qualification requirements of their home jurisdiction. The Company may impose additional verification requirements for investors in certain jurisdictions.
        `
    },
    {
        id: 'aml-sanctions',
        title: '10. Anti-Money Laundering & Sanctions Compliance',
        content: `
**10.1 AML Program**

Hyperion Realty maintains an Anti-Money Laundering (AML) compliance program in accordance with the Bank Secrecy Act (BSA), USA PATRIOT Act, FinCEN guidance on virtual currencies, and applicable state and international AML regulations. Our program includes:

- Customer identification procedures (CIP) and Know Your Customer (KYC) verification
- Transaction monitoring for suspicious activity
- Sanctions screening against OFAC, UN, EU, and other applicable sanctions lists
- PEP (Politically Exposed Person) identification and enhanced due diligence
- Suspicious Activity Report (SAR) filing where required
- Ongoing monitoring and periodic re-verification of investor information

**10.2 Your Obligations**

By using the Hyperion platform, you represent and warrant that:

(a) Funds used for investment are not derived from illegal activity;

(b) You are not acting on behalf of an undisclosed principal;

(c) You will promptly provide any additional information or documentation requested for AML/KYC compliance;

(d) You will not use the platform to circumvent sanctions, export controls, or other trade restrictions.

**10.3 Account Restrictions**

The Company may freeze, suspend, or terminate accounts and withhold distributions pending investigation of suspected money laundering, sanctions violations, or other illegal activity. We may be prohibited by law from disclosing the reason for such action.

**10.4 Cooperation with Authorities**

The Company cooperates with law enforcement and regulatory authorities in accordance with applicable law. We may be required to disclose your identity, transaction history, and account information in response to valid legal process without prior notice to you.
        `
    },
    {
        id: 'limitation',
        title: '11. Limitation of Disclaimer',
        content: `
**11.1 Jurisdictional Variations**

Some jurisdictions do not allow the exclusion or limitation of certain warranties, representations, or liability. In such jurisdictions, the disclaimers and limitations in this document shall apply to the maximum extent permitted by applicable law.

**11.2 No Waiver of Rights**

Nothing in this Risk Disclosure is intended to waive or limit any rights you may have under applicable consumer protection, securities, or other laws that cannot be waived by agreement.

**11.3 Severability**

If any provision of this Risk Disclosure is held invalid or unenforceable, the remaining provisions shall continue in full force and effect.

**11.4 Relationship to Other Documents**

This Risk Disclosure supplements, and should be read in conjunction with, the Hyperion Realty Terms of Service, Privacy Protocols, and any property-specific offering documents. In the event of conflict between this document and a property-specific offering document, the offering document shall control with respect to that specific offering.

**11.5 Updates**

This Risk Disclosure may be updated from time to time. Material changes will be communicated via the platform and email notification to registered investors. Continued use of the platform constitutes acknowledgment of the updated disclosures.

---

**ACKNOWLEDGMENT**

BY ACCESSING THE HYPERION PLATFORM, CONNECTING A WALLET, OR INVESTING IN ANY TOKEN OFFERING, YOU ACKNOWLEDGE THAT YOU HAVE READ AND UNDERSTOOD THIS RISK DISCLOSURE IN ITS ENTIRETY. YOU CONFIRM THAT YOU ARE MAKING INVESTMENT DECISIONS BASED ON YOUR OWN INDEPENDENT JUDGMENT AND THE ADVICE OF YOUR OWN PROFESSIONAL ADVISORS, AND NOT IN RELIANCE ON ANY STATEMENT OR REPRESENTATION BY HYPERION REALTY LLC OR ITS AFFILIATES.

---

**Hyperion Realty LLC**
*A subsidiary of The Utility Company LLC*
*Democratizing Real Estate Through Liquid Architecture*

**© 2026 Hyperion Realty LLC. All Rights Reserved.**
        `
    }
];

export default function DisclaimerPage() {
    return (
        <main className="bg-[#050a14] text-white min-h-screen selection:bg-hr-gold selection:text-black">
            <Navbar />

            {/* Hero */}
            <section className="relative pt-40 pb-16 px-6 border-b border-white/5">
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[150px]" style={{ background: 'radial-gradient(circle, #dc2626 0%, transparent 70%)' }} />
                </div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-hr-gold transition-colors text-sm font-mono tracking-widest uppercase mb-8">
                            ← Back to Home
                        </Link>
                        <span className="inline-block px-4 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono tracking-[0.2em] uppercase mb-6">
                            Mandatory Risk Disclosure
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
                            Investment <span className="text-red-400">Disclaimer</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl">
                            Comprehensive risk factors and regulatory disclosures for tokenized real estate investment through the Hyperion platform. This document must be read before making any investment decision.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4 text-sm font-mono text-gray-500">
                            <span>Effective: April 16, 2026</span>
                            <span>•</span>
                            <span className="text-red-400/80">Required Reading</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Warning Banner */}
            <section className="px-6 py-8 bg-red-950/20 border-y border-red-500/10">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-red-400 text-lg font-bold">!</span>
                        </div>
                        <div>
                            <p className="text-red-300/90 font-medium mb-2">Important Notice</p>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Tokenized real estate investment involves substantial risks including the potential for total loss of invested capital. The value of tokens may fluctuate significantly and you may not be able to sell tokens at your desired price or timeframe. This is not investment advice. Consult qualified professionals before investing.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Table of Contents */}
            <section className="py-12 px-6 border-b border-white/5 bg-white/[0.02]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-6">Table of Contents</h2>
                    <div className="grid md:grid-cols-2 gap-2">
                        {sections.map((section, i) => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                className="text-gray-400 hover:text-hr-gold transition-colors py-2 flex items-center gap-3"
                            >
                                <span className="text-hr-gold/50 font-mono text-xs">{String(i + 1).padStart(2, '0')}</span>
                                <span>{section.title.replace(/^\d+\.\s*/, '')}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.id}
                            id={section.id}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeInUp}
                            className="mb-16 scroll-mt-32"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-4">
                                <span className="w-10 h-[2px] bg-hr-gold"></span>
                                {section.title}
                            </h2>
                            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-semibold prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-li:text-gray-300">
                                {section.content.trim().split('\n\n').map((paragraph, i) => {
                                    const trimmed = paragraph.trim();

                                    // Handle all-caps paragraphs (legal emphasis)
                                    if (trimmed === trimmed.toUpperCase() && trimmed.length > 50) {
                                        return (
                                            <p key={i} className="text-red-400/80 leading-relaxed mb-4 font-medium text-sm tracking-wide">
                                                {trimmed.split(/(\*\*[^*]+\*\*)/).map((part, j) => {
                                                    if (part.startsWith('**') && part.endsWith('**')) {
                                                        return <strong key={j} className="text-red-300">{part.slice(2, -2)}</strong>;
                                                    }
                                                    return part;
                                                })}
                                            </p>
                                        );
                                    }

                                    if (trimmed.startsWith('**') && trimmed.endsWith('**') && !trimmed.includes('\n') && trimmed.length < 100) {
                                        return (
                                            <h3 key={i} className="text-xl font-semibold text-white mt-8 mb-4">
                                                {trimmed.slice(2, -2)}
                                            </h3>
                                        );
                                    }

                                    // Handle lettered lists
                                    if (/^\([a-z]\)/.test(trimmed) || /^\(\d+\)/.test(trimmed)) {
                                        const items = trimmed.split('\n').filter(l => l.trim());
                                        return (
                                            <div key={i} className="my-4 pl-4 border-l-2 border-red-500/30">
                                                {items.map((item, j) => (
                                                    <p key={j} className="text-gray-300 mb-2">
                                                        {item.split(/(\*\*[^*]+\*\*)/).map((part, k) => {
                                                            if (part.startsWith('**') && part.endsWith('**')) {
                                                                return <strong key={k} className="text-white">{part.slice(2, -2)}</strong>;
                                                            }
                                                            return part;
                                                        })}
                                                    </p>
                                                ))}
                                            </div>
                                        );
                                    }

                                    // Handle bullet lists
                                    if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
                                        const items = trimmed.split('\n').filter(l => l.trim());
                                        return (
                                            <ul key={i} className="list-none space-y-2 my-4">
                                                {items.map((item, j) => (
                                                    <li key={j} className="flex items-start gap-2">
                                                        <span className="text-hr-gold mt-1">•</span>
                                                        <span className="text-gray-300">
                                                            {item.replace(/^[-•]\s*/, '').split(/(\*\*[^*]+\*\*)/).map((part, k) => {
                                                                if (part.startsWith('**') && part.endsWith('**')) {
                                                                    return <strong key={k} className="text-white">{part.slice(2, -2)}</strong>;
                                                                }
                                                                return part;
                                                            })}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        );
                                    }

                                    // Regular paragraphs
                                    return (
                                        <p key={i} className="text-gray-300 leading-relaxed mb-4">
                                            {trimmed.split(/(\*\*[^*]+\*\*)/).map((part, j) => {
                                                if (part.startsWith('**') && part.endsWith('**')) {
                                                    return <strong key={j} className="text-white">{part.slice(2, -2)}</strong>;
                                                }
                                                return part;
                                            })}
                                        </p>
                                    );
                                })}
                            </div>

                            {index < sections.length - 1 && (
                                <div className="mt-12 pt-12 border-t border-white/5" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
