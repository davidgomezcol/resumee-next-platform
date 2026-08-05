import type { Language } from './translations'

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dgomez.dev'

/** The two routes that exist in both languages. */
export type LocalisedPath = '' | '/privacy'

const localised = (language: Language, path: LocalisedPath) =>
  `${siteUrl}${language === 'es' ? '/es' : ''}${path}` || siteUrl

/**
 * Self-referencing canonical plus the hreflang set. English is `x-default` because it is the
 * homepage everything already links to and the language the site is primarily written for.
 */
export const alternatesFor = (language: Language, path: LocalisedPath) => ({
  canonical: localised(language, path),
  languages: {
    en: localised('en', path) || siteUrl,
    es: localised('es', path),
    'x-default': localised('en', path) || siteUrl,
  },
})

interface PageCopy {
  title: string
  description: string
}

export const homeCopy: Record<Language, PageCopy> = {
  en: {
    title: 'David Gómez | Senior Full-Stack Engineer & AI Systems',
    description:
      'Senior full-stack engineer building backend services and AI agents for a cloud-native P&C insurance platform. Python, FastAPI, MCP. Remote from Bogotá.',
  },
  es: {
    title: 'David Gómez | Ingeniero Full-Stack Senior y Sistemas de IA',
    description:
      'Ingeniero full-stack senior: servicios backend y agentes de IA para una plataforma cloud-native de seguros P&C. Python, FastAPI, MCP. Remoto desde Bogotá.',
  },
}

export const privacyCopy: Record<Language, PageCopy> = {
  en: {
    title: 'Privacy notice | David Gómez',
    description:
      'How dgomez.dev handles personal data: the contact form, optional Google Analytics that only loads once you accept, and what is stored in your browser.',
  },
  es: {
    title: 'Aviso de privacidad | David Gómez',
    description:
      'Cómo dgomez.dev trata los datos personales: el formulario de contacto, la analítica opcional que solo se carga si aceptas, y qué se guarda en tu navegador.',
  },
}

/** Keeps in-site navigation within the active language: `/privacy` -> `/es/privacy` on Spanish. */
export const localisedHref = (language: Language, path: string) =>
  language === 'es' ? `/es${path === '/' ? '' : path}` : path
