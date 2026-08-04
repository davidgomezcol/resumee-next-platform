import type { Translations } from './translations'

export type ContactField = 'name' | 'email' | 'subject' | 'message'

export type ContactValues = Record<ContactField, string>

export type FieldErrors = Partial<Record<ContactField, string>>

/** Deliberately permissive — it rejects the malformed and the multi-line, not the exotic. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Nothing below the ~1MB action body limit bounds these on its own. */
export const FIELD_LIMITS: Record<ContactField, number> = {
  name: 100,
  email: 254,
  subject: 150,
  message: 5000,
}

export const CONTACT_FIELDS: ContactField[] = ['name', 'email', 'subject', 'message']

/**
 * One rule set, run in both places: the client for instant feedback, the server because the client
 * can be bypassed. Errors are keyed by field so each renders under the input that caused it.
 */
export const validateContact = (values: ContactValues, t: Translations['contact']): FieldErrors => {
  const errors: FieldErrors = {}
  const tooLong = (field: ContactField) =>
    t.errors.tooLong.replace('{max}', String(FIELD_LIMITS[field]))

  if (!values.name) errors.name = t.errors.nameRequired
  else if (values.name.length > FIELD_LIMITS.name) errors.name = tooLong('name')

  if (!values.email) errors.email = t.errors.emailRequired
  else if (!EMAIL_PATTERN.test(values.email)) errors.email = t.errors.emailInvalid
  else if (values.email.length > FIELD_LIMITS.email) errors.email = tooLong('email')

  // Subject stays optional, matching the form — only its length is checked.
  if (values.subject.length > FIELD_LIMITS.subject) errors.subject = tooLong('subject')

  if (!values.message) errors.message = t.errors.messageRequired
  else if (values.message.length > FIELD_LIMITS.message) errors.message = tooLong('message')

  return errors
}
