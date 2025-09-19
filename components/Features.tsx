'use client'

import React, { useState } from 'react'
import { Copy, Check, Layers, Play, Code2 } from 'lucide-react'
import { features, additionalFeatures } from '@/data'
import { Button, Card, CodeBlock, Section } from '@/components/ui'
import { useClipboard } from '@/hooks'

const Features = React.memo(() => {
  const [activeFeature, setActiveFeature] = useState(0)
  const { copied: codeCopied, copyToClipboard } = useClipboard()
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState<any>(null)

  const handleWatchVideo = (feature: any) => {
    setSelectedFeature(feature)
    setShowVideoModal(true)
  }

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
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
                  onClick={() => setActiveFeature(index)}
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
                    <div className="col-span-6 space-y-1">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Column 3: Buttons */}
                    <div className="col-span-4 flex flex-col gap-2 justify-center items-end">
                      <button
                        onClick={() => setActiveFeature(index)}
                        className="flex items-center justify-center gap-1.5 w-20 h-8 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-md text-sm font-medium transition-colors"
                      >
                        <Code2 size={16} />
                        Code
                      </button>
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
          {features[activeFeature] && (
            <CodeBlock
              code={features[activeFeature].code}
              filename={`${features[activeFeature].title.toLowerCase().replace(/ /g, '_').replace(/&/g, 'and')}.py`}
              onCopy={() => copyToClipboard(features[activeFeature].code)}
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
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedFeature?.title} - Demo Video
                </h3>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>
              <div className="p-4">
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Play size={48} className="text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Video demo for {selectedFeature?.title}
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                      Video content coming soon...
                    </p>
                  </div>
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