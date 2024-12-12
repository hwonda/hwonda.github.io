import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageNumbers: number[];
  setCurrentPage: (page: number)=> void;
}

const Pagination = ({ currentPage, totalPages, pageNumbers, setCurrentPage }: PaginationProps) => {
  return (
    <div className="relative flex gap-2 mt-10 justify-center">
      <button
        onClick={() => setCurrentPage(1)}
        className={`px-2 py-1 rounded-md hover:bg-background-secondary text-sub ${
          currentPage === 1 ? 'opacity-50 hover:bg-transparent pointer-events-none' : ''
        }`}
      >
        <ChevronsLeft className='size-4' />
      </button>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-2 py-1 rounded-md hover:bg-background-secondary text-sub ${
          currentPage === 1 ? 'opacity-50 hover:bg-transparent pointer-events-none' : ''
        }`}
      >
        <ChevronLeft className='size-4' />
      </button>

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => setCurrentPage(pageNumber)}
          className={`w-8 y-8 py-1 rounded-md text-sub hover:bg-accent hover:text-white ${
            pageNumber === currentPage ? 'bg-accent text-white pointer-events-none' : ''
          }`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-2 py-1 rounded-md hover:bg-background-secondary text-sub ${
          currentPage === totalPages ? 'opacity-50 hover:bg-transparent pointer-events-none' : ''
        }`}
      >
        <ChevronRight className='size-4' />
      </button>
      <button
        onClick={() => setCurrentPage(totalPages)}
        className={`px-2 py-1 rounded-md hover:bg-background-secondary text-sub ${
          currentPage === totalPages ? 'opacity-50 hover:bg-transparent pointer-events-none' : ''
        }`}
      >
        <ChevronsRight className='size-4' />
      </button>
    </div>
  );
};

export default Pagination;