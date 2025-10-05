"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Step = "seal" | "mood" | "loom" | "ritual"
type Mood = "adventurous" | "curious" | "reconnected" | "inspire"

export default function InspirePage() {
  const [step, setStep] = useState<Step>("seal")
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null)

  // Listen for back button messages from ritual iframes
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "RITUAL_BACK") {
        setStep("mood")
        setSelectedMood(null)
      }
    }
    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  const moods = [
    { id: "adventurous" as Mood, label: "Adventurous", color: "#FF6B35" },
    { id: "curious" as Mood, label: "Curious", color: "#4ECDC4" },
    { id: "reconnected" as Mood, label: "Reconnected", color: "#95E1D3" },
    { id: "inspire" as Mood, label: "Inspire Me", color: "#FFD400" },
  ]

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood)
    setStep("loom")
    // After loom animation (3 seconds), show ritual
    setTimeout(() => {
      setStep("ritual")
    }, 3000)
  }

  return (
    <div className="fixed inset-0 bg-[#1a1410] overflow-hidden">
      <AnimatePresence mode="wait">
        {/* Step 1: Wax Seal */}
        {step === "seal" && (
          <motion.div
            key="seal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <img src="/assets/Secrets-wax-seal.png" alt="Secrets Wax Seal" className="w-48 h-48 mb-8 animate-pulse" />
            <p className="text-white/60 text-lg mb-8 text-center px-4 font-serif italic">
              Every city keeps its secrets.
              <br />
              Break the seal to discover yours.
            </p>
            <button
              onClick={() => setStep("mood")}
              className="px-8 py-3 bg-[#FFD400] text-[#1a1410] rounded-full font-semibold hover:bg-[#FFE44D] transition-colors"
            >
              Break the Wax Seal
            </button>
          </motion.div>
        )}

        {/* Step 2: Mood Selection */}
        {step === "mood" && (
          <motion.div
            key="mood"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-8"
          >
            <h2 className="text-3xl font-serif text-white mb-12 text-center">How do you feel today?</h2>
            <div className="grid grid-cols-2 gap-6 max-w-2xl w-full">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => handleMoodSelect(mood.id)}
                  className="p-8 rounded-2xl border-2 border-white/20 hover:border-white/40 transition-all hover:scale-105"
                  style={{ backgroundColor: `${mood.color}15` }}
                >
                  <div className="w-16 h-16 rounded-full mx-auto mb-4" style={{ backgroundColor: mood.color }} />
                  <p className="text-white text-xl font-semibold">{mood.label}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Loom Animation */}
        {step === "loom" && selectedMood && (
          <motion.div
            key="loom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <iframe src="/shared/loom/index.html" className="w-full h-full border-0" title="Jamdani Loom Ritual" />
          </motion.div>
        )}

        {/* Step 4: Ritual Experience */}
        {step === "ritual" && selectedMood && (
          <motion.div
            key="ritual"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <iframe
              src={`/rituals/${selectedMood}/index.html`}
              className="w-full h-full border-0"
              title={`${selectedMood} ritual`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
