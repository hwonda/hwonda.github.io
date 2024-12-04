'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ScrollDirectionHandler from '@/components/common/ScrollDirectionHandler';
import ThemeSwitch from '@/components/theme/ThemeSwitch';

const Header = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <>
      <ScrollDirectionHandler />
      <header className='fixed left-0 top-0 z-50 w-full bg-background opacity-75 hover:opacity-100 transition-transform duration-1000 ease-in-out' style={{ transform: 'translateY(var(--header-transform, 0))' }}>
        <div className='mx-auto flex justify-center max-w-6xl items-center p-3 md:px-6 lg:px-8'>
          <div className='w-full flex justify-end items-center gap-3'>
            {!isHomePage && (
              <Link href='/'>
                <span className='h-full flex items-center text-3xl font-bold'>
                  <span className='text-primary'>{'D'}</span>
                  {'iki'}
                </span>
              </Link>
            )}
            <ThemeSwitch />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
