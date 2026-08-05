import { FC } from 'react'

interface SectionLabelProps {
  /** Two-digit section marker, shown in the accent color. */
  n: string
  label: string
  tone?: 'light' | 'dark'
}

/** The mono `01 / About` eyebrow that opens every section. */
const SectionLabel: FC<SectionLabelProps> = ({ n, label, tone = 'light' }) => (
  <div
    className={`flex gap-2.5 font-mono text-[10.5px] tracking-[0.18em] uppercase ${
      tone === 'dark' ? 'text-bone/72' : 'text-ink/64'
    }`}>
    <span className={tone === 'dark' ? 'text-coral' : 'text-brick'}>{n}</span>
    <span>{label}</span>
  </div>
)

export default SectionLabel
