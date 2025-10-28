"use client"

import { useState, useEffect, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import moodConfig from "@/app/config/moods.json"

type Step = "seal" | "mood" | "loom" | "ritual"
type Mood = keyof typeof moodConfig.moods.archetypes

function InspirePageContent() {
  const [step, setStep] = useState<Step>("seal")
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null)

  const primaryMoods = moodConfig.moods.primary
  const hiddenMood = moodConfig.moods.hidden
  const archetypes = moodConfig.moods.archetypes

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

  const handleMoodSelect = (mood: Mood) => {
    if (mood === "Inspired") {
      window.location.href = "https://secrets-bespoke.vercel.app/experiences"
      return
    }

    setSelectedMood(mood)
    setStep("loom")

    setTimeout(() => {
      setStep("ritual")
    }, 3000)
  }

  return (
    <div className="fixed inset-0 bg-[#1a1410] overflow-hidden">
      <AnimatePresence mode="wait">
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
              {primaryMoods.map((mood) => (
                <button
                  key={mood}
                  onClick={() => handleMoodSelect(mood as Mood)}
                  className="p-8 rounded-2xl border-2 border-white/20 hover:border-white/40 transition-all hover:scale-105"
                  style={{ backgroundColor: "#ffffff10" }}
                >
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 bg-[#FFD400]" />
                  <p className="text-white text-xl font-semibold">{mood}</p>
                  <p className="text-white/60 text-sm italic">{archetypes[mood].emotion}</p>
                </button>
              ))}
            </div>

            {hiddenMood && (
              <button
                onClick={() => handleMoodSelect(hiddenMood as Mood)}
                className="mt-10 px-6 py-3 border border-white/30 rounded-full text-white/70 hover:text-white transition-all"
              >
                Unlock {hiddenMood}
              </button>
            )}
          </motion.div>
        )}

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

export default function InspirePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1a1410]" />}>
      <InspirePageContent />
    </Suspense>
  )
}
