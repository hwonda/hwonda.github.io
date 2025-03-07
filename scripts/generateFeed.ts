import { promises as fs } from 'fs';
import { fetchTermsData } from '@/utils/termsData';
import { dikiMetadata } from '@/constants';
import { TermData } from '@/types';

const formatToRFC822 = (date: Date) => {
  const d = new Date(date);
  const day = d.toLocaleString('en-US', { weekday: 'short', timeZone: 'UTC' });
  const dayNum = d.getUTCDate().toString().padStart(2, '0');
  const month = d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
  const year = d.getUTCFullYear();
  const time = d.toISOString().split('T')[1].split('.')[0]; // HH:MM:SS
  return `${ day }, ${ dayNum } ${ month } ${ year } ${ time } +0000`;
};

const generateItemXML = (post: TermData, metadata: typeof dikiMetadata): string => {
  const sanitizeText = (text: string) => text.replace(/<[^>]*>/g, '');
  const description = (post.description?.short ?? '') + (post.description?.full ?? '');

  return `
    <item>
      <title>${ sanitizeText(post.title?.ko ?? '') } ${ sanitizeText(post.title?.en ?? '') }${ sanitizeText(post.title?.etc?.[0] ?? '') }</title>
      <description>${ sanitizeText(description) }</description>
      <link>${ metadata.url }${ post.url }</link>
      <guid isPermaLink="true">${ metadata.url }${ post.url }</guid>
      ${ (post.usecase?.industries ?? []).map((category) => `<category>${ sanitizeText(category) }</category>`).join('') }
      <author>${ sanitizeText(post.metadata?.authors?.join(', ') ?? '') }</author>
      <pubDate>${ formatToRFC822(new Date(post.metadata?.updated_at ?? post.metadata?.created_at ?? '')) }</pubDate>
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
        <pubDate>${ formatToRFC822(new Date()) }</pubDate>
        <lastBuildDate>${ formatToRFC822(new Date()) }</lastBuildDate>
        ${ posts.map((post) => generateItemXML(post, metadata)).join('') }
      </channel>
    </rss>`;
};

(async() => {
  try {
    const postLists = await fetchTermsData();
    const xml = generateFeedXML(postLists, dikiMetadata);
    // await fs.writeFile('out/feed.xml', xml);
    await fs.writeFile('public/feed.xml', xml);
    console.log('RSS feed generated');
  } catch (error) {
    console.error('Error generating feed:', error);
  }
})();
