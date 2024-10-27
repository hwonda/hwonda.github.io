'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TermData } from '@/types';

interface Props {
  termsData: TermData[];
  totalPages: number;
  itemsPerPage: number;
}

export default function PaginationClient({ termsData, itemsPerPage }: Props) {
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
        <ul className='border-t-2 border-gray-700'>
          {paginatedData.map((term) => (
            <li key={term.id}>
              <Link href={term.url} className='w-full grid grid-cols-[2fr_7fr_1fr] py-5 border-b border-gray-500'>
                <strong>{term.title.ko}</strong>
                <p>{term.description.short}</p>
                <p>{term.difficulty.level + 'stars'}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>{'No terms found.'}</p>
      )}
      <div className="pagination flex space-x-2 mt-10 justify-center">
        <button onClick={() => setCurrentPage(1)} className={`px-3 py-1 rounded-md ${ currentPage === 1 ? 'opacity-0' : '' }`}>{'<<'}</button>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md ${ currentPage === 1 ? 'opacity-0' : '' }`}
        >
          {'<'}
        </button>

        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`px-3 py-1 rounded-md ${ pageNumber === currentPage ? 'bg-[#33cfff] text-white' : '' }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md ${ currentPage === totalPages ? 'opacity-0' : '' }`}
        >
          {'>'}
        </button>
        <button onClick={() => setCurrentPage(totalPages)} className={`px-3 py-1 rounded-md ${ currentPage === totalPages ? 'opacity-0' : '' }`}>{'>>'}</button>
      </div>
    </>
  );
}
