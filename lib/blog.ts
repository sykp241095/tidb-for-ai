import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { BlogPost, BlogSummary, BlogMatter } from '@/types/blog'

const BLOG_DIRECTORY = path.join(process.cwd(), 'content/blogs')

export function getAllBlogSlugs(): string[] {
  try {
    const files = fs.readdirSync(BLOG_DIRECTORY)
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace(/\.md$/, ''))
  } catch (error) {
    console.error('Error reading blog directory:', error)
    return []
  }
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(BLOG_DIRECTORY, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Validate required frontmatter fields
    const requiredFields = ['title', 'description', 'date', 'author', 'tags', 'category']
    for (const field of requiredFields) {
      if (!data[field]) {
        console.warn(`Missing required field '${field}' in ${slug}.md`)
        return null
      }
    }

    // Calculate reading time if not provided
    const readingStats = readingTime(content)
    const estimatedReadingTime = data.readingTime || Math.ceil(readingStats.minutes)

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      author: data.author,
      tags: Array.isArray(data.tags) ? data.tags : [],
      category: data.category,
      featured: Boolean(data.featured),
      readingTime: estimatedReadingTime,
      image: data.image,
      content
    }
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}

export function getAllBlogPosts(): BlogSummary[] {
  const slugs = getAllBlogSlugs()
  const posts = slugs
    .map(slug => {
      const post = getBlogPostBySlug(slug)
      if (!post) return null

      // Return summary without content for performance
      const { content, ...summary } = post
      return summary
    })
    .filter((post): post is BlogSummary => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getFeaturedBlogPosts(): BlogSummary[] {
  return getAllBlogPosts().filter(post => post.featured)
}

export function getBlogPostsByCategory(category: string): BlogSummary[] {
  return getAllBlogPosts().filter(post =>
    post.category.toLowerCase() === category.toLowerCase()
  )
}

export function getBlogPostsByTag(tag: string): BlogSummary[] {
  return getAllBlogPosts().filter(post =>
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

export function getRelatedBlogPosts(currentPost: BlogPost, limit: number = 3): BlogSummary[] {
  const allPosts = getAllBlogPosts().filter(post => post.slug !== currentPost.slug)

  // Score posts based on shared tags and category
  const scoredPosts = allPosts.map(post => {
    let score = 0

    // Same category gets high score
    if (post.category === currentPost.category) {
      score += 3
    }

    // Shared tags get points
    const sharedTags = post.tags.filter(tag =>
      currentPost.tags.includes(tag)
    )
    score += sharedTags.length * 2

    return { post, score }
  })

  // Sort by score and return top posts
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post)
}

export function getAllCategories(): string[] {
  const posts = getAllBlogPosts()
  const categorySet = new Set(posts.map(post => post.category))
  const categories = Array.from(categorySet)
  return categories.sort()
}

export function getAllTags(): string[] {
  const posts = getAllBlogPosts()
  const tagSet = new Set(posts.flatMap(post => post.tags))
  const tags = Array.from(tagSet)
  return tags.sort()
}

export function searchBlogPosts(query: string): BlogSummary[] {
  const allPosts = getAllBlogPosts()
  const lowercaseQuery = query.toLowerCase()

  return allPosts.filter(post => {
    const searchableText = [
      post.title,
      post.description,
      post.author,
      post.category,
      ...post.tags
    ].join(' ').toLowerCase()

    return searchableText.includes(lowercaseQuery)
  })
}

// Utility function to validate blog post structure
export function validateBlogPost(slug: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  try {
    const post = getBlogPostBySlug(slug)

    if (!post) {
      errors.push('Blog post not found or failed to parse')
      return { valid: false, errors }
    }

    // Validate date format
    if (isNaN(new Date(post.date).getTime())) {
      errors.push('Invalid date format')
    }

    // Validate tags array
    if (!Array.isArray(post.tags)) {
      errors.push('Tags must be an array')
    }

    // Validate reading time
    if (typeof post.readingTime !== 'number' || post.readingTime <= 0) {
      errors.push('Reading time must be a positive number')
    }

    // Validate content length
    if (post.content.length < 100) {
      errors.push('Content is too short (minimum 100 characters)')
    }

    return { valid: errors.length === 0, errors }
  } catch (error) {
    errors.push(`Validation error: ${error}`)
    return { valid: false, errors }
  }
}