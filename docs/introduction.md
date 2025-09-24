# Introduction to TiDB for AI

TiDB for AI is a revolutionary AI-native database platform that combines vector search, full-text search, and MySQL compatibility for modern AI applications. Build intelligent applications with unprecedented ease and performance.

## Key Features

- **Vector Search**: Native vector operations for embeddings and similarity search
- **Full-Text Search**: Powerful text search capabilities built into the database
- **MySQL Compatible**: Use existing tools and knowledge with modern AI capabilities
- **Distributed SQL**: Scale horizontally while maintaining ACID transactions

## Getting Started

TiDB for AI makes it easy to build AI-powered applications. Whether you're working with embeddings, implementing RAG systems, or building multimodal search, our unified platform has you covered.

```python
import pytidb

# Connect to TiDB for AI
db = pytidb.connect("your-connection-string")

# Create a table with vector fields
class Document(TableModel):
    __tablename__ = "documents"

    id: int = Field(primary_key=True)
    text: str = Field()
    text_vec: list[float] = embed_fn.VectorField(
        source_field="text",
    )
```

## What Makes TiDB for AI Different?

Traditional AI applications require multiple databases and complex integrations:
- Vector databases for embeddings
- Traditional databases for structured data
- Search engines for text queries
- Custom glue code to connect everything

TiDB for AI unifies all of these capabilities into a single, coherent platform that speaks SQL.