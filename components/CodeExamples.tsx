'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

const examples = [
  {
    id: 'vector',
    title: 'Vector Search',
    description: 'Simple vector similarity search with MySQL syntax',
    code: `-- Vector similarity search with MySQL syntax
SELECT
    content,
    title,
    VEC_COSINE_DISTANCE(embedding, %s) as similarity
FROM documents
WHERE VEC_COSINE_DISTANCE(embedding, %s) < 0.5
ORDER BY similarity DESC
LIMIT 10;

-- Or use the simplified function
SELECT content FROM documents
ORDER BY VEC_COSINE_DISTANCE(
    embedding,
    VEC_FROM_TEXT('AI database for developers')
)
LIMIT 5;`
  },
  {
    id: 'hybrid',
    title: 'Hybrid Query',
    description: 'Combine vector and full-text search in one query',
    code: `-- Hybrid search: Vector + Full-text + SQL filters
SELECT
    doc_id,
    title,
    content,
    VEC_COSINE_DISTANCE(embedding, %s) * 0.7 +
    MATCH(title, content) AGAINST (%s) * 0.3 as combined_score
FROM documents
WHERE
    category = 'technology'
    AND created_at > DATE_SUB(NOW(), INTERVAL 30 DAY)
    AND (
        VEC_COSINE_DISTANCE(embedding, %s) < 0.6
        OR MATCH(title, content) AGAINST (%s IN NATURAL LANGUAGE MODE)
    )
ORDER BY combined_score DESC
LIMIT 20;`
  },
  {
    id: 'python',
    title: 'Python Client',
    description: 'Get started with the TiDB Python client',
    code: `import tidb_vector as tv
from openai import OpenAI

# Connect to TiDB Cloud
client = tv.connect(
    host="gateway01.us-west-2.prod.aws.tidbcloud.com",
    user="your_username",
    password="your_password",
    database="your_database"
)

# Create table with vector column
client.execute("""
    CREATE TABLE IF NOT EXISTS documents (
        id INT AUTO_INCREMENT PRIMARY KEY,
        content TEXT,
        embedding VECTOR(1536) COMMENT 'hnsw(distance=cosine)',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""")

# Insert with auto-embedding
openai_client = OpenAI()

def get_embedding(text):
    response = openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding

# Insert documents
documents = [
    "TiDB is a distributed SQL database",
    "Vector search enables semantic queries",
    "MySQL compatibility means easy migration"
]

for doc in documents:
    embedding = get_embedding(doc)
    client.execute(
        "INSERT INTO documents (content, embedding) VALUES (%s, %s)",
        (doc, embedding)
    )

# Semantic search
query = "database for AI applications"
query_embedding = get_embedding(query)

results = client.execute("""
    SELECT content, VEC_COSINE_DISTANCE(embedding, %s) as similarity
    FROM documents
    ORDER BY similarity DESC
    LIMIT 3
""", (query_embedding,))

for row in results:
    print(f"Content: {row[0]}, Similarity: {row[1]:.4f}")`
  },
  {
    id: 'langchain',
    title: 'LangChain Integration',
    description: 'Build AI agents with LangChain and TiDB',
    code: `from langchain_community.vectorstores import TiDBVectorStore
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.agents import initialize_agent, Tool
from langchain.sql_database import SQLDatabase

# Initialize TiDB connections
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

# Vector store for semantic search
vector_store = TiDBVectorStore(
    connection_string="mysql://user:pass@host:4000/db",
    embedding_function=embeddings,
    table_name="knowledge_base",
    distance_strategy="cosine"
)

# SQL database for structured queries
sql_db = SQLDatabase.from_uri("mysql://user:pass@host:4000/db")

# Define tools for the agent
def semantic_search(query: str) -> str:
    """Search the knowledge base using semantic similarity."""
    docs = vector_store.similarity_search(query, k=5)
    return "\\n".join([doc.page_content for doc in docs])

def sql_query(query: str) -> str:
    """Execute SQL queries on structured data."""
    try:
        result = sql_db.run(query)
        return str(result)
    except Exception as e:
        return f"Error: {str(e)}"

# Create agent tools
tools = [
    Tool(
        name="SemanticSearch",
        func=semantic_search,
        description="Search knowledge base using natural language"
    ),
    Tool(
        name="SQLQuery",
        func=sql_query,
        description="Query structured data using SQL"
    )
]

# Initialize the agent
llm = ChatOpenAI(model="gpt-4", temperature=0)
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent="zero-shot-react-description",
    verbose=True
)

# Use the agent
response = agent.run(
    "Find information about vector databases and show me the latest user signups"
)
print(response)`
  }
]

