import { Metadata } from 'next'
import { getAllBlogPosts, getAllCategories, getAllTags } from '@/lib/blog'
import BlogListing from './components/BlogListing'

export const metadata: Metadata = {
  title: 'Blog - TiDB AI Insights',
  description: 'Discover the latest insights, tutorials, and updates about TiDB AI, vector databases, and building intelligent applications.',
  openGraph: {
    title: 'Blog - TiDB AI Insights',
    description: 'Discover the latest insights, tutorials, and updates about TiDB AI, vector databases, and building intelligent applications.',
    type: 'website'
  }
}

export default function BlogPage() {
  const allPosts = getAllBlogPosts()
  const categories = getAllCategories()
  const tags = getAllTags()

  return (
    <BlogListing
      posts={allPosts}
      categories={categories}
      tags={tags}
    />
  )
}