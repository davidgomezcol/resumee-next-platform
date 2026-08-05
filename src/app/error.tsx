'use client'

import { container, site } from '@/appData/site'
import type { Language } from '@/lib/translations'
import { useEffect, useState } from 'react'

/**
 * Deliberately does not use LanguageContext. This boundary catches throws from the tree below it,
 * including from the providers themselves — reading a context here could throw again and loop. The
 * stored preference is read directly instead.
 */
const COPY: Record<Language, { label: string; heading: string; body: string; retry: string }> = {
  en: {
    label: 'Error',
    heading: 'Something went wrong on this page.',
    body: "It has been logged. You can try again, or email me directly and I'll pick it up from there.",
    retry: 'Try again',
  },
  es: {
    label: 'Error',
    heading: 'Algo falló en esta página.',
    body: 'Ya quedó registrado. Puedes intentarlo de nuevo o escribirme directamente y lo retomo desde ahí.',
    retry: 'Intentar de nuevo',
  },
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    console.error(error)
  }, [error])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('language')
      if (stored === 'es' || stored === 'en') setLanguage(stored)
    } catch {
      // Storage unavailable — English is a fine default.
    }
  }, [])

  const t = COPY[language]

  return (
    <div className="bg-void text-bone min-h-screen">
      <section className={`${container} flex min-h-screen flex-col justify-center py-20`}>
        <p className="text-coral font-mono text-[11px] tracking-[0.16em] uppercase">{t.label}</p>
        <h1 className="font-display mt-5 max-w-[18ch] text-[clamp(30px,4vw,56px)] leading-[1.04] font-semibold tracking-[-0.036em]">
          {t.heading}
        </h1>
        <p className="text-bone/72 mt-5 max-w-[52ch] text-[clamp(15.5px,1.15vw,17px)] leading-[1.66]">
          {t.body}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="bg-bone text-void hover:bg-coral cursor-pointer px-[22px] py-[13px] font-mono text-[11px] tracking-[0.14em] uppercase transition-colors">
            {t.retry}
          </button>
          <a
            href={`mailto:${site.email}`}
            className="border-bone/28 text-bone hover:border-coral hover:text-coral border px-[22px] py-[13px] font-mono text-[11px] tracking-[0.14em] uppercase transition-colors">
            {site.email}
          </a>
        </div>
      </section>
    </div>
  )
}
