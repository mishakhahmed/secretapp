export type Tour = {
  id: string
  title: string
  subtitle: string
  location: string
  duration: string
  price: number
  category: "heritage" | "people" | "food" | "riversea" | "wildlife" | "crafts"
  overview: string
  highlights: string[]
  itinerary: Array<{ time?: string; day?: string; activity: string }>
  images: string[]
  story: string
  features?: string[]
}

export const tours: Tour[] = [
  {
    id: "old-dhaka",
    title: "Secrets of Old Dhaka",
    subtitle: "Walk Through 400 Years of Hidden History",
    location: "Dhaka",
    duration: "4-6h",
    price: 45,
    category: "heritage",
    overview:
      "Discover the hidden stories of 400-year-old Dhaka through narrow alleys, ancient mosques, and traditional crafts that time forgot.",
    highlights: [
      "Lalbagh Fort hidden chambers",
      "Traditional weaving workshops",
      "Centuries-old spice markets",
      "Mughal architecture secrets",
      "Local artisan meetings",
    ],
    itinerary: [
      { time: "9:00 AM", activity: "Meet at Lalbagh Fort (intro & context)" },
      { time: "9:30 AM", activity: "Lalbagh Fort exploration" },
      { time: "11:00 AM", activity: "Craft workshops (weavers, metalworkers)" },
      { time: "12:30 PM", activity: "Spice market immersion" },
      { time: "1:30 PM", activity: "Heritage lunch" },
      { time: "2:30 PM", activity: "Mosque & architecture walk" },
    ],
    images: ["/tour-old-dhaka.jpeg"],
    story: "Spice lanes, Mughal echoes, bookshops, courtyards—unlock memory cards as you walk.",
    features: ["heritage", "walking", "guide", "monument"],
  },
  {
    id: "panam-sonargaon",
    title: "Panam: Secrets of Sonargaon",
    subtitle: "Journey to the Ancient Capital of Bengal",
    location: "Sonargaon",
    duration: "6-8h",
    price: 65,
    category: "heritage",
    overview:
      "Journey to the ancient capital of Bengal, where golden history meets rural charm in Bangladesh's most significant archaeological site.",
    highlights: [
      "Panam City ruins exploration",
      "Traditional boat making",
      "Folk Art Museum treasures",
      "Village life immersion",
      "Ancient trade route stories",
    ],
    itinerary: [
      { time: "8:00 AM", activity: "Depart Dhaka for Sonargaon" },
      { time: "9:30 AM", activity: "Panam Nagar ghost city walk" },
      { time: "11:00 AM", activity: "Folk Art & Crafts Museum" },
      { time: "12:30 PM", activity: "Traditional lunch with local family" },
      { time: "2:00 PM", activity: "Village immersion & boat builders" },
      { time: "4:00 PM", activity: "Return to Dhaka" },
    ],
    images: ["/tour-panam-sonargaon.jpeg"],
    story: "Abandoned merchant facades, silk routes and saltwater whispers along a forgotten boulevard.",
    features: ["heritage", "transport", "food", "crafts"],
  },
  {
    id: "fishermens-secret",
    title: "Fisherman's Secret",
    subtitle: "Dawn Rituals on the Bay of Bengal",
    location: "Cox's Bazar",
    duration: "2D/1N",
    price: 129,
    category: "riversea",
    overview:
      "Cast nets at blue hour, taste the first catch with local boatmen, and experience the ancient rhythms of coastal life.",
    highlights: [
      "Pre-dawn boat launch",
      "Traditional net casting with fishermen",
      "Fresh catch cooking on the beach",
      "Coastal village homestay",
      "Sea chants and fishing rituals",
    ],
    itinerary: [
      { day: "Day 1", activity: "Arrive Cox's Bazar, meet fishing community" },
      { day: "Day 1", activity: "Evening: Beach walk & sunset with fishermen" },
      { day: "Day 1", activity: "Night: Coastal dinner & storytelling" },
      { day: "Day 2", activity: "4:30 AM: Dawn boat launch" },
      { day: "Day 2", activity: "6:00 AM: Net casting & first catch" },
      { day: "Day 2", activity: "8:00 AM: Beach breakfast with fresh fish" },
      { day: "Day 2", activity: "10:00 AM: Return & departure" },
    ],
    images: [
      "/tour-fishermens-secret-1.jpeg",
      "/tour-fishermens-secret-2.jpg",
      "/tour-fishermens-secret-3.jpg",
      "/tour-fishermens-secret-4.jpg",
      "/tour-fishermens-secret-5.jpg",
    ],
    story: "Dawn launches, net casting, coastal cooking and rituals of the sea—slow down and listen.",
    features: ["boat-ride", "fishing", "accommodation", "food"],
  },
  {
    id: "culinary-pilgrimage",
    title: "The Culinary Pilgrimage of Bengal",
    subtitle: "Taste Memory, Migration & Tradition",
    location: "Dhaka",
    duration: "6h",
    price: 55,
    category: "food",
    overview:
      "Taste your way through Bangladesh's hidden food culture, from street-side legends to family recipes passed down through generations.",
    highlights: [
      "Secret family recipes",
      "Traditional cooking methods",
      "Historic food markets",
      "Local chef encounters",
      "Authentic home dining",
    ],
    itinerary: [
      { time: "10:00 AM", activity: "Meet at historic Chawk Bazaar" },
      { time: "10:30 AM", activity: "Street food legends tour" },
      { time: "12:00 PM", activity: "Traditional biryani house visit" },
      { time: "1:30 PM", activity: "Home cooking session with local family" },
      { time: "3:00 PM", activity: "Rooftop tea & sweets" },
      { time: "4:00 PM", activity: "Closing reflections" },
    ],
    images: ["/tour-culinary-pilgrimage.jpeg"],
    story: "From famine-era khichuri to rooftop feasts—taste how memory and migration season the city.",
    features: ["food", "walking", "people", "culinary-experience"],
  },
  {
    id: "jamdani-loom",
    title: "Echoes of the Artisan: Secrets of the Loom",
    subtitle: "Witness Threads Become Memory",
    location: "Narayanganj",
    duration: "5h",
    price: 79,
    category: "crafts",
    overview:
      "Meet master weavers, trace patterns from river clay to loom, and witness the ancient art of Jamdani weaving.",
    highlights: [
      "Master weaver demonstrations",
      "Traditional loom techniques",
      "Pattern design stories",
      "River clay to thread process",
      "Artisan family encounters",
    ],
    itinerary: [
      { time: "9:00 AM", activity: "Depart for Narayanganj weaving village" },
      { time: "10:00 AM", activity: "Meet master weavers & their families" },
      { time: "11:00 AM", activity: "Loom demonstration & pattern stories" },
      { time: "12:30 PM", activity: "Traditional lunch with artisan community" },
      { time: "2:00 PM", activity: "Hands-on weaving experience" },
      { time: "3:30 PM", activity: "Return to Dhaka" },
    ],
    images: ["/tour-jamdani-loom-1.jpeg", "/tour-jamdani-loom-2.jpg"],
    story: "Meet master weavers, trace patterns from river clay to loom, and witness threads become memory.",
    features: ["crafts", "people", "transport", "heritage"],
  },
  {
    id: "refugee-voices",
    title: "The Voices of the Refugees",
    subtitle: "Hope, Dignity & Daily Creativity",
    location: "Cox's Bazar",
    duration: "5h",
    price: 55,
    category: "people",
    overview: "Walk with community storytellers and witness hope, dignity, and daily creativity in the refugee camps.",
    highlights: [
      "Community storyteller encounters",
      "Artisan workshops in camps",
      "Educational initiatives visit",
      "Women-led collective meetings",
      "Dignified cultural exchange",
    ],
    itinerary: [
      { time: "9:00 AM", activity: "Orientation & ethical guidelines" },
      { time: "10:00 AM", activity: "Meet community storytellers" },
      { time: "11:30 AM", activity: "Visit artisan workshops" },
      { time: "1:00 PM", activity: "Lunch with women's collective" },
      { time: "2:30 PM", activity: "Educational center visit" },
      { time: "3:30 PM", activity: "Closing circle & reflections" },
    ],
    images: ["/tour-voices-of-the-camps.jpeg"],
    story: "Walk with community storytellers. Hope, dignity and daily creativity in the camps.",
    features: ["people", "guide", "knowledge", "walking"],
  },
  {
    id: "sufi-saints",
    title: "Secrets of the Sufi Saints",
    subtitle: "Shrines, Songs & Forested Ruins",
    location: "Sylhet",
    duration: "5h",
    price: 59,
    category: "heritage",
    overview:
      "Visit sacred shrines at blue hour, hear songs of devotion, and explore forested ruins where roots hold memory.",
    highlights: [
      "Hazrat Shah Jalal shrine visit",
      "Sufi devotional music",
      "Forested tomb complexes",
      "Spiritual storytelling",
      "Blue hour photography",
    ],
    itinerary: [
      { time: "3:00 PM", activity: "Meet at Hazrat Shah Jalal shrine" },
      { time: "3:30 PM", activity: "Shrine exploration & history" },
      { time: "4:30 PM", activity: "Devotional music session" },
      { time: "5:30 PM", activity: "Blue hour at forested tombs" },
      { time: "6:30 PM", activity: "Tea & reflections" },
      { time: "7:30 PM", activity: "Closing" },
    ],
    images: ["/tour-sufi-saints.jpeg"],
    story: "Shrines at blue hour, songs of devotion, and forested ruins where roots hold memory.",
    features: ["heritage", "folk-music", "nature", "photography-permitted"],
  },
]
