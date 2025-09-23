import React from 'react'
import { ButtonVariant } from '@/types'
import { cn, createVariantClasses } from '@/lib/utils/cn'

interface ButtonProps extends ButtonVariant {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  disabled?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  loading?: boolean
}

const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

const variantClasses = createVariantClasses(baseClasses, {
  primary: 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 shadow-lg hover:shadow-xl focus:ring-gray-500',
  secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-gray-500',
  outline: 'border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900 focus:ring-gray-500'
})

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
} as const

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  disabled = false,
  icon,
  iconPosition = 'right',
  fullWidth = false,
  loading = false,
  className = ''
}) => {
  const isDisabled = disabled || loading

  const classes = cn(
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    loading && 'cursor-wait',
    className
  )

  const content = (
    <>
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {!loading && icon && iconPosition === 'left' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </>
  )

  if (href && !isDisabled) {
    return (
      <a href={href} className={classes} aria-disabled={isDisabled}>
        {content}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading}
    >
      {content}
    </button>
  )
}

export default Button