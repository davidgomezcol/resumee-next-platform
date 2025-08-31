'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import SectionHeading from '../SectionHeading/SectionHeading'

const AboutSection: React.FC = () => {
  const { t } = useLanguage()

  return (
    <section id="about">
      <SectionHeading title={t.about.title} />

      <div className="my-8 md:my-12">
        <div className="text-neutral space-y-6 text-pretty text-lg leading-relaxed">
          <p>{t.about.paragraph1}</p>
          <p>{t.about.paragraph2}</p>
          <p>{t.about.paragraph3}</p>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
