import React from 'react'
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from '@/lib/utils/cn'

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100",
        secondary: "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-800/80",
        destructive: "border-transparent bg-red-100 text-red-900 hover:bg-red-100/80 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-900/80",
        success: "border-transparent bg-green-100 text-green-900 hover:bg-green-100/80 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-900/80",
        warning: "border-transparent bg-yellow-100 text-yellow-900 hover:bg-yellow-100/80 dark:bg-yellow-900 dark:text-yellow-100 dark:hover:bg-yellow-900/80",
        info: "border-transparent bg-blue-100 text-blue-900 hover:bg-blue-100/80 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-900/80",
        outline: "text-gray-950 dark:text-gray-50",
        tier: "border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        tag: "border-transparent bg-gray-200/60 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 font-mono",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Badge.displayName = "Badge"

export default Badge
export { badgeVariants }