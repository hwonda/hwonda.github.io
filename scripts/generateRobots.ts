import { writeFileSync } from 'fs';
import { dikiMetadata } from '../src/constants';

(() => {
  const siteUrl = dikiMetadata.url;
  const text = `
User-agent: *
Allow: /
Sitemap: ${ siteUrl }/sitemap.xml
`;

  writeFileSync('out/robots.txt', text.trim(), 'utf-8');
  console.log('robots.txt generated');
})();