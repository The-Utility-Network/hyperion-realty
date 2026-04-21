import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const alt = 'Hyperion Realty - The Dual-Token Real Estate Architecture';
export const size = { width: 2400, height: 1260 };
export const contentType = 'image/png';

const THEME = '#D4AF37'; // Hyperion Gold

export default async function Image() {
    // Sharp background
    const bgData = readFileSync(join(process.cwd(), 'public', 'artifacts', 'hyperion_bg.jpg'));
    const bgBase64 = `data:image/jpeg;base64,${bgData.toString('base64')}`;

    // Native blurred matrix
    const bgBlurData = readFileSync(join(process.cwd(), 'public', 'artifacts', 'hyperion_bg_blur.jpg'));
    const bgBlurBase64 = `data:image/jpeg;base64,${bgBlurData.toString('base64')}`;

    // Fetch the HR Medallion
    const medallionRes = await fetch("https://storage.googleapis.com/tgl_cdn/images/Medallions/HR.png");
    const medallionArrayBuffer = await medallionRes.arrayBuffer();
    const medallionBase64 = `data:image/png;base64,${Buffer.from(medallionArrayBuffer).toString('base64')}`;

    return new ImageResponse(
        (
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#050914',
                position: 'relative',
                fontFamily: 'Helvetica, Arial, sans-serif',
                overflow: 'hidden'
            }}>
                {/* 
                  Native Flexbox Square Anchoring Scheme 
                  Prevents Satori from squashing the 1:1 image by placing it in an overarching flex-center overflow container
                */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: 2400, height: 1260, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <img src={bgBase64} width={2400} height={2400} style={{ width: 2400, height: 2400 }} />
                </div>
                <div style={{ position: 'absolute', left: 0, top: 0, width: 2400, height: 1260, background: 'rgba(5,9,20,0.15)', display: 'flex' }} />

                {/* Left Wing - QUOTE */}
                <div style={{
                    position: 'absolute',
                    left: 200,
                    top: 480,
                    width: 800,
                    height: 320,
                    borderRadius: '40px 0 0 40px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    padding: '40px 260px 40px 40px',
                    boxShadow: 'inset 2px 2px 20px rgba(212,175,55,0.15), 0 20px 40px rgba(0,0,0,0.6)',
                }}>
                    {/* Glass Layer: Negative Coordinate Mapping */}
                    <div style={{ position: 'absolute', top: -480, left: -200, width: 2400, height: 1260, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', zIndex: -1 }}>
                        <img src={bgBlurBase64} width={2400} height={2400} style={{ width: 2400, height: 2400 }} />
                    </div>
                    {/* Frost Tint */}
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,9,20,0.7)', zIndex: 0 }} />
                    <div style={{ position: 'absolute', inset: 0, border: `2px solid rgba(212,175,55,0.2)`, borderRight: 'none', borderRadius: '40px 0 0 40px', zIndex: 1 }} />

                    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', zIndex: 10 }}>
                        <div style={{ fontSize: 36, fontWeight: 700, color: 'white', lineHeight: 1.3, textAlign: 'right', textShadow: '0 4px 20px rgba(0,0,0,0.9)' }}>
                            “Transforming physical prime real estate into highly liquid, yield-bearing digital assets.”
                        </div>
                    </div>
                </div>

                {/* Right Wing */}
                <div style={{
                    position: 'absolute',
                    right: 100, // right: 100 === left: 1380
                    top: 480,
                    width: 920,
                    height: 320,
                    borderRadius: '0 40px 40px 0',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    padding: '40px 40px 40px 240px',
                    boxShadow: 'inset -2px 2px 20px rgba(212,175,55,0.15), 0 20px 40px rgba(0,0,0,0.6)',
                }}>
                    {/* Glass Layer: Negative Coordinate Mapping */}
                    <div style={{ position: 'absolute', top: -480, left: -1380, width: 2400, height: 1260, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', zIndex: -1 }}>
                        <img src={bgBlurBase64} width={2400} height={2400} style={{ width: 2400, height: 2400 }} />
                    </div>
                    {/* Frost Tint */}
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,9,20,0.7)', zIndex: 0 }} />
                    <div style={{ position: 'absolute', inset: 0, border: `2px solid rgba(212,175,55,0.2)`, borderLeft: 'none', borderRadius: '0 40px 40px 0', zIndex: 1 }} />

                    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', zIndex: 10 }}>
                        <div style={{ fontSize: 44, color: 'white', fontWeight: 300, lineHeight: 1.2, display: 'flex', flexDirection: 'column', maxWidth: 640, textShadow: '0 4px 30px rgba(0,0,0,0.9)' }}>
                            <span>The Dual-Token</span>
                            <span>Architecture</span>
                        </div>
                        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12, borderLeft: `6px solid ${THEME}`, paddingLeft: 30 }}>
                            <span style={{ fontSize: 24, color: '#D1D5DB', letterSpacing: '0.15em', fontWeight: 500, textShadow: '0 2px 10px black' }}>HYPERION REALTY</span>
                            <span style={{ fontSize: 24, color: THEME, letterSpacing: '0.15em', fontWeight: 700, textShadow: '0 2px 10px black' }}>hyperion.theutilitycompany.co</span>
                        </div>
                    </div>
                </div>

                {/* Center Medallion Ring */}
                <div style={{
                    position: 'absolute',
                    left: 810,
                    top: 240,
                    width: 780,
                    height: 780,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    display: 'flex',
                    zIndex: '40',
                    boxShadow: 'inset 0 0 30px rgba(212,175,55,0.2), 0 20px 40px rgba(0,0,0,0.8)',
                    border: `4px solid ${THEME}`,
                }}>
                    {/* Glass Layer: Negative Coordinate Mapping */}
                    <div style={{ position: 'absolute', top: -240, left: -810, width: 2400, height: 1260, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', zIndex: -1 }}>
                        <img src={bgBlurBase64} width={2400} height={2400} style={{ width: 2400, height: 2400 }} />
                    </div>
                    {/* Frost Tint */}
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,9,20,0.8)', zIndex: 0 }} />
                </div>

                {/* Visual Medallion */}
                <div style={{
                    position: 'absolute',
                    left: 850,
                    top: 280,
                    width: 700,
                    height: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: '50'
                }}>
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `4px solid ${THEME}`, boxShadow: `0 0 60px ${THEME}60`, display: 'flex' }} />
                    <img src={medallionBase64} width={700} height={700} style={{ position: 'relative', width: 700, height: 700, objectFit: 'contain', padding: 20 }} />
                </div>

                {/* FRAME BARS */}
                <div style={{ position: 'absolute', left: 40, top: 40, width: 2320, height: 40, overflow: 'hidden', borderRadius: '24px 24px 0 0', display: 'flex', zIndex: '5', boxShadow: 'inset 0 0 10px rgba(212,175,55,0.1)', background: 'rgba(212,175,55,0.05)' }}>
                    <div style={{ position: 'absolute', inset: 0, border: `2px solid rgba(212,175,55,0.2)`, borderBottom: 'none' }} />
                </div>
                <div style={{ position: 'absolute', left: 40, top: 1180, width: 2320, height: 40, overflow: 'hidden', borderRadius: '0 0 24px 24px', display: 'flex', zIndex: '5', boxShadow: 'inset 0 0 10px rgba(212,175,55,0.1)', background: 'rgba(212,175,55,0.05)' }}>
                    <div style={{ position: 'absolute', inset: 0, border: `2px solid rgba(212,175,55,0.2)`, borderTop: 'none' }} />
                </div>
                <div style={{ position: 'absolute', left: 40, top: 80, width: 40, height: 1100, overflow: 'hidden', display: 'flex', zIndex: '5', boxShadow: 'inset 0 0 10px rgba(212,175,55,0.1)', background: 'rgba(212,175,55,0.05)' }}>
                    <div style={{ position: 'absolute', inset: 0, border: `2px solid rgba(212,175,55,0.2)`, borderTop: 'none', borderBottom: 'none' }} />
                </div>
                <div style={{ position: 'absolute', left: 2320, top: 80, width: 40, height: 1100, overflow: 'hidden', display: 'flex', zIndex: '5', boxShadow: 'inset 0 0 10px rgba(212,175,55,0.1)', background: 'rgba(212,175,55,0.05)' }}>
                    <div style={{ position: 'absolute', inset: 0, border: `2px solid rgba(212,175,55,0.2)`, borderTop: 'none', borderBottom: 'none' }} />
                </div>

                {/* HUD Corners */}
                <div style={{ position: 'absolute', top: 60, left: 60, width: 80, height: 80, borderTop: `8px solid ${THEME}`, borderLeft: `8px solid ${THEME}`, borderRadius: '24px 0 0 0', display: 'flex' }} />
                <div style={{ position: 'absolute', top: 60, right: 60, width: 80, height: 80, borderTop: `8px solid ${THEME}`, borderRight: `8px solid ${THEME}`, borderRadius: '0 24px 0 0', display: 'flex' }} />
                <div style={{ position: 'absolute', bottom: 60, left: 60, width: 80, height: 80, borderBottom: `8px solid ${THEME}`, borderLeft: `8px solid ${THEME}`, borderRadius: '0 0 0 24px', display: 'flex' }} />
                <div style={{ position: 'absolute', bottom: 60, right: 60, width: 80, height: 80, borderBottom: `8px solid ${THEME}`, borderRight: `8px solid ${THEME}`, borderRadius: '0 0 24px 0', display: 'flex' }} />

            </div>
        ),
        { ...size }
    );
}
