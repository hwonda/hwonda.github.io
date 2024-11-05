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
        'custom-border': 'var(--border-color)',
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
            h1: {
              color: 'var(--text-color)',
            },
            h2: {
              color: 'var(--text-color)',
            },
            h3: {
              color: 'var(--text-color)',
            },
            p: {
              margin: '1.25rem 0',
              lineHeight: '1.7',
              color: 'var(--text-secondary-color)',
            },
            span: {
              color: 'var(--text-secondary-color)',
            },
            ul: {
              padding: 0,
            },
            li: {
              color: 'var(--text-secondary-color)',
              padding: 0,
              margin: 0,
            },
            a: {
              color: 'var(--link-color)',
            },
            strong: {
              padding: '0.1rem',
              marginRight: '-0.25rem',
              color: 'var(--text-color)',
            },
          },
        },
      },
    },
  },
};
export default config;
