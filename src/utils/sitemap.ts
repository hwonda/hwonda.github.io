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
    <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
            xmlns:xhtml="http://www.w3.org/1999/xhtml" 
            xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
            xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${ urls.map(generateSitemapURL).join('') }
    </urlset>`;
};

export const getSitemapURLs = async (): Promise<SitemapURL[]> => {
  const baseUrl = dikiMetadata.url;
  const postLists = await fetchTermsData();

  const urls: SitemapURL[] = [
    {
      loc: baseUrl,
      lastmod: new Date().toISOString(),
      changefreq: 'always',
      priority: 1.0,
    },
    {
      loc: `${ baseUrl }/posts`,
      lastmod: new Date().toISOString(),
      changefreq: 'always',
      priority: 0.9,
    },
    ...postLists.map(({ url, metadata }) => {
      const date = metadata?.updated_at || metadata?.created_at;
      const lastmod = date ? new Date(date) : new Date();

      return {
        loc: `${ baseUrl }${ url }`,
        lastmod: lastmod.toISOString(),
        changefreq: 'always',
        priority: 0.8,
      };
    }),
  ];

  return urls;
};

export { generateSitemapXML };