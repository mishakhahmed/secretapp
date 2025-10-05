"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ShuffleDeck from "@/components/ShuffleDeck"

export default function InspirePage() {
  const [showRitual, setShowRitual] = useState(true)

  useEffect(() => {
    const seen = localStorage.getItem("hasSeenRitual")
    if (seen) setShowRitual(false)
  }, [])

  const handleSealClick = () => {
    localStorage.setItem("hasSeenRitual", "true")
    setShowRitual(false)
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#1a1410] overflow-hidden">
      <AnimatePresence>
        {showRitual ? (
          <motion.div
            key="ritual"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center justify-center text-center p-6"
          >
            <img
              src="/assets/Secrets-wax-seal.png"
              alt="Wax Seal"
              onClick={handleSealClick}
              className="w-32 h-32 cursor-pointer select-none mb-6 hover:scale-110 transition-transform"
            />
            <p className="text-lg font-medium text-white/70">Every city keeps its secrets.</p>
          </motion.div>
        ) : (
          <motion.div
            key="cards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-full"
          >
            <ShuffleDeck />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
