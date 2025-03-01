import { writeFileSync } from 'fs';
import { generateSitemapXML } from '../src/utils/sitemap';

(async () => {
  // 기존 전체 사이트맵 생성
  const { getSitemapURLs } = await import('../src/utils/sitemap');
  const urls = await getSitemapURLs();
  const sitemap = generateSitemapXML(urls);

  // 간소화된 사이트맵용 URL (PostList 제외)
  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0] + 'T00:00:00+00:00';
  };

  const simplifiedUrlsTemp = [
    {
      loc: 'https://hwonda.github.io',
      lastmod: formatDate(new Date()),
      changefreq: 'always',
      priority: 1.00,
    },
  ];

  const simplifiedUrlsTemp2 = [
    {
      loc: 'https://hwonda.github.io/',
      lastmod: formatDate(new Date()),
      changefreq: 'always',
      priority: 1.00,
    },
  ];

  const simplifiedUrlsTemp3 = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <url>
    <loc>https://hwonda.github.io/</loc>
  </url>
  <url>
    <loc>https://hwonda.github.io/posts</loc>
  </url>
  <url>
    <loc>https://hwonda.github.io/contact</loc>
  </url>
</urlset>`;

  const simplifiedSitemap = generateSitemapXML(simplifiedUrlsTemp);
  const simplifiedSitemap2 = generateSitemapXML(simplifiedUrlsTemp2);

  // 사이트맵 파일 생성
  await Promise.all([
    writeFileSync('out/sitemap-base.xml', sitemap, 'utf-8'),
    writeFileSync('out/sitemap-temp3.xml', simplifiedSitemap, 'utf-8'),
    writeFileSync('out/sitemap-temp4.xml', simplifiedSitemap2, 'utf-8'),
    writeFileSync('out/sitemap-temp5.xml', simplifiedUrlsTemp3, 'utf-8'),
    writeFileSync('out/sitemap-temp6.xml', sitemap, 'utf-8'),
    // writeFileSync('public/sitemap.xml', sitemap, 'utf-8'),
    // writeFileSync('public/sitemap-temp.xml', simplifiedSitemap, 'utf-8'),
    // writeFileSync('public/sitemap-temp2.xml', simplifiedSitemap2, 'utf-8'),
    // writeFileSync('public/sitemap-temp5.xml', simplifiedUrlsTemp3, 'utf-8'),
  ]);

  console.log('sitemap-base.xml, sitemap-temp.xml, and sitemap-temp2.xml generated in out/ directory');
})();
