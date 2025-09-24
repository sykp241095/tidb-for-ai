# Image Search

Build multimodal search applications that understand both images and text using CLIP embeddings. Perfect for e-commerce, content management, and visual discovery.

## Setup Image Search

```python
from pytidb import Field, TableModel, DistanceMetric
from pytidb.integrations import embed_fn
from typing import Optional, List

class Pet(TableModel):
    __tablename__ = "pets"

    id: int = Field(primary_key=True)
    breed: str = Field()
    image_uri: str = Field()
    image_name: str = Field()
    image_vec: Optional[List[float]] = embed_fn.VectorField(
        distance_metric=DistanceMetric.L2,
        source_field="image_uri",
        source_type="image",  # Specify image processing
    )

# Create table
table = db.create_table(schema=Pet, if_exists="overwrite")
```

## Text-to-Image Search

Search for images using natural language descriptions:

```python
# Insert image data
pets_data = [
    {
        "breed": "Golden Retriever",
        "image_uri": "https://example.com/golden-retriever.jpg",
        "image_name": "fluffy_dog.jpg"
    },
    {
        "breed": "Persian Cat",
        "image_uri": "https://example.com/persian-cat.jpg",
        "image_name": "white_cat.jpg"
    }
]
table.insert_many(pets_data)

# Search images with text
results = (
    table.search(query="fluffy orange cat")
    .distance_metric(DistanceMetric.L2)
    .limit(5)
    .to_list()
)

for result in results:
    print(f"Breed: {result.breed}")
    print(f"Image: {result.image_name}")
    print(f"Similarity Score: {result.distance}")
```

## Image-to-Image Search

Find similar images by uploading a reference image:

```python
def find_similar_images(reference_image_path: str, limit: int = 10):
    # Search using image as query
    results = (
        table.search_by_image(reference_image_path)
        .distance_metric(DistanceMetric.COSINE)
        .limit(limit)
        .to_list()
    )
    return results
```

## Advanced Multimodal Queries

### Combine Text and Visual Filters

```python
class Product(TableModel):
    __tablename__ = "products"

    id: int = Field(primary_key=True)
    name: str = Field()
    description: str = Field()
    price: float = Field()
    category: str = Field()
    image_uri: str = Field()
    image_vec: List[float] = embed_fn.VectorField(
        source_field="image_uri",
        source_type="image"
    )
    text_vec: List[float] = embed_fn.VectorField(
        source_field="description"
    )

# Multi-modal search with filters
def search_products(
    text_query: str = None,
    image_query: str = None,
    category: str = None,
    price_range: tuple = None
):
    if text_query and image_query:
        # Hybrid multimodal search
        results = table.search_multimodal(
            text=text_query,
            image=image_query,
            fusion_method="weighted",
            text_weight=0.6,
            image_weight=0.4
        )
    elif text_query:
        results = table.search(text_query, field="description")
    elif image_query:
        results = table.search_by_image(image_query)

    # Apply filters
    if category:
        results = results.filter(Product.category == category)

    if price_range:
        min_price, max_price = price_range
        results = results.filter(
            Product.price.between(min_price, max_price)
        )

    return results.limit(20).to_list()
```

## Working with Different Image Formats

```python
# Support various image sources
image_sources = [
    "https://example.com/image.jpg",  # URL
    "/path/to/local/image.png",       # Local file
    "data:image/jpeg;base64,/9j/...", # Base64 data URL
    open("image.jpg", "rb").read()     # Raw bytes
]

for image_source in image_sources:
    results = table.search_by_image(image_source).limit(5).to_list()
```

## Performance Optimization

### Batch Image Processing

```python
# Process multiple images efficiently
image_batch = [
    {"id": 1, "image_uri": "image1.jpg"},
    {"id": 2, "image_uri": "image2.jpg"},
    {"id": 3, "image_uri": "image3.jpg"}
]

# Embeddings are computed automatically during insertion
table.insert_many(image_batch)
```

### Caching and CDN Integration

```python
class OptimizedImage(TableModel):
    __tablename__ = "optimized_images"

    id: int = Field(primary_key=True)
    original_uri: str = Field()
    thumbnail_uri: str = Field()  # For faster preview
    cdn_uri: str = Field()        # CDN optimized version
    image_vec: List[float] = embed_fn.VectorField(
        source_field="cdn_uri",   # Use CDN for embeddings
        source_type="image"
    )
    width: int = Field()
    height: int = Field()
    file_size: int = Field()
```

## Use Cases

- **E-commerce**: "Find shoes similar to this image"
- **Content Management**: "Locate all photos with mountains"
- **Social Media**: "Discover similar lifestyle images"
- **Medical Imaging**: "Find similar scan patterns"