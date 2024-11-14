'use client';

import { createContext, useState, ReactNode } from 'react';

export const DropdownContext = createContext({
  isOpen: false,
  toggle: () => {},
  close: () => {},
});

export const DropdownProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close }}>
      <div className='relative inline-block text-left'>{children}</div>
    </DropdownContext.Provider>
  );
};
