import type { Metadata } from 'next'
import './globals.css'

import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import ThemeMenu from '@/components/Theme/ThemeMenu'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { Fira_Code } from 'next/font/google'

const firaCode = Fira_Code({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })

const title = 'David Gómez | Full-Stack Web Developer in Bogotá'

const description =
  "Skilled full-stack web developer in Bogotá. I build responsive, user-friendly websites or apps with React, NextJS, and Python. Let's bring your vision to life. Hire me today!"

const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'

export const metadata: Metadata = {
  title,
  description,
  category: 'technology',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'),
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
    siteName: 'David Gómez Portfolio',
    type: 'website',
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: '@davidgomezdev',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${firaCode.className}`}>
        <LanguageProvider>
          <header>
            <Navbar />
          </header>
          {children}
          <ThemeMenu />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
