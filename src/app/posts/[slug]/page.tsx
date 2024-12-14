// /post/[slug]/page.tsx
import PostDetail from '@/components/posts/PostDetail';
import { fetchTermsData } from '@/utils/termsJson';
import { getTermData } from '@/utils/termsJson';
import { notFound } from 'next/navigation';
import { dikiMetadata } from '@/constants';
import { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const termsData = await fetchTermsData();
  return termsData.map((term) => ({
    slug: term.title.en.toLowerCase().replace(/\s+/g, '_'),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const term = await getTermData(params.slug);

  if (!term) {
    return {};
  }

  const title = `${ term.title.ko } (${ term.title.en })`;
  const description = term.description.short;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `${ dikiMetadata.url }/posts/${ params.slug }`,
      siteName: dikiMetadata.title,
      locale: 'ko_KR',
      type: 'article',
      images: [
        {
          url: dikiMetadata.thumbnailURL,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [dikiMetadata.thumbnailURL],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const term = await getTermData(params.slug);

  if (!term) {
    notFound();
  }

  return (
    <>
      <PostDetail term={term} slug={params.slug} />
    </>
  );
}
