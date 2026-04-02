import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ success: true }); // fail silently — this is fire-and-forget
    }

    // Look up review request to get customer_id
    const { data: reviewRequest } = await supabase
      .from("review_requests")
      .select("customer_id")
      .eq("token", token)
      .single();

    if (reviewRequest) {
      await supabase
        .from("review_customers")
        .update({
          google_review_clicked: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", reviewRequest.customer_id);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Track google click error:", error);
    return NextResponse.json({ success: true }); // fail silently
  }
}
