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

interface ServiceCardTypes {
  icon: string
  title: string
  shortDescription: string
}

const ServiceCard: React.FC<ServiceCardTypes> = ({ title, shortDescription, icon }) => {
  return (
    <div className="bg-secondary border-border flex flex-col items-center rounded-[14px] border p-5">
      {icon === 'aws' ? (
        <AWSLogoIcon className="text-neutral my-1 size-14" />
      ) : icon === 'javascript' ? (
        <JavaScriptIcon className="text-neutral my-1 size-14" />
      ) : icon === 'react' ? (
        <ReactLogoIcon className="text-neutral my-1 size-14" />
      ) : icon === 'nextjs' ? (
        <NextjsIcon className="text-neutral my-1 size-14" />
      ) : icon === 'python' ? (
        <PythonIcon className="text-neutral my-1 size-14" />
      ) : icon === 'django' ? (
        <DjangoIcon className="text-neutral my-1 size-14" />
      ) : icon === 'vue' ? (
        <VueIcon className="text-neutral my-1 size-14" />
      ) : icon === 'docker' ? (
        <DockerIcon className="text-neutral my-1 size-14" />
      ) : icon === 'kubernetes' ? (
        <KubernetesIcon className="text-neutral my-1 size-14" />
      ) : icon === 'flask' ? (
        <FlaskIcon className="text-neutral my-1 size-14" />
      ) : (
        <Image src={icon} alt={title} className="my-1 size-14" />
      )}
      <h5 className="text-neutral mt-2 mb-5 text-center text-base font-semibold">{title}</h5>
      <div className="bg-primary rounded-2xl p-4">
        <p className="text-neutral text-center text-sm font-normal">{shortDescription}</p>
      </div>
    </div>
  )
}

export default ServiceCard
