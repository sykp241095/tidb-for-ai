'use client'

import { ArrowRight, ExternalLink, Play, BookOpen } from 'lucide-react'

const useCases = [
  {
    title: 'Semantic Search & RAG',
    description: 'Build intelligent document search with vector embeddings and hybrid queries combining semantic similarity with keyword matching.',
    tier: 'Tier 1',
    tierColor: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    tags: ['Vector Search', 'OpenAI Embeddings', 'Full-text'],
    cta: 'Explore Example',
    icon: '🔍',
    featured: true
  },
  {
    title: 'LangChain AI Agents',
    description: 'Complete LLM-powered agent that queries both vector and SQL data as the definitive template for building agents with TiDB.',
    tier: 'Tier 3',
    tierColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    tags: ['LangChain', 'GPT-4', 'Python'],
    cta: 'Deploy Now',
    icon: '🤖'
  },
  {
    title: 'Image & Text Search',
    description: 'Multimodal search engine using CLIP embeddings to find relevant images and text content across different media types.',
    tier: 'Tier 1',
    tierColor: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    tags: ['CLIP', 'Multimodal', 'Vision'],
    cta: 'View Demo',
    icon: '🖼️'
  },
  {
    title: 'Real-time Recommendations',
    description: 'Hybrid search combining semantic similarity with structured filters for personalized, real-time recommendations.',
    tier: 'Tier 2',
    tierColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    tags: ['Real-time', 'Filtering', 'Personalization'],
    cta: 'Book Demo',
    icon: '⚡'
  },
  {
    title: 'Fraud Detection Agent',
    description: 'Transactional AI system using ACID guarantees to reliably detect and block fraudulent events in real-time.',
    tier: 'Tier 2',
    tierColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    tags: ['ACID', 'Real-time', 'FinTech'],
    cta: 'Learn More',
    icon: '🛡️'
  },
  {
    title: 'Intelligent Analytics',
    description: 'Connect TiDB to AI platforms like Claude Desktop for complex data analysis via natural language queries.',
    tier: 'Tier 2',
    tierColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    tags: ['Analytics', 'NL Queries', 'BI Tools'],
    cta: 'Try Now',
    icon: '📊'
  }
]

const customerStories = [
  {
    company: 'Dify.AI',
    title: 'Unified AI Backend',
    description: 'Consolidated 8+ databases into one TiDB for metadata, context, and vectors. Perfect for startups feeling infrastructure pain.',
    logo: '🚀',
    impact: 'Reduced infrastructure complexity by 80%'
  },
  {
    company: 'TOPRISM',
    title: 'Conversational BI',
    description: 'Powers real-time Chat2Query feature using TiDB\'s unified engine for complex analytics products.',
    logo: '💬',
    impact: 'Enabled real-time conversational analytics'
  },
  {
    company: 'APTSell',
    title: 'AI Digital Sales Employee',
    description: 'Uses TiDB as unified "brain" to connect CRM data, docs, and analytics for an agentic workflow.',
    logo: '🧠',
    impact: 'Streamlined sales automation workflows'
  }
]

export default function UseCases() {
  return (
    <section id="use-cases" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-black dark:to-gray-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Powerful AI Use Cases
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From simple semantic search to complex AI agents, TiDB powers
            the next generation of intelligent applications.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-xl group ${
                useCase.featured ? 'ring-2 ring-blue-500/20 lg:col-span-2' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="text-3xl mb-4">{useCase.icon}</div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${useCase.tierColor}`}>
                  {useCase.tier}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {useCase.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {useCase.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {useCase.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button className="inline-flex items-center gap-2 text-black dark:text-white font-medium hover:gap-3 transition-all duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {useCase.cta}
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Customer Stories Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Customer Success Stories
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              See how leading AI companies are building with TiDB
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {customerStories.map((story, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-xl group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-3xl">{story.logo}</div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{story.company}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{story.title}</p>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {story.description}
                </p>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {story.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}