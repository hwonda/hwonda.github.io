'use client';

import Script from 'next/script';
import { useEffect } from 'react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adsbygoogle: any;
  }
}

interface AdContainerProps {
  slot: string;
  format: string;
  className?: string;
  containerClassName?: string;
}

const AdContainer = ({ slot, format, className, containerClassName }: AdContainerProps) => {
  useEffect(() => {
    if(process.env.NODE_ENV !== 'production') return;
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div className={`googleAd-container ${ containerClassName ?? '' }`}>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        strategy="afterInteractive"
      />
      <ins
        className={`adsbygoogle block ${ className ?? '' }`}
        data-ad-client="ca-pub-1278038564950020"
        data-ad-slot={slot}
        data-auto-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdContainer;