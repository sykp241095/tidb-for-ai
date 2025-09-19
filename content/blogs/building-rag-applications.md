---
title: "Building Production-Ready RAG Applications with TiDB"
description: "A comprehensive guide to building scalable Retrieval-Augmented Generation applications using TiDB's vector database capabilities"
date: "2024-01-20"
author: "Sarah Chen"
tags: ["RAG", "LLM", "production", "architecture"]
category: "Architecture"
featured: false
readingTime: 12
image: "/blog/rag-architecture.jpg"
---

# Building Production-Ready RAG Applications with TiDB

Retrieval-Augmented Generation (RAG) has become the gold standard for building intelligent applications that can answer questions based on your own data. In this comprehensive guide, we'll walk through building a production-ready RAG application using TiDB's vector database capabilities.

## Understanding RAG Architecture

RAG applications combine the power of large language models with your proprietary data through a retrieval mechanism. The architecture typically consists of:

1. **Data Ingestion**: Processing and chunking documents
2. **Embedding Generation**: Converting text to vector representations
3. **Vector Storage**: Storing embeddings in a vector database
4. **Retrieval**: Finding relevant context for user queries
5. **Generation**: Using LLMs to generate answers based on retrieved context

## Setting Up Your RAG Infrastructure

### 1. Environment Setup

```bash
pip install tidb-vector openai langchain tiktoken
```

### 2. Database Schema Design

```sql
-- Documents table for storing original content
CREATE TABLE documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(500),
    content TEXT,
    source VARCHAR(255),
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chunks table for storing processed text chunks
CREATE TABLE document_chunks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    document_id INT,
    chunk_text TEXT,
    chunk_index INT,
    embedding VECTOR(1536) COMMENT 'hnsw(distance=cosine)',
    token_count INT,
    FOREIGN KEY (document_id) REFERENCES documents(id),
    INDEX idx_document_id (document_id)
);

-- Query logs for analytics
CREATE TABLE query_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    query TEXT,
    response TEXT,
    response_time_ms INT,
    retrieved_chunks JSON,
    feedback_score INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Document Processing Pipeline

### 1. Text Chunking Strategy

```python
import tiktoken
from typing import List, Dict

class DocumentChunker:
    def __init__(self, chunk_size: int = 512, overlap: int = 50):
        self.chunk_size = chunk_size
        self.overlap = overlap
        self.tokenizer = tiktoken.get_encoding("cl100k_base")

    def chunk_text(self, text: str) -> List[Dict]:
        """Split text into overlapping chunks."""
        tokens = self.tokenizer.encode(text)
        chunks = []

        for i in range(0, len(tokens), self.chunk_size - self.overlap):
            chunk_tokens = tokens[i:i + self.chunk_size]
            chunk_text = self.tokenizer.decode(chunk_tokens)

            chunks.append({
                'text': chunk_text,
                'token_count': len(chunk_tokens),
                'chunk_index': len(chunks)
            })

        return chunks

    def process_document(self, document: Dict) -> List[Dict]:
        """Process a complete document into chunks."""
        chunks = self.chunk_text(document['content'])

        for chunk in chunks:
            chunk.update({
                'title': document['title'],
                'source': document.get('source', ''),
                'metadata': document.get('metadata', {})
            })

        return chunks
```

### 2. Embedding Generation

```python
from openai import OpenAI
import tidb_vector as tv
from typing import List

class EmbeddingService:
    def __init__(self, api_key: str, db_connection_string: str):
        self.openai_client = OpenAI(api_key=api_key)
        self.db_client = tv.connect(db_connection_string)

    def generate_embeddings(self, texts: List[str]) -> List[List[float]]:
        """Generate embeddings for a batch of texts."""
        response = self.openai_client.embeddings.create(
            model="text-embedding-3-small",
            input=texts
        )
        return [data.embedding for data in response.data]

    def store_document_chunks(self, document_id: int, chunks: List[Dict]):
        """Store document chunks with embeddings."""
        texts = [chunk['text'] for chunk in chunks]
        embeddings = self.generate_embeddings(texts)

        chunk_data = []
        for chunk, embedding in zip(chunks, embeddings):
            chunk_data.append((
                document_id,
                chunk['text'],
                chunk['chunk_index'],
                embedding,
                chunk['token_count']
            ))

        self.db_client.executemany("""
            INSERT INTO document_chunks
            (document_id, chunk_text, chunk_index, embedding, token_count)
            VALUES (%s, %s, %s, %s, %s)
        """, chunk_data)
