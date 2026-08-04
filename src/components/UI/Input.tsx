import { FC, InputHTMLAttributes } from 'react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string
  id: string
  /** Applied to the wrapping label, so callers can control grid placement. */
  className?: string
}

export const fieldLabel = 'font-mono text-[11px] tracking-[0.16em] uppercase text-bone/72'

export const fieldControl =
  'border-0 border-b border-bone/28 bg-transparent py-2 text-[15px] text-bone outline-none transition-colors focus:border-coral'

const Input: FC<InputProps> = ({ type = 'text', id, label, className, ...props }) => (
  <label htmlFor={id} className={`flex flex-col gap-[7px] ${className ?? ''}`}>
    <span className={fieldLabel}>{label}</span>
    <input id={id} type={type} {...props} className={fieldControl} />
  </label>
)

export default Input
