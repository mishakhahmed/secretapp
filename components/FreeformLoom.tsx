"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface FreeformLoomProps {
  onComplete: () => void
}

interface Point {
  x: number
  y: number
}

export function FreeformLoom({ onComplete }: FreeformLoomProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [points, setPoints] = useState<Point[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const requiredTouches = 8

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background pattern (subtle grid)
    ctx.strokeStyle = "rgba(255, 212, 0, 0.05)"
    ctx.lineWidth = 1
    const gridSize = 40
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Draw connecting lines between points
    if (points.length > 1) {
      ctx.strokeStyle = "#FFD400"
      ctx.lineWidth = 3
      ctx.lineCap = "round"
      ctx.shadowBlur = 10
      ctx.shadowColor = "#FFD400"

      // Draw lines connecting all points
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y)
      }
      ctx.stroke()

      // Draw additional weaving pattern (connect alternating points)
      if (points.length > 3) {
        ctx.strokeStyle = "rgba(255, 165, 0, 0.6)"
        ctx.lineWidth = 2
        for (let i = 0; i < points.length - 2; i += 2) {
          ctx.beginPath()
          ctx.moveTo(points[i].x, points[i].y)
          ctx.lineTo(points[i + 2].x, points[i + 2].y)
          ctx.stroke()
        }
      }
    }

    // Draw points
    points.forEach((point, index) => {
      // Outer glow
      ctx.beginPath()
      ctx.arc(point.x, point.y, 15, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 212, 0, 0.3)"
      ctx.fill()

      // Inner circle
      ctx.beginPath()
      ctx.arc(point.x, point.y, 8, 0, Math.PI * 2)
      ctx.fillStyle = "#FFD400"
      ctx.fill()

      // Point number
      ctx.fillStyle = "#1a1410"
      ctx.font = "bold 12px serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText((index + 1).toString(), point.x, point.y)
    })
  }, [points])

  const handleTouch = (e: React.TouchEvent<HTMLCanvasElement> | React.MouseEvent<HTMLCanvasElement>) => {
    if (isComplete || points.length >= requiredTouches) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    let x: number, y: number

    if ("touches" in e) {
      const touch = e.touches[0]
      x = touch.clientX - rect.left
      y = touch.clientY - rect.top
    } else {
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    }

    const newPoints = [...points, { x, y }]
    setPoints(newPoints)

    // Check if complete
    if (newPoints.length >= requiredTouches) {
      setIsComplete(true)
      setTimeout(() => {
        onComplete()
      }, 1500)
    }
  }

  return (
    <div className="fixed inset-0 bg-[#1a1410] overflow-hidden">
      <canvas
        ref={canvasRef}
        onTouchStart={handleTouch}
        onClick={handleTouch}
        className="absolute inset-0 cursor-crosshair touch-none"
      />

      {/* Instructions */}
      <AnimatePresence>
        {!isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[10%] left-1/2 -translate-x-1/2 text-center z-10"
          >
            <p className="text-[#FFD400] text-2xl font-serif mb-2">Weave Your Journey</p>
            <p className="text-[#FFD400]/70 text-lg">Touch anywhere to create {requiredTouches} connection points</p>
            <p className="text-[#FFD400] text-3xl font-bold mt-4">
              {points.length} / {requiredTouches}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion message */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#FFD400] flex items-center justify-center"
              >
                <svg className="w-12 h-12 text-[#1a1410]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <p className="text-[#FFD400] text-3xl font-serif">Pattern Complete</p>
              <p className="text-[#FFD400]/70 text-lg mt-2">Entering your journey...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
