import { getSitemapURLs, generateSitemapXML } from '@/utils/sitemap';

export async function GET() {
  const urls = await getSitemapURLs();
  const sitemap = generateSitemapXML(urls);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  });
}