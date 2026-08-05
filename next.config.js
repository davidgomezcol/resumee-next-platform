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
    // Optimized variants are immutable per (src, width, quality); the default 60s meant
    // /_next/image responses were revalidated constantly.
    minimumCacheTTL: 31536000,
  },
}

module.exports = nextConfig
