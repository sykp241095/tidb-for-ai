export interface Feature {
  icon: React.ComponentType<any>
  title: string
  description: string
  details: string[]
  color: string
  code: string
  videoUrl?: string
}

export interface UseCase {
  title: string
  description: string
  tier: string
  tierColor: string
  tags: string[]
  cta: string
  icon: string
  featured?: boolean
}

export interface CustomerStory {
  company: string
  title: string
  description: string
  logo: string
  impact: string
}

export interface AdditionalFeature {
  icon: React.ComponentType<any>
  title: string
  description: string
  code?: string
}

export interface NavigationItem {
  href: string
  label: string
  external?: boolean
}

export interface FooterSection {
  title: string
  links: NavigationItem[]
}

export interface SocialLink {
  href: string
  icon: React.ComponentType<any>
  label: string
}

export interface ButtonVariant {
  variant: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export interface CardProps {
  className?: string
  children: React.ReactNode
  onClick?: () => void
  active?: boolean
}

export interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  onCopy?: () => void
  copied?: boolean
}