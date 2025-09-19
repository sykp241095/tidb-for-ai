'use client'

import React, { useEffect, useRef } from 'react'

interface NetNode {
  x: number
  y: number
  originalX: number
  originalY: number
  vx: number
  vy: number
}

interface ShakingNetProps {
  className?: string
  gridSize?: number
  shakeIntensity?: number
  connectionOpacity?: number
}

const ShakingNet: React.FC<ShakingNetProps> = ({
  className = '',
  gridSize = 80,
  shakeIntensity = 2,
  connectionOpacity = 0.2
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<NetNode[]>([])
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
      initializeGrid()
    }

    const initializeGrid = () => {
      nodesRef.current = []
      const cols = Math.ceil(canvas.offsetWidth / gridSize) + 2
      const rows = Math.ceil(canvas.offsetHeight / gridSize) + 2

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * gridSize
          const y = row * gridSize

          nodesRef.current.push({
            x,
            y,
            originalX: x,
            originalY: y,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
          })
        }
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Update node positions with subtle shaking
      nodesRef.current.forEach(node => {
        // Add random shake
        node.vx += (Math.random() - 0.5) * 0.1
        node.vy += (Math.random() - 0.5) * 0.1

        // Apply velocity
        node.x += node.vx
        node.y += node.vy

        // Apply damping and pull back to original position
        const returnForceX = (node.originalX - node.x) * 0.02
        const returnForceY = (node.originalY - node.y) * 0.02

        node.vx += returnForceX
        node.vy += returnForceY

        // Apply friction
        node.vx *= 0.98
        node.vy *= 0.98

        // Limit shake intensity
        const distanceFromOriginal = Math.sqrt(
          Math.pow(node.x - node.originalX, 2) + Math.pow(node.y - node.originalY, 2)
        )
        if (distanceFromOriginal > shakeIntensity) {
          const angle = Math.atan2(node.y - node.originalY, node.x - node.originalX)
          node.x = node.originalX + Math.cos(angle) * shakeIntensity
          node.y = node.originalY + Math.sin(angle) * shakeIntensity
        }
      })

      // Draw grid lines with subtle shaking effect
      const cols = Math.ceil(canvas.offsetWidth / gridSize) + 2
      const rows = Math.ceil(canvas.offsetHeight / gridSize) + 2

      // Draw horizontal lines with gentle shake
      for (let row = -1; row < rows; row++) {
        const baseY = row * gridSize
        if (baseY >= -gridSize && baseY <= canvas.offsetHeight + gridSize) {
          ctx.beginPath()

          // Create wavy line with subtle shake
          const segments = Math.ceil((canvas.offsetWidth + 2 * gridSize) / 10)
          for (let i = 0; i <= segments; i++) {
            const x = -gridSize + (i / segments) * (canvas.offsetWidth + 2 * gridSize)
            const shakeY = baseY + Math.sin(Date.now() * 0.001 + x * 0.01 + row * 0.5) * shakeIntensity * 0.5

            if (i === 0) {
              ctx.moveTo(x, shakeY)
            } else {
              ctx.lineTo(x, shakeY)
            }
          }

          ctx.strokeStyle = `rgba(59, 130, 246, ${connectionOpacity})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }

      // Draw vertical lines with gentle shake
      for (let col = -1; col < cols; col++) {
        const baseX = col * gridSize
        if (baseX >= -gridSize && baseX <= canvas.offsetWidth + gridSize) {
          ctx.beginPath()

          // Create wavy line with subtle shake
          const segments = Math.ceil((canvas.offsetHeight + 2 * gridSize) / 10)
          for (let i = 0; i <= segments; i++) {
            const y = -gridSize + (i / segments) * (canvas.offsetHeight + 2 * gridSize)
            const shakeX = baseX + Math.sin(Date.now() * 0.001 + y * 0.01 + col * 0.5) * shakeIntensity * 0.5

            if (i === 0) {
              ctx.moveTo(shakeX, y)
            } else {
              ctx.lineTo(shakeX, y)
            }
          }

          ctx.strokeStyle = `rgba(59, 130, 246, ${connectionOpacity})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }

      // Remove individual nodes since we now have a clean grid pattern

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [gridSize, shakeIntensity, connectionOpacity])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ background: 'transparent' }}
    />
  )
}

export default ShakingNet