import type { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dgomez.dev'

/**
 * Real content dates, not `new Date()`. The route is statically generated, so a build timestamp
 * froze at build time and re-stamped every URL as freshly modified on any unrelated redeploy —
 * Google discards `lastmod` it judges unreliable, and doing that also spends the signal for the
 * next genuine update. Bump these when the corresponding content actually changes.
 */
const CONTENT_UPDATED = '2026-08-05'
const PRIVACY_UPDATED = '2026-08-04'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    { url: baseUrl, lastModified: CONTENT_UPDATED, priority: 1 },
    { url: `${baseUrl}/es`, lastModified: CONTENT_UPDATED, priority: 0.9 },
    { url: `${baseUrl}/privacy`, lastModified: PRIVACY_UPDATED, priority: 0.3 },
    { url: `${baseUrl}/es/privacy`, lastModified: PRIVACY_UPDATED, priority: 0.3 },
  ]
}
