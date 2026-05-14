/**
 * Service-specific quote-form question sets.
 *
 * The previous /get-quote form asked one generic question — "describe your
 * project" in a textarea. Construction-firm research is consistent: 3–5
 * structured questions per service materially raise lead quality + signal
 * to the user that you actually understand their project before they hit
 * submit. This file is the registry.
 *
 * Top-six services (basements, renovations, flooring, cabinets, showers,
 * countertops) get bespoke sets. Everything else falls through to a generic
 * set with a single "tell us about your project" textarea.
 *
 * The answers state lives in the form as `{ [questionId]: string | string[] }`.
 * On submit, `formatAnswersForSubmit` flattens them into the `projectDetails`
 * string the backend already expects — so the API, Supabase rows, and email
 * templates require zero changes.
 */

export type QuestionType = "select" | "multi" | "text" | "textarea" | "number";

export interface Question {
  /** Key written into the form's `answers` state. */
  id: string;
  /** Label shown above the input. */
  label: string;
  type: QuestionType;
  /** Options for select / multi questions. */
  options?: string[];
  /** Placeholder for text / textarea / number questions. */
  placeholder?: string;
  /** When true, validation blocks submission until answered. Default false. */
  required?: boolean;
  /** Optional helper line shown beneath the label. */
  helper?: string;
}

export interface QuestionSet {
  /** Service this set targets — matches `Service.id`. */
  service: string;
  questions: Question[];
}

/* ─── Top-six service question sets ──────────────────────────────────── */

const basementsQuestions: Question[] = [
  {
    id: "scope",
    label: "What's the scope?",
    type: "select",
    required: true,
    options: [
      "Full development from bare concrete",
      "Renovation of an already-finished basement",
      "Specific area only (e.g. bathroom add, wet bar)",
      "Not sure — want to talk it through",
    ],
  },
  {
    id: "size",
    label: "Rough size?",
    type: "select",
    required: true,
    options: [
      "Under 800 sq ft",
      "800 – 1,200 sq ft",
      "1,200 – 1,800 sq ft",
      "1,800+ sq ft",
      "Not sure",
    ],
  },
  {
    id: "features",
    label: "What do you want included?",
    type: "multi",
    helper: "Pick anything that applies — we'll quote each.",
    options: [
      "Bathroom",
      "Bedroom",
      "Kitchenette / wet bar",
      "Living / rec area",
      "Home theater",
      "Gym",
      "Office",
      "Walkout / egress",
    ],
  },
  {
    id: "notes",
    label: "Anything else we should know?",
    type: "textarea",
    placeholder: "Existing moisture issues, ceiling height, layout ideas, etc.",
  },
];

const renovationsQuestions: Question[] = [
  {
    id: "rooms",
    label: "Which rooms?",
    type: "multi",
    required: true,
    options: [
      "Kitchen",
      "Primary bathroom",
      "Other bathroom",
      "Living / dining",
      "Bedroom(s)",
      "Whole home",
      "Other",
    ],
  },
  {
    id: "scope",
    label: "How deep does it go?",
    type: "select",
    required: true,
    options: [
      "Cosmetic refresh (paint, fixtures, hardware)",
      "Mid-level (cabinets, counters, flooring)",
      "Full gut renovation",
      "Not sure yet",
    ],
  },
  {
    id: "size",
    label: "Approximate size of the work?",
    type: "select",
    options: [
      "Under 200 sq ft",
      "200 – 500 sq ft",
      "500 – 1,000 sq ft",
      "1,000+ sq ft",
      "Not sure",
    ],
  },
  {
    id: "notes",
    label: "Anything else we should know?",
    type: "textarea",
    placeholder: "Materials in mind, must-haves, layout ideas, etc.",
  },
];

const flooringQuestions: Question[] = [
  {
    id: "material",
    label: "What material are you considering?",
    type: "select",
    required: true,
    options: [
      "Hardwood",
      "Engineered hardwood",
      "Luxury vinyl plank (LVP)",
      "Tile",
      "Carpet",
      "Not sure — recommend something",
    ],
  },
  {
    id: "area",
    label: "Approximate area to floor?",
    type: "select",
    required: true,
    options: [
      "Under 500 sq ft",
      "500 – 1,000 sq ft",
      "1,000 – 2,000 sq ft",
      "2,000+ sq ft",
      "Not sure",
    ],
  },
  {
    id: "floors",
    label: "Which floors are involved?",
    type: "multi",
    options: ["Main floor", "Upper floor", "Basement", "Single room only"],
  },
  {
    id: "notes",
    label: "Anything else?",
    type: "textarea",
    placeholder: "Old flooring to remove? Subfloor concerns? Stairs included?",
  },
];

