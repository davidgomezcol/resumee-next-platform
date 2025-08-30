import nodemailer from 'nodemailer'

// This module should only be imported by server actions
export const sendEmail = async (data: {
  name: string
  email: string
  subject: string
  message: string
}) => {
  const { name, email, subject, message } = data

  // Get environment variables at runtime
  const emailUser = process.env.EMAIL_USER
  const emailPass = process.env.EMAIL_PASS

  if (!emailUser || !emailPass) {
    throw new Error('Email configuration not available')
  }

  // Create transporter using Zoho Mail SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 587,
    secure: false,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  })

  // Email content
  const mailOptions = {
    from: emailUser,
    to: emailUser,
    subject: `Portfolio Contact: ${subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <hr>
      <p><em>This message was sent from your portfolio contact form.</em></p>
    `,
  }

  // Send email
  return await transporter.sendMail(mailOptions)
}