export default function CodeExamples() {
  const [activeExample, setActiveExample] = useState('vector')
  const [copiedCode, setCopiedCode] = useState('')

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(code)
      setTimeout(() => setCopiedCode(''), 2000)
    } catch (err) {
      // Silent failure for better UX
    }
  }

  const activeExampleData = examples.find(ex => ex.id === activeExample)

  return (
    <section id="examples" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Get Started in Minutes
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Simple APIs that feel familiar to MySQL developers but unlock powerful AI capabilities.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Example Tabs */}
          <div className="lg:col-span-4">
            <div className="space-y-3 sticky top-24">
              {examples.map((example) => (
                <button
                  key={example.id}
                  onClick={() => setActiveExample(example.id)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${
                    activeExample === example.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 shadow-lg'
                      : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900'
                  }`}
                >
                  <h3 className={`text-lg font-bold mb-2 ${
                    activeExample === example.id
                      ? 'text-blue-900 dark:text-blue-100'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {example.title}
                  </h3>
                  <p className={`text-sm ${
                    activeExample === example.id
                      ? 'text-blue-700 dark:text-blue-200'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}>
                    {example.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Code Display */}
          <div className="lg:col-span-8">
            {activeExampleData && (
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-300 text-sm font-medium">
                      {activeExampleData.title.toLowerCase().replace(' ', '_')}.{
                        activeExampleData.id === 'vector' || activeExampleData.id === 'hybrid' ? 'sql' : 'py'
                      }
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(activeExampleData.code)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors text-sm"
                  >
                    {copiedCode === activeExampleData.code ? (
                      <>
                        <Check size={16} className="text-green-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                {/* Code Content */}
                <div className="p-6 overflow-x-auto">
                  <pre className="text-sm text-gray-100 leading-relaxed">
                    <code>
                      {activeExampleData.code.split('\n').map((line, index) => {
                        // Simple syntax highlighting
                        let highlightedLine = line

                        if (activeExampleData.id === 'vector' || activeExampleData.id === 'hybrid') {
                          // SQL highlighting
                          highlightedLine = line
                            .replace(/\b(SELECT|FROM|WHERE|ORDER BY|LIMIT|INSERT|CREATE|TABLE|AND|OR|DESC|ASC)\b/g,
                              '<span class="text-blue-400">$1</span>')
                            .replace(/\b(VEC_COSINE_DISTANCE|MATCH|AGAINST|VEC_FROM_TEXT)\b/g,
                              '<span class="text-green-400">$1</span>')
                            .replace(/'([^']*)'/g, '<span class="text-orange-400">\'$1\'</span>')
                            .replace(/--.*$/g, '<span class="text-gray-500">$&</span>')
                        } else {
                          // Python highlighting
                          highlightedLine = line
                            .replace(/\b(import|from|def|class|if|else|elif|for|while|try|except|return|with|as)\b/g,
                              '<span class="text-blue-400">$1</span>')
                            .replace(/\b(client|embeddings|vector_store|sql_db|agent|llm)\b/g,
                              '<span class="text-yellow-400">$1</span>')
                            .replace(/"([^"]*)"/g, '<span class="text-orange-400">"$1"</span>')
                            .replace(/'([^']*)'/g, '<span class="text-orange-400">\'$1\'</span>')
                            .replace(/#.*$/g, '<span class="text-gray-500">$&</span>')
                        }

                        return (
                          <div key={index} dangerouslySetInnerHTML={{ __html: highlightedLine }} />
                        )
                      })}
                    </code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Start Links */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Ready to dive deeper?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-semibold">
              View Full Documentation
            </button>
            <button className="border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-xl hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors font-semibold">
              Browse Example Gallery
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}