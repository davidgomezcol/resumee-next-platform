/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],

  // SEO and performance optimizations
  trailingSlash: false,
  poweredByHeader: false,

  images: {
    // Every image is local now, so no remote patterns are needed.
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
  },
}

module.exports = nextConfig
