import { Search, Image, Layers, Sparkles, Zap, Shield, Activity } from 'lucide-react'
import { Feature, AdditionalFeature } from '@/types'

export const features: Feature[] = [
  {
    icon: Search,
    title: 'Semantic Search & RAG',
    description: 'Intelligent search with vector embeddings.',
    details: [
      'Vector similarity search with embeddings',
      'Hybrid queries combining vector + text',
      'RAG applications with context retrieval',
      'OpenAI embeddings integration'
    ],
    color: 'from-blue-500 to-blue-600',
    videoUrl: '/videos/vector-search.mp4',
    codeUrl: 'https://github.com/pingcap/pytidb/tree/main/examples/vector_search',
    code: `class Chunk(TableModel):
    __tablename__ = "chunks"

    id: int = Field(primary_key=True)
    text: str = Field()
    text_vec: list[float] = text_embed.VectorField(
        source_field="text",
    )
    meta: dict = Field(sa_type=JSON)

table = db.create_table(schema=Chunk, if_exists="overwrite")

results = (
    table.search(query_text)
    .debug(True)
    .filter({"meta.language": language})
    .distance_threshold(distance_threshold)
    .limit(query_limit)
    .to_list()
)`
  },
  {
    icon: Image,
    title: 'Image & Text Search',
    description: 'Search images and text with CLIP embeddings.',
    details: [
      'CLIP embeddings for multimodal search',
      'Cross-modal similarity matching',
      'Image and text unified search',
      'Visual content understanding'
    ],
    color: 'from-green-500 to-green-600',
    videoUrl: '/videos/image-search.mp4',
    codeUrl: 'https://github.com/pingcap/pytidb/tree/main/examples/image_search',
    code: `class Pet(TableModel):
    __tablename__ = "pets"

    id: int = Field(primary_key=True)
    breed: str = Field()
    image_uri: str = Field()
    image_name: str = Field()
    image_vec: Optional[List[float]] = embed_fn.VectorField(
        distance_metric=DistanceMetric.L2,
        source_field="image_uri",
        source_type="image",
    )

results = (
    table.search(query="fluffy orange cat")
    .distance_metric(DistanceMetric.L2)
    .limit(limit)
    .to_list()
)`
  },
  {
    icon: Layers,
    title: 'Hybrid Search',
    description: 'Vector + full-text + structured filtering.',
    details: [
      'Vector + full-text combination',
      'Weighted scoring algorithms',
      'Structured data filtering',
      'Multi-criteria relevance ranking'
    ],
    color: 'from-purple-500 to-purple-600',
    videoUrl: '/videos/hybrid-search.mp4',
    codeUrl: 'https://github.com/pingcap/pytidb/tree/main/examples/hybrid_search',
    code: `# Define table schema
class Document(TableModel):
    __tablename__ = "documents"

    id: int = Field(primary_key=True)
    text: str = FullTextField()
    text_vec: list[float] = embed_fn.VectorField(
        source_field="text",
    )
    meta: dict = Field(sa_type=JSON)

query = (
    table.search(query_text, search_type="hybrid")
    .distance_threshold(0.8)
    .fusion(method="rrf")
    .limit(limit)
)`
  },
  {
    icon: Sparkles,
    title: 'Auto Embedding',
    description: 'Auto-generate embeddings with built-in models.',
    details: [
      'Automatic embedding generation',
      'Built-in embedding models',
      'Real-time embedding updates',
      'Zero-maintenance vector search'
    ],
    color: 'from-pink-500 to-pink-600',
    videoUrl: '/videos/auto-embedding.mp4',
    codeUrl: 'https://github.com/pingcap/pytidb/tree/main/examples/auto_embedding',
    code: `# Define embedding function
embed_func = EmbeddingFunction(
    model_name="tidbcloud_free/amazon/titan-embed-text-v2"
    # No API key required for TiDB Cloud free models
)

class Chunk(TableModel):
    __tablename__ = "chunks"

    id: int = Field(primary_key=True)
    text: str = Field(sa_type=TEXT)
    text_vec: list[float] = embed_func.VectorField(source_field="text")

table = db.create_table(schema=Chunk, if_exists="overwrite")

# Insert sample data - embeddings generated automatically
table.bulk_insert([
    Chunk(text="TiDB is a distributed database that supports OLTP, OLAP, HTAP and AI workloads."),
    Chunk(text="PyTiDB is a Python library for developers to connect to TiDB."),
    Chunk(text="LlamaIndex is a Python library for building AI-powered applications."),
])`
  },
  {
    icon: Activity,
    title: 'Vector Search with Realtime Data',
    description: 'Live recommendations with auto-embedding updates.',
    details: [
      'Real-time data updates and re-indexing',
      'Auto-embedding for live product recommendations',
      'Dynamic similarity scoring with distance thresholds',
      'Interactive admin panel for data management'
    ],
    color: 'from-orange-500 to-orange-600',
    videoUrl: '/videos/realtime-vector-search.mp4',
    codeUrl: 'https://github.com/pingcap/pytidb/tree/main/examples/realtime_vector_search',
    code: `class Product(TableModel):
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

# App-1 is inserting strings and vectors are auto-generated in real-time
table.insert(Product(
    name="Professional Basketball",
    description="High-quality basketball for professional and amateur players",
    category="Sports",
    price=29.99
))

# App-2 is searching at once using semantic similarity with user preferences
recommendations = (
    table.search(user_profile)
    .distance_threshold(distance_threshold)
    .limit(5)
    .to_list()
)`
  }
]

export const additionalFeatures: AdditionalFeature[] = [
  {
    icon: Layers,
    title: 'Hybrid Queries',
    description: 'Combine vector similarity, full-text search, and structured data filtering in a single query for the most relevant results.',
    code: "SELECT id, title, VEC_COSINE_DISTANCE(embedding, %s) * 0.7 + MATCH(title, content) AGAINST (%s) * 0.3 as score FROM documents WHERE category = 'technology' ORDER BY score DESC LIMIT 20;"
  },
  {
    icon: Zap,
    title: 'Real-time Analytics',
    description: 'Process and analyze data in real-time with HTAP capabilities for both transactional and analytical workloads.'
  },
  {
    icon: Shield,
    title: 'Enterprise Ready',
    description: 'Built-in security, compliance, and scalability features for production AI applications.'
  }
]