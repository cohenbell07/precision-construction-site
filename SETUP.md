# Setup Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your API keys (all optional):
   - `OPENAI_API_KEY` - For AI chat, instant estimate, and project planner
   - `RESEND_API_KEY` - For email notifications
   - `RESEND_FROM_EMAIL` - Email address to send from
   - `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
   - `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (for admin operations)

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)**

## Optional: Supabase Setup

If you want to use Supabase for storing leads and referrals:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL schema from `supabase-schema.sql` in your Supabase SQL editor
3. Add your Supabase credentials to `.env.local`

## Optional: Email Setup (Resend)

1. Sign up at [resend.com](https://resend.com)
2. Create an API key
3. Add `RESEND_API_KEY` and `RESEND_FROM_EMAIL` to `.env.local`

## Optional: AI Features (OpenAI)

1. Get an API key from [platform.openai.com](https://platform.openai.com)
2. Add `OPENAI_API_KEY` to `.env.local`

## Important Notes

- **The site works 100% without any environment variables configured!**
- All features gracefully degrade if services are not set up
- Forms will still work and show success messages
- AI features will show friendly fallback messages

## Brand Customization

To rename the company or update branding, edit `lib/utils.ts`:

```typescript
export const COMPANY_NAME = "Your New Company Name";
export const COMPANY_NAME_SHORT = "Short Name";
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The site is built with Next.js 14 and can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Your own server
