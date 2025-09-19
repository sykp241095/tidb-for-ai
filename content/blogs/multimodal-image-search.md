---
title: "Tutorial: Building Image Search Applications with TiDB Vector"
description: "Learn how to implement image search using TiDB's vector capabilities for both text-to-image and image-to-image search."
date: "2024-02-15"
author: "TiDB Team"
tags: ["image-search", "multimodal", "embeddings", "vector-search", "tutorial"]
category: "Tutorial"
featured: true
readingTime: 6
image: "/blog/image-search-tutorial.jpg"
---

## What is Image Search?

Image search uses mathematical representations called embeddings to understand both images and text, enabling powerful search capabilities. You can find images using text descriptions ("fluffy orange cat") or find similar images by uploading a photo.

For example, searching for "fluffy orange cat" can find relevant cat photos, or uploading a photo of a golden retriever can find similar dogs based on breed, color, and pose. This makes image search incredibly intuitive and powerful for visual applications.

<p align="center">
  <img width="700" alt="Pet image search via multimodal embeddings" src="https://github.com/user-attachments/assets/7ba9733a-4d1f-4094-8edb-58731ebd08e9" />
  <p align="center"><i>Pet image search via multimodal embeddings</i></p>
</p>

## How to Build Image Search

To build effective image search, you need a vector database that can handle image embeddings. TiDB is perfect for this - a distributed, MySQL-compatible database that combines multiple capabilities in one platform:

- **Vector Search**: Store and query high-dimensional vectors for image and text embeddings
- **Multimodal Support**: Handle images and text in the same embedding space
- **MySQL Compatibility**: Use familiar SQL syntax and tools you already know
- **Auto Embedding**: Automatically generate embeddings for images and text without manual processing

This example demonstrates how to build an image search application using TiDB's vector capabilities with Jina AI embedding models. It supports both text-to-image and image-to-image search with just a few lines of code.

## Prerequisites

- **Python 3.10+**
- **A TiDB Cloud Starter cluster**: Create a free cluster here: [tidbcloud.com](https://tidbcloud.com/?utm_source=github&utm_medium=referral&utm_campaign=pytidb_readme)
- **Jina AI API Key**: Get your free API key at [jina.ai Embeddings](https://jina.ai/embeddings/)

## How to run

**Step 1**: Clone the repository to local

```bash
git clone https://github.com/pingcap/pytidb.git
cd pytidb/examples/image_search/
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
TIDB_DATABASE=test
JINA_AI_API_KEY={your-jina-ai-api-key}
EOF
```

**Step 4**: Download the sample dataset

```bash
curl -L -o oxford_pets.tar.gz "https://thor.robots.ox.ac.uk/~vgg/data/pets/images.tar.gz"
mkdir -p oxford_pets
tar -xzf oxford_pets.tar.gz -C oxford_pets
```

**Step 5**: Run the Streamlit app

```bash
streamlit run app.py
```

**Step 6**: Open your browser and visit `http://localhost:8501`

## How It Works

💡 **Source Code**: You can find the complete source code for this example on [GitHub](https://github.com/pingcap/pytidb/tree/main/examples/image_search). This working example includes all the necessary files to get you started with multimodal image search in minutes.

### 1. Schema Definition

Define a table schema for images with multimodal vector embeddings using `pytidb.schema.TableModel`:

```python
class Pet(TableModel):
    __tablename__ = "pets"
    __table_args__ = {"extend_existing": True}

    id: int = Field(primary_key=True)
    breed: str = Field()
    image_uri: str = Field()
    image_name: str = Field()
    image_vec: Optional[List[float]] = embed_fn.VectorField(
        distance_metric=DistanceMetric.L2,
        source_field="image_uri",
        source_type="image",
    )
```

### 2. Multimodal Search

Use the search API to find images using either text descriptions or image uploads:

```python
def search_images(table, query, limit=20):
    results = (
        table.search(query=query)
        .distance_metric(DistanceMetric.L2)
        .limit(limit)
        .to_list()
    )
    return results

# Text-to-image search
results = search_images(table, "fluffy orange cat")

# Image-to-image search
results = search_images(table, uploaded_image)
```

### 3. Embedding Function

Configure automatic multimodal embedding generation with powerful embedding models. TiDB supports a wide range of embedding providers through LiteLLM integration:

```python
# Jina AI (multimodal - supports both text and images)
embed_fn = EmbeddingFunction("jina-embeddings-v2-base-en")

# OpenAI embeddings
embed_fn = EmbeddingFunction("text-embedding-3-large")

# Cohere embeddings
embed_fn = EmbeddingFunction("embed-english-v3.0")

# Local models via Ollama
embed_fn = EmbeddingFunction("ollama/mxbai-embed-large")
```

**Multimodal Support**: For image search applications, choose embedding models that support both text and images in the same vector space, like Jina AI's multimodal models. This enables seamless text-to-image and image-to-image search.

**Provider Flexibility**: TiDB supports [50+ embedding providers](https://docs.litellm.ai/docs/embedding/supported_embedding) including OpenAI, Cohere, Anthropic, Azure OpenAI, Google Vertex AI, AWS Bedrock, and local models. Switch providers easily without changing your application code.

---

## Related Resources

- **Source Code**: [View on GitHub](https://github.com/pingcap/pytidb/tree/main/examples/image_search)
- **TiDB Vector Documentation**: [Vector Data Types](https://docs.pingcap.com/tidb/stable/vector-search-overview)
- **Jina AI Embeddings**: [Multimodal Embedding Models](https://jina.ai/embeddings/)
- **Demo Gallery**: [More Examples](https://github.com/pingcap/pytidb/tree/main/examples)

Ready to implement multimodal image search in your application? Start with the complete example in the GitHub repository and see how TiDB's vector search can transform your visual search experience.