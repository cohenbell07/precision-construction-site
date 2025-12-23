import { env } from "./env";

// Safe Supabase client initialization with error handling
// Import Supabase conditionally to avoid client-side module resolution issues

// Safe Supabase client initialization
export const getSupabaseClient = () => {
  try {
    if (!env.supabase.enabled) {
      return null;
    }

    // Only import Supabase on server-side to avoid client bundle issues
    // Client components should use API routes instead
    if (typeof window !== "undefined") {
      // Client-side: return null, use API routes instead
      return null;
    }

    // Server-side: safe to import
    try {
      const { createClient } = require("@supabase/supabase-js");
      return createClient(env.supabase.url!, env.supabase.anonKey!);
    } catch (importError) {
      console.error("Supabase not available:", importError);
      return null;
    }
  } catch (error) {
    console.error("Error creating Supabase client:", error);
    return null;
  }
};

export const getSupabaseAdmin = () => {
  try {
    if (!env.supabase.enabled || !env.supabase.serviceRoleKey) {
      return null;
    }

    // Only on server-side
    if (typeof window !== "undefined") {
      return null;
    }

    try {
      const { createClient } = require("@supabase/supabase-js");
      return createClient(env.supabase.url!, env.supabase.serviceRoleKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      });
    } catch (importError) {
      console.error("Supabase not available:", importError);
      return null;
    }
  } catch (error) {
    console.error("Error creating Supabase admin client:", error);
    return null;
  }
};

