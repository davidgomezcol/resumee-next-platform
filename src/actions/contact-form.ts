'use server'

import { checkRateLimit } from '@/utils/rateLimit'
import { headers } from 'next/headers'
import { sendEmail } from '@/lib/email'

const action = async (_: { success: boolean; message: string } | null, formData: FormData) => {
  try {
    // Get client IP for rate limiting
    const headersList = await headers()
    const forwarded = headersList.get('x-forwarded-for')
    const realIp = headersList.get('x-real-ip')
    const clientIp = forwarded?.split(',')[0] || realIp || 'unknown'

    // Rate limiting check
    if (!checkRateLimit(clientIp, 3, 300000)) { // 3 attempts per 5 minutes
      return {
        success: false,
        message: 'Too many submission attempts. Please wait a few minutes before trying again.',
      }
    }

    // Honeypot field check (bots will fill this out, humans won't see it)
    const honeypot = formData.get('website')
    if (honeypot && honeypot.toString().trim() !== '') {
      console.log('Bot detected via honeypot field')
      return {
        success: false,
        message: 'Invalid submission detected.',
      }
    }

    // Timestamp validation (prevent instant submissions)
    const timestamp = formData.get('timestamp')
    if (!timestamp) {
      return {
        success: false,
        message: 'Invalid form submission.',
      }
    }

    const submissionTime = parseInt(timestamp.toString())
    const currentTime = Date.now()
    const timeDiff = currentTime - submissionTime

    // Require at least 3 seconds to fill out the form
    if (timeDiff < 3000) {
      console.log('Bot detected via timestamp validation')
      return {
        success: false,
        message: 'Please take your time to fill out the form properly.',
      }
    }

    // Math captcha validation
    const mathAnswer = formData.get('mathAnswer')
    const expectedAnswer = formData.get('expectedAnswer')
    
    if (!mathAnswer || !expectedAnswer || mathAnswer.toString() !== expectedAnswer.toString()) {
      return {
        success: false,
        message: 'Please answer the math question correctly.',
      }
    }

    const name = formData.get('name')
    if (!name)
      return {
        success: false,
        message: 'Please provide your name.',
      }

    const email = formData.get('email')
    if (!email)
      return {
        success: false,
        message: 'Please provide your email address.',
      }

    const subject = formData.get('subject')
    if (!subject)
      return {
        success: false,
        message: 'Please provide a subject.',
      }

    const message = formData.get('message')
    if (!message)
      return {
        success: false,
        message: 'Please provide a message.',
      }

    // Send email using the separate email module
    await sendEmail({
      name: name.toString(),
      email: email.toString(),
      subject: subject.toString(),
      message: message.toString(),
    })

    return { success: true, message: 'Thanks for your submission! I\'ll get back to you soon.' }
  } catch (error) {
    console.error('Contact form submission error: ' + error)
    
    // Check if it's an email configuration error
    if (error instanceof Error && error.message.includes('Email configuration')) {
      return {
        success: false,
        message: 'Contact form is not configured. Please try again later or contact the administrator.',
      }
    }
    
    return {
      success: false,
      message: 'Oops! There was a problem submitting your form. Please try again later.',
    }
  }
}

export default action
