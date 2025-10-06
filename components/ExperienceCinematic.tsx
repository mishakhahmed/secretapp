"use client"
import { useState, useEffect } from "react"

export default function ExperienceCinematic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    if (isPlaying) {
      const audio = document.getElementById("loomAudio") as HTMLAudioElement | null
      audio?.play().catch(() => {})
      const timer = setTimeout(() => {
        setFadeOut(true)
        setTimeout(() => {
          window.parent.postMessage({ type: "RETURN_TO_SEAL" }, "*")
          setIsPlaying(false)
          setFadeOut(false)
        }, 2000)
      }, 8000)
      return () => clearTimeout(timer)
    }
  }, [isPlaying])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black text-yellow-400">
      {!isPlaying && (
        <button
          onClick={() => setIsPlaying(true)}
          className="z-10 text-lg border border-yellow-400 px-6 py-3 rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-700"
        >
          Begin Ritual
        </button>
      )}

      {isPlaying && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center bg-black transition-opacity duration-2000 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="relative w-full h-full overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay animate-weave"
                style={{ backgroundImage: `url(/patterns/pattern${i}.png)` }}
              ></div>
            ))}

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h2 className="text-3xl md:text-5xl font-playfair mb-4">Jamdani Ritual</h2>
              <p className="text-yellow-400 font-light">Weaving memory into light...</p>
            </div>
          </div>
        </div>
      )}

      <audio id="loomAudio" src="/sounds/loom-hum.mp3" preload="auto"></audio>

      <style jsx>{`
        @keyframes weave {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 300px 300px;
          }
        }
        .animate-weave {
          animation: weave 15s linear infinite;
        }
      `}</style>
    </div>
  )
}
