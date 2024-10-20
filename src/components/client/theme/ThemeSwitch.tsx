'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import {
  Dropdown,
  DropdownList,
  DropdownItem,
  DropdownTrigger,
} from '@/components/client/ui/Dropdown';
import { LucideIcon, Dot, Monitor, Moon, Sun } from 'lucide-react';

interface DropdownItemProps {
  newTheme: string;
  label: string;
  Icon: LucideIcon;
}

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const ThemeItem = ({ newTheme, Icon, label }: DropdownItemProps) => (
    <DropdownItem onClick={() => setTheme(newTheme)}>
      <div className='flex w-full items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Icon width={14} />
          {label}
        </div>
        {theme === newTheme && <Dot className='text-end' />}
      </div>
    </DropdownItem>
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <button className='flex rounded-md p-2 button-bg-gray'>
          <Sun className='size-5 rotate-180 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute size-5 rotate-180 scale-0 transition-all dark:rotate-0 dark:scale-100' />
        </button>
      </DropdownTrigger>
      <DropdownList align='end'>
        <ThemeItem newTheme='light' label='Light' Icon={Sun} />
        <ThemeItem newTheme='dark' label='Dark' Icon={Moon} />
        <ThemeItem newTheme='system' label='System' Icon={Monitor} />
      </DropdownList>
    </Dropdown>
  );
};

export default ThemeSwitch;
