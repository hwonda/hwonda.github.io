'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Lightbulb } from 'lucide-react';

interface SearchInputProps {
  suggestions?: string[];
  tip?: boolean;
}

const SearchInput = ({ suggestions, tip = true }: SearchInputProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSuggestions = suggestions?.filter((suggestion) =>
    suggestion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.relatedTarget || !(e.relatedTarget as HTMLElement).closest('.suggestions-modal')) {
      setIsModalOpen(false);
    }
  };

  const redirect = (e: React.KeyboardEvent<HTMLInputElement>, term: string) => {
    if (e.key === 'Enter') {
      window.location.href = `/posts?q=${ term
        .trim()
        .split(' ')
        .join('+') }`;
    }
  };

  return (
    <div className="relative w-full z-[1]">
      <div className="flex items-center border border-light rounded-md focus-within:border-accent bg-background">
        <Search className="ml-3 text-main" />
        <input
          type="text"
          ref={inputRef}
          value={searchTerm}
          placeholder="검색어를 입력하세요"
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsModalOpen(true)}
          onBlur={handleBlur}
          onKeyDown={(e) => redirect(e, searchTerm)}
          className="w-full p-2 pl-3 bg-background outline-none text-main rounded-md"
        />
      </div>
      {tip && (
        <div className="w-full flex flex-col bg-extreme-light text-sub rounded-xl mt-4 p-4 gap-3">
          <span className="flex items-center text-main gap-2">
            <Lightbulb className="size-5" />
            {'검색 팁'}
          </span>
          <div className='hidden sm:block'>
            <span className="flex flex-wrap items-center gap-1 sm:gap-1 ml-6">
              <span className="flex items-center gap-1">
                <span className="border border-light p-[3px_8px_2px_7px] rounded-md">{'Ctrl'}</span>
                <span className="font-semibold">{'+'}</span>
                <span className="border border-light px-2.5 py-0.5 pt-[3px] rounded-md">{'K'}</span>
              </span>
              <span className="text-sub sm:mx-1">{'또는'}</span>
              <span className="flex items-center gap-1">
                <span className="border border-light px-3.5 pt-0.5 rounded-md text-sub text-[18px]">
                  {'⌘'}
                </span>
                <span className="font-semibold">{'+'}</span>
                <span className="border border-light px-2.5 py-0.5 pt-[3px] rounded-md">{'K'}</span>
              </span>
              <span className="block mt-2 sm:mt-0 text-sub">
                {'를 눌러 검색창에 직접 이동할 수 있습니다.'}
              </span>
            </span>
          </div>

          <div className='ml-6'>
            <strong>{'용어'}</strong>
            {'나 '}
            <strong>{'설명'}</strong>
            {' 외에도'}
            <strong>{'사용 사례, 관련 자료'}</strong>
            {' 또한 검색할 수 있습니다.'}
          </div>
        </div>
      )}
      {isModalOpen && (
        <div
          className="absolute top-12 mt-2 w-full border border-light rounded-md shadow-lg max-h-60 overflow-y-auto suggestions-modal animate-slideDown bg-background opacity-100"
        >
          {filteredSuggestions && filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSearchTerm(suggestion);
                  setIsModalOpen(false);
                }}
              >
                {suggestion}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-sub bg-background min-h-56">{'검색어 추천'}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
