import Link from 'next/link';
import { TermData } from '@/types';
import CarouselWrapper from '@/components/common/CarouselWrapper';

export default async function RecommendTerms({ terms }: { terms: TermData[] }) {
  const recentTerms = [...terms]
    .sort((a, b) => new Date(b.metadata?.created_at ?? '').getTime() - new Date(a.metadata?.created_at ?? '').getTime())
    .slice(0, 10);

  return (
    <div className='space-y-1.5'>
      <h3 className='text-sub'>{'최근 등록'}</h3>
      <CarouselWrapper itemCount={recentTerms.length} itemWidth={100}>
        {recentTerms.map((term) => (
          <Link
            key={term.url}
            href={`${ term.url }`}
            className='w-[100px] py-1.5 flex justify-center items-center text-sub rounded-lg border border-light hover:bg-extreme-light hover:text-main transition-colors text-xs sm:text-sm'
          >
            {term.title?.ko}
          </Link>
        ))}
      </CarouselWrapper>
    </div>
  );
}