'use client';

import Link from 'next/link';
import { TermData } from '@/types';
import { formatDate } from '@/utils/filters';
import { Link as LinkIcon } from 'lucide-react';
import { transformToSlug } from '@/utils/filters';

interface PostHeaderProps {
  term: TermData
  slug: string
}

const PostHeader = ({ term, slug }: PostHeaderProps) => {
  return (
    <div className='animate-intro sm:ml-5'>
      <div className='flex sm:justify-start mt-10 sm:mt-32'>
        <div className='flex flex-col justify-center items-center'>
          <h1 className="text-3xl font-bold mb-0">
            <span className='block sm:inline text-main'>{term.title?.ko}</span>
            {
              term.title?.en && (
                <span className='block sm:inline text-main'>{'('}{term.title.en}{')'}</span>
              )
            }
          </h1>
        </div>
      </div>
      <p className='my-1'>{term.description?.short}</p>
      <div className='flex justify-start gap-1 text-xs'>
        <span className='text-main'>{term.metadata?.authors ?? '작가 확인 안됨'}</span>
        <span className="text-light">{'•'}</span>
        <div className='flex gap-1 items-center'>
          {
            term.metadata?.created_at ? (
              <span>{formatDate(term.metadata.created_at ?? '')}{' 발행'}</span>
            ) : (
              <span>{'발행일 확인 안됨'}</span>
            )
          }
          {term.metadata?.updated_at && (
            <>
              <span className="text-light">{'•'}</span>
              <span>{formatDate(term.metadata.updated_at ?? '')}{' 수정'}</span>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-start items-center flex-wrap mt-2.5 gap-1">
        {term.tags?.map((tag, index) => (
          tag.internal_link ? (
            <Link href={transformToSlug(tag.internal_link)} key={index} className='group flex gap-1 items-center tag-button rounded-3xl text-sm mb-2 hover:no-underline'>
              {tag.name}
              {transformToSlug(tag.internal_link) === slug ? <span className='sm:hidden group-hover:block text-sub'>{'• 현재글'}</span> : <LinkIcon size={16} />}
            </Link>
          ) : (
            <span key={index} className='tag-button-no-link rounded-3xl text-sm mb-2 bg-extreme-light'>
              {tag.name}
            </span>
          )
        ))}
      </div>
    </div>
  );
};

export default PostHeader;