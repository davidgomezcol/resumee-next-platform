'use client'

import { Language, translations } from '@/lib/translations'
import { usePathname } from 'next/navigation'
import React, { createContext, useContext, useEffect } from 'react'

interface LanguageContextType {
  language: Language
  t: typeof translations.en
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

/** `/es`, `/es/privacy`, `/es/anything` are Spanish; everything else is English. */
export const languageFromPath = (pathname: string): Language =>
  pathname === '/es' || pathname.startsWith('/es/') ? 'es' : 'en'

/**
 * The route decides the language, not localStorage.
 *
 * Previously both languages lived at one URL behind a client-side toggle, which meant a complete
 * second site — every section, the whole privacy notice, all eight roles — was written, shipped,
 * and invisible to every crawler. Deriving from the path makes the Spanish pages real, indexable
 * URLs. It also means `usePathname` resolves during SSR, so /es is server-rendered in Spanish
 * rather than swapping after hydration.
 */
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname() ?? '/'
  const language = languageFromPath(pathname)

  useEffect(() => {
    // <html lang> lives in the server layout, which has no access to the route. Correcting it here
    // keeps a screen reader from reading Spanish with an English synthesiser (WCAG 3.1.1).
    document.documentElement.lang = language
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  )
}
