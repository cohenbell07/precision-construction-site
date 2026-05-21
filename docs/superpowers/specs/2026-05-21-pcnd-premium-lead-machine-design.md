# PCND Premium Lead Machine Design

## Goal

Upgrade pcnd.ca into a more premium, mobile-clean, conversion-focused site that preserves PCND's black, silver, sandstone, and family-builder identity while making it easier for Calgary homeowners to request a quote, call, or start a project conversation.

## Research Basis

The direction is informed by curated contractor and construction design roundups totaling 140+ examples:

- SiteBuilderReport: 52 contractor website examples, emphasizing trust, real photos, obvious hierarchy, social proof, responsive design, and clear CTAs.
- Colorlib: 27 construction website examples, emphasizing project photography, reliability, estimate paths, and refined minimal layouts.
- MakingThatWebsite: 27 local construction examples, emphasizing specific local offers and quote paths.
- Ericks Webs Design: 15 construction website examples, emphasizing professional visuals and lead-generating layouts.
- Hook Agency: 19 contractor/construction examples, emphasizing simple messaging, proof, lead forms, phone numbers, and related content.
- Awwwards and Siteinspire were used for broader premium layout references: editorial spacing, image-led composition, typography, and restrained motion.

## Design Direction

Use a "premium local builder" direction, not a generic luxury template. The site should feel established, quiet, sharp, and trustworthy:

- Dark showroom surfaces for hero, navigation, high-trust CTAs, and premium imagery.
- Warm cream studio surfaces for forms, proof, process, and quote decision points.
- Real project and Calgary imagery as the main visual asset, not decorative gradients.
- Fewer but stronger conversion moments: Quote, Call, Consultation, Price Beat, and Promo.
- Mobile first: compact header/menu, shorter footer, thumb-friendly bottom actions, and no overlapping floating controls.

## Lead System

The website should support a 30-day low/no-ad push by creating more capture points and supplying execution materials:

- A persistent mobile lead dock for Call and Free Quote.
- Stronger homepage conversion section for quote, call, and service selection.
- Quote page cleanup with easier service choice, trust proof, and clearer required fields.
- Service pages continue to preselect quote requests with service context.
- Footer becomes shorter on mobile so visitors reach contact actions faster.
- Add lead-gen documents for Google Business Profile posts, social/community posts, referral outreach, and daily execution.

## Implementation Scope

Modify:

- `components/Header.tsx`: fix mobile overlay position and polish menu.
- `components/Footer.tsx`: make mobile footer shorter and more conversion-focused.
- `components/FloatingChatbot.tsx`: reduce mobile overlap with conversion controls.
- `components/LayoutWrapper.tsx`: add mobile lead dock.
- `components/MobileLeadDock.tsx`: new persistent quote/call dock.
- `app/page.tsx`: add stronger premium lead section and tighten CTA copy.
- `app/get-quote/page.tsx`: improve conversion and mobile clarity without changing the quote API contract.
- `docs/lead-gen/*`: create the no-ad 30-day lead-generation assets.

## Constraints

- Preserve existing brand colors and family-owned story.
- Keep API contracts stable.
- Avoid large package changes.
- Verify desktop and mobile in browser.
- Build must pass before handoff.
