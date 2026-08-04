import { FC } from 'react'

interface CornerTicksProps {
  /** `all` frames every corner (hero photo); `diagonal` marks only top-left and bottom-right. */
  corners?: 'all' | 'diagonal'
}

const tick = 'pointer-events-none absolute h-[11px] w-[11px] border-coral'

/** Accent corner marks on framed elements. Parent must be positioned. */
const CornerTicks: FC<CornerTicksProps> = ({ corners = 'all' }) => (
  <>
    <span aria-hidden className={`${tick} -top-px -left-px border-t border-l`} />
    <span aria-hidden className={`${tick} -right-px -bottom-px border-r border-b`} />
    {corners === 'all' && (
      <>
        <span aria-hidden className={`${tick} -top-px -right-px border-t border-r`} />
        <span aria-hidden className={`${tick} -bottom-px -left-px border-b border-l`} />
      </>
    )}
  </>
)

export default CornerTicks
