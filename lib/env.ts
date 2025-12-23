// Safe environment variable access with fallbacks

export const env = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY || null,
    enabled: !!process.env.OPENAI_API_KEY,
  },
  resend: {
    apiKey: process.env.RESEND_API_KEY || null,
    fromEmail: process.env.RESEND_FROM_EMAIL || "noreply@precisionconstruction.com",
    enabled: !!process.env.RESEND_API_KEY,
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || null,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || null,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || null,
    enabled: !!(
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ),
  },
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },
};

