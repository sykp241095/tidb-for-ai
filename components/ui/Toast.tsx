import React from 'react'
import * as Toast from '@radix-ui/react-toast'
import { cva, type VariantProps } from "class-variance-authority"
import { X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100",
        destructive: "destructive group border-red-500 bg-red-50 text-red-900 dark:bg-red-900 dark:text-red-100",
        success: "border-green-500 bg-green-50 text-green-900 dark:bg-green-900 dark:text-green-100",
        warning: "border-yellow-500 bg-yellow-50 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof Toast.Root>,
    VariantProps<typeof toastVariants> {
  title?: string
  description?: string
  action?: React.ReactNode
}

const ToastRoot = React.forwardRef<
  React.ElementRef<typeof Toast.Root>,
  ToastProps
>(({ className, variant, title, description, action, ...props }, ref) => {
  return (
    <Toast.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    >
      <div className="grid gap-1">
        {title && (
          <Toast.Title className="text-sm font-semibold">
            {title}
          </Toast.Title>
        )}
        {description && (
          <Toast.Description className="text-sm opacity-90">
            {description}
          </Toast.Description>
        )}
      </div>
      {action}
      <Toast.Close className="absolute right-2 top-2 rounded-md p-1 text-gray-500 opacity-0 transition-opacity hover:text-gray-900 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 dark:text-gray-400 dark:hover:text-gray-100">
        <X className="h-4 w-4" />
      </Toast.Close>
    </Toast.Root>
  )
})
ToastRoot.displayName = Toast.Root.displayName

const ToastProvider = Toast.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof Toast.Viewport>,
  React.ComponentPropsWithoutRef<typeof Toast.Viewport>
>(({ className, ...props }, ref) => (
  <Toast.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = Toast.Viewport.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof Toast.Action>,
  React.ComponentPropsWithoutRef<typeof Toast.Action>
>(({ className, ...props }, ref) => (
  <Toast.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-white transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-red-500/30 group-[.destructive]:hover:border-red-500/30 group-[.destructive]:hover:bg-red-500 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-500 dark:ring-offset-gray-950 dark:hover:bg-gray-800 dark:focus:ring-gray-300",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = Toast.Action.displayName

export {
  type ToastProps,
  ToastProvider,
  ToastViewport,
  ToastRoot as Toast,
  ToastAction,
}