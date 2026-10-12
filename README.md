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

## 📋 Table of Content

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

- [Node.js](https://nodejs.org/) (v18 or later)
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

## <a name="contributing">🤝 Contributing</a>

Contributions are welcome! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) guide before submitting pull requests.
