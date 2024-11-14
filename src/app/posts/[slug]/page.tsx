// /post/[slug]/page.tsx
import PostDetail from '@/components/server/posts/PostDetail';
import { fetchTermsData } from '@/utils/termsData';

interface Props {
  params: { slug: string };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const termsData = await fetchTermsData();
  return termsData.map((term) => ({
    slug: term.title.en.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export default async function PostPage({ params }: Props) {
  return (
    <>
      <PostDetail slug={params.slug} />
    </>
  );
}
