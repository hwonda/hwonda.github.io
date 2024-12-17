'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Filter, CircleHelp } from 'lucide-react';
import SearchTip from '@/components/search/SearchTip';

interface SearchInputProps {
  suggestions?: string[];
  tip?: boolean;
  filter?: boolean;
  termsLength?: number;
}

const SearchInput = ({ suggestions, tip = true, filter = false, termsLength }: SearchInputProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const placeholder = termsLength ? `${ termsLength }개의 데이터 용어사전` : '검색어 입력해주세요';
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

  const handleTipClick = () => {
    if (windowWidth < 640) {
      setShowTip(!showTip);
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center border border-light rounded-md focus-within:border-accent bg-background">
        <Search className="ml-3 text-main" />
        <input
          type="text"
          ref={inputRef}
          value={searchTerm}
          placeholder={placeholder}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsModalOpen(true)}
          onBlur={handleBlur}
          onKeyDown={(e) => redirect(e, searchTerm)}
          className="w-full p-2 pl-3 bg-background outline-none text-main rounded-md"
        />
        {tip && (
          <button
            className={`${ showTip ? 'text-primary' : 'text-light' } group flex items-center mr-3 hover:text-accent`}
            onClick={handleTipClick}
            onMouseEnter={() => windowWidth >= 640 && setShowTip(true)}
            onMouseLeave={() => windowWidth >= 640 && setShowTip(false)}
          >
            <CircleHelp className="size-5" />
          </button>
        )}
        {filter && (
          <button
            onClick={() => setIsFilterActive(!isFilterActive)}
            className={`group flex items-center gap-1 w-16 mr-2 pl-2 py-0.5 rounded-sm shrink-0 text-sub hover:text-primary ${
              isFilterActive ? 'bg-accent text-white hover:text-white' : ''
            }`}
          >
            <Filter className='size-4' />
            <span className=''>{'필터'}</span>
          </button>
        )}
      </div>
      {filter && (
        <div className={`opacity-0 text-sub mt-2 ${ isFilterActive ? 'opacity-100' : '' }`}>
          {'필터:'}
        </div>
      )}
      {showTip && (
        <div className='w-full absolute top-[40px] right-0 animate-slideDown'>
          <SearchTip />
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
