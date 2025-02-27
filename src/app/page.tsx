import LogoAnimation from '@/components/common/LogoAnimation';
import SearchInput from '@/components/search/SearchInput';
import RecentTerms from '@/components/posts/RecentTerms';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
// import AdContainer from '@/components/common/AdContainer';

export default async function Home() {
  return (
    <>
      <div className="relative min-h-[calc(100vh_-600px)] flex flex-col justify-end items-end sm:mx-10 md:mx-40 overflow-hidden">
        <LogoAnimation fontSize='10vw' />
        <div className='flex gap-1.5'>
          <Link href='/posts' className='flex items-center border-0 no-underline text-gray1 font-normal hover:text-accent hover:font-semibold'>
            {'더보기'}
            <ChevronRight className='size-3.5' />
          </Link>
        </div>
      </div>
      <div className='max-w-3xl sm:mx-10 md:mx-40 mx-auto'>
        <div className='relative w-full'>
          <div className='w-full absolute my-4 z-10'>
            <SearchInput />
          </div>
          <div className='w-full absolute top-20'>
            <RecentTerms />
          </div>
          {/* <div className='w-full absolute top-48'>
            <AdContainer
              slot="1575723008"
              format="auto"
              className="w-full min-h-[160px]"
            />
          </div> */}
        </div>
      </div>
    </>
  );
}
