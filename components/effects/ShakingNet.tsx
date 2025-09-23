'use client'

import React, { useEffect, useRef, useCallback, useMemo } from 'react'

// Constants
const DEFAULT_GRID_SIZE = 80
const DEFAULT_SHAKE_INTENSITY = 2
const DEFAULT_LINE_OPACITY = 0.2
const ANIMATION_SPEED = 0.001
const WAVE_FREQUENCY = 0.01
const SEGMENT_SIZE = 10
const TARGET_FPS = 60
const FRAME_INTERVAL = 1000 / TARGET_FPS

interface ShakingNetProps {
  className?: string
  gridSize?: number
  shakeIntensity?: number
  lineOpacity?: number
}

const ShakingNet: React.FC<ShakingNetProps> = ({
  className = '',
  gridSize = DEFAULT_GRID_SIZE,
  shakeIntensity = DEFAULT_SHAKE_INTENSITY,
  lineOpacity = DEFAULT_LINE_OPACITY
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const lastFrameTimeRef = useRef<number>(0)
  const gridDataRef = useRef<{ cols: number; rows: number; width: number; height: number } | null>(null)

  const strokeStyle = useMemo(() => `rgba(59, 130, 246, ${lineOpacity})`, [lineOpacity])

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
    const segments = Math.ceil(length / SEGMENT_SIZE)

    ctx.beginPath()

    for (let i = 0; i <= segments; i++) {
      const progress = i / segments
      const currentPos = isHorizontal
        ? startX + progress * (endX - startX)
        : startY + progress * (endY - startY)

      const shakeOffset = Math.sin(
        time * ANIMATION_SPEED + currentPos * WAVE_FREQUENCY + lineIndex * 0.5
      ) * shakeIntensity * 0.5

      const x = isHorizontal ? currentPos : startX + shakeOffset
      const y = isHorizontal ? startY + shakeOffset : currentPos

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }

    ctx.stroke()
  }, [shakeIntensity])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      const dpr = window.devicePixelRatio || 1

      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)

      // Cache grid calculations
      gridDataRef.current = {
        cols: Math.ceil(width / gridSize) + 2,
        rows: Math.ceil(height / gridSize) + 2,
        width,
        height
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const animate = (currentTime: number) => {
      // Frame rate limiting
      if (currentTime - lastFrameTimeRef.current < FRAME_INTERVAL) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }
      lastFrameTimeRef.current = currentTime

      const gridData = gridDataRef.current
      if (!gridData) return

      ctx.clearRect(0, 0, gridData.width, gridData.height)

      // Set stroke style once per frame
      ctx.strokeStyle = strokeStyle
      ctx.lineWidth = 1

      const { cols, rows, width, height } = gridData

      // Draw horizontal lines
      for (let row = -1; row < rows; row++) {
        const y = row * gridSize
        if (y >= -gridSize && y <= height + gridSize) {
          drawWavyLine(
            ctx,
            -gridSize,
            y,
            width + gridSize,
            y,
            true,
            row,
            currentTime
          )
        }
      }

      // Draw vertical lines
      for (let col = -1; col < cols; col++) {
        const x = col * gridSize
        if (x >= -gridSize && x <= width + gridSize) {
          drawWavyLine(
            ctx,
            x,
            -gridSize,
            x,
            height + gridSize,
            false,
            col,
            currentTime
          )
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [gridSize, shakeIntensity, lineOpacity, drawWavyLine, strokeStyle])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-screen h-screen pointer-events-none ${className}`}
      style={{ background: 'transparent', zIndex: 1 }}
    />
  )
}

export default ShakingNet