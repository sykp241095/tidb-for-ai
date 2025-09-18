'use client'

import { useState } from 'react'
import { Database, Search, Layers, Code, Zap, Shield, Copy, Check, Bot, Sparkles, Image, Filter } from 'lucide-react'

const features = [
  {
    icon: Search,
    title: 'Semantic Search & RAG',
    description: 'Build intelligent document search with vector embeddings and hybrid queries combining semantic similarity with keyword matching.',
    details: [
      'Vector similarity search with embeddings',
      'Hybrid queries combining vector + text',
      'RAG applications with context retrieval',
      'OpenAI embeddings integration'
    ],
    color: 'from-blue-500 to-blue-600',
    code: `# Semantic search with RAG
import tidb_vector as tv
from openai import OpenAI

client = tv.connect("mysql://user:pass@host:4000/db")
openai_client = OpenAI()

# Get embeddings and search
def semantic_search(query, top_k=5):
    query_embedding = openai_client.embeddings.create(
        model="text-embedding-3-small", input=query
    ).data[0].embedding

    return client.execute("""
        SELECT content, title,
               VEC_COSINE_DISTANCE(embedding, %s) as similarity
        FROM knowledge_base
        ORDER BY similarity DESC LIMIT %s
    """, (query_embedding, top_k))

# Example usage
results = semantic_search("How to optimize performance?")
for content, title, similarity in results:
    print(f"{title}: {similarity:.3f}")`
  },
  {
    icon: Image,
    title: 'Image & Text Search',
    description: 'Multimodal search engine using CLIP embeddings to find relevant images and text content across different media types.',
    details: [
      'CLIP embeddings for multimodal search',
      'Cross-modal similarity matching',
      'Image and text unified search',
      'Visual content understanding'
    ],
    color: 'from-green-500 to-green-600',
    code: `# Multimodal search with CLIP
import tidb_vector as tv
import clip
import torch

# Load CLIP model and connect to TiDB
model, preprocess = clip.load("ViT-B/32")
client = tv.connect("mysql://user:pass@host:4000/db")

def multimodal_search(query, limit=5):
    # Get CLIP embedding for text query
    with torch.no_grad():
        text_tokens = clip.tokenize([query])
        query_embedding = model.encode_text(text_tokens)[0].tolist()

    # Search across images and text
    return client.execute("""
        SELECT content_type, description,
               VEC_COSINE_DISTANCE(clip_embedding, %s) as similarity
        FROM multimodal_content
        ORDER BY similarity ASC LIMIT %s
    """, (query_embedding, limit))

# Example usage
results = multimodal_search("mountain landscape")
for content_type, desc, similarity in results:
    print(f"{content_type}: {similarity:.3f}")`
  },
  {
    icon: Layers,
    title: 'Hybrid Search',
    description: 'Combine vector similarity, full-text search, and structured data filtering in a single query for the most relevant results.',
    details: [
      'Vector + full-text combination',
      'Weighted scoring algorithms',
      'Structured data filtering',
      'Multi-criteria relevance ranking'
    ],
    color: 'from-purple-500 to-purple-600',
    code: `# Hybrid search combining vector + full-text
import tidb_vector as tv
from openai import OpenAI

client = tv.connect("mysql://user:pass@host:4000/db")
openai_client = OpenAI()

def hybrid_search(query, limit=10):
    # Get vector embedding
    query_embedding = openai_client.embeddings.create(
        model="text-embedding-3-small", input=query
    ).data[0].embedding

    # Combined vector + full-text search
    return client.execute("""
        SELECT title, content,
               (1 - VEC_COSINE_DISTANCE(embedding, %s)) * 0.7 +
               MATCH(title, content) AGAINST (%s) * 0.3 as score
        FROM hybrid_documents
        WHERE VEC_COSINE_DISTANCE(embedding, %s) < 0.8
           OR MATCH(title, content) AGAINST (%s) > 0
        ORDER BY score DESC LIMIT %s
    """, (query_embedding, query, query_embedding, query, limit))

# Example usage
results = hybrid_search("machine learning algorithms")
for title, content, score in results:
    print(f"{title}: {score:.3f}")`
  },
  {
    icon: Filter,
    title: 'Enhanced Filtering',
    description: 'Advanced filtering capabilities with vector search, supporting complex conditions and real-time updates.',
    details: [
      'Multi-dimensional filtering',
      'Dynamic filter combinations',
      'Real-time filter updates',
      'Performance-optimized queries'
    ],
    color: 'from-orange-500 to-orange-600',
    code: `# Enhanced filtering with semantic search
import tidb_vector as tv
from openai import OpenAI

client = tv.connect("mysql://user:pass@host:4000/db")
openai_client = OpenAI()

def search_products(query, filters=None, limit=10):
    # Get semantic embedding
    query_embedding = openai_client.embeddings.create(
        model="text-embedding-3-small", input=query
    ).data[0].embedding

    # Build filtered query
    conditions = ["VEC_COSINE_DISTANCE(description_embedding, %s) < 0.7"]
    params = [query_embedding]

    if filters:
        if 'price_min' in filters:
            conditions.append("price >= %s")
            params.append(filters['price_min'])
        if 'category' in filters:
            conditions.append("category = %s")
            params.append(filters['category'])

    return client.execute(f"""
        SELECT name, price, rating,
               VEC_COSINE_DISTANCE(description_embedding, %s) as similarity
        FROM products
        WHERE {' AND '.join(conditions)}
        ORDER BY similarity ASC LIMIT %s
    """, [query_embedding] + params + [limit])

# Example usage
results = search_products("running shoes", {'price_min': 50})
for name, price, rating, similarity in results:
    print(f"{name}: {price} ({similarity:.3f})")`
  },
  {
    icon: Sparkles,
    title: 'Auto Embedding',
    description: 'Automatically generate and update vector embeddings for your data with built-in embedding models and triggers.',
    details: [
      'Automatic embedding generation',
      'Built-in embedding models',
      'Real-time embedding updates',
      'Zero-maintenance vector search'
    ],
    color: 'from-pink-500 to-pink-600',
    code: `# Auto-embedding with TiDB built-in functions
import tidb_vector as tv

client = tv.connect("mysql://user:pass@host:4000/db")

# Create table with auto-generated embeddings
client.execute("""
    CREATE TABLE auto_embedded_content (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(500),
        content TEXT,
        -- Auto-generated embedding column
        content_embedding VECTOR(1536)
            GENERATED ALWAYS AS (VEC_FROM_TEXT(CONCAT(title, ' ', content)))
            STORED COMMENT 'hnsw(distance=cosine)'
    )
""")

# Insert content - embeddings generated automatically
client.execute("""
    INSERT INTO auto_embedded_content (title, content)
    VALUES (%s, %s)
""", ("Vector Database Guide", "Learn about vector search"))

# Search using auto-generated embeddings
def auto_search(query, limit=5):
    return client.execute("""
        SELECT title, content,
               VEC_COSINE_DISTANCE(content_embedding, VEC_FROM_TEXT(%s)) as similarity
        FROM auto_embedded_content
        ORDER BY similarity ASC LIMIT %s
    """, (query, limit))

# Example usage
results = auto_search("vector search tutorial")
for title, content, similarity in results:
    print(f"{title}: {similarity:.3f}")`
  }
]

