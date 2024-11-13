import dynamic from 'next/dynamic';
import Link from 'next/link';

// ThemeSwitch를 클라이언트 컴포넌트로 동적 로딩
const ThemeSwitch = dynamic(
  () => import('@/components/client/theme/ThemeSwitch'),
  { ssr: false }
);

// const CollapseMenu = dynamic(
//   () => import('@/components/client/common/CollapseMenu'),
//   { ssr: false }
// );

const Header = () => {
  // const navItems = [
  //   { href: '/1', label: '메뉴1' },
  //   { href: '/2', label: '메뉴2' },
  // ];

  return (
    <header className='fixed left-0 top-0 z-50 w-full border-b border-secondary bg-background opacity-100 sm:opacity-80 hover:opacity-100'>
      <div className='mx-auto flex justify-between sm:grid sm:grid-cols-2 max-w-6xl items-center p-3 md:px-6 lg:px-8'>
        <Link href='/'>
          <h1 className='text-3xl font-bold font-noto text-primary'>{'Diki'}</h1>
        </Link>
        {/* <div className='hidden sm:flex justify-center'>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className='mx-3'>
              {item.label}
            </Link>
          ))}
        </div> */}
        <div className='flex justify-end items-center gap-2'>
          <div>
            <ThemeSwitch />
          </div>
          {/* <div className='block sm:hidden'>
            <CollapseMenu navItems={navItems} />
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
