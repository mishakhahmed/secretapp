import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import { CrossDomainNav } from "@/components/CrossDomainNav"
import "./globals.css"

export const metadata: Metadata = {
  title: "Secrets Bangladesh - Immersive Travel Experiences",
  description:
    "Discover authentic Bangladesh through curated cultural experiences, heritage tours, and community stories",
  generator: "v0.app",
  manifest: "/manifest.json",
  themeColor: "#FFD400",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Secrets Bangladesh",
  },
  icons: {
    apple: "/app-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <CrossDomainNav />
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
