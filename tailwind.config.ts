import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E8',
        sand: '#E8DECE',
        camel: '#C4A882',
        mocha: '#7A6652',
        espresso: '#3D2E22',
        sage: {
          light: '#A8C4AC',
          DEFAULT: '#6B8C6F',
          dark: '#4A6B4E',
        },
        charcoal: {
          light: '#555555',
          DEFAULT: '#2D2D2D',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-geist-serif)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
