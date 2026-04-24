# Design Overhaul Phase 1 — Status

Branch: `design-overhaul-phase-1` · Base: `main`

## Verdict

✅ Shippable. Typecheck clean, production build clean (35/35 routes), 30/30 after-state screenshots captured at HTTP 200 with zero console/request errors.

## What landed

### Wave 1 — Critical (C1–C9)

| ID | Commit | What |
|---|---|---|
| C1 | `8104680` | Secondary text contrast pass |
| C2, C3 | `b98678b` | Skip-to-content link + focus-visible rings on service card links |
| C4, C7 | `0f27a4a` | Form autocomplete/inputmode; remove PCND phone from placeholders |
| C5 | `b0a4fe7` | Referenced PNG → WebP; `images.formats: ["image/avif", "image/webp"]` |
| C6 | — | Metadata already present on all routes — not a real finding |
| C8, C9 | `43e5416` | Basements on homepage grid; repoint promo CTA to service page |

### Wave 2 — High (H1–H23)

| ID | Commit | What |
|---|---|---|
| H1, H7, H12–H14 | `0bd90b7` | Hero shimmer removed, ease-in-out marquee, global reduced-motion, disabled cursor, bounded Montserrat weights |
| H2 | `280530b` | Remove `phosphor-react`, standardize on `lucide-react` |
| H3, H4, H19 | `50b8e0d` | Silver gradient → CSS var; strip dead button/card CSS; trim stats band |
| H5, H6 | `4c99735` | Strip decorative overlay stack + service-card corner brackets |
| H8 | `6086720` | `quality` prop on remaining `next/image` |
| H9 | `c443dfa` | `LightRays` (WebGL) + `FloatingChatbot` lazy-loaded via `next/dynamic` |
| H11, H15, H17, H18, H22 | `84a2957` | 44×44 touch targets, defused scroll-reveal y-translate, CTA hierarchy, basement copy |
| H16 | `775f3e6` | Service-detail hero consolidated to 4 blocks; trust band moved below |
| H23 | — | Verified — all 6 `<Image fill>` parents have aspect-ratio or explicit sizing |

### Wave 3 — Medium (this session)

| ID | What |
|---|---|
| M4, M6, M7, M9, M11, M15, M16, M17, M20, M24 | Bundled in `bbd74c2` (prior session) |
| M8 | `group-hover:scale-[1.08]` → `group-active:scale-[1.02] duration-300` on service card images (3 files) |
| M10 | `app/services/[slug]/loading.tsx` + `app/blog/[slug]/loading.tsx` skeletons |
| M12 | Deleted legacy `gold` color family from `tailwind.config.ts` + 4 unused `.glow-gold` / `.logo-gold` / `.logo-gold-footer` / `.premium-gold-text` CSS utilities |
| M19 | Audited — quote-form selected state is already neutral white-based. Only admin `/admin/reviews` uses orange/yellow for status badges (semantic, private route). No change. |
| M23 | Checked — 3-chip eyebrow vs 4-item trust bar are thematically distinct (brand tagline vs proof points). No redundancy to remove. |

### Wave 4 — Housekeeping

- Deleted 6 stale iCloud `* 2.tsx` Finder duplicates (none were imported):
  - `app/services/page 2.tsx`
  - `components/Footer 2.tsx`
  - `components/LayoutWrapper 2.tsx`
  - `components/Logo 2.tsx`
  - `components/SpotlightCard 2.tsx`
  - `components/ui/toast 2.tsx`
- Added `/.playwright-mcp/` to `.gitignore`
- Fixed leftover phosphor → lucide migration bug in `app/get-quote/page.tsx`: `<Buildings />` → `<Building2 />`, stripped invalid `weight="duotone"` props (would have surfaced on any TS tightening)

## Deferred (intentional)

| ID | Why |
|---|---|
| H10 | Split `"use client"` on homepage + services list — requires refactor to server components with interactive islands. High-risk scope for a design pass. |
| H20 | Unify quote flows Path A vs Path B — explicit user-deferred. |
| H21 | Bottom-right UI crowding decision (chatbot vs sticky CTA vs phone pill) — explicit user-deferred. |
| M1, M2, M3 | Global spacing/padding/label unification — subjective, high blast radius. |
| M13 | Further `globals.css` dead-utility triage — already trimmed 307+ lines this pass. |
| M18 | Service submenu in mobile menu drawer — sizable UX work. |
| M21, M22, M25–M30 | Design-judgment or copy-blocked items (legal/ops copy, design-research calls). |

## Final verification

- **Typecheck**: `npx tsc --noEmit` — clean (one initial error for leftover `Buildings` symbol; fixed).
- **Build**: `npx next build` — 35/35 pages compile and prerender. All static routes static, `/services/[slug]` and `/get-quote/[service]` dynamic as expected. First-load JS of home `323 kB` matches prior budget.
- **After-state screenshots**: `audit/after/` — 30 PNGs (15 routes × 2 viewports), all HTTP 200, zero page errors / console errors / failed requests in `_log.json`.
- **Visual spot-checks**: homepage, get-quote, service-detail mobile all render correctly.

### Known capture caveat

Full-page playwright screenshots show many mid-page sections as dark because framer-motion `Reveal` components gate content on `opacity: 0` via `IntersectionObserver`, and fullPage capture does not programmatically scroll. This is present identically in `audit/before/` and `audit/after/` — **not a regression, a capture-method artifact.** Real users see reveals fire normally on scroll.

## Branch state

14 prior commits on `design-overhaul-phase-1` beyond `main`. Current working tree has the Wave 3 + Wave 4 changes from this session uncommitted (tracked in `git status`). Nothing has been pushed.
