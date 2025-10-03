"use client"

import { useState } from "react"

export function Itinerary({ steps }: { steps: { time?: string; day?: string; activity: string }[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center rounded-xl border border-neutral-300 px-4 py-3 text-sm font-semibold"
      >
        <span>Itinerary</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <ul className="mt-3 space-y-2 text-sm text-neutral-700">
          {steps.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-semibold w-16">{s.time || s.day}</span>
              <span>{s.activity}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
