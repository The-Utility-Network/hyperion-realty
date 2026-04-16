'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { LOCATIONS } from '@/data/locations';
import { useRouter } from 'next/navigation';

// Dynamic import for react-globe.gl to ensure it only loads on client
const Globe = dynamic(() => import('react-globe.gl'), { 
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center bg-[#050914] text-hr-gold/50 font-mono text-sm tracking-widest animate-pulse">Initializing Orbit...</div>
});

export default function GlobeMap({ activeRegion, hoveredCity }: { activeRegion: string | null, hoveredCity: string | null }) {
    const globeEl = useRef<any>(null);
    const router = useRouter();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // Filter points based on active region
    const gData = useMemo(() => {
        return LOCATIONS.filter(loc => !activeRegion || loc.region === activeRegion)
            .map(loc => ({
                lat: loc.coords.lat,
                lng: loc.coords.lng,
                size: hoveredCity === loc.slug ? 1.5 : 0.8,
                color: hoveredCity === loc.slug ? '#d4af37' : '#d4af3788',
                name: loc.name,
                region: loc.region,
                yield: loc.stats.projectedYield,
                slug: loc.slug
            }));
    }, [activeRegion, hoveredCity]);

    // Handle Resize and Scroll Capturing
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight
                });
            }
        };

        const stopWheel = (e: WheelEvent) => e.stopPropagation();

        const el = containerRef.current;
        if (el) {
            el.addEventListener('wheel', stopWheel, { capture: true, passive: true });
        }

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => {
            window.removeEventListener('resize', updateDimensions);
            if (el) el.removeEventListener('wheel', stopWheel, { capture: true });
        };
    }, []);

    // Initial globe rotation and styling focus
    useEffect(() => {
        if (globeEl.current) {
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 0.3; // Majestic slow rotation
            globeEl.current.controls().enableZoom = false;
            
            // Set initial POV depending on active region
            const focusMap: Record<string, { lat: number, lng: number, altitude: number }> = {
                'Americas': { lat: 35, lng: -95, altitude: 1.5 },
                'Europe': { lat: 48, lng: 10, altitude: 1.5 },
                'Middle East': { lat: 25, lng: 55, altitude: 1.5 },
                'Asia-Pacific': { lat: 15, lng: 110, altitude: 1.5 }
            };

            if (activeRegion && focusMap[activeRegion]) {
                globeEl.current.controls().autoRotate = false;
                globeEl.current.pointOfView(focusMap[activeRegion], 1000);
            } else {
                globeEl.current.controls().autoRotate = true;
                globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 2.2 }, 1000);
            }
        }
    }, [activeRegion]);

    // When hovering over a specific city from the cards, rotate to it
    useEffect(() => {
        if (hoveredCity && globeEl.current) {
            const loc = LOCATIONS.find(l => l.slug === hoveredCity);
            if (loc) {
                globeEl.current.controls().autoRotate = false;
                globeEl.current.pointOfView({ lat: loc.coords.lat, lng: loc.coords.lng, altitude: 1.2 }, 800);
            }
        }
    }, [hoveredCity]);

    return (
        <div ref={containerRef} className="w-full h-full absolute inset-0">
            {dimensions.width > 0 && (
                <Globe
                    ref={globeEl}
                    width={dimensions.width}
                    height={dimensions.height}
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                    bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                    backgroundColor="rgba(0,0,0,0)"
                    atmosphereColor="#d4af37"
                    atmosphereAltitude={0.15}
                    
                    // Points
                    pointsData={gData}
                    pointLat="lat"
                    pointLng="lng"
                    pointColor="color"
                    pointAltitude={0.02}
                    pointRadius={(point: any) => point.size * 1.5} // Increased base size
                    pointsMerge={false}
                    
                    // Interaction
                    onPointClick={(point: any) => router.push(`/locations/${point.slug}`)}
                    pointLabel={(point: any) => `
                        <div class="bg-black/90 backdrop-blur-md border border-hr-gold/30 rounded-lg px-3 py-2 shadow-[0_0_20px_rgba(0,0,0,0.8)] -mt-16 pointer-events-none">
                            <div class="text-[10px] font-mono text-hr-gold tracking-widest">${point.region.toUpperCase()}</div>
                            <div class="text-sm font-bold text-white font-sans">${point.name}</div>
                            <div class="text-[10px] font-mono text-gray-500">${point.yield} YIELD</div>
                        </div>
                    `}
                    
                    // Rings around ALL active targets to make them extremely visible
                    ringsData={gData}
                    ringColor={(d: any) => hoveredCity === d.slug ? '#ffffff' : '#d4af37'}
                    ringMaxRadius={(d: any) => hoveredCity === d.slug ? 6 : 3}
                    ringPropagationSpeed={1.5}
                    ringRepeatPeriod={(d: any) => hoveredCity === d.slug ? 400 : 1200}
                />
            )}
        </div>
    );
}
