'use client';

import { useState, useCallback } from 'react';
import TableOfContents from '@/components/common/TableOfContents';
import ShareModal from '@/components/common/ShareModal';
import AdContainer from '@/components/common/AdContainer';
import PostHeader from './sections/PostHeader';
import { TermData } from '@/types';

interface Props {
  title: string;
  children: React.ReactNode;
  term: TermData;
  slug: string;
}

const adSlots = [
  '8925962934',
  '7612881260',
  '1384151310',
  '9071069648',
];

const PostDetailClient = ({ title, children, term, slug }: Props) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShare = useCallback(() => {
    setIsShareModalOpen(true);
  }, []);

  return (
    <div className='prose block md:grid md:grid-cols-[minmax(0,176px)_5fr]'>
      <TableOfContents
        title={title}
        term={term}
        slug={slug}
      />
      <div className='md:grid md:grid-cols-[minmax(0,720px)_minmax(0,1fr)]'>
        <div className='text-justify'>
          <PostHeader term={term} onShare={handleShare} />
          <div className='animate-introSecond sm:ml-5'>
            {children}
          </div>
        </div>
        <div className='hidden md:flex flex-col ml-4'>
          <div className='w-full h-[128px]' />
          <div className='flex flex-col gap-12'>
            {adSlots.map((slot) => (
              <AdContainer
                key={slot}
                slot={slot}
                format="auto"
                containerClassName="flex justify-end"
                className="w-[122px] min-h-[600px]"
              />
            ))}
          </div>
        </div>
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
};

export default PostDetailClient;
