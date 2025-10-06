"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export function CrossDomainNav() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [referrer, setReferrer] = useState<string | null>(null)

  useEffect(() => {
    // Check for referrer in URL params
    const refParam = searchParams.get("ref")
    if (refParam) {
      setReferrer(refParam)
      // Store in sessionStorage for persistence across navigation
      sessionStorage.setItem("cross_domain_referrer", refParam)
    } else {
      // Check sessionStorage
      const storedRef = sessionStorage.getItem("cross_domain_referrer")
      if (storedRef) {
        setReferrer(storedRef)
      }
    }
  }, [searchParams])

  const handleBackToDomain = () => {
    if (referrer) {
      console.log("[v0] Navigating back to referrer:", referrer)
      window.location.href = referrer
    } else {
      // Fallback to browser back
      router.back()
    }
  }

  // Only show if there's a referrer
  if (!referrer) return null

  return (
    <button
      onClick={handleBackToDomain}
      className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md border border-[#FFD700]/30 rounded-full text-[#FFD700] hover:bg-black/70 hover:border-[#FFD700]/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]"
      aria-label="Back to previous site"
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="text-sm font-medium">Back</span>
    </button>
  )
}
