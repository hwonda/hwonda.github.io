import { MetadataRoute } from 'next';
import { dikiMetadata } from '@/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${ dikiMetadata.url }/sitemap.xml`,
    host: dikiMetadata.url,
  };
}