import React from 'react'
import Link from 'next/link'
import { BookOpen, Calendar, Clock, User, Tag } from 'lucide-react'
import { BlogSummary } from '@/types/blog'
import { Button, Badge } from '@/components/ui'

interface RelatedArticlesProps {
  posts: BlogSummary[]
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ posts }) => {
  if (posts.length === 0) {
    return null
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="text-gray-600 dark:text-gray-400" size={24} />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Related Articles
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {posts.map((post) => {
          const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })

          return (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`}>
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700 p-6">
                  {/* Featured badge */}
                  {post.featured && (
                    <div className="mb-4">
                      <Badge variant="tier" color="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        Featured
                      </Badge>
                    </div>
                  )}

                  {/* Category */}
                  <div className="mb-3">
                    <Badge variant="tag">
                      {post.category}
                    </Badge>
                  </div>

                  {/* Title and Description */}
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      {post.description}
                    </p>
                  </div>

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <div key={tag} className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <Tag size={12} />
                            <span>{tag}</span>
                          </div>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            +{post.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Meta information */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{formattedDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{post.readingTime} min read</span>
                      </div>
                    </div>
                  </div>

                  {/* Read more indicator */}
                  <div className="mt-4 text-blue-600 dark:text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Read more →
                  </div>
                </div>
              </Link>
            </article>
          )
        })}
      </div>

      <div className="text-center">
        <Link href="/blog">
          <Button variant="outline" size="lg">
            View All Articles
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default RelatedArticles