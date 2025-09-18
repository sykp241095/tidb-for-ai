'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, ArrowRight, User } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

const categories = [
  'All',
  'AI & Machine Learning',
  'Vector Databases',
  'Developer Tutorials',
  'Product Updates',
  'Case Studies'
]

const blogPosts = [
  {
    id: 1,
    title: 'Building Semantic Search with TiDB Vector Database',
    excerpt: 'Learn how to implement powerful semantic search using TiDB&apos;s native vector capabilities and OpenAI embeddings for intelligent document retrieval.',
    category: 'AI & Machine Learning',
    author: 'Sarah Chen',
    date: '2024-03-15',
    readTime: '8 min read',
    image: '🔍'
  },
  {
    id: 2,
    title: 'Image & Text Search with CLIP Embeddings',
    excerpt: 'Discover how to build multi-modal search applications using CLIP embeddings to find relevant content across images and text.',
    category: 'AI & Machine Learning',
    author: 'Alex Kumar',
    date: '2024-03-12',
    readTime: '6 min read',
    image: '🖼️'
  },
  {
    id: 3,
    title: 'Hybrid Search: Combining Vector and Text Search',
    excerpt: 'Master the art of hybrid search by combining semantic vector similarity with traditional keyword matching for optimal results.',
    category: 'AI & Machine Learning',
    author: 'David Park',
    date: '2024-03-10',
    readTime: '7 min read',
    image: '🔀'
  },
  {
    id: 4,
    title: 'Advanced Filtering with Auto-Embedding Features',
    excerpt: 'Explore TiDB&apos;s auto-embedding capabilities and advanced filtering techniques to build sophisticated AI-powered search systems.',
    category: 'AI & Machine Learning',
    author: 'Maria Rodriguez',
    date: '2024-03-08',
    readTime: '9 min read',
    image: '⚙️'
  },
  {
    id: 5,
    title: 'Auto Embedding: Simplifying Vector Generation',
    excerpt: 'Learn how TiDB&apos;s auto-embedding feature automatically generates vector embeddings for your data, eliminating manual preprocessing steps.',
    category: 'AI & Machine Learning',
    author: 'Lisa Zhang',
    date: '2024-03-05',
    readTime: '7 min read',
    image: '🤖'
  }
]

export default function Blogs() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory)

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Developer <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Insights, tutorials, and updates from the TiDB team. Learn how to build
            next-generation AI applications with our multi-modal database platform.
          </p>
        </div>


        {/* Main Content with Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Category Filter Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-32">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium text-left ${
                      selectedCategory === category
                        ? 'bg-black dark:bg-white text-white dark:text-black'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="flex-1">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {filteredPosts.map((post) => (
                <Link key={post.id} href={`/blogs/${post.id}`}>
                  <article className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-lg cursor-pointer group">
                  <div className="text-3xl mb-4">{post.image}</div>
                  <div className="mb-3">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <User size={12} />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </article>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="text-center mb-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 rounded-3xl p-12 border border-gray-200 dark:border-gray-800">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Get the latest insights on AI, vector databases, and modern application development
            delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium flex items-center justify-center gap-2">
              Subscribe
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}