'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function generateTower(baseX: number, baseWidth: number, baseHeight: number, vh: number) {
    const numTiers = Math.floor(Math.random() * 4) + 2;
    let hRemaining = baseHeight;
    let wRemaining = baseWidth;
    let currentY = vh;
    
    let leftX = baseX;
    let rightX = baseX + baseWidth;
    
    let d = `M ${leftX} ${vh} `;
    
    const tiersRight = [];
    
    for (let i = 0; i < numTiers; i++) {
        let tierH = (i === numTiers - 1) ? hRemaining : hRemaining * (Math.random() * 0.4 + 0.2);
        hRemaining -= tierH;
        currentY -= tierH;
        
        // Go up
        d += `L ${leftX} ${currentY} `;
        
        if (i < numTiers - 1) {
            let inset = wRemaining * (Math.random() * 0.2 + 0.05);
            leftX += inset;
            rightX -= inset;
            wRemaining = rightX - leftX;
            // Go in
            d += `L ${leftX} ${currentY} `;
            tiersRight.push({ rx: rightX, ry: currentY });
        }
    }
    
    // Top roof
    let hasAntenna = Math.random() > 0.4;
    if (hasAntenna) {
        let antennaH = Math.random() * 60 + 20;
        let midX = (leftX + rightX) / 2;
        d += `L ${midX - 1} ${currentY} L ${midX - 1} ${currentY - antennaH} L ${midX + 1} ${currentY - antennaH} L ${midX + 1} ${currentY} `;
    }
    
    d += `L ${rightX} ${currentY} `;
    
    // Go down right
    for (let i = tiersRight.length - 1; i >= 0; i--) {
        d += `L ${rightX} ${tiersRight[i].ry} `;
        d += `L ${tiersRight[i].rx} ${tiersRight[i].ry} `;
        rightX = tiersRight[i].rx;
    }
    
    d += `L ${rightX} ${vh} Z`;
    
    return d;
}

interface Building {
    id: string;
    x: number;
    w: number;
    h: number;
    path: string;
    delay: number;
    duration: number;
    windows: { cx: number, y1: number, y2: number, dash: string, duration: number, delay: number }[];
    flashY: number;
}

