import { writeFileSync } from 'fs';
import { generateSitemapXML } from '../src/utils/sitemap';
import { dikiMetadata } from '../src/constants';

(async () => {
  // 기존 전체 사이트맵 생성
  const { getSitemapURLs } = await import('../src/utils/sitemap');
  const urls = await getSitemapURLs();
  const sitemap = generateSitemapXML(urls);

  // 간소화된 사이트맵용 URL (PostList 제외)
  const baseUrl = dikiMetadata.url;
  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0] + 'T00:00:00+00:00';
  };

  const simplifiedUrlsTemp = [
    {
      loc: baseUrl,
      lastmod: formatDate(new Date()),
      changefreq: 'always',
      priority: 1.00,
    },
  ];

  const simplifiedUrlsTemp2 = [
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
  ];

  const simplifiedSitemap = generateSitemapXML(simplifiedUrlsTemp);
  const simplifiedSitemap2 = generateSitemapXML(simplifiedUrlsTemp2);

  // 사이트맵 파일 생성
  await Promise.all([
    writeFileSync('out/sitemap.xml', sitemap, 'utf-8'),
    writeFileSync('out/sitemap-temp.xml', simplifiedSitemap, 'utf-8'),
    writeFileSync('out/sitemap-temp2.xml', simplifiedSitemap2, 'utf-8'),
    // writeFileSync('public/sitemap.xml', sitemap, 'utf-8'),
    // writeFileSync('public/sitemap-temp.xml', simplifiedSitemap, 'utf-8'),
    // writeFileSync('public/sitemap-temp2.xml', simplifiedSitemap2, 'utf-8'),
  ]);

  console.log('sitemap.xml, sitemap-temp.xml, and sitemap-temp2.xml generated in out/ directory');
})();
