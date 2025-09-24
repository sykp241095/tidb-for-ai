# Vector Search

Vector search enables semantic similarity search using embeddings. This is perfect for RAG applications, recommendation systems, and intelligent content discovery.

## Basic Vector Search

```python
from pytidb import Field, TableModel
from pytidb.integrations import text_embed
from sqlalchemy import JSON

class Chunk(TableModel):
    __tablename__ = "chunks"

    id: int = Field(primary_key=True)
    text: str = Field()
    text_vec: list[float] = text_embed.VectorField(
        source_field="text",
    )
    meta: dict = Field(sa_type=JSON)

# Create table
table = db.create_table(schema=Chunk, if_exists="overwrite")

# Insert documents
documents = [
    {
        "text": "TiDB for AI combines vector search with SQL",
        "meta": {"category": "database", "language": "en"}
    },
    {
        "text": "Machine learning models need efficient data storage",
        "meta": {"category": "ai", "language": "en"}
    }
]
table.insert_many(documents)
```

## Advanced Queries

### Filtered Vector Search

```python
# Search with metadata filtering
results = (
    table.search("database technology")
    .filter({"meta.language": "en"})
    .distance_threshold(0.8)
    .limit(10)
    .to_list()
)
```

### Distance Metrics

```python
from pytidb import DistanceMetric

# Use different distance metrics
results = (
    table.search("AI applications")
    .distance_metric(DistanceMetric.COSINE)
    .limit(5)
    .to_list()
)
```

## RAG Applications

Vector search is the foundation of Retrieval-Augmented Generation (RAG) systems:

```python
def rag_query(question: str, context_limit: int = 5):
    # Retrieve relevant context
    context_chunks = (
        table.search(question)
        .distance_threshold(0.7)
        .limit(context_limit)
        .to_list()
    )

    # Combine context for LLM
    context = "\n".join([chunk.text for chunk in context_chunks])

    # Generate response with context
    prompt = f"Context: {context}\n\nQuestion: {question}\n\nAnswer:"
    # Send to your LLM of choice
    return llm.generate(prompt)
```

## Performance Tips

- **Index Optimization**: Vector indices are automatically created and optimized
- **Batch Operations**: Use `insert_many()` for bulk data insertion
- **Distance Thresholds**: Set appropriate thresholds to filter irrelevant results
- **Embedding Quality**: Use high-quality embedding models for better results