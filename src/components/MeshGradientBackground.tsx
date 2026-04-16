'use client';

import { motion } from 'framer-motion';

export default function MeshGradientBackground() {
    return (
        <div className="fixed inset-0 z-[-2] overflow-hidden bg-[#0a0500] pointer-events-none">
            {/* Dark warm background base */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(13,8,0,1)_0%,rgba(0,0,0,1)_100%)] opacity-80" />

            {/* Glowing amber orb 1 */}
            <motion.div
                animate={{
                    scale: [1, 1.25, 1],
                    x: [0, 80, -40, 0],
                    y: [0, -60, 40, 0],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] max-w-[800px] max-h-[800px] rounded-full bg-[#ea580c] mix-blend-screen opacity-15 blur-[120px]"
            />

            {/* Glowing copper orb 2 */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1.3, 1],
                    x: [0, -70, 30, 0],
                    y: [0, 50, -80, 0],
                }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[20%] right-[-15%] w-[60%] h-[60%] max-w-[900px] max-h-[900px] rounded-full bg-[#c2410c] mix-blend-screen opacity-15 blur-[150px]"
            />

            {/* Glowing gold orb 3 */}
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, 90, -50, 0],
                    y: [0, 90, -30, 0],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[-20%] left-[10%] w-[50%] h-[50%] max-w-[800px] max-h-[800px] rounded-full bg-[#fbbf24] mix-blend-screen opacity-[0.08] blur-[130px]"
            />

            {/* Core TGL Amber orb 4 */}
            <motion.div
                animate={{
                    scale: [1, 0.9, 1.1, 1],
                    x: [0, -40, 60, 0],
                    y: [0, -40, 40, 0],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[40%] left-[30%] w-[45%] h-[45%] max-w-[700px] max-h-[700px] rounded-full bg-[#F97316] mix-blend-screen opacity-10 blur-[100px]"
            />
        </div>
    );
}
