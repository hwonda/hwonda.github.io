import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'custom-border': 'var(--border-color)',
      },
    },
  },
  plugins: [],
};
export default config;
