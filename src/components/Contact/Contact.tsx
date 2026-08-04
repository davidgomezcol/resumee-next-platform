'use client'

import { container } from '@/appData/site'
import { useLanguage } from '@/contexts/LanguageContext'
import CornerTicks from '../UI/CornerTicks'
import MetaTable from '../UI/MetaTable'
import SectionLabel from '../UI/SectionLabel'
import ContactForm from './ContactForm'

const Contact = () => {
  const { t } = useLanguage()

  return (
    <section id="contact" className="bg-void text-bone">
      <div
        className={`${container} grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(36px,5vw,72px)] py-[clamp(58px,7vw,104px)]`}>
        <div>
          <SectionLabel n="04" label={t.contact.label} tone="dark" />
          <h2 className="font-display mt-[clamp(18px,2.4vw,28px)] max-w-[14ch] text-[clamp(33px,3.9vw,56px)] leading-[1.02] font-semibold tracking-[-0.038em]">
            {t.contact.heading}
          </h2>
          <p className="text-bone/72 mt-[22px] max-w-[46ch] text-[clamp(15.5px,1.15vw,17px)] leading-[1.66]">
            {t.contact.intro}
          </p>
          <MetaTable
            rows={t.contact.rows}
            tone="dark"
            className="mt-[clamp(28px,3.4vw,42px)] max-w-[380px]"
          />
        </div>

        <div className="border-bone/16 relative border p-[clamp(22px,2.6vw,34px)]">
          <CornerTicks corners="diagonal" />
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

export default Contact