const additionalFeatures = [
  {
    icon: Layers,
    title: 'Hybrid Queries',
    description: 'Combine vector similarity, full-text search, and structured data filtering in a single query for the most relevant results.',
    code: "SELECT id, title, VEC_COSINE_DISTANCE(embedding, %s) * 0.7 + MATCH(title, content) AGAINST (%s) * 0.3 as score FROM documents WHERE category = 'technology' ORDER BY score DESC LIMIT 20;"
  },
  {
    icon: Zap,
    title: 'Real-time Analytics',
    description: 'Process and analyze data in real-time with HTAP capabilities for both transactional and analytical workloads.'
  },
  {
    icon: Shield,
    title: 'Enterprise Ready',
    description: 'Built-in security, compliance, and scalability features for production AI applications.'
  }
]

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [copiedCode, setCopiedCode] = useState('')

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(code)
      setTimeout(() => setCopiedCode(''), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
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
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-800 dark:hover:to-gray-900 ${
                    activeFeature === index
                      ? 'border-blue-500/50 dark:border-blue-400/50 shadow-lg shadow-blue-500/10 dark:shadow-blue-400/10'
                      : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                  }`}
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
                </div>
              )
            })}
          </div>

          {/* Code Example */}
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
                  {features[activeFeature].title.toLowerCase().replace(/ /g, '_').replace(/&/g, 'and')}.py
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(features[activeFeature].code)}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors text-sm"
              >
                {copiedCode === features[activeFeature].code ? (
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
                  {features[activeFeature].code.split('\n').map((line, index) => (
                    <div key={index} className="text-gray-100">
                      {line}
                    </div>
                  ))}
                </code>
              </pre>
            </div>

          </div>
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
                  onClick={() => hasCode && setActiveFeature(3 + index)}
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
          {activeFeature === 6 && (
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
                  {copiedCode === additionalFeatures[0].code ? (
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
            <button className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-semibold">
              View Full Documentation
            </button>
            <button className="border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-xl hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors font-semibold">
              Browse Example Gallery
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}