import React from 'react'
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from '@/lib/utils/cn'

const cardVariants = cva(
  "rounded-2xl border transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800",
        outlined: "bg-transparent border-2 border-gray-200 dark:border-gray-700",
        elevated: "bg-white dark:bg-gray-900 shadow-lg border border-gray-100 dark:border-gray-800",
        ghost: "bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800",
        gradient: "bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black border border-gray-200 dark:border-gray-800",
      },
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
      interactive: {
        true: "cursor-pointer hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700",
        false: "",
      },
      active: {
        true: "border-blue-500/50 dark:border-blue-400/50 shadow-lg shadow-blue-500/10 dark:shadow-blue-400/10",
        false: "",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      interactive: false,
      active: false,
    },
  }
)

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  children: React.ReactNode
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, interactive, active, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, size, interactive, active, className }))}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 pb-4", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight text-gray-900 dark:text-white",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-600 dark:text-gray-400", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export default Card
export {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
}