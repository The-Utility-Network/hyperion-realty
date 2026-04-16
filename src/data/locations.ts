export interface LocationData {
    slug: string;
    name: string;
    region: string;
    image: string;
    coords: { lat: number; lng: number }; // True geographic coordinates
    heroDesc: string;
    whyText: string;
    detailText: string;
    stats: {
        assetClass: string;
        projectedYield: string;
        marketSize: string;
    };
}

export const LOCATIONS: LocationData[] = [
    // AMERICAS
    {
        slug: 'miami',
        name: 'Miami',
        region: 'Americas',
        image: '/artifacts/locations/miami.png',
        coords: { lat: 25.7617, lng: -80.1918 },
        heroDesc: 'Hyperion Realty is actively targeting Miami\'s Brickell Financial District and waterfront luxury corridors — the fastest-growing commercial real estate market in the Western Hemisphere.',
        whyText: 'Miami has become the undeniable epicenter of institutional capital migration. With major financial firms relocating headquarters from New York to Brickell, the city\'s Class-A office vacancy rates have plunged below 5%. The luxury hospitality sector is experiencing unprecedented demand as the city transforms into a global hub for fintech, crypto, and international commerce.',
        detailText: 'Our acquisition pipeline targets mixed-use towers in the Brickell/Downtown corridor and luxury waterfront hospitality assets along Miami Beach. The city\'s favorable tax structure (no state income tax), robust population growth, and status as the gateway to Latin American capital make it an ideal genesis market for the Hyperion protocol.',
        stats: { assetClass: 'Mixed-Use & Hospitality', projectedYield: '5.2%', marketSize: '$85B' }
    },
    {
        slug: 'new-york',
        name: 'New York',
        region: 'Americas',
        image: '/artifacts/locations/newyork.png',
        coords: { lat: 40.7128, lng: -74.0060 },
        heroDesc: 'Hyperion Realty is evaluating Manhattan\'s institutional-grade commercial corridors — from Midtown\'s trophy towers to Hudson Yards\' next-generation mixed-use developments.',
        whyText: 'New York City remains the gravitational center of global capital markets. Manhattan\'s commercial real estate market exceeds $500 billion in total value, with trophy office assets commanding the highest per-square-foot rents on Earth. The city\'s unparalleled density of Fortune 500 headquarters creates tenant demand that is essentially recession-proof at the tier-1 level.',
        detailText: 'Our pipeline focuses on Class-A office towers along Park Avenue and the emerging Hudson Yards district, as well as luxury boutique hospitality assets in prime Manhattan neighborhoods. New York\'s deep institutional investor base and sophisticated legal infrastructure make it a natural anchor for the Hyperion portfolio.',
        stats: { assetClass: 'Trophy Office & Hospitality', projectedYield: '4.8%', marketSize: '$500B+' }
    },
    {
        slug: 'los-angeles',
        name: 'Los Angeles',
        region: 'Americas',
        image: '/artifacts/locations/losangeles.png',
        coords: { lat: 34.0522, lng: -118.2437 },
        heroDesc: 'Hyperion Realty is surveying Los Angeles\' premium commercial corridors across Century City, Downtown LA, and the Westside luxury hospitality market.',
        whyText: 'Los Angeles represents the entertainment and technology capital of the Western world, with a metropolitan GDP exceeding $1 trillion. The city\'s commercial real estate market benefits from massive demand driven by the entertainment industry, tech sector expansion, and international capital flows from the Pacific Rim.',
        detailText: 'Target acquisitions focus on Class-A office towers in Century City and DTLA, luxury hospitality assets in Beverly Hills and Santa Monica, and mixed-use developments along the emerging Wilshire Grand corridor. LA\'s position as the primary U.S. gateway to Asian capital markets provides a unique demand driver absent from East Coast markets.',
        stats: { assetClass: 'Commercial & Luxury Hospitality', projectedYield: '4.9%', marketSize: '$310B' }
    },
    {
        slug: 'toronto',
        name: 'Toronto',
        region: 'Americas',
        image: '/artifacts/locations/toronto.png',
        coords: { lat: 43.6510, lng: -79.3470 },
        heroDesc: 'Hyperion Realty is mapping Toronto\'s Financial District and emerging tech corridors — Canada\'s undisputed commercial capital.',
        whyText: 'Toronto is the fourth-largest city in North America and Canada\'s financial nerve center, hosting the headquarters of all five major Canadian banks and the Toronto Stock Exchange. The city\'s commercial real estate market benefits from strong immigration-driven population growth, a booming technology sector, and robust institutional demand.',
        detailText: 'Our pipeline targets Class-A office towers in the Financial District and emerging mixed-use developments in the King West and Liberty Village corridors. Toronto\'s stable regulatory environment, AAA sovereign credit rating, and deep pool of institutional capital make it an attractive low-risk anchor position for diversified portfolios.',
        stats: { assetClass: 'Financial District Office', projectedYield: '5.0%', marketSize: '$120B' }
    },

    // EUROPE
    {
        slug: 'london',
        name: 'London',
        region: 'Europe',
        image: '/artifacts/locations/london.png',
        coords: { lat: 51.5074, lng: -0.1278 },
        heroDesc: 'Hyperion Realty is targeting London\'s premier financial districts — Canary Wharf and the City of London — where centuries of institutional tradition meet cutting-edge commercial development.',
        whyText: 'London is Europe\'s dominant financial capital and one of only three "Alpha++" global cities. The Square Mile and Canary Wharf collectively house the headquarters of over 250 foreign banks and virtually every major global investment institution. Despite Brexit adjustments, London\'s commercial vacancy rates remain among the lowest in Europe.',
        detailText: 'Target acquisitions focus on Grade-A office towers in Canary Wharf, mixed-use developments in the City fringe (Shoreditch, King\'s Cross), and luxury hospitality assets in Mayfair. The UK\'s FCA regulatory framework provides clear pathways for security token offerings, and London\'s time-zone positioning provides 18-hour trading coverage.',
        stats: { assetClass: 'Grade-A Office & Hospitality', projectedYield: '5.5%', marketSize: '$280B' }
    },
    {
        slug: 'paris',
        name: 'Paris',
        region: 'Europe',
        image: '/artifacts/locations/paris.png',
        coords: { lat: 48.8566, lng: 2.3522 },
        heroDesc: 'Hyperion Realty is evaluating Paris\' La Défense financial district and luxury arrondissement hospitality — France\'s crown jewel of commercial real estate.',
        whyText: 'Paris has emerged as the post-Brexit beneficiary of European financial sector migration, with major banks establishing or expanding their EU headquarters in La Défense. The city\'s luxury hospitality sector commands the highest average daily rates in Europe, driven by Paris\' unrivaled status as the world\'s most visited city with over 40 million international arrivals annually.',
        detailText: 'Our pipeline targets Class-A commercial towers in La Défense, premium hospitality assets in the 1st, 6th, and 8th arrondissements, and mixed-use developments along the emerging Saint-Denis Olympic corridor. France\'s AMF regulatory framework is actively developing digital asset-specific licensing, positioning Paris as a key EU market for tokenized securities.',
        stats: { assetClass: 'Financial & Luxury Hospitality', projectedYield: '4.6%', marketSize: '$190B' }
    },
    {
        slug: 'zurich',
        name: 'Zürich',
        region: 'Europe',
        image: '/artifacts/locations/zurich.png',
        coords: { lat: 47.3769, lng: 8.5417 },
        heroDesc: 'Hyperion Realty is surveying Zürich\'s Bahnhofstrasse financial corridor and premium lakefront commercial assets — the epicenter of European private banking.',
        whyText: 'Zürich is the undisputed capital of European private wealth management, hosting UBS, Credit Suisse, and over 200 independent private banks. The city\'s commercial real estate market is characterized by extraordinary stability, ultra-low vacancy rates (below 3%), and premium rental yields driven by the concentration of high-net-worth financial services tenants.',
        detailText: 'Target assets span the Bahnhofstrasse corridor, Zürich West\'s emerging tech hub, and select lakefront commercial properties. Switzerland\'s FINMA regulatory framework is among the most progressive in Europe for digital asset classification, and the "Crypto Valley" ecosystem in nearby Zug provides deep technical infrastructure for tokenized real estate deployment.',
        stats: { assetClass: 'Premium Office & Private Banking', projectedYield: '3.8%', marketSize: '$65B' }
    },

    // MIDDLE EAST
    {
        slug: 'dubai',
        name: 'Dubai',
        region: 'Middle East',
        image: '/artifacts/locations/dubai.png',
        coords: { lat: 25.2048, lng: 55.2708 },
        heroDesc: 'Hyperion Realty is mapping ultra-premium commercial towers and luxury hospitality assets across Dubai Marina, DIFC, and the Palm Jumeirah — the world\'s most aggressive commercial development zone.',
        whyText: 'Dubai operates as a sovereign wealth magnet. The emirate\'s zero-income-tax policy, world-class infrastructure, and strategic positioning between European and Asian markets have attracted over $30 billion in annual foreign direct investment. The DIFC financial district alone hosts over 3,000 registered firms.',
        detailText: 'Target assets span the Dubai International Financial Centre (DIFC), Dubai Marina\'s ultra-premium towers, and select hospitality properties on the Palm Jumeirah. Dubai\'s progressive regulatory stance toward digital assets — with explicit VARA licensing frameworks — makes it an ideal jurisdiction for the Hyperion dual-token deployment.',
        stats: { assetClass: 'Ultra-Premium Commercial', projectedYield: '6.1%', marketSize: '$150B' }
    },
    {
        slug: 'abu-dhabi',
        name: 'Abu Dhabi',
        region: 'Middle East',
        image: '/artifacts/locations/abudhabi.png',
        coords: { lat: 24.4539, lng: 54.3773 },
        heroDesc: 'Hyperion Realty is evaluating Abu Dhabi\'s ADGM financial district and Saadiyat Island luxury corridor — the UAE\'s sovereign wealth capital.',
        whyText: 'Abu Dhabi controls over $1.5 trillion in sovereign wealth through ADIA, Mubadala, and ADQ — making it one of the richest cities per capita on Earth. The Abu Dhabi Global Market (ADGM) has established itself as a leading international financial center with English common law jurisdiction and progressive digital asset regulations.',
        detailText: 'Our pipeline focuses on Grade-A commercial towers in the ADGM district, luxury hospitality on Saadiyat Island, and mixed-use developments along the Abu Dhabi waterfront. The ADGM\'s dedicated digital asset regulatory framework and the emirate\'s massive sovereign capital pool create an unparalleled environment for tokenized real estate structures.',
        stats: { assetClass: 'Sovereign-Grade Commercial', projectedYield: '5.8%', marketSize: '$95B' }
    },

    // ASIA-PACIFIC
    {
        slug: 'singapore',
        name: 'Singapore',
        region: 'Asia-Pacific',
        image: '/artifacts/locations/singapore.png',
        coords: { lat: 1.3521, lng: 103.8198 },
        heroDesc: 'Hyperion Realty is mapping Singapore\'s Marina Bay financial corridor and premium commercial districts — Asia\'s most stable and regulated real estate market.',
        whyText: 'Singapore functions as Asia\'s Switzerland — a politically neutral, hyper-regulated financial hub that attracts the continent\'s largest pools of sovereign and private wealth. The city-state\'s commercial real estate market is characterized by extraordinary stability, with institutional-grade office assets delivering consistent 4-6% net yields over multi-decade horizons.',
        detailText: 'Our pipeline targets Grade-A commercial towers in the Marina Bay and Raffles Place financial districts, alongside premium hospitality assets in Sentosa and Orchard Road. Singapore\'s Monetary Authority (MAS) has established one of the world\'s most sophisticated digital asset regulatory frameworks, making it an ideal launchpad for Hyperion\'s Asia-Pacific expansion.',
        stats: { assetClass: 'Financial District & Hospitality', projectedYield: '5.8%', marketSize: '$110B' }
    },
    {
        slug: 'tokyo',
        name: 'Tokyo',
        region: 'Asia-Pacific',
        image: '/artifacts/locations/tokyo.png',
        coords: { lat: 35.6762, lng: 139.6503 },
        heroDesc: 'Hyperion Realty is surveying Tokyo\'s Marunouchi and Roppongi commercial districts — the world\'s third-largest economy\'s undisputed financial capital.',
        whyText: 'Tokyo is the financial capital of the world\'s third-largest economy, with a metropolitan GDP exceeding $1.9 trillion. The city\'s commercial real estate market is the largest in Asia by total value, characterized by institutionally secure tenant covenants, ultra-low default rates, and consistent demand from Japan\'s concentration of global corporate headquarters.',
        detailText: 'Target acquisitions focus on Grade-A commercial towers in Marunouchi (adjacent to Tokyo Station and the Imperial Palace) and mixed-use developments in Roppongi and Shibuya. Japan\'s Financial Services Agency (FSA) has established clear regulatory pathways for security tokens under the Financial Instruments and Exchange Act.',
        stats: { assetClass: 'Institutional Office', projectedYield: '4.2%', marketSize: '$350B' }
    },
    {
        slug: 'hong-kong',
        name: 'Hong Kong',
        region: 'Asia-Pacific',
        image: '/artifacts/locations/hongkong.png',
        coords: { lat: 22.3193, lng: 114.1694 },
        heroDesc: 'Hyperion Realty is evaluating Hong Kong\'s Central and Victoria Harbour corridors — the densest concentration of financial capital in Asia.',
        whyText: 'Hong Kong remains Asia\'s premier international financial center, with the world\'s highest concentration of ultra-high-net-worth individuals per capita. The city\'s commercial real estate commands the highest office rents on Earth, driven by insatiable demand from global banking, asset management, and legal services firms.',
        detailText: 'Our pipeline targets trophy office towers in Central and Admiralty, luxury hospitality on the Kowloon waterfront, and premium mixed-use in the emerging West Kowloon Cultural District. Hong Kong\'s SFC has introduced a comprehensive virtual asset licensing regime that provides regulatory clarity for tokenized securities.',
        stats: { assetClass: 'Trophy Office & Luxury', projectedYield: '3.9%', marketSize: '$200B' }
    },
    {
        slug: 'sydney',
        name: 'Sydney',
        region: 'Asia-Pacific',
        image: '/artifacts/locations/sydney.png',
        coords: { lat: -33.8688, lng: 151.2093 },
        heroDesc: 'Hyperion Realty is mapping Sydney\'s Barangaroo and CBD commercial corridors — Australia\'s financial capital and the gateway to Oceanic markets.',
        whyText: 'Sydney is the financial capital of the world\'s 13th-largest economy, hosting the Australian Securities Exchange and the regional headquarters of virtually every major global bank. The city\'s commercial real estate market benefits from structural undersupply in the CBD, strong population growth driven by skilled immigration, and robust institutional demand from Australia\'s $3.5 trillion superannuation industry.',
        detailText: 'Target acquisitions focus on Grade-A towers in the Barangaroo precinct, premium CBD office assets, and luxury hospitality in the Harbour and Eastern Suburbs. Australia\'s ASIC regulatory framework provides clear pathways for digital asset products.',
        stats: { assetClass: 'CBD Office & Waterfront', projectedYield: '5.3%', marketSize: '$95B' }
    },
];

export const REGIONS = [...new Set(LOCATIONS.map(l => l.region))];
