// Google Analytics event tracking utility

declare global {
  interface Window {
    gtag: (...args: (string | Record<string, unknown>)[]) => void
  }
}

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Predefined event tracking functions
export const trackFormSubmission = (formName: string) => {
  trackEvent('form_submit', 'engagement', formName)
}

export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent('button_click', 'engagement', `${buttonName}${location ? `_${location}` : ''}`)
}

export const trackEmailClick = (emailAddress: string, location?: string) => {
  trackEvent('email_click', 'engagement', `${emailAddress}${location ? `_${location}` : ''}`)
}

export const trackSocialClick = (platform: string) => {
  trackEvent('social_click', 'engagement', platform)
}

export const trackNavigation = (section: string) => {
  trackEvent('navigation', 'engagement', section)
}
