'use client'

import React, { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  layer: number
  activated: boolean
  activationTime: number
}

interface Connection {
  from: Node
  to: Node
  strength: number
  active: boolean
}

interface NeuralNetworkProps {
  className?: string
  layers?: number[]
  animationSpeed?: number
}

const NeuralNetwork: React.FC<NeuralNetworkProps> = ({
  className = '',
  layers = [4, 6, 6, 3],
  animationSpeed = 2000
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const connectionsRef = useRef<Connection[]>([])
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize network
    const initNetwork = () => {
      nodesRef.current = []
      connectionsRef.current = []

      const layerSpacing = canvas.offsetWidth / (layers.length + 1)

      // Create nodes
      layers.forEach((nodeCount, layerIndex) => {
        const nodeSpacing = canvas.offsetHeight / (nodeCount + 1)

        for (let i = 0; i < nodeCount; i++) {
          nodesRef.current.push({
            x: layerSpacing * (layerIndex + 1),
            y: nodeSpacing * (i + 1),
            layer: layerIndex,
            activated: false,
            activationTime: 0
          })
        }
      })

      // Create connections
      for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex++) {
        const currentLayerNodes = nodesRef.current.filter(node => node.layer === layerIndex)
        const nextLayerNodes = nodesRef.current.filter(node => node.layer === layerIndex + 1)

        currentLayerNodes.forEach(fromNode => {
          nextLayerNodes.forEach(toNode => {
            connectionsRef.current.push({
              from: fromNode,
              to: toNode,
              strength: Math.random() * 0.8 + 0.2,
              active: false
            })
          })
        })
      }
    }

    initNetwork()

    // Animation logic
    let lastActivation = 0
    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Trigger new activation wave
      if (timestamp - lastActivation > animationSpeed) {
        // Reset all activations
        nodesRef.current.forEach(node => {
          node.activated = false
          node.activationTime = 0
        })
        connectionsRef.current.forEach(connection => {
          connection.active = false
        })

        // Activate input layer
        const inputNodes = nodesRef.current.filter(node => node.layer === 0)
        inputNodes.forEach((node, index) => {
          setTimeout(() => {
            node.activated = true
            node.activationTime = timestamp + index * 100
          }, index * 100)
        })

        lastActivation = timestamp
      }

      // Propagate activation through network
      nodesRef.current.forEach(node => {
        if (node.activated && node.layer < layers.length - 1) {
          const outgoingConnections = connectionsRef.current.filter(conn => conn.from === node)
          outgoingConnections.forEach(connection => {
            const delay = 200 + Math.random() * 300
            if (timestamp - node.activationTime > delay) {
              connection.active = true
              if (!connection.to.activated) {
                connection.to.activated = true
                connection.to.activationTime = timestamp
              }
            }
          })
        }
      })

      // Draw connections
      connectionsRef.current.forEach(connection => {
        const opacity = connection.active ? connection.strength : connection.strength * 0.2
        const gradient = ctx.createLinearGradient(
          connection.from.x, connection.from.y,
          connection.to.x, connection.to.y
        )

        if (connection.active) {
          gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity})`)
          gradient.addColorStop(1, `rgba(147, 51, 234, ${opacity})`)
        } else {
          gradient.addColorStop(0, `rgba(156, 163, 175, ${opacity})`)
          gradient.addColorStop(1, `rgba(156, 163, 175, ${opacity})`)
        }

        ctx.beginPath()
        ctx.moveTo(connection.from.x, connection.from.y)
        ctx.lineTo(connection.to.x, connection.to.y)
        ctx.strokeStyle = gradient
        ctx.lineWidth = connection.active ? 2 : 1
        ctx.stroke()

        // Draw activation pulse
        if (connection.active) {
          const pulseProgress = (timestamp - connection.to.activationTime) / 300
          if (pulseProgress >= 0 && pulseProgress <= 1) {
            const pulseX = connection.from.x + (connection.to.x - connection.from.x) * pulseProgress
            const pulseY = connection.from.y + (connection.to.y - connection.from.y) * pulseProgress

            ctx.beginPath()
            ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(59, 130, 246, ${1 - pulseProgress})`
            ctx.fill()
          }
        }
      })

      // Draw nodes
      nodesRef.current.forEach(node => {
        const baseRadius = 6
        const activatedRadius = 10
        const currentRadius = node.activated
          ? baseRadius + (activatedRadius - baseRadius) * Math.sin((timestamp - node.activationTime) / 200)
          : baseRadius

        // Node glow effect
        if (node.activated) {
          const glowGradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, currentRadius * 3
          )
          glowGradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)')
          glowGradient.addColorStop(1, 'rgba(59, 130, 246, 0)')

          ctx.beginPath()
          ctx.arc(node.x, node.y, currentRadius * 3, 0, Math.PI * 2)
          ctx.fillStyle = glowGradient
          ctx.fill()
        }

        // Node body
        ctx.beginPath()
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2)

        if (node.activated) {
          const nodeGradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, currentRadius
          )
          nodeGradient.addColorStop(0, '#3b82f6')
          nodeGradient.addColorStop(1, '#1d4ed8')
          ctx.fillStyle = nodeGradient
        } else {
          ctx.fillStyle = '#374151'
        }

        ctx.fill()

        // Node border
        ctx.beginPath()
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2)
        ctx.strokeStyle = node.activated ? '#60a5fa' : '#6b7280'
        ctx.lineWidth = 2
        ctx.stroke()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [layers, animationSpeed])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ background: 'transparent' }}
    />
  )
}

export default NeuralNetwork