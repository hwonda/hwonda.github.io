import type { Metadata } from 'next';
import { fontNanum, fontCoding, fontNoto, fontPretendard } from '@/libs/fonts';
import './globals.css';
import ThemeProvider from '@/layouts/ThemeProvider';
import Header from '@/components/common/Header';
import GoogleVerification from '@/components/meta/GoogleVerification';
import GoogleAdSense from '@/components/meta/GoogleAdSense';
import GoogleAnalytics from '@/components/meta/GoogleAnalytics';
import { dikiMetadata } from '@/constants';

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    template: `%s | ${ dikiMetadata.title }`,
    default: dikiMetadata.title,
  },
  description: dikiMetadata.description,
  authors: [{ name: dikiMetadata.author.name }],
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon.ico' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png' },
    ],
  },
  openGraph: {
    title: dikiMetadata.title,
    description: dikiMetadata.description,
    url: dikiMetadata.url,
    siteName: dikiMetadata.title,
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: 'https://hwonda.github.io/thumbnail.png',
        width: 1200,
        height: 630,
        alt: dikiMetadata.description,
      },
    ],
  },
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <GoogleVerification />
        <GoogleAdSense />
        <GoogleAnalytics />
      </head>
      <body
        className={`
        ${ fontNanum.variable } 
        ${ fontCoding.variable } 
        ${ fontNoto.variable } 
        ${ fontPretendard.variable }
      `}
      >
        <ThemeProvider>
          <Header />
          <main className='mt-16 max-w-6xl min-h-[calc(100vh_-150px)] mx-auto px-4 py-3 md:px-6 lg:px-8'>{children}</main>
          <div className='w-full h-20 flex justify-center items-center text-sub'>{'© 2024 dxwiki All rights reserved.'}</div>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;