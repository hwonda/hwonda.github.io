'use client';

import { useContext, ReactNode, useRef, useEffect } from 'react';
import {
  DropdownContext,
  DropdownProvider,
} from '@/components/client/ui/DropdownProvider';

const Dropdown = ({ children }: { children: ReactNode }) => {
  return <DropdownProvider>{children}</DropdownProvider>;
};

// DropdownTrigger 컴포넌트
const DropdownTrigger = ({ children }: { children: React.ReactElement }) => {
  const { toggle } = useContext(DropdownContext);

  return <div onClick={toggle}>{children}</div>;
};

// DropdownList 컴포넌트
const DropdownList = ({
  children,
  align = 'start',
}: {
  children: ReactNode;
  align?: 'start' | 'end';
}) => {
  const { isOpen, close } = useContext(DropdownContext);
  const contentRef = useRef<HTMLDivElement>(null);

  // 메뉴 외부를 클릭했을 때 닫기 위한 이벤트 핸들러
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 이벤트 타겟이 HTMLElement인지를 확인하여 타입 안전성 보장
      if (event.target instanceof HTMLElement) {
        // contentRef가 가리키는 요소 외부에서 클릭되었는지 확인
        if (contentRef.current && !contentRef.current.contains(event.target)) {
          close();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [close]);

  return isOpen ? (
    <div
      ref={contentRef}
      className={`absolute flex flex-col p-1 z-50 mt-2 min-w-36 rounded-lg bg-background border border-secondary shadow-lg ring-1 ring-black/5 transition duration-200 ease-out ${
        align === 'end' ? 'right-0' : 'left-0'
      }`}
      onClick={close} // 메뉴 아이템 클릭 시 메뉴를 닫기 위해 사용
    >
      {children}
    </div>
  ) : null;
};

// DropdownItem 컴포넌트
const DropdownItem = ({
  children,
  onClick,
  className,
}: {
  children: React.ReactElement;
  onClick?: ()=> void;
  className?: string;
}) => {
  const { close } = useContext(DropdownContext);

  return (
    <button
      className={`flex w-full justify-center items-center rounded-lg text-left text-sm text-main ${ className }`}
      onClick={() => {
        if (onClick) onClick();
        close();
      }}
    >
      <span className='w-full p-2 rounded-md transition-colors duration-150 ease-in-out hover:bg-background-secondary'>
        {children}
      </span>
    </button>
  );
};

export {
  DropdownContext,
  Dropdown,
  DropdownTrigger,
  DropdownList,
  DropdownItem,
};
