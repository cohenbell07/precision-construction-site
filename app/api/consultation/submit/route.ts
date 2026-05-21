/**
 * Consultation booking endpoint — sibling of /api/quote/submit.
 *
 * Captures higher-intent leads who want an in-home walkthrough rather than a
 * form-based quote. Inserts a row into the same `leads` Supabase table
 * (source: "consultation") and fires admin + customer confirmation emails.
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { sendEmail, LEAD_INBOX_EMAIL } from "@/lib/email";
import { BRAND_CONFIG } from "@/lib/utils";
import { getCustomerEmailSignature } from "@/lib/emailTemplates";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      name,
      email,
      phone,
      address,
      serviceTitle,
      serviceId,
      preferredTime,
      projectDetails,
    } = data;

    if (!email || !projectDetails || !phone || !name) {
      return NextResponse.json(
        { error: "Name, email, phone, and project details are required." },
        { status: 400 }
      );
    }

    const projectTitle = serviceTitle || "General Consultation";

    /* Save to Supabase — same `leads` table, distinct source value so John can
       filter consultations vs. quote-tool leads in the dashboard. Structured
       columns rather than one message blob: the consultation's "preferred
       time" maps to `timeline` (it's the when), the notes to
       `project_details`. */
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from("leads").insert({
          name,
          email,
          phone,
          address: address || null,
          project_type: projectTitle,
          project_details: projectDetails || null,
          timeline: preferredTime || "Flexible",
          message: "In-home consultation request",
          source: "consultation",
        });
      } catch (dbError) {
        console.error("Database error (non-critical):", dbError);
      }
    }

    /* Escape user-provided strings before interpolating into HTML. */
    const safe = (s: string | undefined) =>
      (s ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    const adminResult = await sendEmail({
      to: LEAD_INBOX_EMAIL,
      subject: `New Consultation Request — ${projectTitle}`,
      html: `
        <h2>New In-Home Consultation Request</h2>
        <p><strong>Type:</strong> Consultation booking</p>
        <p><strong>Service interest:</strong> ${safe(projectTitle)}</p>
        <p><strong>Name:</strong> ${safe(name)}</p>
        <p><strong>Email:</strong> ${safe(email)}</p>
        <p><strong>Phone:</strong> ${safe(phone)}</p>
        <p><strong>Address:</strong> ${safe(address) || "Not provided"}</p>
        <p><strong>Preferred time:</strong> ${safe(preferredTime) || "Flexible"}</p>
        <p><strong>Project notes:</strong></p>
        <p>${safe(projectDetails)}</p>
        <p style="margin-top:18px;padding:10px 14px;background:#fef3c7;border:1px solid #fde68a;border-radius:8px;color:#92400e;font-size:14px;">
          <strong>Action:</strong> Call ${safe(name)} at ${safe(phone)} to schedule the visit.
        </p>
      `,
    });

    const confirmResult = await sendEmail({
      to: email,
      subject: `Your consultation request — ${BRAND_CONFIG.shortName}`,
      html: `
        <h2>Thanks for booking a consultation, ${safe(name)}!</h2>
        <p>We've received your request for an in-home consultation${serviceId ? ` about your <strong>${safe(projectTitle)}</strong> project` : ""}.</p>
        <p><strong>What happens next:</strong></p>
        <ul>
          <li>${BRAND_CONFIG.owner} or someone from the team will call you within 24 hours.</li>
          <li>We'll pick a time that works for you — based on your preference: <em>${safe(preferredTime) || "flexible"}</em>.</li>
          <li>The visit is free, no pressure, and usually takes 30–45 minutes.</li>
        </ul>
        <p>If you'd rather not wait, feel free to call us directly at ${BRAND_CONFIG.contact.phoneFormatted}.</p>
        <p><strong>${BRAND_CONFIG.motto}</strong></p>
        ${getCustomerEmailSignature()}
      `,
    });

    if (!adminResult.success || !confirmResult.success) {
      console.error("Email send failed:", adminResult.error ?? confirmResult.error);
      return NextResponse.json(
        { error: "Failed to send confirmation email. Please try again or call us directly." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Consultation submit error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or call us directly." },
      { status: 500 }
    );
  }
}
