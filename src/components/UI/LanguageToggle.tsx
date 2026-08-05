'use client'

import { languageFromPath } from '@/contexts/LanguageContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

interface LanguageToggleProps {
  /**
   * `bordered` for the header chip on bone, `onDark` for the same chip on void,
   * `bare` for the footer link.
   */
  variant?: 'bordered' | 'onDark' | 'bare'
}

const styles = {
  bordered:
    'border-ink/20 text-ink hover:border-brick hover:text-brick inline-flex min-h-[36px] min-w-[36px] cursor-pointer items-center justify-center border px-[11px] font-mono text-[10.5px] tracking-[0.12em] transition-colors',
  onDark:
    'border-bone/24 text-bone hover:border-coral hover:text-coral inline-flex min-h-[36px] min-w-[36px] cursor-pointer items-center justify-center border px-[11px] font-mono text-[11px] tracking-[0.12em] transition-colors',
  bare: 'text-bone/70 hover:text-coral inline-flex min-h-[24px] min-w-[24px] cursor-pointer items-center justify-center font-mono text-[10.5px] tracking-[0.1em] transition-colors',
} as const

/**
 * A link rather than a state toggle: language is a route now, so switching has to change the URL
 * for the Spanish pages to be reachable and indexable. The mirrored path is derived, so an
 * arbitrary 404 path toggles to its Spanish equivalent and stays a 404.
 */
export const mirroredPath = (pathname: string) =>
  languageFromPath(pathname) === 'es'
    ? pathname.replace(/^\/es(?=\/|$)/, '') || '/'
    : `/es${pathname === '/' ? '' : pathname}`

const LanguageToggle: FC<LanguageToggleProps> = ({ variant = 'bordered' }) => {
  const pathname = usePathname() ?? '/'
  const next = languageFromPath(pathname) === 'en' ? 'es' : 'en'

  return (
    <Link
      href={mirroredPath(pathname)}
      hrefLang={next}
      aria-label={next === 'es' ? 'Cambiar a español' : 'Switch to English'}
      className={styles[variant]}>
      {next.toUpperCase()}
    </Link>
  )
}

export default LanguageToggle
