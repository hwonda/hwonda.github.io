'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setSearchQuery, resetSearchState } from '@/store/searchSlice';
import { setCurrentPage } from '@/store/pageSlice';
import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import SearchTip from '@/components/search/SearchTip';
import { useRouter } from 'next/navigation';
import { searchTerms } from '@/utils/search';
import { setSearchedTerms } from '@/store/termsSlice';
import { TermData } from '@/types';

const SearchInput = () => {
  const dispatch = useDispatch();
  const { terms } = useSelector((state: RootState) => state.terms);
  const { searchQuery } = useSelector((state: RootState) => state.search);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const placeholder = terms.length ? `${ terms.length }개의 데이터 용어 검색` : '검색어 입력해주세요';
  const router = useRouter();
  const [recommendedTerms, setRecommendedTerms] = useState<TermData[]>([]);
  const SUGGESTION_COUNT = 6;
  const debounceDelay = 300;
  let searchTimeout: NodeJS.Timeout;

  useEffect(() => {
    dispatch(resetSearchState());
    dispatch(setCurrentPage(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isModalOpen) {
          setIsModalOpen(false);
        } else {
          inputRef.current?.focus();
          setIsModalOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      if (!e.relatedTarget || !(e.relatedTarget as HTMLElement).closest('.suggestions-modal')) {
        setIsModalOpen(false);
      }
    }, 0);
  };

  const redirect = (e: React.KeyboardEvent<HTMLInputElement>, term: string) => {
    if (e.key === 'Enter') {
      dispatch(setSearchQuery(term));
      router.push(`/posts?q=${ term.trim().split(' ').join('+') }`);
    }
  };

  const handleClickX = () => {
    inputRef.current?.focus();
    dispatch(setSearchQuery(''));
  };

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));

    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const results = searchTerms(query, terms);
      dispatch(setSearchedTerms(results));
      setRecommendedTerms(results.slice(0, SUGGESTION_COUNT));
    }, debounceDelay);
  };

  // const handleSuggestionClick = (term: TermData) => {
  //   const query = term.title?.ko || term.title?.en || '';
  //   dispatch(setSearchQuery(query));
  //   dispatch(setSearchedTerms([term]));
  //   setIsModalOpen(false);
  //   router.push(`/posts?q=${ query.trim().split(' ').join('+') }`);
  // };

  return (
    <div className="relative w-full">
      <div
        className={`flex flex-col ${
          isModalOpen ? 'border border-light rounded-[21px] bg-background focus-within:border-primary' : ''
        }`}
      >
        <div className={`flex items-center px-3 ${
          isModalOpen
            ? ''
            : 'border border-light rounded-full'
        }`}
        >
          <Search className="text-main size-5 shrink-0" />
          <input
            type="text"
            ref={inputRef}
            value={searchQuery}
            placeholder={placeholder}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setIsModalOpen(true)}
            onBlur={handleBlur}
            onKeyDown={(e) => redirect(e, searchQuery)}
            className="w-full p-2 mr-2 outline-none text-main bg-background"
          />
          {searchQuery && (
            <X
              className="text-main size-5 cursor-pointer hover:text-primary rounded-full shrink-0"
              onClick={handleClickX}
            />
          )}
        </div>

        {isModalOpen && (
          <div className="w-full suggestions-modal">
            {searchQuery ? (
              recommendedTerms.length > 0 ? (
                <div className="flex flex-col">
                  {recommendedTerms.map((term, index) => (
                    <div
                      key={term.id}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        router.push(term.url ?? '/not-found');
                      }}
                      className={`
                        flex items-center px-4 py-2 hover:bg-gray4 cursor-pointer
                        ${ index === recommendedTerms.length - 1 ? 'rounded-b-[21px]' : '' }
                      `}
                    >
                      <Search className="text-gray1 size-4 mr-2 shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-sub text-sm">
                          {term.title?.ko || term.title?.en}
                        </span>
                        {term.description?.short && (
                          <span className="text-xs text-gray1 line-clamp-1">
                            {term.description.short}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center px-4 py-10 text-sub">
                  {'검색 결과가 없습니다.'}
                </div>
              )
            ) : (
              <SearchTip />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInput;