export default function GenerativeCityscape() {
    const [bgBuildings, setBgBuildings] = useState<Building[]>([]);
    const [midBuildings, setMidBuildings] = useState<Building[]>([]);
    const [fgBuildings, setFgBuildings] = useState<Building[]>([]);
    const [vh, setVH] = useState(1000);

    useEffect(() => {
        const updateBuildings = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            setVH(height);
            
            const generateLayer = (count: number, layer: 'bg' | 'mid' | 'fg') => {
                const arr: Building[] = [];
                for (let i = 0; i < count; i++) {
                    const x = Math.random() * width;
                    const hMult = layer === 'bg' ? 0.9 : layer === 'mid' ? 0.6 : 0.25;
                    const wBase = layer === 'bg' ? 40 : layer === 'mid' ? 60 : 150;
                    
                    const centerDist = Math.abs(x - (width / 2)) / (width / 2);
                    
                    // Core Parabolic arch distribution
                    const rawH = Math.random() * (height * hMult * 0.4) + (height * hMult * 0.2);
                    const h = rawH + (Math.max(0, 1 - Math.pow(centerDist, 1.5)) * height * hMult * 0.8);
                    const w = Math.random() * wBase + wBase * 0.5;
                    
                    const path = generateTower(x, w, h, height);
                    
                    const windows = [];
                    const numWindows = layer === 'mid' ? Math.floor(Math.random() * 4) + 1 : 0;
                    for (let j=0; j<numWindows; j++) {
                        const wh = Math.random() * h * 0.4 + h*0.2;
                        const wy = height - wh - (Math.random() * (h - wh));
                        windows.push({
                            cx: x + w * (Math.random() * 0.6 + 0.2),
                            y1: wy,
                            y2: wy + wh,
                            dash: `${Math.random() * 8 + 2} ${Math.random() * 15 + 5}`,
                            duration: Math.random() * 3 + 2,
                            delay: Math.random() * 5
                        });
                    }

                    arr.push({
                        id: `${layer}-${i}`,
                        x, w, h, path,
                        duration: Math.random() * 8 + 8,
                        delay: Math.random() * 10,
                        windows,
                        flashY: height - (h * Math.random())
                    });
                }
                return arr;
            };

            const isMobile = width < 768;
            
            // Re-increased densities now that GPU-heavy filters are gone
            const bgCount = isMobile ? Math.min(15, Math.floor(width / 35)) : Math.min(80, Math.floor(width / 25));
            const midCount = isMobile ? Math.min(12, Math.floor(width / 45)) : Math.min(60, Math.floor(width / 35));
            const fgCount = isMobile ? Math.min(4, Math.floor(width / 100)) : Math.min(15, Math.floor(width / 80));

            setBgBuildings(generateLayer(bgCount, 'bg'));
            setMidBuildings(generateLayer(midCount, 'mid'));
            setFgBuildings(generateLayer(fgCount, 'fg'));
        };

        updateBuildings();
        
        let timeoutId: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(updateBuildings, 300);
        };
        
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, []);

    if (bgBuildings.length === 0) return null;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-end justify-center">
            {/* Ambient Background glow from the city baseline (hardware accelerated opacity instead of heavy blur) */}
            <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-[#d4af37]/10 via-[#d4af37]/5 to-transparent opacity-80 z-0" />
            
            <svg 
                width="100%" 
                height="100%" 
                className="absolute inset-0 z-10"
            >
                <defs>
                    <linearGradient id="mid-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#d4af37" stopOpacity="0.4" />
                        <stop offset="50%" stopColor="#d4af37" stopOpacity="0.05" />
                        <stop offset="100%" stopColor="#050914" stopOpacity="0.9" />
                    </linearGradient>
                    <linearGradient id="bg-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#d4af37" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#050914" stopOpacity="0.9" />
                    </linearGradient>
                </defs>

                {/* BACKGROUND LAYER (Deep, hazy, optimized without blur filter) */}
                <g opacity="0.4">
                    {bgBuildings.map(b => (
                        <g key={b.id}>
                            <path d={b.path} fill="url(#bg-gradient)" stroke="#d4af37" strokeWidth="0.5" strokeOpacity="0.3" />
                            <motion.path 
                                d={b.path} 
                                fill="none" 
                                stroke="#d4af37" 
                                strokeOpacity="0.4" 
                                strokeWidth="1"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: [0, 1, 1], opacity: [0, 0.4, 0] }}
                                transition={{ duration: b.duration * 2, repeat: Infinity, delay: b.delay, ease: 'easeInOut' }}
                            />
                        </g>
                    ))}
                </g>

                {/* MIDGROUND LAYER (The Hero elements, sharp) */}
                <g>
                    {midBuildings.map(b => (
                        <g key={b.id}>
                            <path d={b.path} fill="url(#mid-gradient)" />
                            
                            {/* Fast Tracer Data Beams along perimeters -- glow is simulated via a thicker low-opacity underlayer for massive performance gains */}
                            <motion.path 
                                d={b.path} 
                                fill="none" 
                                stroke="#ffffff" 
                                strokeOpacity="0.2"
                                strokeWidth="6" 
                                initial={{ pathLength: 0.05, pathOffset: 0, opacity: 0 }}
                                animate={{ pathOffset: [0, 1], opacity: [0, 1, 1, 0] }}
                                transition={{ duration: b.duration * 0.4, repeat: Infinity, delay: b.delay, ease: 'linear' }}
                            />
                            <motion.path 
                                d={b.path} 
                                fill="none" 
                                stroke="#ffffff" 
                                strokeWidth="2" 
                                initial={{ pathLength: 0.05, pathOffset: 0, opacity: 0 }}
                                animate={{ pathOffset: [0, 1], opacity: [0, 1, 1, 0] }}
                                transition={{ duration: b.duration * 0.4, repeat: Infinity, delay: b.delay, ease: 'linear' }}
                            />
                            
                            {/* Structural Outline fade */}
                            <motion.path 
                                d={b.path} 
                                fill="none" 
                                stroke="#d4af37" 
                                strokeWidth="1" 
                                strokeOpacity="0.6"
                                initial={{ opacity: 0.1 }}
                                animate={{ opacity: [0.1, 0.6, 0.1] }}
                                transition={{ duration: b.duration, repeat: Infinity, delay: b.delay, ease: 'easeInOut' }}
                            />

                            {/* Windows Vertical Stacks */}
                            {b.windows.map((w, idx) => (
                                <motion.line 
                                    key={`w-${idx}`}
                                    x1={w.cx} y1={w.y1} x2={w.cx} y2={w.y2}
                                    stroke="#d4af37" 
                                    strokeWidth="1.5" 
                                    strokeDasharray={w.dash} 
                                    strokeLinecap="square"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 0.8, 0] }}
                                    transition={{ duration: w.duration, repeat: Infinity, delay: w.delay, ease: 'easeInOut' }}
                                />
                            ))}

                            {/* Horizontal Laser Scanning - Glow stacked */}
                            <motion.line
                                x1={b.x - 10} y1={b.flashY} x2={b.x + b.w + 10} y2={b.flashY}
                                stroke="#ffffff" 
                                strokeOpacity="0.2"
                                strokeWidth="8"
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: b.duration * 0.8, delay: b.delay }}
                                style={{ transformOrigin: `${b.x + b.w/2}px center` }}
                            />
                            <motion.line
                                x1={b.x - 10} y1={b.flashY} x2={b.x + b.w + 10} y2={b.flashY}
                                stroke="#ffffff" 
                                strokeWidth="1.5"
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: b.duration * 0.8, delay: b.delay }}
                                style={{ transformOrigin: `${b.x + b.w/2}px center` }}
                            />
                        </g>
                    ))}
                </g>

                {/* FOREGROUND LAYER (Dark monolithic blocks, stark contrast, fastest tracers) */}
                <g>
                    {fgBuildings.map(b => (
                        <g key={b.id}>
                            <path d={b.path} fill="#02040a" stroke="#d4af37" strokeWidth="1" strokeOpacity="0.4" />
                            {/* Aggressive fast data packet on edges - stacked glowing pattern */}
                            <motion.path 
                                d={b.path} 
                                fill="none" 
                                stroke="#d4af37" 
                                strokeOpacity="0.3"
                                strokeWidth="10" 
                                initial={{ pathLength: 0.1, pathOffset: 0, opacity: 0 }}
                                animate={{ pathOffset: [0, 1], opacity: [0, 1, 0] }}
                                transition={{ duration: b.duration * 0.25, repeat: Infinity, delay: b.delay, ease: 'linear' }}
                            />
                            <motion.path 
                                d={b.path} 
                                fill="none" 
                                stroke="#d4af37" 
                                strokeWidth="3" 
                                initial={{ pathLength: 0.1, pathOffset: 0, opacity: 0 }}
                                animate={{ pathOffset: [0, 1], opacity: [0, 1, 0] }}
                                transition={{ duration: b.duration * 0.25, repeat: Infinity, delay: b.delay, ease: 'linear' }}
                            />
                        </g>
                    ))}
                </g>

                {/* Foundational Base Cyber Grid Base Line */}
                <motion.line
                    x1="0" y1={vh} x2="100%" y2={vh}
                    stroke="#d4af37" strokeWidth="2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.2, 0.8, 0.2] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
            </svg>
        </div>
    );
}
