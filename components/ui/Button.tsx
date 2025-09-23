import React from 'react'
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from '@/lib/utils/cn'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 shadow-lg hover:shadow-xl focus:ring-gray-500",
        secondary: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-gray-500",
        outline: "border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900 focus:ring-gray-500",
        ghost: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode
  href?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  loading?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  size,
  fullWidth,
  className,
  href,
  disabled,
  icon,
  iconPosition = 'right',
  loading = false,
  ...props
}) => {
  const isDisabled = disabled || loading

  const classes = cn(
    buttonVariants({ variant, size, fullWidth, className }),
    loading && 'cursor-wait'
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
      <a
        href={href}
        className={classes}
        aria-disabled={isDisabled}
        role="button"
        tabIndex={isDisabled ? -1 : undefined}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={classes}
      disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {content}
    </button>
  )
}

export default Button