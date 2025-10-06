"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LoomProps {
  mood: string
  onComplete: () => void
}

// Mood-specific stitch patterns
const stitchPatterns = {
  adventurous: [
    { x: 20, y: 15 },
    { x: 65, y: 25 },
    { x: 35, y: 40 },
    { x: 75, y: 50 },
    { x: 15, y: 60 },
    { x: 55, y: 70 },
    { x: 80, y: 80 },
    { x: 40, y: 85 },
    { x: 70, y: 95 },
  ],
  curious: [
    { x: 25, y: 25 },
    { x: 50, y: 25 },
    { x: 75, y: 25 },
    { x: 25, y: 50 },
    { x: 50, y: 50 },
    { x: 75, y: 50 },
    { x: 25, y: 75 },
    { x: 50, y: 75 },
    { x: 75, y: 75 },
  ],
  reconnected: [
    { x: 50, y: 10 },
    { x: 30, y: 25 },
    { x: 20, y: 45 },
    { x: 30, y: 65 },
    { x: 50, y: 75 },
    { x: 70, y: 65 },
    { x: 80, y: 45 },
    { x: 70, y: 25 },
    { x: 50, y: 90 },
  ],
  inspire: [
    { x: 50, y: 50 },
    { x: 50, y: 30 },
    { x: 70, y: 40 },
    { x: 70, y: 60 },
    { x: 50, y: 70 },
    { x: 30, y: 60 },
    { x: 30, y: 40 },
    { x: 50, y: 20 },
    { x: 50, y: 80 },
  ],
}

export function Loom({ mood, onComplete }: LoomProps) {
  const [currentStitch, setCurrentStitch] = useState(0)
  const [completedStitches, setCompletedStitches] = useState<Array<{ x: number; y: number }>>([])
  const [isComplete, setIsComplete] = useState(false)
  const [showScroll, setShowScroll] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const pattern = stitchPatterns[mood as keyof typeof stitchPatterns] || stitchPatterns.inspire
  const totalStitches = pattern.length

  // Convert percentage positions to SVG coordinates
  const nodeToSvgXY = (node: { x: number; y: number }) => {
    if (!svgRef.current) return { x: 0, y: 0 }
    const rect = svgRef.current.getBoundingClientRect()
    return {
      x: (node.x / 100) * rect.width,
      y: (node.y / 100) * rect.height,
    }
  }

  const handleStitchClick = (index: number) => {
    if (index === currentStitch && !isComplete) {
      const svgCoords = nodeToSvgXY(pattern[index])
      setCompletedStitches((prev) => [...prev, svgCoords])
      setCurrentStitch((prev) => prev + 1)

      if (index === totalStitches - 1) {
        setIsComplete(true)
        setTimeout(() => {
          setShowScroll(true)
        }, 1000)
        setTimeout(() => {
          onComplete()
        }, 5000)
      }
    }
  }

  // Generate polyline points string
  const polylinePoints = completedStitches.map((point) => `${point.x},${point.y}`).join(" ")

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://www.youtube-nocookie.com/embed/rDYdeq3JW_E?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&playlist=rDYdeq3JW_E&start=34"
          className="absolute top-1/2 left-1/2 w-[100vw] h-[100vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            minWidth: "100vw",
            minHeight: "100vh",
            width: "177.77vh",
            height: "56.25vw",
            opacity: 0.2,
          }}
          allow="autoplay; loop"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80 z-0" />

      {/* Loom Canvas */}
      <AnimatePresence>
        {!showScroll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 w-full h-full flex flex-col items-center justify-center"
          >
            {/* Progress Counter */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-8 left-1/2 -translate-x-1/2 text-[#FFD400] font-serif text-lg md:text-xl"
            >
              Stitches {currentStitch} of {totalStitches}
            </motion.div>

            {/* SVG Canvas */}
            <div className="relative w-full max-w-2xl aspect-square px-4">
              <svg ref={svgRef} className="absolute inset-0 w-full h-full" viewBox="0 0 800 800">
                {/* Warp lines (vertical texture) */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <line
                    key={`warp-${i}`}
                    x1={(i / 19) * 800}
                    y1="0"
                    x2={(i / 19) * 800}
                    y2="800"
                    stroke="#FFD400"
                    strokeWidth="0.5"
                    opacity="0.1"
                  />
                ))}

                {/* Golden thread path */}
                {completedStitches.length > 1 && (
                  <motion.polyline
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                    points={polylinePoints}
                    fill="none"
                    stroke="#FFD400"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      filter: "drop-shadow(0 0 8px #FFD400)",
                    }}
                  />
                )}

                {/* Bloom effect on completion */}
                {isComplete && (
                  <motion.circle
                    initial={{ r: 0, opacity: 1 }}
                    animate={{ r: 400, opacity: 0 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    cx="400"
                    cy="400"
                    fill="url(#bloom-gradient)"
                  />
                )}

                <defs>
                  <radialGradient id="bloom-gradient">
                    <stop offset="0%" stopColor="#FFD400" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#FFD400" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>

              {/* Stitch nodes */}
              {pattern.map((node, index) => {
                const isActive = index === currentStitch
                const isCompleted = index < currentStitch

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleStitchClick(index)}
                    className="absolute w-6 h-6 md:w-8 md:h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all"
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      backgroundColor: isCompleted ? "#FFD400" : "transparent",
                      borderColor: isActive ? "#FFD400" : "rgba(255, 212, 0, 0.4)",
                      cursor: isActive ? "pointer" : "default",
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    animate={
                      isActive
                        ? {
                            scale: [1, 1.3, 1],
                            opacity: [0.6, 1, 0.6],
                          }
                        : {}
                    }
                    transition={{
                      duration: 1.5,
                      repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                      ease: "easeInOut",
                    }}
                  />
                )
              })}
            </div>

            {/* Instruction text */}
            {!isComplete && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#FFD400]/60 text-sm md:text-base font-serif text-center px-4"
              >
                Follow the pulsing light to weave your path
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion Scroll Section */}
      <AnimatePresence>
        {showScroll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-20 flex items-center justify-center"
          >
            <div className="text-center px-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-serif text-3xl md:text-4xl text-[#FFD400] mb-4"
              >
                Your path is woven
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto"
              >
                The threads of stories await your discovery
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
