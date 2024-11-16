import { fetchTermsData } from '@/utils/termsData';
import Pagination from '@/components/client/posts/Pagination';
import { TermData } from '@/types';

export default async function PostsPage() {
  const termsData = await fetchTermsData();
  const extendedTermsData = Array.from({ length: 122 }, (data: TermData, i) => ({
    ...termsData[0],
    id: i + 1,
  }));

  const itemsPerPage = 12;
  const totalPages = Math.ceil(extendedTermsData.length / itemsPerPage);

  return (
    <>
      <h1 className='flex items-center gap-2 mt-20 mb-5 text-sub border-b border-background-secondary'>
        {'검색결과'}
        <span className='text-primary font-bold'>{termsData.length}</span>
        {'/ '}{termsData.length}{' 개'}
      </h1>
      <Pagination termsData={termsData} totalPages={totalPages} itemsPerPage={itemsPerPage} />
    </>
  );
}