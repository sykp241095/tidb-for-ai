export const INSTALL_COMMANDS = {
  pip: 'pip install pytidb',
  npm: 'npm install @tidbcloud/serverless',
  docker: 'docker run -p 4000:4000 pingcap/tidb:latest',
} as const

export const CODE_EXAMPLES = {
  python: {
    vectorSearch: `# Vector search with TiDB
import tidb_vector as tv
from openai import OpenAI

client = tv.connect("mysql://user:pass@host:4000/db")
openai_client = OpenAI()

def search_documents(query, limit=5):
    # Get embedding for query
    query_embedding = openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=query
    ).data[0].embedding

    # Search similar documents
    return client.execute("""
        SELECT title, content,
               VEC_COSINE_DISTANCE(embedding, %s) as similarity
        FROM documents
        WHERE VEC_COSINE_DISTANCE(embedding, %s) < 0.8
        ORDER BY similarity ASC LIMIT %s
    """, (query_embedding, query_embedding, limit))`,

    hybridSearch: `# Hybrid search combining vector + full-text
def hybrid_search(query, limit=10):
    query_embedding = openai_client.embeddings.create(
        model="text-embedding-3-small", input=query
    ).data[0].embedding

    return client.execute("""
        SELECT title, content,
               (1 - VEC_COSINE_DISTANCE(embedding, %s)) * 0.7 +
               MATCH(title, content) AGAINST (%s) * 0.3 as score
        FROM documents
        WHERE VEC_COSINE_DISTANCE(embedding, %s) < 0.8
           OR MATCH(title, content) AGAINST (%s) > 0
        ORDER BY score DESC LIMIT %s
    """, (query_embedding, query, query_embedding, query, limit))`,
  },
} as const