export interface ChapterSection {
    heading: string;
    content: string;
}

export interface ChapterData {
    id: string;
    number: string;
    title: string;
    subtitle: string;
    pullQuote: string;
    color: string;
    heroImage?: string;
    sections: ChapterSection[];
}

export const whitepaper_chapters: ChapterData[] = [
    {
        id: 'the-liquidity-paradox',
        number: '01',
        title: 'The Liquidity Paradox',
        subtitle: 'Deconstructing the fundamental friction of legacy real estate.',
        pullQuote: 'Concrete is the most stable financial asset on earth, yet it remains fundamentally paralyzed by its own mass.',
        color: '#D4AF37',
        sections: [
            {
                heading: 'The Trillion-Dollar Trap',
                content: `Historically, high-yield commercial and elite hospitality real estate is strangled by what we term the "Liquidity Paradox." It represents the most stable wealth-generation asset class on Earth — the bedrock upon which civilizations accumulate and transfer generational power — yet demands prohibitive capital barriers that often exceed $10,000,000+ minimum commitments for entry into any tier-1 institutional asset.

This explicitly locks 99% of global capital out of the most consistently appreciating asset class in human history, forcing retail participants into high-volatility equities or low-yield municipal bonds. Even at the institutional tier, capital allocated to commercial towers is fundamentally "dead weight" for a 5-10 year lockup horizon. The investor receives no immediate liquidity, no secondary market recourse, and remains entirely dependent on the operating competence of a centralized property management board.

The scale of trapped capital is staggering. By conservative estimates, global commercial real estate represents a $35 trillion market. Yet less than 2% of that value is accessible to non-institutional participants. The remaining 98% sits behind walls of minimum investment thresholds, accredited investor regulations, jurisdictional gatekeeping, and settlement latencies measured in weeks or months.`
            },
            {
                heading: 'The Failure of Legacy Syndicates',
                content: `Legacy attempts to democratize this class — Real Estate Investment Trusts (REITs), Fractional Ownership Platforms, and Private Syndicates — fail due to their reliance on Web2 centralized ledgers and frictional manual dividend distributions.

These legacy structures are fundamentally opaque. An investor provides capital to a black-box board of directors who control the deployment, the auditing, and the distribution timeline. Liquidity remains non-existent in private placements, and even publicly traded REITs suffer from T+2 settlement latency, broker dependencies, restricted trading hours, and strict jurisdictional barriers that prevent global participation.

Furthermore, REITs operate under regulatory mandates that force specific portfolio compositions and distribution schedules — constraints that limit the fund manager's ability to optimize returns dynamically. The investor becomes a passive passenger in a vehicle they cannot exit, cannot audit in real-time, and cannot influence.`
            },
            {
                heading: 'The Cost of Opacity',
                content: `Traditional real estate syndication introduces at least four intermediary layers between the physical asset and the end investor: property managers, fund administrators, transfer agents, and custodial banks. Each layer extracts fees — typically 1-3% annually — compounding into a cumulative drag that can consume 8-15% of gross returns before the investor sees a single dollar of distribution.

This intermediary bloat is not merely expensive; it is architecturally fragile. Each handoff between intermediaries introduces reconciliation risk, reporting delays, and audit exposure. The 2008 financial crisis demonstrated in devastating terms what happens when these opaque intermediary chains fail to accurately represent underlying asset values.

The Hyperion Protocol was conceived as a direct response to this architectural failure. By eliminating intermediary layers and replacing them with deterministic smart contract logic, we collapse the cost structure while simultaneously elevating transparency to a cryptographically verifiable standard.`
            }
        ]
    },
    {
        id: 'dual-token-architecture',
        number: '02',
        title: 'The Dual-Token Architecture',
        subtitle: 'Anchoring physical truth. Empowering frictionless liquidity.',
        pullQuote: 'To solve the paradox, we must surgically sever the legal property deed from the financial trading mechanism.',
        color: '#CBB26A',
        heroImage: '/artifacts/whitepaper/dual_token.png',
        sections: [
            {
                heading: 'Architectural Philosophy',
                content: `A fundamental flaw haunts most property tokenization efforts: the insistence on using a single token standard to represent wildly different real-world concerns. Some platforms issue a single NFT for the entire property — rendering it unique but completely illiquid. Others issue raw ERC20 tokens tied loosely to a legal entity — creating liquidity but destroying the onchain provenance of the underlying asset.

The Hyperion Protocol rejects both approaches. Instead, we deploy a strict separation of concerns across two complementary token standards, each optimized for a distinct role in the property lifecycle. This bifurcation is not an arbitrary design choice — it is an architectural necessity arising from the fundamentally different natures of legal ownership and financial liquidity.`
            },
            {
                heading: 'The Immutable Anchor (ERC721)',
                content: `The core architectural foundation is the physical property. Once hyper-vetted through our rigorous due diligence pipeline (covering structural engineering reports, title chain verification, environmental assessments, and zoning compliance audits), the property is legally wrapped into a dedicated single-asset LLC or DAO trust.

The master shares of this trust — representing absolute legal dominion over the physical structure and the land beneath it — are mathematically anchored to a single, immutable ERC721 Non-Fungible Token. This token is minted with comprehensive metadata embedding the property address, legal entity identifier, deed reference number, and a cryptographic hash of the full legal documentation package.

The ERC721 sits in an institutional-grade cold-storage multisig vault requiring 3-of-5 authorized signatories to transfer. It is never traded on secondary markets. It is never fractionalized directly. It exists purely as the immutable onchain source of truth — the digital equivalent of a deed recorded at the county clerk's office, except that it cannot be forged, backdated, or lost in a filing cabinet.`
            },
            {
                heading: 'Fractional Supply Injection (ERC20)',
                content: `Once the ERC721 anchor is securely vaulted, a companion ERC20 smart contract is deployed. This contract accepts the ERC721 as its sole backing collateral and mints a precisely defined supply curve of fungible tokens. The total supply is calibrated against the property's appraised fair market value, typically at a ratio of 1 token = $1.00 of underlying equity.

Because these fractional tokens adhere to the ERC20 standard — the single most widely supported token interface in the entire blockchain ecosystem — they instantly inherit access to every decentralized exchange (DEX), automated market maker (AMM), lending protocol, and portfolio aggregator ever built on the Ethereum Virtual Machine. Settlement drops from traditional T+3 days to T+12 seconds.

The ERC20 contract includes embedded transfer hooks that enforce compliance checks (KYC/AML verification via onchain attestation registries) without requiring centralized intermediaries. This allows Hyperion properties to operate within regulatory frameworks while preserving the permissionless settlement speed of the underlying blockchain.`
            },
            {
                heading: 'Supply Curve & Tokenization Markup',
                content: `The total ERC20 token supply for each property is immutably fixed at mint time and calibrated to provide maximum capital efficiency. To enable healthy operations and robust market-making, Hyperion deploys a structured **20% property tokenization markup** model. When a property is acquired at its fair market/appraised value (e.g., $10,000,000), the protocol issues a total supply scaled to 120% of the underlying asset value (exactly 12,000,000 tokens initial supply, valued at $1.00 per token).

This 20% tokenization markup is mathematically partitioned to serve three distinct strategic functions:
1. **5% Corporate Profit**: Distributed directly to Hyperion's Treasury as corporate earnings to reward sourcing, institutional administration, and platform overhead.
2. **10% Algorithmic AMM Liquidity Seed**: Placed into a dedicated liquidity pool using an algorithmic Automated Market Maker (AMM) to provide instant, safe, and reliable secondary market liquidity to token holders.
3. **5% Protocol Reserve**: Set aside in a restricted multi-signature treasury to cover regulatory compliance, initial due diligence, localized legal structuring, and protocol development launch reserves.

This structure guarantees that every property tokenized on Hyperion launches with deep, immediate liquidity from day one. Unlike traditional syndicates where investors are locked into an illiquid placement for 5-10 years, Hyperion token holders can trustfully buy or sell their shares at any time through our algorithmic AMM infrastructure, enjoying the price stability of physical real estate combined with the rapid liquidity of decentralized finance.`
            }
        ]
    },
    {
        id: 'yield-distribution-engine',
        number: '03',
        title: 'The Yield Matrix',
        subtitle: 'Automating the flow of global capital.',
        pullQuote: 'Yield delayed by a centralized accountant represents capital that is actively decaying.',
        color: '#B5943B',
        heroImage: '/artifacts/whitepaper/yield_engine.png',
        sections: [
            {
                heading: 'Primary Physical Dividends & Yield Modeling',
                content: `In a traditional property fund, rental income follows a tortuous path from tenant to investor. The tenant pays rent to the property manager. The property manager deducts management fees and remits the balance to the fund administrator. The fund administrator reconciles accounts, deducts additional administrative fees, and forwards net proceeds to the transfer agent. The transfer agent finally distributes dividends to investors — often 60-90 days after the rent was originally collected.

Hyperion Realty collapses this entire chain into a single deterministic transaction. Our target portfolio properties are estimated to earn up to **6% to 7% in Net Operating Income (NOI)** annually. To cover corporate asset management and administrative compliance overhead, Hyperion extracts a **1.0% annual asset management fee** calculated against the total property valuation. After deducting this fee, a robust net yield of roughly **5% to 6%** is distributed directly to token holders.

The integrated fiat-to-stablecoin bridge converts monthly tenant rental payments into USDC stablecoin. The Yield Matrix smart contract automatically deducts the pro-rata portion of the 1.0% annual asset management fee and executes a block-snapshot of all active wallets holding the property's ERC20 tokens at that precise moment, distributing the net USDC pro-rata to every holder. No manual reconciliation, no custodial delays. The entire process — from tenant payment to investor distribution — completes within 12 seconds.`
            },
            {
                heading: 'Secondary Market Trading & Protocol Sustainment',
                content: `Beyond primary rental yields, the Hyperion secondary ecosystem is structured to ensure continuous liquidity and operational excellence. Every secondary market trade of the ERC20 equity tokens incurs a protocol-level transaction fee of **1.5% on trading volume**.

This fee is routed to Hyperion to cover continuous platform maintenance, liquidity balancing operations, secure oracle node feeds, and operational sustainment. Embedded directly in the ERC20 contract compliance transfer hooks, the 1.5% trading volume fee executes trustlessly on all decentralized exchange transactions, ensuring the protocol remains highly resilient and well-funded without relying on centralized venture capital capital calls.

This model aligns Hyperion's incentives directly with token holders: by maximizing secondary market liquidity and institutional-grade property uptime, the platform generates sustainable fee revenue while token holders enjoy instant market-making and stable yield distribution.`
            },
            {
                heading: 'Snapshot Mechanics & Distribution Frequency',
                content: `Yield distributions operate on a configurable cadence established by DAO governance vote. The default configuration executes monthly snapshots aligned with standard commercial lease payment cycles, but the protocol supports weekly, biweekly, or even on-demand distribution triggers.

Each snapshot captures the complete state of the ERC20 holder registry at a specific block height. Tokens held in DEX liquidity pools are attributed to the liquidity provider's wallet via integration with the LP position manager contracts. Tokens in transit during the snapshot block are attributed to the sender's wallet (pre-transfer state).

Distribution claims are pushed automatically to wallets holding above the minimum threshold (default: 100 tokens). Wallets below the threshold accumulate unclaimed distributions in a claimable escrow contract, accessible at any time via the Hyperion dashboard. Unclaimed distributions do not expire and continue accumulating indefinitely.`
            }
        ]
    },
    {
        id: 'legal-framework',
        number: '04',
        title: 'Legal Architecture',
        subtitle: 'Bridging onchain logic with jurisdictional reality.',
        pullQuote: 'A token without legal enforceability is a receipt without a store. Our architecture makes the blockchain the courthouse.',
        color: '#9D8531',
        sections: [
            {
                heading: 'The Single-Asset LLC Model',
                content: `Every property acquired by the Hyperion Trust is isolated into its own dedicated single-asset Limited Liability Company (LLC). This is not merely a corporate convenience — it is a critical legal firewall that prevents cross-contamination between properties in the portfolio.

If a catastrophic liability event occurs at Property A (environmental contamination, structural failure, litigation), the legal exposure is strictly contained within Property A's LLC. Property B, C, and all subsequent assets remain completely insulated. This isolation model mirrors the structure used by the largest institutional property funds (Blackstone, Brookfield, Starwood) but extends it with onchain transparency.

The LLC's operating agreement explicitly designates the ERC721 token holder (the Hyperion DAO multisig vault) as the sole member with governing authority. This creates a legally binding chain of custody from the physical deed recorded at the county recorder's office to the NFT sitting in the blockchain vault — a chain that is auditable, immutable, and enforceable in any court of competent jurisdiction.`
            },
            {
                heading: 'Securities Compliance & Reg D/S Frameworks',
                content: `Fractional real estate tokens are securities under the Howey Test framework established by the U.S. Securities and Exchange Commission. Hyperion does not attempt to circumvent this classification — we embrace it.

Each ERC20 token offering is structured under Regulation D (Rule 506(c)) for domestic U.S. investors and Regulation S for international participants. This dual-framework approach allows verified accredited investors globally to participate while maintaining full compliance with securities laws.

The ERC20 transfer hook mechanism enforces compliance at the protocol level. Before any token transfer settles onchain, the contract queries an onchain attestation registry to verify that both the sender and receiver hold valid KYC/AML credentials issued by an authorized verification provider. Transfers between non-verified wallets are automatically reverted — not by a centralized administrator, but by the immutable logic of the smart contract itself.`
            },
            {
                heading: 'Jurisdictional Strategy',
                content: `Property acquisition targets are evaluated not only for financial performance but for jurisdictional friendliness toward digital asset structures. The Hyperion Trust maintains primary legal domicile in Wyoming — the most progressive U.S. state for DAO and digital asset legislation, with explicit statutory recognition of blockchain-based corporate governance.

International properties are structured through jurisdictionally appropriate vehicles: Cayman SPVs for Caribbean and Asian holdings, Luxembourg SCSps for European assets, and DIFC entities for Middle Eastern properties. Each structure is designed to optimize tax efficiency while maintaining full regulatory compliance in both the property's physical jurisdiction and the investor's domicile jurisdiction.

The legal team maintains active engagement with regulatory bodies across all target jurisdictions, participating in sandbox programs and comment periods to ensure the Hyperion framework evolves in alignment with emerging digital asset regulations.`
            }
        ]
    },
    {
        id: 'governance-dao',
        number: '05',
        title: 'The Hyperion DAO',
        subtitle: 'Decentralized property governance at institutional scale.',
        pullQuote: 'The tenants live in the building, the holders own the building, and the code governs the building. No middlemen remain.',
        color: '#87792B',
        heroImage: '/artifacts/whitepaper/governance.png',
        sections: [
            {
                heading: 'Governance Token Mechanics',
                content: `The Hyperion DAO operates through a dual-governance model. Property-level decisions (capital improvements, lease terms, property management vendor selection) are governed exclusively by the ERC20 holders of that specific property. Portfolio-level decisions (new acquisitions, protocol parameter changes, treasury allocations) are governed by the Hyperion governance token (HPR).

HPR tokens are distributed to early participants, liquidity providers, and protocol contributors via a transparent allocation schedule. Voting power is proportional to token holdings but subject to a quadratic dampening function that prevents whale dominance — a holder with 10,000 HPR tokens does not receive 100x the voting power of a holder with 100 tokens, but rather approximately 10x (square root scaling).

This quadratic governance model ensures that the protocol evolves according to the collective will of its community rather than the concentrated interests of a small number of large holders. All governance proposals require a minimum quorum of 15% of circulating supply and a 66% supermajority for approval.`
            },
            {
                heading: 'Proposal Lifecycle',
                content: `Governance proposals follow a structured four-phase lifecycle designed to prevent hasty or malicious actions:

1. Discussion Phase (7 days): The proposer publishes a detailed specification on the governance forum. Community members discuss, critique, and suggest modifications. No onchain action occurs during this phase.

2. Formal Proposal (3 days): The proposer submits the finalized proposal onchain with a 500 HPR deposit (refunded upon successful passage, forfeited upon failure to reach quorum). Token holders vote during this window.

3. Timelock (48 hours): Approved proposals enter a mandatory 48-hour timelock before execution. This delay allows dissenting holders to exit their positions or raise emergency objections if the proposal contains hidden malicious logic.

4. Execution: After the timelock expires, the proposal is executed automatically by the governance contract. No human intervention is required or possible — the code enforces the community's decision deterministically.

Emergency proposals (security patches, critical bug fixes) follow an accelerated 24-hour lifecycle with a 5,000 HPR deposit and 80% supermajority requirement. The emergency pathway has never been invoked to date.`
            },
            {
                heading: 'Treasury Management',
                content: `The Hyperion DAO treasury is the single largest holder of protocol capital, funded by the 20% allocation from each property token minting event plus ongoing revenue from protocol fees. Treasury funds are denominated in a diversified basket of stablecoins (USDC, DAI, FRAX) to minimize volatility exposure.

Treasury deployment requires governance approval and follows strict investment guidelines encoded in the DAO charter: maximum 40% allocation to any single asset class, mandatory 20% liquidity reserve, and absolute prohibition on speculative leveraged positions. These guardrails are enforced at the smart contract level — the treasury multisig physically cannot execute transactions that violate the charter parameters.

Quarterly treasury reports are generated automatically by onchain analytics and published to the governance forum. Every inflow, outflow, and balance change is cryptographically verifiable against the underlying blockchain state.`
            }
        ]
    },
    {
        id: 'risk-framework',
        number: '06',
        title: 'Risk Architecture',
        subtitle: 'Engineering resilience at every layer of the stack.',
        pullQuote: 'Risk unacknowledged is risk compounded. We architect for the earthquake, not the gentle breeze.',
        color: '#706525',
        sections: [
            {
                heading: 'Smart Contract Security',
                content: `All Hyperion smart contracts undergo a minimum of three independent security audits before mainnet deployment, conducted by tier-1 firms (Trail of Bits, OpenZeppelin, Consensys Diligence or equivalent). Audit reports are published publicly and linked in the contract metadata.

Beyond audits, the protocol maintains a continuous bug bounty program with a maximum payout of $500,000 for critical vulnerabilities. The bounty program is administered through Immunefi and has been active since the protocol's testnet phase.

Contract upgradeability follows a strict proxy pattern with governance-controlled upgrade keys. No single individual — including the founding team — possesses the ability to unilaterally modify deployed contract logic. All upgrades require full governance approval through the standard proposal lifecycle.`
            },
            {
                heading: 'Physical Asset Risk',
                content: `Real estate, while historically stable, is not risk-free. Hyperion's risk framework addresses the primary categories of physical asset risk:

1. Market Risk: Property values fluctuate with economic cycles. The protocol mitigates market risk through geographic diversification (no more than 30% portfolio concentration in any single metro area) and asset class diversification (commercial, hospitality, mixed-use).

2. Structural Risk: Physical deterioration and catastrophic events. Each property maintains comprehensive insurance coverage (property, liability, business interruption) with policy details recorded onchain. The Perpetual Recycling Tax funds a continuous capital improvement program that maintains structural integrity above institutional standards.

3. Occupancy Risk: Vacancy rates affect rental yields. Target properties are selected with minimum 85% historical occupancy rates and diversified tenant rosters (no single tenant representing more than 25% of gross rental income).

4. Regulatory Risk: Changes in local zoning, taxation, or securities law. The legal team maintains active monitoring of regulatory developments across all active jurisdictions and provides quarterly regulatory risk assessments to the DAO.`
            },
            {
                heading: 'Counterparty & Oracle Risk',
                content: `The fiat-to-crypto bridge for rental income conversion represents a centralized dependency in an otherwise decentralized system. Hyperion mitigates this risk through provider diversification — maintaining active integrations with at least three independent fiat off-ramp providers, with automatic failover if any single provider experiences downtime or regulatory restriction.

Property valuation oracles present another attack surface. The protocol uses a time-weighted median of three independent professional appraisals, updated semi-annually. Oracle manipulation is mitigated by the 48-hour governance timelock — any suspicious valuation update can be flagged and reverted by the community before it affects token fundamentals.

All oracle feeds are monitored by an automated anomaly detection system that flags deviations exceeding two standard deviations from historical trends. Flagged updates are automatically paused until manual review by the DAO risk committee.`
            }
        ]
    },
    {
        id: 'roadmap-vision',
        number: '07',
        title: 'The Hyperion Horizon',
        subtitle: 'A phased approach to global institutional disruption.',
        pullQuote: 'We are not building a platform. We are engineering the financial geology of the next century.',
        color: '#5A5220',
        sections: [
            {
                heading: 'Phase 1: Genesis Acquisitions (Current)',
                content: `The protocol is currently executing its inaugural acquisition phase, targeting 3-5 tier-1 commercial and luxury hospitality assets across the United States and the United Arab Emirates. Target properties must meet stringent criteria: minimum $5M appraised value, 85%+ historical occupancy, positive trailing-twelve-month net operating income, and clear title with no encumbrances or pending litigation.

The acquisition team has identified a pipeline of 12 candidate properties across Miami, New York, Dubai, and Singapore. Each candidate undergoes a 90-day deep due diligence process covering structural engineering, environmental assessment, title chain verification, tenant creditworthiness analysis, and pro-forma financial modeling under stress test scenarios.

Capital for genesis acquisitions is sourced from the Hyperion Trust's seed allocation, structured as a Regulation D private placement. The genesis portfolio will serve as the foundational proof-of-concept demonstrating the full lifecycle of the dual-token architecture from physical acquisition through ERC721 minting, ERC20 fractionalization, and automated yield distribution.`
            },
            {
                heading: 'Phase 2: Protocol Launch & Fractionalization',
                content: `Upon completion of the first acquisition, the protocol transitions to its technical deployment phase. The ERC721 deed anchor is minted on Ethereum mainnet with full legal documentation embedded in the token metadata. The companion ERC20 contract is deployed and the initial liquidity pool is seeded on Uniswap V3 with concentrated liquidity positions optimized for the property's expected trading range.

The Hyperion dashboard launches simultaneously, providing token holders with real-time visibility into property performance metrics: current occupancy rates, monthly rental income, capital improvement status, insurance coverage details, and governance proposal activity.

This phase also marks the activation of the Yield Matrix smart contract and the first automated rental distribution to ERC20 holders — the defining moment where the protocol demonstrates that physical rental income can flow trustlessly from a commercial tenant's bank account to a global investor's crypto wallet in under 60 seconds.`
            },
            {
                heading: 'Phase 3: Scaling & Cross-Chain Expansion',
                content: `With the genesis portfolio demonstrating proven economics, the protocol enters aggressive scaling mode. The acquisition pipeline expands to European markets (London, Paris, Berlin) and Asian gateway cities (Singapore, Tokyo, Hong Kong). Each new property follows the established dual-token minting process with progressively streamlined legal and technical execution.

Cross-chain deployment bridges Hyperion property tokens to Layer 2 networks (Arbitrum, Base, Optimism) and alternative Layer 1 chains (Solana, Avalanche), dramatically expanding the accessible investor base and reducing gas costs for retail participants.

The protocol also introduces institutional API access, allowing traditional funds, family offices, and wealth management platforms to integrate Hyperion property tokens into conventional portfolio management systems via standard financial data feeds (Bloomberg, Refinitiv terminal compatibility).`
            },
            {
                heading: 'Phase 4: The Hyperion DAO & Full Decentralization',
                content: `The terminal phase transitions complete protocol governance to the Hyperion DAO. The founding team relinquishes all privileged access keys. The multisig transitions from team-controlled to community-elected signatories. All protocol parameters — fee structures, acquisition criteria, treasury allocation guidelines — become exclusively governed by HPR token holders.

At this stage, the Hyperion Protocol functions as a fully autonomous, decentralized property management conglomerate. Properties are acquired, maintained, and governed without any centralized operator. Rental income flows automatically. Capital improvements are funded automatically. Governance decisions are executed automatically.

The founding team's role transitions from operator to contributor — one voice among many in the governance forum, with influence proportional to their HPR holdings and nothing more. This deliberate power transfer is the protocol's ultimate design goal: to build infrastructure so robust that it no longer requires its creators to function.`
            }
        ]
    }
];
