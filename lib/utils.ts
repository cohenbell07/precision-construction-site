import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Escape HTML for safe embedding in email templates (prevents XSS). */
export function escapeHtml(str: string | undefined | null): string {
  if (str == null || typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Brand configuration - modular for easy future rebranding
// Update these constants to change brand name site-wide
export const COMPANY_NAME = "Precision Construction & Decora Inc.";
export const COMPANY_NAME_SHORT = "Precision Construction & Decora";

// Brand configuration - easy to rename
export const BRAND_CONFIG = {
  name: COMPANY_NAME,
  shortName: COMPANY_NAME_SHORT,
  motto: "Expect Only The Best",
  tagline: "Family-Owned Since 1968 | Serving Calgary Since 1997",
  description: "A 3rd generation, family-owned and operated Calgary construction company. We treat every client like family and deliver only the best in service, quality, and satisfaction.",
  owner: "John Olivito",
  established: 1968,
  servingSince: 1997,
  contact: {
    /* Public-facing display email — must be a pure constant so that server
       and client render the exact same string. Do NOT read process.env here:
       client bundles don't have CONTACT_EMAIL (it's not NEXT_PUBLIC_*), so
       any env read would resolve to the dev override on the server and to
       the fallback on the client → React hydration mismatch.
       The dev/prod-overridable lead-inbox routing email lives in
       `lib/email.ts` as `LEAD_INBOX_EMAIL` and is only imported by API
       routes (never by client components). */
    email: "johnpcnd@gmail.com",
    phone: "403-818-7767",
    /** E.164 form for tel: links. */
    phoneHref: "+14038187767",
    phoneFormatted: "(403) 818-7767",
    address: "Calgary, AB and Surrounding Areas",
    cta: "Call or Email to Book a Consultation",
  },
  /* Structured NAP — single source of truth for both on-page display and
     JSON-LD so they can never diverge. Service-area business (no public
     storefront), so no street address is published. */
  address: {
    locality: "Calgary",
    region: "AB",
    regionName: "Alberta",
    country: "CA",
    display: "Calgary, AB",
  },
  /* Calgary service-area centroid (city centre) for LocalBusiness geo. */
  geo: { latitude: 51.0447, longitude: -114.0719 },
  /* Cities explicitly served — drives schema areaServed + matches on-page
     claims + the /areas-we-serve location pages. */
  areasServed: ["Calgary", "Airdrie", "Cochrane", "Okotoks", "Chestermere"],
  /* Business hours — one source for the contact page + OpeningHoursSpecification. */
  hours: [
    { label: "Mon – Fri", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "18:00" },
    { label: "Saturday", days: ["Saturday"], opens: "08:00", closes: "16:00" },
    { label: "Sunday", days: ["Sunday"], closed: true },
  ] as { label: string; days: string[]; opens?: string; closes?: string; closed?: boolean }[],
  /* Review proof — GATED. ratingValue matches the on-page "5.0 Rated" claim,
     but aggregateRating JSON-LD and the "read on Google" links are ONLY
     emitted once the owner supplies a real reviewCount + review URL. We never
     invent a count. To activate: set reviewCount below to the real Google
     count and add NEXT_PUBLIC_GOOGLE_REVIEW_URL in Vercel. */
  reviews: {
    ratingValue: "5.0",
    reviewCount: null as number | null, // ← owner: set to real Google review count to enable star rich-results
    googleReviewUrl: process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || "", // NEXT_PUBLIC_* is safe to read (inlined identically on server + client)
  },
  /* Credentials — only render specifics that are true. "Licensed & Insured"
     is an existing site claim; the licence number / WCB account / BBB are
     left blank for the owner to fill with verifiable values (never invented). */
  credentials: {
    licensed: true,
    insured: true,
    wcbCovered: false, // ← owner: set true once WCB coverage is confirmed
    licenceNumber: "", // ← owner: City of Calgary business licence #
    bbbAccredited: false, // ← owner: set true if BBB-accredited
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61588370031463",
    instagram: "https://www.instagram.com/pcnd.ca/",
  },
};

