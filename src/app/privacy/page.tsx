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
        title: '1. Introduction & Commitment',
        content: `
**Hyperion Realty LLC** ("Company," "we," "our," or "us"), a subsidiary of The Utility Company LLC, is committed to protecting the privacy, security, and sovereignty of personal information entrusted to us by our investors, token holders, property stakeholders, and platform users ("you" or "your"). These Privacy Protocols establish the comprehensive framework governing our collection, processing, storage, transmission, and disposition of personal and organizational data across all Hyperion operations.

These Protocols establish **affirmative data sovereignty principles** that recognize your fundamental rights over your personal information. We treat data protection as a core organizational value—not merely a compliance obligation—reflecting our commitment to transparency in both physical real estate and digital asset management.

**Effective Date:** April 16, 2026
**Last Updated:** April 16, 2026
**Version:** 1.0

These Privacy Protocols apply to:
- All websites, applications, and digital platforms operated by Hyperion Realty LLC, including hyperion.theutilitycompany.co and hyperionrealty.io
- All tokenization activities, including ERC721 deed anchoring and ERC20 fractional token distribution
- All investor portals, marketplace interfaces, and wallet connection services
- All communications, marketing activities, and investor relationship management
- All property acquisition, management, and yield distribution operations
        `
    },
    {
        id: 'principles',
        title: '2. Core Privacy Principles',
        content: `
Our Privacy Protocols are founded upon seven inviolable principles governing all data-related activities within the Hyperion ecosystem:

**2.1 Data Sovereignty**
You own your data. Period. We are custodians, not proprietors. Your personal information—including wallet addresses, investment records, and KYC documentation—remains your property at all times, and you retain the absolute right to access, export, correct, or delete it without restriction, penalty, or undue delay.

**2.2 Purpose Limitation**
We collect only the data necessary for explicitly stated purposes: property tokenization, yield distribution, regulatory compliance, and platform operation. We do not engage in speculative data collection, behavioral profiling for third-party benefit, or accumulation of information beyond operational necessity.

**2.3 Transparency by Default**
Every data collection point, processing activity, and sharing arrangement is documented and accessible to you. All onchain transactions are inherently transparent via public blockchain explorers; all offchain data processing is governed by these Protocols.

**2.4 Security as Architecture**
Privacy protection is engineered into our systems from inception. We employ defense-in-depth strategies, zero-trust architectures, and cryptographic protections at every layer—from wallet authentication to property deed storage.

**2.5 Minimal Retention**
Data is retained only for the duration necessary to fulfill its stated purpose or comply with legal obligations—including securities regulations, anti-money laundering requirements, and tax reporting mandates.

**2.6 Consent as Contract**
Your consent is not buried in dense legalese or obtained through dark patterns. Consent requests are presented clearly, separately from other terms, and may be withdrawn at any time without affecting your access to core services.

**2.7 Accountability Without Exception**
We accept full responsibility for data protection across our entire ecosystem, including all vendors, processors, custodians, and property management partners who access data on our behalf.
        `
    },
    {
        id: 'collection',
        title: '3. Data Collection Framework',
        content: `
**3.1 Categories of Personal Data**

We collect and process the following categories of personal data, each subject to the protections outlined in these Protocols:

**Identity Data**
- Full legal name and any aliases or professional names
- Date of birth and age verification indicators
- Government-issued identification numbers (required for KYC/AML compliance)
- Proof of address documentation
- Accredited investor status verification (where applicable)

**Contact Data**
- Email addresses (primary and secondary)
- Telephone numbers (mobile and landline)
- Physical mailing addresses
- Professional contact information

**Financial & Investment Data**
- Cryptocurrency wallet addresses (public keys only)
- Token holdings and transaction history on public blockchains
- Fiat payment information (tokenized, never stored in raw form)
- Investment amounts, yield distributions, and portfolio positions
- Tax identification numbers (SSN, EIN, or equivalent)
- Banking details for fiat on/off-ramp transactions

**Blockchain Data**
- Public wallet addresses connected to our platform
- Onchain transaction signatures and hashes
- Smart contract interaction history
- Token balance snapshots for yield distribution calculations

**Technical Data**
- IP addresses (anonymized after 90 days)
- Browser type and version
- Device identifiers and characteristics
- Web3 provider information (MetaMask, WalletConnect, etc.)
- Access timestamps and session data

**Usage Data**
- Platform interaction patterns and feature utilization
- Property listing views and marketplace activity
- Search queries within our platform
- Performance and error logs

**Communication Data**
- Investor support inquiries and responses
- Email correspondence with Company representatives
- Community forum and governance participation records
- Feedback and survey responses

**3.2 Collection Methods**

Data is collected through the following mechanisms:

**Direct Provision:** Information you actively provide through account creation, KYC/AML verification, investment transactions, or communications.

**Wallet Connection:** Public blockchain data associated with wallet addresses you voluntarily connect to our platform.

**Automated Collection:** Technical data gathered automatically through cookies, analytics tools, and server logs.

**Third-Party Sources:** Information received from identity verification services (e.g., Jumio, Onfido), payment processors, property registries, or public databases, always with appropriate legal basis.

**Onchain Observation:** Publicly available blockchain data associated with Hyperion smart contracts, including token transfers, governance votes, and yield claims.
        `
    },
    {
        id: 'processing',
        title: '4. Data Processing Activities',
        content: `
**4.1 Legal Bases for Processing**

All data processing activities are conducted pursuant to one or more of the following legal bases:

**Contractual Necessity:** Processing required to fulfill our contractual obligations—including token issuance, yield distribution, property management, and investor reporting.

**Legal Compliance:** Processing required to comply with securities regulations, anti-money laundering (AML) laws, know-your-customer (KYC) requirements, tax reporting obligations, and real estate regulatory frameworks.

**Legitimate Interests:** Processing necessary for our legitimate business interests, provided such interests do not override your fundamental rights. We conduct balancing tests for all legitimate interest claims.

**Explicit Consent:** Processing for purposes requiring your affirmative, informed consent, which may be withdrawn at any time.

**4.2 Specific Processing Purposes**

**Tokenization & Investment Services**
- Processing KYC/AML verification for investor onboarding
- Executing ERC721 deed minting and ERC20 fractionalization
- Calculating and distributing rental yield to token holders
- Managing marketplace listings and secondary trading
- Generating investor statements and tax documentation

**Property Operations**
- Coordinating property acquisition due diligence
- Managing tenant relationships and lease administration
- Overseeing property maintenance and capital improvements
- Conducting property valuations and portfolio reporting

**Security & Fraud Prevention**
- Detecting and preventing unauthorized access and wash trading
- Identifying and mitigating fraudulent investment activity
- Maintaining smart contract integrity and protocol security
- Conducting security audits and vulnerability assessments

**Regulatory Compliance**
- Filing tax reports (1099s, K-1s, or equivalent) for token holders
- Responding to lawful regulatory inquiries
- Maintaining records as required by securities and real estate law
- Conducting sanctions screening and ongoing monitoring

**Communication & Governance**
- Sending yield distribution notifications and portfolio updates
- Providing governance proposals and voting notifications
- Delivering property performance reports and market intelligence
- Conducting surveys and soliciting community feedback

**4.3 Automated Decision-Making**

We employ automated decision-making in limited circumstances:

- **KYC/AML Screening:** Automated systems cross-reference identity documents against sanctions lists and PEP databases. Flagged applications are subject to enhanced human review before adverse action.

- **Yield Calculation:** Smart contracts autonomously calculate and distribute rental yields based on token holdings. These calculations are deterministic, verifiable onchain, and not subject to discretionary human intervention.

- **Risk Assessment:** Automated risk scoring for transaction monitoring. You have the right to request human review of any automated decision affecting your access to services.

We do not engage in fully automated decision-making that produces legal effects or similarly significant impacts without human oversight.
        `
    },
    {
        id: 'sharing',
        title: '5. Data Sharing & Transfers',
        content: `
**5.1 Categories of Recipients**

We share personal data only with the following categories of recipients, subject to appropriate safeguards:

**Service Providers**
- Cloud infrastructure and hosting providers
- KYC/AML verification services
- Payment processors and fiat on/off-ramp providers
- Property management companies and real estate brokers
- Legal, accounting, and audit firms
- Analytics services (with anonymization requirements)

**Affiliated Entities**
- The Utility Company LLC and its subsidiaries for integrated service delivery
- BasaltHQ for enterprise infrastructure and investor portal services
- Shared service providers within The Utility Network, subject to these Protocols

**Regulatory & Legal Authorities**
- Securities regulators (SEC, state regulators, or equivalent)
- Tax authorities (IRS, state tax agencies, or equivalent)
- Anti-money laundering authorities (FinCEN or equivalent)
- Courts and law enforcement when required by valid legal process

**Property Partners**
- Title companies and escrow agents for property closings
- Property appraisers and inspectors
- Insurance underwriters for property coverage
- Local real estate regulatory bodies

**5.2 What We Never Do**

❌ Sell personal data to third parties for monetary compensation
❌ Share wallet addresses or investment data with data brokers
❌ Provide investor data to third parties for independent marketing
❌ Disclose data to government agencies without valid legal process
❌ Share KYC documentation without explicit regulatory obligation
❌ Transfer data to jurisdictions lacking adequate protections without supplementary safeguards

**5.3 Blockchain Transparency Notice**

Certain data associated with your use of Hyperion is recorded on public blockchains and is inherently transparent. This includes:

- Token transfers and balances associated with your public wallet address
- Governance voting records
- Yield claim transactions
- Smart contract interactions

We cannot delete, modify, or restrict access to data recorded on public blockchains. Your wallet address is pseudonymous by default; however, if you have completed KYC, we maintain the mapping between your identity and wallet address under strict confidentiality controls.

**5.4 International Data Transfers**

Given Hyperion's global property portfolio, data may be transferred across international borders. We implement Standard Contractual Clauses, conduct Transfer Impact Assessments, and apply supplementary technical measures including enhanced encryption and pseudonymization for all cross-border transfers.
        `
    },
    {
        id: 'security',
        title: '6. Security Protocols',
        content: `
**6.1 Technical Security Measures**

**Encryption**
- AES-256 encryption for all data at rest, including KYC documents and investor records
- TLS 1.3 encryption for all data in transit
- End-to-end encryption for sensitive investor communications
- Hardware Security Modules (HSMs) for cryptographic key management
- Multisig wallet architecture for protocol treasury and yield distribution contracts

**Access Controls**
- Role-based access control (RBAC) limiting data access to authorized personnel
- Multi-factor authentication for all administrative and investor portal access
- Hardware wallet authentication for smart contract administrative functions
- Automated access reviews and deprovisioning

**Smart Contract Security**
- Formal verification of yield distribution and tokenization contracts
- Independent third-party audits by recognized blockchain security firms
- Time-locked administrative functions with multisig requirements
- Bug bounty program for responsible vulnerability disclosure

**Network Security**
- Enterprise-grade firewalls and intrusion detection systems
- DDoS protection and traffic analysis
- Network segmentation isolating investor data from public-facing systems
- Continuous vulnerability scanning and penetration testing

**6.2 Organizational Security Measures**

**Personnel Security**
- Background checks for all personnel with access to investor data
- Comprehensive security awareness training with real estate and crypto-specific modules
- Confidentiality agreements and acceptable use policies
- Disciplinary procedures for policy violations

**Vendor Management**
- Security assessments and SOC 2 certification requirements for key vendors
- Contractual security requirements and audit rights
- Ongoing monitoring of vendor security posture
- Incident notification requirements in all data processing agreements

**6.3 Incident Response**

**Detection:** Continuous monitoring of both Web2 and Web3 attack surfaces, automated alerting, and employee reporting channels.

**Containment:** Immediate isolation of affected systems, emergency pause capabilities on smart contracts, and evidence preservation.

**Notification:** Affected investors notified within 72 hours for high-risk incidents, with clear explanation of the incident, potential impacts, and remediation steps.

**Remediation:** Root cause analysis, system hardening, and implementation of preventive measures documented in post-incident reports.
        `
    },
    {
        id: 'rights',
        title: '7. Your Rights & How to Exercise Them',
        content: `
**7.1 Enumeration of Rights**

**Right of Access**
You may request confirmation of whether we process your personal data and obtain a copy in a commonly used electronic format, including records of all yield distributions, token transactions, and KYC status.

**Right of Rectification**
You may request correction of inaccurate personal data or completion of incomplete data. Note that onchain data cannot be modified, but we will correct all offchain records within 30 days.

**Right of Erasure**
You may request deletion of your personal data when it is no longer necessary for its original purpose. Certain data must be retained where required by securities regulations, tax law, or AML obligations. Onchain data recorded on public blockchains cannot be erased.

**Right to Restrict Processing**
You may request limitation of processing while we verify contested data or while you object to processing pending our assessment of legitimate grounds.

**Right to Data Portability**
You may receive your personal data in a structured, machine-readable format. Your onchain data is inherently portable via public blockchain access.

**Right to Object**
You may object to processing based on legitimate interests. You may object to marketing communications at any time, and we will immediately cease such processing.

**Right to Withdraw Consent**
Where processing is based on consent, you may withdraw at any time. Withdrawal does not affect the lawfulness of prior processing.

**Right Regarding Automated Decisions**
You may request human intervention in automated decisions affecting your investment access, and express your point of view.

**7.2 How to Exercise Your Rights**

**Email:** privacy@hyperionrealty.io
**Parent Company:** privacy@theutilitycompany.co

We will acknowledge your request within 5 business days and provide a substantive response within 30 days. Complex requests may require an additional 60 days with notice.

**7.3 Appeals Process**

If you are dissatisfied with our response:
1. Request reconsideration by our Chief Privacy Officer
2. Escalate to The Utility Company LLC Privacy Office
3. File a complaint with your local data protection authority
4. Seek judicial remedy in courts of competent jurisdiction
        `
    },
    {
        id: 'retention',
        title: '8. Data Retention Schedules',
        content: `
**8.1 Retention Principles**

Data is retained only for the minimum period necessary to fulfill the purposes for which it was collected or as required by applicable law. Given the regulated nature of securities and real estate, certain retention periods are materially longer than typical consumer applications.

**8.2 Retention Schedule by Category**

| Data Category | Retention Period | Justification |
|---------------|------------------|---------------|
| KYC/AML Records | 5 years from relationship end | BSA/AML regulations |
| Investment Records | 7 years from transaction | Tax and securities regulations |
| Property Transaction Records | 10 years from closing | Real estate regulatory requirements |
| Yield Distribution Records | 7 years from distribution | Tax reporting obligations |
| Investor Support Records | 3 years from resolution | Quality assurance, dispute resolution |
| Marketing Preferences | Until consent withdrawn | Ongoing consent validity |
| Access Logs | 90 days | Security monitoring |
| Analytics Data | 26 months (anonymized) | Platform improvement |
| Onchain Data | Perpetual (immutable) | Blockchain architecture |
| Smart Contract Audit Logs | Duration of protocol + 10 years | Regulatory and legal compliance |

**8.3 Deletion Procedures**

**Automated Deletion:** Systems purge data upon retention period expiration. Deletion jobs run nightly with full audit logging.

**Secure Destruction:** Physical media destroyed using NIST 800-88 compliant methods with certificates of destruction maintained.

**KYC Document Disposal:** Identity verification documents are securely deleted upon retention period expiry, with confirmation provided upon request.

**Third-Party Deletion:** All processors contractually obligated to delete data upon instruction and confirm compliance in writing.
        `
    },
    {
        id: 'cookies',
        title: '9. Cookies & Tracking Technologies',
        content: `
**9.1 Cookie Categories**

**Strictly Necessary Cookies**
Essential for platform functionality, including wallet session management, authentication state, and security tokens. These cannot be disabled without impairing core functionality.

**Functional Cookies**
Enable personalization features such as portfolio display preferences, currency settings, and notification preferences. You may disable these, which may reduce personalization.

**Analytics Cookies**
We use Vercel Analytics and Microsoft Clarity to collect aggregated data about platform usage. These tools help us understand traffic patterns and improve investor experience. We do not engage in cross-site individual tracking.

**9.2 Cookie Management**

**Browser Settings:** You may configure your browser to block or delete cookies. Blocking strictly necessary cookies may prevent wallet connection and authentication.

**Do Not Track:** We honor Do Not Track browser signals by disabling non-essential tracking when detected.

**9.3 Web3-Specific Tracking**

We do not track your wallet activity outside of direct interactions with Hyperion smart contracts. We do not correlate your wallet address with third-party DeFi activity, and we do not share wallet addresses with analytics providers.
        `
    },
    {
        id: 'children',
        title: '10. Children\'s Privacy',
        content: `
**10.1 Age Restrictions**

Our services are strictly limited to individuals who are at least 18 years of age, or the age of legal majority in their jurisdiction, whichever is higher. Due to the regulated nature of securities and real estate investment, we enforce strict age verification during KYC onboarding.

**10.2 Discovery of Minor Data**

Upon discovering that we have collected data from an individual under the applicable age threshold:
1. Immediately suspend processing and freeze any associated accounts
2. Attempt to notify the parent or guardian
3. Delete the data and reverse any associated transactions within 48 hours
4. Report to applicable regulatory authorities as required
        `
    },
    {
        id: 'regional',
        title: '11. Regional Privacy Frameworks',
        content: `
**11.1 European Economic Area (GDPR)**

For data subjects in the EEA, UK, and Switzerland:
- Our EU representative may be contacted at: eu-privacy@theutilitycompany.co
- Legal bases for processing are documented for each activity
- Cross-border transfers are governed by Standard Contractual Clauses
- You may lodge complaints with your national supervisory authority

**11.2 California (CCPA/CPRA)**

For California residents:
- You have the right to know what personal information we collect, disclose, and sell
- We do not sell personal information
- You may limit use of sensitive personal information
- We do not discriminate based on exercise of privacy rights

**11.3 Other U.S. States**

We comply with all applicable state privacy laws, including those in Virginia, Colorado, Connecticut, Utah, Texas, Oregon, Montana, and additional states as enacted.

**11.4 United Arab Emirates (PDPL)**

For investors and property stakeholders in the UAE:
- Processing complies with the UAE Personal Data Protection Law
- Data transfers outside the UAE are conducted with appropriate safeguards
- You may exercise rights through our standard request process

**11.5 Singapore (PDPA)**

For data subjects in Singapore:
- Processing complies with the Personal Data Protection Act 2012
- Consent is obtained for marketing and non-essential processing
- You may exercise access and correction rights through our standard process

**11.6 Other Jurisdictions**

Given our global property portfolio spanning 13 international markets, we monitor and comply with privacy regulations in all jurisdictions where we operate or hold property assets. Contact our Privacy Office for jurisdiction-specific information.
        `
    },
    {
        id: 'changes',
        title: '12. Protocol Updates',
        content: `
**12.1 Notification of Changes**

We may update these Privacy Protocols to reflect changes in our practices, technologies, legal requirements, or business operations. When we make material changes:

- We will post the updated Protocols on this page with a new "Last Updated" date
- We will notify investors via email at least 30 days before material changes take effect
- We will maintain an archive of previous versions accessible upon request

**12.2 What Constitutes Material Change**

Material changes include:
- New categories of personal data collected
- New purposes for processing, especially involving blockchain data
- New categories of third-party recipients
- Changes to your rights or how to exercise them
- Changes to KYC/AML processing procedures
- Changes to international transfer mechanisms
- Changes to data retention for investment records

**12.3 Continued Use**

Your continued use of our platform after the effective date of updated Protocols constitutes acceptance. If you do not agree with changes, you may request deletion of offchain data and discontinue use of the platform. Onchain token holdings and associated blockchain records are not affected by account closure.
        `
    },
    {
        id: 'contact',
        title: '13. Contact Information',
        content: `
**Data Protection Office**

For questions, concerns, or requests regarding these Privacy Protocols or your personal data:

**Hyperion Realty LLC**
Privacy Office
Email: privacy@hyperionrealty.io

**Parent Company**
The Utility Company LLC
Email: privacy@theutilitycompany.co

**Chief Privacy Officer**
Email: cpo@theutilitycompany.co

**Response Times**
- General inquiries: 5 business days
- Rights requests: 30 days (up to 90 days for complex requests)
- Complaints: 15 business days

**Escalation**
If you are not satisfied with our response:
1. Chief Privacy Officer
2. The Utility Company LLC General Counsel
3. Your local data protection authority
4. Courts of competent jurisdiction

---

*These Privacy Protocols represent our commitment to respecting your data sovereignty and protecting your information with the highest standards of care. In an ecosystem bridging physical real estate and digital assets, transparency is not optional—it is foundational.*

**Hyperion Realty LLC**
*A subsidiary of The Utility Company LLC*
*Democratizing Real Estate Through Liquid Architecture*
        `
    }
];

