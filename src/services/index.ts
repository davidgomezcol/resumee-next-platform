import { Project, Testimonial, WorkExperience } from '@/lib/types'
import { promises as fs } from 'fs'
import path from 'path'

// Function to read project file
const readProjectFile = async (filePath: string): Promise<Project> => {
  const projectData = await fs.readFile(filePath, 'utf8')
  return JSON.parse(projectData)
}

// Function to read work experience file
const readWorkExperienceFile = async (filePath: string): Promise<WorkExperience> => {
  const workExperienceData = await fs.readFile(filePath, 'utf8')
  return JSON.parse(workExperienceData)
}

// Function to get all projects
const getAllProjects = async (): Promise<Project[]> => {
  try {
    const projectsPath = path.join(process.cwd(), '/content/projects')
    const projectsName = await fs.readdir(projectsPath)

    const projects = await Promise.all(
      projectsName.map(async (projectName) => {
        const filePath = path.join(projectsPath, projectName)
        const projectDetails = await readProjectFile(filePath)
        return projectDetails
      }),
    )

    // Sort projects by priority
    projects.sort((a, b) => a.priority - b.priority)

    return projects
  } catch (error) {
    // Handle errors
    console.error('Error:', error)
    return []
  }
}

// Function to get all work experiences
const getAllWorkExperiences = async (): Promise<WorkExperience[]> => {
  try {
    const workExperiencesPath = path.join(process.cwd(), '/content/work-experience')
    const workExperiencesName = await fs.readdir(workExperiencesPath)

    const workExperiences = await Promise.all(
      workExperiencesName.map(async (workExperienceName) => {
        const filePath = path.join(workExperiencesPath, workExperienceName)
        const workExperienceDetails = await readWorkExperienceFile(filePath)
        return workExperienceDetails
      }),
    )

    // Sort work experiences by priority (most recent first)
    workExperiences.sort((a, b) => b.priority - a.priority)

    return workExperiences
  } catch (error) {
    // Handle errors
    console.error('Error:', error)
    return []
  }
}

const getAllTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const testimonialsPath = path.join(process.cwd(), '/content/testimonials')
    const testimonialsName = await fs.readdir(testimonialsPath)

    const testimonials = await Promise.all(
      testimonialsName.map(async (projectName) => {
        const filePath = path.join(testimonialsPath, projectName)
        const projectDetails = await fs.readFile(filePath, 'utf8')
        return JSON.parse(projectDetails)
      }),
    )

    // Sort testimonials by date
    testimonials.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return testimonials
  } catch (error) {
    // Handle errors
    console.error('Error:', error)
    return []
  }
}

export { getAllProjects, getAllTestimonials, getAllWorkExperiences }
