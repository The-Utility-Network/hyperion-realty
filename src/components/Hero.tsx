'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Building2 } from 'lucide-react';

export default function Hero() {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const THEME_COLOR = '#d4af37';

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
            const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
            setOffset({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-transparent">
            {/* Background Image with Parallax */}
            <div
                className="absolute inset-0 transition-transform duration-100 ease-out"
                style={{ transform: `translate(${offset.x * 30}px, ${offset.y * 30}px) scale(1.1)` }}
            >
                <Image
                    src="/artifacts/hyperion_bg.png"
                    alt="Hyperion Realty Background"
                    fill
                    className="object-cover opacity-80 object-center"
                    priority
                />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 text-center space-y-6 max-w-4xl px-6 flex flex-col items-center">
                <div className="relative w-32 h-32 md:w-48 md:h-48 mb-4 animate-float flex justify-center items-center">
                    <div className="absolute inset-0 rounded-full blur-xl opacity-30" style={{ backgroundColor: THEME_COLOR }} />
                    <Image
                        src="https://storage.googleapis.com/tgl_cdn/images/Medallions/HR.png"
                        alt="HR Medallion"
                        fill
                        className="object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10"
                    />
                </div>
                <h1
                    className="text-6xl md:text-8xl font-black tracking-tighter text-white drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] uppercase"
                    style={{ textShadow: `0 0 50px ${THEME_COLOR}` }}
                >
                    Hyperion Realty
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 font-light tracking-wide bg-black/60 backdrop-blur-md p-4 rounded-xl inline-block border border-white/10 uppercase">
                    Premium Tokenized Real Estate
                </p>
                <div className="pt-8">
                    <a href="#mission" className="font-mono text-sm tracking-[0.2em] uppercase opacity-70 hover:opacity-100 transition-opacity flex flex-col items-center gap-4" style={{ color: THEME_COLOR }}>
                        <span>Discover the properties</span>
                        <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0800] via-transparent to-black/50 pointer-events-none" />
        </section>
    );
}
