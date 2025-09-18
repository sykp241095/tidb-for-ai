'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Database, Search, Zap, Copy, Check, BookOpen } from 'lucide-react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('pip install pytidb')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

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
            Multi-Modal AI-Native
            <br />
            <span className="gradient-text">Data Platform</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Build intelligent applications with vector search, full-text search,
            and MySQL compatibility in one unified platform.
          </p>

          {/* Command Section */}
          <div className="mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-green-600 dark:text-green-400 select-none font-mono text-xl">$</span>
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-green-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent font-bold font-mono text-xl select-text tracking-wide">
                    pip install pytidb
                  </span>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white rounded-lg transition-all duration-200 text-sm"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-green-600 dark:text-green-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <a href="https://tidbcloud.com/" className="group bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 font-semibold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
              Explore in Product
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <button className="border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-xl hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200 font-semibold text-lg flex items-center justify-center gap-2">
              <BookOpen size={20} />
              View Documentation
            </button>
          </div>


          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.5s' }}>
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

      </div>
    </section>
  )
}