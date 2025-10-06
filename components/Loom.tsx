"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LoomProps {
  mood: string
  onComplete: () => void
}

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
}

export function Loom({ mood, onComplete }: LoomProps) {
  useEffect(() => {
    console.log("[v0] Loom component mounted with mood:", mood)
    console.log("[v0] Is freeform mode:", mood === "inspire")
  }, [mood])

  const isFreeform = mood === "inspire"

  const [currentStitch, setCurrentStitch] = useState(0)
  const [completedStitches, setCompletedStitches] = useState<Array<{ x: number; y: number }>>([])
  const [isComplete, setIsComplete] = useState(false)
  const [showScroll, setShowScroll] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const pattern = stitchPatterns[mood as keyof typeof stitchPatterns] || []
  const totalStitches = isFreeform ? 8 : pattern.length

  const handleInteraction = (clientX: number, clientY: number) => {
    if (!isFreeform || isComplete || !svgRef.current) return

    console.log("[v0] Freeform interaction at:", clientX, clientY)

    const rect = svgRef.current.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 800
    const y = ((clientY - rect.top) / rect.height) * 800

    console.log("[v0] SVG coordinates:", x, y)
    console.log("[v0] Current stitch:", currentStitch + 1, "of", totalStitches)

    setCompletedStitches((prev) => [...prev, { x, y }])
    setCurrentStitch((prev) => prev + 1)

    // Create particle burst
    const percentX = ((clientX - rect.left) / rect.width) * 100
    const percentY = ((clientY - rect.top) / rect.height) * 100
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: percentX,
      y: percentY,
    }))
    setParticles((prev) => [...prev, ...newParticles])
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)))
    }, 1000)

    if (currentStitch + 1 === totalStitches) {
      setIsComplete(true)
      setTimeout(() => {
        setShowScroll(true)
      }, 1000)
      setTimeout(() => {
        onComplete()
      }, 5000)
    }
  }

  const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault()
    handleInteraction(e.clientX, e.clientY)
  }

  const handleCanvasTouch = (e: React.TouchEvent<SVGSVGElement>) => {
    e.preventDefault()
    if (e.touches.length > 0) {
      const touch = e.touches[0]
      handleInteraction(touch.clientX, touch.clientY)
    }
  }

  const nodeToSvgXY = (node: { x: number; y: number }) => {
    if (!svgRef.current) return { x: 0, y: 0 }
    const rect = svgRef.current.getBoundingClientRect()
    return {
      x: (node.x / 100) * 800,
      y: (node.y / 100) * 800,
    }
  }

  const handleStitchClick = (index: number) => {
    if (isFreeform) return // Freeform mode doesn't use predefined nodes

    if (index === currentStitch && !isComplete) {
      const node = pattern[index]
      const x = (node.x / 100) * 800
      const y = (node.y / 100) * 800

      setCompletedStitches((prev) => [...prev, { x, y }])
      setCurrentStitch((prev) => prev + 1)

      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: node.x,
        y: node.y,
      }))
      setParticles((prev) => [...prev, ...newParticles])
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)))
      }, 1000)

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

  const polylinePoints = completedStitches.map((point) => `${point.x},${point.y}`).join(" ")

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-[100dvh] overflow-hidden">
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
              className="absolute top-8 left-1/2 -translate-x-1/2 text-[#FFD400] font-serif text-lg md:text-xl z-20"
            >
              {isFreeform ? "Threads" : "Stitches"} {currentStitch} of {totalStitches}
            </motion.div>

            {/* SVG Canvas */}
            <div className="relative w-full h-full max-w-2xl max-h-[80vh] px-4 flex items-center justify-center">
              <svg
                ref={svgRef}
                className="w-full h-full"
                viewBox="0 0 800 800"
                preserveAspectRatio="xMidYMid meet"
                onClick={handleCanvasClick}
                onTouchStart={handleCanvasTouch}
                style={{
                  cursor: isFreeform && !isComplete ? "crosshair" : "default",
                  touchAction: "none",
                }}
              >
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

                {completedStitches.length > 1 && (
                  <>
                    {/* Outer glow layer */}
                    <motion.polyline
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      points={polylinePoints}
                      fill="none"
                      stroke="url(#thread-glow)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.4"
                    />
                    {/* Main thread */}
                    <motion.polyline
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      points={polylinePoints}
                      fill="none"
                      stroke="url(#thread-gradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        filter: "drop-shadow(0 0 12px #FFD400)",
                      }}
                    />
                  </>
                )}

                {isFreeform &&
                  completedStitches.map((point, index) => (
                    <circle key={index} cx={point.x} cy={point.y} r="6" fill="#FFD400" opacity="0.8" />
                  ))}

                {isComplete && (
                  <>
                    <motion.circle
                      initial={{ r: 0, opacity: 0.8 }}
                      animate={{ r: 500, opacity: 0 }}
                      transition={{ duration: 2.5, ease: "easeOut" }}
                      cx="400"
                      cy="400"
                      fill="url(#bloom-gradient-1)"
                    />
                    <motion.circle
                      initial={{ r: 0, opacity: 0.6 }}
                      animate={{ r: 400, opacity: 0 }}
                      transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
                      cx="400"
                      cy="400"
                      fill="url(#bloom-gradient-2)"
                    />
                    <motion.circle
                      initial={{ r: 0, opacity: 1 }}
                      animate={{ r: 300, opacity: 0 }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                      cx="400"
                      cy="400"
                      fill="url(#bloom-gradient-3)"
                    />
                  </>
                )}

                <defs>
                  <linearGradient id="thread-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD400" />
                    <stop offset="50%" stopColor="#FFA500" />
                    <stop offset="100%" stopColor="#FFD400" />
                  </linearGradient>
                  <linearGradient id="thread-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD400" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#FFA500" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#FFD400" stopOpacity="0.6" />
                  </linearGradient>
                  <radialGradient id="bloom-gradient-1">
                    <stop offset="0%" stopColor="#FFD400" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#FFD400" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="bloom-gradient-2">
                    <stop offset="0%" stopColor="#FFA500" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#FFA500" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="bloom-gradient-3">
                    <stop offset="0%" stopColor="#FFD400" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#FFD400" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>

              {particles.map((particle, idx) => (
                <motion.div
                  key={particle.id}
                  className="absolute w-2 h-2 rounded-full bg-[#FFD400] pointer-events-none"
                  style={{
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                  }}
                  initial={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                  animate={{
                    scale: 0,
                    opacity: 0,
                    x: Math.cos((idx * Math.PI * 2) / 8) * 50,
                    y: Math.sin((idx * Math.PI * 2) / 8) * 50,
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              ))}

              {!isFreeform &&
                pattern.map((node, index) => {
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
                        boxShadow: isActive ? "0 0 20px #FFD400, 0 0 40px #FFD400" : "none",
                      }}
                      animate={
                        isActive
                          ? {
                              scale: [1, 1.4, 1],
                              opacity: [0.6, 1, 0.6],
                            }
                          : {}
                      }
                      transition={{
                        duration: 1.2,
                        repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                        ease: "easeInOut",
                      }}
                      whileTap={isActive ? { scale: 1.6 } : {}}
                    />
                  )
                })}
            </div>

            {/* Instruction text */}
            {!isComplete && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#FFD400]/60 text-sm md:text-base font-serif text-center px-4 z-20"
              >
                {isFreeform ? "Touch anywhere to weave your own path" : "Follow the pulsing light to weave your path"}
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
