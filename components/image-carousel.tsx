"use client"

import { useState, useEffect } from "react"

export function ImageCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0)

  // Auto-play effect
  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      setIndex((i) => (i === images.length - 1 ? 0 : i + 1))
    }, 3000) // 3 seconds
    return () => clearInterval(timer)
  }, [images.length])

  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1))
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1))

  if (images.length === 0) {
    return (
      <div className="relative w-full h-56 overflow-hidden rounded-xl bg-neutral-100 flex items-center justify-center">
        <span className="text-neutral-400 text-sm">No images available</span>
      </div>
    )
  }

  return (
    <div className="relative w-full h-56 overflow-hidden rounded-xl">
      <img
        src={images[index] || "/placeholder.svg"}
        alt={`slide-${index}`}
        className="w-full h-full object-cover transition-all duration-500"
      />

      {/* navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}

      {/* indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === index ? "bg-white" : "bg-white/50"}`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
