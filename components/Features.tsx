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
                  className={`relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-800 dark:hover:to-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full text-left ${
                    activeFeature === index
                      ? 'border-blue-500/50 dark:border-blue-400/50 shadow-lg shadow-blue-500/10 dark:shadow-blue-400/10'
                      : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                  }`}
                  aria-pressed={activeFeature === index}
                  aria-label={`View ${feature.title} code example`}
                >
                  {/* Terminal-style header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                        <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                        {feature.title.toLowerCase().replace(/ /g, '_').replace(/&/g, 'and')}.py
                      </span>
                    </div>
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${feature.color} text-white`}>
                      <Icon size={16} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white font-mono">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {feature.details.slice(0, 2).map((detail, detailIndex) => (
                        <span
                          key={detailIndex}
                          className="px-2 py-1 bg-gray-200/60 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 rounded text-xs font-mono"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Active indicator */}
                  {activeFeature === index && (
                    <div className="absolute top-3 right-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
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
                  className={`bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 group hover:shadow-lg ${
                    hasCode ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => hasCode && setActiveFeature(features.length + index)}
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
                  {hasCode && (
                    <div className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                      Click to see code example →
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Hybrid Query Code Example */}
          {activeFeature === features.length && additionalFeatures[0]?.code && (
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-300 text-sm font-medium">
                    hybrid_search.sql
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(additionalFeatures[0].code || '')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors text-sm"
                >
                  {codeCopied ? (
                    <>
                      <Check size={16} className="text-green-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy
                    </>
                  )}
                </button>
              </div>

              {/* Code Content */}
              <div className="p-6 overflow-x-auto">
                <pre className="text-sm text-gray-100 leading-relaxed">
                  <code>
                    {(additionalFeatures[0].code || '').split('\n').map((line, index) => (
                      <div key={index} className="text-gray-100">
                        {line}
                      </div>
                    ))}
                  </code>
                </pre>
              </div>

              {/* Feature Details */}
              <div className="px-6 pb-6">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white shrink-0">
                      <Layers size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        Hybrid Queries
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Combine vector similarity, full-text search, and structured data filtering in a single query for the most relevant results.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
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