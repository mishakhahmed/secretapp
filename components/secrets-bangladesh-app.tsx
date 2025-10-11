"use client"

import type React from "react"

import { useEffect, useMemo, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronRight,
  ArrowLeft,
  Heart,
  HomeIcon,
  Search,
  Compass,
  BookOpen,
  MapPin,
  Hand,
  Map,
  User,
  Lock,
  Trophy,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { tours as toursData } from "@/data/tours"
import { ImageCarousel } from "@/components/image-carousel"
import { SmartIcon } from "@/components/SmartIcon"
import Booking from "@/components/Booking"
import { ExpandableText } from "@/components/ExpandableText"
import { Itinerary } from "@/components/Itinerary"
import dynamic from "next/dynamic"

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), { ssr: false })

/*************************************************
 * Secrets Bangladesh – iOS MVP (with Site Map)
 * - Splash → Inspire → Experiences → Detail → Booking
 * - Stories (with audio on Fishermen's Secret)
 * - Map (OSM embed)
 * - Site Map screen (quick links to all sections)
 *************************************************/

/*************** CONFIG: Image Sources ****************/
const IMG = {
  // brand
  logo: "/brand-logo.png",

  // home + moods
  heroImage1: "/1-Home-vegetable-seller-secrets.jpeg",
  heroImage2: "/hero-image-2.jpg",
  heroImage3: "/hero-image-3.jpg",
  moodInspired: "/mood-inspired.jpeg",
  moodLiberated: "/mood-liberated.jpeg",
  moodReconnected: "/mood-reconnected.jpeg",
  moodTransformed: "/mood-transformed.jpeg",

  // tours - multiple images per tour
  fishermen1: "/tour-fishermens-secret-1.jpeg",
  fishermen2: "/tour-fishermens-secret-2.jpg",
  fishermen3: "/tour-fishermens-secret-3.jpg",
  fishermen4: "/tour-fishermens-secret-4.jpg",
  fishermen5: "/tour-fishermens-secret-5.jpg",
  oldDhaka: "/tour-old-dhaka.jpeg",
  panam: "/tour-panam-sonargaon.jpeg",
  jamdani1: "/tour-jamdani-loom-1.jpeg",
  jamdani2: "/tour-jamdani-loom-2.jpg",
  sufi: "/tour-sufi-saints.jpeg",
  culinary: "/tour-culinary-pilgrimage.jpeg",

  // stories (covers)
  storyFishermen: "/stories/story-fishermans-secret.jpeg",
  storyPanam: "/stories/story-threads-of-panam.jpg",
  storyOldDhaka: "/stories/story-old-dhaka-guide.jpg",
  storySpice: "/stories/story-old-dhaka-spice.jpg",
  storyPartitionFish: "/stories/story-partition-fish.jpeg",
  storyRevatiBhaban: "/stories/story-revati-bhaban.jpeg",
}

const YELLOW = "#FFD400"

function useBrandImages() {
  const [urls, setUrls] = useState(IMG)
  useEffect(() => {
    const ext = (typeof window !== "undefined" && (window as any).SECRETS_IMAGE_URLS) || {}
    setUrls({ ...IMG, ...ext })
  }, [])
  return urls
}

function Screen({ children }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  )
}

function StatusBar() {
  return <div className="h-5" />
}

function AppHeader({ title, onBack }: { title?: string; onBack?: () => void }) {
  const imgs = useBrandImages()

  const openWhatsApp = () => {
    window.open(
      "https://wa.me/8801322649020?text=Hi! I'd like to learn more about Secrets Bangladesh experiences.",
      "_blank",
      "noopener,noreferrer",
    )
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex items-center gap-3">
        {onBack ? (
          <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-neutral-100 min-h-[44px] min-w-[44px]">
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <span className="w-5" />
        )}
        <div className="flex items-center gap-2">
          <img src={imgs.logo || "/placeholder.svg"} alt="Secrets Bangladesh" className="h-6 w-auto" />
          <span className="font-bold tracking-wide uppercase text-sm">{title ?? "Secrets Bangladesh"}</span>
        </div>
      </div>
      <button
        onClick={openWhatsApp}
        className="p-2 -mr-2 rounded-xl hover:bg-green-50 transition-colors min-h-[44px] min-w-[44px]"
        title="Contact us on WhatsApp"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
            fill="#25D366"
          />
        </svg>
      </button>
    </div>
  )
}

function SmartImg({ src, alt = "", className = "" }: any) {
  const [cur, setCur] = useState(src)
  return (
    <img
      src={cur || "/placeholder.svg"}
      alt={alt}
      className={className}
      onError={() => setCur(IMG.heroImage1)}
      loading="lazy"
    />
  )
}

function PaginationDots({ total, active }: { total: number; active: number }) {
  return (
    <div className="flex items-center justify-center gap-1.5 py-3">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-black" : "w-1.5 bg-neutral-300"}`}
        />
      ))}
    </div>
  )
}

