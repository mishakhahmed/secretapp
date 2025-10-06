"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function InspirePage() {
  const router = useRouter()
  const [showMoodSelector, setShowMoodSelector] = useState(false)
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  const handleSealClick = () => {
    console.log("[v0] Seal clicked, showing mood selector")
    setShowMoodSelector(true)
  }

  const handleMoodSelect = (mood: string) => {
    console.log("[v0] Mood selected:", mood)
    setSelectedMood(mood)
    localStorage.setItem("secrets_mood", mood)
    console.log("[v0] Mood saved to localStorage, redirecting to /loom in 800ms")

    setTimeout(() => {
      router.push("/loom")
    }, 800)
  }

  const handleBack = () => {
    console.log("[v0] Back button clicked, returning to main app")
    router.push("/")
  }

  const moods = [
    { id: "adventurous", label: "Adventurous", color: "from-orange-500 to-red-500" },
    { id: "curious", label: "Curious", color: "from-blue-500 to-purple-500" },
    { id: "inspire", label: "Inspire Me", color: "from-yellow-500 to-orange-500" },
    { id: "reconnected", label: "Reconnected", color: "from-green-500 to-teal-500" },
  ]

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <iframe
        src="https://www.youtube-nocookie.com/embed/rDYdeq3JW_E?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&playlist=rDYdeq3JW_E&start=4"
        className="loom-bg absolute inset-0 w-full h-full object-cover pointer-events-none opacity-30"
        allow="autoplay; loop; fullscreen"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      {showMoodSelector && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={handleBack}
          className="fixed top-6 left-6 z-50 w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border-2 border-[#FFD400]/60 flex items-center justify-center hover:bg-black/80 hover:border-[#FFD400] transition-all duration-300 hover:scale-110"
          style={{
            boxShadow: "0 0 20px rgba(255, 212, 0, 0.3)",
            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="#FFD400"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </motion.button>
      )}

      {/* Content */}
      <div className="relative z-10 w-full">
        <AnimatePresence mode="wait">
          {!showMoodSelector ? (
            <motion.div
              key="wax-seal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center gap-6"
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                onClick={handleSealClick}
                className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-[#8B0000] border-4 border-[#8B0000]/60 shadow-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
              >
                <div className="text-center">
                  <div className="text-5xl md:text-6xl text-[#FFD400]/90 font-serif font-bold">S</div>
                  <div className="text-xs text-[#FFD400]/70 tracking-widest">SECRETS</div>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-[#FFD400]/80 text-lg md:text-xl font-serif italic"
              >
                Every city keeps its secrets.
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="mood-selector"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center gap-8 px-4"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-serif text-2xl md:text-3xl text-[#FFD400] text-center"
              >
                How do you wish to explore?
              </motion.h2>

              <div className="grid grid-cols-2 gap-6 md:gap-8 max-w-2xl">
                {moods.map((mood, index) => (
                  <motion.button
                    key={mood.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    onClick={() => handleMoodSelect(mood.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 transition-all duration-300 flex items-center justify-center ${
                      selectedMood === mood.id
                        ? "border-[#FFD400] bg-[#FFD400]/20 shadow-xl shadow-[#FFD400]/30"
                        : "border-[#FFD400]/50 bg-black/40 hover:border-[#FFD400] hover:bg-black/60"
                    }`}
                  >
                    <span className="text-[#FFD400] font-serif text-base md:text-lg text-center px-4">
                      {mood.label}
                    </span>

                    {selectedMood === mood.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 rounded-full border-4 border-[#FFD400] animate-pulse"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
