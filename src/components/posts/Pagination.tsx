'use client';

import { useState } from 'react';
import { TermData } from '@/types';
import PostCard from '@/components/posts/PostCard';
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  termsData: TermData[];
  totalPages: number;
  itemsPerPage: number;
}

const Pagination = ({ termsData, itemsPerPage }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(termsData.length / itemsPerPage); // termsData의 갯수에 맞춰 totalPages 계산
  const pagesPerGroup = 5;

  const currentGroup = Math.ceil(currentPage / pagesPerGroup);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = termsData.slice(startIndex, endIndex);

  const startPage = ((currentGroup - 1) * pagesPerGroup) + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <>
      {paginatedData.length > 0 ? (
        <PostCard posts={paginatedData} />
      ) : (
        <p>{'검색결과가 없습니다.'}</p>
      )}
      <div className="relative flex gap-2 mt-10 justify-center">
        <button
          onClick={() => setCurrentPage(1)}
          className={`px-2 py-1 rounded-md hover:bg-background-secondary text-sub ${ currentPage === 1 ? 'opacity-50 hover:bg-transparent pointer-events-none' : '' }`}
        >
          <ChevronsLeft className='size-4' />
        </button>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-2 py-1 rounded-md hover:bg-background-secondary text-sub ${ currentPage === 1 ? 'opacity-50 hover:bg-transparent pointer-events-none' : '' }`}
        >
          <ChevronLeft className='size-4' />
        </button>

        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`w-8 y-8 py-1 rounded-md text-sub hover:bg-accent hover:text-white ${ pageNumber === currentPage ? 'bg-accent text-white pointer-events-none' : '' }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-2 py-1 rounded-md hover:bg-background-secondary text-sub ${ currentPage === totalPages ? 'opacity-50 hover:bg-transparent pointer-events-none' : '' }`}
        >
          <ChevronRight className='size-4' />
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          className={`px-2 py-1 rounded-md hover:bg-background-secondary text-sub ${ currentPage === totalPages ? 'opacity-50 hover:bg-transparent pointer-events-none' : '' }`}
        >
          <ChevronsRight className='size-4' />
        </button>
      </div>
    </>
  );
};

export default Pagination;
