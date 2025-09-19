'use client'

import React, { useEffect, useRef, useCallback } from 'react'

// Constants
const DEFAULT_GRID_SIZE = 80
const DEFAULT_SHAKE_INTENSITY = 2
const DEFAULT_CONNECTION_OPACITY = 0.2
const ANIMATION_SPEED = 0.001
const WAVE_FREQUENCY = 0.01
const SEGMENT_SIZE = 10

interface ShakingNetProps {
  className?: string
  gridSize?: number
  shakeIntensity?: number
  connectionOpacity?: number
}

const ShakingNet: React.FC<ShakingNetProps> = ({
  className = '',
  gridSize = DEFAULT_GRID_SIZE,
  shakeIntensity = DEFAULT_SHAKE_INTENSITY,
  connectionOpacity = DEFAULT_CONNECTION_OPACITY
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()

  const drawWavyLine = useCallback((
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    isHorizontal: boolean,
    lineIndex: number
  ) => {
    const length = isHorizontal ? endX - startX : endY - startY
    const segments = Math.ceil(length / SEGMENT_SIZE)

    ctx.beginPath()

    for (let i = 0; i <= segments; i++) {
      const progress = i / segments
      const currentPos = isHorizontal
        ? startX + progress * (endX - startX)
        : startY + progress * (endY - startY)

      const shakeOffset = Math.sin(
        Date.now() * ANIMATION_SPEED + currentPos * WAVE_FREQUENCY + lineIndex * 0.5
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
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

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
            row
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
            col
          )
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [gridSize, shakeIntensity, connectionOpacity, drawWavyLine])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-screen h-screen pointer-events-none ${className}`}
      style={{ background: 'transparent', zIndex: 1 }}
    />
  )
}

export default ShakingNet