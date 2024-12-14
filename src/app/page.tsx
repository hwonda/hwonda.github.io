import LogoAnimation from '@/components/common/LogoAnimation';
import SearchInput from '@/components/common/SearchInput';
import RecommendTerms from '@/components/posts/RecommendTerms';
import { fetchTermsData } from '@/utils/termsJson';

export default async function Home() {
  const terms = await fetchTermsData();

  return (
    <>
      <div className="relative min-h-[calc(100vh_-300px)] flex flex-col justify-center items-end sm:mx-10 md:mx-40 overflow-hidden">
        <LogoAnimation fontSize='10vw' />
        <div className='flex items-center gap-1 whitespace-nowrap mb-4 text-sm sm:text-base md:text-lg'>
          <span className='text-primary font-bold'>{terms.length}</span>
          {' 개의 데이터 용어사전 '}
        </div>
        <SearchInput />
      </div>
      <RecommendTerms terms={terms} />
    </>
  );
}
