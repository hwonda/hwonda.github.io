'use client';

const GoogleAnalytics = () => {
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  if (!googleAnalyticsId) {
    console.log('Google Analytics Tracking ID가 설정되지 않았습니다.');
    return null;
  }

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${ googleAnalyticsId }`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ googleAnalyticsId }');
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
