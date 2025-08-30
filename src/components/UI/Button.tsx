import { ButtonHTMLAttributes, FC } from 'react'
import { trackButtonClick } from '@/lib/analytics'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  trackingName?: string
  trackingLocation?: string
}

const Button: FC<ButtonProps> = ({ text, trackingName, trackingLocation, onClick, ...props }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Track button click if tracking name is provided
    if (trackingName) {
      trackButtonClick(trackingName, trackingLocation)
    }

    // Call original onClick if provided
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <button
      {...props}
      onClick={handleClick}
      className="bg-accent hover:bg-accent/60 disabled:bg-accent/40 text-secondary w-full cursor-pointer rounded-lg px-[10px] py-2 transition-colors duration-300">
      {text}
    </button>
  )
}

export default Button
