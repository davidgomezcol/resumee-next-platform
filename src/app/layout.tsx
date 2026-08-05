import type { Metadata } from 'next'
import './globals.css'

import CookieConsent from '@/components/Consent/CookieConsent'
import { ConsentProvider } from '@/contexts/ConsentContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { Archivo, JetBrains_Mono, Libre_Franklin } from 'next/font/google'

// Only the weights actually used are requested: every font-display utility pairs with
// semibold or bold, font-medium appears once on body text, and font-mono never sets a weight.
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-archivo',
})

const libreFranklin = Libre_Franklin({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-libre-franklin',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jetbrains-mono',
})

// Kept near 60 characters: Google cuts SERP titles around there, and a third segment was
// reliably the part that vanished.
const title = 'David Gómez | Senior Full-Stack Engineer & AI Systems'

// ~155 characters, front-loading the differentiator — everything past that is truncated.
const description =
  'Senior full-stack engineer building backend services and AI agents for a cloud-native P&C insurance platform. Python, FastAPI, MCP servers. Remote from Bogotá.'

const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://dgomez.dev'

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: 'David Gómez' }],
  creator: 'David Gómez',
  publisher: 'David Gómez',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://dgomez.dev'),
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
    siteName: 'David Gómez - Senior Full-Stack Engineer',
    type: 'website',
    locale: 'en_US',
    // No `images` here on purpose: opengraph-image.tsx supplies the tags via the file convention,
    // and a hand-written array is silently overridden by it.
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: '@davidgomezdev',
    // twitter-image.tsx supplies the tags, same as above.
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'dQxEAKUYOvK27USDE2KA0Soge-eviyq_mUSzTlgCF6U', // Google Search Console verification code
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${url}#person`,
        name: 'David Gómez',
        jobTitle: 'Senior Full-Stack Engineer / AI Systems',
        description:
          'Computer Engineer with nineteen years of experience building backend services and AI agents for a cloud-native P&C insurance platform. Expert in multicultural and distributed teams, working remotely with US companies since 2017.',
        url: url,
        image: `${url}/images/me.webp`,
        sameAs: ['https://github.com/davidgomezcol', 'https://www.linkedin.com/in/davidgomezm7/'],
        knowsAbout: [
          'Python',
          'FastAPI',
          'Flask',
          'Django',
          'Agentic AI',
          'MCP Servers',
          'Vue.js',
          'React.js',
          'Next.js',
          'JavaScript',
          'TypeScript',
          'AWS',
          'Docker',
          'Kubernetes',
          'CI/CD',
          'Load Testing',
          'Backend Development',
          'Frontend Development',
          'API Development',
          'Multicultural Teams',
          'Remote Work',
          'Distributed Teams',
          'Team Leadership',
          'Mentoring',
        ],
        worksFor: {
          '@type': 'Organization',
          name: 'TEAM International / BriteCore',
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bogotá',
          addressCountry: 'CO',
        },
        alumniOf: {
          '@type': 'Organization',
          name: 'Universidad Fermín Toro',
          description:
            'Computer Engineering degree with honors - Mention for Publication and Honorific Mention',
        },
        hasOccupation: {
          '@type': 'Occupation',
          name: 'Software Developer',
          occupationalCategory: '15-1252.00',
        },
      },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: 'Full-Stack Engineering & AI Systems',
        description:
          'Backend services with Python, FastAPI, and Flask; AI agents and MCP servers; Vue and React front ends; AWS, Docker, and Kubernetes platform work',
        provider: {
          '@id': `${url}#person`,
        },
        areaServed: {
          '@type': 'Country',
          name: 'United States',
        },
        serviceType: [
          'Backend Development',
          'AI Agent Development',
          'Frontend Development',
          'API Development',
          'Cloud Platform Engineering',
          'Custom Web Applications',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${url}#website`,
        name: 'David Gómez - Senior Full-Stack Engineer',
        url: url,
        description:
          'Portfolio of David Gómez, senior full-stack engineer working on backend services and AI agents',
        author: {
          '@id': `${url}#person`,
        },
        publisher: {
          '@id': `${url}#person`,
        },
        inLanguage: 'en-US',
      },
    ],
  }

  return (
    <html
      lang="en"
      className={`${archivo.variable} ${libreFranklin.variable} ${jetBrainsMono.variable}`}>
      <head>
        {/*
          Nothing Google-related is referenced here on purpose — not even a preconnect, which would
          open a connection (and expose the visitor's IP) before any choice is made, contradicting
          what the privacy notice states. gtag.js is injected by @/lib/consent on acceptance.
        */}

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          {/* Header and footer live in the pages: the privacy notice uses reduced variants. */}
          <ConsentProvider>
            {children}
            <CookieConsent />
          </ConsentProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
