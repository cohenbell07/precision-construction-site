import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { token, rating, comment } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    // Look up review request by token
    const { data: reviewRequest, error: lookupError } = await supabase
      .from("review_requests")
      .select("*, review_customers(*)")
      .eq("token", token)
      .single();

    if (lookupError || !reviewRequest) {
      return NextResponse.json({ error: "Invalid or expired feedback link" }, { status: 404 });
    }

    if (reviewRequest.status === "completed") {
      return NextResponse.json({ error: "Feedback has already been submitted" }, { status: 400 });
    }

    if (reviewRequest.status === "expired") {
      return NextResponse.json({ error: "This feedback link has expired" }, { status: 400 });
    }

    // Update review request
    const { error: requestUpdateError } = await supabase
      .from("review_requests")
      .update({
        status: "completed",
        completed_at: new Date().toISOString(),
      })
      .eq("id", reviewRequest.id);

    if (requestUpdateError) {
      console.error("Error updating review request:", requestUpdateError);
    }

    // Update customer record
    const newStatus = rating >= 4 ? "completed" : "feedback_received";
    const { error: customerUpdateError } = await supabase
      .from("review_customers")
      .update({
        rating,
        comment: comment?.trim() || null,
        status: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", reviewRequest.customer_id);

    if (customerUpdateError) {
      console.error("Error updating customer:", customerUpdateError);
    }

    // Also mark any other pending requests for this customer as completed
    await supabase
      .from("review_requests")
      .update({ status: "completed", completed_at: new Date().toISOString() })
      .eq("customer_id", reviewRequest.customer_id)
      .eq("status", "sent");

    const path = rating >= 4 ? "happy" : "unhappy";
    return NextResponse.json({ success: true, path });
  } catch (error) {
    console.error("Feedback submit error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
