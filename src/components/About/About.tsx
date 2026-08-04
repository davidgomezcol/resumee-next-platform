'use client'

import { container } from '@/appData/site'
import { useLanguage } from '@/contexts/LanguageContext'
import MetaTable from '../UI/MetaTable'
import SectionLabel from '../UI/SectionLabel'

const About = () => {
  const { t } = useLanguage()

  return (
    <section id="about" className="border-ink/12 border-b">
      <div
        className={`${container} grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[clamp(32px,4vw,64px)] py-[clamp(58px,7vw,104px)]`}>
        <div>
          <SectionLabel n="01" label={t.about.label} />
          <h2 className="font-display mt-[clamp(18px,2.4vw,28px)] max-w-[15ch] text-[clamp(29px,3vw,43px)] leading-[1.06] font-semibold tracking-[-0.032em]">
            {t.about.heading}
          </h2>
          <MetaTable rows={t.about.facts} className="mt-[clamp(22px,2.8vw,32px)] max-w-[320px]" />
        </div>

        <div className="text-ink/78 flex max-w-[62ch] flex-col gap-5 text-[clamp(15.5px,1.15vw,17px)] leading-[1.68]">
          {t.about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
