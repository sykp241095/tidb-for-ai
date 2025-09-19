---
title: "Getting Started with Vector Search in TiDB"
description: "Learn how to implement semantic search and RAG applications using TiDB's vector database capabilities"
date: "2024-01-15"
author: "TiDB Team"
tags: ["vector-search", "AI", "RAG", "tutorial"]
category: "Tutorial"
featured: true
readingTime: 8
image: "/blog/vector-search-hero.jpg"
---

# Getting Started with Vector Search in TiDB

Vector search is revolutionizing how we build intelligent applications. With TiDB's native vector database capabilities, you can now implement semantic search, recommendation systems, and RAG (Retrieval-Augmented Generation) applications with ease.

## What is Vector Search?

Vector search, also known as semantic search, allows you to find similar content based on meaning rather than exact keyword matches. Instead of searching for exact text matches, vector search uses **machine learning embeddings** to understand the semantic similarity between pieces of content.

### Key Benefits:

- **Semantic Understanding**: Find relevant content even when exact keywords don't match
- **Multi-modal Search**: Search across text, images, and other data types
- **Personalization**: Build recommendation systems based on user preferences
- **AI Integration**: Power RAG applications and chatbots

## Setting Up Vector Search

### 1. Install the Python Client

```python
pip install tidb-vector sqlalchemy pymysql
```

### 2. Create a Vector Table

```sql
CREATE TABLE documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(500),
    content TEXT,
    embedding VECTOR(1536) COMMENT 'hnsw(distance=cosine)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Generate Embeddings

```python
from openai import OpenAI
import tidb_vector as tv

# Initialize clients
openai_client = OpenAI(api_key="your-api-key")
tidb_client = tv.connect("mysql://user:pass@host:4000/db")

def generate_embedding(text):
    response = openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding

# Insert document with embedding
title = "TiDB Vector Search Guide"
content = "Learn how to use vector search in TiDB..."
embedding = generate_embedding(f"{title} {content}")

tidb_client.execute("""
    INSERT INTO documents (title, content, embedding)
    VALUES (%s, %s, %s)
""", (title, content, embedding))
```

## Performing Vector Search

### Basic Similarity Search

```python
def search_documents(query, limit=5):
    query_embedding = generate_embedding(query)

    results = tidb_client.execute("""
        SELECT title, content,
               VEC_COSINE_DISTANCE(embedding, %s) as similarity
        FROM documents
        ORDER BY similarity ASC
        LIMIT %s
    """, (query_embedding, limit))

    return results
```

### Hybrid Search (Vector + Full-text)

For even better results, combine vector search with traditional full-text search:

```python
def hybrid_search(query, limit=10):
    query_embedding = generate_embedding(query)

    results = tidb_client.execute("""
        SELECT title, content,
               (1 - VEC_COSINE_DISTANCE(embedding, %s)) * 0.7 +
               MATCH(title, content) AGAINST (%s) * 0.3 as score
        FROM documents
        WHERE VEC_COSINE_DISTANCE(embedding, %s) < 0.8
           OR MATCH(title, content) AGAINST (%s)
        ORDER BY score DESC
        LIMIT %s
    """, (query_embedding, query, query_embedding, query, limit))

    return results
```

## Building a RAG Application

Retrieval-Augmented Generation (RAG) combines vector search with large language models to create intelligent Q&A systems:

```python
def rag_query(question):
    # Step 1: Retrieve relevant documents
    relevant_docs = search_documents(question, limit=3)

    # Step 2: Create context from retrieved documents
    context = "\n\n".join([doc[1] for doc in relevant_docs])

    # Step 3: Generate answer using LLM
    response = openai_client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Answer questions based on the provided context."},
            {"role": "user", "content": f"Context: {context}\n\nQuestion: {question}"}
        ]
    )

    return response.choices[0].message.content
```

## Performance Optimization

### 1. Choose the Right Index

TiDB supports multiple vector index types:

```sql
-- HNSW Index (recommended for most use cases)
ALTER TABLE documents ADD VECTOR INDEX idx_embedding_hnsw (embedding) COMMENT 'hnsw(distance=cosine)';

-- IVF Index (good for large datasets)
ALTER TABLE documents ADD VECTOR INDEX idx_embedding_ivf (embedding) COMMENT 'ivf(distance=cosine)';
```

### 2. Batch Operations

Process multiple documents efficiently:

```python
def batch_insert_documents(documents):
    embeddings = []
    for doc in documents:
        embedding = generate_embedding(f"{doc['title']} {doc['content']}")
        embeddings.append((doc['title'], doc['content'], embedding))

    tidb_client.executemany("""
        INSERT INTO documents (title, content, embedding)
        VALUES (%s, %s, %s)
    """, embeddings)
```

### 3. Optimize Search Parameters

Fine-tune your search for better performance:

```python
def optimized_search(query, similarity_threshold=0.7, limit=10):
    query_embedding = generate_embedding(query)

    results = tidb_client.execute("""
        SELECT title, content, VEC_COSINE_DISTANCE(embedding, %s) as similarity
        FROM documents
        WHERE VEC_COSINE_DISTANCE(embedding, %s) < %s
        ORDER BY similarity ASC
        LIMIT %s
    """, (query_embedding, query_embedding, similarity_threshold, limit))

    return results
```

## Real-world Use Cases

### 1. Document Search

Build intelligent document repositories where users can find relevant information using natural language queries.

### 2. Product Recommendations

Create recommendation systems that understand product relationships and user preferences.

### 3. Customer Support

Implement AI-powered customer support that can find relevant help articles and previous solutions.

### 4. Content Discovery

Help users discover related content in media platforms, blogs, or knowledge bases.

## Best Practices

1. **Choose appropriate embedding models** based on your data type and use case
2. **Normalize your text** before generating embeddings for consistency
3. **Monitor performance** and adjust index parameters as your dataset grows
4. **Implement caching** for frequently accessed embeddings
5. **Use batch operations** for better throughput when processing large datasets

## Next Steps

- Explore [advanced vector operations](link-to-advanced-guide)
- Learn about [multi-modal search](link-to-multimodal-guide)
- Check out our [RAG application templates](link-to-templates)
- Join the [TiDB AI community](link-to-community)

Vector search with TiDB opens up endless possibilities for building intelligent applications. Start experimenting with the examples above and see how semantic search can transform your user experience!