```

## Advanced Retrieval Strategies

### 1. Hybrid Search Implementation

```python
class HybridRetriever:
    def __init__(self, db_client, embedding_service):
        self.db_client = db_client
        self.embedding_service = embedding_service

    def retrieve_context(self, query: str, limit: int = 5) -> List[Dict]:
        """Retrieve relevant chunks using hybrid search."""
        query_embedding = self.embedding_service.generate_embeddings([query])[0]

        results = self.db_client.execute("""
            SELECT
                dc.chunk_text,
                d.title,
                d.source,
                d.metadata,
                (1 - VEC_COSINE_DISTANCE(dc.embedding, %s)) * 0.7 +
                MATCH(dc.chunk_text) AGAINST (%s) * 0.3 as relevance_score
            FROM document_chunks dc
            JOIN documents d ON dc.document_id = d.id
            WHERE VEC_COSINE_DISTANCE(dc.embedding, %s) < 0.8
               OR MATCH(dc.chunk_text) AGAINST (%s)
            ORDER BY relevance_score DESC
            LIMIT %s
        """, (query_embedding, query, query_embedding, query, limit))

        return [
            {
                'text': row[0],
                'title': row[1],
                'source': row[2],
                'metadata': row[3],
                'score': row[4]
            }
            for row in results
        ]
```

### 2. Query Expansion

```python
class QueryExpander:
    def __init__(self, openai_client):
        self.openai_client = openai_client

    def expand_query(self, original_query: str) -> List[str]:
        """Generate alternative phrasings of the query."""
        response = self.openai_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "Generate 3 alternative phrasings of the user's query that maintain the same meaning but use different words."
                },
                {
                    "role": "user",
                    "content": original_query
                }
            ],
            temperature=0.7
        )

        alternatives = response.choices[0].message.content.strip().split('\n')
        return [original_query] + [alt.strip('- ') for alt in alternatives if alt.strip()]
```

## Response Generation

### 1. Context-Aware Generation

```python
class RAGGenerator:
    def __init__(self, openai_client, retriever, max_context_tokens: int = 3000):
        self.openai_client = openai_client
        self.retriever = retriever
        self.max_context_tokens = max_context_tokens
        self.tokenizer = tiktoken.get_encoding("cl100k_base")

    def generate_response(self, query: str) -> Dict:
        """Generate a response using RAG."""
        start_time = time.time()

        # Retrieve relevant context
        retrieved_chunks = self.retriever.retrieve_context(query, limit=10)

        # Build context within token limits
        context = self._build_context(retrieved_chunks)

        # Generate response
        response = self.openai_client.chat.completions.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content": """You are a helpful assistant that answers questions based on the provided context.
                    Always cite your sources and be clear about what information comes from the provided context.
                    If the context doesn't contain enough information to answer the question, say so clearly."""
                },
                {
                    "role": "user",
                    "content": f"Context:\n{context}\n\nQuestion: {query}"
                }
            ],
            temperature=0.1,
            max_tokens=500
        )

        response_time = (time.time() - start_time) * 1000

        return {
            'answer': response.choices[0].message.content,
            'sources': [chunk['source'] for chunk in retrieved_chunks[:3]],
            'retrieved_chunks': retrieved_chunks,
            'response_time_ms': response_time
        }

    def _build_context(self, chunks: List[Dict]) -> str:
        """Build context string within token limits."""
        context_parts = []
        total_tokens = 0

        for chunk in chunks:
            chunk_tokens = len(self.tokenizer.encode(chunk['text']))
            if total_tokens + chunk_tokens > self.max_context_tokens:
                break

            context_parts.append(f"Source: {chunk['source']}\n{chunk['text']}")
            total_tokens += chunk_tokens

        return "\n\n---\n\n".join(context_parts)
```

## Performance Optimization

### 1. Caching Strategy

```python
import redis
import json
import hashlib

class RAGCache:
    def __init__(self, redis_client):
        self.redis = redis_client
        self.cache_ttl = 3600  # 1 hour

    def _get_cache_key(self, query: str) -> str:
        """Generate cache key for query."""
        return f"rag_cache:{hashlib.md5(query.encode()).hexdigest()}"

    def get_cached_response(self, query: str) -> Dict:
        """Get cached response if available."""
        cache_key = self._get_cache_key(query)
        cached = self.redis.get(cache_key)

        if cached:
            return json.loads(cached)
        return None

    def cache_response(self, query: str, response: Dict):
        """Cache the response."""
        cache_key = self._get_cache_key(query)
        self.redis.setex(
            cache_key,
            self.cache_ttl,
            json.dumps(response, default=str)
        )
