import { fetchTermsData } from '@/utils/termsData';
import PostList from '@/components/posts/PostList';
// import { TermData } from '@/types/database';
import SearchInput from '@/components/common/SearchInput';

export const metadata = {
  title: '포스트 목록',
};

export default async function PostsPage() {
  const termsData = await fetchTermsData();
  // const extendedTermsData = Array.from({ length: 122 }, (data: TermData, i) => ({
  //   ...termsData[0],
  //   id: i + 1,
  // }));

  const itemsPerPage = 12;
  const totalPages = Math.ceil(termsData.length / itemsPerPage);

  return (
    <div className="relative">
      <div className='animate-intro relative z-20 sm:mx-24'>
        <SearchInput tip={false} filter={true} />
      </div>
      <div className='animate-introSecond z-10'>
        <h1 className='flex justify-start items-center gap-2 mt-4 md:mt-20 mb-5 pb-1 text-sub border-b border-extreme-light'>
          {'검색결과'}
          <span className='text-primary font-bold'>{termsData.length}</span>
          {'/ '}{termsData.length}{' 개'}
        </h1>
        <PostList termsData={termsData} totalPages={totalPages} itemsPerPage={itemsPerPage} />
      </div>
    </div>
  );
}