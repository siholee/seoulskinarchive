import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['ko', 'en', 'ja'],
    defaultLocale: 'ko',
  },
  images: {
    domains: ['yurasis.com'],
  },
};

export default nextConfig;
