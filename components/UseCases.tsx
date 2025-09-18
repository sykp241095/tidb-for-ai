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

          <div className="grid md:grid-cols-3 gap-10">
            {customerStories.map((story, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-3xl p-10 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-xl group"
              >
                <div className="flex items-center gap-5 mb-8">
                  <div className="text-4xl">{story.logo}</div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">{story.company}</h4>
                    <p className="text-base text-gray-600 dark:text-gray-400">{story.title}</p>
                  </div>
                </div>

                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {story.description}
                </p>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-xl p-6">
                  <p className="text-base font-medium text-gray-900 dark:text-white">
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