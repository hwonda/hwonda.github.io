import { fetchTermsData } from '@/utils/termsData';
import PaginationClient from '@/components/client/PaginationClient';
import { TermData } from '@/types';

export default async function PostsPage() {
  const termsData = await fetchTermsData();
  const extendedTermsData = Array.from({ length: 120 }, (data: TermData, i) => ({
    ...termsData[0],
    id: i + 1,
  }));

  const itemsPerPage = 10;
  const totalPages = Math.ceil(extendedTermsData.length / itemsPerPage);

  return (
    <>
      <h1 className='mt-10 mb-5'>{'검색결과'}</h1>
      <PaginationClient termsData={termsData} totalPages={totalPages} itemsPerPage={itemsPerPage} />
    </>
  );
}