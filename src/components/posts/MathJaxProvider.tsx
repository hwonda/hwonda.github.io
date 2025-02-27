'use client';

import { ReactNode } from 'react';
import { MathJaxContext } from 'better-react-mathjax';

interface MathJaxProviderProps {
  children: ReactNode;
}

const mathJaxConfig = {
  loader: { load: ['[tex]/html'] },
  tex: {
    packages: { '[+]': ['html'] },
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)'],
    ],
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]'],
    ],
  },
};

export function MathJaxProvider({ children }: MathJaxProviderProps) {
  return (
    <MathJaxContext config={mathJaxConfig}>
      {children}
    </MathJaxContext>
  );
}
