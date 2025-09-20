'use client'

import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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
  <motion.div
    className="px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white shadow-lg border-2 border-blue-400 min-w-[200px]"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
  >
    <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    <div className="flex items-center gap-2 mb-2">
      <Globe size={20} className="animate-pulse" />
      <h3 className="font-bold text-lg">{data.label}</h3>
    </div>
    <p className="text-blue-100 text-sm">{data.description}</p>
  </motion.div>
)

const TiDBNode = ({ data }: { data: any }) => (
  <motion.div
    className="px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white shadow-lg border-2 border-green-400 min-w-[250px]"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.7, delay: 0.2 }}
    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.5)" }}
  >
    <Handle type="target" position={Position.Top} className="w-3 h-3" />
    <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    <div className="flex items-center gap-2 mb-2">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <Database size={24} />
      </motion.div>
      <h3 className="font-bold text-xl">{data.label}</h3>
    </div>
    <p className="text-green-100 text-sm">{data.description}</p>
    <div className="mt-2 text-xs text-green-200">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}>
        • MySQL Protocol Compatible
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.5 }}>
        • Distributed SQL Processing
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.5 }}>
        • Vector & Full-text Search
      </motion.div>
    </div>
  </motion.div>
)

const StorageNode = ({ data }: { data: any }) => (
  <motion.div
    className="px-5 py-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-white shadow-lg border-2 border-purple-400 min-w-[220px]"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.4 }}
    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.5)" }}
  >
    <Handle type="target" position={Position.Top} className="w-3 h-3" />
    <div className="flex items-center gap-2 mb-2">
      <Database size={20} />
      <h3 className="font-bold">{data.label}</h3>
    </div>
    <p className="text-purple-100 text-xs mb-3">{data.description}</p>

    <motion.div
      className="mt-2 bg-purple-700/50 rounded-md p-2"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.6 }}
    >
      <p className="text-purple-100 text-xs font-medium mb-2">Distributed Cluster (3+ nodes)</p>
      <div className="flex justify-around gap-1">
        <motion.div
          className="bg-purple-800 rounded p-1 flex flex-col items-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        >
          <Database size={14} className="text-purple-300" />
          <span className="text-[10px] text-purple-300">TiKV 1</span>
        </motion.div>
        <motion.div
          className="bg-purple-800 rounded p-1 flex flex-col items-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.9 }}
        >
          <Database size={14} className="text-purple-300" />
          <span className="text-[10px] text-purple-300">TiKV 2</span>
        </motion.div>
        <motion.div
          className="bg-purple-800 rounded p-1 flex flex-col items-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 1.0 }}
        >
          <Database size={14} className="text-purple-300" />
          <span className="text-[10px] text-purple-300">TiKV 3</span>
        </motion.div>
      </div>
    </motion.div>
  </motion.div>
)

const AnalyticsNode = ({ data }: { data: any }) => (
  <motion.div
    className="px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-white shadow-lg border-2 border-orange-400 min-w-[180px]"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.5 }}
    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.5)" }}
  >
    <Handle type="target" position={Position.Top} className="w-3 h-3" />
    <div className="flex items-center gap-2 mb-2">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Zap size={20} className="text-yellow-300" />
      </motion.div>
      <h3 className="font-bold">{data.label}</h3>
    </div>
    <p className="text-orange-100 text-xs">{data.description}</p>
  </motion.div>
)

