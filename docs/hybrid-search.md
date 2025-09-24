# Hybrid Search

Hybrid search combines vector similarity with full-text search and structured filtering, providing the best of all worlds for comprehensive search experiences.

## Setup Hybrid Search

```python
from pytidb import Field, TableModel, FullTextField
from pytidb.integrations import embed_fn
from sqlalchemy import JSON

class Document(TableModel):
    __tablename__ = "documents"

    id: int = Field(primary_key=True)
    title: str = Field()
    text: str = FullTextField()  # Enable full-text search
    text_vec: list[float] = embed_fn.VectorField(
        source_field="text",
    )
    category: str = Field()
    created_at: datetime = Field()
    meta: dict = Field(sa_type=JSON)

# Create table with hybrid capabilities
table = db.create_table(schema=Document, if_exists="overwrite")
```

## Hybrid Query Examples

### Basic Hybrid Search

```python
# Combine vector and text search
query = (
    table.search("machine learning", search_type="hybrid")
    .distance_threshold(0.8)
    .fusion(method="rrf")  # Reciprocal Rank Fusion
    .limit(10)
    .to_list()
)
```

### Advanced Filtering

```python
# Hybrid search with structured filtering
results = (
    table.search("AI applications", search_type="hybrid")
    .filter(Document.category == "technology")
    .filter(Document.created_at >= datetime(2024, 1, 1))
    .distance_threshold(0.7)
    .fusion(method="weighted", vector_weight=0.7, text_weight=0.3)
    .limit(20)
    .to_list()
)
```

## Fusion Methods

### Reciprocal Rank Fusion (RRF)

RRF combines rankings from different search methods:

```python
query = (
    table.search("deep learning frameworks")
    .search_type("hybrid")
    .fusion(method="rrf", k=60)  # RRF parameter
    .limit(10)
)
```

### Weighted Scoring

Manually control the importance of each search method:

```python
query = (
    table.search("neural networks")
    .search_type("hybrid")
    .fusion(
        method="weighted",
        vector_weight=0.6,    # Semantic similarity weight
        text_weight=0.3,      # Full-text match weight
        filter_weight=0.1     # Structured filter weight
    )
)
```

## Real-World Example

```python
def search_knowledge_base(
    query: str,
    category: str = None,
    date_range: tuple = None,
    limit: int = 20
):
    search_query = table.search(query, search_type="hybrid")

    # Apply filters if provided
    if category:
        search_query = search_query.filter(Document.category == category)

    if date_range:
        start_date, end_date = date_range
        search_query = search_query.filter(
            Document.created_at.between(start_date, end_date)
        )

    # Execute hybrid search
    results = (
        search_query
        .distance_threshold(0.75)
        .fusion(method="rrf")
        .limit(limit)
        .to_list()
    )

    return [
        {
            "title": doc.title,
            "text": doc.text[:200] + "...",
            "category": doc.category,
            "relevance_score": doc.distance,
            "created_at": doc.created_at
        }
        for doc in results
    ]
```

## Best Practices

- **Balance Weights**: Adjust fusion weights based on your use case
- **Filter Early**: Apply structured filters before vector/text search
- **Test Different Methods**: RRF vs weighted fusion for your data
- **Monitor Performance**: Track query latency and result quality