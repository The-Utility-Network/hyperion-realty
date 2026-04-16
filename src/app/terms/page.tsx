'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const THEME_COLOR = '#d4af37';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const sections = [
    {
        id: 'introduction',
        title: '1. Agreement to Terms',
        content: `
**PLEASE READ THESE TERMS OF SERVICE CAREFULLY BEFORE USING OUR SERVICES.**

These Terms of Service ("Terms," "Agreement") constitute a legally binding contract between you ("User," "Investor," "Token Holder," "you," "your") and **Hyperion Realty LLC**, a subsidiary of The Utility Company LLC, a New Mexico limited liability company, together with its subsidiaries, affiliates, and related entities (collectively, "Company," "we," "our," "us"). These Terms govern your access to and use of all websites, applications, platforms, smart contracts, products, and services offered by the Company, including but not limited to:

- **Hyperion Platform** — The primary web application for property discovery, investment, and portfolio management
- **Tokenization Engine** — ERC721 deed anchoring and ERC20 fractional token issuance infrastructure
- **Yield Distribution Protocol** — Automated rental income distribution to ERC20 token holders
- **Marketplace** — Secondary trading platform for Hyperion property tokens
- **Global Acquisition Hub** — Property research, analytics, and location-specific intelligence
- **Governance System** — Onchain voting and proposal management for property and protocol decisions
- **The Journal** — Educational content, market analysis, and investor communications

(Collectively, the "Services")

**BY ACCESSING OR USING ANY OF OUR SERVICES, CONNECTING A CRYPTOCURRENCY WALLET, PURCHASING OR RECEIVING TOKENS, OR PARTICIPATING IN GOVERNANCE, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS.** If you do not agree to these Terms, you must not access or use the Services.

**Effective Date:** April 16, 2026
**Last Updated:** April 16, 2026
        `
    },
    {
        id: 'eligibility',
        title: '2. Eligibility & Account Registration',
        content: `
**2.1 Eligibility Requirements**

To access and use the Services, you must:

(a) Be at least 18 years of age, or the age of legal majority in your jurisdiction, whichever is higher;

(b) Have the legal capacity to enter into a binding contract;

(c) Successfully complete Know Your Customer (KYC) and Anti-Money Laundering (AML) verification procedures as required for investment activities;

(d) Not be a person barred from using the Services under the laws of your jurisdiction of residence or any other applicable jurisdiction;

(e) Not be located in, under the control of, or a national or resident of any country subject to United States sanctions or embargoes, including but not limited to Cuba, Iran, North Korea, Syria, the Crimea region, and the Donetsk and Luhansk regions;

(f) Not be listed on any United States government list of prohibited or restricted parties, including the Specially Designated Nationals List administered by the Office of Foreign Assets Control (OFAC);

(g) Qualify as an accredited investor under SEC Regulation D, or meet equivalent requirements under applicable jurisdictional law, where required for specific investment offerings;

(h) Comply with all applicable laws and regulations in connection with your use of the Services.

**2.2 Account Registration & KYC**

Certain Services require you to create an account and complete identity verification. When registering, you agree to:

(a) Provide accurate, current, and complete information as required by KYC/AML verification processes;

(b) Submit valid government-issued identification and proof of address documentation;

(c) Promptly update your account information to keep it accurate, current, and complete;

(d) Maintain the security and confidentiality of your login credentials and connected wallet keys;

(e) Accept sole responsibility for all activities occurring under your account or connected wallets;

(f) Notify us immediately of any unauthorized access to your account;

(g) Not create multiple accounts for fraudulent purposes or to circumvent KYC requirements, investment limits, or sanctions controls.

**2.3 Wallet Connection**

When you connect a cryptocurrency wallet to the Hyperion Platform:

(a) You represent that you are the rightful owner of the wallet and all assets contained therein;

(b) You understand that blockchain transactions are irreversible and the Company cannot reverse, cancel, or modify completed onchain transactions;

(c) You accept sole responsibility for the security of your private keys and seed phrases;

(d) You acknowledge that loss of wallet access may result in permanent loss of access to your tokens without recourse.

**2.4 Account Termination**

We reserve the right to suspend or terminate your account for violation of these Terms, engagement in fraudulent or illegal conduct, failure of ongoing KYC/AML monitoring, or as required by law. Upon termination, onchain token holdings remain accessible via your wallet but platform services will be discontinued.
        `
    },
    {
        id: 'services',
        title: '3. Description of Services',
        content: `
**3.1 Tokenized Real Estate Investment**

Hyperion Realty provides a technology platform enabling fractional investment in commercial and premium real estate through blockchain-based tokenization. The process involves:

(a) **Property Acquisition:** Identification, due diligence, and acquisition of institutional-grade real estate assets globally;

(b) **ERC721 Deed Anchoring:** Minting of a non-fungible token representing the immutable onchain record of property ownership;

(c) **ERC20 Fractionalization:** Issuance of fungible tokens representing fractional ownership shares in the underlying property;

(d) **Yield Distribution:** Automated, trustless distribution of net rental income to ERC20 token holders proportional to their holdings;

(e) **Secondary Market:** A marketplace for trading ERC20 property tokens with other verified investors.

**3.2 Not an Offer of Securities**

Nothing on the Hyperion Platform constitutes an offer to sell or a solicitation of an offer to buy securities in any jurisdiction where such offer or solicitation would be unlawful. Token offerings may be conducted under regulatory exemptions (including Regulation D, Regulation S, or equivalent) and are available only to eligible investors in permitted jurisdictions.

**3.3 Modifications to Services**

We reserve the right to modify, suspend, or discontinue any Service at any time. For modifications materially affecting token holder rights or yield distribution mechanics, we will provide at least 30 days' notice and, where applicable, submit modifications to governance vote.

**3.4 Service Availability**

While we strive for continuous availability, we do not guarantee uninterrupted access. Smart contract functionality operates independently on the blockchain and is not subject to platform downtime; however, the user interface for interacting with contracts may experience interruptions.

**3.5 Third-Party Services**

The Services integrate with third-party providers including blockchain networks (Ethereum, L2s), wallet providers (MetaMask, WalletConnect), KYC verification services, and payment processors. We do not control third-party services and your use of them is governed by their respective terms.
        `
    },
    {
        id: 'fees',
        title: '4. Fees, Yield & Financial Terms',
        content: `
**4.1 Platform Fees**

(a) **Acquisition Fee:** A one-time fee charged upon property tokenization, disclosed in the offering documentation for each property;

(b) **Management Fee:** An annual property management fee deducted from gross rental income before yield distribution, disclosed per property;

(c) **Trading Fee:** A percentage fee on secondary market transactions, displayed at the time of trade execution;

(d) **Protocol Revenue:** A fractional tax on ERC20 trading volume allocated to the Hyperion treasury for property improvements, as defined in smart contract parameters.

**4.2 Yield Distribution**

(a) Net rental income is distributed to ERC20 token holders automatically via smart contract on a schedule defined per property (monthly, quarterly, or as specified);

(b) Yield is calculated based on token holdings at the snapshot block designated for each distribution period;

(c) Yield amounts are variable and depend on property performance, occupancy rates, operating expenses, and market conditions;

(d) Past yield performance does not guarantee future distributions;

(e) Yield may be distributed in stablecoins (USDC, USDT), ETH, or fiat equivalent, as specified per property.

**4.3 Taxes**

You are solely responsible for determining and paying all taxes applicable to your investment activities, including but not limited to income tax on yield distributions, capital gains tax on token sales, and any applicable withholding obligations. We may be required to issue tax documentation (1099s, K-1s, or equivalent) and will do so in compliance with applicable law.

**4.4 Gas Fees**

Blockchain network transaction fees ("gas fees") are your responsibility. Gas fees are determined by network conditions and are not controlled by or paid by Hyperion Realty.
        `
    },
    {
        id: 'intellectual-property',
        title: '5. Intellectual Property Rights',
        content: `
**5.1 Company Intellectual Property**

The Services, including all software, smart contracts, algorithms, designs, graphics, text, images, trademarks, service marks, trade names, logos, property research, and analytical models (collectively, "Company IP"), are owned by or licensed to the Company and protected by United States and international intellectual property laws.

**5.2 License Grant to You**

Subject to your compliance with these Terms, the Company grants you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to access and use the Services solely for personal investment purposes. This license expressly does not include any right to:

(a) Reverse engineer, decompile, or derive source code from smart contracts or platform software;

(b) Copy, distribute, or create derivative works from Company IP, including property research and market analytics;

(c) Use the Services or Company IP for competitive analysis or to build a competing tokenization platform;

(d) Frame, mirror, or embed any portion of the Services without prior written consent.

**5.3 Token Holder Rights**

Ownership of Hyperion ERC20 tokens grants:

(a) Proportional economic rights to net rental income from the underlying property;

(b) Governance voting rights as specified in the property's charter and DAO governance documentation;

(c) The right to transfer tokens on supported marketplaces and exchanges, subject to applicable transfer restrictions.

Token ownership does not grant:

(a) Direct legal title to the underlying physical real estate;

(b) The right to occupy, modify, or physically access the property;

(c) Management authority over property operations outside of governance mechanisms;

(d) Intellectual property rights to Hyperion branding, technology, or proprietary systems.

**5.4 DMCA Policy**

We respond to notices of alleged copyright infringement in accordance with the DMCA. To report infringement, contact: legal@hyperionrealty.io.
        `
    },
    {
        id: 'user-conduct',
        title: '6. Acceptable Use Policy',
        content: `
**6.1 General Conduct Standards**

You agree to use the Services only for lawful purposes and in accordance with these Terms. You shall not use the Services:

(a) In any way that violates any applicable federal, state, local, or international law or regulation;

(b) To engage in market manipulation, wash trading, or artificial inflation of token prices;

(c) To impersonate another investor, wallet owner, or Company representative;

(d) To circumvent KYC/AML requirements or transfer restrictions.

**6.2 Prohibited Activities**

You shall not:

(a) Introduce viruses, Trojan horses, worms, or other malicious code targeting the platform or smart contracts;

(b) Attempt to exploit smart contract vulnerabilities for unauthorized gain (report vulnerabilities through our bug bounty program instead);

(c) Use automated bots, scripts, or tools to interact with the platform without authorization;

(d) Attempt to access other users' accounts, wallets, or personal information;

(e) Engage in front-running, sandwich attacks, or MEV extraction targeting Hyperion transactions;

(f) Use the platform to launder money, finance terrorism, or evade sanctions;

(g) Collect or harvest personally identifiable information from the platform;

(h) Circumvent rate limits, access controls, or geographical restrictions.

**6.3 Cryptocurrency and Blockchain-Specific Provisions**

You additionally acknowledge and agree:

(a) Blockchain transactions are irreversible. The Company cannot reverse, cancel, or modify completed onchain transactions under any circumstances;

(b) Smart contracts execute autonomously. Once deployed, smart contract logic operates independently and may not be manually overridden except through predetermined governance mechanisms;

(c) You accept the inherent risks of blockchain technology including but not limited to: protocol-level bugs, consensus failures, network congestion, bridge exploits, and regulatory prohibition;

(d) The Company does not provide investment, financial, tax, or legal advice. All investment decisions are your sole responsibility.
        `
    },
    {
        id: 'disclaimers',
        title: '7. Disclaimers & Risk Factors',
        content: `
**7.1 "AS IS" AND "AS AVAILABLE" BASIS**

THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, THE COMPANY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:

(a) IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT;

(b) WARRANTIES THAT THE SERVICES WILL MEET YOUR REQUIREMENTS OR GENERATE RETURNS;

(c) WARRANTIES THAT SMART CONTRACTS WILL OPERATE WITHOUT ERROR OR VULNERABILITY;

(d) WARRANTIES REGARDING THE ACCURACY OF PROPERTY VALUATIONS, YIELD PROJECTIONS, OR MARKET ANALYTICS;

(e) WARRANTIES THAT TOKENS WILL MAINTAIN OR APPRECIATE IN VALUE.

**7.2 Investment Risk Factors**

YOU ACKNOWLEDGE AND ACCEPT THE FOLLOWING RISKS:

(a) REAL ESTATE VALUES MAY DECLINE, AND PROPERTY INVESTMENTS MAY RESULT IN PARTIAL OR TOTAL LOSS OF CAPITAL;

(b) RENTAL INCOME IS NOT GUARANTEED AND MAY BE REDUCED BY VACANCY, TENANT DEFAULT, NATURAL DISASTER, OR MARKET CONDITIONS;

(c) REGULATORY CHANGES MAY RESTRICT OR PROHIBIT TOKENIZED REAL ESTATE IN CERTAIN JURISDICTIONS;

(d) CRYPTOCURRENCY MARKETS ARE INHERENTLY VOLATILE AND TOKEN PRICES MAY FLUCTUATE SIGNIFICANTLY;

(e) SECONDARY MARKET LIQUIDITY IS NOT GUARANTEED AND YOU MAY NOT BE ABLE TO SELL TOKENS AT YOUR DESIRED PRICE OR TIMEFRAME;

(f) SMART CONTRACT VULNERABILITIES OR BLOCKCHAIN NETWORK FAILURES COULD RESULT IN LOSS OF TOKENS OR INABILITY TO CLAIM YIELD;

(g) THE REGULATORY STATUS OF TOKENIZED REAL ESTATE SECURITIES REMAINS EVOLVING AND MAY CHANGE ADVERSELY.

**7.3 No Investment Advice**

THE COMPANY DOES NOT PROVIDE INVESTMENT, FINANCIAL, LEGAL, OR TAX ADVICE. NOTHING ON THE PLATFORM SHOULD BE CONSTRUED AS A RECOMMENDATION TO BUY, SELL, OR HOLD ANY TOKEN OR INVEST IN ANY PROPERTY. YOU SHOULD CONSULT QUALIFIED PROFESSIONALS BEFORE MAKING INVESTMENT DECISIONS.
        `
    },
    {
        id: 'liability',
        title: '8. Limitation of Liability',
        content: `
**8.1 Exclusion of Consequential Damages**

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE COMPANY, ITS DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, PARTNERS, PROPERTY MANAGERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO:

(a) Loss of profits, revenue, yield, or anticipated investment returns;
(b) Loss of tokens due to wallet compromise, private key loss, or smart contract failure;
(c) Decline in property value or token market price;
(d) Costs of procurement of substitute investment opportunities;
(e) Unauthorized access to or alteration of blockchain transactions;
(f) Regulatory action affecting token transferability or platform access;

WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOT THE COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

**8.2 Aggregate Liability Cap**

THE TOTAL LIABILITY OF THE COMPANY FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS SHALL NOT EXCEED THE GREATER OF:

(a) THE AMOUNTS YOU PAID TO THE COMPANY IN PLATFORM FEES IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM; OR

(b) ONE THOUSAND UNITED STATES DOLLARS ($1,000.00).

THIS CAP DOES NOT APPLY TO THE COMPANY'S OBLIGATION TO DISTRIBUTE YIELD OR RETURN INVESTMENT PRINCIPAL AS CONTRACTUALLY SPECIFIED IN PROPERTY OFFERING DOCUMENTS.

**8.3 Essential Basis of the Bargain**

THE LIMITATIONS OF LIABILITY SET FORTH HEREIN FORM AN ESSENTIAL BASIS OF THE BARGAIN BETWEEN THE PARTIES. THE COMPANY WOULD NOT PROVIDE THE SERVICES WITHOUT THESE LIMITATIONS.
        `
    },
    {
        id: 'indemnification',
        title: '9. Indemnification',
        content: `
**9.1 Your Indemnification Obligations**

You agree to indemnify, defend, and hold harmless the Company and its officers, directors, employees, agents, affiliates, property managers, and successors from any claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to:

(a) Your access to or use of the Services;

(b) Your violation of these Terms;

(c) Your violation of any applicable law, regulation, or third-party right;

(d) Your failure to comply with KYC/AML requirements or tax obligations;

(e) Your misrepresentation of accredited investor status or eligibility;

(f) Losses resulting from compromise of your wallet keys or account credentials;

(g) Disputes between you and other token holders or platform users.

**9.2 Indemnification Procedure**

The Company will provide prompt notice of claims subject to indemnification and reserves the right to assume defense at its own expense. You shall not settle claims without Company written consent.
        `
    },
    {
        id: 'dispute-resolution',
        title: '10. Dispute Resolution & Arbitration',
        content: `
**10.1 Informal Resolution**

Before initiating formal proceedings, you agree to contact legal@hyperionrealty.io and attempt to resolve the dispute informally within thirty (30) days.

**10.2 Binding Arbitration**

IF INFORMAL RESOLUTION FAILS, ANY DISPUTE SHALL BE RESOLVED BY BINDING ARBITRATION administered by the American Arbitration Association ("AAA") under its Commercial Arbitration Rules:

(a) In Albuquerque, New Mexico, or another mutually agreed location;

(b) By a single arbitrator with expertise in securities, real estate, or blockchain law;

(c) In the English language;

(d) In accordance with the Federal Arbitration Act.

**10.3 Class Action Waiver**

YOU AGREE THAT ANY DISPUTE RESOLUTION WILL BE CONDUCTED ONLY ON AN INDIVIDUAL BASIS AND NOT IN A CLASS, CONSOLIDATED, OR REPRESENTATIVE ACTION. YOU WAIVE ANY RIGHT TO PARTICIPATE IN A CLASS ACTION OR CLASS-WIDE ARBITRATION.

**10.4 Exceptions**

The following are exempt from mandatory arbitration:

(a) Claims eligible for small claims court;
(b) Claims for injunctive relief to prevent intellectual property infringement or smart contract exploitation;
(c) Claims that applicable law does not permit to be arbitrated.

**10.5 Governing Law**

These Terms shall be governed by the laws of the State of New Mexico, without regard to conflict of law principles. The UN Convention on Contracts for the International Sale of Goods does not apply.

**10.6 Venue**

For claims not subject to arbitration, you consent to exclusive jurisdiction in the state and federal courts of Bernalillo County, New Mexico.

**10.7 Time Limitation**

Any claim must be filed within one (1) year after such claim arose, or be forever barred.
        `
    },
    {
        id: 'general',
        title: '11. General Provisions',
        content: `
**11.1 Entire Agreement**

These Terms, together with our Privacy Protocols, property offering documents, and governance charters, constitute the entire agreement between you and the Company regarding the Services.

**11.2 Severability**

If any provision is held invalid, it shall be modified to the minimum extent necessary or severed. Remaining provisions continue in full force.

**11.3 Waiver**

Failure to enforce any provision shall not constitute a waiver. Any waiver must be in writing.

**11.4 Assignment**

You may not assign these Terms without written consent. The Company may freely assign its rights and obligations.

**11.5 Force Majeure**

The Company is not liable for failures resulting from acts of God, war, terrorism, pandemics, blockchain network disruptions, smart contract exploits beyond reasonable control, regulatory changes, or other causes beyond reasonable control.

**11.6 Notices**

(a) **To You:** Via email, platform notification, or onchain governance proposal, as appropriate;

(b) **To the Company:** legal@hyperionrealty.io or legal@theutilitycompany.co

**11.7 Relationship of the Parties**

Nothing creates an agency, partnership, joint venture, or employment relationship. Token holders are investors, not partners, employees, or fiduciaries of the Company.

**11.8 Regulatory Compliance**

The Company operates in compliance with applicable securities, real estate, and financial regulations. Specific offerings may be subject to additional regulatory requirements disclosed in property-specific offering documentation.
        `
    },
    {
        id: 'modifications',
        title: '12. Modifications to Terms',
        content: `
**12.1 Right to Modify**

The Company reserves the right to modify these Terms. For material changes, we will:

(a) Post updated Terms with a new "Last Updated" date;

(b) Provide at least 30 days' notice via email or prominent platform notification;

(c) For changes affecting token holder economic or governance rights, submit modifications to DAO governance vote where applicable.

**12.2 Material Changes**

Material changes include modifications to:

(a) Dispute resolution, arbitration, or class action waiver provisions;
(b) Limitation of liability or warranty provisions;
(c) Fee structures or yield distribution mechanics;
(d) Token holder rights or governance procedures;
(e) KYC/AML requirements or eligibility criteria.

**12.3 Acceptance**

Continued use after notice constitutes acceptance. If you disagree, you must cease use and may sell your tokens on the secondary market subject to applicable restrictions.
        `
    },
    {
        id: 'contact',
        title: '13. Contact Information',
        content: `
For questions, concerns, or notices regarding these Terms:

**Hyperion Realty LLC**
Legal Department
Email: legal@hyperionrealty.io

**Parent Company**
The Utility Company LLC
Email: legal@theutilitycompany.co

**General Inquiries:**
info@hyperionrealty.io

**Privacy Matters:**
privacy@hyperionrealty.io

---

**ACKNOWLEDGMENT**

BY USING THE SERVICES, CONNECTING A WALLET, OR HOLDING HYPERION TOKENS, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE, UNDERSTAND THEM, AND AGREE TO BE BOUND BY THEM. YOU FURTHER ACKNOWLEDGE THAT THESE TERMS, TOGETHER WITH THE PRIVACY PROTOCOLS AND APPLICABLE OFFERING DOCUMENTS, REPRESENT THE COMPLETE AGREEMENT BETWEEN YOU AND THE COMPANY.

---

**Hyperion Realty LLC**
*A subsidiary of The Utility Company LLC*
*Democratizing Real Estate Through Liquid Architecture*

**© 2026 Hyperion Realty LLC. All Rights Reserved.**
        `
    }
];

