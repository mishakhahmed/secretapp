"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function ExplorePage() {
  const router = useRouter()

  const handleBack = () => {
    console.log("[v0] Back button clicked, returning to main app")
    router.push("/")
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Back button overlay */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        onClick={handleBack}
        className="fixed top-6 left-6 z-50 w-12 h-12 rounded-full bg-black/80 backdrop-blur-sm border-2 border-[#FFD400] flex items-center justify-center hover:bg-black/90 hover:border-[#FFD400]/80 transition-all duration-300 hover:scale-110"
        style={{
          boxShadow: "0 0 20px rgba(255, 212, 0, 0.4)",
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

      {/* Embedded v0 chat link */}
      <iframe
        src="https://v0.app/chat/secrets-bangladesh-site-otlbIEnGtH7"
        className="w-full h-full border-0"
        allow="fullscreen"
        title="Explore Secrets Bangladesh"
      />
    </div>
  )
}
