/**
 * Service-page "Ask Us Anything" inquiry endpoint.
 *
 * Lighter-touch than the full /get-quote flow — a low-commitment "got a
 * question about this service?" form on each /services/[slug] page. Now
 * brought in line with every other form: it saves a lead row to Supabase
 * AND sends a customer confirmation, not just an admin notification.
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { sendEmail, LEAD_INBOX_EMAIL } from "@/lib/email";
import { BRAND_CONFIG, escapeHtml } from "@/lib/utils";
import { getServiceMaterialsInquiryEmail, getCustomerEmailSignature } from "@/lib/emailTemplates";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { serviceName, name, email, message } = body as {
      serviceName?: string;
      name?: string;
      email?: string;
      message?: string;
    };

    if (!email || !serviceName || !message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Service name, email, and message are required" },
        { status: 400 },
      );
    }

    const cleanName = name?.trim();
    const cleanEmail = String(email).trim();
    const cleanService = String(serviceName).trim();
    const cleanMessage = message.trim();

    /* Save the inquiry as a lead. `leads.name` is NOT NULL — the inquiry
       form doesn't require a name, so fall back to the email address so the
       row is still actionable in the dashboard. Non-critical: a DB hiccup
       shouldn't block the email from going out. */
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from("leads").insert({
          name: cleanName || cleanEmail,
          email: cleanEmail,
          project_type: cleanService,
          project_details: cleanMessage,
          message: `SERVICE INQUIRY (${cleanService})\n${cleanMessage}`,
          source: "service_inquiry",
        });
      } catch (dbError) {
        console.error("Supabase save error (non-critical):", dbError);
      }
    }

    const adminEmail = getServiceMaterialsInquiryEmail({
      serviceName: cleanService,
      name: cleanName || undefined,
      email: cleanEmail,
      message: cleanMessage,
    });

    const adminResult = await sendEmail({
      to: LEAD_INBOX_EMAIL,
      subject: adminEmail.subject,
      html: adminEmail.html,
    });

    if (!adminResult.success) {
      console.error("Inquiry admin email failed:", adminResult.error);
      return NextResponse.json(
        { error: "Failed to send. Please try again or contact us directly." },
        { status: 500 },
      );
    }

    /* Customer confirmation — matches the acknowledgement the other forms
       send. Non-critical: if it fails the inquiry still succeeded. */
    try {
      await sendEmail({
        to: cleanEmail,
        subject: `We got your question about ${escapeHtml(cleanService)} — ${BRAND_CONFIG.shortName}`,
        html: `
          <h2>Thanks for reaching out!</h2>
          <p>Hi ${escapeHtml(cleanName || "there")},</p>
          <p>We've received your question about <strong>${escapeHtml(cleanService)}</strong> and will get back to you within 24 hours.</p>
          <p>If it's time-sensitive, feel free to call us directly at ${BRAND_CONFIG.contact.phoneFormatted}.</p>
          <p><strong>${BRAND_CONFIG.motto}</strong></p>
          ${getCustomerEmailSignature()}
        `,
      });
    } catch (confirmError) {
      console.error("Inquiry confirmation email failed (non-critical):", confirmError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Service materials inquiry API error:", error);
    return NextResponse.json(
      { error: "Failed to send inquiry" },
      { status: 500 },
    );
  }
}
