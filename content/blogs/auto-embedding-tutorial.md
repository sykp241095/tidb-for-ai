---
title: "Tutorial: Auto Embedding with Built-in Models"
description: "Learn how to automatically generate embeddings for your text data using TiDB's built-in embedding models with PyTiDB SDK."
date: "2024-03-20"
author: "TiDB Team"
tags: ["auto-embedding", "vector-search", "embeddings", "tutorial"]
category: "Tutorial"
featured: true
readingTime: 4
---

## What is Auto Embedding?

Auto embedding automatically generates vector representations of your text data when inserting it into the database. This eliminates the need to manually generate embeddings, making it easier to build AI applications with semantic search capabilities.

With auto embedding, you can insert plain text and let TiDB handle the embedding generation in the background. When you search, the query text is also automatically embedded, making the entire process seamless.

## Prerequisites

- **Python 3.10+**
- **A TiDB Cloud Starter cluster**: Create a free cluster here: [tidbcloud.com](https://tidbcloud.com/?utm_source=github&utm_medium=referral&utm_campaign=pytidb_readme)

## How to run

**Step 1**: Clone the repository to local

```bash
git clone https://github.com/pingcap/pytidb.git
cd pytidb/examples/auto_embedding/
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
TIDB_DATABASE=auto_embedding_demo

# Using TiDB Cloud Free embedding model by default
EMBEDDING_PROVIDER=tidbcloud_free
EOF
```

**Step 4**: Run the demo

```bash
python main.py
```

**Step 5**: Expected output

```
=== Define embedding function ===
Embedding function (model id: tidbcloud_free/amazon/titan-embed-text-v2) defined

=== Define table schema ===
Table created

=== Insert sample data ===
Inserted 3 chunks

=== Perform vector search ===
id: 1, text: TiDB is a distributed database..., distance: 0.303
id: 2, text: PyTiDB is a Python library..., distance: 0.422
id: 3, text: LlamaIndex is a Python library..., distance: 0.526
```

## How It Works

💡 **Source Code**: You can find the complete source code for this example on [GitHub](https://github.com/pingcap/pytidb/tree/main/examples/auto_embedding). This working example includes all the necessary files to get you started with auto embedding in minutes.

### 1. Define Embedding Function

Configure the embedding model that will automatically generate vectors for your text data:

```python
from pytidb import EmbeddingFunction

# Define embedding function
embed_func = EmbeddingFunction(
    model_name="tidbcloud_free/amazon/titan-embed-text-v2"
    # No API key required for TiDB Cloud free models
)
```

### 2. Schema Definition

Define a table schema with auto-embedding vector fields using `pytidb.schema.TableModel`:

```python
from pytidb import Field, TableModel
from sqlalchemy import TEXT

class Chunk(TableModel):
    __tablename__ = "chunks"
    __table_args__ = {"extend_existing": True}

    id: int = Field(primary_key=True)
    text: str = Field(sa_type=TEXT)
    text_vec: list[float] = embed_func.VectorField(source_field="text")

table = db.create_table(schema=Chunk, if_exists="overwrite")
```

### 3. Automatic Data Insertion

Insert text data and embeddings are generated automatically in the background:

```python
# Insert sample data - embeddings generated automatically
table.bulk_insert([
    Chunk(text="TiDB is a distributed database that supports OLTP, OLAP, HTAP and AI workloads."),
    Chunk(text="PyTiDB is a Python library for developers to connect to TiDB."),
    Chunk(text="LlamaIndex is a Python library for building AI-powered applications."),
])

print("✅ Text inserted, embeddings generated automatically!")
```

### 4. Seamless Vector Search

Search using natural language queries - embedding happens automatically:

```python
# Search with natural language (query embedding happens automatically)
results = (
    table.search("database for AI applications")
    .distance_threshold(0.8)
    .limit(5)
    .to_pandas()
)

for _, row in results.iterrows():
    print(f"📄 {row['text']} (distance: {row['_distance']:.3f})")
```

---

## Related Resources

- **Source Code**: [View on GitHub](https://github.com/pingcap/pytidb/tree/main/examples/auto_embedding)
- **TiDB Vector Documentation**: [Vector Data Types](https://docs.pingcap.com/tidb/stable/vector-search-overview)
- **PyTiDB Documentation**: [Auto Embedding Guide](https://docs.pingcap.com/tidb/stable/vector-search-embedding-models)
- **Hands-on Lab**: [Build Auto-Embedding Apps Using Jupyter Notebook](https://labs.tidb.io/lab?preview=demo_410) (45 min)