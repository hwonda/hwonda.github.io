import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx,mdx}'],
  prefix: '',
  plugins: [typography],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)',
        'background': 'var(--background)',
        'background-secondary': 'var(--background-secondary)',
        'accent': 'var(--accent)',
        'main': 'var(--text)',
        'sub': 'var(--text-secondary)',
        'light': 'var(--border)',
      },
      fontFamily: {
        nanum: ['var(--font-nanum)', ...fontFamily.sans],
        coding: ['var(--font-coding)', ...fontFamily.mono],
        noto: ['var(--font-noto)', ...fontFamily.sans],
        pretendard: ['var(--font-pretendard)', ...fontFamily.sans],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            'h1, h2, h3, strong': {
              marginBottom: '0.5rem',
              color: 'var(--text)',
            },
            'p, span, li': {
              color: 'var(--text-secondary)',
            },
            'ul, li': {
              padding: 0,
              margin: 0,
            },
            p: {
              marginTop: '0',
              marginBottom: '0.75rem',
              lineHeight: '1.7',
            },

            '.prose :where(h1):not(:where([class~="not-prose"],[class~="not-prose"] *))': {
              color: 'var(--accent)',
              fontFamily: 'var(--font-noto)',
            },
            '.prose :where(h2):not(:where([class~="not-prose"],[class~="not-prose"] *))': {
              marginTop: '6rem',
              fontSize: '1.2rem',
              fontWeight: 'semibold',
              // fontFamily: 'var(--font-noto)',
            },
            '.prose :where(h3):not(:where([class~="not-prose"],[class~="not-prose"] *))': {
              fontSize: '1.05rem',
            },
            '.prose :where(a):not(:where([class~="not-prose"],[class~="not-prose"] *))': {
              color: 'var(--accent)',
              textDecoration: 'none',
              fontWeight: 'bold',
            },
            '.prose :where(a):not(:where([class~="not-prose"],[class~="not-prose"] *)):hover': {
              color: 'var(--accent)',
              textDecoration: 'underline',
            },
            '.prose :where(ul > li):not(:where([class~="not-prose"],[class~="not-prose"] *))::marker':{
              color: 'var(--background)',
            },
            '.prose .tag-button': {
              color: 'var(--background)',
              backgroundColor: 'var(--accent)',
              padding: '0.15rem 0.5rem',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              marginRight: '0.25rem',
            },
            '.prose .tag-button:hover': {
              backgroundColor: 'var(--primary)',
            },
          },
        },
      },
    },
  },
};
export default config;
