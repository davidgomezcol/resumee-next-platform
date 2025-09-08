import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dgomez.dev'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/admin/', '/api/', '/_next/', '/static/', '/*.json$', '/netlify/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/private/', '/admin/', '/_next/', '/static/', '/*.json$', '/netlify/'],
        crawlDelay: 1,
      },
    ],
    host: 'https://dgomez.dev',
    sitemap: 'https://dgomez.dev/sitemap.xml',
  }
}
