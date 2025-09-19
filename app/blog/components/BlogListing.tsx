'use client'

import React, { useState, useMemo } from 'react'
import { Filter, X } from 'lucide-react'
import { BlogSummary } from '@/types/blog'
import BlogCard from '@/components/blog/BlogCard'
import { Section, Button, Badge } from '@/components/ui'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface BlogListingProps {
  posts: BlogSummary[]
  categories: string[]
  tags: string[]
}

const BlogListing: React.FC<BlogListingProps> = ({
  posts,
  categories,
  tags
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Filter posts based on filters
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Category filter
      if (selectedCategory && post.category !== selectedCategory) {
        return false
      }

      // Tags filter
      if (selectedTags.length > 0) {
        const hasSelectedTag = selectedTags.some(tag =>
          post.tags.includes(tag)
        )
        if (!hasSelectedTag) return false
      }

      return true
    })
  }, [posts, selectedCategory, selectedTags])

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSelectedCategory(null)
    setSelectedTags([])
  }

  const hasActiveFilters = selectedCategory || selectedTags.length > 0

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />

      <main>
        {/* Hero Section */}
        <Section background="gradient" padding="lg" className="pt-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              TiDB for AI <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Insights, tutorials, and updates about vector databases, AI applications, and building intelligent systems with TiDB.
            </p>
          </div>
        </Section>


        {/* Filters and Posts */}
        <Section background="white" padding="lg">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-64 shrink-0">
              <div className="sticky top-24">
                {/* Mobile Filter Toggle */}
                <div className="lg:hidden mb-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    icon={<Filter size={16} />}
                    iconPosition="left"
                    fullWidth
                  >
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                  </Button>
                </div>

                {/* Filter Panel */}
                <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                  {/* Active Filters */}
                  {hasActiveFilters && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Active Filters</h3>
                        <button
                          onClick={clearFilters}
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Clear all
                        </button>
                      </div>
                      <div className="space-y-2">
                        {selectedCategory && (
                          <div className="flex items-center gap-2">
                            <Badge variant="tier" color="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                              {selectedCategory}
                            </Badge>
                            <button
                              onClick={() => setSelectedCategory(null)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        )}
                        {selectedTags.map(tag => (
                          <div key={tag} className="flex items-center gap-2">
                            <Badge variant="tag">
                              {tag}
                            </Badge>
                            <button
                              onClick={() => handleTagToggle(tag)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Categories */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Categories</h3>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(
                            selectedCategory === category ? null : category
                          )}
                          className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedCategory === category
                              ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => handleTagToggle(tag)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            selectedTags.includes(tag)
                              ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Grid */}
            <div className="flex-1">
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {hasActiveFilters ? 'Filtered Results' : 'All Articles'}
                  </h2>
                  <span className="text-gray-500 dark:text-gray-400">
                    {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              {filteredPosts.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {filteredPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 dark:text-gray-500 mb-4">
                    <Filter size={48} className="mx-auto mb-4" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No articles found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Try adjusting your filters to see more articles.
                  </p>
                  {hasActiveFilters && (
                    <Button variant="outline" onClick={clearFilters}>
                      Clear filters
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  )
}

export default BlogListing