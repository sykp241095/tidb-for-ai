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
import {
  Database,
  Cloud,
  FileText,
  BarChart3,
  Zap,
  Search,
  Brain,
  Bot,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Cpu,
  Network,
  Layers,
  Sparkles,
  MessageSquare,
  Image,
  Video,
  Music,
  Code,
  Table
} from 'lucide-react'

// Custom Node Components
const DataSourceNode = ({ data }: { data: any }) => (
  <motion.div
    className="px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white shadow-lg border-2 border-blue-400 min-w-[180px]"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
  >
    <Handle type="source" position={Position.Right} id="right" className="w-3 h-3 bg-blue-300 border-2 border-blue-500" />
    <div className="flex items-center gap-2 mb-2">
      {data.icon}
      <h3 className="font-bold text-sm">{data.label}</h3>
    </div>
    <p className="text-blue-100 text-xs">{data.description}</p>
    {data.subtitle && (
      <div className="mt-1 text-xs text-blue-200 opacity-80">
        {data.subtitle}
      </div>
    )}
  </motion.div>
)

const TiDBCoreNode = ({ data }: { data: any }) => (
  <motion.div
    className="px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white shadow-lg border-2 border-green-400 min-w-[280px] relative"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.7, delay: 0.2 }}
    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.5)" }}
  >
    <Handle type="target" position={Position.Left} id="left" className="w-3 h-3 bg-green-300 border-2 border-green-500" />
    <Handle type="source" position={Position.Right} id="right" className="w-3 h-3 bg-green-300 border-2 border-green-500" />

    {/* Central glowing effect */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-lg opacity-30 blur-xl"
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />

    <div className="relative z-10">
      <div className="flex items-center gap-2 mb-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <Database size={24} />
        </motion.div>
        <h3 className="font-bold text-xl">{data.label}</h3>
      </div>
      <p className="text-green-100 text-sm mb-3">{data.description}</p>

      <div className="mt-3 space-y-1 text-xs text-green-200">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <Cpu size={14} /> HTAP (Hybrid Transactional/Analytical Processing)
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <Search size={14} /> Vector Search & Embeddings
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <FileText size={14} /> Full-Text Search
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <Network size={14} /> MySQL Compatible
        </motion.div>
      </div>
    </div>
  </motion.div>
)

const AIApplicationNode = ({ data }: { data: any }) => (
  <motion.div
    className="px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-white shadow-lg border-2 border-purple-400 min-w-[180px]"
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.5)" }}
  >
    <Handle type="target" position={Position.Left} id="left" className="w-3 h-3 bg-purple-300 border-2 border-purple-500" />
    <div className="flex items-center gap-2 mb-2">
      {data.icon}
      <h3 className="font-bold text-sm">{data.label}</h3>
    </div>
    <p className="text-purple-100 text-xs">{data.description}</p>
    {data.subtitle && (
      <div className="mt-1 text-xs text-purple-200 opacity-80">
        {data.subtitle}
      </div>
    )}
  </motion.div>
)

