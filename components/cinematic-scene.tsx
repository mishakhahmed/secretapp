"use client"

import { useEffect, useRef, useState } from "react"

interface CinematicSceneProps {
  image?: string
  video?: string
  title: string
  note1: string
  note2: string
  label: string
  dark?: boolean
  light?: boolean
  mystery?: boolean
}

export function CinematicScene({
  image,
  video,
  title,
  note1,
  note2,
  label,
  dark,
  light,
  mystery,
}: CinematicSceneProps) {
  const [isActive, setIsActive] = useState(false)
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsActive(entry.isIntersecting)
        })
      },
      { threshold: 0.5 },
    )

    if (sceneRef.current) {
      observer.observe(sceneRef.current)
    }

    return () => {
      if (sceneRef.current) {
        observer.unobserve(sceneRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={sceneRef}
      className={`relative h-[160vh] flex items-center justify-center snap-start transition-opacity duration-1000 ${
        isActive ? "opacity-100" : "opacity-0"
      } ${dark ? "bg-black text-white" : "bg-white text-black"}`}
    >
      {/* Background Image or Video */}
      {image && (
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-2000 ${
            isActive ? "scale-105" : "scale-120"
          }`}
          style={{ filter: "brightness(60%)", opacity: 0.8 }}
        />
      )}

      {video && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-2000 ${
            isActive ? "scale-105" : "scale-120"
          }`}
          style={{ filter: "brightness(60%)", opacity: 0.8 }}
        >
          <source src={video} type="video/mp4" />
        </video>
      )}

      {/* Overlay Content */}
      <div className="relative z-10 max-w-2xl px-8 text-center">
        <h2
          className={`text-4xl md:text-5xl font-bold mb-8 transition-all duration-1000 ${
            isActive ? "opacity-100 translate-x-0" : dark ? "opacity-0 -translate-x-24" : "opacity-0 translate-x-24"
          }`}
          style={{ color: "#FFD400", fontFamily: "Playfair Display, serif" }}
        >
          {title}
        </h2>

        <p
          className={`text-2xl md:text-3xl mb-6 transition-all duration-1500 delay-500 ${
            isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-24"
          }`}
          style={{ fontFamily: "Great Vibes, cursive" }}
        >
          {note1}
        </p>

        <p
          className={`text-2xl md:text-3xl transition-all duration-1500 delay-1000 ${
            isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-24"
          }`}
          style={{ fontFamily: "Great Vibes, cursive" }}
        >
          {note2}
        </p>
      </div>

      {/* Floating Card Label */}
      <div
        className="absolute bottom-10 left-10 w-32 h-20 rounded-lg border flex items-center justify-center text-sm font-medium z-20"
        style={{
          backgroundColor: "rgba(255, 212, 0, 0.1)",
          borderColor: "#FFD400",
          color: "#FFD400",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {label}
      </div>

      {/* Mystery Icon */}
      {mystery && (
        <button
          onClick={() => {
            window.location.href = "https://secretsbangladesh.com/stories"
          }}
          className="absolute bottom-8 right-8 text-5xl animate-float cursor-pointer z-20"
          style={{
            color: "#FFD400",
            animation: "float 4s infinite ease-in-out, pulse 2s infinite alternate",
          }}
        >
          ?
        </button>
      )}
    </div>
  )
}
