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

  /**
   * Declared here, not only in netlify.toml.
   *
   * Netlify applies netlify.toml headers to files it serves directly, but not to responses
   * produced by the Next.js runtime — which is every HTML document. Verified in production: the
   * stylesheets and the hero photo carried X-Frame-Options, Referrer-Policy, Permissions-Policy
   * and the longer HSTS, while `/` carried only Netlify's own defaults. The headers were on the
   * assets and missing from the pages, which is backwards from where they matter.
   */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          // 0 is current guidance — the legacy auditor caused vulnerabilities of its own.
          { key: 'X-XSS-Protection', value: '0' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
