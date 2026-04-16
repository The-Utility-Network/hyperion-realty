'use client';

import { useEffect, useRef } from 'react';

export default function GrainDotGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = 0;
        let height = 0;
        
        // Configuration
        const dotSize = 1;
        const spacing = 40; // Spacing between dots
        const THEME_COLOR = '#F97316'; // Amber

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', resize);
        resize();

        let time = 0;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            ctx.fillStyle = `${THEME_COLOR}30`; // Slightly bumped opacity for dots

            const offsetX = (time * 0.5) % spacing;
            const offsetY = (time * 0.25) % spacing;

            for (let x = -spacing; x < width + spacing; x += spacing) {
                for (let y = -spacing; y < height + spacing; y += spacing) {
                    
                    // Add subtle wave effect
                    const waveX = Math.sin((y + time * 20) * 0.005) * 5;
                    const waveY = Math.cos((x + time * 15) * 0.005) * 5;
                    
                    // Fade out near edges
                    const distToCenter = Math.hypot(x - width/2, y - height/2);
                    const maxDist = Math.max(width, height) / 1.5;
                    const opacity = Math.max(0, 1 - distToCenter / maxDist);
                    
                    ctx.globalAlpha = opacity * 0.5;

                    ctx.beginPath();
                    ctx.arc(x + offsetX + waveX, y + offsetY + waveY, dotSize, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            
            ctx.globalAlpha = 1;

            time++;
            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="grain-bg"
            style={{ opacity: 0.6 }}
        />
    );
}
