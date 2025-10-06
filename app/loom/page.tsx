"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Loom } from "@/components/Loom"

function LoomPageContent() {
  const router = useRouter()
  const [mood, setMood] = useState<string | null>(null)

  useEffect(() => {
    const storedMood = localStorage.getItem("secrets_mood")
    setMood(storedMood)

    if (!storedMood) {
      router.push("/")
    }
  }, [router])

  const handleLoomComplete = () => {
    if (mood) {
      router.push(`/?mood=${mood}`)
    } else {
      router.push("/")
    }
  }

  if (!mood) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1410]">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#FFD400] text-xl font-serif">
          Loading...
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <Loom mood={mood} onComplete={handleLoomComplete} />
    </div>
  )
}

export default function LoomPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1a1410]" />}>
      <LoomPageContent />
    </Suspense>
  )
}
