import { promises as fs } from 'fs';
import { fetchTermsData } from '../src/utils/termsData';
import { dikiMetadata } from '../src/constants';

(async () => {
  const getSitemapPostList = async () => {
    const postLists = await fetchTermsData();
    const baseUrl = dikiMetadata.url;

    const homepageUrl = {
      url: baseUrl,
      lastmod: new Date().toISOString(),
      frequency: 'always',
      priority: 1.0,
    };

    const postsListUrl = {
      url: `${ baseUrl }/posts`,
      lastmod: new Date().toISOString(),
      frequency: 'always',
      priority: 0.9,
    };

    const postsUrls = postLists.map(({ url, metadata }) => ({
      url: `${ baseUrl }${ url }`,
      lastmod: new Date(metadata.updated_at).toISOString() ,
      frequency: 'daily',
      priority: 0.8,
    }));

    return [homepageUrl, postsListUrl, ...postsUrls];
  };

  const posts = await getSitemapPostList();

  // 사이트맵 XML 생성
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${ posts
    .map((post) => `
          <url>
            <loc>${ post.url }</loc>
            <lastmod>${ new Date(post.lastmod).toISOString() }</lastmod>
            <changefreq>${ post.frequency }</changefreq>
            <priority>${ post.priority }</priority>
          </url>
        `)
    .join('') }
    </urlset>`;

  // 사이트맵 파일 생성
  await fs.writeFile('public/sitemap.xml', sitemap);
  console.log('sitemap.xml generated', sitemap);
})();
