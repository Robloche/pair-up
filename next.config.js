const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  images: { unoptimized: true },
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
});

module.exports = nextConfig;
