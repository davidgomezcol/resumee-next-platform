import { FC, TextareaHTMLAttributes } from 'react'
import { FieldError, RequiredMark, fieldControl, fieldLabel, fieldRule } from './Input'

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  label: string
  id: string
  /** Rendered under the field; also turns the rule and the message coral. */
  error?: string
  /** Applied to the wrapping label, so callers can control grid placement. */
  className?: string
}

const Textarea: FC<TextareaProps> = ({ id, label, error, className, ...props }) => (
  <label htmlFor={id} className={`flex flex-col gap-[7px] ${className ?? ''}`}>
    <span className={fieldLabel}>
      {label}
      {props.required && <RequiredMark />}
    </span>
    <textarea
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      {...props}
      className={`${fieldControl} ${fieldRule(error)} resize-y leading-[1.55]`}
    />
    {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
  </label>
)

export default Textarea
