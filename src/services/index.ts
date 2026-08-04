import { WorkExperience } from '@/lib/types'
import { promises as fs } from 'fs'
import path from 'path'

/**
 * Reads every role in /content/work-experience, most recent first.
 * Each file carries both languages, so no separate translation table is needed.
 */
const getAllWorkExperiences = async (): Promise<WorkExperience[]> => {
  try {
    const workExperiencesPath = path.join(process.cwd(), '/content/work-experience')
    const fileNames = await fs.readdir(workExperiencesPath)

    const workExperiences = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith('.json'))
        .map(async (fileName) => {
          const contents = await fs.readFile(path.join(workExperiencesPath, fileName), 'utf8')
          return JSON.parse(contents) as WorkExperience
        }),
    )

    // Higher priority first — BriteCore (8) down to Covencaucho (1).
    workExperiences.sort((a, b) => b.priority - a.priority)

    return workExperiences
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

export { getAllWorkExperiences }
