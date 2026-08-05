import { RoleContent, WorkExperience } from '@/lib/types'
import { promises as fs } from 'fs'
import path from 'path'

const REQUIRED_TEXT: (keyof RoleContent)[] = ['period', 'place', 'title', 'company', 'summary']

/**
 * `JSON.parse(...) as WorkExperience` asserts a shape nothing checks. Because the prerender only
 * ever renders English, a role whose `es` block is missing or misspelled builds green and then
 * throws for the first visitor who switches language. Checking here — where there is already a
 * try/catch — turns that into a skipped entry and a build log line.
 */
const isValidRole = (value: unknown, fileName: string): value is WorkExperience => {
  const role = value as Partial<WorkExperience> | null
  const complain = (reason: string) => {
    console.error(`Skipping ${fileName}: ${reason}`)
    return false
  }

  if (!role || typeof role !== 'object') return complain('not an object')
  if (typeof role.id !== 'string' || !role.id) return complain('missing "id"')
  if (typeof role.priority !== 'number' || !Number.isFinite(role.priority)) {
    return complain('"priority" must be a number — sorting yields NaN otherwise')
  }

  for (const language of ['en', 'es'] as const) {
    const content = role[language]
    if (!content || typeof content !== 'object') return complain(`missing "${language}" block`)
    for (const key of REQUIRED_TEXT) {
      if (typeof content[key] !== 'string' || !content[key]) {
        return complain(`"${language}.${key}" is missing or empty`)
      }
    }
    for (const key of ['tech', 'achievements'] as const) {
      if (!Array.isArray(content[key])) return complain(`"${language}.${key}" must be an array`)
    }
  }

  return true
}

/**
 * Reads every role in /content/work-experience, most recent first.
 * Each file carries both languages, so no separate translation table is needed.
 */
const getAllWorkExperiences = async (): Promise<WorkExperience[]> => {
  try {
    const workExperiencesPath = path.join(process.cwd(), '/content/work-experience')
    const fileNames = await fs.readdir(workExperiencesPath)

    const parsed = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith('.json'))
        .map(async (fileName) => {
          const contents = await fs.readFile(path.join(workExperiencesPath, fileName), 'utf8')
          try {
            const role: unknown = JSON.parse(contents)
            return isValidRole(role, fileName) ? role : null
          } catch (error) {
            console.error(`Skipping ${fileName}: invalid JSON — ${error}`)
            return null
          }
        }),
    )

    const workExperiences = parsed.filter((role): role is WorkExperience => role !== null)

    // Higher priority first — BriteCore (8) down to Covencaucho (1).
    workExperiences.sort((a, b) => b.priority - a.priority)

    return workExperiences
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

export { getAllWorkExperiences }
