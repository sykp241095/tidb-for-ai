---
title: "Tutorial: Hybrid Search - Combining Vector and Full-text Search"
description: "Learn how to build powerful hybrid search applications that combine vector similarity with traditional full-text search for comprehensive results."
date: "2024-03-15"
publishedAt: "2024-03-15"
author: "TiDB Team"
category: "Tutorial"
tags: ["hybrid-search", "vector-search", "full-text-search", "tutorial"]
featured: true
---

# Hybrid Search: Combining Vector and Full-text Search

Modern search applications need to understand both semantic meaning and exact keyword matches. Hybrid search combines the best of both worlds: vector search for semantic understanding and full-text search for precise keyword matching.

## What is Hybrid Search?

Hybrid search merges two powerful search techniques:

- **Vector Search**: Understands semantic meaning and context using embeddings
- **Full-text Search**: Provides precise keyword matching and traditional relevance scoring
- **Fusion Methods**: Intelligently combines results from both approaches

This approach ensures you never miss relevant results, whether users search with natural language or specific keywords.

## Prerequisites

Before starting, ensure you have:

- Python 3.10+
- TiDB database instance ([Create a free TiDB Serverless Cluster](https://tidbcloud.com/free-trial))
- OpenAI API key ([Get your API key](https://platform.openai.com/api-keys))

> **Note**: Full-text search is currently available in specific regions:
> - TiDB Cloud Starter: Frankfurt (eu-central-1), Singapore (ap-southeast-1)

## How to run

**Step 1**: Clone the repository to local

```bash
git clone https://github.com/pingcap/pytidb.git
cd pytidb/examples/hybrid_search/
```

**Step 2**: Install the required packages and set up the environment

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r reqs.txt
```

**Step 3**: Set up environment to connect to TiDB

Go to [TiDB Cloud console](https://tidbcloud.com/clusters) and get the connection parameters, then set up the environment variable like this:

```bash
cat > .env <<EOF
TIDB_HOST={gateway-region}.prod.aws.tidbcloud.com
TIDB_PORT=4000
TIDB_USERNAME={prefix}.root
TIDB_PASSWORD={password}
TIDB_DATABASE=hybrid_search_demo
OPENAI_API_KEY=your-openai-api-key
EOF
```

**Step 4**: Run the Streamlit app

```bash
streamlit run app.py
```

**Step 5**: Open your browser and visit `http://localhost:8501`

## How It Works

💡 **Source Code**: You can find the complete source code for this example on [GitHub](https://github.com/pingcap/pytidb/tree/main/examples/hybrid_search). This working example includes all the necessary files to get you started with hybrid search in minutes.

### 1. Schema Definition

Define a table schema with both vector and full-text fields using `pytidb.schema.TableModel`:

```python
# Define table schema
class Document(TableModel):
    __tablename__ = "documents"
    __table_args__ = {"extend_existing": True}

    id: int = Field(primary_key=True)
    text: str = FullTextField()
    text_vec: list[float] = embed_fn.VectorField(
        source_field="text",
    )
    meta: dict = Field(sa_type=JSON)
```

### 2. Embedding Function

Configure automatic embedding generation with OpenAI embeddings - vectors are automatically generated when inserting text.

### 3. Hybrid Search with Fusion

Use the search API to combine vector and full-text search with fusion methods:

```python
# Perform hybrid search with different search types
def hybrid_search(query_text, search_type="hybrid", limit=5):
    query = (
        table.search(query_text, search_type=search_type)
        .distance_threshold(0.8)
        .fusion(method="rrf")  # Reciprocal Rank Fusion
        .limit(limit)
    )

    return query.to_pandas()

# Example: Vector search only
vector_results = hybrid_search("database performance", search_type="vector")

# Example: Full-text search only
fulltext_results = hybrid_search("TiDB distributed", search_type="fulltext")

# Example: Hybrid search (combines both)
hybrid_results = hybrid_search("TiDB performance optimization", search_type="hybrid")
```

### 4. Results

Get ranked results with combined scores from both vector similarity and text matching, displayed in an interactive Streamlit interface.

---

## Related Resources

- **Source Code**: [View on GitHub](https://github.com/pingcap/pytidb/tree/main/examples/hybrid_search)
- **TiDB Vector Documentation**: [Vector Data Types](https://docs.pingcap.com/tidb/stable/vector-search-overview)
- **Full-text Search**: [Full-text Search in TiDB](https://docs.pingcap.com/tidb/stable/full-text-search)
- **Hands-on Lab**: [Build Hybrid Search Apps Using Jupyter Notebook](https://labs.tidb.io/lab?preview=demo_409) (60 min)