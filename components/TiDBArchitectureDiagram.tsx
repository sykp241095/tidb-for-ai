'use client'

import React, { useCallback, useMemo } from 'react'
import {
  ReactFlow,
  Node,
  Edge,
  Controls,
  Background,
  ConnectionMode,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Handle,
  Position,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Database, Globe, BarChart3, Zap, Users, Search } from 'lucide-react'

// Custom Node Components
const ApplicationNode = ({ data }: { data: any }) => (
  <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white shadow-lg border-2 border-blue-400 min-w-[200px]">
    <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    <div className="flex items-center gap-2 mb-2">
      <Globe size={20} />
      <h3 className="font-bold text-lg">{data.label}</h3>
    </div>
    <p className="text-blue-100 text-sm">{data.description}</p>
  </div>
)

const TiDBNode = ({ data }: { data: any }) => (
  <div className="px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white shadow-lg border-2 border-green-400 min-w-[250px]">
    <Handle type="target" position={Position.Top} className="w-3 h-3" />
    <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    <div className="flex items-center gap-2 mb-2">
      <Database size={24} />
      <h3 className="font-bold text-xl">{data.label}</h3>
    </div>
    <p className="text-green-100 text-sm">{data.description}</p>
    <div className="mt-2 text-xs text-green-200">
      • MySQL Protocol Compatible<br/>
      • Distributed SQL Processing<br/>
      • Vector & Full-text Search
    </div>
  </div>
)

const StorageNode = ({ data }: { data: any }) => (
  <div className="px-5 py-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-white shadow-lg border-2 border-purple-400 min-w-[180px]">
    <Handle type="target" position={Position.Top} className="w-3 h-3" />
    <div className="flex items-center gap-2 mb-2">
      <BarChart3 size={20} />
      <h3 className="font-bold">{data.label}</h3>
    </div>
    <p className="text-purple-100 text-xs">{data.description}</p>
  </div>
)

const AnalyticsNode = ({ data }: { data: any }) => (
  <div className="px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-white shadow-lg border-2 border-orange-400 min-w-[180px]">
    <Handle type="target" position={Position.Top} className="w-3 h-3" />
    <div className="flex items-center gap-2 mb-2">
      <Zap size={20} />
      <h3 className="font-bold">{data.label}</h3>
    </div>
    <p className="text-orange-100 text-xs">{data.description}</p>
  </div>
)

const VectorNode = ({ data }: { data: any }) => (
  <div className="px-5 py-3 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg text-white shadow-lg border-2 border-pink-400 min-w-[180px]">
    <Handle type="target" position={Position.Top} className="w-3 h-3" />
    <div className="flex items-center gap-2 mb-2">
      <Search size={20} />
      <h3 className="font-bold">{data.label}</h3>
    </div>
    <p className="text-pink-100 text-xs">{data.description}</p>
  </div>
)

const UserNode = ({ data }: { data: any }) => (
  <div className="px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg text-white shadow-lg border-2 border-gray-500 min-w-[150px]">
    <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    <div className="flex items-center gap-2 mb-1">
      <Users size={18} />
      <h3 className="font-bold text-sm">{data.label}</h3>
    </div>
    <p className="text-gray-300 text-xs">{data.description}</p>
  </div>
)

const nodeTypes = {
  application: ApplicationNode,
  tidb: TiDBNode,
  storage: StorageNode,
  analytics: AnalyticsNode,
  vector: VectorNode,
  user: UserNode,
}

const TiDBArchitectureDiagram: React.FC = () => {
  const initialNodes: Node[] = useMemo(() => [
    // Users/Applications Layer
    {
      id: 'users',
      type: 'user',
      position: { x: 100, y: 50 },
      data: { label: 'Developers', description: 'AI App Developers' },
    },
    {
      id: 'app1',
      type: 'application',
      position: { x: 300, y: 50 },
      data: { label: 'AI Applications', description: 'RAG, Chatbots, Recommendations' },
    },
    {
      id: 'app2',
      type: 'application',
      position: { x: 600, y: 50 },
      data: { label: 'Traditional Apps', description: 'E-commerce, CRM, Analytics' },
    },

    // TiDB SQL Layer
    {
      id: 'tidb',
      type: 'tidb',
      position: { x: 350, y: 200 },
      data: {
        label: 'TiDB (SQL Layer)',
        description: 'Distributed SQL Database with AI Capabilities'
      },
    },

    // Storage and Processing Layers
    {
      id: 'tikv',
      type: 'storage',
      position: { x: 150, y: 350 },
      data: {
        label: 'TiKV',
        description: 'Distributed Transactional Storage'
      },
    },
    {
      id: 'tiflash',
      type: 'analytics',
      position: { x: 350, y: 350 },
      data: {
        label: 'TiFlash',
        description: 'Columnar Analytics Engine'
      },
    },
    {
      id: 'vector',
      type: 'vector',
      position: { x: 550, y: 350 },
      data: {
        label: 'Vector Engine',
        description: 'AI Vector Search & Embeddings'
      },
    },
  ], [])

  const initialEdges: Edge[] = useMemo(() => [
    // User connections
    { id: 'users-app1', source: 'users', target: 'app1', type: 'smoothstep' },
    { id: 'users-app2', source: 'users', target: 'app2', type: 'smoothstep' },

    // Application to TiDB connections
    { id: 'app1-tidb', source: 'app1', target: 'tidb', type: 'smoothstep', label: 'MySQL Protocol' },
    { id: 'app2-tidb', source: 'app2', target: 'tidb', type: 'smoothstep', label: 'MySQL Protocol' },

    // TiDB to storage layer connections
    {
      id: 'tidb-tikv',
      source: 'tidb',
      target: 'tikv',
      type: 'smoothstep',
      label: 'OLTP Queries',
      style: { stroke: '#8b5cf6' }
    },
    {
      id: 'tidb-tiflash',
      source: 'tidb',
      target: 'tiflash',
      type: 'smoothstep',
      label: 'OLAP Queries',
      style: { stroke: '#f97316' }
    },
    {
      id: 'tidb-vector',
      source: 'tidb',
      target: 'vector',
      type: 'smoothstep',
      label: 'Vector Queries',
      style: { stroke: '#ec4899' }
    },
  ], [])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  return (
    <div className="w-full h-[600px] bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        className="bg-gray-50 dark:bg-gray-900"
      >
        <Background color="#9ca3af" gap={20} />
        <Controls
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
        />
      </ReactFlow>
    </div>
  )
}

export default TiDBArchitectureDiagram