export default function TermsOfServicePage() {
    return (
        <main className="bg-[#050a14] text-white min-h-screen selection:bg-hr-gold selection:text-black">
            <Navbar />

            {/* Hero */}
            <section className="relative pt-40 pb-16 px-6 border-b border-white/5">
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[150px]" style={{ background: 'radial-gradient(circle, #d4af37 0%, transparent 70%)' }} />
                </div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-hr-gold transition-colors text-sm font-mono tracking-widest uppercase mb-8">
                            ← Back to Home
                        </Link>
                        <span className="inline-block px-4 py-1 rounded-full bg-hr-gold/10 border border-hr-gold/20 text-hr-gold text-xs font-mono tracking-[0.2em] uppercase mb-6">
                            Legal Agreement
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
                            Terms of <span className="text-hr-gold">Service</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl">
                            The binding agreement governing your access to and use of all services, platforms, smart contracts, and tokenized investment products offered by Hyperion Realty LLC.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4 text-sm font-mono text-gray-500">
                            <span>Effective: April 16, 2026</span>
                            <span>•</span>
                            <span>Jurisdiction: New Mexico, USA</span>
                        </div>
                    </motion.div>
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
                                            <p key={i} className="text-hr-gold/80 leading-relaxed mb-4 font-medium text-sm tracking-wide">
                                                {trimmed.split(/(\*\*[^*]+\*\*)/).map((part, j) => {
                                                    if (part.startsWith('**') && part.endsWith('**')) {
                                                        return <strong key={j} className="text-hr-gold">{part.slice(2, -2)}</strong>;
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

                                    // Handle lettered/numbered lists
                                    if (/^\([a-z]\)/.test(trimmed) || /^\(\d+\)/.test(trimmed)) {
                                        const items = trimmed.split('\n').filter(l => l.trim());
                                        return (
                                            <div key={i} className="my-4 pl-4 border-l-2 border-hr-gold/30">
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

                                    if (trimmed.startsWith('-') || trimmed.startsWith('❌') || trimmed.startsWith('•')) {
                                        const items = trimmed.split('\n').filter(l => l.trim());
                                        return (
                                            <ul key={i} className="list-none space-y-2 my-4">
                                                {items.map((item, j) => (
                                                    <li key={j} className="flex items-start gap-2">
                                                        <span className="text-hr-gold mt-1">•</span>
                                                        <span className="text-gray-300">
                                                            {item.replace(/^[-❌•]\s*/, '').split(/(\*\*[^*]+\*\*)/).map((part, k) => {
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
