/** The per-language half of a role entry. Both halves live in the same JSON file. */
export interface RoleContent {
  period: string
  place: string
  title: string
  company: string
  summary: string
  tech: string[]
  achievements: string[]
}

export interface WorkExperience {
  id: string
  /** Higher sorts first — see getAllWorkExperiences in @/services. */
  priority: number
  companyUrl?: string
  en: RoleContent
  es: RoleContent
}
