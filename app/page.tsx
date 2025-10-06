import { Suspense } from "react"
import SecretsBangladeshApp from "@/components/secrets-bangladesh-app"

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1a1410]" />}>
      <SecretsBangladeshApp />
    </Suspense>
  )
}
