import localFont from 'next/font/local';
import { Geist_Mono } from 'next/font/google';

export const switzer = localFont({
  src: [
    { path: '../public/fonts/Switzer/Switzer-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/Switzer/Switzer-Italic.woff2', weight: '400', style: 'italic' },
    { path: '../public/fonts/Switzer/Switzer-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/Switzer/Switzer-Semibold.woff2', weight: '600', style: 'normal' },
    { path: '../public/fonts/Switzer/Switzer-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-switzer',
  display: 'swap',
  preload: true,
});

export const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-geist-mono',
  display: 'swap',
});
