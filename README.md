<div align="center">
  <br />
  <h1 align="center">🍿 CineMatch</h1>
  <p align="center">AI-Powered Movie & TV Show Matchmaking & Recommendation Engine</p>

  <div>
    <a href="https://github.com/Mati54866/cinematch-/actions"><img src="https://github.com/Mati54866/cinematch-/actions/workflows/ci.yml/badge.svg" alt="CI Status" /></a>
    <img src="https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 16" />
    <img src="https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=black" alt="Supabase" />
    <img src="https://img.shields.io/badge/Anthropic_AI-D97706?style=for-the-badge&logo=anthropic&logoColor=white" alt="Anthropic AI" />
    <img src="https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe" />
  </div>
</div>

---

## 📋 Table of Contents

1. [✨ Introduction](#introduction)
2. [⚙️ Tech Stack](#tech-stack)
3. [🔋 Key Features](#key-features)
4. [🛠️ Architecture & Database](#architecture--database)
5. [🚀 Quick Start](#quick-start)
6. [🔐 Environment Variables](#environment-variables)
7. [🤝 Contributing](#contributing)

---

## <a name="introduction">✨ Introduction</a>

**CineMatch** is a next-generation movie and TV show recommendation engine built with **Next.js 16 (App Router)**, **Anthropic Claude AI**, **Supabase**, and **Stripe**. It allows users to discover personalized recommendations based on mood, taste profile, watchlist history, and real-time AI matchmaking prompts.

---

## <a name="tech-stack">⚙️ Tech Stack</a>

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Backend & Auth**: [Supabase](https://supabase.com/) (`@supabase/ssr` & Database)
- **AI Integration**: [Anthropic Claude AI SDK](https://www.anthropic.com/) (`@anthropic-ai/sdk`)
- **Payments**: [Stripe](https://stripe.com/) (`@stripe/stripe-js`)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Form & Validation**: [Zod](https://zod.dev/)

---

## <a name="features">🔋 Key Features</a>

- 🤖 **AI Movie Matchmaker**: Claude-powered AI recommendations tailored to user mood, genres, and natural language prompts.
- 🔐 **Supabase Authentication**: Secure Auth SSR session handling with middleware routing.
- 💳 **Stripe Billing Integration**: Pro tier subscription management and checkout flow.
- 📱 **Responsive Motion UI**: Framer Motion transitions with Radix UI accessible primitives.
- ⚡ **Analytics & Email**: Built-in PostHog analytics and Resend transactional emails.

---

## <a name="quick-start">🚀 Quick Start</a>

### Prerequisites

- [Node.js](https://nodejs.org/) v20.9 or later (see `.nvmrc`)
- [npm](https://www.npmjs.com/) or `pnpm`

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Mati54866/cinematch-.git
   cd cinematch-
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## <a name="architecture--database">🛠️ Architecture & Database</a>

The recommendation flow lives in `lib/ai/recommend.ts` and runs five steps:

1. **Parse** the natural-language query (mood, themes, genre hints, social context).
2. **Vector search** candidate movies with pgvector embeddings.
3. **Filter** by streaming providers, runtime, and already-rated titles.
4. **LLM ranking** with Claude, grounded in the user's taste profile.
5. **Validate** every result against the `movies` table so only titles with a real `tmdb_id` are returned.

| Path | Purpose |
| --- | --- |
| `app/(app)` / `app/(auth)` | Authenticated app pages and auth flows |
| `app/api` | Route Handlers (recommend, watchlist, import, group, Stripe webhook, cron) |
| `lib/ai` | Anthropic client, prompts, embeddings, validators |
| `lib/tmdb` | TMDB client, movie sync, watch providers |
| `lib/import` | Letterboxd / IMDb / CSV parsers and TMDB matcher |
| `supabase/migrations` | PostgreSQL schema (with pgvector) |

---

## <a name="environment-variables">🔐 Environment Variables</a>

Copy `.env.local.example` to `.env.local` and fill in the values below.

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase project connection |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Server-only admin access (never expose to the browser) |
| `ANTHROPIC_API_KEY` | Yes | Claude recommendations |
| `OPENAI_API_KEY` or `VOYAGE_API_KEY` | Yes (one) | Embedding provider |
| `TMDB_API_KEY` | Yes | Movie metadata and streaming availability |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_PRO_PRICE_ID` | For billing | Pro subscription checkout |
| `RESEND_API_KEY` | Optional | Transactional email |
| `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST` | Optional | Analytics |
| `NEXT_PUBLIC_APP_URL` | Yes | Public base URL of the app |
| `CRON_SECRET` | Yes in production | Bearer token required by `/api/cron/sync-movies` |

---

## <a name="contributing">🤝 Contributing</a>

Contributions are welcome! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) guide before submitting pull requests.
