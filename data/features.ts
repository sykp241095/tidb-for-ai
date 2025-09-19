import { Search, Image, Layers, Filter, Sparkles, Zap, Shield } from 'lucide-react'
import { Feature, AdditionalFeature } from '@/types'

export const features: Feature[] = [
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
    code: `# Define schema with auto-embedding
class Chunk(TableModel):
    id: int = Field(primary_key=True)
    text: str = Field()
    text_vec: list[float] = text_embed.VectorField(
        source_field="text"
    )

# Vector search with filtering
def semantic_search(query_text):
    return (
        table.search(query_text)
        .filter({"meta.language": "en"})
        .distance_threshold(0.8)
        .limit(5)
        .to_pandas()
    )

# Example usage
results = semantic_search("slow application performance")
print(f"Found {len(results)} similar results")`
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

export const additionalFeatures: AdditionalFeature[] = [
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