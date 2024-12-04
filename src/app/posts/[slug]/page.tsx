// /post/[slug]/page.tsx
import PostDetail from '@/components/posts/PostDetail';
import { fetchTermsData } from '@/utils/termsData';
import { getTermData } from '@/utils/termsData';
import { notFound } from 'next/navigation';

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
