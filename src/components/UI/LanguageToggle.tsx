'use client'

import { useLanguage } from '@/contexts/LanguageContext'
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
    'border-ink/20 text-ink hover:border-brick hover:text-brick cursor-pointer border px-[11px] py-[9px] font-mono text-[10.5px] tracking-[0.12em] transition-colors',
  onDark:
    'border-bone/24 text-bone hover:border-coral hover:text-coral cursor-pointer border px-[11px] py-[9px] font-mono text-[11px] tracking-[0.12em] transition-colors',
  bare: 'text-bone/70 hover:text-coral cursor-pointer font-mono text-[10.5px] tracking-[0.1em] transition-colors',
} as const

const LanguageToggle: FC<LanguageToggleProps> = ({ variant = 'bordered' }) => {
  const { language, setLanguage } = useLanguage()
  const next = language === 'en' ? 'es' : 'en'

  return (
    <button
      type="button"
      onClick={() => setLanguage(next)}
      aria-label={next === 'es' ? 'Cambiar a español' : 'Switch to English'}
      className={styles[variant]}>
      {next.toUpperCase()}
    </button>
  )
}

export default LanguageToggle
