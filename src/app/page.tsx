import Link from 'next/link';
import LogoAnimation from '@/components/common/LogoAnimation';
import SearchInput from '@/components/common/SearchInput';
// import CarouselWrapper from '@/components/common/CarouselWrapper';
import { fetchTermsData } from '@/utils/termsData';
import { ChevronRight } from 'lucide-react';
// import { MoveUpRight } from 'lucide-react';

export default async function Home() {
  const terms = await fetchTermsData();

  return (
    <div className="min-h-[calc(100vh_-230px)] flex flex-col justify-center items-end sm:mx-10 md:mx-40 overflow-hidden">
      <LogoAnimation fontSize='10vw' />
      <div className='whitespace-nowrap mb-4 text-sm sm:text-base md:text-lg'>
        <span className='text-primary font-bold'>{terms.length}</span>
        {' 개의 데이터 용어사전 '}
        <Link href='/posts' className='inline-flex items-center border-0 no-underline text-sub text-sm hover:text-accent hover:font-semibold'>
          {'더보기'}
          <ChevronRight className='size-4' />
        </Link>
      </div>
      <SearchInput />
      {/* <div className='w-full'>
        <CarouselWrapper itemCount={terms.length}>
          {terms.map((term, index) => (
            <div key={index} className='flex justify-center items-center shrink-0'>
              <button>
                <Link href={term.url} className='prose size-full flex items-center justify-between tag-button rounded-3xl border border-black'>
                  <span className='text-sub'>{term.title.ko}</span>
                  <MoveUpRight className='size-4 text-sub' />
                </Link>
              </button>
            </div>
          ))}
        </CarouselWrapper>
      </div> */}
    </div>
  );
}
