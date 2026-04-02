import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import { getReviewFollowUpEmail } from "@/lib/emailTemplates";
import { env } from "@/lib/env";

export async function GET(request: NextRequest) {
  try {
    // Validate cron secret
    const authHeader = request.headers.get("authorization");
    const expectedToken = env.review.cronSecret;

    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    const now = new Date();
    const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString();
    const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString();

    let followUpsSent = 0;
    let expiredCount = 0;

    // 1. Find customers who need a follow-up (initial sent > 48hrs ago, no follow-up yet)
    const { data: needsFollowUp } = await supabase
      .from("review_requests")
      .select("*, review_customers(*)")
      .eq("type", "initial")
      .eq("status", "sent")
      .lt("sent_at", fortyEightHoursAgo)
      .gt("sent_at", fiveDaysAgo);

    if (needsFollowUp && needsFollowUp.length > 0) {
      for (const request of needsFollowUp) {
        // Check if a follow-up already exists for this customer
        const { data: existingFollowUp } = await supabase
          .from("review_requests")
          .select("id")
          .eq("customer_id", request.customer_id)
          .eq("type", "followup")
          .limit(1);

        if (existingFollowUp && existingFollowUp.length > 0) {
          continue; // Already sent a follow-up
        }

        const customer = request.review_customers;

        // Create follow-up review request
        const { data: followUpRequest, error: followUpError } = await supabase
          .from("review_requests")
          .insert({
            customer_id: customer.id,
            type: "followup",
            status: "sent",
            sent_at: now.toISOString(),
          })
          .select()
          .single();

        if (followUpError) {
          console.error("Error creating follow-up request:", followUpError);
          continue;
        }

        // Use the original request token so the same link works
        const feedbackUrl = `${env.site.url}/feedback/${request.token}`;
        const emailTemplate = getReviewFollowUpEmail({
          firstName: customer.first_name,
          projectType: customer.project_type || undefined,
          feedbackUrl,
        });

        const emailResult = await sendEmail({
          to: customer.email,
          subject: emailTemplate.subject,
          html: emailTemplate.html,
        });

        if (emailResult.success) {
          followUpsSent++;
        } else {
          console.error(`Failed to send follow-up to ${customer.email}:`, emailResult.error);
        }
      }
    }

    // 2. Expire old requests (initial sent > 5 days ago, still in 'sent' status)
    const { data: toExpire } = await supabase
      .from("review_requests")
      .select("id, customer_id")
      .eq("type", "initial")
      .eq("status", "sent")
      .lt("sent_at", fiveDaysAgo);

    if (toExpire && toExpire.length > 0) {
      const requestIds = toExpire.map((r: { id: string }) => r.id);
      const customerIds = [...new Set(toExpire.map((r: { customer_id: string }) => r.customer_id))];

      // Mark requests as expired
      await supabase
        .from("review_requests")
        .update({ status: "expired" })
        .in("id", requestIds);

      // Also expire any follow-up requests for these customers
      await supabase
        .from("review_requests")
        .update({ status: "expired" })
        .in("customer_id", customerIds)
        .eq("status", "sent");

      // Mark customers as expired
      await supabase
        .from("review_customers")
        .update({
          status: "expired",
          updated_at: now.toISOString(),
        })
        .in("id", customerIds)
        .eq("status", "sent");

      expiredCount = customerIds.length;
    }

    return NextResponse.json({
      success: true,
      followUpsSent,
      expired: expiredCount,
      timestamp: now.toISOString(),
    });
  } catch (error) {
    console.error("Review follow-up cron error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
