# SpeakFlow AI

Premium AI-powered spoken English learning platform for Tamil speakers building fluent American-accent English in 90 days.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- shadcn-style reusable UI primitives
- Framer Motion
- Zustand
- Recharts
- Supabase Auth + PostgreSQL-ready schema
- OpenAI/Whisper/TTS-ready API route architecture
- Vercel deployment target

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Product Surfaces

- `/` premium landing page
- `/onboarding` learner assessment and 90-day plan generation
- `/login` Supabase Auth-ready login surface
- `/dashboard` strict accountability dashboard
- `/roadmap` 90-day roadmap
- `/admin` admin operations panel

## API Routes

- `GET /api/health`
- `GET /api/daily-task`
- `GET /api/roadmap`
- `POST /api/speaking-feedback`
- `GET /api/weekly-report`
- `GET /api/notifications`
- `POST /api/notifications`
- `GET /api/auth/session`

These routes are stateless and suitable for Vercel serverless deployment. Supabase should store persistent state such as streaks, recordings, scores, notifications, reports, and subscription data.

## Supabase Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Copy `.env.example` to `.env.local`.
4. Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`.
5. Set `NEXT_PUBLIC_DEMO_MODE=false` when protected routes should require an authenticated Supabase session.

## AI Voice Flow

Production voice evaluation should follow this flow:

1. Browser records voice.
2. Upload audio to storage.
3. Transcribe with Whisper.
4. Send transcript and timing metadata to `/api/speaking-feedback`.
5. Store speaking score, pronunciation report, AI feedback, and daily task completion in Supabase.
6. Generate weekly reports from stored progress data.

## Deployment

Deploy the frontend and API routes together on Vercel:

```bash
npm run build
```

If a future standalone Node/Express backend is deployed on Render, keep it stateless. Render free services can sleep after inactivity, causing a 30-60 second cold start. Use `/api/health` for health checks, and only ping free-tier services if the free instance-hour tradeoff is acceptable.
