import { RoleContent } from '@/lib/types'
import { FC } from 'react'

interface RoleRowProps {
  content: RoleContent
  companyUrl?: string
  open: boolean
  onToggle: () => void
  panelId: string
  labels: {
    achievements: string
    companySite: string
  }
}

const panelGrid =
  'md:grid md:grid-cols-[minmax(0,132px)_minmax(0,1fr)_34px] md:gap-x-[clamp(14px,2vw,28px)]'

const RoleRow: FC<RoleRowProps> = ({ content, companyUrl, open, onToggle, panelId, labels }) => (
  <div className="border-ink/14 border-t">
    <div
      className={`hover:bg-brick/5 relative grid grid-cols-[minmax(0,1fr)_34px] items-start gap-x-4 gap-y-3 py-[clamp(18px,2vw,26px)] transition-colors md:grid-cols-[minmax(0,132px)_minmax(0,1fr)_34px] md:gap-x-[clamp(14px,2vw,28px)]`}>
      <div className="text-ink/66 font-mono text-[11px] tracking-[0.04em] md:pt-1.5">
        <div>{content.period}</div>
        <div className="text-ink/62 mt-1">{content.place}</div>
      </div>

      <div
        aria-hidden
        className="text-ink/40 col-start-2 row-start-1 pt-1 text-right font-mono text-base md:col-start-3">
        {open ? '−' : '+'}
      </div>

      <div className="col-span-2 row-start-2 md:col-span-1 md:col-start-2 md:row-start-1">
        <h3 className="font-display max-w-[46ch] text-[clamp(19px,1.6vw,24px)] leading-[1.26] font-semibold tracking-[-0.018em]">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-controls={panelId}
            className="focus-visible:outline-brick cursor-pointer text-left after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-4">
            {content.title}
          </button>
        </h3>
        <p className="text-brick mt-2 font-mono text-[11px] tracking-[0.1em] uppercase">
          {content.company}
        </p>
        <p className="text-ink/66 mt-3 max-w-[68ch] text-[15px] leading-[1.62]">
          {content.summary}
        </p>
      </div>
    </div>

    <div id={panelId} hidden={!open} className={`pb-[clamp(26px,3vw,38px)] ${panelGrid}`}>
      <div className="hidden md:block" />
      <div>
        <ul className="flex flex-wrap gap-1.5 pb-[22px]">
          {content.tech.map((tech) => (
            <li
              key={tech}
              className="border-ink/18 text-ink/72 border px-[9px] py-[5px] font-mono text-[11px] tracking-[0.07em]">
              {tech}
            </li>
          ))}
        </ul>

        <p className="border-ink/12 text-ink/64 border-b pb-3 font-mono text-[11px] tracking-[0.16em] uppercase">
          {labels.achievements}
        </p>
        <ul className="mt-1 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-[clamp(24px,3vw,44px)]">
          {content.achievements.map((achievement, index) => (
            <li
              key={achievement.slice(0, 40)}
              className="text-ink/74 grid grid-cols-[26px_1fr] gap-1 py-1.5 text-[14.5px] leading-[1.58]">
              <span aria-hidden className="text-brick pt-1 font-mono text-[11px]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>

        {companyUrl && (
          <a
            href={companyUrl}
            target="_blank"
            rel="noopener"
            className="text-brick hover:text-ink mt-[18px] inline-block font-mono text-[10.5px] tracking-[0.1em] transition-colors">
            {labels.companySite} ↗
          </a>
        )}
      </div>
    </div>
  </div>
)

export default RoleRow
