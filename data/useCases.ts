import { UseCase, CustomerStory } from '@/types'

export const useCases: UseCase[] = [
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

export const customerStories: CustomerStory[] = [
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