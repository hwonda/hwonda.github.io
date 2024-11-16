import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import LogoAnimation from '@/components/client/common/LogoAnimation';
import SearchInput from '@/components/client/common/SearchInput';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh_-230px)] flex flex-col justify-center items-end sm:mx-10 md:mx-40">
      <LogoAnimation fontSize='10vw' />
      <div className='flex justify-center items-center gap-4 mb-4 text-sm sm:text-base md:text-lg'>
        <span>{'3 개의 데이터 용어사전'}</span>
        <Link href='/posts' className='flex items-center border-0 no-underline text-sub text-sm hover:text-accent hover:font-semibold'>
          {'더보기'}
          <ChevronRight className='size-4' />
        </Link>
      </div>
      <SearchInput />
    </div>
  );
}
