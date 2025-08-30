'use client'

import { WorkExperience } from '@/lib/types'
import { useLanguage } from '@/contexts/LanguageContext'
import { WorkExperienceTranslation } from '@/lib/workExperienceTranslations'
import Image from 'next/image'
import { CalendarIcon, MapPinIcon, BuildingIcon } from '../../utils/icons'

interface WorkExperienceCardProps {
  data: WorkExperience
  translatedData: WorkExperienceTranslation
  isLast?: boolean
}

const WorkExperienceCard: React.FC<WorkExperienceCardProps> = ({ data, translatedData, isLast = false }) => {
  const { t } = useLanguage()
  
  const {
    company,
    location,
    startDate,
    endDate,
    isCurrent,
    technologies,
    achievements,
    companyLogo,
  } = data

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-6 top-16 h-full w-0.5 bg-border"></div>
      )}
      
      <div className="flex gap-6">
        {/* Timeline dot */}
        <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary">
          {companyLogo ? (
            <Image
              src={companyLogo}
              alt={company}
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
          ) : (
            <BuildingIcon className="h-6 w-6 text-primary-content" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 pb-8">
          <div className="bg-secondary border-border rounded-lg border p-6">
            {/* Header */}
            <div className="mb-4">
              <h3 className="text-secondary-content text-lg font-semibold">{translatedData.position}</h3>
              <h4 className="text-accent text-base font-medium">{company}</h4>
              
              {/* Date and Location */}
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-neutral">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                                            <span>
                            {formatDate(startDate)} - {isCurrent ? t.experience.present : endDate ? formatDate(endDate) : t.experience.present}
                          </span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{location}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <p className="text-secondary-content text-sm leading-relaxed">{translatedData.description}</p>
            </div>

            {/* Technologies */}
                                {technologies.length > 0 && (
                      <div className="mb-4">
                        <h5 className="text-secondary-content mb-2 text-sm font-medium">{t.experience.technologies}</h5>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-primary text-primary-content rounded-full px-3 py-1 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
                                {achievements.length > 0 && (
                      <div>
                        <h5 className="text-secondary-content mb-2 text-sm font-medium">{t.experience.achievements}</h5>
                                        <ul className="space-y-1">
                          {translatedData.achievements.map((achievement, index) => (
                            <li key={index} className="text-secondary-content text-sm leading-relaxed">
                              • {achievement}
                            </li>
                          ))}
                        </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkExperienceCard
