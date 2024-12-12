import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { TermData } from '@/types/database';
import CarouselWrapper from '@/components/common/CarouselWrapper';

export default async function RecommendTerms({ terms }: { terms: TermData[] }) {
  const recentTerms = [...terms]
    .sort((a, b) => new Date(b.metadata.updated_at).getTime() - new Date(a.metadata.updated_at).getTime())
    .slice(0, 10);

  return (
    <div className='sm:mx-10 md:mx-40 space-y-1.5 mt-10'>
      <div className='w-full inline-flex justify-between items-center gap-2'>
        <h3 className='font-semibold text-sub'>{'최근 등록된 용어'}</h3>
        <Link href='/posts' className='flex items-center border-0 no-underline text-sub text-sm hover:text-accent hover:font-semibold'>
          {'전체 보기'}
          <ChevronRight className='size-3.5' />
        </Link>
      </div>
      <CarouselWrapper itemCount={recentTerms.length} itemWidth={100}>
        {recentTerms.map((term) => (
          <Link
            key={term.url}
            href={`${ term.url }`}
            className='w-[100px] py-1.5 flex justify-center items-center text-sub rounded-lg border border-light hover:bg-extreme-light hover:text-main transition-colors text-xs sm:text-sm'
          >
            {term.title.ko}
          </Link>
        ))}
      </CarouselWrapper>
    </div>
  );
}