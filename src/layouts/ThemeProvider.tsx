'use client';

import { ThemeProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { useEffect } from 'react';

const ThemeLayout = ({
  children,
  ...props
}: ThemeProviderProps) => {
  useEffect(() => {
    const isMac = /Mac|iPhone|iPad/i.test(navigator.userAgent);
    document.documentElement.classList.add(isMac ? 'mac' : 'windows');
  }, []);

  return (
    <ThemeProvider attribute='class' defaultTheme='system' {...props}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeLayout;