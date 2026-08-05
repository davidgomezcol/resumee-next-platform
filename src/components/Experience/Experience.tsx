'use client'

import { container } from '@/appData/site'
import { useLanguage } from '@/contexts/LanguageContext'
import { WorkExperience } from '@/lib/types'
import { useState } from 'react'
import SectionLabel from '../UI/SectionLabel'
import RoleRow from './RoleRow'

interface ExperienceProps {
  roles: WorkExperience[]
}

const Experience = ({ roles }: ExperienceProps) => {
  const { t, language } = useLanguage()
  // The current role starts expanded, as in the design.
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    roles.length ? { [roles[0].id]: true } : {},
  )

  const allOpen = roles.length > 0 && roles.every((role) => open[role.id])

  const toggleAll = () =>
    setOpen(allOpen ? {} : Object.fromEntries(roles.map((role) => [role.id, true])))

  const toggleRole = (id: string) => setOpen((prev) => ({ ...prev, [id]: !prev[id] }))

  return (
    <section id="experience" className="border-ink/12 border-b">
      <div className={`${container} py-[clamp(58px,7vw,104px)]`}>
        <div className="flex flex-wrap items-baseline justify-between gap-5">
          <div>
            <SectionLabel n="02" label={t.experience.label} />
            <h2 className="font-display mt-[clamp(16px,2.2vw,26px)] text-[clamp(29px,3vw,43px)] leading-[1.06] font-semibold tracking-[-0.032em]">
              {t.experience.heading}
            </h2>
          </div>
          <button
            type="button"
            onClick={toggleAll}
            className="border-ink/22 text-ink/66 hover:border-brick hover:text-brick cursor-pointer border px-3.5 py-[9px] font-mono text-[11px] tracking-[0.14em] uppercase transition-colors">
            {allOpen ? t.experience.collapseAll : t.experience.expandAll}
          </button>
        </div>

        <div className="mt-[clamp(28px,3.4vw,44px)]">
          {roles.map((role) => (
            <RoleRow
              key={role.id}
              content={role[language]}
              companyUrl={role.companyUrl}
              open={!!open[role.id]}
              onToggle={() => toggleRole(role.id)}
              panelId={`role-${role.id}`}
              labels={{
                achievements: t.experience.achievements,
                companySite: t.experience.companySite,
              }}
            />
          ))}
          <div className="border-ink/14 border-t" />
        </div>
      </div>
    </section>
  )
}

export default Experience
