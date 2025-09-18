'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, ExternalLink, Github, Star, Users, Calendar } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const categories = [
  'All',
  'RAG & Search',
  'AI Agents',
  'E-commerce',
  'FinTech',
  'Content Management',
  'Analytics',
  'IoT & Real-time'
]

const applications = [
  {
    id: 1,
    name: 'Dify AI Platform',
    description: 'Open-source LLM app development platform with unified backend for metadata, context, and vectors.',
    category: 'RAG & Search',
    image: '🤖',
    tags: ['LLM', 'RAG', 'Open Source'],
    stars: 2800,
    users: '10K+',
    company: 'Dify.AI',
    githubUrl: 'https://github.com/langgenius/dify',
    liveUrl: 'https://dify.ai',
    featured: true
  },
  {
    id: 2,
    name: 'TOPRISM Chat2Query',
    description: 'Real-time conversational BI platform enabling natural language queries on complex datasets.',
    category: 'Analytics',
    image: '💬',
    tags: ['BI', 'NL Queries', 'Real-time'],
    stars: 450,
    users: '2K+',
    company: 'TOPRISM',
    liveUrl: 'https://toprism.ai',
    featured: true
  },
  {
    id: 3,
    name: 'APTSell AI Sales',
    description: 'AI-powered digital sales employee that unifies CRM data, documents, and analytics.',
    category: 'AI Agents',
    image: '🧠',
    tags: ['CRM', 'Sales', 'Automation'],
    stars: 320,
    users: '1K+',
    company: 'APTSell',
    liveUrl: 'https://aptsell.com',
    featured: true
  },
  {
    id: 4,
    name: 'VectorStore E-commerce',
    description: 'Smart product recommendation engine using vector similarity and real-time filtering.',
    category: 'E-commerce',
    image: '🛍️',
    tags: ['Recommendations', 'Vector Search', 'Filtering'],
    stars: 890,
    users: '5K+',
    company: 'VectorStore Inc',
    githubUrl: 'https://github.com/vectorstore/ecommerce',
    liveUrl: 'https://vectorstore.com'
  },
  {
    id: 5,
    name: 'FraudGuard AI',
    description: 'Real-time fraud detection system with ACID guarantees for financial transactions.',
    category: 'FinTech',
    image: '🛡️',
    tags: ['Fraud Detection', 'ACID', 'Real-time'],
    stars: 670,
    users: '3K+',
    company: 'SecureFinance',
    liveUrl: 'https://fraudguard.ai'
  },
  {
    id: 6,
    name: 'ClipSearch Studio',
    description: 'Multimodal content management with CLIP embeddings for image and text search.',
    category: 'Content Management',
    image: '🖼️',
    tags: ['CLIP', 'Multimodal', 'CMS'],
    stars: 1200,
    users: '8K+',
    company: 'MediaTech',
    githubUrl: 'https://github.com/mediatech/clipsearch',
    liveUrl: 'https://clipsearch.studio'
  },
  {
    id: 7,
    name: 'DocChat AI',
    description: 'Intelligent document Q&A system with semantic search and context retrieval.',
    category: 'RAG & Search',
    image: '📚',
    tags: ['Document AI', 'Q&A', 'Semantic Search'],
    stars: 950,
    users: '6K+',
    company: 'DocuMind',
    githubUrl: 'https://github.com/documind/docchat',
    liveUrl: 'https://docchat.ai'
  },
  {
    id: 8,
    name: 'IoT Analytics Hub',
    description: 'Real-time IoT data processing and analytics with hybrid OLTP/OLAP capabilities.',
    category: 'IoT & Real-time',
    image: '📊',
    tags: ['IoT', 'HTAP', 'Analytics'],
    stars: 560,
    users: '4K+',
    company: 'IoTCorp',
    liveUrl: 'https://iot-analytics.com'
  },
  {
    id: 9,
    name: 'SmartAgent Framework',
    description: 'Multi-agent AI system for complex workflow automation with vector memory.',
    category: 'AI Agents',
    image: '🤝',
    tags: ['Multi-Agent', 'Workflow', 'Memory'],
    stars: 1450,
    users: '12K+',
    company: 'AgentLabs',
    githubUrl: 'https://github.com/agentlabs/smartagent',
    liveUrl: 'https://smartagent.dev'
  },
  {
    id: 10,
    name: 'PaymentIQ',
    description: 'Intelligent payment processing with real-time risk assessment and vector-based fraud detection.',
    category: 'FinTech',
    image: '💳',
    tags: ['Payments', 'Risk Assessment', 'Vector AI'],
    stars: 780,
    users: '7K+',
    company: 'PayTech Solutions',
    liveUrl: 'https://paymentiq.com'
  },
  {
    id: 11,
    name: 'NewsFlow AI',
    description: 'AI-powered news aggregation and summarization with semantic content clustering.',
    category: 'Content Management',
    image: '📰',
    tags: ['News', 'Summarization', 'Clustering'],
    stars: 630,
    users: '5K+',
    company: 'NewsFlow',
    githubUrl: 'https://github.com/newsflow/ai',
    liveUrl: 'https://newsflow.ai'
  },
  {
    id: 12,
    name: 'RetailInsights Pro',
    description: 'Advanced retail analytics combining transaction data with customer behavior vectors.',
    category: 'Analytics',
    image: '🏪',
    tags: ['Retail', 'Customer Analytics', 'Insights'],
    stars: 420,
    users: '3K+',
    company: 'RetailTech',
    liveUrl: 'https://retailinsights.pro'
  }
]

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const filteredApps = selectedCategory === 'All'
    ? applications
    : applications.filter(app => app.category === selectedCategory)

  const featuredApps = applications.filter(app => app.featured)

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Application <span className="gradient-text">Gallery</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover amazing applications built by our users with TiDB&apos;s multi-modal AI-native data platform.
            From AI agents to real-time analytics, see what the community has created.
          </p>
        </div>


        {/* Main Content with Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Category Filter Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-32">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium text-left ${
                      selectedCategory === category
                        ? 'bg-black dark:bg-white text-white dark:text-black'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Applications Grid */}
          <div className="flex-1">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-lg group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">{app.image}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{app.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{app.company}</p>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                {app.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {app.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
                  <div className="flex items-center gap-1">
                    <Star size={14} />
                    <span>{app.stars}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>{app.users}</span>
                  </div>
                </div>
                <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                  {app.category}
                </span>
              </div>

              <div className="flex gap-2">
                {app.githubUrl && (
                  <a
                    href={app.githubUrl}
                    className="flex items-center gap-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
                  >
                    <Github size={14} />
                    Code
                  </a>
                )}
                <a
                  href={app.liveUrl}
                  className="flex items-center gap-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm flex-1 justify-center"
                >
                  <ExternalLink size={14} />
                  Demo
                </a>
              </div>
            </div>
          ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Build Your Own?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers building intelligent applications with TiDB&apos;s
            multi-modal AI-native data platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 font-semibold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
              Start Building
              <ArrowRight size={20} />
            </button>
            <button className="border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-xl hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200 font-semibold text-lg">
              Submit Your App
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}