'use server'

import { createChallenge, verifyChallenge, type Challenge } from '@/lib/challenge'
import { validateContact, type ContactValues, type FieldErrors } from '@/lib/contactValidation'
import { sendEmail } from '@/lib/email'
import { translations } from '@/lib/translations'
import type { Language } from '@/lib/translations'
import { checkRateLimit } from '@/utils/rateLimit'
import { headers } from 'next/headers'

export interface ContactFormState {
  success: boolean
  /** Form-level message. Empty when the problem belongs to a specific field. */
  message: string
  /**
   * Echoed back on every failure: React resets the form once the action settles, so these become
   * the fields' `defaultValue` and survive a rejected submission.
   */
  values?: ContactValues
  /** Rendered under the offending input rather than at the foot of the form. */
  fieldErrors?: FieldErrors
  /**
   * A replacement for a challenge that was just rejected. Minted here rather than requested by the
   * client so that its minimum-age exemption cannot be asked for directly.
   */
  challenge?: Challenge
  /**
   * Echoed back when the challenge itself was fine, so an unrelated failure doesn't blank the
   * answer while leaving the same question on screen — which reads as if it had changed.
   * Deliberately absent alongside `challenge`, where the question really is new.
   */
  answer?: string
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

  const values: ContactValues = {
    name: read(formData, 'name'),
    email: read(formData, 'email'),
    subject: read(formData, 'subject'),
    message: read(formData, 'message'),
  }

  const answer = read(formData, 'mathAnswer')
  const fail = (message: string): ContactFormState => ({
    success: false,
    message,
    values,
    answer,
  })

  try {
    // Honeypot field check (bots will fill this out, humans won't see it)
    const honeypot = formData.get('website')
    if (honeypot && honeypot.toString().trim() !== '') {
      console.log('Bot detected via honeypot field')
      return fail(isEs ? 'Envío inválido detectado.' : 'Invalid submission detected.')
    }

    // Signed challenge: covers the answer and the issue time together, so neither can be forged
    // by editing a hidden field. Every rejection asks the client for a fresh question.
    const challenge = verifyChallenge(read(formData, 'challengeToken'), answer)

    if (!challenge.ok) {
      // The rejected token is spent. Hand back a pre-aged replacement so an honest retry isn't
      // met with another "you answered too fast".
      const spent = (message: string): ContactFormState => ({
        success: false,
        message,
        values,
        challenge: createChallenge({ preAged: true }),
      })

      if (challenge.reason === 'tooFast') {
        console.log('Bot detected via challenge timing')
        return spent(
          isEs
            ? 'Por favor tómate tu tiempo para llenar el formulario correctamente.'
            : 'Please take your time to fill out the form properly.',
        )
      }

      if (challenge.reason === 'expired') {
        return spent(
          isEs
            ? 'El formulario estuvo abierto demasiado tiempo. Responde la nueva pregunta e inténtalo de nuevo.'
            : 'The form was open too long. Please answer the new question and try again.',
        )
      }

      if (challenge.reason === 'malformed') {
        return spent(isEs ? 'Envío de formulario inválido.' : 'Invalid form submission.')
      }

      return spent(
        isEs
          ? 'Por favor responde correctamente la pregunta matemática.'
          : 'Please answer the math question correctly.',
      )
    }

    // Same rules the client just ran, because the client can be bypassed
    const fieldErrors = validateContact(values, translations[language].contact)
    if (Object.keys(fieldErrors).length > 0) {
      return { success: false, message: '', values, fieldErrors, answer }
    }

    // Rate limit guards the send, so a rejected submission above never costs a visitor an attempt.
    // Client-supplied `x-forwarded-for` entries come first in the chain, so prefer the headers a
    // proxy sets itself; fall back to the near end of the chain rather than the far one.
    const headersList = await headers()
    // Anything that doesn't parse as a bare address is discarded rather than used as a bucket key,
    // so a client sending junk can't mint itself a fresh quota on every request.
    const asAddress = (value: string | null | undefined) => {
      const candidate = value?.trim()
      return candidate && /^[0-9a-fA-F.:]+$/.test(candidate) ? candidate : undefined
    }
    const clientIp =
      asAddress(headersList.get('x-nf-client-connection-ip')) ||
      asAddress(headersList.get('x-real-ip')) ||
      asAddress(headersList.get('x-forwarded-for')?.split(',').pop()) ||
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
