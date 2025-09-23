import React from 'react'
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from '@/lib/utils/cn'

const spinnerVariants = cva(
  "animate-spin rounded-full border-2 border-transparent border-t-current",
  {
    variants: {
      size: {
        xs: "w-3 h-3",
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
        xl: "w-12 h-12",
      },
      colorScheme: {
        primary: "text-black dark:text-white",
        secondary: "text-gray-600 dark:text-gray-400",
        accent: "text-blue-600 dark:text-blue-400",
        success: "text-green-600 dark:text-green-400",
        warning: "text-yellow-600 dark:text-yellow-400",
        danger: "text-red-600 dark:text-red-400",
        current: "text-current",
      },
      variant: {
        default: "border-2",
        thick: "border-4",
        thin: "border-[1px]",
      }
    },
    defaultVariants: {
      size: "md",
      colorScheme: "primary",
      variant: "default",
    },
  }
)

interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size,
  colorScheme,
  variant,
  className,
  label = "Loading...",
  ...props
}) => {
  return (
    <div
      className={cn(spinnerVariants({ size, colorScheme, variant, className }))}
      role="status"
      aria-label={label}
      {...props}
    >
      <span className="sr-only">{label}</span>
    </div>
  )
}

export default LoadingSpinner