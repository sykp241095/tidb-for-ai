import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Navigation, Footer } from '@/components/layout'
import { ErrorBoundary } from '@/components/common'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ExternalLink, Book, Zap, Search, Layers, Image, Github, ExternalLink as LinkIcon, Menu } from 'lucide-react'

interface DocsPageProps {
  params: { slug: string }
}

// Get markdown content
async function getDocContent(slug: string) {
  try {
    const docsDirectory = path.join(process.cwd(), 'docs')
    const filePath = path.join(docsDirectory, `${slug}.md`)

    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { content, data } = matter(fileContents)

    return {
      content,
      frontmatter: data,
      slug
    }
  } catch (error) {
    return null
  }
}

// Navigation structure
const docsNav = [
  {
    slug: 'introduction',
    title: 'Introduction',
    description: 'Learn the basics',
    icon: Book,
    order: 1
  },
  {
    slug: 'quickstart',
    title: 'Quick Start',
    description: 'Get up and running',
    icon: Zap,
    order: 2
  },
  {
    slug: 'vector-search',
    title: 'Vector Search',
    description: 'Semantic search & RAG',
    icon: Search,
    order: 3
  },
  {
    slug: 'hybrid-search',
    title: 'Hybrid Search',
    description: 'Vector + text + filters',
    icon: Layers,
    order: 4
  },
  {
    slug: 'image-search',
    title: 'Image Search',
    description: 'Multimodal with CLIP',
    icon: Image,
    order: 5
  },
]

export async function generateMetadata({ params }: DocsPageProps): Promise<Metadata> {
  const doc = await getDocContent(params.slug)

  if (!doc) {
    return {
      title: 'Page Not Found - TiDB for AI Docs'
    }
  }

  const navItem = docsNav.find(item => item.slug === params.slug)
  const title = navItem?.title || doc.frontmatter.title || 'Documentation'

  return {
    title: `${title} - TiDB for AI Docs`,
    description: doc.frontmatter.description || `Learn about ${title.toLowerCase()} in TiDB for AI`,
    keywords: doc.frontmatter.keywords || ['TiDB', 'AI', 'documentation', title.toLowerCase()],
  }
}

export async function generateStaticParams() {
  return docsNav.map(item => ({
    slug: item.slug
  }))
}

