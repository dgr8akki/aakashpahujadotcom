import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#000000',
          light: '#1f1611',
          dark: '#000000',
          darkest: '#01050b',
        },
        slate: {
          DEFAULT: '#8892b0',
          light: '#a8b2d1',
          lightest: '#ccd6f6',
        },
        grey: {
          DEFAULT: '#4c5772',
          light: '#606a86',
          medium: '#2d3952',
          dark: '#333f58',
        },
        accent: {
          DEFAULT: '#FF9E64',
          pink: '#FF647F',
          yellow: '#FFC464',
          blue: '#71AFFF',
          dark: '#1D7FFC',
        },
        text: {
          primary: '#ccd6f6',
          secondary: '#a8b2d1',
          muted: '#8892b0',
        },
      },
      fontFamily: {
        calibre: [
          'var(--font-calibre)',
          'San Francisco',
          'SF Pro Text',
          '-apple-system',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'var(--font-sf-mono)',
          'Fira Code',
          'Fira Mono',
          'Roboto Mono',
          'monospace',
        ],
      },
      fontSize: {
        xs: ['12px', { lineHeight: '1.5' }],
        sm: ['14px', { lineHeight: '1.5' }],
        base: ['16px', { lineHeight: '1.5' }],
        lg: ['18px', { lineHeight: '1.5' }],
        xl: ['20px', { lineHeight: '1.3' }],
        '2xl': ['22px', { lineHeight: '1.3' }],
        '3xl': ['32px', { lineHeight: '1.2' }],
        '4xl': ['40px', { lineHeight: '1.1' }],
        '5xl': ['50px', { lineHeight: '1.1' }],
        '6xl': ['60px', { lineHeight: '1.1' }],
        '7xl': ['70px', { lineHeight: '1.1' }],
        '8xl': ['80px', { lineHeight: '1.1' }],
      },
      spacing: {
        nav: '100px',
        'nav-scroll': '70px',
      },
      transitionTimingFunction: {
        custom: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'fade-down': 'fadeDown 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-in': 'slideIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        dash: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      boxShadow: {
        nav: '0 10px 30px -10px rgba(2, 12, 27, 0.7)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
