# GenePredict AI — Frontend (Phase 1: Landing + Auth + Dashboard)

Next.js (App Router) + TypeScript + Tailwind CSS frontend for GenePredict AI.

## What's included

- **Landing page** — hero, features, workflow pipeline, tech stack, contact CTA, footer
- **Auth** — login and signup pages (React Hook Form), calling the backend's
  `/api/auth/login` and `/api/auth/signup`, JWT stored client-side
- **Dashboard shell** — sidebar navigation, protected route (redirects to `/login`
  if not authenticated), stat cards, and two live charts (Chart.js) pulled from
  `/api/dashboard` and `/api/patients`
- **Patient management** — list, search, add, and delete patients, wired to the
  backend's patient CRUD endpoints

Design system: navy/teal/white palette from the brief, Space Grotesk (display) +
IBM Plex Sans (body) + IBM Plex Mono (data/utility), with a recurring
"mutation track" motif (genome-ideogram-style ticks) as the signature visual
element in the hero, auth screens, and loading states.

## Setup

```bash
cp .env.local.example .env.local
# edit .env.local if your backend isn't on http://localhost:8000

npm install
npm run dev
```

Visit http://localhost:3000. Make sure the backend (see the `genepredict-backend`
project) is running so signup/login/patients actually work — the pages will show
a friendly error banner if the API is unreachable.

## Project structure

```
src/
  app/
    page.tsx                 # Landing page
    login/page.tsx
    signup/page.tsx
    dashboard/
      layout.tsx             # Protected shell (sidebar + auth check)
      page.tsx               # Overview: stats + charts
      patients/page.tsx      # Patient CRUD
  components/                # Navbar, Hero, Sidebar, MutationTrack, etc.
  context/AuthContext.tsx    # Login/signup/logout state
  lib/api.ts                 # Axios client with JWT interceptor
  lib/types.ts               # Types matching the backend's Pydantic schemas
```

## Not yet built (next phases)

- Upload Dataset, Mutation Analysis, Prediction, Reports, History, Profile,
  Settings pages (sidebar links exist, pages don't yet — Phase 2)
- Admin panel UI (backend endpoints already exist)
- Forgot-password flow UI
- Dark mode
