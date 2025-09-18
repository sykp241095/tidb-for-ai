import React from 'react'
import { CardProps } from '@/types'

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  active = false
}) => {
  const baseClasses = 'rounded-2xl border transition-all duration-300'

  const interactiveClasses = onClick
    ? 'cursor-pointer hover:shadow-lg'
    : ''

  const activeClasses = active
    ? 'border-blue-500/50 dark:border-blue-400/50 shadow-lg shadow-blue-500/10 dark:shadow-blue-400/10'
    : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'

  const backgroundClasses = 'bg-white dark:bg-gray-900'

  const classes = `
    ${baseClasses}
    ${interactiveClasses}
    ${activeClasses}
    ${backgroundClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ')

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  )
}

export default Card