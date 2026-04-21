import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

const THEME = '#D4AF37'; // Hyperion Gold

export default async function Icon() {
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
                position: 'relative'
            }}>
                {/* Thin Inner ring */}
                <div style={{ position: 'absolute', inset: 16, borderRadius: '50%', border: `1px solid ${THEME}60`, display: 'flex' }} />
                
                {/* HR Medallion */}
                <img src={medallionBase64} width={130} height={130} style={{ position: 'relative', width: 130, height: 130, objectFit: 'contain' }} />
            </div>
        ),
        { ...size }
    );
}
