'use client'

import { WorkExperience } from '@/lib/types'
import { useLanguage } from '@/contexts/LanguageContext'
import { workExperienceTranslations } from '@/lib/workExperienceTranslations'
import SectionHeading from '../SectionHeading/SectionHeading'
import WorkExperienceCard from './WorkExperienceCard'

interface WorkExperienceSectionProps {
  workExperiences: WorkExperience[]
}

const WorkExperienceSection: React.FC<WorkExperienceSectionProps> = ({ workExperiences }) => {
  const { t, language } = useLanguage()
  const translatedExperiences = workExperienceTranslations[language]
  
  return (
    <section id="experience">
      <SectionHeading title={t.experience.title} />

      <div className="my-8 md:my-12">
        <div className="space-y-0">
          {workExperiences.map((experience, index) => (
            <WorkExperienceCard
              key={experience.id}
              data={experience}
              translatedData={translatedExperiences[index]}
              isLast={index === workExperiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default WorkExperienceSection
