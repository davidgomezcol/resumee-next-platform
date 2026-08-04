'use server'

import { validateContact, type ContactValues, type FieldErrors } from '@/lib/contactValidation'
import { sendEmail } from '@/lib/email'
import { translations } from '@/lib/translations'
import type { Language } from '@/lib/translations'
import { checkRateLimit } from '@/utils/rateLimit'
import { headers } from 'next/headers'

export type ContactFormValues = ContactValues

export interface ContactFormState {
  success: boolean
  /** Form-level message. Empty when the problem belongs to a specific field. */
  message: string
  /**
   * Echoed back on every failure: React resets the form once the action settles, so these become
   * the fields' `defaultValue` and survive a rejected submission.
   */
  values?: ContactFormValues
  /** Rendered under the offending input rather than at the foot of the form. */
  fieldErrors?: FieldErrors
}

const LANGUAGES = ['en', 'es'] as const

/** Anything else would blow up `translations[language]` on the success path. */
const isLanguage = (value: unknown): value is Language =>
  typeof value === 'string' && (LANGUAGES as readonly string[]).includes(value)

const read = (formData: FormData, key: string) => (formData.get(key) ?? '').toString().trim()

const action = async (
  _: ContactFormState | null,
  formData: FormData,
): Promise<ContactFormState> => {
  // Get language from form data
  const rawLanguage = formData.get('language')
  const language: Language = isLanguage(rawLanguage) ? rawLanguage : 'en'
  const isEs = language === 'es'

  const values: ContactFormValues = {
    name: read(formData, 'name'),
    email: read(formData, 'email'),
    subject: read(formData, 'subject'),
    message: read(formData, 'message'),
  }

  const fail = (message: string): ContactFormState => ({ success: false, message, values })

  try {
    // Honeypot field check (bots will fill this out, humans won't see it)
    const honeypot = formData.get('website')
    if (honeypot && honeypot.toString().trim() !== '') {
      console.log('Bot detected via honeypot field')
      return fail(isEs ? 'Envío inválido detectado.' : 'Invalid submission detected.')
    }

    // Timestamp validation (prevent instant submissions). A non-numeric value would make every
    // comparison below NaN, which is falsy against `<` — so reject it outright.
    const submissionTime = Number.parseInt(read(formData, 'timestamp'), 10)
    if (!Number.isFinite(submissionTime)) {
      return fail(isEs ? 'Envío de formulario inválido.' : 'Invalid form submission.')
    }

    // Require at least 3 seconds to fill out the form
    if (Date.now() - submissionTime < 3000) {
      console.log('Bot detected via timestamp validation')
      return fail(
        isEs
          ? 'Por favor tómate tu tiempo para llenar el formulario correctamente.'
          : 'Please take your time to fill out the form properly.',
      )
    }

    // Math captcha validation
    const mathAnswer = formData.get('mathAnswer')
    const expectedAnswer = formData.get('expectedAnswer')

    if (!mathAnswer || !expectedAnswer || mathAnswer.toString() !== expectedAnswer.toString()) {
      return fail(
        isEs
          ? 'Por favor responde correctamente la pregunta matemática.'
          : 'Please answer the math question correctly.',
      )
    }

    // Same rules the client just ran, because the client can be bypassed
    const fieldErrors = validateContact(values, translations[language].contact)
    if (Object.keys(fieldErrors).length > 0) {
      return { success: false, message: '', values, fieldErrors }
    }

    // Rate limit guards the send, so a rejected submission above never costs a visitor an attempt.
    // Client-supplied `x-forwarded-for` entries come first in the chain, so prefer the headers a
    // proxy sets itself; fall back to the near end of the chain rather than the far one.
    const headersList = await headers()
    const clientIp =
      headersList.get('x-nf-client-connection-ip') ||
      headersList.get('x-real-ip') ||
      headersList.get('x-forwarded-for')?.split(',').pop()?.trim() ||
      'unknown'

    if (!checkRateLimit(clientIp, 3, 300000)) {
      // 3 sends per 5 minutes
      return fail(
        isEs
          ? 'Demasiados intentos de envío. Por favor espera unos minutos antes de intentar de nuevo.'
          : 'Too many submission attempts. Please wait a few minutes before trying again.',
      )
    }

    // Send email using the separate email module
    await sendEmail(values)

    return {
      success: true,
      message: translations[language].contact.successMessage,
    }
  } catch (error) {
    console.error('Contact form submission error: ' + error)

    // Check if it's an email configuration error
    if (error instanceof Error && error.message.includes('Email configuration')) {
      return fail(
        isEs
          ? 'El formulario de contacto no está configurado. Por favor intenta de nuevo más tarde o contacta al administrador.'
          : 'Contact form is not configured. Please try again later or contact the administrator.',
      )
    }

    return fail(
      isEs
        ? '¡Ups! Hubo un problema al enviar tu formulario. Por favor intenta de nuevo más tarde.'
        : 'Oops! There was a problem submitting your form. Please try again later.',
    )
  }
}

export default action
