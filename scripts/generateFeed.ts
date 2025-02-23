import { promises as fs } from 'fs';
import { fetchTermsData } from '@/utils/termsData';
import { dikiMetadata } from '@/constants';
import { TermData } from '@/types';

const generateItemXML = (post: TermData, metadata: typeof dikiMetadata): string => {
  const sanitizeText = (text: string) => text.replace(/<[^>]*>/g, '');
  const description = (post.description?.short ?? '') + (post.description?.full ?? '');

  return `
    <item>
      <title>${ sanitizeText(post.title?.ko ?? '') }${ sanitizeText(post.title?.en ?? '') }${ sanitizeText(post.title?.etc?.[0] ?? '') }</title>
      <description>${ sanitizeText(description) }</description>
      <link>${ metadata.url }${ post.url }</link>
      <guid isPermaLink="true">${ metadata.url }${ post.url }</guid>
      ${ (post.usecase?.industries ?? []).map((category) => `<category>${ sanitizeText(category) }</category>`).join('') }
      <author>${ sanitizeText(post.metadata?.authors?.join(', ') ?? '') }</author>
      <pubDate>${ new Date(post.metadata?.updated_at ?? post.metadata?.created_at ?? '').toUTCString() }</pubDate>
    </item>
  `;
};

const generateFeedXML = (posts: TermData[], metadata: typeof dikiMetadata): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>Diki</title>
        <description>데이터 위키 - Diki</description>
        <link>${ metadata.url }</link>
        <atom:link href="${ metadata.url }/feed.xml" rel="self" type="application/rss+xml"/>
        <pubDate>${ new Date().toUTCString() }</pubDate>
        <lastBuildDate>${ new Date().toUTCString() }</lastBuildDate>
        ${ posts.map((post) => generateItemXML(post, metadata)).join('') }
      </channel>
    </rss>`;
};

(async() => {
  try {
    const postLists = await fetchTermsData();
    const xml = generateFeedXML(postLists, dikiMetadata);
    await fs.writeFile('public/feed.xml', xml);
    console.log('RSS feed generated');
  } catch (error) {
    console.error('Error generating feed:', error);
  }
})();
