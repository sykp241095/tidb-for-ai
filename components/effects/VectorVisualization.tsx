'use client'

import React, { useEffect, useRef } from 'react'

interface Vector {
  x: number
  y: number
  components: number[]
  magnitude: number
  angle: number
  color: string
  targetX?: number
  targetY?: number
}

interface VectorVisualizationProps {
  className?: string
  vectorCount?: number
  dimensions?: number
}

const VectorVisualization: React.FC<VectorVisualizationProps> = ({
  className = '',
  vectorCount = 50,
  dimensions = 3
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const vectorsRef = useRef<Vector[]>([])
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

    // Generate random vectors
    const generateVectors = () => {
      vectorsRef.current = []
      for (let i = 0; i < vectorCount; i++) {
        const components = Array.from({ length: dimensions }, () => Math.random() * 2 - 1)
        const magnitude = Math.sqrt(components.reduce((sum, comp) => sum + comp * comp, 0))
        const angle = Math.atan2(components[1] || 0, components[0] || 0)

        vectorsRef.current.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          components,
          magnitude,
          angle,
          color: `hsl(${Math.random() * 360}, 70%, 60%)`,
          targetX: Math.random() * canvas.offsetWidth,
          targetY: Math.random() * canvas.offsetHeight
        })
      }
    }

    generateVectors()

    // Simulate vector operations
    let lastOperation = 0
    const operationInterval = 3000

    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Trigger vector operations periodically
      if (timestamp - lastOperation > operationInterval) {
        // Simulate similarity search - cluster similar vectors
        const queryVector = vectorsRef.current[Math.floor(Math.random() * vectorsRef.current.length)]

        vectorsRef.current.forEach(vector => {
          // Calculate similarity (cosine distance simulation)
          const dotProduct = queryVector.components.reduce((sum, comp, idx) =>
            sum + comp * (vector.components[idx] || 0), 0
          )
          const similarity = dotProduct / (queryVector.magnitude * vector.magnitude)

          if (similarity > 0.3) {
            // Move similar vectors closer to query vector
            vector.targetX = queryVector.x + (Math.random() - 0.5) * 100
            vector.targetY = queryVector.y + (Math.random() - 0.5) * 100
          } else {
            // Scatter dissimilar vectors
            vector.targetX = Math.random() * canvas.offsetWidth
            vector.targetY = Math.random() * canvas.offsetHeight
          }
        })

        lastOperation = timestamp
      }

      // Update vector positions
      vectorsRef.current.forEach((vector, index) => {
        // Smooth movement towards target
        if (vector.targetX !== undefined && vector.targetY !== undefined) {
          vector.x += (vector.targetX - vector.x) * 0.02
          vector.y += (vector.targetY - vector.y) * 0.02
        }

        // Draw vector as a point with magnitude-based size
        const size = Math.max(2, vector.magnitude * 8)

        // Draw glow effect
        const glowGradient = ctx.createRadialGradient(
          vector.x, vector.y, 0,
          vector.x, vector.y, size * 2
        )
        glowGradient.addColorStop(0, vector.color)
        glowGradient.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.arc(vector.x, vector.y, size * 2, 0, Math.PI * 2)
        ctx.fillStyle = glowGradient
        ctx.fill()

        // Draw main vector point
        ctx.beginPath()
        ctx.arc(vector.x, vector.y, size, 0, Math.PI * 2)
        ctx.fillStyle = vector.color
        ctx.fill()

        // Draw vector arrow (direction indicator)
        const arrowLength = size * 3
        const endX = vector.x + Math.cos(vector.angle) * arrowLength
        const endY = vector.y + Math.sin(vector.angle) * arrowLength

        ctx.beginPath()
        ctx.moveTo(vector.x, vector.y)
        ctx.lineTo(endX, endY)
        ctx.strokeStyle = vector.color
        ctx.lineWidth = 2
        ctx.stroke()

        // Arrow head
        const headLength = 8
        const headAngle = Math.PI / 6

        ctx.beginPath()
        ctx.moveTo(endX, endY)
        ctx.lineTo(
          endX - headLength * Math.cos(vector.angle - headAngle),
          endY - headLength * Math.sin(vector.angle - headAngle)
        )
        ctx.moveTo(endX, endY)
        ctx.lineTo(
          endX - headLength * Math.cos(vector.angle + headAngle),
          endY - headLength * Math.sin(vector.angle + headAngle)
        )
        ctx.stroke()

        // Draw connections between nearby vectors
        vectorsRef.current.slice(index + 1).forEach(otherVector => {
          const dx = vector.x - otherVector.x
          const dy = vector.y - otherVector.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.2
            ctx.beginPath()
            ctx.moveTo(vector.x, vector.y)
            ctx.lineTo(otherVector.x, otherVector.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      // Draw operation indicator
      const operationProgress = (timestamp - lastOperation) / operationInterval
      if (operationProgress < 0.3) {
        ctx.fillStyle = `rgba(59, 130, 246, ${1 - operationProgress / 0.3})`
        ctx.font = '16px monospace'
        ctx.fillText('Semantic Search Active...', 20, 30)
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [vectorCount, dimensions])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ background: 'transparent' }}
    />
  )
}

export default VectorVisualization