/** Language-neutral site constants. Anything with EN/ES copy lives in @/lib/translations. */

export const site = {
  name: 'David Gómez',
  email: 'hi@dgomez.dev',
  linkedin: 'https://www.linkedin.com/in/davidgomezm7/',
  github: 'https://github.com/davidgomezcol',
  photo: '/images/me.webp',
} as const

/** Section anchors, in page order. `key` indexes translations.nav. */
export const navSections = [
  { n: '01', id: 'about', key: 'about' },
  { n: '02', id: 'experience', key: 'experience' },
  { n: '03', id: 'capabilities', key: 'capabilities' },
  { n: '04', id: 'contact', key: 'contact' },
] as const

/** Shared page gutter — matches the design's 1240px column. */
export const container = 'mx-auto w-full max-w-[1240px] px-[clamp(20px,4vw,56px)]'
