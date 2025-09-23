// Blog related API types
export interface BlogPost {
  id: string
  slug: string
  title: string
  description: string
  content: string
  excerpt: string
  publishedAt: string
  updatedAt?: string
  readingTime: {
    text: string
    minutes: number
    time: number
    words: number
  }
  tags: string[]
  author: Author
  featured?: boolean
  coverImage?: string
  seo?: SEOMetadata
}

export interface Author {
  name: string
  avatar?: string
  bio?: string
  social?: SocialLinks
}

export interface SocialLinks {
  twitter?: string
  github?: string
  linkedin?: string
  website?: string
}

// SEO related types
export interface SEOMetadata {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  canonicalUrl?: string
}

// Navigation related types
export interface NavigationItem {
  href: string
  label: string
  external?: boolean
  icon?: string
  children?: NavigationItem[]
}

export interface FooterSection {
  title: string
  links: NavigationItem[]
}

// Feature related types
export interface Feature {
  id?: string
  icon: React.ComponentType<any>
  title: string
  description: string
  details: string[]
  color: string
  code: string
  videoUrl?: string
  tags?: string[]
}

export interface AdditionalFeature {
  id?: string
  icon: React.ComponentType<any>
  title: string
  description: string
  code?: string
}

// Use case related types
export interface UseCase {
  id?: string
  title: string
  description: string
  tier: string
  tierColor: string
  tags: string[]
  cta: string
  icon: string
  featured?: boolean
  link?: string
}

// Customer story types
export interface CustomerStory {
  id?: string
  company: string
  title: string
  description: string
  logo: string
  impact: string
  industry?: string
  companySize?: string
  link?: string
}

// API Response types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  error?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Filter and search types
export interface SearchFilters {
  query?: string
  tags?: string[]
  category?: string
  dateRange?: {
    start: string
    end: string
  }
}

export interface SearchResult<T> {
  items: T[]
  total: number
  query: string
  filters: SearchFilters
}