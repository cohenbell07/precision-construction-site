# Project Structure

```
Constructionbusiness/
├── app/                          # Next.js 14 App Router
│   ├── api/                      # API routes
│   │   ├── blog/generate/        # AI blog generation endpoint
│   │   └── leads/                # Lead submission endpoint
│   ├── blog/                     # Blog pages
│   │   ├── [slug]/               # Dynamic blog post pages
│   │   └── page.tsx              # Blog listing page
│   ├── contact/                  # Contact page
│   ├── get-quote/                # Quote request tool
│   ├── projects/                 # Project gallery
│   ├── referral/                 # Refer-a-friend page
│   ├── services/                 # Services listing
│   ├── globals.css               # Global styles
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                  # Homepage
│   └── not-found.tsx             # 404 page
│
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   └── ...
│   ├── AIChatAssistant.tsx       # AI chat widget
│   ├── Header.tsx                # Site header/navigation
│   └── Footer.tsx                # Site footer
│
├── lib/                          # Utilities and configurations
│   ├── ai.ts                     # OpenAI integration
│   ├── blog.ts                   # Blog post utilities
│   ├── email.ts                  # Resend email integration
│   ├── env.ts                    # Environment variable handling
│   ├── services.ts               # Service definitions
│   ├── supabase.ts               # Supabase client
│   └── utils.ts                  # Brand config & utilities
│
├── content/                      # Content files
│   └── blog/                     # Markdown blog posts
│
├── public/                       # Static assets
│
├── .env.example                  # Environment variable template
├── package.json                  # Dependencies
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── next.config.js                # Next.js configuration
├── supabase-schema.sql           # Optional database schema
├── SETUP.md                      # Setup instructions
└── README.md                     # Project overview
```

## Key Features

### Pages
- **Home** (`/`) - Hero, services overview, testimonials, AI chat
- **Services** (`/services`) - Detailed service listings with anchor links
- **Projects** (`/projects`) - Gallery with lightbox viewer and category filters
- **Contact** (`/contact`) - Contact form and company information
- **Get Quote** (`/get-quote`) - Multi-step quote form with AI assistant
- **Blog** (`/blog`) - Blog listing and individual post pages
- **Referral** (`/referral`) - Refer-a-friend form

### AI Features
- **AI Chat Assistant** - Available on homepage and quote page
- **AI Quote Generator** - Summarizes quote requests
- **AI Blog Generator** - Admin API endpoint to generate blog posts

### Integrations (All Optional)
- **Supabase** - Database for leads and referrals
- **Resend** - Email notifications
- **OpenAI** - AI chat and content generation

### Design System
- **Colors**: Dark slate, gold accents, warm grays
- **Components**: shadcn/ui component library
- **Animations**: Framer Motion for smooth transitions
- **Responsive**: Mobile-first design

## Brand Customization

Edit `lib/utils.ts` to change:
- Company name
- Tagline
- Contact information
- Brand colors (in `tailwind.config.ts`)

