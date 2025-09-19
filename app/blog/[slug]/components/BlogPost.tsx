'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, BookOpen } from 'lucide-react'
import { BlogPost as BlogPostType, BlogSummary } from '@/types/blog'
import MarkdownRenderer from '@/components/blog/MarkdownRenderer'
import BlogCard from '@/components/blog/BlogCard'
import { Button, Badge, Section } from '@/components/ui'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface BlogPostProps {
  post: BlogPostType
  relatedPosts: BlogSummary[]
}

const BlogPost: React.FC<BlogPostProps> = ({ post, relatedPosts }) => {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const handleShare = async () => {
    const url = window.location.href
    const title = post.title

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url
        })
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(url)
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(url)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />

      <main>
        {/* Header */}
        <Section background="gradient" padding="lg" className="pt-32">
          <div className="max-w-4xl mx-auto">
            {/* Back button */}
            <div className="mb-8">
              <Link href="/blog">
                <Button
                  variant="outline"
                  icon={<ArrowLeft size={16} />}
                  iconPosition="left"
                >
                  Back to Blog
                </Button>
              </Link>
            </div>

            {/* Article meta */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge variant="tier" color="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {post.category}
                </Badge>
                {post.featured && (
                  <Badge variant="tier" color="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    Featured
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {post.title}
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {post.description}
              </p>

              {/* Author and meta info */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-300 mb-6">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>

              {/* Tags and Share */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                      <Badge variant="tag" className="hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                        <Tag size={12} className="mr-1" />
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  icon={<Share2 size={16} />}
                  iconPosition="left"
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
        </Section>

        {/* Article Content */}
        <Section background="white" padding="lg">
          <div className="max-w-4xl mx-auto">
            <article className="mb-16">
              <MarkdownRenderer content={post.content} />
            </article>

            {/* Article Footer */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 dark:text-gray-300">Was this helpful?</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">👍 Yes</Button>
                    <Button variant="outline" size="sm">👎 No</Button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    icon={<Share2 size={16} />}
                    iconPosition="left"
                  >
                    Share Article
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <Section background="gray" padding="lg">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="text-gray-600 dark:text-gray-400" size={24} />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Related Articles
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>

              <div className="text-center mt-12">
                <Link href="/blog">
                  <Button variant="outline" size="lg">
                    View All Articles
                  </Button>
                </Link>
              </div>
            </div>
          </Section>
        )}

        {/* Newsletter CTA */}
        <Section background="white" padding="lg">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-1">
              <div className="bg-white dark:bg-black rounded-[22px] px-8 py-12">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Stay Updated
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Get the latest articles and updates about TiDB AI directly in your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button variant="primary">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  )
}

export default BlogPost