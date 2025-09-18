import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'tier' | 'tag'
  color?: string
  className?: string
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  color,
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium'

  const variantClasses = {
    default: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
    tier: color || 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    tag: 'bg-gray-200/60 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 text-xs font-mono'
  }

  const classes = `
    ${baseClasses}
    ${variant === 'tier' && color ? color : variantClasses[variant]}
    ${className}
  `.trim().replace(/\s+/g, ' ')

  return (
    <span className={classes}>
      {children}
    </span>
  )
}

export default Badge