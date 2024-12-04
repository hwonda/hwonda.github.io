'use client';

import Link from 'next/link';
import Stars from '@/components/ui/Stars';
import { TermData } from '@/types';
import { ChevronRight } from 'lucide-react';
import { getReadingTime } from '@/utils/metaData';

interface PostCardProps {
  posts: TermData[];
}

const PostCard = ({ posts }: PostCardProps) => {
  return (
    <ul className="grid sm:grid-cols-3 lg:grid-cols-4 gap-5">
      {posts.map((term: TermData) => (
        <li
          key={term.id}
          className="transition-transform duration-300 hover:-translate-y-2" // y값 상승
        >
          <Link
            href={term.url}
            className="group h-full flex flex-col gap-0 sm:gap-4 justify-between p-4 border border-background-secondary rounded-lg
            dark:hover:bg-background-secondary duration-300 shadow-md hover:shadow-xl"
          >
            <div className="flex flex-col">
              <div className='flex items-center gap-2'>
                <span className="font-noto text-2xl text-primary font-semibold">{term.title.ko}</span>
                <div className="block sm:hidden">
                  <Stars rating={term.difficulty.level} size={12} />
                </div>
              </div>
              <span className="hidden sm:block font-noto text-lg text-main truncate">{term.title.en}</span>
              <span className="text-sub line-clamp-1 sm:line-clamp-3 mt-4">{term.description.short}</span>
            </div>
            <div className="flex justify-end sm:justify-between items-center">
              <div className="hidden sm:block">
                <Stars rating={term.difficulty.level} size={16} />
              </div>
              <div className="flex gap-1 items-center">
                <span
                  className="text-sub sm:opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                >
                  {getReadingTime(term)}
                </span>
                <ChevronRight className="size-5 text-light group-hover:text-sub" />
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PostCard;
