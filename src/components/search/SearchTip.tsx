'use client';

import { Lightbulb } from 'lucide-react';

const SearchTip = () => {
  return (
    <div className="w-[calc(100%-16px)] flex flex-col text-sub bg-extreme-light rounded-xl m-2 p-4 gap-1 sm:gap-2">
      <span className="flex items-center text-main gap-1 sm:gap-2">
        <Lightbulb className="size-4" />
        <span className='text-base font-semibold'>{'검색 팁'}</span>
      </span>
      <div className='hidden sm:block text-sm'>
        <span className="flex flex-wrap items-center gap-1 sm:gap-1 ml-5 sm:ml-6">
          <span className="hidden windows:flex items-center gap-1">
            <span className="border border-light p-[3px_8px_2px_7px] rounded-md text-base">{'Ctrl'}</span>
            <span className="font-semibold">{'+'}</span>
            <span className="border border-light px-2.5 py-0.5 pt-[3px] rounded-md text-base">{'K'}</span>
          </span>
          <span className="hidden mac:flex items-center gap-1">
            <span className="w-[43px] h-[31px] flex justify-center border border-light px-2.5 pt-[3px] rounded-md text-sub text-base">
              {'⌘'}
            </span>
            <span className="font-semibold">{'+'}</span>
            <span className="border border-light px-2.5 py-0.5 pt-[3px] rounded-md text-base">{'K'}</span>
          </span>
          <span className="block mt-2 sm:mt-0 text-sub">
            {' 를 눌러 검색창에 직접 이동할 수 있습니다.'}
          </span>
        </span>
      </div>

      <div className='ml-5 sm:ml-6 text-sm'>
        <strong>{'용어'}</strong>
        {'나 '}
        <strong>{'설명'}</strong>
        {' 외에도'}
        <strong>{' 사용 사례, 관련 자료'}</strong>
        {' 또한 검색할 수 있습니다.'}
      </div>
    </div>
  );
};

export default SearchTip;