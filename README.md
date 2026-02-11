# Precision Construction and Decora

A premium, mobile-optimized website for a construction company built with Next.js 14, TypeScript, and TailwindCSS.

## Features

- 🏗️ Full service showcase
- 📸 Project gallery with lightbox
- 💬 AI-powered chat assistant
- 📧 Lead capture with email automation
- 📱 Fully responsive design
- ⚡ Fast and SEO-optimized

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env.local
```

3. (Optional) Configure services:
   - Add `OPENAI_API_KEY` for AI features
   - Add `RESEND_API_KEY` and `RESEND_FROM_EMAIL` for email
   - Add Supabase credentials for database storage

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

All features work without any environment variables configured. The site will gracefully degrade if services are not set up.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- shadcn/ui components
- Framer Motion
- Supabase (optional)
- Resend (optional)
- OpenAI (optional)

## Project Structure

```
├── app/              # Next.js app router pages
├── components/       # Reusable components
├── lib/              # Utilities and configurations
└── public/           # Static assets
```

