import { FC, TextareaHTMLAttributes } from 'react'
import { fieldControl, fieldLabel } from './Input'

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  label: string
  id: string
  /** Applied to the wrapping label, so callers can control grid placement. */
  className?: string
}

const Textarea: FC<TextareaProps> = ({ id, label, className, ...props }) => (
  <label htmlFor={id} className={`flex flex-col gap-[7px] ${className ?? ''}`}>
    <span className={fieldLabel}>{label}</span>
    <textarea id={id} {...props} className={`${fieldControl} resize-y leading-[1.55]`} />
  </label>
)

export default Textarea
