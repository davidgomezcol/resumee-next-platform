'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { Language } from '@/lib/translations'

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    const newLanguage: Language = language === 'en' ? 'es' : 'en'
    setLanguage(newLanguage)
  }

  return (
    <button
      onClick={toggleLanguage}
      className="text-neutral hover:text-neutral/70 transition-colors duration-300 text-sm font-medium cursor-pointer"
      aria-label={`Switch to ${language === 'en' ? 'Spanish' : 'English'}`}
    >
      {language === 'en' ? 'Es' : 'En'}
    </button>
  )
}

export default LanguageSwitcher
