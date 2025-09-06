import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import ThemeMenu from '@/components/Theme/ThemeMenu'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { Fira_Code } from 'next/font/google'

const firaCode = Fira_Code({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })

const title = 'David Gómez | Full-Stack Developer & AI Enthusiast | React, Next.js, Python Expert'

const description =
  'Hire David Gómez - Computer Engineer with 15+ years experience, specializing in React, Next.js, and Python. Remote developer from Venezuela/Colombia working with US companies since 2017. Expert in multicultural teams and AI development. Get a free consultation today!'

const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://dgomez.dev'

export const metadata: Metadata = {
  title,
  description,
  category: 'technology',
  keywords: [
    'full stack developer',
    'react developer',
    'next.js developer',
    'python developer',
    'web developer for hire',
    'remote developer',
    'US developer',
    'frontend developer',
    'backend developer',
    'javascript developer',
    'typescript developer',
    'django developer',
    'flask developer',
    'freelance developer',
    'software engineer',
    'computer engineer',
    'AI enthusiast',
    'artificial intelligence developer',
    'multicultural teams',
    'distributed teams',
    'remote work expert',
    'Venezuela developer',
    'Colombia developer',
    'Latin American developer',
    'web development services',
    'custom web applications',
    'responsive web design',
    'e-commerce development',
    'API development',
    'mentor',
    'team leader',
  ],
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
    siteName: 'David Gómez - Full-Stack Developer',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'David Gómez - Full-Stack Developer Portfolio',
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
        jobTitle: 'Full-Stack Developer & AI Enthusiast',
        description:
          'Computer Engineer with 15+ years experience, specializing in React, Next.js, and Python development. Expert in multicultural and distributed teams, working remotely with US companies since 2017.',
        url: url,
        sameAs: ['https://github.com/davidgomezcol', 'https://www.linkedin.com/in/davidgomezm7/'],
        knowsAbout: [
          'React.js',
          'Next.js',
          'Python',
          'JavaScript',
          'TypeScript',
          'Django',
          'Flask',
          'Web Development',
          'Frontend Development',
          'Backend Development',
          'API Development',
          'Responsive Web Design',
          'Artificial Intelligence',
          'Multicultural Teams',
          'Remote Work',
          'Distributed Teams',
          'Team Leadership',
          'Mentoring',
        ],
        worksFor: {
          '@type': 'Organization',
          name: 'Freelance Developer',
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bogotá',
          addressCountry: 'CO',
        },
        availableForHire: true,
        offers: {
          '@type': 'Offer',
          category: 'Web Development Services',
          description:
            'Full-stack web development services including React, Next.js, and Python development',
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
        name: 'Full-Stack Web Development Services',
        description:
          'Professional web development services including React, Next.js, Python, Django, and Flask development',
        provider: {
          '@id': `${url}#person`,
        },
        areaServed: {
          '@type': 'Country',
          name: 'United States',
        },
        serviceType: [
          'Web Development',
          'Frontend Development',
          'Backend Development',
          'API Development',
          'E-commerce Development',
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
        name: 'David Gómez - Full-Stack Developer Portfolio',
        url: url,
        description: 'Professional portfolio showcasing full-stack development services',
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
    <html lang="en" data-theme="dark">
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
            
            // Core Web Vitals tracking
            if ('web-vital' in window) {
              import('web-vitals').then(({getCLS, getFID, getFCP, getLCP, getTTFB}) => {
                getCLS(gtag);
                getFID(gtag);
                getFCP(gtag);
                getLCP(gtag);
                getTTFB(gtag);
              });
            }
          `}
        </Script>

        {/* Google Search Console Verification - Replace with your verification code */}
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
                  name: 'Services',
                  item: `${url}#services`,
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
                  name: 'What services does David Gómez offer?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'David Gómez offers full-stack web development services including React, Next.js, Python, Django, Flask, JavaScript, TypeScript, API development, responsive web design, and custom web applications.',
                  },
                },
                {
                  '@type': 'Question',
                  name: "What is David Gómez's background and experience?",
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'David Gómez is a Computer Engineer with 15+ years of experience, graduated from Universidad Fermín Toro in Venezuela with honors. He has been working remotely with US companies since 2017, specializing in multicultural and distributed teams.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Is David Gómez available for remote work with US companies?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, David Gómez is available for remote work with US companies. He has extensive experience working with US-based companies since 2017 and specializes in React, Next.js, and Python development across different time zones.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What technologies does David Gómez specialize in?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'David Gómez specializes in React.js, Next.js, Python, Django, Flask, JavaScript, TypeScript, API development, responsive web design, and full-stack web development. He is also passionate about artificial intelligence and AI development.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What makes David Gómez unique as a developer?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'David Gómez brings 15+ years of experience, expertise in multicultural and distributed teams, strong communication skills across cultures, and a passion for AI development. He is organized, approachable, resilient, and enjoys mentoring team members.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How can I hire David Gómez for my project?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'You can hire David Gómez by contacting him through the contact form on his website, emailing hi@dgomez.dev, or connecting with him on LinkedIn. He offers free consultations for new projects and specializes in complex challenges and team support.',
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${firaCode.className}`}>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <ThemeMenu />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
