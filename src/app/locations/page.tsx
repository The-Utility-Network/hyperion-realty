'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { LOCATIONS, REGIONS } from '@/data/locations';

import GlobeMap from './GlobeMap';

export default function LocationsIndex() {
    const [activeRegion, setActiveRegion] = useState<string | null>(null);
    const [hoveredCity, setHoveredCity] = useState<string | null>(null);

    const filteredLocations = activeRegion
        ? LOCATIONS.filter(l => l.region === activeRegion)
        : LOCATIONS;

    return (
        <div className="min-h-screen bg-[#050914] text-white selection:bg-hr-gold selection:text-black font-sans">
            <Navbar />

            <main className="pt-40 pb-24">
                {/* Hero */}
                <div className="text-center px-6 mb-16 max-w-5xl mx-auto">
                    <span className="text-[10px] font-mono tracking-[0.4em] text-hr-gold mb-4 block">HPR.GLOBAL_FOOTPRINT</span>
                    <h1 className="text-5xl md:text-8xl font-black mt-4 mb-8 leading-tight tracking-tight uppercase">
                        Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-hr-gold via-yellow-200 to-hr-gold">Targets</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
                        Hyperion Realty is actively surveying tier-1 commercial and luxury hospitality assets across {LOCATIONS.length} global markets spanning {REGIONS.length} continents.
                    </p>
                </div>

                {/* Interactive 3D Globe Map - Standalone Full Bleed */}
                <div className="relative w-full h-[60vh] md:h-[80vh] mb-24">
                    {/* Immersive background fade */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050914] via-transparent to-[#050914] pointer-events-none z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050914] via-transparent to-[#050914] pointer-events-none z-10" />

                    <div className="absolute inset-0 z-0 overflow-hidden">
                        <GlobeMap activeRegion={activeRegion} hoveredCity={hoveredCity} />
                    </div>

                    {/* Floating Map Legend */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col md:flex-row items-center gap-4 bg-black/80 backdrop-blur-md border border-hr-gold/20 px-6 py-3 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.8)] w-[90%] md:w-auto text-center md:text-left">
                        <div className="flex items-center justify-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-hr-gold animate-pulse" />
                            <span className="text-[10px] md:text-xs font-mono text-white tracking-widest uppercase">{LOCATIONS.length} ACTIVE TARGETS ONCHAIN</span>
                        </div>
                        <div className="hidden md:block w-px h-4 bg-white/20" />
                        <div className="text-[8px] md:text-[10px] font-mono text-hr-gold tracking-wider uppercase">DRAG TO ROTATE • HOVER TO INSPECT</div>
                    </div>
                </div>

                {/* Region Filter */}
                <div className="max-w-7xl mx-auto px-6 mb-12">
                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            onClick={() => setActiveRegion(null)}
                            className={`px-5 py-2.5 text-[10px] font-mono tracking-widest uppercase rounded-full border transition-all ${!activeRegion ? 'bg-hr-gold text-black border-hr-gold font-bold' : 'text-gray-400 border-white/10 hover:border-hr-gold/30 hover:text-white'}`}
                        >
                            All Regions ({LOCATIONS.length})
                        </button>
                        {REGIONS.map(region => {
                            const count = LOCATIONS.filter(l => l.region === region).length;
                            return (
                                <button
                                    key={region}
                                    onClick={() => setActiveRegion(region === activeRegion ? null : region)}
                                    className={`px-5 py-2.5 text-[10px] font-mono tracking-widest uppercase rounded-full border transition-all ${activeRegion === region ? 'bg-hr-gold text-black border-hr-gold font-bold' : 'text-gray-400 border-white/10 hover:border-hr-gold/30 hover:text-white'}`}
                                >
                                    {region} ({count})
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* City Grid */}
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredLocations.map((loc) => (
                            <Link
                                key={loc.slug}
                                href={`/locations/${loc.slug}`}
                                className="group bg-[#0a1122] rounded-2xl overflow-hidden border border-white/5 hover:border-hr-gold/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-500 hover:-translate-y-2"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                        style={{ backgroundImage: `url(${loc.image})` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1122] via-[#0a1122]/30 to-transparent" />
                                    <div className="absolute top-4 left-4">
                                        <span className="text-[9px] font-mono tracking-widest text-hr-gold bg-black/80 backdrop-blur-sm px-2 py-1 rounded border border-hr-gold/20">{loc.region.toUpperCase()}</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white group-hover:text-hr-gold transition-colors mb-2 uppercase tracking-wide">
                                        {loc.name}
                                    </h3>
                                    <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-4">
                                        {loc.heroDesc}
                                    </p>
                                    <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                                        <div>
                                            <div className="text-[9px] font-mono text-gray-600 tracking-widest">YIELD</div>
                                            <div className="text-hr-gold font-bold text-sm">{loc.stats.projectedYield}</div>
                                        </div>
                                        <div>
                                            <div className="text-[9px] font-mono text-gray-600 tracking-widest">MARKET</div>
                                            <div className="text-white font-bold text-sm">{loc.stats.marketSize}</div>
                                        </div>
                                        <div className="ml-auto">
                                            <span className="flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-hr-gold animate-pulse" />
                                                <span className="text-[9px] font-mono text-hr-gold tracking-widest">ACTIVE</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
