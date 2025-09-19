'use client'

import React, { useEffect, useRef, useCallback } from 'react'

// Constants
const SEARCH_INTERVAL = 12000 // 12 seconds between searches
const RIPPLE_SPEED = 0.003
const FADE_DURATION = 3000

interface GridPoint {
  x: number
  y: number
  similarity: number
  isSearchCenter: boolean
  rippleTime: number
}

interface GridVectorSearchProps {
  className?: string
  gridSize?: number
  shakeIntensity?: number
  connectionOpacity?: number
}

const GridVectorSearch: React.FC<GridVectorSearchProps> = ({
  className = '',
  gridSize = 100,
  shakeIntensity = 1.5,
  connectionOpacity = 0.15
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const gridPointsRef = useRef<GridPoint[]>([])
  const lastSearchRef = useRef<number>(0)
  const searchCenterRef = useRef<{ x: number; y: number } | null>(null)

  const calculateSimilarity = useCallback((x1: number, y1: number, x2: number, y2: number) => {
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
    const maxDistance = gridSize * 4 // Similarity drops off after 4 grid cells
    return Math.max(0, 1 - distance / maxDistance)
  }, [gridSize])

  const drawWavyLine = useCallback((
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    isHorizontal: boolean,
    lineIndex: number,
    time: number
  ) => {
    const length = isHorizontal ? endX - startX : endY - startY
    const segments = Math.ceil(length / 10)

    ctx.beginPath()

    for (let i = 0; i <= segments; i++) {
      const progress = i / segments
      const currentPos = isHorizontal
        ? startX + progress * (endX - startX)
        : startY + progress * (endY - startY)

      const shakeOffset = Math.sin(
        time * 0.001 + currentPos * 0.01 + lineIndex * 0.5
      ) * shakeIntensity * 0.5

      const x = isHorizontal ? currentPos : startX + shakeOffset
      const y = isHorizontal ? startY + shakeOffset : currentPos

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }

    ctx.strokeStyle = `rgba(59, 130, 246, ${connectionOpacity})`
    ctx.lineWidth = 1
    ctx.stroke()
  }, [shakeIntensity, connectionOpacity])

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
      gridPointsRef.current = []
      const cols = Math.ceil(canvas.offsetWidth / gridSize) + 2
      const rows = Math.ceil(canvas.offsetHeight / gridSize) + 2

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * gridSize
          const y = row * gridSize

          gridPointsRef.current.push({
            x,
            y,
            similarity: 0,
            isSearchCenter: false,
            rippleTime: 0
          })
        }
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Trigger new search periodically
      if (timestamp - lastSearchRef.current > SEARCH_INTERVAL) {
        // Pick random search center
        const centerX = Math.random() * canvas.offsetWidth
        const centerY = Math.random() * canvas.offsetHeight
        searchCenterRef.current = { x: centerX, y: centerY }

        // Calculate similarity for all grid points
        gridPointsRef.current.forEach(point => {
          if (searchCenterRef.current) {
            point.similarity = calculateSimilarity(
              point.x, point.y,
              searchCenterRef.current.x, searchCenterRef.current.y
            )
            point.rippleTime = timestamp
            point.isSearchCenter =
              Math.abs(point.x - searchCenterRef.current.x) < gridSize/2 &&
              Math.abs(point.y - searchCenterRef.current.y) < gridSize/2
          }
        })

        lastSearchRef.current = timestamp
      }

      // Draw grid lines
      const cols = Math.ceil(canvas.offsetWidth / gridSize) + 2
      const rows = Math.ceil(canvas.offsetHeight / gridSize) + 2

      // Draw horizontal lines
      for (let row = -1; row < rows; row++) {
        const y = row * gridSize
        if (y >= -gridSize && y <= canvas.offsetHeight + gridSize) {
          drawWavyLine(
            ctx,
            -gridSize,
            y,
            canvas.offsetWidth + gridSize,
            y,
            true,
            row,
            timestamp
          )
        }
      }

      // Draw vertical lines
      for (let col = -1; col < cols; col++) {
        const x = col * gridSize
        if (x >= -gridSize && x <= canvas.offsetWidth + gridSize) {
          drawWavyLine(
            ctx,
            x,
            -gridSize,
            x,
            canvas.offsetHeight + gridSize,
            false,
            col,
            timestamp
          )
        }
      }

      // Draw vector search visualization
      const searchAge = timestamp - lastSearchRef.current
      if (searchAge < FADE_DURATION) {
        const fadeProgress = searchAge / FADE_DURATION

        gridPointsRef.current.forEach(point => {
          if (point.similarity > 0.1) {
            const timeSinceRipple = timestamp - point.rippleTime
            const rippleProgress = timeSinceRipple * RIPPLE_SPEED

            // Only show if ripple has reached this point
            const distanceFromCenter = searchCenterRef.current
              ? Math.sqrt(
                  (point.x - searchCenterRef.current.x) ** 2 +
                  (point.y - searchCenterRef.current.y) ** 2
                )
              : 0

            if (rippleProgress * 1000 > distanceFromCenter) {
              // Draw similarity visualization
              const intensity = point.similarity * (1 - fadeProgress)
              const radius = 8 + point.similarity * 12

              // Glow effect
              const gradient = ctx.createRadialGradient(
                point.x, point.y, 0,
                point.x, point.y, radius * 2
              )
              gradient.addColorStop(0, `rgba(34, 197, 94, ${intensity * 0.6})`)
              gradient.addColorStop(1, 'transparent')

              ctx.beginPath()
              ctx.arc(point.x, point.y, radius * 2, 0, Math.PI * 2)
              ctx.fillStyle = gradient
              ctx.fill()

              // Center dot
              ctx.beginPath()
              ctx.arc(point.x, point.y, 3, 0, Math.PI * 2)
              ctx.fillStyle = point.isSearchCenter
                ? `rgba(239, 68, 68, ${intensity})`
                : `rgba(34, 197, 94, ${intensity})`
              ctx.fill()
            }
          }
        })

        // Draw search center indicator
        if (searchCenterRef.current && fadeProgress < 0.5) {
          const pulseIntensity = (1 - fadeProgress * 2) * Math.sin(timestamp * 0.01)

          ctx.beginPath()
          ctx.arc(searchCenterRef.current.x, searchCenterRef.current.y, 15 + pulseIntensity * 5, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(239, 68, 68, ${0.8 - fadeProgress})`
          ctx.lineWidth = 3
          ctx.stroke()

          // Search text
          ctx.font = '14px monospace'
          ctx.textAlign = 'center'
          ctx.fillStyle = `rgba(239, 68, 68, ${0.9 - fadeProgress})`
          ctx.fillText(
            'Vector Search',
            searchCenterRef.current.x,
            searchCenterRef.current.y - 25
          )
        }
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
  }, [gridSize, shakeIntensity, connectionOpacity, drawWavyLine, calculateSimilarity])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-screen h-screen pointer-events-none ${className}`}
      style={{ background: 'transparent', zIndex: 1 }}
    />
  )
}

export default GridVectorSearch