/* ===================== SPLASH ===================== */
function Splash({ onContinue, imgs }: { onContinue: () => void; imgs: any }) {
  const [hoverStartTime, setHoverStartTime] = useState<number | null>(null)

  const handleSealHoverStart = () => {
    setHoverStartTime(Date.now())
    console.log("[v0] Seal Hover Start")
  }

  const handleSealHoverEnd = () => {
    if (hoverStartTime) {
      const dwellTime = Date.now() - hoverStartTime
      console.log("[v0] Seal Hover End", `${dwellTime}ms`)
      setHoverStartTime(null)
    }
  }

  const handleSealClick = () => {
    const dwellTime = hoverStartTime ? Date.now() - hoverStartTime : 0
    console.log("[v0] Seal Clicked", { dwell: `${dwellTime}ms` })
    setHoverStartTime(null)
    onContinue()
  }

  return (
    <Screen>
      <div className="relative h-full bg-[#0c0c0c]">
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8">
          <motion.h1
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-2xl font-bold text-center text-[#FFD400] leading-tight mb-2"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Every city keeps its secrets.
          </motion.h1>
          <p className="text-center text-white/90 text-sm mb-8">Break the seal to discover yours.</p>

          <button
            onClick={handleSealClick}
            onMouseEnter={handleSealHoverStart}
            onMouseLeave={handleSealHoverEnd}
            onTouchStart={handleSealHoverStart}
            onTouchEnd={handleSealHoverEnd}
            className="relative w-40 h-40 rounded-full transition-all hover:scale-105"
          >
            <img
              src="/assets/Secrets-wax-seal.png"
              alt="Secrets Bangladesh Wax Seal"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </button>

          <p className="text-center text-white/80 text-sm mt-8">Tap the seal to begin your journey</p>
        </div>
      </div>
    </Screen>
  )
}

/* ===================== INSPIRE (Mood Funnel) ===================== */
function MoodCard({ mood, onSelect }: any) {
  return (
    <button
      onClick={() => onSelect(mood)}
      className="group relative overflow-hidden rounded-2xl shadow-sm border border-neutral-200 min-h-[44px]"
    >
      <SmartImg src={mood.image} alt={mood.title} className="h-36 w-full object-cover" />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
        <div>
          <div className="text-white text-xl font-semibold drop-shadow">{mood.title}</div>
          <div className="text-white/90 text-sm drop-shadow">{mood.subtitle}</div>
        </div>
        <div className="bg-white/90 rounded-full p-2">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </button>
  )
}

/* ===================== INSPIRE (Full Mood Pathways) ===================== */
function Inspire({ onPickMood, goExperiences, imgs }: any) {
  const [step, setStep] = useState<"seal" | "mood" | "pathway">("mood")
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [hoverStartTime, setHoverStartTime] = useState<number | null>(null)

  const [memoryBasket, setMemoryBasket] = useState<string[]>([])

  const moods = ["Inspired", "Liberated", "Reconnected", "Transformed"]

  const trackEvent = (action: string, label: string, value?: any) => {
    console.log("[v0] Tracking Event:", action, label, value)
    // TODO: Integrate with analytics service later
  }

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "CINEMATIC_BACK" || event.data?.type === "CINEMATIC_COMPLETE") {
        console.log("[v0] Cinematic message received:", event.data.type)
        // Redirect to Experiences tab
        goExperiences()
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [goExperiences])

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood)
    if (mood === "Inspired") {
      window.open("https://secretsbd-visualjourney.vercel.app/loom", "_blank")
    } else {
      // Other moods go to pathway
      setStep("pathway")
    }
  }

  const handleSealHoverStart = () => {
    setHoverStartTime(Date.now())
    trackEvent("Seal Hover Start", "Wax Seal")
  }

  const handleSealHoverEnd = () => {
    if (hoverStartTime) {
      const dwellTime = Date.now() - hoverStartTime
      trackEvent("Seal Hover End", "Wax Seal", `${dwellTime}ms`)
      setHoverStartTime(null)
    }
  }

  const handleSealClick = () => {
    setStep("mood")
    const dwellTime = hoverStartTime ? Date.now() - hoverStartTime : 0
    trackEvent("Seal Clicked", "Wax Seal", { dwell: `${dwellTime}ms` })
    setHoverStartTime(null)
  }

  const handlePathwayClick = (pathway: string) => {
    trackEvent("Pathway Selected", pathway, selectedMood)
    if (pathway === "Enquire Now") {
      window.open("https://wa.me/8801322649020?text=I want to book a tour - Secrets Bangladesh", "_blank")
    } else if (pathway === "Shuffle Deck Explore") {
      goExperiences()
    }
  }

  const addToBasket = (memory: string) => {
    if (!memoryBasket.includes(memory)) {
      setMemoryBasket([...memoryBasket, memory])
      trackEvent("Memory Added", memory)
    }
  }

  const CinematicScene = ({
    image,
    title,
    note1,
    note2,
    label,
    dark,
    light,
    mystery,
  }: {
    image?: string
    title: string
    note1: string
    note2: string
    label: string
    dark?: boolean
    light?: boolean
    mystery?: boolean
  }) => {
    const isLight = light || (!dark && !mystery)
    const textColorClass = isLight ? "text-black" : "text-white"
    const noteColorClass = isLight ? "text-neutral-700" : "text-neutral-300"
    const backdropClass = dark ? "bg-black/80" : isLight ? "bg-white/80" : "bg-black/60"
    const mysteryOverlayClass = mystery
      ? "after:content-['?'] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:text-[20vw] after:font-bold after:opacity-20"
      : ""

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        className={`relative h-screen w-full snap-start flex flex-col items-center justify-center text-center p-8 ${backdropClass} ${mysteryOverlayClass}`}
        style={{
          backgroundImage: image ? `url(${image})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {image && <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent" />}
        <h2
          className={`text-4xl font-bold mb-2 drop-shadow-lg ${textColorClass}`}
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {title}
        </h2>
        <p className={`text-lg mb-4 ${noteColorClass} max-w-md leading-relaxed`}>{note1}</p>
        <p className={`text-lg ${noteColorClass} max-w-md leading-relaxed`}>{note2}</p>
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-sm uppercase tracking-widest font-light ${noteColorClass}`}
        >
          {label}
        </div>
      </motion.div>
    )
  }

  return (
    <Screen>
      <div className="h-full flex flex-col overflow-hidden bg-[#0c0c0c]">
        <AppHeader title="Pursuit of Feeling" />

        <AnimatePresence mode="wait">
          {step === "seal" && (
            <motion.div
              key="seal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex flex-col items-center justify-center px-4 pb-28"
            >
              <h1
                className="text-2xl font-bold text-center text-[#FFD400] leading-tight mb-2"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Every city keeps its secrets.
              </h1>
              <p className="text-center text-white/90 text-sm mb-8">Break the seal to discover yours.</p>

              <button
                onClick={handleSealClick}
                onMouseEnter={handleSealHoverStart}
                onMouseLeave={handleSealHoverEnd}
                onTouchStart={handleSealHoverStart}
                onTouchEnd={handleSealHoverEnd}
                className="relative w-40 h-40 rounded-full transition-all hover:scale-105"
              >
                <img
                  src="/assets/Secrets-wax-seal.png"
                  alt="Secrets Bangladesh Wax Seal"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </button>

              <p className="text-center text-white/80 text-sm mt-8">Tap the seal to begin your journey</p>
            </motion.div>
          )}

          {step === "mood" && (
            <motion.div
              key="mood"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex flex-col items-center justify-center px-4 pb-28"
            >
              <div className="text-center mb-8">
                <h2 className="text-xl text-[#FFD400] font-semibold mb-2">Our Secret Starts with you,</h2>
                <p className="text-lg text-white/90">......What do you feel? ......</p>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                {moods.map((mood) => (
                  <button
                    key={mood}
                    data-mood={mood.toLowerCase()}
                    onClick={() => handleMoodSelect(mood)}
                    className="px-6 py-4 rounded-xl border-2 border-[#FFD400] text-[#FFD400] hover:bg-[#FFD400] hover:text-black transition-all min-h-[44px] font-medium"
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "pathway" && selectedMood && (
            <motion.div
              key="pathway"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex-1 overflow-y-auto px-4 pt-8 pb-28"
            >
              {selectedMood === "Liberated" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <div className="bg-[#1a1a1a] border border-[#FFD400] rounded-2xl p-5 shadow-lg">
                    <h2
                      className="text-xl font-bold text-[#FFD400] mb-2"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      Liberated • Breaking Boundaries
                    </h2>
                    <p className="text-white/90 text-sm mb-4">
                      Freedom is found in the journey. Break free from the ordinary and discover uncharted paths.
                    </p>
                    {/* Freedom animation */}
                    <div className="relative h-40 rounded-xl overflow-hidden bg-gradient-to-br from-blue-900 to-cyan-600 mb-4">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 border-4 border-white/30 rounded-full animate-ping" />
                        <div className="absolute w-24 h-24 border-4 border-white/50 rounded-full animate-pulse" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#1a1a1a] border border-[#FFD400] rounded-2xl p-5 shadow-lg">
                    <h3 className="text-lg font-bold text-[#FFD400] mb-3">Your Liberation Path</h3>
                    <div className="space-y-3">
                      <div className="bg-[#0f1418] border border-dashed border-[#FFD400] rounded-xl p-3">
                        <div className="font-semibold text-white text-sm">MORNING — Open Waters</div>
                        <div className="text-xs text-white/80 mt-1">
                          Sail beyond the horizon • Feel the wind of freedom
                        </div>
                      </div>
                      <div className="bg-[#0f1418] border border-dashed border-[#FFD400] rounded-xl p-3">
                        <div className="font-semibold text-white text-sm">AFTERNOON — Untamed Trails</div>
                        <div className="text-xs text-white/80 mt-1">Explore hidden paths • Break your own trail</div>
                      </div>
                      <div className="bg-[#0f1418] border border-dashed border-[#FFD400] rounded-xl p-3">
                        <div className="font-semibold text-white text-sm">EVENING — Liberation Ritual</div>
                        <div className="text-xs text-white/80 mt-1">
                          Release what holds you back • Embrace new beginnings
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handlePathwayClick("Enquire Now")}
                      className="w-full bg-[#FFD400] text-black font-bold px-6 py-2.5 rounded-lg hover:bg-[#ffd400]/90 transition-colors min-h-[44px] mt-4"
                    >
                      Enquire Now
                    </button>
                  </div>
                </motion.div>
              )}

              {selectedMood === "Reconnected" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <div className="bg-[#1a1a1a] border border-[#FFD400] rounded-2xl p-5 shadow-lg">
                    <h2
                      className="text-xl font-bold text-[#FFD400] mb-2"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      Reconnected • Memory Album
                    </h2>
                    <p className="text-white/90 text-sm mb-4">
                      To reconnect is to remember. Gather stories, pass them on.
                    </p>

                    <div className="grid grid-cols-1 gap-4">
                      {[
                        {
                          id: "old-dhaka",
                          title: "Spice Lane Memory",
                          desc: "Fragrant alleys where history whispers through rose attar and cardamom.",
                          image: imgs.oldDhaka,
                        },
                        {
                          id: "panam-sonargaon",
                          title: "Golden Capital Echo",
                          desc: "Step into a city of whispers — decayed palaces, fading frescoes.",
                          image: imgs.panam,
                        },
                        {
                          id: "fishermens-secret",
                          title: "Dawn Net Ritual",
                          desc: "Cast nets at blue hour and taste the first catch with local boatmen.",
                          image: imgs.fishermen1,
                        },
                        {
                          id: "culinary-pilgrimage",
                          title: "Family Kitchen Secret",
                          desc: "Recipes as memory. Cook with families who've kept traditions alive.",
                          image: imgs.culinary,
                        },
                        {
                          id: "jamdani-loom",
                          title: "Weaver's Thread",
                          desc: "Watch silk transform into poetry on ancient looms.",
                          image: imgs.jamdani1,
                        },
                        {
                          id: "refugee-voices",
                          title: "Stories of Hope",
                          desc: "Listen to voices of resilience and community across generations.",
                          image: "/tour-voices-of-the-camps.jpeg", // Fixed image path
                        },
                        {
                          id: "sufi-saints",
                          title: "Blue Hour Devotion",
                          desc: "Sufi songs by the water as lanterns drift into twilight.",
                          image: imgs.sufi,
                        },
                      ].map((memory) => (
                        <div
                          key={memory.id}
                          className="flip-card"
                          onClick={(e) => {
                            const card = e.currentTarget
                            card.classList.toggle("flipped")
                          }}
                        >
                          <div className="flip-card-inner">
                            {/* Front Face */}
                            <div className="flip-card-front relative">
                              <SmartImg src={memory.image} alt={memory.title} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                              <div className="absolute bottom-0 left-0 right-0 p-4">
                                <h3 className="text-white font-bold text-lg drop-shadow-lg">{memory.title}</h3>
                                <p className="text-white/90 text-sm drop-shadow">Tap to reveal</p>
                              </div>
                            </div>

                            {/* Back Face */}
                            <div className="flip-card-back border-2 border-[#FFD400]">
                              <h3 className="text-black font-bold text-lg mb-3">{memory.title}</h3>
                              <p className="text-neutral-700 text-sm leading-relaxed mb-4 flex-1">{memory.desc}</p>
                              <div className="space-y-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    const waLink = `https://wa.me/8801322649020?text=I want to book ${memory.title} - Secrets Bangladesh`
                                    window.open(waLink, "_blank")
                                  }}
                                  className="w-full bg-[#FFD400] text-black font-bold px-4 py-2.5 rounded-lg hover:bg-[#ffd400]/90 transition-colors text-sm min-h-[44px]"
                                >
                                  Enquire Now
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    addToBasket(memory.title)
                                  }}
                                  className="w-full bg-white border-2 border-[#FFD400] text-black font-bold px-4 py-2.5 rounded-lg hover:bg-[#FFD400]/10 transition-colors text-sm min-h-[44px]"
                                >
                                  Add to Inspiration
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    trackEvent("Unfold Story", memory.title)
                                  }}
                                  className="w-full bg-white border-2 border-[#FFD400] text-black font-bold px-4 py-2.5 rounded-lg hover:bg-[#FFD400]/10 transition-colors text-sm min-h-[44px]"
                                >
                                  Unfold Story
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#1a1a1a] border border-[#FFD400] rounded-2xl p-5 shadow-lg">
                    <h3 className="text-lg font-bold text-[#FFD400] mb-3">Memory Basket (Plan)</h3>
                    <div className="border-2 border-dashed border-[#FFD400] rounded-xl p-4 min-h-[60px] bg-[#121212] mb-4">
                      {memoryBasket.length === 0 ? (
                        <p className="text-white/60 text-sm">Add moments to build a shared plan…</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {memoryBasket.map((item) => (
                            <span
                              key={item}
                              className="inline-block bg-[#FFD400] text-black rounded-full px-3 py-1.5 font-bold text-xs"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => trackEvent("Share with Friends", "Reconnected", memoryBasket.join(", "))}
                        className="flex-1 bg-[#FFD400] text-black font-bold px-4 py-2.5 rounded-lg hover:bg-[#ffd400]/90 transition-colors min-h-[44px]"
                      >
                        Share with Friends
                      </button>
                      <button
                        onClick={() => handlePathwayClick("Enquire Now")}
                        className="flex-1 bg-[#FFD400] text-black font-bold px-4 py-2.5 rounded-lg hover:bg-[#ffd400]/90 transition-colors min-h-[44px]"
                      >
                        Enquire Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedMood === "Transformed" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <div className="bg-[#1a1a1a] border border-[#FFD400] rounded-2xl p-5 shadow-lg">
                    <h2
                      className="text-xl font-bold text-[#FFD400] mb-2"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      Transformed • Journey of Awakening
                    </h2>
                    <p className="text-white/90 text-sm mb-4">
                      Transformation begins within. Seek the experiences that reshape your perspective.
                    </p>
                    {/* Transformation animation */}
                    <div className="relative h-40 rounded-xl overflow-hidden bg-gradient-to-br from-purple-900 to-pink-600 mb-4">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-white/20 rounded-full animate-[spin_3s_linear_infinite]" />
                        <div className="absolute w-32 h-32 border-2 border-white/30 rounded-full animate-[spin_4s_linear_infinite_reverse]" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#1a1a1a] border border-[#FFD400] rounded-2xl p-5 shadow-lg">
                    <h3 className="text-lg font-bold text-[#FFD400] mb-3">Your Transformation Journey</h3>
                    <div className="space-y-3">
                      <div className="bg-[#0f1418] border border-dashed border-[#FFD400] rounded-xl p-3">
                        <div className="font-semibold text-white text-sm">MORNING — Inner Awakening</div>
                        <div className="text-xs text-white/80 mt-1">
                          Meditation by the river • Connect with your essence
                        </div>
                      </div>
                      <div className="bg-[#0f1418] border border-dashed border-[#FFD400] rounded-xl p-3">
                        <div className="font-semibold text-white text-sm">AFTERNOON — Sacred Rituals</div>
                        <div className="text-xs text-white/80 mt-1">Ancient practices • Wisdom from local mystics</div>
                      </div>
                      <div className="bg-[#0f1418] border border-dashed border-[#FFD400] rounded-xl p-3">
                        <div className="font-semibold text-white text-sm">EVENING — Rebirth Ceremony</div>
                        <div className="text-xs text-white/80 mt-1">
                          Lantern release • Embrace your transformed self
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handlePathwayClick("Enquire Now")}
                      className="w-full bg-[#FFD400] text-black font-bold px-6 py-2.5 rounded-lg hover:bg-[#ffd400]/90 transition-colors min-h-[44px] mt-4"
                    >
                      Enquire Now
                    </button>
                  </div>
                </motion.div>
              )}

              {selectedMood === "Inspired" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <div className="bg-[#1a1a1a] border border-[#FFD400] rounded-2xl p-5 shadow-lg">
                    <h2
                      className="text-xl font-bold text-[#FFD400] mb-2"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      Inspired • Muse's Canvas
                    </h2>
                    <p className="text-white/90 text-sm mb-4">
                      Behold the beauty, absorb the hues, let creativity flow.
                    </p>
                    <div className="relative h-40 rounded-xl overflow-hidden bg-gradient-to-br from-purple-800 to-pink-600 mb-4">
                      <div className="absolute inset-0 bg-[url(/assets/abstract-paint-strokes.png)] bg-cover opacity-40" />
                      <div className="absolute inset-0 flex items-center justify-center text-center">
                        <h3 className="text-white text-2xl font-bold drop-shadow-lg">The Art of Bangladesh</h3>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#1a1a1a] border border-[#FFD400] rounded-2xl p-5 shadow-lg">
                    <h3 className="text-lg font-bold text-[#FFD400] mb-2">Your Creative Spark (Plan)</h3>
                    <p className="text-white/80 text-sm mb-4">
                      These moments are your inspiration. Save them, share them, or start creating.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => trackEvent("Save Inspiration", "Inspired")}
                        className="flex-1 bg-[#FFD400] text-black font-bold px-4 py-2.5 rounded-lg hover:bg-[#ffd400]/90 transition-colors min-h-[44px]"
                      >
                        Save Inspiration
                      </button>
                      <button
                        onClick={() => handlePathwayClick("Enquire Now")}
                        className="flex-1 bg-[#FFD400] text-black font-bold px-4 py-2.5 rounded-lg hover:bg-[#ffd400]/90 transition-colors min-h-[44px]"
                      >
                        Enquire Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Back button */}
              <div className="text-center mt-8">
                <button
                  onClick={() => setStep("mood")}
                  className="text-[#FFD400] font-semibold hover:underline min-h-[44px] px-4"
                >
                  ← Change Mood
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Screen>
  )
}

/* ===================== EXPERIENCES ===================== */
function Chip({ label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm border min-h-[44px] ${
        active ? "border-black bg-black text-white" : "border-neutral-300 bg-white text-neutral-700"
      }`}
    >
      {label}
    </button>
  )
}

function ExperienceTile({ exp, onOpen }: any) {
  return (
    <div className="rounded-2xl border border-neutral-200 overflow-hidden bg-white shadow-sm relative">
      {/* Subtle archival background overlay */}
      <div className="absolute inset-0 bg-[url(/old-scroll-backdrop.png)] bg-cover bg-center opacity-5 pointer-events-none" />

      <div className="relative z-10">
        <button onClick={() => onOpen(exp)} className="w-full">
          <SmartImg src={exp.image} alt={exp.title} className="w-full h-48 object-cover" />
        </button>
        <div className="p-4">
          <button onClick={() => onOpen(exp)} className="text-left w-full">
            <div className="font-semibold text-lg">{exp.title}</div>
            <div className="text-sm text-neutral-500 flex items-center gap-1 mt-1">
              📍 {exp.location} · ⏱️ {exp.duration}
            </div>
            <div className="text-base mt-1 font-medium">💵 From ${exp.price}</div>
          </button>
          {exp.features && exp.features.length > 0 && (
            <div className="mt-3 flex gap-2 flex-wrap">
              {exp.features.slice(0, 4).map((f: string) => (
                <div key={f} className="flex flex-col items-center text-[10px] text-neutral-600">
                  <SmartIcon name={f as any} theme="light" size={16} />
                </div>
              ))}
            </div>
          )}
          <Button
            onClick={() => {
              const waLink = `https://wa.me/8801322649020?text=I want to book ${exp.title} in ${exp.location} (Price: $${exp.price}) - Secrets Bangladesh https://secretsbangladesh.com/tours/${exp.id}`
              window.open(waLink, "_blank")
            }}
            className="w-full mt-3 rounded-xl px-4 py-2.5 text-black text-base font-medium min-h-[44px]"
            style={{ backgroundColor: YELLOW }}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  )
}

type Tour = {
  id: string
  title: string
  location: string
  duration: string
  price: number
  category: string
  image: string
  story: string
  subtitle?: string
  highlights?: string[]
  itinerary?: any[]
  features?: string[]
}

function Experiences({ onBack, onOpenDetail, activeCategoryId, imgs }: any) {
  const categories = [
    { id: "all", title: "All" },
    { id: "heritage", title: "Heritage" },
    { id: "crafts", title: "Crafts" },
    { id: "food", title: "Food" },
    { id: "riversea", title: "River/Sea" },
    { id: "wildlife", title: "Wildlife" },
    { id: "people", title: "People" },
  ]

  const data: Tour[] = useMemo(
    () =>
      toursData.map((tour) => ({
        id: tour.id,
        title: tour.title,
        location: tour.location,
        duration: tour.duration,
        price: tour.price,
        category: tour.category,
        image: tour.images[0] || imgs.heroImage1,
        story: tour.overview,
        subtitle: tour.subtitle,
        highlights: tour.highlights,
        itinerary: tour.itinerary,
        images: tour.images,
        features: tour.features,
      })),
    [imgs],
  )

  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<string>(activeCategoryId || "all")
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => {
    let base = data
    if (category !== "all") base = base.filter((t) => t.category === category)
    if (query.trim()) {
      const q = query.toLowerCase()
      base = base.filter((t) => t.title.toLowerCase().includes(q) || t.location.toLowerCase().includes(q))
    }
    return base
  }, [data, query, category])

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft
        const cardWidth = 320 + 16
        const index = Math.round(scrollLeft / cardWidth)
        setActiveIndex(index)
      }
    }

    const ref = scrollRef.current
    if (ref) {
      ref.addEventListener("scroll", handleScroll)
      return () => ref.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <Screen>
      <div className="flex flex-col h-full">
        <AppHeader title="Experiences" onBack={onBack} />
        <div className="px-4 pt-6 py-3 pb-28 flex flex-col h-full">
          <div className="flex items-center gap-2 rounded-xl bg-neutral-50 border border-neutral-200 min-h-[44px]">
            <Search className="w-4 h-4 text-neutral-500" />
            <input
              className="bg-transparent outline-none text-base w-full"
              placeholder="Search Dhaka, river, craft…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
            {categories.map((c) => (
              <Chip key={c.id} label={c.title} active={category === c.id} onClick={() => setCategory(c.id)} />
            ))}
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex gap-4 mt-4 pb-4 no-scrollbar"
          >
            {filtered.map((e) => (
              <div key={e.id} className="snap-center flex-shrink-0 w-[320px]">
                <ExperienceTile exp={e} onOpen={onOpenDetail} />
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center text-base text-neutral-500 py-12 w-full">
                No matches yet — try a different filter.
              </div>
            )}
          </div>

          {filtered.length > 0 && <PaginationDots total={filtered.length} active={activeIndex} />}
        </div>
      </div>
    </Screen>
  )
}

/* ===================== DETAIL & BOOKING ===================== */
function ExperienceDetail({ exp, onBack, onBook }: any) {
  if (!exp) return null
  return (
    <Screen>
      <div className="h-full flex flex-col overflow-hidden">
        <AppHeader title="Experience" onBack={onBack} />
        <div className="flex-1 overflow-y-auto pt-6 pb-28">
          {exp.images && exp.images.length > 0 ? (
            <ImageCarousel images={exp.images} />
          ) : (
            <SmartImg src={exp.image} alt={exp.title} className="w-full h-56 object-cover" />
          )}
          <div className="px-4 py-4">
            <h2 className="text-2xl font-bold leading-tight">{exp.title}</h2>
            {exp.subtitle && <div className="text-base text-neutral-500 mt-1">{exp.subtitle}</div>}
            <div className="text-base text-neutral-600 flex items-center gap-1 mt-1">
              📍 {exp.location} · ⏱️ {exp.duration}
            </div>

            <ExpandableText text={exp.story} />

            {exp.features && exp.features.length > 0 && (
              <div className="mt-4 flex gap-4 flex-wrap">
                {exp.features.map((f: string) => (
                  <div key={f} className="flex flex-col items-center text-sm text-neutral-600">
                    <SmartIcon name={f as any} theme="light" size={28} />
                    <span className="mt-1 capitalize">{f.replace("-", " ")}</span>
                  </div>
                ))}
              </div>
            )}

            {exp.highlights && exp.highlights.length > 0 && (
              <div className="mt-4">
                <div className="text-base font-semibold mb-2">Highlights</div>
                <ul className="text-base text-neutral-700 space-y-1">
                  {exp.highlights.map((h: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-yellow-500 mt-0.5">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {exp.itinerary && exp.itinerary.length > 0 && <Itinerary steps={exp.itinerary} />}

            <div className="text-base text-neutral-600 mt-4">
              What's included: local hosts, entries, tastings, and support for partner communities.
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="text-xl font-semibold">💵 From ${exp.price}</div>
              <Button
                onClick={() => {
                  const waLink = `https://wa.me/8801322649020?text=I want to book ${exp.title} in ${exp.location} (Price: $${exp.price}) - Secrets Bangladesh https://secretsbangladesh.com/tours/${exp.id}`
                  window.open(waLink, "_blank")
                }}
                className="rounded-xl px-6 py-3 text-black min-h-[48px]"
                style={{ backgroundColor: YELLOW }}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  )
}

/* ===================== STORIES (Updated) ===================== */
function StoriesSection({ imgs }: { imgs: any }) {
  const cards = [
    {
      id: "revati-bhaban",
      title: "Revati Mohan Das Lodge",
      type: "Interactive",
      desc: "A neo-Classical residence on the bank of the former Dholai Khal — explore the timeline of this elaborate Dhaka heritage site.",
      image: "/stories/story-revati-bhaban.jpeg",
      link: "https://revatibhabansecrets.vercel.app",
    },
    {
      id: "old-dhaka-guide",
      title: "Old Dhaka Self Guided Walk",
      type: "Audio",
      desc: "Navigate the winding lanes of Old Dhaka with this immersive audio guide through history and heritage.",
      image: imgs.oldDhaka,
      audio: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Old-dhaka-self-guided-walk-nLctIcASHfeQwC04uhr44aTZ0LZEWn.mp3",
    },
    {
      id: "fishermen",
      title: "Fishermen's Secret — Dawn on the Bay",
      type: "Audio",
      desc: "Cast nets at blue hour and taste the first catch with local boatmen.",
      image: imgs.storyFishermen,
      audio: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fishermens%20Secret-Audio%202-tcp6Xi9ALeyQnpvLS3W4Tk518NhApc.mp3",
    },
    {
      id: "panam",
      title: "Threads of Panam",
      type: "Video",
      desc: "Echoes in a ghost city of merchants and Jamdani weavers.",
      image: imgs.storyPanam,
      video: "https://m.youtube.com/watch?v=qzPlhd2lHOo",
    },
    {
      id: "spice",
      title: "Spice Market Reverie — Old Dhaka",
      type: "Video",
      desc: "Fragrant alleys, rose attar rituals, rooftop tea.",
      image: imgs.storySpice,
      video: "https://youtube.com/shorts/wzJ6DM9FNb0?si=mJWgKXrhgVVNbTIz",
    },
    {
      id: "partition",
      title: "The Partition Fish",
      type: "Video",
      desc: "Stories of migration carried by river and sea.",
      image: imgs.storyPartitionFish,
      video: "https://youtube.com/shorts/Jejii-xSxJQ?si=EB_acTw69W_mUu3R",
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft
        const cardWidth = 320 + 16 // card width + gap
        const index = Math.round(scrollLeft / cardWidth)
        setActiveIndex(index)
      }
    }

    const ref = scrollRef.current
    if (ref) {
      ref.addEventListener("scroll", handleScroll)
      return () => ref.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section
      id="stories"
      className="h-full max-h-full flex flex-col overflow-hidden relative pt-6 pb-28"
      style={{
        backgroundImage: "url(/old-scroll-backdrop.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />

      <div className="relative z-10 px-4 pt-2 pb-3 flex-shrink-0">
        <div className="flex items-center gap-2 text-sm uppercase tracking-widest text-black">
          <BookOpen className="w-4 h-4" /> Pursue your story
        </div>
      </div>

      <div className="relative flex-1 z-10 overflow-hidden">
        <div
          ref={scrollRef}
          className="h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex gap-4 px-4 py-6 no-scrollbar scroll-smooth"
        >
          {cards.map((c, index) => (
            <div key={c.id} className="snap-center flex-shrink-0 w-[320px] h-[480px]">
              <article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white h-full shadow-lg flex flex-col">
                {/* Thumbnail */}
                <div className="relative h-40 w-full bg-neutral-100 flex-shrink-0">
                  <SmartImg src={c.image} alt={c.title} className="h-full w-full object-cover" />

                  {c.video && (
                    <a
                      href={c.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-2 right-2 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors z-10"
                      title="Watch on YouTube"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="white"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 ml-0.5"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </a>
                  )}

                  {index === 0 && (
                    <div className="absolute top-2 right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg z-10">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-4 h-4">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                  )}

                  {/* External Link Overlay */}
                  {c.link && (
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50"
                    >
                      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-6 h-6">
                          <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7z" />
                        </svg>
                      </div>
                    </a>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex-1 overflow-y-auto">
                  <h3 className="mt-2 text-lg font-semibold">{c.title}</h3>
                  <p className="mt-1 text-base text-neutral-600">{c.desc}</p>

                  {/* Audio Player */}
                  {c.audio && (
                    <div className="mt-3 rounded-xl border border-neutral-200 bg-neutral-50 p-3">
                      <div className="text-xs uppercase tracking-widest text-neutral-600 mb-1">Audio Teaser</div>
                      <audio controls preload="metadata" className="w-full">
                        <source src={c.audio} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-20">
          <img
            src="/assets/Secrets-wax-seal.png"
            alt="Historical Timeline"
            className="w-16 h-16 object-contain opacity-90 drop-shadow-2xl"
          />
        </div>
      </div>

      <div className="relative z-10 pb-2 flex-shrink-0">
        <PaginationDots total={cards.length} active={activeIndex} />
      </div>
    </section>
  )
}

/* ===================== MAP (Interactive Leaflet) ===================== */
function MapSection() {
  const openMap = () => {
    window.open("/Map.html", "_blank", "noopener,noreferrer")
  }

  const openGoogleMaps = () => {
    // Opens Google Maps centered on Old Dhaka heritage area
    window.open(
      "https://www.google.com/maps/dir/?api=1&destination=23.7104,90.4074&travelmode=walking",
      "_blank",
      "noopener,noreferrer",
    )
  }

  return (
    <section id="map" className="relative h-full flex flex-col overflow-hidden pt-6 pb-28">
      <div className="px-4 pt-2 pb-3 flex-shrink-0">
        <div className="flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-500">
          <Hand className="w-4 h-4" />
          <Map className="w-4 h-4" />
          Are you ready?
        </div>
        <p className="text-sm text-neutral-600 mt-1">
          Tap yellow markers to unlock stories from Old Dhaka's hidden corners
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 justify-center">
            <button
              onClick={openMap}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 transition-colors min-h-[44px]"
              title="Open Interactive Map"
            >
              <Map className="w-5 h-5 text-neutral-700" />
              <span className="text-sm font-medium">Interactive Map</span>
            </button>

            <button
              onClick={openGoogleMaps}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-blue-500 bg-blue-50 hover:bg-blue-100 transition-colors min-h-[44px] shadow-sm"
              title="Get Directions via Google Maps"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                  fill="#4285F4"
                />
                <path
                  d="M12 11.5c1.38 0 2.5-1.12 2.5-2.5S13.38 6.5 12 6.5 9.5 7.62 9.5 9s1.12 2.5 2.5 2.5z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-sm font-medium text-blue-700">Google Maps</span>
            </button>
          </div>

          <div className="h-[500px] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm flex-shrink-0">
            <iframe src="/Map.html" className="w-full h-full border-0" title="Heritage Sites Map" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ===================== SITE MAP (NEW) ===================== */
function SiteMap({ go }: { go: (route: string) => void }) {
  const items = [
    { id: "splash", title: "Home (Splash)", desc: "Hero + Inspire Me", action: () => go("splash") },
    {
      id: "feel",
      title: "Feel (Mood Funnel)",
      desc: "Curious / Adventurous / Reconnected / Inspired",
      action: () => go("feel"),
    },
    { id: "experiences", title: "Experiences", desc: "Search + filters + list", action: () => go("experiences") },
    { id: "stories", title: "Stories", desc: "Field stories + audio", action: () => go("stories") },
    { id: "map", title: "Map", desc: "Interactive Leaflet map + pins", action: () => go("map") },
    { id: "detail", title: "Sample Tour Detail", desc: "Opens Old Dhaka card", action: () => go("detail") },
    { id: "booking", title: "Booking (Demo)", desc: "Traveler type + guests + totals", action: () => go("booking") },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft
        const cardWidth = 300 + 16
        const index = Math.round(scrollLeft / cardWidth)
        setActiveIndex(index)
      }
    }

    const ref = scrollRef.current
    if (ref) {
      ref.addEventListener("scroll", handleScroll)
      return () => ref.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <Screen>
      <div className="flex flex-col h-full">
        <AppHeader title="Site Map" />
        <div
          ref={scrollRef}
          className="flex-1 overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex gap-4 px-4 pt-6 py-6 pb-28 no-scrollbar"
        >
          {items.map((it) => (
            <div key={it.id} className="snap-center flex-shrink-0 w-[300px] rounded-2xl border border-neutral-200 p-4">
              <div className="font-semibold text-lg">{it.title}</div>
              <div className="text-base text-neutral-600 mt-0.5">{it.desc}</div>
              <div className="mt-3">
                <Button
                  onClick={it.action}
                  className="w-full rounded-xl px-4 py-3 text-black min-h-[48px]"
                  style={{ backgroundColor: YELLOW }}
                >
                  Go
                </Button>
              </div>
            </div>
          ))}
        </div>
        <PaginationDots total={items.length} active={activeIndex} />
      </div>
    </Screen>
  )
}

/* ===================== ACCOUNT ===================== */
function AccountSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  // Check if user is logged in on mount
  useEffect(() => {
    const user = localStorage.getItem("secrets_user")
    if (user) {
      const userData = JSON.parse(user)
      setIsLoggedIn(true)
      setName(userData.name)
      setEmail(userData.email)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple login - store in localStorage
    const userData = { email, name: name || email.split("@")[0] }
    localStorage.setItem("secrets_user", JSON.JSON.stringify(userData))
    setIsLoggedIn(true)
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple signup - store in localStorage
    const userData = { email, name }
    localStorage.setItem("secrets_user", JSON.JSON.stringify(userData))
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("secrets_user")
    setIsLoggedIn(false)
    setEmail("")
    setPassword("")
    setName("")
  }

  const openWhatsApp = () => {
    window.open(
      "https://wa.me/8801322649020?text=Hi! I'd like to learn more about Secrets Bangladesh experiences.",
      "_blank",
      "noopener,noreferrer",
    )
  }

  if (!isLoggedIn) {
    return (
      <section id="account" className="h-full flex flex-col overflow-hidden pt-6 pb-28">
        <div className="px-4 pt-2 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-500">
            <User className="w-4 h-4" /> Your Account
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="space-y-4">
            {/* Benefits Banner */}
            <div className="rounded-2xl border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="w-5 h-5 text-yellow-600" />
                <h3 className="font-bold text-lg">Unlock Exclusive Benefits</h3>
              </div>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>Access exclusive hidden stories and secret locations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>Join travel treasure hunts with real rewards</span>
                </li>
                <li className="flex items-start gap-2">
                  <Heart className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>Save your favorite experiences and stories</span>
                </li>
              </ul>
            </div>

            {/* Login/Signup Toggle */}
            <div className="flex gap-2 p-1 bg-neutral-100 rounded-xl">
              <button
                onClick={() => setShowLogin(true)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
                  showLogin ? "bg-white shadow-sm" : "text-neutral-600"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setShowLogin(false)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
                  !showLogin ? "bg-white shadow-sm" : "text-neutral-600"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Login Form */}
            {showLogin ? (
              <form onSubmit={handleLogin} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Welcome Back</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full rounded-xl px-4 py-3 text-black font-medium min-h-[48px]"
                    style={{ backgroundColor: YELLOW }}
                  >
                    Login
                  </Button>
                </div>
              </form>
            ) : (
              // Signup Form
              <form onSubmit={handleSignup} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Create Account</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full rounded-xl px-4 py-3 text-black font-medium min-h-[48px]"
                    style={{ backgroundColor: YELLOW }}
                  >
                    Sign Up
                  </Button>
                </div>
              </form>
            )}

            {/* Note about free features */}
            <div className="text-center text-sm text-neutral-500">
              <p>Booking tours and viewing stories is always free.</p>
              <p className="mt-1">Login to unlock exclusive content.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="account" className="h-full flex flex-col overflow-hidden pt-6 pb-28">
      <div className="px-4 pt-2 pb-3 flex-shrink-0">
        <div className="flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-500">
          <User className="w-4 h-4" /> Your Account
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="space-y-4">
          {/* Profile Section */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center">
                  <User className="w-8 h-8 text-black" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{name}</h3>
                  <p className="text-sm text-neutral-600">{email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-neutral-600 hover:text-black transition-colors px-3 py-2 rounded-lg hover:bg-neutral-100"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Exclusive Content - Only for logged-in users */}
          <div className="rounded-2xl border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-5 h-5 text-yellow-600" />
              <h3 className="font-bold text-lg">Exclusive Content</h3>
            </div>
            <p className="text-sm text-neutral-700 mb-4">
              Unlock hidden stories and secret locations only available to members.
            </p>
            <Button
              className="w-full rounded-xl px-4 py-3 text-black font-medium min-h-[48px]"
              style={{ backgroundColor: YELLOW }}
            >
              Explore Exclusive Stories
            </Button>
          </div>

          {/* Travel Treasure Hunts - Only for logged-in users */}
          <div className="rounded-2xl border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-5 h-5 text-yellow-600" />
              <h3 className="font-bold text-lg">Travel Treasure Hunts</h3>
            </div>
            <p className="text-sm text-neutral-700 mb-4">
              Join interactive treasure hunts across Bangladesh and win real rewards!
            </p>
            <Button
              className="w-full rounded-xl px-4 py-3 text-black font-medium min-h-[48px]"
              style={{ backgroundColor: YELLOW }}
            >
              Start Treasure Hunt
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm">
            <button
              onClick={openWhatsApp}
              className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors border-b border-neutral-200 min-h-[56px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                      fill="#25D366"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-medium">Contact Us</div>
                  <div className="text-sm text-neutral-600">Chat on WhatsApp</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-neutral-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors border-b border-neutral-200 min-h-[56px]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-black" />
                </div>
                <div className="text-left">
                  <div className="font-medium">My Bookings</div>
                  <div className="text-sm text-neutral-600">View your experiences</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-neutral-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors min-h-[56px]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-black" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Saved Stories</div>
                  <div className="text-sm text-neutral-600">Your favorite moments</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-neutral-400" />
            </button>
          </div>

          {/* About */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">About Secrets Bangladesh</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              We curate immersive experiences that reveal the raw, radiant, and real stories of Bangladesh. From hidden
              alleys to river journeys, every experience connects you with local communities and living heritage.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ===================== BOTTOM NAV ===================== */
function BottomNav({ active, setActive, showSiteMap }: any) {
  const Item = ({ id, label, icon: Icon }: any) => (
    <button
      onClick={() => setActive(id)}
      className={`flex flex-col items-center justify-center gap-1.5 flex-1 py-3 min-h-[56px] ${active === id ? "text-black" : "text-neutral-500"}`}
    >
      <Icon className="w-7 h-7" />
      <span className="text-xs uppercase tracking-widest">{label}</span>
    </button>
  )
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-neutral-200 bg-white/90 backdrop-blur pb-6">
      <div className="flex">
        <Item id="feel" label="Feel" icon={HomeIcon} />
        <Item id="experiences" label="Experiences" icon={BookOpen} />
        <Item id="stories" label="Stories" icon={Heart} />
        <Item id="map" label="Map" icon={MapPin} />
        <Item id="account" label="Account" icon={User} />
        {showSiteMap && <Item id="sitemap" label="Site Map" icon={Compass} />}
      </div>
    </div>
  )
}

/* ===================== ROOT ===================== */
export default function SecretsBangladeshApp() {
  const imgs = useBrandImages()
  const [route, setRoute] = useState<
    "splash" | "feel" | "experiences" | "detail" | "booking" | "stories" | "map" | "account" | "sitemap"
  >("splash")
  const [detail, setDetail] = useState<any>(null)
  const [bottom, setBottom] = useState<"feel" | "experiences" | "stories" | "map" | "account" | "sitemap">("feel")

  const [showSiteMap, setShowSiteMap] = useState(false)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setShowSiteMap(params.get("debug") === "1")
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const moodParam = params.get("mood")
    if (moodParam) {
      setRoute("feel")
      setBottom("feel")
      // Trigger the mood pathway display
      setTimeout(() => {
        const moodButton = document.querySelector(`[data-mood="${moodParam}"]`)
        if (moodButton) {
          ;(moodButton as HTMLButtonElement).click()
        }
      }, 100)
    }
  }, [])

  // Removed duplicate message listener, as it's now in Inspire component
  // useEffect(() => {
  //   const handleMessage = (event: MessageEvent) => {
  //     if (event.data.type === "CINEMATIC_BACK") {
  //       setRoute("experiences")
  //       setBottom("experiences")
  //     }
  //   }

  //   window.addEventListener("message", handleMessage)
  //   return () => window.removeEventListener("message", handleMessage)
  // }, [])

  const openDetail = (exp: any) => {
    setDetail(exp)
    setRoute("detail")
  }
  const openBooking = () => setRoute("booking")

  const sampleTour = {
    id: "old-dhaka",
    title: "Secrets of Old Dhaka",
    location: "Dhaka",
    duration: "5h",
    price: 49,
    image: imgs.oldDhaka,
    story: "Spice lanes, Mughal echoes, bookshops, courtyards—unlock memory cards as you walk.",
  }

  return (
    <div className="mx-auto max-w-sm h-[844px] w-[390px] rounded-[44px] border border-neutral-300 overflow-hidden shadow-2xl relative bg-white">
      <div className="absolute inset-0 flex flex-col">
        <StatusBar />
        <AnimatePresence mode="wait">
          {route === "splash" && <Splash key="splash" onContinue={() => setRoute("feel")} imgs={imgs} />}

          {route === "feel" && (
            <Inspire
              key="feel"
              imgs={imgs}
              onPickMood={(mood) => {
                setBottom("experiences")
                setRoute("experiences")
              }}
              goExperiences={() => {
                setBottom("experiences")
                setRoute("experiences")
              }}
            />
          )}

          {route === "experiences" && (
            <Experiences
              key="experiences"
              imgs={imgs}
              onBack={() => setRoute("feel")}
              onOpenDetail={openDetail}
              activeCategoryId={"all"}
            />
          )}

          {route === "detail" && (
            <ExperienceDetail
              key="detail"
              exp={detail || sampleTour}
              onBack={() => setRoute("experiences")}
              onBook={openBooking}
            />
          )}

          {route === "booking" && (
            <Booking key="booking" exp={detail || sampleTour} onBack={() => setRoute("detail")} />
          )}

          {route === "stories" && (
            <Screen key="stories">
              <AppHeader title="Stories" onBack={() => setRoute("feel")} />
              <StoriesSection imgs={imgs} />
            </Screen>
          )}

          {route === "map" && (
            <Screen key="map">
              <AppHeader title="Map" onBack={() => setRoute("feel")} />
              <MapSection />
            </Screen>
          )}

          {route === "account" && (
            <Screen key="account">
              <AppHeader title="Account" onBack={() => setRoute("feel")} />
              <AccountSection />
            </Screen>
          )}

          {route === "sitemap" && showSiteMap && (
            <SiteMap
              key="sitemap"
              go={(to) => {
                setRoute(to as any)

                const tabRoutes = new Set(["feel", "experiences", "stories", "map", "account", "sitemap"])
                if (tabRoutes.has(to)) {
                  setBottom(to as any)
                }

                if (to === "detail") {
                  setDetail((prev) => prev ?? sampleTour)
                }
              }}
            />
          )}
        </AnimatePresence>

        <div className="flex-1" />
        {route !== "splash" && (
          <BottomNav
            active={bottom}
            setActive={(id: any) => {
              setBottom(id)
              setRoute(id)
            }}
            showSiteMap={showSiteMap}
          />
        )}
      </div>

      <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-yellow-400 shadow-lg" />
    </div>
  )
}
