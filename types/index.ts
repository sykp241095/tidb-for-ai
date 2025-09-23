// Re-export organized types
export * from './api'
export * from './components'

// Legacy exports for backward compatibility
export type {
  Feature,
  UseCase,
  CustomerStory,
  AdditionalFeature,
  NavigationItem,
  FooterSection
} from './api'

export type {
  ButtonProps,
  CardProps,
  IconComponent,
  LoadingState,
  AnimationProps
} from './components'

// Utility types
export interface SocialLink {
  href: string
  icon: React.ComponentType<any>
  label: string
}

export interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  onCopy?: () => void
  copied?: boolean
  showLineNumbers?: boolean
  maxHeight?: string
}

// Legacy ButtonVariant interface for backward compatibility
export interface ButtonVariant {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}