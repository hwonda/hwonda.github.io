import Link from 'next/link';
// import { Search } from 'lucide-react';
import ScrollDirectionHandler from '@/components/client/common/ScrollDirectionHandler';
import LogoAnimation from '@/components/client/common/LogoAnimation';
import ThemeSwitch from '@/components/client/theme/ThemeSwitch';

const Header = () => {
  return (
    <>
      <ScrollDirectionHandler />
      <header className='fixed left-0 top-0 z-50 w-full bg-background transition-transform duration-1000 ease-in-out' style={{ transform: 'translateY(var(--header-transform, 0))' }}>
        <div className='mx-auto flex justify-center max-w-6xl items-center p-3 md:px-6 lg:px-8'>
          <div className='w-full flex justify-end gap-3 items-center'>
            <Link href='/posts'>
              <LogoAnimation />
            </Link>
            {/* 검색버튼 */}
            {/* <button className='flex rounded-md p-2 hover:bg-background-secondary duration-300'>
              <Search className='size-4' />
            </button> */}
            <ThemeSwitch />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
