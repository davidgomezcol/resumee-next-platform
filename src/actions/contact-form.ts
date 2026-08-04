'use server'

import { sendEmail } from '@/lib/email'
import { translations } from '@/lib/translations'
import type { Language } from '@/lib/translations'
import { checkRateLimit } from '@/utils/rateLimit'
import { headers } from 'next/headers'

/**
 * What the visitor typed. Echoed back on every failure: React resets the form once the action
 * settles, so these become the fields' `defaultValue` and survive a rejected submission.
 */
export interface ContactFormValues {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactFormState {
  success: boolean
  message: string
  values?: ContactFormValues
}

const read = (formData: FormData, key: string) => (formData.get(key) ?? '').toString()

const action = async (
  _: ContactFormState | null,
  formData: FormData,
): Promise<ContactFormState> => {
  // Get language from form data
  const language = (formData.get('language') as Language) || 'en'

  const values: ContactFormValues = {
    name: read(formData, 'name'),
    email: read(formData, 'email'),
    subject: read(formData, 'subject'),
    message: read(formData, 'message'),
  }

  const fail = (message: string): ContactFormState => ({ success: false, message, values })

  try {
    // Get client IP for rate limiting
    const headersList = await headers()
    const forwarded = headersList.get('x-forwarded-for')
    const realIp = headersList.get('x-real-ip')
    const clientIp = forwarded?.split(',')[0] || realIp || 'unknown'

    // Rate limiting check
    if (!checkRateLimit(clientIp, 3, 300000)) {
      // 3 attempts per 5 minutes
      return fail(
        language === 'es'
          ? 'Demasiados intentos de envío. Por favor espera unos minutos antes de intentar de nuevo.'
          : 'Too many submission attempts. Please wait a few minutes before trying again.',
      )
    }

    // Honeypot field check (bots will fill this out, humans won't see it)
    const honeypot = formData.get('website')
    if (honeypot && honeypot.toString().trim() !== '') {
      console.log('Bot detected via honeypot field')
      return fail(language === 'es' ? 'Envío inválido detectado.' : 'Invalid submission detected.')
    }

    // Timestamp validation (prevent instant submissions)
    const timestamp = formData.get('timestamp')
    if (!timestamp) {
      return fail(language === 'es' ? 'Envío de formulario inválido.' : 'Invalid form submission.')
    }

    const submissionTime = parseInt(timestamp.toString())
    const currentTime = Date.now()
    const timeDiff = currentTime - submissionTime

    // Require at least 3 seconds to fill out the form
    if (timeDiff < 3000) {
      console.log('Bot detected via timestamp validation')
      return fail(
        language === 'es'
          ? 'Por favor tómate tu tiempo para llenar el formulario correctamente.'
          : 'Please take your time to fill out the form properly.',
      )
    }

    // Math captcha validation
    const mathAnswer = formData.get('mathAnswer')
    const expectedAnswer = formData.get('expectedAnswer')

    if (!mathAnswer || !expectedAnswer || mathAnswer.toString() !== expectedAnswer.toString()) {
      return fail(
        language === 'es'
          ? 'Por favor responde correctamente la pregunta matemática.'
          : 'Please answer the math question correctly.',
      )
    }

    if (!values.name)
      return fail(
        language === 'es' ? 'Por favor proporciona tu nombre.' : 'Please provide your name.',
      )

    if (!values.email)
      return fail(
        language === 'es'
          ? 'Por favor proporciona tu dirección de correo electrónico.'
          : 'Please provide your email address.',
      )

    if (!values.subject)
      return fail(
        language === 'es' ? 'Por favor proporciona un asunto.' : 'Please provide a subject.',
      )

    if (!values.message)
      return fail(
        language === 'es' ? 'Por favor proporciona un mensaje.' : 'Please provide a message.',
      )

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
        language === 'es'
          ? 'El formulario de contacto no está configurado. Por favor intenta de nuevo más tarde o contacta al administrador.'
          : 'Contact form is not configured. Please try again later or contact the administrator.',
      )
    }

    return fail(
      language === 'es'
        ? '¡Ups! Hubo un problema al enviar tu formulario. Por favor intenta de nuevo más tarde.'
        : 'Oops! There was a problem submitting your form. Please try again later.',
    )
  }
}

export default action
