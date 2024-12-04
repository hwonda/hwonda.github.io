import { fetchTermsData } from '@/utils/termsData';
import Pagination from '@/components/posts/Pagination';
import { TermData } from '@/types';
import SearchInput from '@/components/common/SearchInput';

export default async function PostsPage() {
  const termsData = await fetchTermsData();
  const extendedTermsData = Array.from({ length: 122 }, (data: TermData, i) => ({
    ...termsData[0],
    id: i + 1,
  }));

  const itemsPerPage = 12;
  const totalPages = Math.ceil(extendedTermsData.length / itemsPerPage);

  return (
    <div>
      <div className='animate-intro'>
        <SearchInput tip={false} />
      </div>
      <div className='animate-introSecond'>
        <h1 className='flex justify-end items-center gap-2 mt-10 mb-5 pb-2 text-sub border-b border-extreme-light'>
          {'검색결과'}
          <span className='text-primary font-bold'>{termsData.length}</span>
          {'/ '}{termsData.length}{' 개'}
        </h1>
        <Pagination termsData={termsData} totalPages={totalPages} itemsPerPage={itemsPerPage} />
      </div>
    </div>
  );
}