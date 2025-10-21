'use client'

import React from 'react'
import { Navigation, Footer } from '@/components/layout'
import TiDBAIConceptMap from '@/components/TiDBAIConceptMap'
import { motion } from 'framer-motion'
import { Database, Zap, Brain, ArrowRight, Sparkles, Layers } from 'lucide-react'

export default function TiDBAIConceptMapPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-green-500 to-purple-600 dark:from-blue-400 dark:via-green-300 dark:to-purple-400">
                Unified Data Infrastructure for AI
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8">
              Experience how TiDB acts as a unified data infrastructure, seamlessly ingesting diverse data sources,
              processing them with powerful multi-modal capabilities, and empowering advanced AI applications.
            </p>
          </motion.div>

          {/* Key Benefits */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-center mb-4">
                <Layers className="text-blue-500" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Unified Data Platform</h3>
              <p className="text-blue-600 dark:text-blue-300 text-sm">
                Consolidate structured, unstructured, and streaming data in one powerful engine
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-center mb-4">
                <Zap className="text-green-500" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">AI-Native Processing</h3>
              <p className="text-green-600 dark:text-green-300 text-sm">
                Built-in vector search, embeddings, and hybrid query capabilities
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
              <div className="flex items-center justify-center mb-4">
                <Brain className="text-purple-500" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-2">Intelligent Applications</h3>
              <p className="text-purple-600 dark:text-purple-300 text-sm">
                Power RAG systems, AI agents, and real-time decisioning at scale
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Concept Map */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Interactive Infrastructure Map
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore how TiDB transforms diverse data sources into powerful AI applications through its unified architecture
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <TiDBAIConceptMap />
          </motion.div>

          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              💡 Drag nodes to explore, use mouse wheel to zoom, and pan to navigate the concept map
            </p>
          </motion.div>
        </div>
      </section>

      {/* Detailed Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Data Sources Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-xl border border-blue-200 dark:border-blue-800"
            >
              <div className="flex items-center mb-6">
                <div className="bg-blue-500 p-3 rounded-lg mr-4">
                  <Database className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                  Data Sources
                </h3>
              </div>

              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-blue-100 dark:border-blue-900">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Structured Data</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Traditional relational databases, SQL tables, and transactional systems that form the backbone of enterprise data.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-blue-100 dark:border-blue-900">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Unstructured Data</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Documents, images, videos, and multimedia content that require advanced processing and vectorization.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-blue-100 dark:border-blue-900">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Streaming Data</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Real-time data feeds from IoT sensors, application logs, and event streams requiring immediate processing.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* TiDB Core Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-green-50 dark:bg-green-900/10 p-8 rounded-xl border border-green-200 dark:border-green-800"
            >
              <div className="flex items-center mb-6">
                <div className="bg-green-500 p-3 rounded-lg mr-4">
                  <Sparkles className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-green-800 dark:text-green-200">
                  TiDB Core Engine
                </h3>
              </div>

              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-green-100 dark:border-green-900">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">HTAP Processing</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Hybrid Transactional/Analytical Processing enables both OLTP and OLAP workloads in a single system.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-green-100 dark:border-green-900">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Vector Search</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Native vector embeddings and similarity search for AI applications and semantic understanding.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-green-100 dark:border-green-900">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Full-Text Search</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Advanced text search capabilities with MySQL compatibility for seamless integration.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* AI Applications Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-purple-50 dark:bg-purple-900/10 p-8 rounded-xl border border-purple-200 dark:border-purple-800"
            >
              <div className="flex items-center mb-6">
                <div className="bg-purple-500 p-3 rounded-lg mr-4">
                  <Brain className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                  AI Applications
                </h3>
              </div>

              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-purple-100 dark:border-purple-900">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">AI Agents</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Autonomous intelligent agents that can understand context, make decisions, and interact naturally.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-purple-100 dark:border-purple-900">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">RAG Systems</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Retrieval-Augmented Generation combines knowledge bases with language models for accurate responses.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-purple-100 dark:border-purple-900">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Real-time Decisioning</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Instant AI-powered decisions for fraud detection, recommendations, and dynamic personalization.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-green-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build AI Applications with TiDB?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Start building intelligent applications with the world&apos;s most advanced AI-native database
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
                Get Started Free
                <ArrowRight className="ml-2" size={20} />
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
                View Documentation
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}