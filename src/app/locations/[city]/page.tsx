import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { LOCATIONS } from '@/data/locations';

interface Props {
    params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
    return LOCATIONS.map((loc) => ({
        city: loc.slug,
    }));
}

export async function generateMetadata({ params }: Props) {
    const { city } = await params;
    const data = LOCATIONS.find(l => l.slug === city);

    if (!data) {
        return { title: 'Location Not Found | Hyperion Realty' };
    }

    return {
        title: `Tokenized Real Estate in ${data.name} | Hyperion Realty`,
        description: `Explore institutional-grade, tokenized commercial and luxury real estate acquisition targets in ${data.name}. Fractional ownership via the Hyperion dual-token protocol.`,
        alternates: {
            canonical: `/locations/${city}`,
        },
    };
}

export default async function LocationPage({ params }: Props) {
    const { city } = await params;
    const data = LOCATIONS.find(l => l.slug === city);

    if (!data) {
        notFound();
    }

    const regionPeers = LOCATIONS.filter(l => l.region === data.region && l.slug !== data.slug).slice(0, 3);

    return (
        <div className="min-h-screen bg-[#050914] text-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Place",
                        "name": `${data.name} Real Estate Targets`,
                        "description": `Tokenized commercial and luxury real estate acquisition targets in ${data.name}.`,
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": data.coords.lat,
                            "longitude": data.coords.lng
                        },
                        "image": `https://hyperion.theutilitycompany.co${data.image}`
                    })
                }}
            />
            <Navbar />
            
            {/* Full-width Hero */}
            <div className="relative pt-24 overflow-hidden">
                <div className="relative h-[60vh] min-h-[500px]">
                    <Image 
                        src={data.image} 
                        alt={`${data.name} Real Estate`} 
                        fill 
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-[#050914]/60 to-[#050914]/30" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050914]/50 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-10 max-w-7xl mx-auto">
                        <Link href="/locations" className="text-sm font-mono text-gray-500 hover:text-hr-gold transition-colors flex items-center gap-2 mb-6 uppercase tracking-widest">
                            ← All Locations
                        </Link>
                        <div className="inline-block px-4 py-2 rounded-full border text-[10px] font-mono tracking-widest uppercase mb-6 text-hr-gold border-hr-gold/50 bg-hr-gold/5 backdrop-blur-sm">
                            {data.region}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
                            Acquisitions: <span className="text-hr-gold">{data.name}</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 max-w-3xl font-light leading-relaxed">
                            {data.heroDesc}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="py-24 max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-5 gap-16 items-start">
                    <div className="lg:col-span-3 space-y-8">
                        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide">Why {data.name}?</h2>
                        <div className="h-1 w-16 bg-hr-gold" />
                        <p className="text-gray-300 leading-relaxed text-lg">{data.whyText}</p>
                        <p className="text-gray-400 leading-relaxed text-lg">{data.detailText}</p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link href="/marketplace" className="inline-block px-8 py-4 bg-hr-gold text-black font-bold tracking-widest uppercase text-sm hover:bg-[#b0922e] transition-all rounded shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                                View Pipeline
                            </Link>
                            <Link href="/whitepaper" className="inline-block px-8 py-4 border border-hr-gold/40 text-hr-gold font-bold tracking-widest uppercase text-sm hover:bg-hr-gold hover:text-black transition-all rounded">
                                Read Whitepaper
                            </Link>
                        </div>
                    </div>
                    
                    {/* Sidebar */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="p-8 bg-[#0a1122] rounded-2xl border border-white/5">
                            <div className="text-[10px] font-mono tracking-widest text-hr-gold mb-6 pb-3 border-b border-white/5">MARKET INTELLIGENCE</div>
                            <div className="space-y-6">
                                <div>
                                    <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Target Asset Class</div>
                                    <div className="text-white font-bold">{data.stats.assetClass}</div>
                                </div>
                                <div>
                                    <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Projected Net Yield</div>
                                    <div className="text-hr-gold font-bold text-xl">{data.stats.projectedYield}</div>
                                </div>
                                <div>
                                    <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Total Market Size</div>
                                    <div className="text-white font-bold">{data.stats.marketSize}</div>
                                </div>
                                <div>
                                    <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Protocol Status</div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-hr-gold animate-pulse" />
                                        <span className="text-hr-gold font-bold">Active Pipeline</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Token Standard</div>
                                    <div className="text-white font-bold">ERC721 → ERC20</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Region Peers */}
            {regionPeers.length > 0 && (
                <div className="max-w-7xl mx-auto px-6 pb-24">
                    <div className="border-t border-white/5 pt-16">
                        <h3 className="text-sm font-bold tracking-widest text-hr-gold mb-8 uppercase">More in {data.region}</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {regionPeers.map(peer => (
                                <Link
                                    key={peer.slug}
                                    href={`/locations/${peer.slug}`}
                                    className="group bg-[#0a1122] rounded-xl overflow-hidden border border-white/5 hover:border-hr-gold/30 transition-all"
                                >
                                    <div className="relative aspect-[16/9] overflow-hidden">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                            style={{ backgroundImage: `url(${peer.image})` }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1122] to-transparent" />
                                    </div>
                                    <div className="p-5">
                                        <h4 className="text-lg font-bold group-hover:text-hr-gold transition-colors uppercase">{peer.name}</h4>
                                        <div className="flex gap-4 mt-2">
                                            <span className="text-[10px] font-mono text-hr-gold">{peer.stats.projectedYield} YIELD</span>
                                            <span className="text-[10px] font-mono text-gray-500">{peer.stats.marketSize} MARKET</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
