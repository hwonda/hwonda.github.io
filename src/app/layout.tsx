import type { Metadata } from 'next';
import { fontNanum, fontCoding, fontNoto, fontPretendard } from '@/libs/fonts';
import './globals.css';
import ThemeProvider from '@/layouts/ThemeProvider';
import Header from '@/components/common/Header';
import GoogleVerification from '@/components/meta/GoogleVerification';
import GoogleAdSense from '@/components/meta/GoogleAdSense';
import GoogleAnalytics from '@/components/meta/GoogleAnalytics';

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Diki',
  description: 'Welcome to Diki',
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
          <main className='mt-16 max-w-6xl min-h-[calc(100vh_-184px)] mx-auto px-4 py-3 md:px-6 lg:px-8'>{children}</main>
          <div className='w-full flex justify-center pt-20 pb-10 text-sub'>{'© 2024 dxwiki All rights reserved.'}</div>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;