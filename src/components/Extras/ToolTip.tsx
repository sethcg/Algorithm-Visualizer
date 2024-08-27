import { ReactNode } from 'react'

interface Tooltip {
  message: string
  children: ReactNode
  className: string
}

export default function Tooltip({ message, children, className }: Tooltip) {
  const divClass = `whitespace-nowrap absolute top-10 scale-0 transition-all rounded-2xl px-[8px] break-keep bg-gray-800 p-1 text-white text-xs group-hover:scale-100 ${className}`
  return (
    <div className="group relative flex">
      {children}
      <span className={divClass}>{message}</span>
    </div>
  )
}
