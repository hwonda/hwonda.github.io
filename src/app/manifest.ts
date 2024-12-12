import { MetadataRoute } from 'next';
import { dikiMetadata } from '@/constants';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: dikiMetadata.title,
    short_name: dikiMetadata.title,
    description: dikiMetadata.description,
    start_url: '/',
    display: 'standalone',
    icons: [
      {
        src: '/favicon/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: '/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/favicon/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}