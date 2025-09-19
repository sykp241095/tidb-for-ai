'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { ArrowRight, Copy, Check, BookOpen } from 'lucide-react'
import { useClipboard } from '@/hooks'
import { Button } from '@/components/ui'
import { ShakingNet } from '@/components/effects'

// Constants
const INSTALL_COMMAND = 'pip install pytidb'
const ANIMATION_DELAYS = {
  subheadline: '0.1s',
  command: '0.2s',
  buttons: '0.3s',
  stats: '0.5s'
}

const STATS_DATA = [
  { value: '10B+', label: 'Vectors Processed' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '100%', label: 'MySQL Compatible' }
]

const Hero = React.memo(() => {
  const [mounted, setMounted] = useState(false)
  const { copied, copyToClipboard } = useClipboard()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCopy = useCallback(() => {
    copyToClipboard(INSTALL_COMMAND)
  }, [copyToClipboard])

  if (!mounted) {
    return (
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-black dark:to-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-8"></div>
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-6"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-12"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-black dark:to-gray-950 overflow-hidden">
      {/* Animated Background Effects */}
      <ShakingNet className="opacity-40 dark:opacity-60" gridSize={100} shakeIntensity={1.5} lineOpacity={0.15} />

      <div className="max-w-7xl mx-auto relative z-10">
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
          <p
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up"
            style={{ animationDelay: ANIMATION_DELAYS.subheadline }}
          >
            Build intelligent applications with vector search, full-text search,
            and MySQL compatibility in one unified platform.
          </p>

          {/* Command Section */}
          <div
            className="mb-12 animate-slide-up"
            style={{ animationDelay: ANIMATION_DELAYS.command }}
          >
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-green-600 dark:text-green-400 select-none font-mono text-xl">
                    $
                  </span>
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-green-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent font-bold font-mono text-xl select-text tracking-wide">
                    {INSTALL_COMMAND}
                  </span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white rounded-lg transition-all duration-200 text-sm"
                  aria-label="Copy install command"
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
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up"
            style={{ animationDelay: ANIMATION_DELAYS.buttons }}
          >
            <Button
              href="https://tidbcloud.com/"
              variant="primary"
              size="lg"
              icon={<ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
              className="group shadow-lg hover:shadow-xl"
            >
              Explore in Product
            </Button>
            <Button
              variant="outline"
              size="lg"
              icon={<BookOpen size={20} />}
              iconPosition="left"
            >
              View Documentation
            </Button>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-slide-up"
            style={{ animationDelay: ANIMATION_DELAYS.stats }}
          >
            {STATS_DATA.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
})

Hero.displayName = 'Hero'

export default Hero