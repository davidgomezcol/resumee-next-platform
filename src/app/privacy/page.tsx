import PrivacyNotice from '@/components/Privacy/PrivacyNotice'
import type { Metadata } from 'next'

const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://dgomez.dev'

export const metadata: Metadata = {
  title: 'Privacy notice | David Gómez',
  description:
    'How dgomez.dev handles personal data: the contact form, optional Google Analytics that only loads once you accept, and what is stored in your browser.',
  alternates: { canonical: `${url}/privacy` },
  openGraph: {
    title: 'Privacy notice | David Gómez',
    description: 'How dgomez.dev handles personal data.',
    url: `${url}/privacy`,
    type: 'article',
  },
}

export default function PrivacyPage() {
  return <PrivacyNotice />
}
