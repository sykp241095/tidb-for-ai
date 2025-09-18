'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, User, ArrowLeft, Copy, Check } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useRouter } from 'next/navigation'

const blogPosts = {
  '1': {
    id: 1,
    title: 'Building Semantic Search with TiDB Vector Database',
    excerpt: 'Learn how to implement powerful semantic search using TiDB&apos;s native vector capabilities and OpenAI embeddings for intelligent document retrieval.',
    category: 'AI & Machine Learning',
    author: 'Sarah Chen',
    date: '2024-03-15',
    readTime: '8 min read',
    image: '🔍',
    content: `
# Building Semantic Search with TiDB Vector Database

Semantic search has revolutionized how we find and retrieve information. Unlike traditional keyword-based search, semantic search understands the *meaning* behind your queries, enabling more intelligent and contextual results.

## What is Semantic Search?

Semantic search uses vector embeddings to represent text as high-dimensional vectors that capture semantic meaning. When you search for "apple," a semantic search system understands whether you mean the fruit or the technology company based on context.

## Setting Up TiDB for Vector Search

TiDB's native vector support makes it incredibly easy to build semantic search applications. Here's how to get started:

\`\`\`sql
-- Create a table with vector column
CREATE TABLE documents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    content TEXT,
    embedding VECTOR(1536),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Create vector index for fast similarity search
    VECTOR INDEX idx_embedding (embedding)
);
\`\`\`

## Generating Embeddings with OpenAI

First, let's generate embeddings for our documents:

\`\`\`python
import openai
import mysql.connector
from typing import List

class SemanticSearchEngine:
    def __init__(self, connection_string: str, openai_api_key: str):
        self.db = mysql.connector.connect(connection_string)
        openai.api_key = openai_api_key

    def generate_embedding(self, text: str) -> List[float]:
        """Generate embedding using OpenAI's text-embedding-3-small model"""
        response = openai.embeddings.create(
            model="text-embedding-3-small",
            input=text
        )
        return response.data[0].embedding

    def add_document(self, title: str, content: str):
        """Add a document with auto-generated embedding"""
        embedding = self.generate_embedding(f"{title} {content}")

        cursor = self.db.cursor()
        cursor.execute(
            "INSERT INTO documents (title, content, embedding) VALUES (%s, %s, %s)",
            (title, content, embedding)
        )
        self.db.commit()
\`\`\`

## Implementing Semantic Search

Now let's implement the search functionality:

\`\`\`python
def semantic_search(self, query: str, top_k: int = 5) -> List[dict]:
    """Perform semantic search using vector similarity"""
    # Generate embedding for the search query
    query_embedding = self.generate_embedding(query)

    cursor = self.db.cursor(dictionary=True)

    # Use TiDB's VEC_COSINE_DISTANCE for similarity search
    cursor.execute("""
        SELECT
            id, title, content,
            VEC_COSINE_DISTANCE(embedding, %s) as similarity_score
        FROM documents
        ORDER BY similarity_score ASC
        LIMIT %s
    """, (query_embedding, top_k))

    results = cursor.fetchall()

    # Convert similarity score to percentage
    for result in results:
        result['similarity_percentage'] = (1 - result['similarity_score']) * 100

    return results
\`\`\`

## Advanced Features

### Filtering with Metadata

Combine semantic search with traditional filters:

\`\`\`sql
SELECT
    id, title, content,
    VEC_COSINE_DISTANCE(embedding, %s) as similarity_score
FROM documents
WHERE created_at >= '2024-01-01'
    AND category = 'technology'
ORDER BY similarity_score ASC
LIMIT 10;
\`\`\`

### Hybrid Search

Combine semantic and keyword search for best results:

\`\`\`sql
SELECT
    id, title, content,
    (VEC_COSINE_DISTANCE(embedding, %s) * 0.7 +
     (1 - MATCH(title, content) AGAINST(%s)) * 0.3) as combined_score
FROM documents
ORDER BY combined_score ASC
LIMIT 10;
\`\`\`

## Performance Optimization

1. **Use appropriate vector dimensions**: text-embedding-3-small (1536) vs text-embedding-3-large (3072)
2. **Index your vectors**: TiDB automatically optimizes vector indexes
3. **Batch embeddings**: Generate multiple embeddings in one API call
4. **Cache frequently used embeddings**: Store common query embeddings

## Real-World Example

Here's a complete example of a document search system:

\`\`\`python
# Initialize the search engine
search_engine = SemanticSearchEngine(
    connection_string="mysql://user:pass@tidb-host:4000/db",
    openai_api_key="your-openai-key"
)

# Add some documents
documents = [
    ("Machine Learning Basics", "Introduction to neural networks and deep learning"),
    ("Python Programming", "Learn Python for data science and web development"),
    ("Database Design", "Principles of relational database design and normalization")
]

for title, content in documents:
    search_engine.add_document(title, content)

# Search for documents
results = search_engine.semantic_search("artificial intelligence tutorial")

for doc in results:
    print(f"Title: {doc['title']}")
    print(f"Similarity: {doc['similarity_percentage']:.1f}%")
    print(f"Content: {doc['content'][:100]}...")
    print("---")
\`\`\`

## Conclusion

TiDB's native vector support makes building semantic search applications straightforward and scalable. By combining vector embeddings with traditional SQL operations, you can create powerful search experiences that understand user intent and deliver relevant results.

The key advantages of using TiDB for semantic search include:

- **Native vector support**: No need for separate vector databases
- **ACID transactions**: Ensure data consistency
- **Hybrid queries**: Combine vector and traditional search
- **Horizontal scaling**: Handle growing datasets effortlessly

Start building your semantic search application today with TiDB's powerful vector capabilities!
    `
  },
  '2': {
    id: 2,
    title: 'Image & Text Search with CLIP Embeddings',
    excerpt: 'Discover how to build multi-modal search applications using CLIP embeddings to find relevant content across images and text.',
    category: 'AI & Machine Learning',
    author: 'Alex Kumar',
    date: '2024-03-12',
    readTime: '6 min read',
    image: '🖼️',
    content: `
# Image & Text Search with CLIP Embeddings

Multi-modal search is the future of information retrieval. With CLIP (Contrastive Language-Image Pre-training), you can search for images using text descriptions and find text content using images. TiDB makes it simple to build these sophisticated applications.

## Understanding CLIP Embeddings

CLIP creates a shared embedding space where images and text with similar meanings are close together. This enables:

- **Text-to-Image Search**: Find images using natural language descriptions
- **Image-to-Text Search**: Find relevant text content using images
- **Cross-Modal Retrieval**: Unified search across different media types

## Setting Up Multi-Modal Search

Let's create a table that can store both image and text embeddings:

\`\`\`sql
CREATE TABLE media_content (
    id INT PRIMARY KEY AUTO_INCREMENT,
    content_type ENUM('image', 'text'),
    title VARCHAR(255),
    description TEXT,
    file_path VARCHAR(500),
    text_content TEXT,
    clip_embedding VECTOR(512),
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    VECTOR INDEX idx_clip_embedding (clip_embedding)
);
\`\`\`

## Generating CLIP Embeddings

Here's how to generate CLIP embeddings for both images and text:

\`\`\`python
import torch
import clip
from PIL import Image
import mysql.connector
from typing import Union, List

class MultiModalSearchEngine:
    def __init__(self, connection_string: str):
        self.db = mysql.connector.connect(connection_string)
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model, self.preprocess = clip.load("ViT-B/32", device=self.device)

    def generate_text_embedding(self, text: str) -> List[float]:
        """Generate CLIP embedding for text"""
        text_tokens = clip.tokenize([text]).to(self.device)

        with torch.no_grad():
            text_features = self.model.encode_text(text_tokens)
            text_features = text_features / text_features.norm(dim=-1, keepdim=True)

        return text_features.cpu().numpy().flatten().tolist()

    def generate_image_embedding(self, image_path: str) -> List[float]:
        """Generate CLIP embedding for image"""
        image = Image.open(image_path)
        image_input = self.preprocess(image).unsqueeze(0).to(self.device)

        with torch.no_grad():
            image_features = self.model.encode_image(image_input)
            image_features = image_features / image_features.norm(dim=-1, keepdim=True)

        return image_features.cpu().numpy().flatten().tolist()
\`\`\`

## Adding Content to the Database

Store both images and text with their CLIP embeddings:

\`\`\`python
def add_image(self, title: str, description: str, file_path: str, metadata: dict = None):
    """Add an image with CLIP embedding"""
    embedding = self.generate_image_embedding(file_path)

    cursor = self.db.cursor()
    cursor.execute("""
        INSERT INTO media_content
        (content_type, title, description, file_path, clip_embedding, metadata)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, ('image', title, description, file_path, embedding, json.dumps(metadata or {})))
    self.db.commit()

def add_text(self, title: str, text_content: str, metadata: dict = None):
    """Add text content with CLIP embedding"""
    embedding = self.generate_text_embedding(text_content)

    cursor = self.db.cursor()
    cursor.execute("""
        INSERT INTO media_content
        (content_type, title, text_content, clip_embedding, metadata)
        VALUES (%s, %s, %s, %s, %s)
    """, ('text', title, text_content, embedding, json.dumps(metadata or {})))
    self.db.commit()
\`\`\`

## Multi-Modal Search Implementation

Now implement search functionality that works across both images and text:

\`\`\`python
def search_by_text(self, query: str, content_type: str = None, top_k: int = 10):
    """Search for content using text query"""
    query_embedding = self.generate_text_embedding(query)

    cursor = self.db.cursor(dictionary=True)

    where_clause = ""
    params = [query_embedding, top_k]

    if content_type:
        where_clause = "WHERE content_type = %s"
        params.insert(-1, content_type)

    cursor.execute(f"""
        SELECT
            id, content_type, title, description, file_path, text_content,
            VEC_COSINE_DISTANCE(clip_embedding, %s) as similarity_score
        FROM media_content
        {where_clause}
        ORDER BY similarity_score ASC
        LIMIT %s
    """, params)

    return cursor.fetchall()

def search_by_image(self, image_path: str, content_type: str = None, top_k: int = 10):
    """Search for content using an image"""
    query_embedding = self.generate_image_embedding(image_path)

    cursor = self.db.cursor(dictionary=True)

    where_clause = ""
    params = [query_embedding, top_k]

    if content_type:
        where_clause = "WHERE content_type = %s"
        params.insert(-1, content_type)

    cursor.execute(f"""
        SELECT
            id, content_type, title, description, file_path, text_content,
            VEC_COSINE_DISTANCE(clip_embedding, %s) as similarity_score
        FROM media_content
        {where_clause}
        ORDER BY similarity_score ASC
        LIMIT %s
    """, params)

    return cursor.fetchall()
\`\`\`

## Advanced Use Cases

### Fashion E-commerce Search

Perfect for fashion retail where customers can:

\`\`\`python
# Search for similar clothing items using text
results = search_engine.search_by_text(
    "red summer dress with floral pattern",
    content_type="image"
)

# Search using a reference image
results = search_engine.search_by_image(
    "/path/to/reference/dress.jpg",
    content_type="image"
)
\`\`\`

### Content Moderation

Automatically find inappropriate content across media types:

\`\`\`python
# Find potentially inappropriate content
suspicious_content = search_engine.search_by_text(
    "violence inappropriate content",
    top_k=50
)
\`\`\`

### Recipe and Food Discovery

Search recipes by describing dishes or showing food images:

\`\`\`python
# Find recipes by description
recipes = search_engine.search_by_text(
    "spicy pasta with vegetables",
    content_type="text"
)

# Find similar dishes by image
similar_dishes = search_engine.search_by_image(
    "/path/to/food/image.jpg"
)
\`\`\`

## Performance Optimization

### Batch Processing

Process multiple items efficiently:

\`\`\`python
def batch_process_images(self, image_data: List[dict]):
    """Process multiple images in batch"""
    embeddings = []

    for item in image_data:
        embedding = self.generate_image_embedding(item['file_path'])
        embeddings.append((
            item['title'], item['description'],
            item['file_path'], embedding
        ))

    cursor = self.db.cursor()
    cursor.executemany("""
        INSERT INTO media_content
        (content_type, title, description, file_path, clip_embedding)
        VALUES ('image', %s, %s, %s, %s)
    """, embeddings)
    self.db.commit()
\`\`\`

### Caching Strategy

Cache frequently used embeddings:

\`\`\`python
import redis

class CachedMultiModalSearch(MultiModalSearchEngine):
    def __init__(self, connection_string: str, redis_url: str):
        super().__init__(connection_string)
        self.cache = redis.from_url(redis_url)

    def generate_text_embedding(self, text: str) -> List[float]:
        cache_key = f"text_embedding:{hash(text)}"
        cached = self.cache.get(cache_key)

        if cached:
            return json.loads(cached)

        embedding = super().generate_text_embedding(text)
        self.cache.setex(cache_key, 3600, json.dumps(embedding))  # 1 hour cache
        return embedding
\`\`\`

## Complete Example Application

Here's a full example of a multi-modal search application:

\`\`\`python
# Initialize the search engine
search_engine = MultiModalSearchEngine(
    connection_string="mysql://user:pass@tidb-host:4000/multimodal_db"
)

# Add some content
search_engine.add_image(
    title="Beautiful Sunset",
    description="Golden sunset over mountains",
    file_path="/images/sunset.jpg",
    metadata={"photographer": "John Doe", "location": "Alps"}
)

search_engine.add_text(
    title="Mountain Photography Tips",
    text_content="Learn how to capture stunning mountain landscapes during golden hour...",
    metadata={"category": "photography", "difficulty": "intermediate"}
)

# Search for images using text
image_results = search_engine.search_by_text(
    "beautiful mountain landscape",
    content_type="image"
)

print("Images matching 'beautiful mountain landscape':")
for result in image_results:
    print(f"- {result['title']}: {result['file_path']}")
    print(f"  Similarity: {(1-result['similarity_score'])*100:.1f}%")

# Search for text using an image
text_results = search_engine.search_by_image(
    "/path/to/mountain.jpg",
    content_type="text"
)

print("\\nText content similar to mountain image:")
for result in text_results:
    print(f"- {result['title']}")
    print(f"  Similarity: {(1-result['similarity_score'])*100:.1f}%")
\`\`\`

## Conclusion

CLIP embeddings with TiDB enable powerful multi-modal search applications that understand both visual and textual content. This technology opens up new possibilities for:

- **E-commerce**: Visual product search
- **Content Management**: Cross-media content discovery
- **Education**: Multi-modal learning resources
- **Creative Tools**: Inspiration and reference finding

The combination of CLIP's multi-modal understanding and TiDB's vector capabilities provides a robust foundation for building the next generation of search applications.
    `
  },
  '3': {
    id: 3,
    title: 'Hybrid Search: Combining Vector and Text Search',
    excerpt: 'Master the art of hybrid search by combining semantic vector similarity with traditional keyword matching for optimal results.',
    category: 'AI & Machine Learning',
    author: 'David Park',
    date: '2024-03-10',
    readTime: '7 min read',
    image: '🔀',
    content: `
# Hybrid Search: Combining Vector and Text Search

Neither vector search nor traditional text search is perfect on its own. Vector search excels at understanding semantic meaning but may miss exact matches. Traditional text search is great for precise keywords but lacks semantic understanding. Hybrid search combines both approaches for superior results.

## Why Hybrid Search?

Consider searching for "Python programming tutorial":

- **Vector search** might return results about "coding with Python" or "software development guide"
- **Text search** would find exact matches for "Python programming tutorial"
- **Hybrid search** gives you both semantic understanding AND exact matches

## Setting Up Hybrid Search in TiDB

TiDB's full-text search capabilities combined with vector search make hybrid implementation straightforward:

\`\`\`sql
CREATE TABLE documents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    content TEXT,
    category VARCHAR(100),
    tags JSON,
    embedding VECTOR(1536),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Vector index for semantic search
    VECTOR INDEX idx_embedding (embedding),

    -- Full-text index for keyword search
    FULLTEXT INDEX idx_fulltext (title, content)
);
\`\`\`

## Implementing Hybrid Search

Here's a comprehensive hybrid search implementation:

\`\`\`python
import openai
import mysql.connector
from typing import List, Dict, Tuple
import re

class HybridSearchEngine:
    def __init__(self, connection_string: str, openai_api_key: str):
        self.db = mysql.connector.connect(connection_string)
        openai.api_key = openai_api_key

    def generate_embedding(self, text: str) -> List[float]:
        """Generate embedding using OpenAI"""
        response = openai.embeddings.create(
            model="text-embedding-3-small",
            input=text
        )
        return response.data[0].embedding

    def preprocess_query(self, query: str) -> Dict[str, str]:
        """Preprocess query for both vector and text search"""
        # Clean query for text search
        text_query = re.sub(r'[^\w\s]', ' ', query)
        text_query = re.sub(r'\s+', ' ', text_query).strip()

        # Use original query for vector search to preserve semantic meaning
        vector_query = query

        return {
            'text_query': text_query,
            'vector_query': vector_query
        }
\`\`\`

## Core Hybrid Search Function

\`\`\`python
def hybrid_search(
    self,
    query: str,
    top_k: int = 10,
    vector_weight: float = 0.6,
    text_weight: float = 0.4,
    category_filter: str = None
) -> List[Dict]:
    """
    Perform hybrid search combining vector and text search

    Args:
        query: Search query
        top_k: Number of results to return
        vector_weight: Weight for vector similarity (0-1)
        text_weight: Weight for text relevance (0-1)
        category_filter: Optional category filter
    """

    # Preprocess query
    processed = self.preprocess_query(query)

    # Generate embedding for vector search
    query_embedding = self.generate_embedding(processed['vector_query'])

    # Build the hybrid search query
    where_clause = ""
    params = []

    if category_filter:
        where_clause = "WHERE category = %s"
        params.append(category_filter)

    # Hybrid search SQL combining vector and text search
    sql_query = f"""
        SELECT
            id, title, content, category,
            VEC_COSINE_DISTANCE(embedding, %s) as vector_similarity,
            MATCH(title, content) AGAINST (%s IN NATURAL LANGUAGE MODE) as text_relevance,
            (
                (1 - VEC_COSINE_DISTANCE(embedding, %s)) * %s +
                MATCH(title, content) AGAINST (%s IN NATURAL LANGUAGE MODE) * %s
            ) as hybrid_score
        FROM documents
        {where_clause}
        HAVING (vector_similarity < 0.8 OR text_relevance > 0)
        ORDER BY hybrid_score DESC
        LIMIT %s
    """

    # Parameters for the query
    query_params = [
        query_embedding,  # For vector similarity calculation
        processed['text_query'],  # For text relevance calculation
        query_embedding,  # For hybrid score vector component
        vector_weight,  # Vector weight
        processed['text_query'],  # For hybrid score text component
        text_weight,  # Text weight
        top_k
    ]

    # Add category filter parameter if needed
    if category_filter:
        query_params = [query_params[0], query_params[1]] + params + query_params[2:]

    cursor = self.db.cursor(dictionary=True)
    cursor.execute(sql_query, query_params)

    results = cursor.fetchall()

    # Add percentage scores for better interpretation
    for result in results:
        result['vector_similarity_pct'] = (1 - result['vector_similarity']) * 100
        result['text_relevance_pct'] = result['text_relevance'] * 100
        result['hybrid_score_pct'] = result['hybrid_score'] * 100

    return results
\`\`\`

## Advanced Hybrid Search Strategies

### Dynamic Weight Adjustment

Adjust weights based on query characteristics:

\`\`\`python
def adaptive_hybrid_search(self, query: str, top_k: int = 10) -> List[Dict]:
    """Dynamically adjust weights based on query type"""

    # Detect query patterns
    has_quotes = '"' in query
    has_exact_terms = any(term.isupper() for term in query.split())
    is_short_query = len(query.split()) <= 2

    # Adjust weights based on query characteristics
    if has_quotes or has_exact_terms:
        # Favor text search for exact matches
        vector_weight, text_weight = 0.3, 0.7
    elif is_short_query:
        # Favor vector search for short, conceptual queries
        vector_weight, text_weight = 0.8, 0.2
    else:
        # Balanced approach for normal queries
        vector_weight, text_weight = 0.6, 0.4

    return self.hybrid_search(
        query, top_k, vector_weight, text_weight
    )
\`\`\`

### Multi-Stage Hybrid Search

Implement a two-stage search for better performance:

\`\`\`python
def multi_stage_hybrid_search(
    self,
    query: str,
    initial_candidates: int = 100,
    final_results: int = 10
) -> List[Dict]:
    """
    Two-stage hybrid search:
    1. Fast initial filtering
    2. Detailed reranking
    """

    processed = self.preprocess_query(query)

    # Stage 1: Fast candidate retrieval
    cursor = self.db.cursor(dictionary=True)

    # Get candidates using text search or simple vector search
    cursor.execute("""
        SELECT id, title, content, embedding
        FROM documents
        WHERE MATCH(title, content) AGAINST (%s IN NATURAL LANGUAGE MODE) > 0
        ORDER BY MATCH(title, content) AGAINST (%s IN NATURAL LANGUAGE MODE) DESC
        LIMIT %s
    """, (processed['text_query'], processed['text_query'], initial_candidates))

    candidates = cursor.fetchall()

    # If not enough text matches, supplement with vector search
    if len(candidates) < initial_candidates:
        query_embedding = self.generate_embedding(processed['vector_query'])

        cursor.execute("""
            SELECT id, title, content, embedding
            FROM documents
            WHERE id NOT IN ({})
            ORDER BY VEC_COSINE_DISTANCE(embedding, %s) ASC
            LIMIT %s
        """.format(','.join(str(c['id']) for c in candidates)),
        (query_embedding, initial_candidates - len(candidates)))

        candidates.extend(cursor.fetchall())

    # Stage 2: Detailed reranking with hybrid scoring
    query_embedding = self.generate_embedding(processed['vector_query'])

    scored_candidates = []
    for candidate in candidates:
        # Calculate vector similarity
        vector_sim = 1 - self.cosine_distance(query_embedding, candidate['embedding'])

        # Calculate text relevance (simplified - you might want to use TF-IDF)
        text_relevance = self.calculate_text_relevance(
            processed['text_query'],
            candidate['title'] + ' ' + candidate['content']
        )

        # Hybrid score
        hybrid_score = vector_sim * 0.6 + text_relevance * 0.4

        scored_candidates.append({
            **candidate,
            'vector_similarity': vector_sim,
            'text_relevance': text_relevance,
            'hybrid_score': hybrid_score
        })

    # Sort by hybrid score and return top results
    scored_candidates.sort(key=lambda x: x['hybrid_score'], reverse=True)
    return scored_candidates[:final_results]
\`\`\`

## Query-Specific Optimization

### Boolean Query Support

Handle complex boolean queries:

\`\`\`python
def boolean_hybrid_search(self, query: str, top_k: int = 10) -> List[Dict]:
    """Support boolean operators in hybrid search"""

    # Parse boolean operators
    if ' AND ' in query.upper():
        terms = [term.strip() for term in re.split(r'\s+AND\s+', query, flags=re.IGNORECASE)]
        return self._and_search(terms, top_k)
    elif ' OR ' in query.upper():
        terms = [term.strip() for term in re.split(r'\s+OR\s+', query, flags=re.IGNORECASE)]
        return self._or_search(terms, top_k)
    else:
        return self.hybrid_search(query, top_k)

def _and_search(self, terms: List[str], top_k: int) -> List[Dict]:
    """All terms must be present (intersection)"""
    all_results = []

    for term in terms:
        results = self.hybrid_search(term, top_k * 2)
        all_results.append(set(r['id'] for r in results))

    # Find intersection of all result sets
    common_ids = set.intersection(*all_results)

    if not common_ids:
        return []

    # Re-score common documents with combined query
    combined_query = ' '.join(terms)
    return self.hybrid_search(combined_query, top_k)
\`\`\`

## Performance Monitoring and Tuning

### Search Analytics

Track search performance and adjust accordingly:

\`\`\`python
class AnalyticsHybridSearch(HybridSearchEngine):
    def __init__(self, connection_string: str, openai_api_key: str):
        super().__init__(connection_string, openai_api_key)
        self.search_analytics = []

    def hybrid_search_with_analytics(self, query: str, **kwargs):
        """Hybrid search with performance tracking"""
        import time

        start_time = time.time()
        results = self.hybrid_search(query, **kwargs)
        search_time = time.time() - start_time

        # Log analytics
        analytics = {
            'query': query,
            'search_time': search_time,
            'result_count': len(results),
            'avg_vector_score': sum(r['vector_similarity_pct'] for r in results) / len(results) if results else 0,
            'avg_text_score': sum(r['text_relevance_pct'] for r in results) / len(results) if results else 0,
            'timestamp': time.time()
        }

        self.search_analytics.append(analytics)

        return results

    def optimize_weights(self, feedback_data: List[Dict]):
        """Use click-through data to optimize search weights"""
        # Implement weight optimization based on user feedback
        # This would use machine learning to find optimal weights
        pass
\`\`\`

## Complete Example Usage

\`\`\`python
# Initialize hybrid search engine
search_engine = HybridSearchEngine(
    connection_string="mysql://user:pass@tidb-host:4000/hybrid_db",
    openai_api_key="your-openai-key"
)

# Example searches demonstrating hybrid capabilities

# 1. Conceptual search (vector-heavy)
results = search_engine.adaptive_hybrid_search("machine learning concepts")
print("Conceptual search results:")
for r in results[:3]:
    print(f"- {r['title']}: Vector={r['vector_similarity_pct']:.1f}%, Text={r['text_relevance_pct']:.1f}%")

# 2. Exact term search (text-heavy)
results = search_engine.adaptive_hybrid_search('"neural network architecture"')
print("\\nExact term search results:")
for r in results[:3]:
    print(f"- {r['title']}: Vector={r['vector_similarity_pct']:.1f}%, Text={r['text_relevance_pct']:.1f}%")

# 3. Balanced hybrid search
results = search_engine.hybrid_search(
    "deep learning tutorial for beginners",
    vector_weight=0.6,
    text_weight=0.4
)
print("\\nBalanced hybrid search results:")
for r in results[:3]:
    print(f"- {r['title']}: Hybrid={r['hybrid_score_pct']:.1f}%")
\`\`\`

## Conclusion

Hybrid search represents the best of both worlds, combining the semantic understanding of vector search with the precision of traditional text search. Key benefits include:

- **Improved Recall**: Find both semantically similar and exact matches
- **Better Precision**: Rank results using multiple relevance signals
- **Flexibility**: Adjust weights based on query type and user needs
- **Performance**: Optimize search strategy based on analytics

TiDB's native support for both vector operations and full-text search makes it an ideal platform for implementing sophisticated hybrid search systems that deliver superior user experiences.
    `
  },
  '4': {
    id: 4,
    title: 'Advanced Filtering with Auto-Embedding Features',
    excerpt: 'Explore TiDB&apos;s auto-embedding capabilities and advanced filtering techniques to build sophisticated AI-powered search systems.',
    category: 'AI & Machine Learning',
    author: 'Maria Rodriguez',
    date: '2024-03-08',
    readTime: '9 min read',
    image: '⚙️',
    content: `
# Advanced Filtering with Auto-Embedding Features

Modern AI applications require sophisticated filtering capabilities that go beyond simple WHERE clauses. TiDB's auto-embedding features combined with advanced filtering techniques enable you to build intelligent search systems that understand both structured data and semantic meaning.

## Understanding Auto-Embedding

Auto-embedding automatically generates vector representations for your data without manual preprocessing. This feature:

- **Automatically vectorizes** text content on insertion
- **Maintains consistency** across different embedding models
- **Reduces complexity** by eliminating manual embedding generation
- **Enables real-time** vector search without preprocessing delays

## Setting Up Auto-Embedding

Configure TiDB to automatically generate embeddings for your content:

\`\`\`sql
-- Create table with auto-embedding configuration
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    description TEXT,
    category VARCHAR(100),
    price DECIMAL(10,2),
    brand VARCHAR(100),
    tags JSON,
    rating DECIMAL(3,2),
    stock_count INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Auto-generated embedding column
    description_embedding VECTOR(1536) AS (
        VEC_FROM_TEXT(description, 'text-embedding-3-small')
    ) STORED,

    -- Indexes for fast filtering and search
    VECTOR INDEX idx_description_embedding (description_embedding),
    INDEX idx_category_price (category, price),
    INDEX idx_brand_rating (brand, rating),
    INDEX idx_stock (stock_count)
);
\`\`\`

## Advanced Filtering Implementation

Here's a comprehensive filtering system that combines semantic and structured filters:

\`\`\`python
import mysql.connector
from typing import Dict, List, Optional, Any
from dataclasses import dataclass
from enum import Enum

class FilterOperator(Enum):
    EQUALS = "="
    NOT_EQUALS = "!="
    GREATER_THAN = ">"
    LESS_THAN = "<"
    GREATER_EQUAL = ">="
    LESS_EQUAL = "<="
    IN = "IN"
    NOT_IN = "NOT IN"
    LIKE = "LIKE"
    BETWEEN = "BETWEEN"

@dataclass
class Filter:
    field: str
    operator: FilterOperator
    value: Any
    logical_operator: str = "AND"  # AND, OR

@dataclass
class SemanticFilter:
    query: str
    threshold: float = 0.8
    weight: float = 1.0

class AdvancedFilterEngine:
    def __init__(self, connection_string: str):
        self.db = mysql.connector.connect(connection_string)

    def build_where_clause(self, filters: List[Filter]) -> tuple:
        """Build WHERE clause from filter objects"""
        if not filters:
            return "", []

        conditions = []
        params = []

        for i, filter_obj in enumerate(filters):
            if i > 0:
                conditions.append(filter_obj.logical_operator)

            condition, param = self._build_single_condition(filter_obj)
            conditions.append(condition)
            if param is not None:
                if isinstance(param, list):
                    params.extend(param)
                else:
                    params.append(param)

        return " ".join(conditions), params

    def _build_single_condition(self, filter_obj: Filter) -> tuple:
        """Build a single filter condition"""
        field = filter_obj.field
        op = filter_obj.operator
        value = filter_obj.value

        if op == FilterOperator.EQUALS:
            return f"{field} = %s", value
        elif op == FilterOperator.NOT_EQUALS:
            return f"{field} != %s", value
        elif op == FilterOperator.GREATER_THAN:
            return f"{field} > %s", value
        elif op == FilterOperator.LESS_THAN:
            return f"{field} < %s", value
        elif op == FilterOperator.GREATER_EQUAL:
            return f"{field} >= %s", value
        elif op == FilterOperator.LESS_EQUAL:
            return f"{field} <= %s", value
        elif op == FilterOperator.IN:
            placeholders = ",".join(["%s"] * len(value))
            return f"{field} IN ({placeholders})", value
        elif op == FilterOperator.NOT_IN:
            placeholders = ",".join(["%s"] * len(value))
            return f"{field} NOT IN ({placeholders})", value
        elif op == FilterOperator.LIKE:
            return f"{field} LIKE %s", f"%{value}%"
        elif op == FilterOperator.BETWEEN:
            return f"{field} BETWEEN %s AND %s", [value[0], value[1]]

        raise ValueError(f"Unsupported operator: {op}")
\`\`\`

## Semantic Filtering with Auto-Embeddings

Combine semantic search with structured filters:

\`\`\`python
def semantic_filter_search(
    self,
    semantic_filter: SemanticFilter,
    structured_filters: List[Filter] = None,
    sort_by: str = "relevance",
    limit: int = 20
) -> List[Dict]:
    """
    Advanced search combining semantic and structured filtering
    """

    # Build structured filter conditions
    where_clause, where_params = self.build_where_clause(structured_filters or [])

    # Prepare the semantic search component
    base_query = """
        SELECT
            id, name, description, category, price, brand, rating, stock_count,
            VEC_COSINE_DISTANCE(
                description_embedding,
                VEC_FROM_TEXT(%s, 'text-embedding-3-small')
            ) as semantic_distance,
            (1 - VEC_COSINE_DISTANCE(
                description_embedding,
                VEC_FROM_TEXT(%s, 'text-embedding-3-small')
            )) * 100 as relevance_score
        FROM products
    """

    # Add structured filters
    if where_clause:
        base_query += f" WHERE {where_clause}"
        base_query += f" AND VEC_COSINE_DISTANCE(description_embedding, VEC_FROM_TEXT(%s, 'text-embedding-3-small')) < %s"
    else:
        base_query += f" WHERE VEC_COSINE_DISTANCE(description_embedding, VEC_FROM_TEXT(%s, 'text-embedding-3-small')) < %s"

    # Add sorting
    if sort_by == "relevance":
        base_query += " ORDER BY semantic_distance ASC"
    elif sort_by == "price_asc":
        base_query += " ORDER BY price ASC, semantic_distance ASC"
    elif sort_by == "price_desc":
        base_query += " ORDER BY price DESC, semantic_distance ASC"
    elif sort_by == "rating":
        base_query += " ORDER BY rating DESC, semantic_distance ASC"

    base_query += f" LIMIT %s"

    # Prepare parameters
    params = []
    params.extend(where_params)  # Structured filter params
    params.extend([
        semantic_filter.query,  # For semantic distance calculation
        semantic_filter.query,  # For relevance score calculation
        semantic_filter.query,  # For WHERE clause semantic filter
        semantic_filter.threshold,  # Semantic threshold
        limit
    ])

    cursor = self.db.cursor(dictionary=True)
    cursor.execute(base_query, params)

    return cursor.fetchall()
\`\`\`

## Advanced Filtering Patterns

### Multi-Criteria Filtering

Implement complex filtering logic:

\`\`\`python
def multi_criteria_search(
    self,
    criteria: Dict[str, Any],
    semantic_query: str = None
) -> List[Dict]:
    """
    Multi-criteria search with intelligent filter combination
    """

    filters = []

    # Price range filtering
    if 'price_range' in criteria:
        min_price, max_price = criteria['price_range']
        filters.append(Filter('price', FilterOperator.BETWEEN, [min_price, max_price]))

    # Category filtering with OR logic
    if 'categories' in criteria:
        filters.append(Filter('category', FilterOperator.IN, criteria['categories']))

    # Brand filtering
    if 'brands' in criteria:
        if len(criteria['brands']) == 1:
            filters.append(Filter('brand', FilterOperator.EQUALS, criteria['brands'][0]))
        else:
            filters.append(Filter('brand', FilterOperator.IN, criteria['brands']))

    # Rating filtering
    if 'min_rating' in criteria:
        filters.append(Filter('rating', FilterOperator.GREATER_EQUAL, criteria['min_rating']))

    # Stock availability
    if criteria.get('in_stock_only', False):
        filters.append(Filter('stock_count', FilterOperator.GREATER_THAN, 0))

    # Exclusion filters
    if 'exclude_brands' in criteria:
        filters.append(Filter('brand', FilterOperator.NOT_IN, criteria['exclude_brands']))

    # Semantic search
    if semantic_query:
        semantic_filter = SemanticFilter(
            query=semantic_query,
            threshold=criteria.get('semantic_threshold', 0.7)
        )
        return self.semantic_filter_search(semantic_filter, filters)
    else:
        # Pure structured filtering
        where_clause, params = self.build_where_clause(filters)
        query = f"SELECT * FROM products WHERE {where_clause}" if where_clause else "SELECT * FROM products"

        cursor = self.db.cursor(dictionary=True)
        cursor.execute(query, params)
        return cursor.fetchall()
\`\`\`

### Dynamic Filter Adjustment

Implement smart filter adjustment based on result count:

\`\`\`python
def adaptive_filtering(
    self,
    initial_criteria: Dict[str, Any],
    semantic_query: str,
    target_results: int = 20,
    max_iterations: int = 3
) -> List[Dict]:
    """
    Adaptively adjust filters to achieve target result count
    """

    criteria = initial_criteria.copy()

    for iteration in range(max_iterations):
        results = self.multi_criteria_search(criteria, semantic_query)

        if len(results) >= target_results:
            return results[:target_results]

        # Too few results - relax constraints
        if 'semantic_threshold' in criteria:
            criteria['semantic_threshold'] = max(0.5, criteria['semantic_threshold'] - 0.1)

        if 'min_rating' in criteria and criteria['min_rating'] > 3.0:
            criteria['min_rating'] -= 0.5

        if 'price_range' in criteria:
            min_price, max_price = criteria['price_range']
            price_expansion = (max_price - min_price) * 0.2
            criteria['price_range'] = [
                max(0, min_price - price_expansion),
                max_price + price_expansion
            ]

    # Final attempt with minimal constraints
    minimal_criteria = {
        'categories': criteria.get('categories'),
        'semantic_threshold': 0.5
    }

    return self.multi_criteria_search(minimal_criteria, semantic_query)[:target_results]
\`\`\`

## Performance Optimization

### Query Optimization

Optimize complex filtered queries:

\`\`\`python
def optimized_filtered_search(
    self,
    semantic_query: str,
    filters: List[Filter],
    limit: int = 20
) -> List[Dict]:
    """
    Optimized search using query execution planning
    """

    # Analyze filter selectivity to optimize query plan
    selective_filters = []
    general_filters = []

    for filter_obj in filters:
        if self._is_selective_filter(filter_obj):
            selective_filters.append(filter_obj)
        else:
            general_filters.append(filter_obj)

    # Build query with selective filters first
    where_clause, params = self.build_where_clause(selective_filters)

    # Use covering index hint for better performance
    query = f"""
        SELECT /*+ USE_INDEX(products, idx_category_price, idx_brand_rating) */
            id, name, description, category, price, brand, rating, stock_count,
            VEC_COSINE_DISTANCE(
                description_embedding,
                VEC_FROM_TEXT(%s, 'text-embedding-3-small')
            ) as semantic_distance
        FROM products
        WHERE {where_clause}
        ORDER BY semantic_distance ASC
        LIMIT %s
    """

    params.extend([semantic_query, limit * 2])  # Get more candidates

    cursor = self.db.cursor(dictionary=True)
    cursor.execute(query, params)
    candidates = cursor.fetchall()

    # Apply remaining filters in application layer if needed
    if general_filters:
        filtered_candidates = []
        for candidate in candidates:
            if self._matches_filters(candidate, general_filters):
                filtered_candidates.append(candidate)
                if len(filtered_candidates) >= limit:
                    break
        return filtered_candidates

    return candidates[:limit]

def _is_selective_filter(self, filter_obj: Filter) -> bool:
    """Determine if a filter is highly selective"""
    # Category and brand filters are usually selective
    return filter_obj.field in ['category', 'brand', 'stock_count']

def _matches_filters(self, record: Dict, filters: List[Filter]) -> bool:
    """Check if a record matches the given filters"""
    for filter_obj in filters:
        if not self._evaluate_filter(record, filter_obj):
            return False
    return True
\`\`\`

## Real-World Example

Complete e-commerce search implementation:

\`\`\`python
# Initialize the advanced filter engine
filter_engine = AdvancedFilterEngine(
    connection_string="mysql://user:pass@tidb-host:4000/ecommerce_db"
)

# Example 1: Smart phone search with multiple criteria
smartphone_criteria = {
    'categories': ['Electronics', 'Mobile Phones'],
    'price_range': [200, 800],
    'brands': ['Apple', 'Samsung', 'Google'],
    'min_rating': 4.0,
    'in_stock_only': True
}

results = filter_engine.multi_criteria_search(
    criteria=smartphone_criteria,
    semantic_query="high quality camera phone with good battery life"
)

print("Smartphone search results:")
for product in results[:5]:
    price = f"{product['price']:.2f}"
    relevance = f"{product['relevance_score']:.1f}"
    print(f"- {product['name']}: \${price}, Rating: {product['rating']}")
    print(f"  Relevance: {relevance}%")

# Example 2: Adaptive search for laptop accessories
laptop_criteria = {
    'categories': ['Electronics', 'Computer Accessories'],
    'price_range': [20, 200],
    'min_rating': 3.5
}

adaptive_results = filter_engine.adaptive_filtering(
    initial_criteria=laptop_criteria,
    semantic_query="wireless mouse for gaming laptop",
    target_results=15
)

print("\\nAdaptive laptop accessory search:")
for product in adaptive_results[:5]:
    price = f"{product['price']:.2f}"
    print(f"- {product['name']}: \${price}")

# Example 3: Complex filtering with custom logic
custom_filters = [
    Filter('category', FilterOperator.EQUALS, 'Books'),
    Filter('price', FilterOperator.LESS_THAN, 50),
    Filter('rating', FilterOperator.GREATER_EQUAL, 4.2),
    Filter('stock_count', FilterOperator.GREATER_THAN, 5)
]

book_results = filter_engine.semantic_filter_search(
    semantic_filter=SemanticFilter("python programming for beginners", threshold=0.75),
    structured_filters=custom_filters,
    sort_by="rating"
)

print("\\nPython programming books:")
for book in book_results[:3]:
    price = f"{book['price']:.2f}"
    relevance = f"{book['relevance_score']:.1f}"
    print(f"- {book['name']}: \${price}, {book['rating']}⭐")
    print(f"  Semantic relevance: {relevance}%")
\`\`\`

## Conclusion

Advanced filtering with auto-embedding features provides powerful capabilities for building intelligent search systems:

**Key Benefits:**
- **Automated vectorization** eliminates manual preprocessing
- **Complex filtering** supports sophisticated business logic
- **Performance optimization** ensures fast response times
- **Adaptive behavior** adjusts to provide relevant results

**Best Practices:**
- Use selective filters early in query execution
- Combine semantic and structured filtering strategically
- Implement adaptive filtering for better user experience
- Monitor and optimize query performance regularly

TiDB's auto-embedding features combined with advanced filtering capabilities enable you to build search systems that understand both the semantic meaning of content and complex business requirements, delivering superior search experiences for your users.
    `
  },
  '5': {
    id: 5,
    title: 'Auto Embedding: Simplifying Vector Generation',
    excerpt: 'Learn how TiDB&apos;s auto-embedding feature automatically generates vector embeddings for your data, eliminating manual preprocessing steps.',
    category: 'AI & Machine Learning',
    author: 'Lisa Zhang',
    date: '2024-03-05',
    readTime: '7 min read',
    image: '🤖',
    content: `
# Auto Embedding: Simplifying Vector Generation

Manual embedding generation has been one of the biggest barriers to implementing vector search in production applications. TiDB's auto-embedding feature eliminates this complexity by automatically generating and maintaining vector embeddings for your data, making AI-powered search accessible to every developer.

## The Challenge with Manual Embeddings

Traditional vector search implementations require:

- **Complex preprocessing pipelines** to generate embeddings
- **Batch processing** for large datasets
- **Synchronization** between data updates and embedding updates
- **Multiple API calls** to embedding services
- **Error handling** for embedding generation failures

Auto-embedding solves all these challenges with a simple, declarative approach.

## How Auto-Embedding Works

TiDB's auto-embedding feature uses computed columns to automatically generate embeddings when data is inserted or updated:

\`\`\`sql
-- Auto-embedding with computed columns
CREATE TABLE articles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(500),
    content TEXT,
    category VARCHAR(100),
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Auto-generated embeddings using computed columns
    title_embedding VECTOR(1536) AS (
        VEC_FROM_TEXT(title, 'text-embedding-3-small')
    ) STORED,

    content_embedding VECTOR(1536) AS (
        VEC_FROM_TEXT(content, 'text-embedding-3-small')
    ) STORED,

    -- Combined embedding for title + content
    combined_embedding VECTOR(1536) AS (
        VEC_FROM_TEXT(CONCAT(title, ' ', content), 'text-embedding-3-small')
    ) STORED,

    -- Vector indexes for fast similarity search
    VECTOR INDEX idx_title_embedding (title_embedding),
    VECTOR INDEX idx_content_embedding (content_embedding),
    VECTOR INDEX idx_combined_embedding (combined_embedding)
);
\`\`\`

## Basic Auto-Embedding Usage

Simple data insertion automatically generates embeddings:

\`\`\`python
import mysql.connector
from typing import List, Dict

class AutoEmbeddingEngine:
    def __init__(self, connection_string: str):
        self.db = mysql.connector.connect(connection_string)

    def insert_article(self, title: str, content: str, category: str) -> int:
        """
        Insert article with automatic embedding generation
        No manual embedding creation needed!
        """
        cursor = self.db.cursor()
        cursor.execute("""
            INSERT INTO articles (title, content, category)
            VALUES (%s, %s, %s)
        """, (title, content, category))

        self.db.commit()
        return cursor.lastrowid

    def batch_insert_articles(self, articles: List[Dict]) -> List[int]:
        """
        Batch insert with automatic embeddings
        TiDB handles all embedding generation automatically
        """
        cursor = self.db.cursor()

        article_data = [
            (article['title'], article['content'], article['category'])
            for article in articles
        ]

        cursor.executemany("""
            INSERT INTO articles (title, content, category)
            VALUES (%s, %s, %s)
        """, article_data)

        self.db.commit()

        # Return the IDs of inserted articles
        first_id = cursor.lastrowid
        return list(range(first_id, first_id + len(articles)))
\`\`\`

## Semantic Search with Auto-Embeddings

Search becomes incredibly simple:

\`\`\`python
def search_by_title(self, query: str, limit: int = 10) -> List[Dict]:
    """Search articles by title similarity"""
    cursor = self.db.cursor(dictionary=True)

    # TiDB automatically generates query embedding and compares
    cursor.execute("""
        SELECT
            id, title, content, category,
            VEC_COSINE_DISTANCE(
                title_embedding,
                VEC_FROM_TEXT(%s, 'text-embedding-3-small')
            ) as title_similarity
        FROM articles
        ORDER BY title_similarity ASC
        LIMIT %s
    """, (query, limit))

    return cursor.fetchall()

def search_by_content(self, query: str, limit: int = 10) -> List[Dict]:
    """Search articles by content similarity"""
    cursor = self.db.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            id, title, content, category,
            VEC_COSINE_DISTANCE(
                content_embedding,
                VEC_FROM_TEXT(%s, 'text-embedding-3-small')
            ) as content_similarity
        FROM articles
        ORDER BY content_similarity ASC
        LIMIT %s
    """, (query, limit))

    return cursor.fetchall()

def hybrid_search(self, query: str, limit: int = 10) -> List[Dict]:
    """Search using combined title + content embeddings"""
    cursor = self.db.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            id, title, content, category,
            VEC_COSINE_DISTANCE(
                combined_embedding,
                VEC_FROM_TEXT(%s, 'text-embedding-3-small')
            ) as overall_similarity,
            (1 - VEC_COSINE_DISTANCE(
                combined_embedding,
                VEC_FROM_TEXT(%s, 'text-embedding-3-small')
            )) * 100 as relevance_score
        FROM articles
        ORDER BY overall_similarity ASC
        LIMIT %s
    """, (query, query, limit))

    return cursor.fetchall()
\`\`\`

## Advanced Auto-Embedding Patterns

### Multi-Language Support

Handle multiple languages automatically:

\`\`\`sql
CREATE TABLE multilingual_content (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title_en TEXT,
    title_es TEXT,
    title_fr TEXT,
    content_en TEXT,
    content_es TEXT,
    content_fr TEXT,

    -- Auto-embeddings for each language
    embedding_en VECTOR(1536) AS (
        VEC_FROM_TEXT(CONCAT(COALESCE(title_en, ''), ' ', COALESCE(content_en, '')), 'text-embedding-3-small')
    ) STORED,

    embedding_es VECTOR(1536) AS (
        VEC_FROM_TEXT(CONCAT(COALESCE(title_es, ''), ' ', COALESCE(content_es, '')), 'text-embedding-3-small')
    ) STORED,

    embedding_fr VECTOR(1536) AS (
        VEC_FROM_TEXT(CONCAT(COALESCE(title_fr, ''), ' ', COALESCE(content_fr, '')), 'text-embedding-3-small')
    ) STORED,

    VECTOR INDEX idx_embedding_en (embedding_en),
    VECTOR INDEX idx_embedding_es (embedding_es),
    VECTOR INDEX idx_embedding_fr (embedding_fr)
);
\`\`\`

### Conditional Embedding Generation

Generate embeddings only when certain conditions are met:

\`\`\`sql
CREATE TABLE smart_articles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(500),
    content TEXT,
    status ENUM('draft', 'published', 'archived'),
    content_length INT AS (CHAR_LENGTH(content)) STORED,

    -- Only generate embeddings for published articles with sufficient content
    searchable_embedding VECTOR(1536) AS (
        CASE
            WHEN status = 'published' AND CHAR_LENGTH(content) > 100
            THEN VEC_FROM_TEXT(CONCAT(title, ' ', content), 'text-embedding-3-small')
            ELSE NULL
        END
    ) STORED,

    VECTOR INDEX idx_searchable_embedding (searchable_embedding)
);
\`\`\`

### Dynamic Embedding Models

Use different embedding models based on content type:

\`\`\`python
def create_adaptive_embedding_table(self):
    """Create table with adaptive embedding generation"""
    cursor = self.db.cursor()
    cursor.execute("""
        CREATE TABLE adaptive_content (
            id INT PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(500),
            content TEXT,
            content_type ENUM('article', 'product', 'review', 'documentation'),

            -- Different embedding strategies based on content type
            embedding VECTOR(1536) AS (
                CASE content_type
                    WHEN 'product' THEN VEC_FROM_TEXT(
                        CONCAT('Product: ', title, ' Description: ', content),
                        'text-embedding-3-small'
                    )
                    WHEN 'review' THEN VEC_FROM_TEXT(
                        CONCAT('Review: ', content),
                        'text-embedding-3-small'
                    )
                    ELSE VEC_FROM_TEXT(
                        CONCAT(title, ' ', content),
                        'text-embedding-3-small'
                    )
                END
            ) STORED,

            VECTOR INDEX idx_embedding (embedding)
        )
    """)
    self.db.commit()
\`\`\`

## Performance Optimization

### Batch Operations

Optimize bulk operations with auto-embedding:

\`\`\`python
def optimized_batch_insert(self, articles: List[Dict], batch_size: int = 1000):
    """
    Optimized batch insertion with auto-embedding
    Process large datasets efficiently
    """
    cursor = self.db.cursor()

    for i in range(0, len(articles), batch_size):
        batch = articles[i:i + batch_size]

        # Prepare batch data
        batch_data = [
            (article['title'], article['content'], article['category'])
            for article in batch
        ]

        # Use INSERT IGNORE to handle potential duplicates
        cursor.executemany("""
            INSERT IGNORE INTO articles (title, content, category)
            VALUES (%s, %s, %s)
        """, batch_data)

        self.db.commit()

        print(f"Processed batch {i//batch_size + 1}, inserted {len(batch)} articles")

def update_with_auto_embedding(self, article_id: int, new_content: str):
    """
    Update content - embedding is automatically regenerated
    """
    cursor = self.db.cursor()
    cursor.execute("""
        UPDATE articles
        SET content = %s
        WHERE id = %s
    """, (new_content, article_id))

    self.db.commit()

    # Embedding is automatically updated due to computed column
    print(f"Article {article_id} updated with new embedding")
\`\`\`

### Monitoring Auto-Embedding Performance

Track embedding generation performance:

\`\`\`python
def monitor_embedding_performance(self):
    """Monitor auto-embedding performance metrics"""
    cursor = self.db.cursor(dictionary=True)

    # Check embedding generation statistics
    cursor.execute("""
        SELECT
            COUNT(*) as total_articles,
            COUNT(title_embedding) as articles_with_title_embeddings,
            COUNT(content_embedding) as articles_with_content_embeddings,
            COUNT(combined_embedding) as articles_with_combined_embeddings,
            AVG(CHAR_LENGTH(content)) as avg_content_length
        FROM articles
    """)

    stats = cursor.fetchone()

    print("Auto-Embedding Statistics:")
    print(f"Total articles: {stats['total_articles']}")
    print(f"Title embeddings: {stats['articles_with_title_embeddings']}")
    print(f"Content embeddings: {stats['articles_with_content_embeddings']}")
    print(f"Combined embeddings: {stats['articles_with_combined_embeddings']}")
    print(f"Average content length: {stats['avg_content_length']:.0f} characters")

    # Check for any embedding generation issues
    cursor.execute("""
        SELECT id, title, CHAR_LENGTH(content) as content_length
        FROM articles
        WHERE content IS NOT NULL
        AND content != ''
        AND combined_embedding IS NULL
        LIMIT 10
    """)

    issues = cursor.fetchall()
    if issues:
        print("\\nArticles with missing embeddings:")
        for issue in issues:
            print(f"- Article {issue['id']}: {issue['title'][:50]}... ({issue['content_length']} chars)")
\`\`\`

## Complete Auto-Embedding Example

Here's a full implementation of a knowledge base with auto-embedding:

\`\`\`python
# Initialize auto-embedding engine
embedding_engine = AutoEmbeddingEngine(
    connection_string="mysql://user:pass@tidb-host:4000/knowledge_db"
)

# Add articles with automatic embedding generation
articles = [
    {
        'title': 'Introduction to Machine Learning',
        'content': 'Machine learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed...',
        'category': 'Education'
    },
    {
        'title': 'Building REST APIs with Python',
        'content': 'REST APIs are a fundamental part of modern web development. Learn how to build scalable APIs using Python and FastAPI...',
        'category': 'Programming'
    },
    {
        'title': 'Database Optimization Techniques',
        'content': 'Optimizing database performance is crucial for application scalability. This guide covers indexing, query optimization, and caching strategies...',
        'category': 'Database'
    }
]

# Insert articles - embeddings generated automatically
article_ids = embedding_engine.batch_insert_articles(articles)
print(f"Inserted {len(article_ids)} articles with auto-generated embeddings")

# Search using auto-embeddings
search_results = embedding_engine.hybrid_search("API development tutorial")
print("\\nSearch results for 'API development tutorial':")
for result in search_results:
    print(f"- {result['title']}")
    print(f"  Relevance: {result['relevance_score']:.1f}%")
    print(f"  Category: {result['category']}")

# Update an article - embedding automatically updated
embedding_engine.update_with_auto_embedding(
    article_ids[0],
    "Machine learning is revolutionizing industries worldwide. From recommendation systems to autonomous vehicles, ML algorithms are transforming how we interact with technology..."
)

# Search again to see updated results
updated_results = embedding_engine.hybrid_search("AI technology revolution")
print("\\nUpdated search results:")
for result in updated_results[:3]:
    print(f"- {result['title']}: {result['relevance_score']:.1f}%")

# Monitor performance
embedding_engine.monitor_embedding_performance()
\`\`\`

## Best Practices

### 1. Design for Auto-Embedding

- **Use appropriate column types**: TEXT for content, VARCHAR for titles
- **Include relevant computed columns**: Create embeddings for searchable fields
- **Plan your indexes**: Vector indexes on embedding columns for performance

### 2. Handle Edge Cases

- **Null content**: Use COALESCE in computed column definitions
- **Empty strings**: Add conditions to avoid generating embeddings for empty content
- **Large content**: Consider truncating very long content before embedding

### 3. Monitor and Optimize

- **Track embedding generation**: Monitor for failed or missing embeddings
- **Performance tuning**: Use appropriate batch sizes for bulk operations
- **Storage management**: Auto-embeddings use storage - plan accordingly

## Conclusion

TiDB's auto-embedding feature dramatically simplifies vector search implementation by:

- **Eliminating manual preprocessing**: No need for complex embedding pipelines
- **Ensuring consistency**: Embeddings are always in sync with data
- **Reducing complexity**: Simple SQL operations handle everything
- **Improving maintainability**: No separate embedding management code

Auto-embedding makes advanced AI search capabilities accessible to every developer, enabling you to focus on building great user experiences rather than managing embedding infrastructure.
    `
  }
}

