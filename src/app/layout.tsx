import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { Archivo, JetBrains_Mono, Libre_Franklin } from 'next/font/google'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-archivo',
})

const libreFranklin = Libre_Franklin({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-libre-franklin',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
})

const title = 'David Gómez | Senior Full-Stack Engineer & AI Systems | Python, FastAPI, React'

const description =
  'David Gómez — Senior Full-Stack Engineer with 15+ years of experience building backend services and AI agents for a cloud-native P&C insurance platform. Python, FastAPI, MCP servers, Vue, React, AWS. Remote from Bogotá with U.S. companies since 2017.'

const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://dgomez.dev'

export const metadata: Metadata = {
  title,
  description,
  category: 'technology',
  keywords: [
    'full stack developer',
    'senior software engineer',
    'AI engineer',
    'agentic AI',
    'MCP servers',
    'python developer',
    'fastapi developer',
    'flask developer',
    'django developer',
    'react developer',
    'next.js developer',
    'vue developer',
    'javascript developer',
    'typescript developer',
    'backend developer',
    'frontend developer',
    'API development',
    'AWS',
    'Docker',
    'Kubernetes',
    'remote developer',
    'US developer',
    'Venezuela developer',
    'Colombia developer',
    'Latin American developer',
    'multicultural teams',
    'distributed teams',
    'computer engineer',
    'mentor',
    'team leader',
  ],
  authors: [{ name: 'David Gómez' }],
  creator: 'David Gómez',
  publisher: 'David Gómez',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://dgomez.dev'),
  alternates: {
    canonical: 'https://dgomez.dev',
  },
  openGraph: {
    title,
    description,
    url,
    siteName: 'David Gómez - Senior Full-Stack Engineer',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'David Gómez - Senior Full-Stack Engineer & AI Systems',
      },
    ],
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: '@davidgomezdev',
    images: ['/twitter-image.png'],
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
          'Computer Engineer with 15+ years of experience building backend services and AI agents for a cloud-native P&C insurance platform. Expert in multicultural and distributed teams, working remotely with US companies since 2017.',
        url: url,
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
        availableForHire: true,
        offers: {
          '@type': 'Offer',
          category: 'Software Engineering Services',
          description:
            'Backend services, AI agents, and full-stack product work for cloud-native platforms',
          areaServed: 'US',
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
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'USD',
            description: 'Custom pricing based on project requirements',
          },
        },
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
        potentialAction: {
          '@type': 'ContactPage',
          target: `${url}#contact`,
        },
      },
    ],
  }

  return (
    <html
      lang="en"
      className={`${archivo.variable} ${libreFranklin.variable} ${jetBrainsMono.variable}`}>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BKB0F9Y6WC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BKB0F9Y6WC', {
              page_title: document.title,
              page_location: window.location.href,
              send_page_view: true
            });
          `}
        </Script>

        {/* Google Search Console Verification */}
        <meta
          name="google-site-verification"
          content="dQxEAKUYOvK27USDE2KA0Soge-eviyq_mUSzTlgCF6U"
        />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {/* Breadcrumb Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: url,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'About',
                  item: `${url}#about`,
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'Experience',
                  item: `${url}#experience`,
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  name: 'Capabilities',
                  item: `${url}#capabilities`,
                },
                {
                  '@type': 'ListItem',
                  position: 5,
                  name: 'Contact',
                  item: `${url}#contact`,
                },
              ],
            }),
          }}
        />

        {/* FAQ Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What does David Gómez build?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'David Gómez builds backend services and AI agents for a cloud-native P&C insurance platform — Python, FastAPI, and Flask services, production MCP servers, and Vue.js chat interfaces — along with the frontend and platform work to ship them end to end.',
                  },
                },
                {
                  '@type': 'Question',
                  name: "What is David Gómez's background and experience?",
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'David Gómez is a Computer Engineer with 15+ years of experience, graduated in 2008 from Universidad Fermín Toro in Venezuela with two special distinctions. He has been working remotely with US companies since 2017 and is based in Bogotá, Colombia.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Is David Gómez available for remote work with US companies?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. He works from Bogotá on GMT-5, overlapping U.S. business hours, and has worked remotely with US-based companies since 2017.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What technologies does David Gómez specialize in?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Python, FastAPI, Flask, and Django on the backend; agentic AI workflows and MCP servers; Vue.js, React.js, Next.js, JavaScript and TypeScript on the frontend; AWS, Docker, Kubernetes, GitHub Actions, and k6 on the platform side.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What makes David Gómez unique as an engineer?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'He pairs 15+ years of engineering with day-to-day agentic AI practice across the whole development workflow — architecture, code, review, testing — and brings strong communication across multicultural, distributed teams plus a track record of mentoring.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How can I get in touch with David Gómez?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Use the contact form on dgomez.dev, email hi@dgomez.dev, or connect on LinkedIn. He is open to conversations about AI-augmented engineering, platform work, and senior full-stack roles.',
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
