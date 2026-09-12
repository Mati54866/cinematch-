# Contributing to CineMatch 🍿

Thank you for your interest in contributing to **CineMatch**!

---

## 🛠️ Local Setup Instructions

1. **Fork & Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/cinematch-.git
   cd cinematch-
   ```

2. **Environment Variables**
   Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
   Add your Supabase, Anthropic AI, and Stripe API keys.

3. **Install Dependencies & Run**
   ```bash
   npm install
   npm run dev
   ```

---

## 📋 Quality & Testing

- Run TypeScript checks: `npm run typecheck`
- Run ESLint: `npm run lint`