export default function BlogDetail({ params }: { params: { id: string } }) {
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (!mounted) return null

  const post = blogPosts[params.id as keyof typeof blogPosts]

  if (!post) {
    return (
      <main className="min-h-screen bg-white dark:bg-black">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Blog Post Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              The blog post you&apos;re looking for doesn&apos;t exist.
            </p>
            <button
              onClick={() => router.push('/blogs')}
              className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Back to Blog
            </button>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        {/* Back Button */}
        <button
          onClick={() => router.push('/blogs')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to Blog
        </button>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-4xl">{post.image}</span>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400 pb-8 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg prose-gray dark:prose-invert max-w-none">
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{
              __html: post.content
                .replace(/\`\`\`(\w+)?\n([\s\S]*?)\`\`\`/g, (match, lang, code) => {
                  const language = lang || 'text'
                  return `
                    <div class="code-block-wrapper bg-gray-900 dark:bg-gray-950 rounded-lg overflow-hidden my-6">
                      <div class="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
                        <span class="text-gray-300 text-sm font-mono">${language}</span>
                        <button
                          onclick="navigator.clipboard.writeText(\`${code.replace(/`/g, '\\`')}\`)"
                          class="flex items-center gap-1 px-2 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-xs transition-colors"
                        >
                          Copy
                        </button>
                      </div>
                      <pre class="p-4 overflow-x-auto"><code class="text-gray-100 text-sm leading-relaxed">${code}</code></pre>
                    </div>
                  `
                })
                .replace(/\`([^`]+)\`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm">$1</code>')
                .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">$1</h1>')
                .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">$2</h2>')
                .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">$3</h3>')
                .replace(/^\*\*(.+)\*\*$/gm, '<p class="font-bold text-gray-900 dark:text-white mt-6 mb-2">$1</p>')
                .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                .replace(/\*([^*]+)\*/g, '<em>$1</em>')
                .replace(/^- (.+)$/gm, '<li class="mb-2">$1</li>')
                .replace(/(<li.*<\/li>)/s, '<ul class="list-disc pl-6 mb-4 space-y-2">$1</ul>')
                .replace(/^(\d+)\. (.+)$/gm, '<li class="mb-2">$2</li>')
                .replace(/^([^<#*-].+)$/gm, '<p class="mb-4 leading-relaxed">$1</p>')
            }}
          />
        </article>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to implement this in your project?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Start building with TiDB&apos;s AI-native capabilities today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://tidbcloud.com/"
                className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium"
              >
                Try TiDB Cloud
              </a>
              <a
                href="https://pingcap.github.io/ai/"
                className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors font-medium"
              >
                View Documentation
              </a>
            </div>
          </div>
        </footer>
      </div>
      <Footer />
    </main>
  )
}