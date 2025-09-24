# Quick Start Guide

Get up and running with TiDB for AI in minutes. This guide will walk you through creating your first AI-powered application.

## Installation

Install the TiDB for AI Python client:

```bash
pip install pytidb
```

## Basic Setup

```python
import pytidb
from pytidb import Field, TableModel
from pytidb.integrations import embed_fn

# Connect to your TiDB for AI instance
db = pytidb.connect("your-connection-string")

# Define your first AI table
class Article(TableModel):
    __tablename__ = "articles"

    id: int = Field(primary_key=True)
    title: str = Field()
    content: str = Field()
    content_vec: list[float] = embed_fn.VectorField(
        source_field="content",
    )

# Create the table
table = db.create_table(schema=Article, if_exists="overwrite")
```

## Your First Semantic Search

```python
# Insert some sample data
articles = [
    {"title": "AI in Healthcare", "content": "Machine learning is revolutionizing medical diagnosis..."},
    {"title": "Future of Transportation", "content": "Autonomous vehicles are changing how we travel..."},
    {"title": "Climate Change Solutions", "content": "Renewable energy technologies are advancing rapidly..."}
]

table.insert_many(articles)

# Perform semantic search
results = table.search("medical AI applications").limit(5).to_list()
for result in results:
    print(f"Title: {result.title}")
    print(f"Content: {result.content[:100]}...")
    print(f"Relevance Score: {result.distance}")
    print("---")
```

## Next Steps

- [Vector Search →](vector-search) - Learn advanced vector search techniques
- [Hybrid Search →](hybrid-search) - Combine vector and text search
- [Image Search →](image-search) - Work with multimodal embeddings