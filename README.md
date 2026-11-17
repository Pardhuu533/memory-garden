# Memory Garden • 記憶の庭

> A quiet, hand-drawn daily journal where reflective memories blossom into botanical life within a living, seasonal garden.

---

## 🌿 Concept & Philosophy

**Memory Garden** (*記憶の庭*) reimagines personal journaling not as an endless text feed or rigid productivity checklist, but as a living, contemplative landscape. 

Grounded in the Japanese aesthetic of *wabi-sabi* (beauty in impermanence and natural simplicity) and inspired by classical *sumi-e* ink wash painting and *nihonga* watercolors, Memory Garden transforms daily reflections into seeds of memory. Each entry is planted into fertile ground, growing alongside the rhythm of the seasons and the ancient 24 solar terms (*sekki*).

---

## ✨ Key Features

- **📜 Tactile Washi Journaling (`MemoryPaper`)**
  - Distraction-free, centered writing overlay that mimics authentic Japanese handmade paper (*washi*).
  - Subtle fibrous grain, soft deckled borders, and warm sumi-ink typography.
  - Auto-focused input, keyboard shortcuts (`Esc` to close), and quiet, intentional interaction design.

- **🌱 Memory Transformation & Planting (`MemorySeed`)**
  - Upon completing a journal entry, the paper gently folds and distills into a small, warm-clay memory seed.
  - Uses Framer Motion physics to glide across the viewport and embed directly into today’s garden patch.

- **🌸 Authentic Botanical Ecosystem**
  - Rich botanical taxonomy featuring Japanese flora with cultural symbolism, seasonal preferences, and bespoke watercolor pigment palettes:
    - **Japanese Maple (*Momiji* • 紅葉)**: Peace, patience, and changing seasons (Autumn)
    - **Japanese Black Pine (*Matsu* • 松)**: Endurance, longevity, and steady heart (Winter)
    - **Ginkgo Biloba (*Ichou* • 銀杏)**: Hope, resilience, and calm memory (Autumn)
    - **Winter Camellia (*Tsubaki* • 椿)**: Quiet grace and devotion through cold days (Winter)
    - **Bamboo Grove (*Take* • 竹)**: Flexibility, upright spirit, and gentle strength (Summer)
    - **Mountain Fern (*Shida* • 羊歯)**: Humility, sanctuary, and new beginnings (Spring)
    - **Velvet Moss (*Koke* • 苔)**: Time passing gently and natural quietude (Year-round)

- **⛩️ 24 Solar Terms (*Sekki*) & Seasonal Resonance**
  - Real-time astronomical calculation tracking the 24 traditional East Asian solar terms (e.g., *Risshun* / 立春 "Beginning of Spring", *Seimei* / 清明 "Pure Brightness", *Shuubun* / 秋分 "Autumn Equinox").
  - Dynamically modulates atmosphere, sky tints, ground washes, and foliage palettes to mirror the current time of year.

- **🖌️ Hand-Drawn Sumi-e & Watercolor Aesthetics**
  - Custom SVG filter pipeline utilizing fractal turbulence (`feTurbulence`) and displacement maps (`feDisplacementMap`) to recreate genuine watercolor pigment bleeding and ink-edge roughness.
  - Authentic vermilion artist seal stamp (*Hanko* / 印鑑) stamping each memory with permanence.

- **🧭 Seamless Horizontal Garden World**
  - Expansive continuous panoramic landscape spanning 43,200 horizontal pixels (~1 year timeline at 120px/day scale).
  - Layered multi-plane parallax depth: Background mountain silhouettes, winding stone paths, midground flora, today's fertile patch, and rolling foreground terraces.
  - Smooth mouse-drag panning, horizontal wheel scrolling, and touch-drag support on mobile/trackpads.

- **🔒 Local-First & Private by Design**
  - Your personal reflections never leave your device.
  - Client-side persistence using browser `localStorage` with zero external tracking, analytics, or cloud exposure.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI & Components**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Typography**: [EB Garamond](https://fonts.google.com/specimen/EB+Garamond) via `next/font/google`
- **Visuals**: Procedural SVG Watercolor Bleed & Grain Filters

---

## 📂 Project Architecture

```plaintext
src/
├── app/
│   ├── globals.css              # Base styling, color tokens, and font variables
│   ├── layout.tsx               # Root layout, metadata, and global SVG filter defs
│   └── page.tsx                 # Entry page hosting the GardenShell
├── components/
│   └── ui/
│       ├── HankoStamp.tsx       # Traditional vermilion artist seal stamp
│       ├── InkText.tsx          # Sumi-ink weighted typography component
│       ├── PaperButton.tsx      # Understated, tactile washi paper button
│       ├── WashiPaper.tsx       # Layered fibrous paper container with organic shadows
│       └── WatercolorDefs.tsx   # Global SVG watercolor bleed & turbulence filters
├── features/
│   ├── garden/
│   │   ├── components/
│   │   │   ├── GardenCanvas.tsx       # Multi-layer horizontal SVG garden viewport
│   │   │   ├── GardenBackground.tsx   # Atmospheric sky wash and mountain contours
│   │   │   ├── GardenForeground.tsx   # Foreground garden terraces & earth base
│   │   │   ├── GardenMidground.tsx    # Rocks, ferns, moss mounds, and flora
│   │   │   ├── GardenPath.tsx         # Winding watercolor stepping stone path
│   │   │   ├── GardenShell.tsx        # Viewport manager, panning controller, and UI
│   │   │   └── TodayPatch.tsx         # Active fertile planting plot for today
│   │   ├── types/                     # Garden coordinate & element types
│   │   └── utils/timeCoordinates.ts  # Calendar-to-pixel coordinate projection math
│   ├── journal/
│   │   └── components/
│   │       ├── MemoryPaper.tsx        # Contemplative journal entry sheet
│   │       └── MemorySeed.tsx         # Floating animated seed particle
│   ├── memory/
│   │   ├── services/memoryStorage.ts  # Local-first localStorage repository
│   │   └── types/                     # Memory entry data contracts
│   ├── plants/
│   │   ├── constants/species.ts       # Botanical species library & color palettes
│   │   └── types/                     # Plant anatomy and growth state types
│   └── seasons/
│       ├── types/                     # Seasonal metadata contracts
│       └── utils/seasonDetector.ts    # 24 Solar terms (Sekki) calculation engine
└── lib/
    └── utils.ts                 # Utility helpers (clsx / tailwind-merge)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.18.0 or later (v20+ recommended)
- **npm**, **pnpm**, or **yarn**

### Installation

1. **Clone the repository** (after publishing):
   ```bash
   git clone https://github.com/<your-username>/memory-garden.git
   cd memory-garden
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to enter the garden.

---

## 📜 Available Scripts

- `npm run dev` - Starts the development server with hot reloading
- `npm run build` - Creates an optimized production build
- `npm run start` - Runs the compiled production server
- `npm run lint` - Runs ESLint checks across the codebase

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
