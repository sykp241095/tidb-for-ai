---
title: "Tutorial: Building Semantic Search Applications with TiDB Vector"
description: "Learn how to implement semantic search using TiDB's vector capabilities and local embedding models to find content by meaning, not just keywords."
date: "2024-01-30"
author: "TiDB Team"
tags: ["vector-search", "semantic-search", "embeddings", "tutorial"]
category: "Tutorial"
featured: true
readingTime: 5
image: "/blog/vector-search-tutorial.jpg"
---

## What is Semantic Search?

Semantic search uses mathematical representations called embeddings to understand the meaning of text. Unlike traditional keyword search, it can find related content even when the exact words don't match.

For example, searching for "slow application" can find documents about "performance optimization" and "database tuning" because they're semantically related. This makes search much more intuitive and powerful.

# Vector Search Example

This example demonstrates how to build a semantic search application using TiDB and built-in embedding models. It leverages vector search to find similar items based on meaning, not just keywords. The app uses Streamlit for the web UI and TiDB Cloud's free embedding models.

<p align="center">
  <img width="700" alt="Semantic search with vector embeddings" src="https://github.com/user-attachments/assets/6d7783a5-ce9c-4dcc-8b95-49d5f0ca735a" />
  <p align="center"><i>Semantic search with vector embeddings</i></p>
</p>

## Prerequisites

- **Python 3.10+**
- **A TiDB Cloud Starter cluster**: Create a free cluster here: [tidbcloud.com](https://tidbcloud.com/?utm_source=github&utm_medium=referral&utm_campaign=pytidb_readme)

## How to run

**Step 1**: Clone the repository to local

```bash
git clone https://github.com/pingcap/pytidb.git
cd pytidb/examples/vector_search/
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
TIDB_DATABASE=vector_search_example
EOF
```

**Step 4**: Run the Streamlit app

```bash
streamlit run app.py
```

**Step 5**: Open your browser and visit `http://localhost:8501`

## How It Works

💡 **Source Code**: You can find the complete source code for this example on [GitHub](https://github.com/pingcap/pytidb/tree/main/examples/vector_search). This working example includes all the necessary files to get you started with semantic search in minutes.

### 1. Embedding Function

Configure automatic embedding generation with TiDB Cloud's free embedding models:

```python
from pytidb import EmbeddingFunction

text_embed = EmbeddingFunction(
    model_name="tidbcloud_free/cohere/embed-multilingual-v3",
)
```

### 2. Schema Definition

Define a table schema with text and vector fields using `pytidb.schema.TableModel`:

```python
from pytidb import Field, TableModel
from sqlalchemy import JSON

class Chunk(TableModel):
    __tablename__ = "chunks"
    __table_args__ = {"extend_existing": True}

    id: int = Field(primary_key=True)
    text: str = Field()
    text_vec: list[float] = text_embed.VectorField(
        source_field="text",
    )
    meta: dict = Field(sa_type=JSON)

table = db.create_table(schema=Chunk, if_exists="overwrite")
```

### 3. Insert Sample Data

Insert text data with automatic embedding generation:

```python
sample_chunks = [
    {
        "text": "Big data analytics extracts insights from large datasets.",
        "meta": {"language": "english"},
    },
    {
        "text": "Internet of Things connects everyday objects to the internet.",
        "meta": {"language": "english"},
    },
    {
        "text": "Augmented reality overlays digital content on the real world.",
        "meta": {"language": "english"},
    },
]

Chunk = table.table_model
table.bulk_insert([Chunk(**chunk) for chunk in sample_chunks])
```

### 4. Vector Search with Filtering

Use the search API to find semantically similar content with distance thresholds and metadata filters:

```python
results = (
    table.search(query_text)
    .debug(True)
    .filter({"meta.language": language})
    .distance_threshold(distance_threshold)
    .limit(query_limit)
    .to_list()
)
```

### 5. Results

Get ranked results with similarity scores displayed in an interactive Streamlit interface, where closer vectors indicate more semantically similar content.

---

## Related Resources

- **Source Code**: [View on GitHub](https://github.com/pingcap/pytidb/tree/main/examples/vector_search)
- **TiDB Vector Documentation**: [Vector Data Types](https://docs.pingcap.com/tidb/stable/vector-search-overview)
- **Ollama Models**: [Available Embedding Models](https://ollama.com/library)
- **Hands-on Lab**: [Build Simple Vector Search Apps Using Jupyter Notebook](https://labs.tidb.io/lab?preview=demo_408) (60 min)

Ready to implement semantic search in your application? Start with the complete example in the GitHub repository and see how TiDB's vector search can transform your user experience.