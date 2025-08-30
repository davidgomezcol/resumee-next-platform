export interface Project {
  title: string
  shortDescription: string
  priority: number
  cover: string
  livePreview?: string
  githubLink?: string
  visitors?: string
  earned?: string
  githubStars?: string
  ratings?: string
  numberOfSales?: string
  type: string
  siteAge?: string
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate?: string
  isCurrent: boolean
  description: string
  technologies: string[]
  achievements: string[]
  companyLogo?: string
  priority: number
}

export interface Heading {
  id: string
  title: string
  items: Heading[]
}

export interface Testimonial {
  name: string
  title?: string
  feedback: string
  image: string
  stars: number
  createdAt: string
}