const VectorNode = ({ data }: { data: any }) => (
  <motion.div
    className="px-5 py-3 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg text-white shadow-lg border-2 border-pink-400 min-w-[180px]"
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.6 }}
    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.5)" }}
  >
    <Handle type="target" position={Position.Top} className="w-3 h-3" />
    <div className="flex items-center gap-2 mb-2">
      <motion.div
        animate={{ rotate: [-10, 10, -10] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Search size={20} />
      </motion.div>
      <h3 className="font-bold">{data.label}</h3>
    </div>
    <p className="text-pink-100 text-xs">{data.description}</p>
  </motion.div>
)

const UserNode = ({ data }: { data: any }) => (
  <motion.div
    className="px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg text-white shadow-lg border-2 border-gray-500 min-w-[150px]"
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(107, 114, 128, 0.5)" }}
  >
    <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    <div className="flex items-center gap-2 mb-1">
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Users size={18} />
      </motion.div>
      <h3 className="font-bold text-sm">{data.label}</h3>
    </div>
    <p className="text-gray-300 text-xs">{data.description}</p>
  </motion.div>
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
  // Animation trigger state
  const [animate, setAnimate] = useState(false)

  // Start animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])
  const initialNodes: Node[] = useMemo(() => [
    // Users/Applications Layer
    {
      id: 'users',
      type: 'user',
      position: { x: 50, y: 50 },
      data: { label: 'Developers', description: 'AI App Developers' },
    },
    {
      id: 'app1',
      type: 'application',
      position: { x: 450, y: 50 },
      data: { label: 'AI Applications', description: 'RAG, Chatbots, Recommendations' },
    },
    {
      id: 'app2',
      type: 'application',
      position: { x: 900, y: 50 },
      data: { label: 'Traditional Apps', description: 'E-commerce, CRM, Analytics' },
    },

    // TiDB SQL Layer
    {
      id: 'tidb',
      type: 'tidb',
      position: { x: 450, y: 200 },
      data: {
        label: 'TiDB (SQL Layer)',
        description: 'Distributed SQL Database with AI Capabilities'
      },
    },

    // Storage and Processing Layers
    {
      id: 'tikv',
      type: 'storage',
      position: { x: 100, y: 400 },
      data: {
        label: 'TiKV',
        description: 'Distributed Transactional Storage with Replication'
      },
    },
    {
      id: 'tiflash',
      type: 'analytics',
      position: { x: 450, y: 400 },
      data: {
        label: 'TiFlash',
        description: 'Columnar Analytics Engine'
      },
    },
    {
      id: 'vector',
      type: 'vector',
      position: { x: 800, y: 400 },
      data: {
        label: 'Vector Engine',
        description: 'AI Vector Search & Embeddings'
      },
    },
  ], [])

  const initialEdges: Edge[] = useMemo(() => [
    // User connections
    { id: 'users-app1', source: 'users', target: 'app1', type: 'smoothstep', animated: true },
    { id: 'users-app2', source: 'users', target: 'app2', type: 'smoothstep', animated: true },

    // Application to TiDB connections
    { id: 'app1-tidb', source: 'app1', target: 'tidb', type: 'smoothstep', label: 'MySQL Protocol', animated: true },
    { id: 'app2-tidb', source: 'app2', target: 'tidb', type: 'smoothstep', label: 'MySQL Protocol', animated: true },

    // TiDB to storage layer connections
    {
      id: 'tidb-tikv',
      source: 'tidb',
      target: 'tikv',
      type: 'smoothstep',
      label: 'OLTP Queries',
      style: { stroke: '#8b5cf6' },
      animated: true
    },
    {
      id: 'tidb-tiflash',
      source: 'tidb',
      target: 'tiflash',
      type: 'smoothstep',
      label: 'OLAP Queries',
      style: { stroke: '#f97316' },
      animated: true
    },
    {
      id: 'tidb-vector',
      source: 'tidb',
      target: 'vector',
      type: 'smoothstep',
      label: 'Vector Queries',
      style: { stroke: '#ec4899' },
      animated: true
    },
  ], [])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const resetAnimation = () => {
    setAnimate(false)
    setTimeout(() => setAnimate(true), 100)
  }

  return (
    <div className="w-full h-[600px] bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-auto relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        fitViewOptions={{ padding: 0.5 }}
        style={{ width: '100%', height: '100%', minWidth: '1200px' }}
        className="bg-gray-50 dark:bg-gray-900 w-full"
      >
        <Background color="#9ca3af" gap={20} />
        <Controls
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
        />
      </ReactFlow>

      {/* Animation Control Button */}
      <motion.button
        className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-10"
        onClick={resetAnimation}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-play-circle">
          <circle cx="12" cy="12" r="10"></circle>
          <polygon points="10 8 16 12 10 16 10 8"></polygon>
        </svg>
        Play Animation
      </motion.button>
    </div>
  )
}

export default TiDBArchitectureDiagram