const FlowArrow = ({ data }: { data: any }) => (
  <motion.div
    className="flex items-center justify-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1, duration: 0.5 }}
  >
    <motion.div
      animate={{ x: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <ArrowRight className="text-gray-400" size={32} />
    </motion.div>
  </motion.div>
)

const nodeTypes = {
  dataSource: DataSourceNode,
  tidbCore: TiDBCoreNode,
  aiApplication: AIApplicationNode,
}

const TiDBAIConceptMap: React.FC = () => {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const initialNodes: Node[] = useMemo(() => [
    // Data Sources - Left Column (more spaced out)
    {
      id: 'structured-data',
      type: 'dataSource',
      position: { x: 50, y: 80 },
      data: {
        label: 'Structured Data',
        description: 'Relational databases, SQL tables',
        icon: <Table size={18} />,
        subtitle: 'CRM, ERP, Transactional systems'
      },
    },
    {
      id: 'unstructured-data',
      type: 'dataSource',
      position: { x: 50, y: 200 },
      data: {
        label: 'Unstructured Data',
        description: 'Documents, images, multimedia',
        icon: <FileText size={18} />,
        subtitle: 'PDFs, Office docs, Web content'
      },
    },
    {
      id: 'streaming-data',
      type: 'dataSource',
      position: { x: 50, y: 320 },
      data: {
        label: 'Streaming Data',
        description: 'Real-time data feeds',
        icon: <Zap size={18} />,
        subtitle: 'IoT sensors, Logs, Events'
      },
    },
    {
      id: 'cloud-data',
      type: 'dataSource',
      position: { x: 50, y: 440 },
      data: {
        label: 'Cloud Data',
        description: 'SaaS applications, APIs',
        icon: <Cloud size={18} />,
        subtitle: 'Salesforce, HubSpot, APIs'
      },
    },

    // TiDB Core - Center (positioned to align with data flow)
    {
      id: 'tidb-core',
      type: 'tidbCore',
      position: { x: 380, y: 250 },
      data: {
        label: 'TiDB Core',
        description: 'Unified data processing engine with AI-native capabilities'
      },
    },

    // AI Applications - Right Column (more spaced out)
    {
      id: 'ai-agents',
      type: 'aiApplication',
      position: { x: 800, y: 80 },
      data: {
        label: 'AI Agents',
        description: 'Autonomous intelligent agents',
        icon: <Bot size={18} />,
        subtitle: 'Chatbots, Virtual assistants'
      },
    },
    {
      id: 'rag-systems',
      type: 'aiApplication',
      position: { x: 800, y: 200 },
      data: {
        label: 'RAG Systems',
        description: 'Retrieval-Augmented Generation',
        icon: <Brain size={18} />,
        subtitle: 'Knowledge bases, Q&A systems'
      },
    },
    {
      id: 'real-time-decisioning',
      type: 'aiApplication',
      position: { x: 800, y: 320 },
      data: {
        label: 'Real-time Decisioning',
        description: 'Instant AI-powered decisions',
        icon: <Lightbulb size={18} />,
        subtitle: 'Fraud detection, Recommendations'
      },
    },
    {
      id: 'multimodal-ai',
      type: 'aiApplication',
      position: { x: 800, y: 440 },
      data: {
        label: 'Multimodal AI',
        description: 'Cross-modal understanding',
        icon: <Image size={18} />,
        subtitle: 'Image+text search, Content analysis'
      },
    },
  ], [])

  const initialEdges: Edge[] = useMemo(() => [
    // Data flow connections (visual, not interactive)
    {
      id: 'structured-to-tidb',
      source: 'structured-data',
      target: 'tidb-core',
      sourceHandle: 'right',  // Connect to right handle of source node
      targetHandle: 'left',   // Connect to left handle of target node
      type: 'default',
      animated: true,
      style: { stroke: '#3b82f6', strokeWidth: 3, markerEnd: 'url(#arrowblue)' },
      label: 'SQL Queries',
      labelStyle: { fill: '#3b82f6', fontSize: 12, fontWeight: 'bold' },
      labelBgStyle: { fill: '#ffffff', fillOpacity: 0.8 },
      labelBgPadding: [4, 6],
      labelBgBorderRadius: 4,
    },
    {
      id: 'unstructured-to-tidb',
      source: 'unstructured-data',
      target: 'tidb-core',
      sourceHandle: 'right',
      targetHandle: 'left',
      type: 'default',
      animated: true,
      style: { stroke: '#3b82f6', strokeWidth: 3, markerEnd: 'url(#arrowblue)' },
      label: 'Vector Embeddings',
      labelStyle: { fill: '#3b82f6', fontSize: 12, fontWeight: 'bold' },
      labelBgStyle: { fill: '#ffffff', fillOpacity: 0.8 },
      labelBgPadding: [4, 6],
      labelBgBorderRadius: 4,
    },
    {
      id: 'streaming-to-tidb',
      source: 'streaming-data',
      target: 'tidb-core',
      sourceHandle: 'right',
      targetHandle: 'left',
      type: 'default',
      animated: true,
      style: { stroke: '#3b82f6', strokeWidth: 3, markerEnd: 'url(#arrowblue)' },
      label: 'Real-time Ingestion',
      labelStyle: { fill: '#3b82f6', fontSize: 12, fontWeight: 'bold' },
      labelBgStyle: { fill: '#ffffff', fillOpacity: 0.8 },
      labelBgPadding: [4, 6],
      labelBgBorderRadius: 4,
    },
    {
      id: 'cloud-to-tidb',
      source: 'cloud-data',
      target: 'tidb-core',
      sourceHandle: 'right',
      targetHandle: 'left',
      type: 'default',
      animated: true,
      style: { stroke: '#3b82f6', strokeWidth: 3, markerEnd: 'url(#arrowblue)' },
      label: 'API Integration',
      labelStyle: { fill: '#3b82f6', fontSize: 12, fontWeight: 'bold' },
      labelBgStyle: { fill: '#ffffff', fillOpacity: 0.8 },
      labelBgPadding: [4, 6],
      labelBgBorderRadius: 4,
    },

    // TiDB to AI Applications
    {
      id: 'tidb-to-agents',
      source: 'tidb-core',
      target: 'ai-agents',
      sourceHandle: 'right',
      targetHandle: 'left',
      type: 'default',
      animated: true,
      style: { stroke: '#a855f7', strokeWidth: 3, markerEnd: 'url(#arrowpurple)' },
      label: 'Context & Memory',
      labelStyle: { fill: '#a855f7', fontSize: 12, fontWeight: 'bold' },
      labelBgStyle: { fill: '#ffffff', fillOpacity: 0.8 },
      labelBgPadding: [4, 6],
      labelBgBorderRadius: 4,
    },
    {
      id: 'tidb-to-rag',
      source: 'tidb-core',
      target: 'rag-systems',
      sourceHandle: 'right',
      targetHandle: 'left',
      type: 'default',
      animated: true,
      style: { stroke: '#a855f7', strokeWidth: 3, markerEnd: 'url(#arrowpurple)' },
      label: 'Vector Search',
      labelStyle: { fill: '#a855f7', fontSize: 12, fontWeight: 'bold' },
      labelBgStyle: { fill: '#ffffff', fillOpacity: 0.8 },
      labelBgPadding: [4, 6],
      labelBgBorderRadius: 4,
    },
    {
      id: 'tidb-to-decisioning',
      source: 'tidb-core',
      target: 'real-time-decisioning',
      sourceHandle: 'right',
      targetHandle: 'left',
      type: 'default',
      animated: true,
      style: { stroke: '#a855f7', strokeWidth: 3, markerEnd: 'url(#arrowpurple)' },
      label: 'HTAP Processing',
      labelStyle: { fill: '#a855f7', fontSize: 12, fontWeight: 'bold' },
      labelBgStyle: { fill: '#ffffff', fillOpacity: 0.8 },
      labelBgPadding: [4, 6],
      labelBgBorderRadius: 4,
    },
    {
      id: 'tidb-to-multimodal',
      source: 'tidb-core',
      target: 'multimodal-ai',
      sourceHandle: 'right',
      targetHandle: 'left',
      type: 'default',
      animated: true,
      style: { stroke: '#a855f7', strokeWidth: 3, markerEnd: 'url(#arrowpurple)' },
      label: 'Cross-modal Search',
      labelStyle: { fill: '#a855f7', fontSize: 12, fontWeight: 'bold' },
      labelBgStyle: { fill: '#ffffff', fillOpacity: 0.8 },
      labelBgPadding: [4, 6],
      labelBgBorderRadius: 4,
    },
  ], [])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  return (
    <div className="w-full h-[800px] bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 rounded-lg border border-gray-200 dark:border-gray-700 overflow-auto relative">
      <style jsx global>{`
        .react-flow__handle {
          width: 12px !important;
          height: 12px !important;
          border-radius: 50% !important;
          border: 2px solid !important;
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.8) !important;
        }
        .react-flow__handle-bottom {
          bottom: -6px !important;
        }
        .react-flow__handle-top {
          top: -6px !important;
        }
        .react-flow__handle-left {
          left: -6px !important;
        }
        .react-flow__handle-right {
          right: -6px !important;
        }
        .react-flow__edge-path {
          stroke-width: 3 !important;
        }
        .react-flow__edge {
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
        }
        .react-flow__edge.animated path {
          stroke-dasharray: 10;
          stroke-dashoffset: 10;
          animation: dash 1s linear infinite;
        }
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>

      {/* SVG Arrow Markers */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          {/* Blue Arrow Marker */}
          <marker
            id="arrowblue"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0,0 L10,5 L0,10 L2,5" fill="#3b82f6" />
          </marker>

          {/* Purple Arrow Marker */}
          <marker
            id="arrowpurple"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0,0 L10,5 L0,10 L2,5" fill="#a855f7" />
          </marker>
        </defs>
      </svg>

      {/* Section Labels */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-lg text-sm font-medium">
          Data Sources
        </div>
      </div>

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-lg text-sm font-medium">
          TiDB Core Engine
        </div>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <div className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-lg text-sm font-medium">
          AI Applications
        </div>
      </div>

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
        style={{ width: '100%', height: '100%', minWidth: '1400px' }}
        className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 w-full"
        nodesDraggable={true}
        nodesConnectable={false}
      >
        <Background color="#9ca3af" gap={20} />
        <Controls
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
        />
      </ReactFlow>

      {/* Data Flow Legend */}
      <div className="absolute bottom-4 left-4 z-10 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
        <h4 className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">Data Flow</h4>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-4 h-0.5 bg-blue-500"></div>
          <span className="text-gray-600 dark:text-gray-400">Data Ingestion</span>
        </div>
        <div className="flex items-center gap-2 text-xs mt-1">
          <div className="w-4 h-0.5 bg-purple-500"></div>
          <span className="text-gray-600 dark:text-gray-400">AI Processing</span>
        </div>
      </div>
    </div>
  )
}

export default TiDBAIConceptMap