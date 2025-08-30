'use client'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { 
  AWSLogoIcon, 
  ReactLogoIcon, 
  NextjsIcon, 
  PythonIcon, 
  VueIcon, 
  DockerIcon, 
  JavaScriptIcon, 
  KubernetesIcon,
  DjangoIcon,
  FlaskIcon,
} from '../../utils/icons'

const MarqueeWrapper = dynamic(() => import('../Marquee/MarqueeWrapper'), { ssr: false })

type SkillsProps = {
  skills: { name: string; icon: string }[]
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <MarqueeWrapper className="from-primary to-primary via-marquee bg-linear-to-r">
      <div className="flex gap-8 lg:gap-24">
        {skills.map(({ name, icon }, index) => (
          <span
            key={index}
            className="font-inter text-primary-content flex items-center text-xs lg:text-base">
            {icon === 'aws' ? (
              <AWSLogoIcon className="mx-2 size-11 lg:size-14 text-primary-content" />
            ) : icon === 'javascript' ? (
              <JavaScriptIcon className="mx-2 size-11 lg:size-14 text-primary-content" />
            ) : icon === 'react' ? (
              <ReactLogoIcon className="mx-2 size-11 lg:size-14 text-primary-content" />
            ) : icon === 'nextjs' ? (
              <NextjsIcon className="mx-2 size-11 lg:size-14 text-primary-content" />
            ) : icon === 'python' ? (
              <PythonIcon className="mx-2 size-11 lg:size-14 text-primary-content" />
            ) : icon === 'flask' ? (
              <FlaskIcon className="mx-2 size-11 lg:size-14 text-primary-content" />
            ) : icon === 'vue' ? (
              <VueIcon className="mx-2 size-11 lg:size-14 text-primary-content" />
            ) : icon === 'docker' ? (
              <DockerIcon className="mx-2 size-11 lg:size-14 text-primary-content" />
            ) : icon === 'kubernetes' ? (
              <KubernetesIcon className="mx-2 size-11 lg:size-14 text-primary-content" />
            ) : icon === 'django' ? (
              <DjangoIcon className="mx-2 size-11 lg:size-14 text-primary-content" />
            ) : icon === 'flask' ? (
              <FlaskIcon className="mx-2 size-11 lg:size-14 text-primary-content" />
            ) : (
              <Image src={icon} alt={name} className="mx-2 size-11 lg:size-14" />
            )}
            {name}
          </span>
        ))}
      </div>
    </MarqueeWrapper>
  )
}

export default Skills