```

### 2. Async Processing

```python
import asyncio
import aiohttp
from concurrent.futures import ThreadPoolExecutor

class AsyncRAGService:
    def __init__(self, rag_generator, cache=None):
        self.rag_generator = rag_generator
        self.cache = cache
        self.executor = ThreadPoolExecutor(max_workers=4)

    async def process_query_async(self, query: str) -> Dict:
        """Process query asynchronously."""
        # Check cache first
        if self.cache:
            cached_response = await asyncio.get_event_loop().run_in_executor(
                self.executor, self.cache.get_cached_response, query
            )
            if cached_response:
                return cached_response

        # Generate response
        response = await asyncio.get_event_loop().run_in_executor(
            self.executor, self.rag_generator.generate_response, query
        )

        # Cache response
        if self.cache:
            await asyncio.get_event_loop().run_in_executor(
                self.executor, self.cache.cache_response, query, response
            )

        return response
```

## Monitoring and Analytics

### 1. Query Logging

```python
class QueryLogger:
    def __init__(self, db_client):
        self.db_client = db_client

    def log_query(self, query: str, response: Dict, feedback_score: int = None):
        """Log query and response for analytics."""
        self.db_client.execute("""
            INSERT INTO query_logs
            (query, response, response_time_ms, retrieved_chunks, feedback_score)
            VALUES (%s, %s, %s, %s, %s)
        """, (
            query,
            response['answer'],
            response['response_time_ms'],
            json.dumps(response['retrieved_chunks'][:3]),
            feedback_score
        ))

    def get_query_analytics(self, days: int = 30) -> Dict:
        """Get query analytics for the specified period."""
        results = self.db_client.execute("""
            SELECT
                COUNT(*) as total_queries,
                AVG(response_time_ms) as avg_response_time,
                AVG(feedback_score) as avg_feedback_score,
                COUNT(DISTINCT DATE(created_at)) as active_days
            FROM query_logs
            WHERE created_at >= DATE_SUB(NOW(), INTERVAL %s DAY)
        """, (days,))

        return {
            'total_queries': results[0][0],
            'avg_response_time_ms': results[0][1],
            'avg_feedback_score': results[0][2],
            'active_days': results[0][3]
        }
```

## Production Deployment

### 1. Complete RAG Service

```python
class ProductionRAGService:
    def __init__(self, config: Dict):
        self.config = config
        self.embedding_service = EmbeddingService(
            config['openai_api_key'],
            config['tidb_connection_string']
        )
        self.retriever = HybridRetriever(
            self.embedding_service.db_client,
            self.embedding_service
        )
        self.generator = RAGGenerator(
            self.embedding_service.openai_client,
            self.retriever
        )
        self.cache = RAGCache(redis.Redis(**config['redis_config']))
        self.logger = QueryLogger(self.embedding_service.db_client)

    async def query(self, question: str, user_id: str = None) -> Dict:
        """Main query interface."""
        try:
            # Check cache
            cached_response = self.cache.get_cached_response(question)
            if cached_response:
                return cached_response

            # Generate response
            response = self.generator.generate_response(question)

            # Cache and log
            self.cache.cache_response(question, response)
            self.logger.log_query(question, response)

            return response

        except Exception as e:
            error_response = {
                'answer': "I'm sorry, I encountered an error processing your question. Please try again.",
                'error': str(e),
                'sources': [],
                'retrieved_chunks': [],
                'response_time_ms': 0
            }
            self.logger.log_query(question, error_response, feedback_score=0)
            return error_response
```

## Best Practices for Production

1. **Chunking Strategy**: Experiment with different chunk sizes and overlap amounts
2. **Embedding Models**: Choose models that best fit your domain and language
3. **Retrieval Tuning**: Adjust similarity thresholds and result limits based on your data
4. **Caching**: Implement aggressive caching for common queries
5. **Monitoring**: Track response quality, latency, and user satisfaction
6. **Error Handling**: Implement graceful degradation for service failures
7. **Security**: Implement proper authentication and rate limiting
8. **Cost Management**: Monitor API usage and implement cost controls

## Conclusion

Building production-ready RAG applications requires careful consideration of architecture, performance, and user experience. TiDB's vector database capabilities provide the foundation for scalable, efficient retrieval systems that can power intelligent applications.

The examples in this guide provide a solid starting point for your RAG implementation. Remember to iterate based on your specific use case and user feedback to achieve the best results.