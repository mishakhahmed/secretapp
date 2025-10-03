# SecretApp (Secrets Bangladesh MVP)

🚀 A storytelling experiment disguised as an app.  
This project was built by me — **Mishak, Founder of Secrets Bangladesh** — not a professional developer, but a cultural entrepreneur who learned to code with the help of AI tools.  

SecretApp is my **MVP playground**: testing how heritage, storytelling, and immersive travel design can live inside a modern web app.  

---

## ✨ About

Every city keeps its secrets.  
This app is my first attempt to let those secrets be unlocked digitally:  
- Wax seals you can “break” to reveal experiences  
- Mood-based travel discovery (Adventurous, Curious, Reconnected, Inspire Me)  
- Story cards that flip and shuffle like a hidden deck  
- Audio teasers and story timelines  

It’s not perfect, but it’s alive. And it’s proof that you don’t need to be a “developer” to build with AI and imagination.

---

## 🔑 Features (MVP)

- Wax Seal “Inspire Me” ritual  
- Mood funnel (Adventurous, Curious, Inspire Me, Reconnected)  
- Flip cards for experiences (Fishermen’s Secret, Jamdani Looms, Old Dhaka, etc.)  
- Audio narration embeds & story timelines  
- Interactive maps (OSM / Leaflet prototype)  
- Heatmap & dwell-time tracking (for later Firebase/GA4 integration)  

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js (deployed on Vercel) |
| Styling | HTML/CSS (Canva-friendly) |
| Scripts | Vanilla JS + AI-assisted snippets |
| Assets | Public folder (images, audio, stories) |
| Analytics (planned) | Firebase, GA4 |

---

## 🚀 Getting Started

Since this is an MVP, the setup is intentionally simple:

```bash
# Clone the repo
git clone https://github.com/mishakhahmed/secretapp.git

# Move into the project
cd secretapp

# Install dependencies
pnpm install   # or npm install

# Run locally
pnpm dev# development mode
pnpm dev

# to build and preview
pnpm build
pnpm start


secretapp/
├── app/                # Next.js “app” directory (routes, pages)
├── components/         # Reusable UI components
├── data/               # Static data, sample content
├── lib/                # Utility functions, api wrappers, helpers
├── public/             # Public assets (images, icons, favicon)
├── styles/             # Global CSS / SCSS / Tailwind styles
├── .gitignore
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── postcss.config.mjs
