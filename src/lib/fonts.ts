import { Nanum_Gothic as FontNanum, Nanum_Gothic_Coding as FontCoding, Noto_Serif_KR as FontNoto } from 'next/font/google';
// import localFont from 'next/font/local';

export const fontNanum = FontNanum({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-nanum',
  display: 'swap',
});

export const fontCoding = FontCoding({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-coding',
  display: 'swap',
});

export const fontNoto = FontNoto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-noto',
  display: 'swap',
});