# SEO & Conversion Overhaul — Owner Actions

This branch shipped a large SEO + conversion upgrade (see PR). A few high-value
items are **intentionally gated behind config** because they depend on real,
owner-verified facts. We never invent a rating count, a licence number, or a
review URL. Fill these in to switch the remaining wins on.

## 1. Turn on Google-review star rich-results + on-site review proof  ⭐ highest impact
Once you give us the **real current Google rating + review count**, we flip two switches:

- **`lib/utils.ts` → `BRAND_CONFIG.reviews.reviewCount`** — set to the real number
  (e.g. `42`). This emits `AggregateRating` JSON-LD in `app/layout.tsx`, which makes
  PCND eligible for ⭐ star ratings in Google search results (the highest-CTR local
  enhancement for contractors). It is **null today**, so no rating is published yet.
- **`NEXT_PUBLIC_GOOGLE_REVIEW_URL`** (Vercel env var) — paste your Google review link.
  This reveals:
  - "Rated 5.0 from N+ Calgary reviews — read them on Google →" on the get-quote sidebar.
  - "Leave us a Google review" on the contact page (lifts review velocity).
  Both are hidden until the URL is set.

`ratingValue` is currently `"5.0"` to match the existing on-page "5.0 Rated" copy — change if your real average differs.

## 2. Supply verifiable credentials  (`lib/utils.ts` → `BRAND_CONFIG.credentials`)
We only render specifics that are true. Today: `licensed` + `insured` (existing site claim).
Provide and we'll surface:
- `wcbCovered` → set `true` once WCB coverage is confirmed.
- `licenceNumber` → City of Calgary business licence #.
- `bbbAccredited` → set `true` if BBB-accredited (and add the BBB profile URL to `sameAs`).

## 3. Confirm the typical price ranges  (`lib/services.ts` → `typicalRange`)
Each cost-guide service now shows a "Typical Investment" range in the quote rail, matching
the ranges published in the new cost-guide blog posts. They're honest Calgary market
ranges, clearly labelled "your exact quote is free and based on your scope." **Review them
and adjust any that don't match how you actually price.** Services with ranges: basements,
kitchens, bathrooms, showers, countertops, flooring, renovations.

## 4. Off-site actions (no code — slow-compounding organic lead drivers)
- **Google Business Profile** (biggest off-site lever): primary category *General Contractor* +
  secondaries (Bathroom/Kitchen/Basement remodeler, Flooring contractor, Deck builder); add all
  14 services; set service area to Calgary, Airdrie, Cochrane, Okotoks, Chestermere (matches the
  new `/areas/*` pages); upload 20+ before/after photos; seed Q&A from the service-page FAQs;
  run the weekly post bank in `google-business-profile-posts.md`.
- **Citations** (use the exact NAP from `BRAND_CONFIG`): claim Bing Places, HomeStars, Houzz,
  BBB, Yelp, TrustedPros, Calgary Construction Association. As each goes live, add its URL to the
  `sameAs` array in `app/layout.tsx`. Prioritize HomeStars + Houzz (rank well in Calgary reno SERPs).
- **Supplier "find an installer" backlinks**: Olympia Tile, Shaw, Caesarstone, Benjamin Moore, etc.

## Deferred (noted, not shipped — to keep this PR safe & focused)
- Collapsing the get-quote Budget Min/Max into a single range `<select>` — touches the lead
  payload/API/email templates; left for a focused follow-up to avoid risking lead capture.
- Deleting ~400 lines of legacy/dead CSS from `globals.css` — low lead-impact, real regression
  risk; left for a dedicated cleanup pass.
- Service×suburb crossover pages (e.g. `/services/basements/airdrie`) — phase 2 after the
  `/areas/*` pages prove out.