const cabinetsQuestions: Question[] = [
  {
    id: "type",
    label: "What kind of cabinet project?",
    type: "select",
    required: true,
    options: [
      "Full kitchen cabinets",
      "Bathroom vanity",
      "Office / built-ins",
      "Closet / pantry",
      "Single area / island only",
      "Other custom millwork",
    ],
  },
  {
    id: "size",
    label: "How much, roughly?",
    type: "select",
    required: true,
    options: [
      "Under 10 linear feet",
      "10 – 20 linear feet",
      "20 – 40 linear feet",
      "40+ linear feet",
      "Not sure",
    ],
  },
  {
    id: "finish",
    label: "Finish preference?",
    type: "select",
    options: [
      "Painted",
      "Stained wood (oak, walnut, etc.)",
      "Thermofoil / melamine",
      "Mixed (e.g. island accent)",
      "Not sure — recommend",
    ],
  },
  {
    id: "notes",
    label: "Anything else?",
    type: "textarea",
    placeholder: "Style direction, hardware preference, drawer organizers, etc.",
  },
];

const showersQuestions: Question[] = [
  {
    id: "type",
    label: "What kind of shower project?",
    type: "select",
    required: true,
    options: [
      "Full new custom shower build",
      "Replace an existing tile shower",
      "Replace a fibreglass unit with tile",
      "Tub-to-shower conversion",
      "Steam shower",
      "Other",
    ],
  },
  {
    id: "size",
    label: "Rough size?",
    type: "select",
    options: [
      "Alcove (under 30 sq ft)",
      "Medium (30 – 60 sq ft)",
      "Large / walk-in (60+ sq ft)",
      "Not sure",
    ],
  },
  {
    id: "glass",
    label: "Glass enclosure?",
    type: "select",
    options: [
      "Yes — frameless",
      "Yes — semi-frameless",
      "No / curtain",
      "Not sure — recommend",
    ],
  },
  {
    id: "notes",
    label: "Anything else?",
    type: "textarea",
    placeholder: "Tile preference, bench/niche needs, accessibility, etc.",
  },
];

const countertopsQuestions: Question[] = [
  {
    id: "material",
    label: "Material preference?",
    type: "select",
    required: true,
    options: [
      "Quartz",
      "Granite",
      "Marble",
      "Butcher block / wood",
      "Solid surface",
      "Not sure — recommend",
    ],
  },
  {
    id: "where",
    label: "Where is it going?",
    type: "multi",
    required: true,
    options: ["Kitchen", "Island", "Bathroom vanity", "Wet bar", "Laundry"],
  },
  {
    id: "size",
    label: "Roughly how much?",
    type: "select",
    options: [
      "Under 20 linear feet",
      "20 – 40 linear feet",
      "40+ linear feet",
      "Not sure",
    ],
  },
  {
    id: "notes",
    label: "Anything else?",
    type: "textarea",
    placeholder: "Edge profile, backsplash, sink type, etc.",
  },
];

/* ─── Generic fallback (every other service + the 'Other' option) ────── */

const fallbackQuestions: Question[] = [
  {
    id: "notes",
    label: "Tell us about your project",
    type: "textarea",
    required: true,
    placeholder:
      "Scope, rough size or area, materials you have in mind, timing, anything we should know before we put together a quote.",
  },
];

/* ─── Registry + helpers ─────────────────────────────────────────────── */

export const questionSets: Record<string, QuestionSet> = {
  basements:   { service: "basements",   questions: basementsQuestions },
  renovations: { service: "renovations", questions: renovationsQuestions },
  flooring:    { service: "flooring",    questions: flooringQuestions },
  cabinets:    { service: "cabinets",    questions: cabinetsQuestions },
  showers:     { service: "showers",     questions: showersQuestions },
  countertops: { service: "countertops", questions: countertopsQuestions },
};

export function getQuestionSet(serviceId: string | undefined): Question[] {
  if (!serviceId) return fallbackQuestions;
  return questionSets[serviceId]?.questions ?? fallbackQuestions;
}

/** Flatten the answers state into a multi-line string that slots into the
    existing `projectDetails` field on the API. Each question becomes a
    'Label: value' line, with multi answers comma-joined. */
export function formatAnswersForSubmit(
  questions: Question[],
  answers: Record<string, string | string[] | undefined>,
): string {
  const lines: string[] = [];
  for (const q of questions) {
    const v = answers[q.id];
    if (Array.isArray(v)) {
      if (v.length === 0) continue;
      lines.push(`${q.label} ${v.join(", ")}`);
    } else if (typeof v === "string" && v.trim()) {
      lines.push(`${q.label} ${v.trim()}`);
    }
  }
  return lines.join("\n");
}

/** Validate required questions; returns { [questionId]: errorMessage }. */
export function validateAnswers(
  questions: Question[],
  answers: Record<string, string | string[] | undefined>,
): Record<string, string> {
  const errs: Record<string, string> = {};
  for (const q of questions) {
    if (!q.required) continue;
    const v = answers[q.id];
    if (q.type === "multi") {
      if (!Array.isArray(v) || v.length === 0) {
        errs[q.id] = "Pick at least one.";
      }
    } else {
      if (typeof v !== "string" || !v.trim()) {
        errs[q.id] = "This one's required.";
      }
    }
  }
  return errs;
}
