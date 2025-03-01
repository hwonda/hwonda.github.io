import type { Metadata } from 'next';
import { fontNanum, fontCoding, fontNoto } from '@/libs/fonts';
import './globals.css';
import ThemeProvider from '@/layouts/ThemeProvider';
import Header from '@/components/common/Header';
import GoogleVerification from '@/components/meta/GoogleVerification';
import GoogleAdSense from '@/components/meta/GoogleAdSense';
import GoogleAnalytics from '@/components/meta/GoogleAnalytics';
import { dikiMetadata } from '@/constants';
import Script from 'next/script';
import ReduxProvider from '@/components/redux/ReduxProvider';
import StoreInitializer from '@/components/redux/StoreInitializer';
import { fetchTermsData } from '@/utils/termsData';
import Footer from '@/components/common/Footer';

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
        url: dikiMetadata.thumbnailURL,
        width: 1200,
        height: 630,
        alt: dikiMetadata.description,
      },
    ],
  },
};

const RootLayout = async ({ children }: RootLayoutProps) => {
  const terms = await fetchTermsData();

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <GoogleVerification />
        <GoogleAdSense />
        <GoogleAnalytics />
        <link rel="canonical" href="https://hwonda.github.io" />
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js"
          strategy="afterInteractive"
        />
        <script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js" />
      </head>
      <body
        className={`
          overflow-x-hidden overflow-y-auto
          ${ fontNanum.variable } 
          ${ fontCoding.variable } 
          ${ fontNoto.variable } 
        `}
      >
        <ReduxProvider>
          <StoreInitializer terms={terms} />
          <ThemeProvider>
            <Header />
            <main className='mt-16 max-w-6xl min-h-[calc(100vh_-150px)] mx-auto px-4 py-3 md:px-6 lg:px-8'>{children}</main>
            <div className='hidden sm:block'>
              <Footer />
            </div>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;