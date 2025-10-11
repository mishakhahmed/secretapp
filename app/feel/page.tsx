"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function FeelPage() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleOpenExternal = () => {
    window.open("https://secretsbd-visualjourney.vercel.app", "_blank")
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-[#1a1410] text-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <button onClick={() => router.back()} className="text-sm text-[#FFD400] hover:text-white transition-colors">
          ← Back
        </button>
        <p className="text-sm font-serif text-white/60">Pursuit of Feeling</p>
        <button onClick={handleOpenExternal} className="text-sm text-[#FFD400] hover:text-white transition-colors">
          Open Externally ↗
        </button>
      </div>

      {/* Intro or Embedded View */}
      <AnimatePresence mode="wait">
        {!isLoaded ? (
          <motion.div
            key="intro"
            className="flex-1 flex flex-col items-center justify-center text-center px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            <motion.div
              className="absolute w-80 h-80 rounded-full blur-3xl bg-[#FFD400]/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />
            <motion.p
              className="text-xl md:text-2xl font-serif text-[#FFD400] mb-4 relative"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              They say you know the world when you feel the world.
            </motion.p>
            <motion.p
              className="text-lg text-white/70 font-serif italic relative"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              Are you ready to step into our world — where feeling is believing?
            </motion.p>
          </motion.div>
        ) : (
          <motion.iframe
            key="iframe"
            src="https://secretsbd-visualjourney.vercel.app"
            className="flex-1 w-full border-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            title="Feel Engine"
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="p-4 text-center text-sm text-white/50 font-serif">
        Embedded Feel Engine — optimized for Secrets Bangladesh App
      </div>
    </div>
  )
}
