export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  category: string
  featured: boolean
  readingTime: number
  image?: string
  content: string
}

export interface BlogMatter {
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  category: string
  featured: boolean
  readingTime: number
  image?: string
}

export interface BlogSummary {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  category: string
  featured: boolean
  readingTime: number
  image?: string
}

export interface BlogPageProps {
  posts: BlogSummary[]
  categories: string[]
  tags: string[]
}

export interface BlogPostPageProps {
  post: BlogPost
  relatedPosts: BlogSummary[]
}