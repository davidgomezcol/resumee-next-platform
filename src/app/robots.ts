import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // `/_next/` is deliberately NOT disallowed. Every stylesheet and script lives under
        // `/_next/static/`, and the hero photo is only ever served from `/_next/image?url=…`.
        // Blocking it stops Google rendering the page at all and keeps the photo out of image
        // search. Crawl-delay and host: are omitted — Google ignores both.
        disallow: ['/private/', '/admin/', '/api/', '/netlify/'],
      },
    ],
    sitemap: 'https://dgomez.dev/sitemap.xml',
  }
}
