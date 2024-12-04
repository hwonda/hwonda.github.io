const GoogleAdSense = () => {
  const adsenseAccountId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;

  return(
    <meta
      name="google-adsense-account"
      content={adsenseAccountId || ''}
    />
  );
};

export default GoogleAdSense;