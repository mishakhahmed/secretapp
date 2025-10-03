"use client"
import {
  Clock,
  MapPin,
  Landmark,
  UtensilsCrossed,
  Users,
  Footprints,
  Bus,
  Car,
  Ship,
  Bike,
  Sailboat,
  Wallet,
  CreditCard,
  Smartphone,
  DollarSign,
  Ticket,
  UserCheck,
  Building2,
  BookOpen,
  MapPinned,
  Shield,
  ShieldCheck,
  Heart,
  Baby,
  Accessibility,
  Hotel,
  Church,
  Home,
  Compass,
  BookMarked,
  Fish,
  Binary as Binoculars,
  Camera,
  Moon,
  ChefHat,
  Waves,
  Music,
  Tent,
  Video,
  Trees,
  Bird,
  Flower2,
  Mountain,
  ShoppingBag,
  Sun,
  BookText,
} from "lucide-react"
import type React from "react"

type IconName =
  // Navigation icons
  | "home"
  | "experiences"
  | "stories"
  | "map"
  | "sitemap"
  | "booking"
  | "heart"
  // Basic feature icons
  | "duration"
  | "location"
  | "heritage"
  | "food"
  | "people"
  | "crafts"
  // Transport & Movement
  | "walking"
  | "bus"
  | "transport"
  | "boat-ride"
  | "rickshaw"
  | "bicycle"
  | "sail-boat"
  | "kayaking"
  | "rickshaw-van"
  // Payments & Fees
  | "cash"
  | "card"
  | "card-payments"
  | "mobile-payments"
  | "payment"
  | "entrance-fees"
  | "tips"
  // Tour Features
  | "guide"
  | "monument"
  | "knowledge"
  | "no-of-stops"
  | "time"
  | "secret-location"
  // Safety & Accessibility
  | "first-aid"
  | "helmets"
  | "security-personnel"
  | "security-clearance"
  | "certified-first-aid"
  | "family-friendly"
  | "infant-friendly"
  | "wheelchair-accessible"
  // Accommodation & Amenities
  | "accommodation"
  // Religious & Cultural Sites
  | "hindu-temple"
  | "mosque"
  | "church"
  | "theatre"
  // Activities & Experiences
  | "fishing"
  | "birdwatching"
  | "photography-permitted"
  | "night-tours"
  | "culinary-experience"
  | "swimming"
  | "concerts"
  | "camping"
  | "photographs"
  | "filming-permitted"
  | "personal-photoshoot"
  | "wildlife"
  | "folk-music"
  | "nature"
  | "scuba-diving"
  | "snorkelling"
  | "horse-riding"
  | "yoga-meditation"
  | "archery"
  | "trekking"
  | "shopping"
  | "day-night"
  | "literature-experience"

type SmartIconProps = {
  name: IconName
  theme?: "light" | "dark"
  size?: number
}

export function SmartIcon({ name, theme = "light", size = 24 }: SmartIconProps) {
  const color = theme === "dark" ? "white" : "currentColor"
  const iconProps = { size, color, strokeWidth: 1.5 }

  const iconMap: Record<IconName, React.ReactNode> = {
    // Navigation
    home: <Home {...iconProps} />,
    experiences: <Compass {...iconProps} />,
    stories: <BookMarked {...iconProps} />,
    map: <MapPinned {...iconProps} />,
    sitemap: <MapPinned {...iconProps} />,
    booking: <Ticket {...iconProps} />,
    heart: <Heart {...iconProps} />,

    // Basic features
    duration: <Clock {...iconProps} />,
    location: <MapPin {...iconProps} />,
    heritage: <Landmark {...iconProps} />,
    food: <UtensilsCrossed {...iconProps} />,
    people: <Users {...iconProps} />,
    crafts: <BookOpen {...iconProps} />,

    // Transport
    walking: <Footprints {...iconProps} />,
    bus: <Bus {...iconProps} />,
    transport: <Car {...iconProps} />,
    "boat-ride": <Ship {...iconProps} />,
    rickshaw: <Bike {...iconProps} />,
    bicycle: <Bike {...iconProps} />,
    "sail-boat": <Sailboat {...iconProps} />,
    kayaking: <Ship {...iconProps} />,
    "rickshaw-van": <Bike {...iconProps} />,

    // Payments
    cash: <Wallet {...iconProps} />,
    card: <CreditCard {...iconProps} />,
    "card-payments": <CreditCard {...iconProps} />,
    "mobile-payments": <Smartphone {...iconProps} />,
    payment: <DollarSign {...iconProps} />,
    "entrance-fees": <Ticket {...iconProps} />,
    tips: <DollarSign {...iconProps} />,

    // Tour features
    guide: <UserCheck {...iconProps} />,
    monument: <Building2 {...iconProps} />,
    knowledge: <BookOpen {...iconProps} />,
    "no-of-stops": <MapPin {...iconProps} />,
    time: <Clock {...iconProps} />,
    "secret-location": <MapPinned {...iconProps} />,

    // Safety & Accessibility
    "first-aid": <Heart {...iconProps} />,
    helmets: <Shield {...iconProps} />,
    "security-personnel": <ShieldCheck {...iconProps} />,
    "security-clearance": <ShieldCheck {...iconProps} />,
    "certified-first-aid": <Heart {...iconProps} />,
    "family-friendly": <Users {...iconProps} />,
    "infant-friendly": <Baby {...iconProps} />,
    "wheelchair-accessible": <Accessibility {...iconProps} />,

    // Accommodation
    accommodation: <Hotel {...iconProps} />,

    // Religious & Cultural
    "hindu-temple": <Church {...iconProps} />,
    mosque: <Church {...iconProps} />,
    church: <Church {...iconProps} />,
    theatre: <Building2 {...iconProps} />,

    // Activities
    fishing: <Fish {...iconProps} />,
    birdwatching: <Binoculars {...iconProps} />,
    "photography-permitted": <Camera {...iconProps} />,
    "night-tours": <Moon {...iconProps} />,
    "culinary-experience": <ChefHat {...iconProps} />,
    swimming: <Waves {...iconProps} />,
    concerts: <Music {...iconProps} />,
    camping: <Tent {...iconProps} />,
    photographs: <Camera {...iconProps} />,
    "filming-permitted": <Video {...iconProps} />,
    "personal-photoshoot": <Camera {...iconProps} />,
    wildlife: <Bird {...iconProps} />,
    "folk-music": <Music {...iconProps} />,
    nature: <Trees {...iconProps} />,
    "scuba-diving": <Waves {...iconProps} />,
    snorkelling: <Waves {...iconProps} />,
    "horse-riding": <Mountain {...iconProps} />,
    "yoga-meditation": <Flower2 {...iconProps} />,
    archery: <Mountain {...iconProps} />,
    trekking: <Mountain {...iconProps} />,
    shopping: <ShoppingBag {...iconProps} />,
    "day-night": <Sun {...iconProps} />,
    "literature-experience": <BookText {...iconProps} />,
  }

  return <span className="inline-flex items-center justify-center">{iconMap[name] || <Compass {...iconProps} />}</span>
}
