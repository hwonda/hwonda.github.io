'use client';

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { useEffect, useRef } from 'react';
import { Search, ChevronLeft } from 'lucide-react';
import Slider from '@/components/ui/Slider';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  setActiveModal,
  setSearchQuery,
  setComplexRange,
  setPublishedDateRange,
  setModifiedDateRange,
  setSelectedQuickSelect,
  setSelectedModifiedQuickSelect,
  setSelectedComplexQuickSelect,
} from '@/store/searchSlice';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { ko } from 'date-fns/locale';

const levels = ['기초', '초급', '중급', '고급', '전문'];
const relevanceLevels = ['희박', '낮음', '보통', '높음', '밀접'];
interface ComplexRange {
  level: [number, number];
  DS: [number, number];
  DE: [number, number];
  DA: [number, number];
}

const SearchDetailInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { terms } = useSelector((state: RootState) => state.terms);
  const {
    searchQuery,
    activeModal,
    complexRange,
    publishedDateRange,
    modifiedDateRange,
    // selectedQuickSelect,
    // selectedModifiedQuickSelect,
    // selectedComplexQuickSelect,
    hasInteractedPublished,
    hasInteractedModified,
    hasInteractedComplex,
  } = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);
  const query = searchParams.get('q') || '';
  const placeholder = terms.length ? `${ terms.length }개의 데이터 용어 검색` : '검색어 입력해주세요';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    dispatch(setSearchQuery(query));

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch, query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        activeModal
        && !(e.target as Element).closest('.filter-modal')
        && !(e.target as Element).closest('[class*="group flex"]')
      ) {
        dispatch(setActiveModal(null));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeModal, dispatch]);

  const redirect = (e: React.KeyboardEvent<HTMLInputElement>, term: string) => {
    if (e.key === 'Enter') {
      router.push(`/posts?q=${ term.trim().split(' ').join('+') }`);
    }
  };

  const handleFilterClick = (modalName: string) => {
    dispatch(setActiveModal(modalName));

    if (modalName === 'searchQuery' && activeModal === modalName) {
      inputRef.current?.blur();
    }
  };

  const handleComplexRangeChange = (type: keyof ComplexRange, newRange: [number, number]) => {
    dispatch(setComplexRange({ type, newRange }));

    // 현재 변경된 range를 포함한 모든 range가 전체 범위(0-4)인지 확인
    const updatedComplexRange = {
      ...complexRange,
      [type]: newRange,
    };

    const isAllRangesDefault = Object.values(updatedComplexRange).every(
      (range) => range[0] === 0 && range[1] === 4
    );

    // 모든 range가 전체 범위면 'all', 아니면 null로 설정
    dispatch(setSelectedComplexQuickSelect(isAllRangesDefault ? 'all' : null));
  };

  const handleDateChange = (dates: [Date | null, Date | null], type: 'published' | 'modified') => {
    if (type === 'published') {
      dispatch(setPublishedDateRange(dates));
      dispatch(setSelectedQuickSelect(null));
    } else {
      dispatch(setModifiedDateRange(dates));
      dispatch(setSelectedModifiedQuickSelect(null));
    }
  };

  const formatDateRange = (range: [Date | null, Date | null]) => {
    if (!range[0]) return '전체 기간';

    const formatDate = (date: Date) => {
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${ year }.${ month }.${ day }`;
    };

    if (!range[1] || range[0].getTime() === range[1].getTime()) {
      return formatDate(range[0]);
    }
    return `${ formatDate(range[0]) } - ${ formatDate(range[1]) }`;
  };

  // const handleQuickSelect = (type: 'all' | 'week' | 'month', dateType: 'published' | 'modified') => {
  //   if (dateType === 'published') {
  //     dispatch(setSelectedQuickSelect(type));
  //   } else {
  //     dispatch(setSelectedModifiedQuickSelect(type));
  //   }

  //   const today = new Date();
  //   const startDate = new Date();

  //   switch (type) {
  //     case 'week':
  //       startDate.setDate(today.getDate() - 7);
  //       break;
  //     case 'month':
  //       startDate.setMonth(today.getMonth() - 1);
  //       break;
  //     case 'all':
  //       if (dateType === 'published') {
  //         dispatch(setPublishedDateRange([null, null]));
  //       } else {
  //         dispatch(setModifiedDateRange([null, null]));
  //       }
  //       return;
  //   }

  //   const newRange: [Date, Date] = [startDate, today];
  //   if (dateType === 'published') {
  //     dispatch(setPublishedDateRange(newRange));
  //   } else {
  //     dispatch(setModifiedDateRange(newRange));
  //   }
  //   dispatch(setActiveModal(null));
  // };

  const formatComplexRange = () => {
    const isDefault = Object.values(complexRange).every(
      (range) => range[0] === 0 && range[1] === 4
    );

    if (isDefault) return '전체';
    return '복합적';
  };

  const datePickerCustomStyles = `
    .react-datepicker {
      border-color: var(--background) !important;
    }
    .react-datepicker__day:hover {
      background-color: var(--gray3) !important;
      color: var(--text) !important;
    }
    .react-datepicker__month-container {
        // width: 278px;
        background-color: var(--background);
        // border-radius: 5px;
    }
    .react-datepicker__header {
      background-color: var(--background);
      border-bottom: 1px solid var(--background);
      align-items: center;
    }
    .react-datepicker__current-month{
      margin-top: -1px !important;
      color: var(--text-secondary);
    }
    .react-datepicker__day-name,
    .react-datepicker__day {
      color: var(--text);
    }
    .react-datepicker__day--outside-month {
      color: var(--gray3) !important;
    }
    .react-datepicker__day--selected,
    .react-datepicker__day--in-range {
      background-color: var(--background-secondary) !important;
    }
    .react-datepicker__day--in-selecting-range {
      background-color: var(--background-secondary) !important;
    }
    .react-datepicker__day--keyboard-selected {
      background-color: var(--background);
    }
    .react-datepicker__day--today {
      color: var(--primary) !important;
    }
  `;

  const buildSearchUrl = () => {
    const params = new URLSearchParams();

    // q 있으면 추가
    if (searchQuery.trim()) {
      params.append('q', searchQuery.trim());
    }

    const isAllSelected = (range: [number, number]) => range[0] === 0 && range[1] === 4;

    if (!Object.values(complexRange).every(isAllSelected)) {
      const complexParams = Object.entries(complexRange)
        .filter(([, range]) => !isAllSelected(range))
        .map(([key, range]) => {
          return `${ key.toLowerCase() }-${ range[0] }-${ range[1] }`;
        })
        .join('_');
      if (complexParams) {
        params.append('f', complexParams);
      }
    }

    const formatDateParam = (date: Date | null) => {
      if (!date) return '';
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${ year }${ month }${ day }`;
    };

    if (publishedDateRange[0] || publishedDateRange[1]) {
      const publishedParam = `${ formatDateParam(publishedDateRange[0]) }-${ formatDateParam(publishedDateRange[1]) }`;
      params.append('p', publishedParam);
    }

    if (modifiedDateRange[0] || modifiedDateRange[1]) {
      const modifiedParam = `${ formatDateParam(modifiedDateRange[0]) }-${ formatDateParam(modifiedDateRange[1]) }`;
      params.append('m', modifiedParam);
    }

    const queryString = params.toString();
    return `/posts${ queryString ? `?${ queryString }` : '' }`;
  };

  const handleSearch = () => {
    const searchUrl = buildSearchUrl();
    router.push(searchUrl);
  };

  // const handleComplexAllSelect = () => {
  //   handleComplexRangeChange('level', [0, 4]);
  //   handleComplexRangeChange('DS', [0, 4]);
  //   handleComplexRangeChange('DE', [0, 4]);
  //   handleComplexRangeChange('DA', [0, 4]);
  //   dispatch(setSelectedComplexQuickSelect('all'));
  // };

  return (
    <>
      {/* <div className='flex flex-col gap-1'>
        <div>{'searchQuery: '}{searchQuery}</div>
        <div>{'activeModal: '}{activeModal}</div>
        <div>{'hasInteractedComplex: '}{hasInteractedComplex}</div>
        <div>{'selectedQuickSelect: '}{selectedQuickSelect}</div>
        <div>{'selectedModifiedQuickSelect: '}{selectedModifiedQuickSelect}</div>
        <div>{'complexRange: '}{JSON.stringify(complexRange)}</div>
        <div>{'publishedDateRange: '}{JSON.stringify(publishedDateRange)}</div>
        <div>{'modifiedDateRange: '}{JSON.stringify(modifiedDateRange)}</div>
        <div>{'selectedComplexQuickSelect: '}{selectedComplexQuickSelect}</div>
      </div> */}
      <style>{datePickerCustomStyles}</style>
      <div className="relative w-full mt-2 mb-10">
        <div className={`w-full flex items-center border border-light rounded-full shadow-md dark:shadow-gray4 bg-background ${ activeModal ? 'border-primary' : '' }`}>
          <div className='ml-3'>
            <Link
              href="/"
              className='flex items-center justify-center size-11 rounded-full hover:bg-gray3'
            >
              <ChevronLeft className='size-5' />
            </Link>
          </div>
          <div className="w-full grid grid-cols-[3.5fr_1.6fr_2fr_2.5fr] items-center">
            {/* 검색어 */}
            <div
              onClick={() => handleFilterClick('searchQuery')}
              className='peer/search group flex flex-col py-3 px-4 rounded-full'
            >
              <label htmlFor="searchQuery" className={`text-xs text-main group-hover:cursor-pointer group-hover:text-primary ${ activeModal === 'searchQuery' ? 'text-primary' : '' }`}>
                {'검색어'}
              </label>
              <input
                id="searchQuery"
                type="text"
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                onKeyDown={(e) => redirect(e, searchQuery)}
                placeholder={placeholder}
                className="bg-transparent focus:outline-none placeholder:text-gray1 text-main"
              />
            </div>

            {/* 난이도 / 연관도 */}
            <div
              onClick={() => handleFilterClick('complex')}
              className={`peer/complex group hidden lg:flex flex-col py-3 px-6 rounded-full relative cursor-pointer
                before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-px before:bg-gray2
                ${ activeModal === 'complex' ? 'before:bg-primary' : '' }
                ${ activeModal === 'searchQuery' ? 'before:bg-primary' : '' }
                `}
            >
              <label htmlFor="complex" className={`text-xs text-main group-hover:cursor-pointer group-hover:text-primary ${ activeModal === 'complex' ? 'text-primary' : '' }`}>
                {'난이도 / 직무 연관도'}
              </label>
              <span className={`${ hasInteractedComplex ? 'text-main' : 'text-gray1' } group-hover:cursor-pointer text-sm`}>
                {formatComplexRange()}
              </span>
              {activeModal === 'complex' && (
                <div className="filter-modal absolute top-full left-0 mt-2 min-w-72 border border-primary bg-background shadow-lg dark:shadow-gray5 rounded-lg p-4 z-10">
                  <div className="flex flex-col pr-4">
                    <span className="text-sm font-medium">{'난이도'}</span>
                    <div className='flex justify-end mt-[-6px]'>
                      <div className='w-[178px]'>
                        <Slider
                          displayLevels={levels}
                          range={complexRange.level}
                          onRangeChange={(newRange: [number, number]) => handleComplexRangeChange('level', newRange)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-[60px_1fr] items-center pr-4">
                    <span className="col-span-2 text-sm font-medium">{'직무 연관도'}</span>
                    <span className="text-sm flex justify-center mt-1 ml-[-6px]">{'DA'}</span>
                    <Slider
                      displayLevels={relevanceLevels}
                      range={complexRange.DA}
                      onRangeChange={(newRange: [number, number]) => handleComplexRangeChange('DA', newRange)}
                    />
                    <span className="text-sm flex justify-center mt-1 ml-[-6px]">{'DS'}</span>
                    <Slider
                      displayLevels={relevanceLevels}
                      range={complexRange.DS}
                      onRangeChange={(newRange: [number, number]) => handleComplexRangeChange('DS', newRange)}
                    />
                    <span className="text-sm flex justify-center mt-1 ml-[-6px]">{'DE'}</span>
                    <Slider
                      displayLevels={relevanceLevels}
                      range={complexRange.DE}
                      onRangeChange={(newRange: [number, number]) => handleComplexRangeChange('DE', newRange)}
                    />
                  </div>
                  {/* <div className="flex justify-end mt-1.5">
                    <button
                      onClick={handleComplexAllSelect}
                      className={`px-2 py-0.5 text-sm rounded-full border transition-colors hover:bg-background-secondary ${
                        selectedComplexQuickSelect === 'all'
                          ? 'border-primary text-primary'
                          : 'border-gray2 text-gray0 hover:text-primary hover:border-primary'
                      }`}
                    >
                      {'전체 선택'}
                    </button>
                  </div> */}
                </div>
              )}
            </div>

            {/* 발행일 */}
            <div
              onClick={() => handleFilterClick('publishedDate')}
              className={`peer/published group hidden lg:flex flex-col py-3 px-6 rounded-full relative cursor-pointer
                before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-px before:bg-gray2
                ${ activeModal === 'publishedDate' ? 'before:bg-primary' : '' }
                ${ activeModal === 'complex' ? 'before:bg-primary' : '' }
                `}
            >
              <label htmlFor="publishedDate" className={`text-xs text-main group-hover:cursor-pointer group-hover:text-primary ${ activeModal === 'publishedDate' ? 'text-primary' : '' }`}>
                {'발행일'}
              </label>
              <span className={`${
                hasInteractedPublished ? 'text-main' : 'text-gray1'
              } group-hover:cursor-pointer text-sm truncate`}
              >
                {formatDateRange(publishedDateRange)}
              </span>
              {activeModal === 'publishedDate' && (
                <div className="filter-modal absolute top-full left-0 mt-2 w-64 border border-primary bg-background shadow-lg dark:shadow-gray5 rounded-lg p-3.5 z-10">
                  <div className="text-sm font-medium mb-2.5">{'발행일'}</div>
                  {/* <div className="h-px bg-gray3 mt-3 mb-1" /> */}
                  <div className="flex justify-center">
                    <DatePicker
                      selected={publishedDateRange[0]}
                      onChange={(dates) => handleDateChange(dates as [Date | null, Date | null], 'published')}
                      startDate={publishedDateRange[0]}
                      endDate={publishedDateRange[1]}
                      selectsRange
                      calendarClassName="dark:bg-background"
                      locale={ko}
                      inline
                    />
                  </div>
                  {/* <div className="grid grid-cols-3 gap-1">
                    <button
                      onClick={() => handleQuickSelect('all', 'published')}
                      className={`px-1 py-0.5 text-sm rounded-full border transition-colors hover:bg-background-secondary ${
                        (selectedQuickSelect === 'all' && !publishedDateRange[0])
                          ? 'border-primary text-primary'
                          : 'border-gray2 text-gray0 hover:text-primary hover:border-primary'
                      }`}
                    >
                      {'전체 기간'}
                    </button>
                    <button
                      onClick={() => handleQuickSelect('week', 'published')}
                      className={`px-1 py-0.5 text-sm rounded-full border transition-colors hover:bg-background-secondary ${
                        selectedQuickSelect === 'week'
                          ? 'border-primary text-primary'
                          : 'border-gray2 text-gray0 hover:text-primary hover:border-primary'
                      }`}
                    >
                      {'최근 1주'}
                    </button>
                    <button
                      onClick={() => handleQuickSelect('month', 'published')}
                      className={`px-1 py-0.5 text-sm rounded-full border transition-colors hover:bg-background-secondary ${
                        selectedQuickSelect === 'month'
                          ? 'border-primary text-primary'
                          : 'border-gray2 text-gray0 hover:text-primary hover:border-primary'
                      }`}
                    >
                      {'최근 1달'}
                    </button>
                  </div> */}
                </div>
              )}
            </div>

            {/* 수정일 */}
            <div
              onClick={() => handleFilterClick('modifiedDate')}
              className={`group hidden lg:flex justify-between items-center py-3 pl-6 pr-3 rounded-full cursor-pointer relative
                before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-px before:bg-gray2
                ${ activeModal === 'modifiedDate' ? 'before:bg-primary' : '' }
                ${ activeModal === 'publishedDate' ? 'before:bg-primary' : '' }
                `}
            >
              <div className='flex flex-col group-hover:cursor-pointer'>
                <label htmlFor="modifiedDate" className={`text-xs text-main group-hover:cursor-pointer group-hover:text-primary ${ activeModal === 'modifiedDate' ? 'text-primary' : '' }`}>
                  {'수정일'}
                </label>
                <span className={`${
                  hasInteractedModified ? 'text-main' : 'text-gray1'
                } group-hover:cursor-pointer text-sm truncate`}
                >
                  {formatDateRange(modifiedDateRange)}
                </span>
              </div>
              {activeModal === 'modifiedDate' && (
                <div className="filter-modal absolute top-full right-0 mt-2 w-64 border border-primary bg-background shadow-lg dark:shadow-gray5 rounded-lg p-3.5 z-10">
                  <div className="text-sm font-medium mb-2.5">{'수정일'}</div>
                  {/* <div className="grid grid-cols-3 gap-1">
                    <button
                      onClick={() => handleQuickSelect('all', 'modified')}
                      className={`px-1 py-0.5 text-sm rounded-full border transition-colors hover:bg-background-secondary ${
                        (selectedModifiedQuickSelect === 'all' && !modifiedDateRange[0])
                          ? 'border-primary text-primary'
                          : 'border-gray2 text-gray0 hover:text-primary hover:border-primary'
                      }`}
                    >
                      {'전체 기간'}
                    </button>
                    <button
                      onClick={() => handleQuickSelect('week', 'modified')}
                      className={`px-1 py-0.5 text-sm rounded-full border transition-colors hover:bg-background-secondary ${
                        selectedModifiedQuickSelect === 'week'
                          ? 'border-primary text-primary'
                          : 'border-gray2 text-gray0 hover:text-primary hover:border-primary'
                      }`}
                    >
                      {'최근 1주'}
                    </button>
                    <button
                      onClick={() => handleQuickSelect('month', 'modified')}
                      className={`px-1 py-0.5 text-sm rounded-full border transition-colors hover:bg-background-secondary ${
                        selectedModifiedQuickSelect === 'month'
                          ? 'border-primary text-primary'
                          : 'border-gray2 text-gray0 hover:text-primary hover:border-primary'
                      }`}
                    >
                      {'최근 1달'}
                    </button>
                  </div> */}
                  {/* <div className="h-px bg-gray3 mt-3 mb-1" /> */}
                  <div className="flex justify-center">
                    <DatePicker
                      selected={modifiedDateRange[0]}
                      onChange={(dates) => handleDateChange(dates as [Date | null, Date | null], 'modified')}
                      startDate={modifiedDateRange[0]}
                      endDate={modifiedDateRange[1]}
                      selectsRange
                      calendarClassName="dark:bg-background"
                      locale={ko}
                      inline
                    />
                  </div>
                </div>
              )}
            </div>
            {/* 검색 버튼 */}
            <div className='absolute right-3 top-1/2 -translate-y-1/2'>
              <button
                onClick={handleSearch}
                className="flex items-center justify-center size-11 rounded-full hover:bg-[#03537f] bg-primary"
              >
                <Search className="text-white size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchDetailInput;
