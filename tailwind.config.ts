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
        'extreme-light': 'var(--extreme-light)',
      },
      fontFamily: {
        nanum: ['var(--font-nanum)', ...fontFamily.sans],
        coding: ['var(--font-coding)', ...fontFamily.mono],
        noto: ['var(--font-noto)', ...fontFamily.sans],
        // pretendard: ['var(--font-pretendard)', ...fontFamily.sans],
        pretendard: ['Pretendard Variable', 'sans'],
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-10%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDownIn: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDownOut: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        intro: {
          '0%': { transform: 'translateY(5px)', opacity: '0' },
          '100%': { transform: 'none', opacity: '1' },
        },
      },
      animation: {
        slideDown: 'slideDown 0.3s ease-in-out',
        slideDownOut: 'slideDownOut 400ms ease-in-out forwards',
        slideDownIn: 'slideDownIn 400ms ease-in-out forwards',
        intro: 'intro 500ms ease-in-out both',
        introSecond: 'intro 1100ms ease-in-out both',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            'h1, h2, h3, strong': {
              color: 'var(--text)',
            },
            'p, span, li': {
              color: 'var(--text-secondary)',
            },
            p: {
              marginTop: '0',
              marginBottom: '0.75rem',
              lineHeight: '1.7',
            },
            section: {
              marginTop: '4rem',
              marginBottom: '4rem',
            },

            '.prose :where(h1):not(:where([class~="not-prose"],[class~="not-prose"] *))': {
              color: 'var(--accent)',
              fontFamily: 'var(--font-noto)',
            },
            '.prose :where(h2):not(:where([class~="not-prose"],[class~="not-prose"] *))': {
              marginTop: '0',
              fontSize: '1.2rem',
              fontWeight: 'semibold',
              marginBottom: '1rem',
              // fontFamily: 'var(--font-noto)',
            },
            '.prose :where(h3):not(:where([class~="not-prose"],[class~="not-prose"] *))': {
              fontSize: '1.05rem',
              marginBottom: '0.4rem',
            },
            '.prose :where(a):not(:where([class~="not-prose"],[class~="not-prose"] *))': {
              color: 'var(--accent)',
              textDecoration: 'none',
              fontWeight: 'bold',
            },
            '.prose :where(a):not(:where([class~="not-prose"],[class~="not-prose"] *)):hover': {
              color: 'var(--accent)',
              textDecoration: 'underline',
              textDecorationColor: 'var(--accent)',
              textUnderlineOffset: '4px',
            },
            '.prose :where(ul > li):not(:where([class~="not-prose"],[class~="not-prose"] *))::marker':{
              color: 'var(--background)',
            },
            '.prose .tag-button, .tag-button-no-link': {
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
              padding: '2px 7px 3px 8px',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              marginRight: '0.25rem',
            },
            '.prose .tag-button:hover': {
              color: 'var(--text)',
              backgroundColor: 'var(--background-secondary)',
              transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
            },
            '.markdown-text-sub p': {
              marginBottom: '0',
            },
          },
        },
      },
    },
  },
};
export default config;
