# PICKWISE

### AI-powered picks for games, movies & series

Pickwise is a modern entertainment recommendation platform that helps you decide what to play, watch, or binge next. Answer a short quiz tailored to your mood and preferences — and get personalized suggestions powered by AI across three sectors: **Games**, **Movies**, and **Series**.

---

## Features

- **AI Recommendations** — Powered by OpenRouter API for genuinely personalized, non-generic suggestions across all titles — not just popular ones
- **Three Sectors** — Dedicated quiz flows for Games, Movies, and Series with 12–13 questions each
- **Real Poster Data** — Game covers from RAWG API, movie and series posters from TMDB API
- **Cinematic UI** — Dark editorial design with Bebas Neue typography, glassmorphism elements, and smooth Framer Motion animations
- **Fan Card Showcase** — Animated trending cards on the home page pulling live data from RAWG and TMDB
- **Fully Responsive** — Clean layout across desktop, tablet, and mobile

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Routing | React Router DOM v6 |
| Animations | Framer Motion |
| HTTP | Axios |
| AI | OpenRouter API |
| Game Data | RAWG API |
| Movie & Series Data | TMDB API |
| Styling | Pure CSS with CSS Variables |

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- API keys for OpenRouter, TMDB, and RAWG (see below)

### Installation

```bash
# Clone the repo
git clone https://github.com/Skaff10/Pickwise.git

# Navigate into the project
cd Pickwise

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root of the project:

```env
VITE_OPENROUTER_API_KEY=your_openrouter_key
VITE_TMDB_API_KEY=your_tmdb_key
VITE_RAWG_API_KEY=your_rawg_key
```

> **Never commit your `.env` file.** Make sure it is listed in `.gitignore`.

### Getting Your API Keys

| Service | Where to get it |
|---|---|
| OpenRouter | [openrouter.ai](https://openrouter.ai) → Keys |
| TMDB | [themoviedb.org](https://www.themoviedb.org) → Settings → API |
| RAWG | [rawg.io/apidocs](https://rawg.io/apidocs) → Dashboard |

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
src/
├── api/              # TMDB, RAWG, and OpenRouter API calls
├── components/       # Reusable UI components (FanCard, SectorCard, etc.)
├── pages/            # Home, Games, Movies, Series, About
├── hooks/            # Custom React hooks
└── styles/           # Global CSS and variables
```

---

## Pages

- **Home** — Cinematic hero section + animated fan card showcase + sector selector
- **Games** — 12-question quiz → AI game recommendations with RAWG cover art
- **Movies** — 12-question quiz → AI movie recommendations with TMDB posters
- **Series** — 13-question quiz → AI series recommendations with TMDB posters
- **About** — Project info and credits

---

## Design

- **Font:** Bebas Neue (headings), IBM Plex Mono (labels), DM Sans (body)
- **Theme:** Dark editorial — near-black background, vivid accent colors per sector
- **Accents:** Mint green (Games), Pink (Movies), Blue (Series)
- **Animations:** Staggered card entrances, page transitions, hover spring effects via Framer Motion

---

## Contributing

This is a personal project but feel free to open issues or suggestions. PRs are welcome.

---

## License

MIT

---

Built by [Skaff10](https://github.com/Skaff10)