export default function PrivacyProtocolsPage() {
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
                            Data Sovereignty Framework
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
                            Privacy <span className="text-hr-gold">Protocols</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl">
                            A comprehensive framework governing the collection, processing, and protection of personal information across the Hyperion Realty tokenized real estate ecosystem.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4 text-sm font-mono text-gray-500">
                            <span>Effective: April 16, 2026</span>
                            <span>•</span>
                            <span>Version 1.0</span>
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

                                    if (trimmed.startsWith('**') && trimmed.endsWith('**') && !trimmed.includes('\n')) {
                                        return (
                                            <h3 key={i} className="text-xl font-semibold text-white mt-8 mb-4">
                                                {trimmed.slice(2, -2)}
                                            </h3>
                                        );
                                    }

                                    if (trimmed.startsWith('-') || trimmed.startsWith('❌') || trimmed.startsWith('✓')) {
                                        const items = trimmed.split('\n').filter(l => l.trim());
                                        return (
                                            <ul key={i} className="list-none space-y-2 my-4">
                                                {items.map((item, j) => (
                                                    <li key={j} className="flex items-start gap-2">
                                                        <span className="text-hr-gold mt-1">
                                                            {item.trim().startsWith('❌') ? '❌' : item.trim().startsWith('✓') ? '✓' : '•'}
                                                        </span>
                                                        <span className="text-gray-300">
                                                            {item.replace(/^[-❌✓]\s*/, '').split(/(\*\*[^*]+\*\*)/).map((part, k) => {
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

                                    if (trimmed.startsWith('|')) {
                                        const rows = trimmed.split('\n').filter(r => r.trim() && !r.includes('---'));
                                        return (
                                            <div key={i} className="overflow-x-auto my-6">
                                                <table className="w-full text-sm">
                                                    <thead>
                                                        <tr className="border-b border-white/10">
                                                            {rows[0].split('|').filter(c => c.trim()).map((cell, j) => (
                                                                <th key={j} className="text-left py-3 px-4 text-hr-gold font-semibold">
                                                                    {cell.trim()}
                                                                </th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {rows.slice(1).map((row, j) => (
                                                            <tr key={j} className="border-b border-white/5">
                                                                {row.split('|').filter(c => c.trim()).map((cell, k) => (
                                                                    <td key={k} className="py-3 px-4 text-gray-300">
                                                                        {cell.trim()}
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
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
