import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Database, Zap, Globe, Users, Code, Heart } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Navigation, Footer } from '@/components/layout'
import { ErrorBoundary } from '@/components/common'

export const metadata: Metadata = {
  title: 'About TiDB for AI - The Future of AI-Native Databases',
  description: 'Learn about TiDB for AI, the revolutionary AI-native database platform that combines vector search, full-text search, and MySQL compatibility for modern AI applications.',
  keywords: ['TiDB', 'AI database', 'vector database', 'about', 'company', 'mission'],
}

const About: React.FC = () => {
  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-white dark:bg-black">
        <Navigation />
        <div className="pt-24">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              About <span className="gradient-text">TiDB for AI</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We&apos;re building the future of AI-native databases, empowering developers to create intelligent applications with unprecedented ease and performance.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                TiDB for AI represents a fundamental shift in how developers build intelligent applications. We believe that AI shouldn&apos;t be an afterthought in database design—it should be at the core.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Our mission is to democratize AI application development by providing a unified platform that combines the power of vector search, full-text search, and traditional SQL capabilities in one seamless experience.
              </p>
              <Link href="/docs-new/quickstart">
                <Button variant="primary" size="lg" icon={<ArrowRight size={20} />}>
                  Get Started Today
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <Database size={48} className="mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">AI-Native</h3>
                    <p className="text-sm opacity-90">Built for AI from the ground up</p>
                  </div>
                  <div className="text-center">
                    <Zap size={48} className="mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
                    <p className="text-sm opacity-90">Optimized for performance</p>
                  </div>
                  <div className="text-center">
                    <Globe size={48} className="mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Global Scale</h3>
                    <p className="text-sm opacity-90">Distributed by design</p>
                  </div>
                  <div className="text-center">
                    <Code size={48} className="mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Developer First</h3>
                    <p className="text-sm opacity-90">Simple, powerful APIs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              The Story Behind TiDB for AI
            </h2>
            <div className="prose prose-lg prose-gray dark:prose-invert mx-auto">
              <p>
                TiDB for AI emerged from a simple observation: while AI was transforming every industry,
                developers were still struggling with fragmented database solutions. Vector databases for
                embeddings, traditional databases for structured data, search engines for text—each requiring
                separate infrastructure, different APIs, and complex integration work.
              </p>
              <p>
                We asked ourselves: what if there was a single database that could handle all of these
                use cases natively? What if developers could build AI applications using familiar SQL
                syntax while getting the performance benefits of specialized vector and full-text search engines?
              </p>
              <p>
                That vision became TiDB for AI—a truly unified platform that brings together the best
                of traditional databases, vector stores, and search engines into one coherent,
                developer-friendly experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-blue-600 dark:text-blue-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Developer-Centric</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Every decision we make starts with the developer experience. We believe great technology
                should be intuitive, well-documented, and a joy to work with.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="text-green-600 dark:text-green-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We&apos;re not just adapting existing technologies—we&apos;re reimagining what&apos;s possible when
                AI capabilities are native to the database layer.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-purple-600 dark:text-purple-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Community</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                The best products are built with and for the community. We&apos;re committed to open
                collaboration, transparent development, and listening to our users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Built on Proven Technology
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              TiDB for AI is built on the foundation of TiDB, a proven distributed SQL database
              trusted by hundreds of companies worldwide, enhanced with native AI capabilities.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-xl mb-4">
                <Database size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Distributed SQL
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Scale horizontally while maintaining ACID transactions
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500 to-blue-500 text-white p-6 rounded-xl mb-4">
                <Zap size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Vector Search
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Native vector operations for embeddings and similarity search
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-xl mb-4">
                <Globe size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Full-Text Search
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Powerful text search capabilities built into the database
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 rounded-xl mb-4">
                <Code size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                MySQL Compatible
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Use existing tools and knowledge with modern AI capabilities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Build the Future?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of developers who are already building next-generation AI applications with TiDB for AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/docs-new/quickstart">
              <Button variant="secondary" size="lg" icon={<ArrowRight size={20} />}>
                Start Building
              </Button>
            </Link>
            <Link href="/gallery">
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                View Examples
              </Button>
            </Link>
          </div>
        </div>
      </section>
        </div>
        <Footer />
      </main>
    </ErrorBoundary>
  )
}

export default About