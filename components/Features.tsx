'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { Copy, Check, Layers, Play, Code2 } from 'lucide-react'
import { features, additionalFeatures } from '@/data'
import { Button, Card, CodeBlock, Section } from '@/components/ui'
import { useClipboard } from '@/hooks'

const Features = React.memo(() => {
  const [activeFeature, setActiveFeature] = useState(0)
  const { copied: codeCopied, copyToClipboard } = useClipboard()
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null)
  const [videoLoading, setVideoLoading] = useState(false)
  const [videoError, setVideoError] = useState(false)

  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showVideoModal) {
        setShowVideoModal(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [showVideoModal])

  // Reset video states when modal closes and handle body scroll
  React.useEffect(() => {
    if (!showVideoModal) {
      setVideoLoading(false)
      setVideoError(false)
      // Re-enable body scroll
      document.body.style.overflow = 'auto'
    } else {
      // Disable body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    // Cleanup function to ensure scroll is restored
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [showVideoModal])

  const handleWatchVideo = useCallback((feature: typeof features[0]) => {
    setSelectedFeature(feature)
    setVideoLoading(true)
    setVideoError(false)
    setShowVideoModal(true)

    // Fallback timeout to stop loading indicator after 5 seconds
    const timeoutId = setTimeout(() => {
      console.log('Video loading timeout reached')
      setVideoLoading(false)
    }, 5000)

    // Store timeout ID for cleanup (though React will handle cleanup automatically)
    return () => clearTimeout(timeoutId)
  }, [])

  const handleSetActiveFeature = useCallback((index: number) => {
    setActiveFeature(index)
  }, [])

  const handleCopyCode = useCallback(() => {
    if (features[activeFeature]) {
      copyToClipboard(features[activeFeature].code)
    }
  }, [activeFeature, copyToClipboard])

  const activeFeatureData = useMemo(() => features[activeFeature], [activeFeature])

  return (
    <section id="features" className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 scroll-mt-24">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
            Powerful AI Use Cases
            <br />
            <span className="gradient-text">Get Started in Minutes</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From semantic search to AI agents, see how TiDB powers intelligent applications
            with simple APIs that feel familiar to developers.
          </p>
        </div>

        {/* Main Features */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Feature Cards */}
          <div className="space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={`feature-${index}-${feature.title}`}
                  onClick={() => handleSetActiveFeature(index)}
                  className={`relative p-4 rounded-lg border-2 transition-all duration-200 w-full group cursor-pointer ${
                    activeFeature === index
                      ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-900 shadow-sm'
                      : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-black hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-sm'
                  }`}
                >
                  {/* Three column layout */}
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Column 1: Icon */}
                    <div className="col-span-2 flex items-center justify-center">
                      <div className="w-full h-full flex items-center justify-center">
                        <Icon size={48} className="text-gray-600 dark:text-gray-400" />
                      </div>
                    </div>

                    {/* Column 2: Feature title and description */}
                    <div className="col-span-7 space-y-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Column 3: Buttons */}
                    <div className="col-span-3 flex flex-col gap-2 justify-center items-end">
                      {feature.codeUrl ? (
                        <a
                          href={feature.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-center gap-1.5 w-20 h-8 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-md text-sm font-medium transition-colors"
                        >
                          <Code2 size={16} />
                          Code
                        </a>
                      ) : (
                        <button
                          onClick={() => handleSetActiveFeature(index)}
                          className="flex items-center justify-center gap-1.5 w-20 h-8 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-md text-sm font-medium transition-colors"
                        >
                          <Code2 size={16} />
                          Code
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleWatchVideo(feature)
                        }}
                        className="flex items-center justify-center gap-1.5 w-20 h-8 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black rounded-md text-sm font-medium transition-colors"
                      >
                        <Play size={16} />
                        Watch
                      </button>
                    </div>
                  </div>

                  {/* Active indicator */}
                  {activeFeature === index && (
                    <div className="absolute top-2 right-2">
                      <div className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Code Example */}
          {activeFeatureData && (
            <CodeBlock
              code={activeFeatureData.code}
              filename={`${activeFeatureData.title.toLowerCase().replace(/ /g, '_').replace(/&/g, 'and')}.py`}
              onCopy={handleCopyCode}
              copied={codeCopied}
            />
          )}
        </div>

        {/* Additional Features Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              More Advanced Capabilities
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Combine multiple search types and leverage enterprise features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon
              const hasCode = feature.code
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 group hover:shadow-lg"
                >
                  <div className="mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                      <Icon size={24} className="text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>

        </div>

        {/* Quick Start Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Ready to dive deeper?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg">
              View Full Documentation
            </Button>
            <Button variant="outline" size="lg">
              Browse Example Gallery
            </Button>
          </div>
        </div>

        {/* Video Modal */}
        {showVideoModal && (
            <div
            className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[99999] p-4 animate-fade-in"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowVideoModal(false)
              }
            }}
          >
            <div
              className="bg-white dark:bg-gray-900 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl border-2 border-gray-300 dark:border-gray-600 transform animate-scale-in relative"
              style={{ zIndex: 100000 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedFeature?.title} - Demo Video
                </h3>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Close video modal"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden relative border border-gray-200 dark:border-gray-700">
                  {selectedFeature?.videoUrl && !videoError ? (
                    <>
                      <video
                        key={selectedFeature.videoUrl}
                        className="w-full h-full object-cover"
                        controls
                        muted
                        playsInline
                        preload="metadata"
                        onLoadStart={() => {
                          console.log('Video loading started')
                          setVideoLoading(true)
                        }}
                        onCanPlay={() => {
                          console.log('Video can play')
                          setVideoLoading(false)
                        }}
                        onLoadedData={() => {
                          console.log('Video data loaded')
                          setVideoLoading(false)
                        }}
                        onLoadedMetadata={() => {
                          console.log('Video metadata loaded')
                          setVideoLoading(false)
                        }}
                        onError={(e) => {
                          console.error('Video failed to load:', selectedFeature.videoUrl)
                          setVideoError(true)
                          setVideoLoading(false)
                        }}
                      >
                        <source src={selectedFeature.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      {videoLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                          <div className="text-center">
                            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-500 dark:text-gray-400">Loading video...</p>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <Play size={48} className="text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">
                          Video demo for {selectedFeature?.title}
                        </p>
                        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                          {videoError ? 'Video failed to load. Please try again later.' : 'Video content coming soon...'}
                        </p>
                        {videoError && (
                          <button
                            onClick={() => {
                              setVideoError(false)
                              setVideoLoading(true)
                            }}
                            className="mt-3 px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                          >
                            Retry
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
})

Features.displayName = 'Features'

export default Features