import { SortType, SortDirection } from '@/types';
import { Dropdown, DropdownTrigger, DropdownList, DropdownItem } from '@/components/ui/Dropdown';
import { ArrowUpDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '@/store/pageSlice';
import { RootState } from '@/store';
import { useSearchParams } from 'next/navigation';

const sortTypeLabel: Record<SortType, { label: string; desc: string; asc?: string }> = {
  created: { label: '발행일', desc: '최신순', asc: '과거순' },
  updated: { label: '수정일', desc: '최신순', asc: '과거순' },
  difficulty: { label: '난이도', desc: '높은순', asc: '낮은순' },
  relevance: { label: '관련도', desc: '높은순' },
};

const SortButtons = () => {
  const dispatch = useDispatch();
  const { sortType, sortDirection } = useSelector((state: RootState) => state.page);
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const handleSortChange = (type: SortType) => {
    const newDirection = type === sortType
      ? (sortDirection === 'desc' ? 'asc' : 'desc')
      : 'desc';
    dispatch(setSort({ type, direction: newDirection }));
  };

  const handleSortMobile = (type: SortType, direction: SortDirection) => {
    dispatch(setSort({ type, direction }));
  };

  const getSortText = (type: SortType) => {
    if (type === 'relevance' && sortType === 'relevance') return '높은순';
    if (sortType !== type) return '';
    return sortDirection === 'asc' ? sortTypeLabel[type].asc : sortTypeLabel[type].desc;
  };

  const renderSortButton = (type: SortType) => (
    <button
      onClick={() => handleSortChange(type)}
      className={`group shrink-0 flex items-center text-sm gap-0.5 
        ${ sortType === type ? 'text-primary' : 'text-gray1' }
        ${ type === 'relevance' && sortType === 'relevance' ? 'pointer-events-none' : '' }
      `}
    >
      {type === sortType && <ArrowUpDown className='text-primary size-4 group-hover:text-accent' />}
      <span className={`${ type === 'relevance' ? '' : 'group-hover:text-accent' }`}>{sortTypeLabel[type].label}</span>
      <span className={`${ type === 'relevance' ? '' : 'group-hover:text-accent' }`}>{getSortText(type)}</span>
    </button>
  );

  const sortTypes: SortType[] = query
    ? ['relevance', 'created', 'updated', 'difficulty']
    : ['created', 'updated', 'difficulty'];

  const getMobileDropdownItems = () => {
    return sortTypes.flatMap((type) => [
      {
        type,
        direction: 'desc' as SortDirection,
        label: `${ sortTypeLabel[type].label } ${ sortTypeLabel[type].desc }`,
      },
      {
        type,
        direction: 'asc' as SortDirection,
        label: `${ sortTypeLabel[type].label } ${ sortTypeLabel[type].asc }`,
      },
    ]);
  };

  return (
    <div className="flex items-center gap-2">
      {/* 모바일에서는 드롭다운으로 표시 */}
      <div className="md:hidden">
        <Dropdown>
          <DropdownTrigger>
            <button className="flex items-center gap-1 px-2 py-1 text-sm rounded-full border border-primary text-primary">
              <ArrowUpDown className='size-4' />
              <span>{sortTypeLabel[sortType].label} {getSortText(sortType)}</span>
            </button>
          </DropdownTrigger>
          <DropdownList align='end'>
            {getMobileDropdownItems().map((item, index) => (
              <DropdownItem
                key={index}
                onClick={() => {
                  handleSortMobile(item.type, item.direction);
                }}
                className={sortType === item.type && sortDirection === item.direction ? 'text-primary' : ''}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{item.label}</span>
                  <span>{sortType === item.type && sortDirection === item.direction ? '•' : ''}</span>
                </div>
              </DropdownItem>
            ))}
          </DropdownList>
        </Dropdown>
      </div>

      {/* 데스크톱에서는 버튼으로 표시 */}
      <div className="hidden md:flex md:flex-wrap items-center md:gap-1">
        {sortTypes.map((type, index) => (
          <div key={type} className='flex items-center gap-0.5'>
            {renderSortButton(type)}
            {index !== sortTypes.length - 1 && <span className='text-light'>{'•'}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortButtons;