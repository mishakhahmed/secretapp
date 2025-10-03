"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"

const YELLOW = "#FFD400"

function Screen({ children }: any) {
  return <div className="h-full w-full bg-white flex flex-col">{children}</div>
}

function AppHeader({ title, onBack }: { title?: string; onBack?: () => void }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-white/80">
      <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-neutral-100 min-h-[44px] min-w-[44px]">
        <ArrowLeft className="w-5 h-5" />
      </button>
      <span className="font-bold tracking-wide uppercase text-sm">{title ?? "Booking"}</span>
      <div className="w-5" />
    </div>
  )
}

export default function Booking({ exp, onBack }: { exp?: any; onBack: () => void }) {
  const [type, setType] = useState("solo")
  const [month, setMonth] = useState("November")
  const [budget, setBudget] = useState("$300–500")
  const [guestName, setGuestName] = useState("")
  const [guestEmail, setGuestEmail] = useState("")

  function buildWaLink(
    exp: any,
    travelerType: string,
    month: string,
    budget: string,
    guestName: string,
    guestEmail: string,
  ) {
    const base = `https://wa.me/8801322649020?text=`
    const msg = encodeURIComponent(
      `I want to book *${exp.title}* in *${exp.location}* (Price: $${exp.price}).\n\n` +
        `Traveler Type: ${travelerType}\n` +
        `Preferred Month: ${month}\n` +
        `Budget Range: ${budget}\n` +
        (guestName ? `Name: ${guestName}\n` : ``) +
        (guestEmail ? `Email: ${guestEmail}\n` : ``) +
        `\n- Secrets Bangladesh https://secretsbangladesh.com/tours/${exp.id}`,
    )
    return base + msg
  }

  function buildEmailLink(
    exp: any,
    travelerType: string,
    month: string,
    budget: string,
    guestName: string,
    guestEmail: string,
  ) {
    const to = `tours@secretsbangladesh.com`
    const subject = encodeURIComponent(`Booking Request: ${exp.title} (${exp.location})`)
    const body = encodeURIComponent(
      [
        `Hello Secrets Bangladesh team,`,
        ``,
        `I'd like to book the following tour:`,
        `• Tour: ${exp.title}`,
        `• Location: ${exp.location}`,
        `• Duration: ${exp.duration}`,
        `• Listed Price: $${exp.price}`,
        ``,
        `My details:`,
        `• Traveler Type: ${travelerType}`,
        `• Preferred Month: ${month}`,
        `• Budget Range: ${budget}`,
        guestName ? `• Name: ${guestName}` : ``,
        guestEmail ? `• Email: ${guestEmail}` : ``,
        ``,
        `Tour page: https://secretsbangladesh.com/tours/${exp.id}`,
        ``,
        `Thanks!`,
      ]
        .filter(Boolean)
        .join("\n"),
    )
    return `mailto:${to}?subject=${subject}&body=${body}`
  }

  return (
    <Screen>
      <AppHeader title="Booking" onBack={onBack} />
      <div className="px-4 py-4 pb-24 overflow-y-auto flex-1">
        {/* Selected tour summary */}
        <div className="text-xs uppercase tracking-widest text-neutral-500">Selected</div>
        <div className="mt-1 font-semibold">{exp?.title}</div>
        <div className="text-xs text-neutral-500">
          {exp?.location} · {exp?.duration}
        </div>

        {/* Traveler Type */}
        <div className="mt-5">
          <div className="text-sm font-semibold mb-2">Traveler Type</div>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm min-h-[44px]"
          >
            <option value="solo">Solo</option>
            <option value="couple">Couple</option>
            <option value="family">Family</option>
            <option value="group">Group</option>
            <option value="corporate">Corporate</option>
          </select>
        </div>

        {/* Preferred Month */}
        <div className="mt-5">
          <div className="text-sm font-semibold mb-2">Preferred Month</div>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm min-h-[44px]"
          >
            {[
              "October",
              "November",
              "December",
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
            ].map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Budget Range */}
        <div className="mt-5">
          <div className="text-sm font-semibold mb-2">Budget Range</div>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm min-h-[44px]"
          >
            <option>{"<$100"}</option>
            <option>$100–300</option>
            <option>$300–500</option>
            <option>$500–1000</option>
            <option>$1000+</option>
          </select>
        </div>

        {/* Optional contact fields */}
        <div className="mt-5 grid grid-cols-1 gap-3">
          <div>
            <div className="text-sm font-semibold mb-2">Your Name (optional)</div>
            <input
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm min-h-[44px]"
              placeholder="e.g., Mishak"
            />
          </div>
          <div>
            <div className="text-sm font-semibold mb-2">Your Email (optional)</div>
            <input
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm min-h-[44px]"
              placeholder="e.g., you@example.com"
              type="email"
            />
          </div>
        </div>

        {/* Primary CTA: WhatsApp */}
        <div className="mt-6">
          <a
            href={buildWaLink(exp, type, month, budget, guestName, guestEmail)}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center rounded-xl px-6 py-3 font-semibold text-white min-h-[48px]"
            style={{ backgroundColor: "#25D366" }}
          >
            Book via WhatsApp
          </a>
        </div>

        {/* Secondary CTA: Email fallback */}
        <div className="mt-3">
          <a
            href={buildEmailLink(exp, type, month, budget, guestName, guestEmail)}
            className="block w-full text-center rounded-xl px-6 py-3 font-semibold border border-neutral-300 min-h-[48px]"
          >
            Or email tours@secretsbangladesh.com
          </a>
        </div>

        <div className="text-xs text-neutral-500 mt-4">
          By proceeding you support community partners and women-led collectives.
        </div>
      </div>
    </Screen>
  )
}
