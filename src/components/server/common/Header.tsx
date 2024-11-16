'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Search } from 'lucide-react';
import ScrollDirectionHandler from '@/components/client/common/ScrollDirectionHandler';
import LogoAnimation from '@/components/client/common/LogoAnimation';
import ThemeSwitch from '@/components/client/theme/ThemeSwitch';

const Header = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <>
      <ScrollDirectionHandler />
      <header className='fixed left-0 top-0 z-50 w-full bg-background transition-transform duration-1000 ease-in-out' style={{ transform: 'translateY(var(--header-transform, 0))' }}>
        <div className='mx-auto flex justify-center max-w-6xl items-center p-3 md:px-6 lg:px-8'>
          <div className='w-full flex justify-end items-center'>
            {!isHomePage && (
              <>
                <Link href='/'>
                  <LogoAnimation />
                </Link>
                <Link href='/' className='flex rounded-md p-2 ml-3 mr-1 hover:bg-background-secondary duration-300'>
                  <Search className='size-4' />
                </Link>
              </>
            )}
            <ThemeSwitch />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
