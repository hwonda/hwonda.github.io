import { dikiMetadata } from '@/constants';
import { fetchTermsData } from '@/utils/termsData';

interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

const generateSitemapURL = ({ loc, lastmod, changefreq, priority }: SitemapURL): string => {
  return `
    <url>
      <loc>${ loc }</loc>
      <lastmod>${ lastmod }</lastmod>
      <changefreq>${ changefreq }</changefreq>
      <priority>${ priority }</priority>
    </url>
  `;
};

const generateSitemapXML = (urls: SitemapURL[]): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${ urls.map(generateSitemapURL).join('') }
    </urlset>`;
};

export const getSitemapURLs = async (): Promise<SitemapURL[]> => {
  const baseUrl = dikiMetadata.url;
  const postLists = await fetchTermsData();

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0] + 'T00:00:00+00:00';
  };

  const urls: SitemapURL[] = [
    {
      loc: baseUrl,
      lastmod: formatDate(new Date()),
      changefreq: 'always',
      priority: 1.00,
    },
    {
      loc: `${ baseUrl }/posts`,
      lastmod: formatDate(new Date()),
      changefreq: 'always',
      priority: 0.80,
    },
    ...postLists.map(({ url, metadata }) => {
      const date = metadata?.updated_at || metadata?.created_at;
      const lastmod = date ? new Date(date) : new Date();

      return {
        loc: `${ baseUrl }${ url }`,
        lastmod: formatDate(lastmod),
        changefreq: 'always',
        priority: 0.64,
      };
    }),
  ];

  return urls;
};

export { generateSitemapXML };