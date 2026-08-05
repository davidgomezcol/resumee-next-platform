import { trackButtonClick } from '@/lib/analytics'
import { ButtonHTMLAttributes, FC } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  trackingName?: string
  trackingLocation?: string
}

const Button: FC<ButtonProps> = ({ text, trackingName, trackingLocation, onClick, ...props }) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (trackingName) {
      trackButtonClick(trackingName, trackingLocation)
    }

    onClick?.(event)
  }

  return (
    <button
      {...props}
      onClick={handleClick}
      className="bg-bone text-void hover:bg-coral disabled:bg-bone/60 w-full cursor-pointer border-0 px-[18px] py-[13px] font-mono text-[11px] tracking-[0.14em] uppercase transition-colors disabled:cursor-not-allowed">
      {text}
    </button>
  )
}

export default Button
