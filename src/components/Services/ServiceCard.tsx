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
        <AWSLogoIcon className="my-1 size-14 text-neutral" />
      ) : icon === 'javascript' ? (
        <JavaScriptIcon className="my-1 size-14 text-neutral" />
      ) : icon === 'react' ? (
        <ReactLogoIcon className="my-1 size-14 text-neutral" />
      ) : icon === 'nextjs' ? (
        <NextjsIcon className="my-1 size-14 text-neutral" />
      ) : icon === 'python' ? (
        <PythonIcon className="my-1 size-14 text-neutral" />
      ) : icon === 'django' ? (
        <DjangoIcon className="my-1 size-14 text-neutral" />
      ) : icon === 'vue' ? (
        <VueIcon className="my-1 size-14 text-neutral" />
      ) : icon === 'docker' ? (
        <DockerIcon className="my-1 size-14 text-neutral" />
      ) : icon === 'kubernetes' ? (
        <KubernetesIcon className="my-1 size-14 text-neutral" />
      ) : icon === 'flask' ? (
        <FlaskIcon className="my-1 size-14 text-neutral" />
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
