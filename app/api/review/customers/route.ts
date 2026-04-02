import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { env } from "@/lib/env";

export async function GET(request: NextRequest) {
  try {
    // Validate admin password
    const password = request.headers.get("x-admin-password");
    if (!env.review.adminPassword || password !== env.review.adminPassword) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    const { data: customers, error } = await supabase
      .from("review_customers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching review customers:", error);
      return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
    }

    return NextResponse.json({ success: true, customers: customers || [] });
  } catch (error) {
    console.error("Fetch customers error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
