'use client';

import { useCallback } from 'react';
import { TermData } from '@/types';
import { formatDate } from '@/utils/filters';
import DifficultyLevel from './DifficultyLevel';
import Level from '@/components/ui/Level';
import TooltipButton from '@/components/ui/TooltipButton';
import { Share2 } from 'lucide-react';
interface PostHeaderProps {
  term: TermData
  onShare: ()=> void;
}

const PostHeader = ({ term, onShare }: PostHeaderProps) => {
  const handleShareClick = useCallback((): void => {
    onShare();
  }, [onShare]);

  return (
    <div className='animate-intro sm:ml-5'>
      <div className='mt-10 sm:mt-32'>
        <div className="flex">
          <span className="flex flex-wrap items-center text-3xl font-bold mb-0">
            <span className='text-main'>{term.title?.ko}</span>
            {
              term.title?.en && (
                <span className='text-main break-all'>{'('}{term.title.en}{')'}
                  <button
                    onClick={handleShareClick}
                  >
                    <Share2 className='block md:hidden size-5 ml-1 text-gray1 hover:text-primary' />
                  </button>

                </span>
              )
            }
            <span className='inline-flex items-center' />
            <TooltipButton
              onClick={handleShareClick}
              tooltip="공유하기"
              className='hidden md:block text-gray1 hover:text-primary ml-1.5'
            >
              <Share2 className='size-6' />
            </TooltipButton>
          </span>
        </div>
      </div>
      <div className='flex justify-start gap-1 text-xs my-2'>
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
      <div className='flex items-start gap-2 my-1'>
        <div>
          <Level level={0} />
        </div>
        <p className='my-0.5'>{term.description?.short}</p>
      </div>
      <DifficultyLevel
        level={term.difficulty?.level ?? 0}
        description={term.difficulty?.description ?? ''}
      />
    </div>
  );
};

export default PostHeader;