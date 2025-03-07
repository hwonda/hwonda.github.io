import { MetadataRoute } from 'next';
import { fetchTermsData } from '@/utils/termsData';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const terms = await fetchTermsData();
  const baseUrl = 'https://hwonda-github-pages.vercel.app';

  const termsList = terms.map((term) => ({
    url: `${ baseUrl }/posts/${ term.url }`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${ baseUrl }/posts`,
      lastModified: new Date(),
    },
    ...termsList,
  ];
}
