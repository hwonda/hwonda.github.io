import { MetadataRoute } from 'next';
import { dikiMetadata } from '@/constants';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = dikiMetadata.url;
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${ siteUrl }/sitemap.xml`,
    host: siteUrl,
  };
}