import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import { getNegativeFeedbackAlertEmail } from "@/lib/emailTemplates";
import { BRAND_CONFIG } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const { token, detailedFeedback, contactPreference } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }
    if (!detailedFeedback || !detailedFeedback.trim()) {
      return NextResponse.json({ error: "Feedback is required" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    // Look up review request and customer
    const { data: reviewRequest, error: lookupError } = await supabase
      .from("review_requests")
      .select("*, review_customers(*)")
      .eq("token", token)
      .single();

    if (lookupError || !reviewRequest) {
      return NextResponse.json({ error: "Invalid feedback link" }, { status: 404 });
    }

    const customer = reviewRequest.review_customers;

    // Insert negative feedback
    const { error: insertError } = await supabase
      .from("negative_feedback")
      .insert({
        customer_id: customer.id,
        request_token: token,
        rating: customer.rating || 1,
        comment: customer.comment || null,
        detailed_feedback: detailedFeedback.trim(),
        contact_preference: contactPreference || "none",
      });

    if (insertError) {
      console.error("Error inserting negative feedback:", insertError);
      return NextResponse.json({ error: "Failed to save feedback" }, { status: 500 });
    }

    // Update customer status
    await supabase
      .from("review_customers")
      .update({
        status: "feedback_received",
        updated_at: new Date().toISOString(),
      })
      .eq("id", customer.id);

    // Send alert email to John
    const alertEmail = getNegativeFeedbackAlertEmail({
      customerName: `${customer.first_name}${customer.last_name ? " " + customer.last_name : ""}`,
      email: customer.email,
      rating: customer.rating || 1,
      comment: customer.comment || undefined,
      detailedFeedback: detailedFeedback.trim(),
      contactPreference: contactPreference || "none",
      projectType: customer.project_type || undefined,
    });

    await sendEmail({
      to: BRAND_CONFIG.contact.email,
      subject: alertEmail.subject,
      html: alertEmail.html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Submit negative feedback error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
