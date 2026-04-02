import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import { getReviewRequestEmail } from "@/lib/emailTemplates";
import { env } from "@/lib/env";

export async function POST(request: NextRequest) {
  try {
    // Validate admin password
    const password = request.headers.get("x-admin-password");
    if (!env.review.adminPassword || password !== env.review.adminPassword) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const { firstName, lastName, email, projectType, notes } = data;

    // Validate required fields
    if (!firstName || !firstName.trim()) {
      return NextResponse.json({ error: "First name is required" }, { status: 400 });
    }
    if (!email || !email.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    // Insert customer
    const { data: customer, error: customerError } = await supabase
      .from("review_customers")
      .insert({
        first_name: firstName.trim(),
        last_name: lastName?.trim() || null,
        email: email.trim().toLowerCase(),
        project_type: projectType || null,
        notes: notes?.trim() || null,
        status: "sent",
      })
      .select()
      .single();

    if (customerError) {
      console.error("Error inserting review customer:", customerError);
      return NextResponse.json({ error: "Failed to create customer record" }, { status: 500 });
    }

    // Create review request with token
    const { data: reviewRequest, error: requestError } = await supabase
      .from("review_requests")
      .insert({
        customer_id: customer.id,
        type: "initial",
        status: "sent",
        sent_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (requestError) {
      console.error("Error creating review request:", requestError);
      return NextResponse.json({ error: "Failed to create review request" }, { status: 500 });
    }

    // Build feedback URL and send email
    const feedbackUrl = `${env.site.url}/feedback/${reviewRequest.token}`;
    const emailTemplate = getReviewRequestEmail({
      firstName: firstName.trim(),
      projectType: projectType || undefined,
      feedbackUrl,
    });

    const emailResult = await sendEmail({
      to: email.trim().toLowerCase(),
      subject: emailTemplate.subject,
      html: emailTemplate.html,
    });

    if (!emailResult.success) {
      console.error("Failed to send review request email:", emailResult.error);
      return NextResponse.json({
        success: true,
        customer,
        warning: "Customer created but email failed to send: " + emailResult.error,
      });
    }

    return NextResponse.json({ success: true, customer });
  } catch (error) {
    console.error("Submit customer error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
