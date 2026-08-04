'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { FC } from 'react'

interface LanguageToggleProps {
  /** `bordered` for the header chip, `bare` for the footer link. */
  variant?: 'bordered' | 'bare'
}

const LanguageToggle: FC<LanguageToggleProps> = ({ variant = 'bordered' }) => {
  const { language, setLanguage } = useLanguage()
  const next = language === 'en' ? 'es' : 'en'

  return (
    <button
      type="button"
      onClick={() => setLanguage(next)}
      aria-label={next === 'es' ? 'Cambiar a español' : 'Switch to English'}
      className={
        variant === 'bordered'
          ? 'border-ink/20 text-ink hover:border-brick hover:text-brick shrink-0 cursor-pointer border px-[9px] py-[5px] font-mono text-[10.5px] tracking-[0.12em] transition-colors'
          : 'text-bone/70 hover:text-coral cursor-pointer font-mono text-[10.5px] tracking-[0.1em] transition-colors'
      }>
      {next.toUpperCase()}
    </button>
  )
}

export default LanguageToggle
