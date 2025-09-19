'use client'

import React, { useState } from 'react'
import { Copy, Check, Layers } from 'lucide-react'
import { features, additionalFeatures } from '@/data'
import { Button, Card, CodeBlock, Section } from '@/components/ui'
import { useClipboard } from '@/hooks'

const Features = React.memo(() => {
  const [activeFeature, setActiveFeature] = useState(0)
  const { copied: codeCopied, copyToClipboard } = useClipboard()

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
                <button
                  key={`feature-${index}-${feature.title}`}
                  onClick={() => setActiveFeature(index)}
                  className={`relative pl-20 pr-3 py-3 rounded-lg border transition-all duration-200 cursor-pointer w-full text-left group ${
                    activeFeature === index
                      ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-900 shadow-sm'
                      : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-black hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-sm'
                  }`}
                  aria-pressed={activeFeature === index}
                  aria-label={`View ${feature.title} code example`}
                >
                  {/* Icon positioned at left edge */}
                  <div className="absolute left-2 top-2 bottom-2 flex items-center">
                    <div className="h-full aspect-square flex items-center justify-center">
                      <Icon size={40} className="text-gray-600 dark:text-gray-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>

                  </div>

                  {/* Active indicator */}
                  {activeFeature === index && (
                    <div className="absolute top-2 right-3">
                      <div className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full"></div>
                    </div>
                  )}
                </button>
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
      </div>
    </section>
  )
})

Features.displayName = 'Features'

export default Features