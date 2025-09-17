'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Database, Search, Zap } from 'lucide-react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-black dark:to-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Now with Vector Search & MySQL Compatibility
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
            The AI-Native
            <br />
            <span className="gradient-text">Database Platform</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Combine vector search, full-text search, and MySQL compatibility
            in one unified platform. Build intelligent applications with the
            reliability of SQL and the power of AI.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <button className="group bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 font-semibold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
              Explore in Product
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-xl hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200 font-semibold text-lg">
              View Documentation
            </button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-20 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full px-6 py-3 shadow-sm">
              <Database size={18} className="text-blue-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Vector Database</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full px-6 py-3 shadow-sm">
              <Search size={18} className="text-green-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Full-Text Search</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full px-6 py-3 shadow-sm">
              <Zap size={18} className="text-purple-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">MySQL Compatible</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">10B+</div>
              <div className="text-gray-600 dark:text-gray-400">Vectors Processed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">99.9%</div>
              <div className="text-gray-600 dark:text-gray-400">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">100%</div>
              <div className="text-gray-600 dark:text-gray-400">MySQL Compatible</div>
            </div>
          </div>
        </div>

        {/* Visual Element */}
        <div className="mt-20 relative animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-2xl p-1">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">semantic_search.sql</span>
              </div>
              <div className="font-mono text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                <div className="text-blue-600 dark:text-blue-400">-- Vector search with MySQL syntax</div>
                <div><span className="text-purple-600 dark:text-purple-400">SELECT</span> content, title,</div>
                <div>  <span className="text-green-600 dark:text-green-400">VEC_COSINE_DISTANCE</span>(embedding, <span className="text-orange-600 dark:text-orange-400">%s</span>) <span className="text-purple-600 dark:text-purple-400">as</span> similarity</div>
                <div><span className="text-purple-600 dark:text-purple-400">FROM</span> documents</div>
                <div><span className="text-purple-600 dark:text-purple-400">WHERE</span> <span className="text-green-600 dark:text-green-400">MATCH</span>(content) <span className="text-purple-600 dark:text-purple-400">AGAINST</span> (<span className="text-orange-600 dark:text-orange-400">'AI database'</span>)</div>
                <div><span className="text-purple-600 dark:text-purple-400">ORDER BY</span> similarity <span className="text-purple-600 dark:text-purple-400">DESC</span></div>
                <div><span className="text-purple-600 dark:text-purple-400">LIMIT</span> <span className="text-orange-600 dark:text-orange-400">10</span>;</div>
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-500/20 rounded-full animate-float"></div>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-purple-500/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 -right-8 w-12 h-12 bg-green-500/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </section>
  )
}