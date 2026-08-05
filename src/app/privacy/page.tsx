import PrivacyNotice from '@/components/Privacy/PrivacyNotice'
import { alternatesFor, privacyCopy, siteUrl } from '@/lib/siteMetadata'
import type { Metadata } from 'next'

const copy = privacyCopy.en

export const metadata: Metadata = {
  title: copy.title,
  description: copy.description,
  alternates: alternatesFor('en', '/privacy'),
  openGraph: {
    title: copy.title,
    description: copy.description,
    url: alternatesFor('en', '/privacy').canonical,
    type: 'article',
    locale: 'en_US',
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'David Gómez — Senior Full-Stack Engineer & AI Systems',
      },
    ],
  },
  twitter: {
    title: copy.title,
    description: copy.description,
    card: 'summary_large_image',
    creator: '@davidgomezdev',
    images: [`${siteUrl}/opengraph-image`],
  },
}

export default function Page() {
  return <PrivacyNotice />
}
