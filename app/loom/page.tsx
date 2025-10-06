"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { FreeformLoom } from "@/components/FreeformLoom"

export default function LoomPage() {
  const router = useRouter()
  const [mood, setMood] = useState<string | null>(null)

  useEffect(() => {
    const storedMood = localStorage.getItem("secrets_mood")
    console.log("[v0] Loom page loaded, mood from localStorage:", storedMood)
    setMood(storedMood)

    if (!storedMood) {
      console.log("[v0] No mood found, redirecting to inspire")
      router.push("/inspire")
    }
  }, [router])

  const handleLoomComplete = () => {
    console.log("[v0] Loom complete! Mood:", mood)

    if (mood) {
      console.log(`[v0] Redirecting to /${mood}`)
      router.push(`/${mood}`)
    } else {
      console.log("[v0] No mood found, redirecting to archive")
      router.push("/archive")
    }
  }

  if (!mood) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-golden text-xl font-playfair">
          Loading...
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <FreeformLoom onComplete={handleLoomComplete} />
    </div>
  )
}
