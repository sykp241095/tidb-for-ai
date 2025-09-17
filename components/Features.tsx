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
    code: `# Semantic search with RAG context retrieval
import tidb_vector as tv
from openai import OpenAI

# Connect to TiDB
client = tv.connect("mysql://user:pass@host:4000/db")
openai_client = OpenAI()

# Create knowledge base table
client.execute("""
    CREATE TABLE IF NOT EXISTS knowledge_base (
        id INT AUTO_INCREMENT PRIMARY KEY,
        content TEXT,
        title VARCHAR(500),
        source VARCHAR(200),
        embedding VECTOR(1536) COMMENT 'hnsw(distance=cosine)',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""")

# Function to get embeddings
def get_embedding(text):
    response = openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding

# RAG query function
def semantic_search(query, top_k=5):
    query_embedding = get_embedding(query)

    results = client.execute("""
        SELECT
            content, title, source,
            VEC_COSINE_DISTANCE(embedding, %s) as similarity
        FROM knowledge_base
        ORDER BY similarity DESC
        LIMIT %s
    """, (query_embedding, top_k))

    return results

# Example usage
contexts = semantic_search("How to optimize database performance?")
for content, title, source, similarity in contexts:
    print(f"Title: {title} (similarity: {similarity:.4f})")`
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
    code: `# Multimodal Image & Text Search with CLIP
import tidb_vector as tv
import clip
import torch
from PIL import Image
import requests
from io import BytesIO

# Load CLIP model
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

# Connect to TiDB
client = tv.connect("mysql://user:pass@host:4000/db")

# Create multimodal content table
client.execute("""
    CREATE TABLE IF NOT EXISTS multimodal_content (
        id INT AUTO_INCREMENT PRIMARY KEY,
        content_type ENUM('image', 'text'),
        content_path VARCHAR(500),
        content_text TEXT,
        description TEXT,
        clip_embedding VECTOR(512) COMMENT 'hnsw(distance=cosine)',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""")

def get_clip_embedding(content, content_type='text'):
    """Generate CLIP embeddings for text or image"""
    with torch.no_grad():
        if content_type == 'text':
            text_tokens = clip.tokenize([content]).to(device)
            text_features = model.encode_text(text_tokens)
            return text_features.cpu().numpy()[0].tolist()
        else:
            if isinstance(content, str):
                if content.startswith('http'):
                    response = requests.get(content)
                    image = Image.open(BytesIO(response.content))
                else:
                    image = Image.open(content)
            else:
                image = content

            image_input = preprocess(image).unsqueeze(0).to(device)
            image_features = model.encode_image(image_input)
            return image_features.cpu().numpy()[0].tolist()

# Search across both images and text
results = multimodal_search("mountain landscape", limit=5)
for content_type, content, description, similarity in results:
    print(f"Type: {content_type}, Similarity: {similarity:.4f}")`
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
    code: `# Advanced Hybrid Search Implementation
import tidb_vector as tv
from openai import OpenAI

client = tv.connect("mysql://user:pass@host:4000/db")
openai_client = OpenAI()

# Create comprehensive search table
client.execute("""
    CREATE TABLE IF NOT EXISTS hybrid_documents (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(500),
        content TEXT,
        category VARCHAR(100),
        author VARCHAR(200),
        publish_date DATE,
        view_count INT DEFAULT 0,
        rating FLOAT DEFAULT 0.0,
        embedding VECTOR(1536) COMMENT 'hnsw(distance=cosine)',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FULLTEXT(title, content)
    )
""")

def hybrid_search(query, weights=None, limit=10):
    """Advanced hybrid search combining multiple signals"""
    if weights is None:
        weights = {'vector': 0.4, 'fulltext': 0.3, 'popularity': 0.2, 'recency': 0.1}

    # Get query embedding
    response = openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=query
    )
    query_embedding = response.data[0].embedding

    # Hybrid scoring query
    results = client.execute("""
        SELECT
            id, title, content, category, rating,
            -- Combined weighted score
            (
                (1 - VEC_COSINE_DISTANCE(embedding, %s)) * %s +
                MATCH(title, content) AGAINST (%s IN NATURAL LANGUAGE MODE) * %s +
                LEAST(view_count / 1000.0, 1.0) * %s +
                GREATEST(0, 1 - DATEDIFF(CURDATE(), publish_date) / 365.0) * %s
            ) as combined_score
        FROM hybrid_documents
        WHERE VEC_COSINE_DISTANCE(embedding, %s) < 0.8
           OR MATCH(title, content) AGAINST (%s IN NATURAL LANGUAGE MODE) > 0
        ORDER BY combined_score DESC
        LIMIT %s
    """, (query_embedding, weights['vector'], query, weights['fulltext'],
           weights['popularity'], weights['recency'], query_embedding, query, limit))

    return results

# Example usage
results = hybrid_search("machine learning algorithms", limit=5)
for row in results:
    title, score = row[1], row[-1]
    print(f"Result: {title}, Score: {score:.3f}")`
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
    code: `# Enhanced Filtering with Vector Search
import tidb_vector as tv
from datetime import datetime, timedelta

client = tv.connect("mysql://user:pass@host:4000/db")

# Create comprehensive product catalog
client.execute("""
    CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(200),
        description TEXT,
        category VARCHAR(100),
        brand VARCHAR(100),
        price DECIMAL(10,2),
        rating FLOAT,
        review_count INT,
        tags JSON,
        attributes JSON,
        stock_quantity INT,
        is_featured BOOLEAN DEFAULT FALSE,
        description_embedding VECTOR(1536) COMMENT 'hnsw(distance=cosine)',
        INDEX idx_category (category),
        INDEX idx_price (price)
    )
""")

class AdvancedFilter:
    def __init__(self, client):
        self.client = client

    def search_products(self, semantic_query=None, filters=None, limit=20):
        """Execute filtered product search"""
        conditions = []
        params = []

        # Base query
        query = "SELECT id, name, category, brand, price, rating FROM products"

        if semantic_query:
            # Add semantic similarity
            from openai import OpenAI
            openai_client = OpenAI()
            response = openai_client.embeddings.create(
                model="text-embedding-3-small",
                input=semantic_query
            )
            query_embedding = response.data[0].embedding

            query = "SELECT id, name, category, brand, price, rating, VEC_COSINE_DISTANCE(description_embedding, %s) as similarity FROM products"
            params.append(query_embedding)
            conditions.append("VEC_COSINE_DISTANCE(description_embedding, %s) < 0.7")
            params.append(query_embedding)

        if filters:
            if 'price_min' in filters:
                conditions.append("price >= %s")
                params.append(filters['price_min'])
            if 'categories' in filters:
                placeholders = ','.join(['%s'] * len(filters['categories']))
                conditions.append(f"category IN ({placeholders})")
                params.extend(filters['categories'])
            if 'min_rating' in filters:
                conditions.append("rating >= %s")
                params.append(filters['min_rating'])
            if filters.get('in_stock_only', False):
                conditions.append("stock_quantity > 0")

        if conditions:
            query += " WHERE " + " AND ".join(conditions)

        if semantic_query:
            query += " ORDER BY similarity ASC"

        query += f" LIMIT {limit}"

        return self.client.execute(query, params)

# Usage example
filter_engine = AdvancedFilter(client)
results = filter_engine.search_products(
    semantic_query="comfortable running shoes",
    filters={'price_min': 50.0, 'categories': ['shoes'], 'min_rating': 4.0},
    limit=10
)

for row in results:
    name, price, rating = row[1], row[4], row[5]
    print(f"{name} - Price: {price} - Rating: {rating}")`
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
    code: `# Auto Embedding with TiDB Built-in Functions
import tidb_vector as tv

client = tv.connect("mysql://user:pass@host:4000/db")

# Create table with auto-embedding support
client.execute("""
    CREATE TABLE IF NOT EXISTS auto_embedded_content (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(500),
        content TEXT,
        category VARCHAR(100),
        -- Auto-generated embedding using built-in function
        content_embedding VECTOR(1536)
            GENERATED ALWAYS AS (VEC_FROM_TEXT(CONCAT(title, ' ', content)))
            STORED COMMENT 'hnsw(distance=cosine)',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FULLTEXT(title, content)
    )
""")

# Alternative with triggers for more control
client.execute("""
    CREATE TABLE IF NOT EXISTS smart_documents (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(500),
        content TEXT,
        summary TEXT,
        category VARCHAR(100),
        auto_embedding VECTOR(1536) COMMENT 'hnsw(distance=cosine)',
        title_embedding VECTOR(1536) COMMENT 'hnsw(distance=cosine)',
        embedding_updated_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""")

def insert_content_with_auto_embedding(title, content, category):
    """Insert content and let TiDB automatically generate embeddings"""
    client.execute("""
        INSERT INTO auto_embedded_content (title, content, category)
        VALUES (%s, %s, %s)
    """, (title, content, category))
    print("Inserted content with auto-generated embeddings")

def search_auto_embedded_content(query, limit=10):
    """Search using auto-generated embeddings"""
    results = client.execute("""
        SELECT
            title, content, category,
            VEC_COSINE_DISTANCE(auto_embedding, VEC_FROM_TEXT(%s)) as similarity
        FROM smart_documents
        ORDER BY similarity ASC
        LIMIT %s
    """, (query, limit))

    return results

# Example usage - embeddings generated automatically
insert_content_with_auto_embedding(
    "Introduction to Vector Databases",
    "Vector databases enable semantic search and AI applications.",
    "Technology"
)

# Search using auto-generated embeddings
results = search_auto_embedded_content("semantic search applications", limit=5)
for title, content, category, similarity in results:
    print(f"Title: {title}, Similarity: {similarity:.4f}")`
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
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    activeFeature === index
                      ? 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 shadow-lg'
                      : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white shrink-0`}>
                      <Icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
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

            {/* Feature Details */}
            <div className="px-6 pb-6">
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${features[activeFeature].color} text-white shrink-0`}>
                    {(() => {
                      const Icon = features[activeFeature].icon
                      return <Icon size={20} />
                    })()}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      {features[activeFeature].title}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {features[activeFeature].description}
                    </p>
                  </div>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {features[activeFeature].details.map((detail, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shrink-0"></div>
                      <span className="text-gray-400 text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
                  onClick={() => copyToClipboard(additionalFeatures[0].code)}
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
                    {additionalFeatures[0].code.split('\n').map((line, index) => (
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