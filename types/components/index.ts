import { ReactNode, ComponentType } from 'react'

// Base component props
export interface BaseComponentProps {
  className?: string
  children?: ReactNode
}

// Button related types
export type ButtonVariant = 'primary' | 'secondary' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends BaseComponentProps {
  variant?: ButtonVariant
  size?: ButtonSize
  onClick?: () => void
  href?: string
  disabled?: boolean
  loading?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  type?: 'button' | 'submit' | 'reset'
}

// Icon component type
export interface IconProps {
  size?: number
  className?: string
}

export type IconComponent = ComponentType<IconProps>

// Card related types
export interface CardProps extends BaseComponentProps {
  onClick?: () => void
  active?: boolean
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

// Section related types
export interface SectionProps extends BaseComponentProps {
  as?: keyof JSX.IntrinsicElements
  fullWidth?: boolean
  centered?: boolean
}

// Loading states
export interface LoadingState {
  isLoading: boolean
  error?: string | null
}

// Animation related types
export interface AnimationProps {
  delay?: string
  duration?: string
  easing?: string
}

// Responsive breakpoint types
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export interface ResponsiveValue<T> {
  base?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  '2xl'?: T
}