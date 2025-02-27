// import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageNumbers: number[];
  setCurrentPage: (page: number)=> void;
}

const Pagination = ({ currentPage, totalPages, pageNumbers, setCurrentPage }: PaginationProps) => {
  return (
    <div className="relative flex gap-2 my-10 justify-center">
      {/* <button
        onClick={() => setCurrentPage(1)}
        className={`px-2 py-1 rounded-md hover:bg-background-secondary text-gray1 hover:text-main ${
          currentPage === 1 ? 'opacity-0 pointer-events-none' : ''
        }`}
      >
        <ChevronsLeft className='size-4' />
      </button> */}
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-2 py-1 rounded-md hover:bg-background-secondary text-gray1 hover:text-main ${
          currentPage === 1 ? 'text-gray4 pointer-events-none' : ''
        }`}
      >
        <ChevronLeft className='size-4' />
      </button>

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => setCurrentPage(pageNumber)}
          className={`size-8 py-1 rounded-md text-sub border border-transparent hover:border-primary hover:text-main ${
            pageNumber === currentPage ? 'border !border-primary !text-primary pointer-events-none' : ''
          }`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-2 py-1 rounded-md hover:bg-background-secondary text-gray1 hover:text-main ${
          currentPage === totalPages ? 'text-gray4 pointer-events-none' : ''
        }`}
      >
        <ChevronRight className='size-4' />
      </button>
      {/* <button
        onClick={() => setCurrentPage(totalPages)}
        className={`px-2 py-1 rounded-md hover:bg-background-secondary text-gray1 hover:text-main ${
          currentPage === totalPages ? 'opacity-0 pointer-events-none' : ''
        }`}
      >
        <ChevronsRight className='size-4' />
      </button> */}
    </div>
  );
};

export default Pagination;