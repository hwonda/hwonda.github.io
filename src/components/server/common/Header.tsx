import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Search } from 'lucide-react';
import LogoAnimation from '@/components/client/common/LogoAnimation';

// ThemeSwitch를 클라이언트 컴포넌트로 동적 로딩
const ThemeSwitch = dynamic(
  () => import('@/components/client/theme/ThemeSwitch'),
  { ssr: false }
);

const ScrollDirectionHandler = dynamic(
  () => import('@/components/client/common/ScrollDirectionHandler'),
  { ssr: false }
);

const Header = () => {
  return (
    <>
      <ScrollDirectionHandler />
      <header className='fixed left-0 top-0 z-50 w-full bg-background opacity-100 sm:opacity-80 hover:opacity-100 transition-transform duration-300 ease-in-out' style={{ transform: 'translateY(var(--header-transform, 0))' }}>
        <div className='mx-auto flex justify-center max-w-6xl items-center p-3 md:px-6 lg:px-8'>
          <div className='w-full flex justify-end gap-1 items-center'>
            <Link href='/'>
              <LogoAnimation />
            </Link>
            <button className='flex rounded-md p-2 hover:bg-background-secondary duration-300'>
              <Search className='size-4' />
            </button>
            <ThemeSwitch />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
