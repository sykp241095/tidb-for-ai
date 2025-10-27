---
title: "Tutorial: Building Real-time Recommendation Systems with Vector Search"
description: "Learn how to build a live e-commerce recommendation system using TiDB's vector search with auto-embedding, real-time updates, and dynamic similarity scoring."
date: "2024-03-25"
author: "TiDB Team"
tags: ["vector-search", "real-time", "recommendations", "auto-embedding", "tutorial"]
category: "Tutorial"
featured: true
readingTime: 6
image: "/blog/realtime-vector-search-tutorial.jpg"
---

## What is Real-time Vector Search?

Real-time vector search combines the power of semantic similarity with live data updates to create dynamic recommendation systems. Unlike static vector databases, it automatically re-embeds content when data changes and provides instant recommendations based on user preferences.

For example, when a user adds "sports equipment" to their profile, the system immediately finds semantically related products like "basketball", "running shoes", or "yoga mat" - even if they've just been added to the inventory. This creates a responsive, personalized experience that adapts to both user behavior and inventory changes.

# Real-time Vector Search Example

This example demonstrates how to build a live e-commerce recommendation system using TiDB's vector search capabilities with auto-embedding. The application simulates a shopping app where product recommendations update instantly based on user preferences and inventory changes.

<p align="center">
  <img width="700" alt="Real-time vector search recommendations" src="https://github.com/user-attachments/assets/6d7783a5-ce9c-4dcc-8b95-49d5f0ca735a" />
  <p align="center"><i>Real-time product recommendations with vector search</i></p>
</p>

## Prerequisites

- **Python 3.10+**
- **A TiDB Cloud Starter cluster**: Create a free cluster here: [tidbcloud.com](https://tidbcloud.com/?utm_source=github&utm_medium=referral&utm_campaign=pytidb_readme)
- **OpenAI API Key**: For embedding generation (or use TiDB Cloud free models)

## How to run

**Step 1**: Clone the repository to local

```bash
git clone https://github.com/pingcap/pytidb.git
cd pytidb/examples/realtime_vector_search/
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
TIDB_DATABASE=vector_search_realtime

# For OpenAI embeddings (or use TiDB Cloud free models)
OPENAI_API_KEY=your_openai_api_key_here

# User profile for personalized recommendations
USER_PROFILE=a user likes sports
EOF
```

**Step 4**: Run the Streamlit app

```bash
streamlit run app.py
```

**Step 5**: Open your browser and visit `http://localhost:8501`

## How It Works

💡 **Source Code**: You can find the complete source code for this example on [GitHub](https://github.com/pingcap/pytidb/tree/main/examples/realtime_vector_search). This working example includes all the necessary files to get you started with real-time vector search in minutes.

### 1. Embedding Configuration

Configure automatic embedding generation with OpenAI or TiDB Cloud's free models:

```python
from pytidb import EmbeddingFunction

# Configure OpenAI embeddings
db.configure_embedding_provider(
    provider="openai",
    api_key=os.getenv("OPENAI_API_KEY"),
)

embed_func = EmbeddingFunction(
    model_name="openai/text-embedding-3-small",
)
```

### 2. Product Schema with Auto-Embedding

Define a product table schema with automatic vector generation:

```python
from pytidb import Field, TableModel
from pytidb.datatype import TEXT

class Product(TableModel):
    __tablename__ = "products"

    id: int = Field(primary_key=True)
    name: str = Field(sa_type=TEXT)
    description: str = Field(sa_type=TEXT)
    description_vec: list[float] = embed_func.VectorField(
        source_field="description"
    )
    category: str = Field(sa_type=TEXT)
    price: float = Field()

table = db.create_table(schema=Product, if_exists="overwrite")
```

### 3. Real-time Data Management

Add, update, and delete products with automatic re-embedding:

```python
# Add new product - embedding generated automatically
def add_product(table, name, description, category, price):
    Product = table.table_model
    new_product = Product(
        name=name,
        description=description,
        category=category,
        price=price
    )
    table.insert(new_product)
    return True

# Update product with automatic re-embedding
def update_product(table, db, product_id, name, description, category, price):
    Product = table.table_model
    with db.session() as session:
        # Delete old version
        db.execute(f"DELETE FROM {table.table_name} WHERE id = %s", (product_id,))
        # Insert updated version (triggers auto-embedding)
        updated_product = Product(
            id=product_id,
            name=name,
            description=description,
            category=category,
            price=price,
        )
        table.insert(updated_product)
        session.commit()
```

### 4. Dynamic Recommendations

Get personalized recommendations with configurable similarity thresholds:

```python
def get_recommendations(table, user_profile, limit=5, distance_threshold=0.85):
    # Perform vector search with user profile as query
    search_query = table.search(user_profile)

    # Apply distance threshold for quality control
    if distance_threshold > 0:
        search_query = search_query.distance_threshold(distance_threshold)

    results = search_query.limit(limit).to_list()
    return results

# Get live recommendations
recommendations = get_recommendations(
    table,
    "a user likes sports",
    limit=5,
    distance_threshold=0.85
)
```

### 5. Interactive User Experience

The demo includes a dual-panel interface:

- **User View**: Mobile-style shopping app showing personalized recommendations
- **Admin Panel**: Real-time product management with add/edit/delete capabilities

Every change in the admin panel immediately affects the recommendations shown to users, demonstrating the real-time nature of the system.

### 6. Distance Threshold Tuning

Fine-tune recommendation quality with adjustable similarity thresholds:

```python
# Stricter matching (lower threshold = better matches)
strict_results = table.search(user_profile).distance_threshold(0.5).to_list()

# More permissive matching
loose_results = table.search(user_profile).distance_threshold(1.2).to_list()

# No filtering (show all results ranked by similarity)
all_results = table.search(user_profile).limit(10).to_list()
```

## Why This Approach Transforms Modern Applications

Traditional recommendation systems lag behind data changes, creating stale results and missed opportunities. **TiDB's real-time vector search eliminates this gap entirely** - every data change instantly updates search results without manual intervention.

The magic happens through **semantic understanding at scale**. A user who "likes sports" automatically gets recommendations for "basketball shoes" and "yoga equipment" even when products never mention "sports". This AI-powered personalization was previously exclusive to tech giants.

**Production-ready performance meets developer simplicity.** Add thousands of products, update descriptions, or remove items while serving live recommendations. Control precision with a single parameter, maintain data consistency with atomic transactions.

The result? Applications that feel **alive and responsive** rather than static and outdated.

---

## Related Resources

- **Source Code**: [View on GitHub](https://github.com/pingcap/pytidb/tree/main/examples/realtime_vector_search)
- **TiDB Vector Documentation**: [Vector Data Types](https://docs.pingcap.com/tidb/stable/vector-search-overview)
- **Auto-Embedding Guide**: [Built-in Models Tutorial](https://docs.pingcap.com/tidb/stable/vector-search-embedding-models)
- **Hands-on Lab**: [Build Real-time Apps Using Jupyter Notebook](https://labs.tidb.io/lab?preview=demo_412) (75 min)

Ready to build real-time recommendation systems? Start with the complete example in the GitHub repository and see how TiDB's vector search can power your next intelligent application.