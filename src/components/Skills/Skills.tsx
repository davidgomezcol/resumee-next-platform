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
              <AWSLogoIcon className="text-primary-content mx-2 size-11 lg:size-14" />
            ) : icon === 'javascript' ? (
              <JavaScriptIcon className="text-primary-content mx-2 size-11 lg:size-14" />
            ) : icon === 'react' ? (
              <ReactLogoIcon className="text-primary-content mx-2 size-11 lg:size-14" />
            ) : icon === 'nextjs' ? (
              <NextjsIcon className="text-primary-content mx-2 size-11 lg:size-14" />
            ) : icon === 'python' ? (
              <PythonIcon className="text-primary-content mx-2 size-11 lg:size-14" />
            ) : icon === 'flask' ? (
              <FlaskIcon className="text-primary-content mx-2 size-11 lg:size-14" />
            ) : icon === 'vue' ? (
              <VueIcon className="text-primary-content mx-2 size-11 lg:size-14" />
            ) : icon === 'docker' ? (
              <DockerIcon className="text-primary-content mx-2 size-11 lg:size-14" />
            ) : icon === 'kubernetes' ? (
              <KubernetesIcon className="text-primary-content mx-2 size-11 lg:size-14" />
            ) : icon === 'django' ? (
              <DjangoIcon className="text-primary-content mx-2 size-11 lg:size-14" />
            ) : icon === 'flask' ? (
              <FlaskIcon className="text-primary-content mx-2 size-11 lg:size-14" />
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
