'use client';

import Link from 'next/link';
import Stars from '@/components/ui/Stars';
import { TermData } from '@/types';
import { ChevronRight } from 'lucide-react';
import { getReadingTime } from '@/utils/metaData';

interface PostCardProps {
  term: TermData;
}

const PostCard = ({ term }: PostCardProps) => {
  return (
    <Link
      href={term.url}
      className="group h-full flex flex-col gap-0 sm:gap-4 justify-between p-4 border border-background-secondary rounded-lg
      dark:hover:bg-background-secondary hover:no-underline duration-300 shadow-md hover:shadow-xl"
    >
      <div className="flex flex-col">
        <div className='flex justify-between items-center'>
          <div className="flex items-center gap-2">
            <span className="text-2xl text-primary font-semibold">{term.title.ko}</span>
            <div className="block sm:hidden">
              <Stars rating={term.difficulty.level} size={14} />
            </div>
          </div>
          <ChevronRight className="size-5 text-light group-hover:text-sub font-normal block sm:hidden" />
        </div>
        <span className="hidden sm:block text-lg text-main truncate font-normal">{term.title.en}</span>
        <span className="text-sub line-clamp-1 sm:line-clamp-3 mt-4 font-normal">{term.description.short}</span>
      </div>
      <div className="hidden sm:flex justify-end sm:justify-between items-center">
        <Stars rating={term.difficulty.level} size={16} />
        <div className="flex gap-1 items-center font-normal">
          <span
            className="text-sub sm:opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
          >
            {getReadingTime(term)}
          </span>
          <ChevronRight className="size-5 text-light group-hover:text-sub" />
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
