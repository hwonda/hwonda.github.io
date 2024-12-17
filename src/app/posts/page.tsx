import { fetchTermsData } from '@/utils/termsData';
import PostList from '@/components/posts/PostList';
import SearchInput from '@/components/common/SearchInput';

export const metadata = {
  title: '포스트 목록',
};

export default async function PostsPage() {
  const terms = await fetchTermsData();

  const itemsPerPage = 12;
  const totalPages = Math.ceil(terms.length / itemsPerPage);

  return (
    <div className="relative">
      <div className='animate-intro relative z-20 sm:mx-24'>
        <SearchInput tip={false} filter={true} termsLength={terms.length} />
      </div>
      <div className='animate-introSecond z-10'>
        <h1 className='flex justify-start items-center gap-2 mt-4 md:mt-20 mb-5 pb-1 text-sub border-b border-extreme-light'>
          {'검색결과'}
          <span className='text-primary font-bold'>{terms.length}</span>
          {'/ '}{terms.length}{' 개'}
        </h1>
        <PostList termsData={terms} totalPages={totalPages} itemsPerPage={itemsPerPage} />
      </div>
    </div>
  );
}