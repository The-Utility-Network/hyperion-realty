'use client';

export default function MeshGradientBackground() {
    return (
        <div className="fixed inset-0 z-[-2] overflow-hidden bg-[#0a0500] pointer-events-none">
            {/* Dark warm background base */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(13,8,0,1)_0%,rgba(0,0,0,1)_100%)] opacity-80" />

            {/* Glowing amber orb 1 */}
            <div
                className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] max-w-[800px] max-h-[800px] opacity-20 animate-float"
                style={{ background: 'radial-gradient(circle, #ea580c 0%, transparent 70%)', animationDuration: '18s' }}
            />

            {/* Glowing copper orb 2 */}
            <div
                className="absolute top-[20%] right-[-15%] w-[60%] h-[60%] max-w-[900px] max-h-[900px] opacity-20 animate-float stagger-2"
                style={{ background: 'radial-gradient(circle, #c2410c 0%, transparent 70%)', animationDuration: '22s' }}
            />

            {/* Glowing gold orb 3 */}
            <div
                className="absolute bottom-[-20%] left-[10%] w-[50%] h-[50%] max-w-[800px] max-h-[800px] opacity-10 animate-float stagger-4"
                style={{ background: 'radial-gradient(circle, #fbbf24 0%, transparent 70%)', animationDuration: '25s' }}
            />

            {/* Core HR Gold orb 4 */}
            <div
                className="absolute top-[40%] left-[30%] w-[45%] h-[45%] max-w-[700px] max-h-[700px] opacity-[0.12] animate-float stagger-6"
                style={{ background: 'radial-gradient(circle, #d4af37 0%, transparent 70%)', animationDuration: '15s' }}
            />
        </div>
    );
}
