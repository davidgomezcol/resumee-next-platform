import PrivacyNotice from '@/components/Privacy/PrivacyNotice'
import type { Metadata } from 'next'

const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://dgomez.dev'

const title = 'Privacy notice | David Gómez'
const description =
  'How dgomez.dev handles personal data: the contact form, optional Google Analytics that only loads once you accept, and what is stored in your browser.'

/**
 * `images` and the whole `twitter` block are spelled out because declaring `openGraph` on a child
 * segment suppresses the inherited opengraph-image file convention. Without them this page had no
 * og:image at all, while its Twitter card still advertised the homepage title and description.
 */
const card = {
  url: `${url}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: 'David Gómez — Senior Full-Stack Engineer & AI Systems',
}

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${url}/privacy` },
  openGraph: {
    title,
    description,
    url: `${url}/privacy`,
    type: 'article',
    images: [card],
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: '@davidgomezdev',
    images: [card],
  },
}

export default function PrivacyPage() {
  return <PrivacyNotice />
}
