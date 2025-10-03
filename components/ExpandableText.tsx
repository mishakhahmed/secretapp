"use client"

import { useState } from "react"

export function ExpandableText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false)
  const maxLength = 120

  if (!text) return null

  const displayText = expanded ? text : text.slice(0, maxLength) + (text.length > maxLength ? "…" : "")

  return (
    <div className="mt-3 text-sm text-neutral-800 leading-relaxed">
      {displayText}
      {text.length > maxLength && (
        <button className="ml-2 text-xs font-semibold text-blue-600" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  )
}
