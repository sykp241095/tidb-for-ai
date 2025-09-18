import React from 'react'

interface SectionProps {
  children: React.ReactNode
  id?: string
  className?: string
  background?: 'white' | 'gray' | 'gradient'
  padding?: 'sm' | 'md' | 'lg'
}

const Section: React.FC<SectionProps> = ({
  children,
  id,
  className = '',
  background = 'white',
  padding = 'lg'
}) => {
  const backgroundClasses = {
    white: 'bg-white dark:bg-black',
    gray: 'bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-black dark:to-gray-950',
    gradient: 'bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-black dark:to-gray-950'
  }

  const paddingClasses = {
    sm: 'py-12 px-4 sm:px-6 lg:px-8',
    md: 'py-16 px-4 sm:px-6 lg:px-8',
    lg: 'py-24 px-4 sm:px-6 lg:px-8'
  }

  const classes = `
    ${backgroundClasses[background]}
    ${paddingClasses[padding]}
    ${className}
  `.trim().replace(/\s+/g, ' ')

  return (
    <section id={id} className={classes}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  )
}

export default Section