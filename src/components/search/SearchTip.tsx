import { Lightbulb } from 'lucide-react';

const SearchTip = () => {
  return (
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
            <span className="w-[43px] h-[31px] flex justify-center border border-light px-2.5 pt-px rounded-md text-sub text-[18px]">
              {'⌘'}
            </span>
            <span className="font-semibold">{'+'}</span>
            <span className="border border-light px-2.5 py-0.5 pt-[3px] rounded-md">{'K'}</span>
          </span>
          <span className="block mt-2 sm:mt-0 text-sub">
            {' 를 눌러 검색창에 직접 이동할 수 있습니다.'}
          </span>
        </span>
      </div>

      <div className='ml-6'>
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