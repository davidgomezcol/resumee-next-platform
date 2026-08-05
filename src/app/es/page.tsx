import HomePage from '@/components/Home/HomePage'
import { alternatesFor, homeCopy, siteUrl } from '@/lib/siteMetadata'
import type { Metadata } from 'next'

const copy = homeCopy.es

export const metadata: Metadata = {
  title: copy.title,
  description: copy.description,
  category: 'technology',
  keywords: [
    'full stack developer',
    'senior software engineer',
    'AI engineer',
    'agentic AI',
    'MCP servers',
    'python developer',
    'fastapi developer',
    'react developer',
    'next.js developer',
    'vue developer',
    'typescript developer',
    'backend developer',
    'API development',
    'AWS',
    'Kubernetes',
    'remote developer',
    'Colombia developer',
    'Latin American developer',
    'distributed teams',
    'computer engineer',
  ],
  alternates: alternatesFor('es', ''),
  openGraph: {
    title: copy.title,
    description: copy.description,
    url: alternatesFor('es', '').canonical,
    type: 'website',
    locale: 'es_ES',
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

export default HomePage
