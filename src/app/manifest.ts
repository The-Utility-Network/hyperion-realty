import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hyperion Realty',
    short_name: 'Hyperion',
    description: 'Premium Tokenized Real Estate',
    start_url: '/',
    display: 'standalone',
    background_color: '#050914',
    theme_color: '#D4AF37',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      }
    ],
  };
}
