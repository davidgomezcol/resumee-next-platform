import NotFound from '@/components/NotFound/NotFound'
import type { Metadata } from 'next'

/**
 * `robots` is required here, not merely tidy. The root layout declares `index, follow`, which
 * otherwise applies to this page too — the served HTML carried both that and Next's own `noindex`,
 * a contradiction that only the 404 status resolved. Declaring it suppresses the inherited value.
 * Two noindex tags then remain (Next emits one as well), which is redundant but consistent.
 */
export const metadata: Metadata = {
  title: 'Page not found | David Gómez',
  robots: { index: false, follow: false },
  // Also suppresses the layout's canonical, which pointed every 404 at the homepage — "don't
  // index me" alongside "my canonical is /" is the same contradiction in a different field.
  alternates: { canonical: null },
}

export default function NotFoundPage() {
  return <NotFound />
}
