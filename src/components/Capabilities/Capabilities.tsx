'use client'

import { container } from '@/appData/site'
import { useLanguage } from '@/contexts/LanguageContext'
import SectionLabel from '../UI/SectionLabel'

const Capabilities = () => {
  const { t } = useLanguage()

  return (
    <section id="capabilities" className="border-ink/12 border-b">
      <div className={`${container} py-[clamp(58px,7vw,104px)]`}>
        <SectionLabel n="03" label={t.capabilities.label} />

        <div className="mt-[clamp(16px,2.2vw,26px)] grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] items-end gap-[clamp(24px,4vw,64px)]">
          <h2 className="font-display max-w-[18ch] text-[clamp(29px,3vw,43px)] leading-[1.06] font-semibold tracking-[-0.032em]">
            {t.capabilities.heading}
          </h2>
          <p className="text-ink/70 max-w-[54ch] text-[clamp(15.5px,1.15vw,17px)] leading-[1.66]">
            {t.capabilities.intro}
          </p>
        </div>

        <div className="mt-[clamp(34px,4vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-[clamp(20px,2.6vw,36px)]">
          {t.capabilities.groups.map((group) => (
            <div key={group.n} className="border-ink/85 border-t pt-3.5">
              <h3 className="text-ink flex items-baseline gap-2 font-mono text-[11px] tracking-[0.16em] uppercase">
                <span className="text-brick">{group.n}</span>
                <span>{group.label}</span>
              </h3>
              <ul className="mt-3.5">
                {group.items.map((item) => (
                  <li key={item.name} className="border-ink/10 border-b py-[11px]">
                    <p className="text-ink text-[15px] leading-[1.35]">{item.name}</p>
                    <p className="text-ink/66 mt-[3px] text-[13px] leading-[1.5]">{item.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Capabilities
