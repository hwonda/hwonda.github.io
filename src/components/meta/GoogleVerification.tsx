const GoogleVerification = () => {
  const siteVerificationId = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  return(
    <meta
      name="google-site-verification"
      content={siteVerificationId || ''}
    />
  );
};

export default GoogleVerification;