const DocsPage: React.FC<DocsPageProps> = async ({ params }) => {
  const doc = await getDocContent(params.slug)

  if (!doc) {
    notFound()
  }

  const currentIndex = docsNav.findIndex(item => item.slug === params.slug)
  const prevDoc = currentIndex > 0 ? docsNav[currentIndex - 1] : null
  const nextDoc = currentIndex < docsNav.length - 1 ? docsNav[currentIndex + 1] : null
  const currentTitle = docsNav.find(item => item.slug === params.slug)?.title || 'Documentation'

  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-white dark:bg-black">
        <Navigation />
        <div className="pt-24">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto">
              {/* Mobile Navigation */}
              <div className="lg:hidden mb-6">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Documentation
                    </h3>
                    <Menu size={20} className="text-gray-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {docsNav.map((item) => {
                      const isActive = item.slug === params.slug
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.slug}
                          href={`/docs-new/${item.slug}`}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                            isActive
                              ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          <Icon size={14} />
                          {item.title}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="flex gap-8">
                {/* Sidebar */}
                <aside className="hidden lg:block w-80 flex-shrink-0">
                  <div className="sticky top-24 space-y-8">
                    {/* Header */}
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        TiDB for AI Docs
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Complete guide to building intelligent applications
                      </p>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-1">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 px-2">
                        Getting Started
                      </h4>
                      {docsNav.map((item) => {
                        const isActive = item.slug === params.slug
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.slug}
                            href={`/docs-new/${item.slug}`}
                            className={`group flex items-start gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                              isActive
                                ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900'
                            }`}
                          >
                            <div className={`mt-0.5 p-1 rounded ${
                              isActive
                                ? 'bg-blue-100 dark:bg-blue-900'
                                : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700'
                            }`}>
                              <Icon size={14} className={isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={`font-medium text-sm mb-1 ${
                                isActive ? 'text-blue-900 dark:text-blue-200' : 'text-gray-900 dark:text-white'
                              }`}>
                                {item.title}
                              </div>
                              <div className={`text-xs leading-relaxed ${
                                isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-500'
                              }`}>
                                {item.description}
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                    </nav>

                    {/* Quick Actions */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                        Quick Actions
                      </h4>
                      <div className="space-y-2">
                        <a
                          href="https://github.com/pingcap/tidb"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          <Github size={14} />
                          View on GitHub
                          <LinkIcon size={12} className="opacity-60" />
                        </a>
                        <Link
                          href="/gallery"
                          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          <Image size={14} />
                          Examples Gallery
                        </Link>
                      </div>
                    </div>

                    {/* Installation */}
                    <div className="bg-black dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                      <h4 className="text-sm font-semibold text-white mb-3">
                        Installation
                      </h4>
                      <div className="bg-gray-900 dark:bg-black rounded-lg p-3">
                        <code className="text-green-400 text-sm font-mono">
                          pip install pytidb
                        </code>
                      </div>
                      <p className="text-gray-300 text-xs mt-2">
                        Python client for TiDB for AI
                      </p>
                    </div>

                    {/* Progress Indicator */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                          Progress
                        </h4>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {currentIndex + 1} of {docsNav.length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${((currentIndex + 1) / docsNav.length) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        You&apos;re reading: {currentTitle}
                      </p>
                    </div>
                  </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 max-w-none">
                  <div className="max-w-4xl">
                    {/* Breadcrumb */}
                    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
                      <span className="text-gray-900 dark:text-white">{currentTitle}</span>
                    </nav>

                    {/* Content */}
                    <article className="prose prose-lg prose-gray dark:prose-invert max-w-none">
                      <ReactMarkdown
                        components={{
                          code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                              <div className="relative">
                                <SyntaxHighlighter
                                  style={oneDark}
                                  language={match[1]}
                                  PreTag="div"
                                  className="rounded-xl"
                                  {...props}
                                >
                                  {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                              </div>
                            ) : (
                              <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm" {...props}>
                                {children}
                              </code>
                            )
                          },
                          h1: ({ children }) => (
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 border-none">
                              {children}
                            </h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-12 mb-4 border-none">
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">
                              {children}
                            </h3>
                          ),
                          p: ({ children }) => (
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                              {children}
                            </p>
                          ),
                          ul: ({ children }) => (
                            <ul className="text-gray-600 dark:text-gray-300 space-y-2 mb-6">
                              {children}
                            </ul>
                          ),
                          li: ({ children }) => (
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                              <span>{children}</span>
                            </li>
                          ),
                          a: ({ href, children }) => (
                            <Link
                              href={href || '#'}
                              className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                            >
                              {children}
                              {href?.startsWith('http') && <ExternalLink size={14} />}
                            </Link>
                          ),
                        }}
                      >
                        {doc.content}
                      </ReactMarkdown>
                    </article>

                    {/* Navigation */}
                    <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                      {prevDoc ? (
                        <Link
                          href={`/docs-new/${prevDoc.slug}`}
                          className="flex items-center px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
                        >
                          <ChevronLeft size={16} className="mr-2" />
                          <div className="text-left">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Previous</p>
                            <p className="font-medium text-gray-900 dark:text-white">{prevDoc.title}</p>
                          </div>
                        </Link>
                      ) : (
                        <div />
                      )}

                      {nextDoc ? (
                        <Link
                          href={`/docs-new/${nextDoc.slug}`}
                          className="flex items-center px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
                        >
                          <div className="text-right">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Next</p>
                            <p className="font-medium text-gray-900 dark:text-white">{nextDoc.title}</p>
                          </div>
                          <ChevronRight size={16} className="ml-2" />
                        </Link>
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </ErrorBoundary>
  )
}

export default DocsPage