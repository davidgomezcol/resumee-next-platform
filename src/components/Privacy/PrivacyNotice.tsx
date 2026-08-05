'use client'

import { container } from '@/appData/site'
import { useLanguage } from '@/contexts/LanguageContext'
import { privacyContent } from '@/lib/privacyContent'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

const PrivacyNotice = () => {
  const { language } = useLanguage()
  const t = privacyContent[language]

  return (
    <>
      <Header variant="document" />

      <main>
        <section className="bg-void text-bone">
          <div className={`${container} pt-[clamp(44px,5.6vw,84px)] pb-[clamp(34px,4vw,56px)]`}>
            <p className="text-coral font-mono text-[11.5px] tracking-[0.16em] uppercase">
              {t.eyebrow}
            </p>
            <h1 className="font-display mt-[clamp(16px,2.2vw,26px)] text-[clamp(38px,5.4vw,80px)] leading-[0.94] font-bold tracking-[-0.04em]">
              {t.title}
            </h1>
            <p className="text-bone/82 mt-[clamp(18px,2.2vw,26px)] max-w-[56ch] text-[clamp(16px,1.3vw,19px)] leading-[1.6]">
              {t.standfirst}
            </p>
            <dl className="mt-[clamp(30px,3.8vw,46px)] grid grid-cols-[repeat(auto-fit,minmax(min(160px,100%),1fr))] gap-x-[clamp(18px,2.4vw,32px)] font-mono">
              {t.meta.map((row) => (
                <div key={row.k} className="border-bone/22 border-t pt-[13px]">
                  <dt className="text-bone/72 mb-1.5 text-[11px] tracking-[0.16em] uppercase">
                    {row.k}
                  </dt>
                  <dd className="text-bone/92 text-[12.5px] leading-[1.45]">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <div className={`${container} pt-[clamp(30px,3.6vw,44px)] pb-[clamp(56px,7vw,100px)]`}>
          {t.sections.map((section, index) => (
            <section
              key={section.title}
              className="border-ink/16 border-t py-[clamp(26px,3.2vw,42px)]">
              <div className="wide:grid-cols-[minmax(0,230px)_minmax(0,1fr)] grid grid-cols-1 items-start gap-[clamp(14px,3vw,48px)]">
                <div>
                  <p className="text-brick font-mono text-[11px] tracking-[0.18em] uppercase">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2 className="font-display mt-2.5 max-w-[22ch] text-[clamp(20px,1.9vw,27px)] leading-[1.15] font-semibold tracking-[-0.024em]">
                    {section.title}
                  </h2>
                </div>

                <div className="max-w-[74ch]">
                  {section.paras.map((para) => (
                    <p
                      key={para.slice(0, 40)}
                      className="text-ink/80 mb-4 text-[clamp(15px,1.1vw,16.5px)] leading-[1.72]">
                      {para}
                    </p>
                  ))}

                  {section.items && (
                    <ul className="mt-1 mb-[18px]">
                      {section.items.map((item) => (
                        <li
                          key={item.slice(0, 40)}
                          className="text-ink/80 grid grid-cols-[22px_1fr] py-1.5 text-[clamp(14.5px,1.05vw,16px)] leading-[1.68]">
                          <span aria-hidden className="text-brick pt-[5px] font-mono text-[11px]">
                            —
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.rows && (
                    <div className="mt-1.5">
                      {section.rows.map((row) => (
                        <div key={row.k} className="border-ink/14 border-t pt-[15px] pb-[17px]">
                          <p className="text-ink font-mono text-[11.5px] tracking-[0.06em]">
                            {row.k}
                          </p>
                          <dl className="mt-3 grid grid-cols-[repeat(auto-fit,minmax(min(170px,100%),1fr))] gap-x-[clamp(18px,2.4vw,32px)] gap-y-3">
                            {row.fields.map((field) => (
                              <div key={field.k}>
                                <dt className="text-ink/64 mb-[5px] font-mono text-[11px] tracking-[0.14em] uppercase">
                                  {field.k}
                                </dt>
                                <dd className="text-ink/82 text-[13.5px] leading-[1.5]">
                                  {field.v}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          ))}
          <div className="border-ink/16 border-t" />
        </div>
      </main>

      <Footer variant="document" />
    </>
  )
}

export default PrivacyNotice
