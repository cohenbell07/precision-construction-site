import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import { BRAND_CONFIG } from "@/lib/utils";
import { getCustomerEmailSignature } from "@/lib/emailTemplates";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    /* Server-side validation — `leads.name` and `leads.email` are NOT NULL,
       and we don't want to rely solely on the client form's check. A direct
       POST without these would otherwise throw mid-insert. */
    const name = typeof data.name === "string" ? data.name.trim() : "";
    const email = typeof data.email === "string" ? data.email.trim() : "";
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required." },
        { status: 400 }
      );
    }

    /* Save to Supabase if configured. Isolated try/catch so a DB hiccup is
       non-critical — the email below is what actually reaches the team, and
       the other lead routes all treat the insert this way. */
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from("leads").insert({
          name,
          email,
          phone: data.phone || null,
          project_type: data.projectType || null,
          message: data.message || null,
          source: data.source || "api",
        });
      } catch (dbError) {
        console.error("Supabase save error (non-critical):", dbError);
      }
    }

    const { escapeHtml } = await import("@/lib/utils");
    const emailResult = await sendEmail({
      to: BRAND_CONFIG.contact.email,
      subject: `New Lead: ${escapeHtml(data.projectType) || "General Inquiry"}`,
      html: `
        <h2>New Lead Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(data.phone) || "N/A"}</p>
        <p><strong>Project Type:</strong> ${escapeHtml(data.projectType) || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(data.message) || "N/A"}</p>
      `,
    });

    if (!emailResult.success) {
      console.error("Email send failed:", emailResult.error);
      return NextResponse.json(
        { success: false, error: "Failed to send. Please try again or contact us directly." },
        { status: 500 }
      );
    }

    // Send confirmation email to customer
    try {
      await sendEmail({
        to: email,
        subject: `Thank you for contacting us — ${BRAND_CONFIG.shortName}`,
        html: `
          <h2>Thank you for reaching out!</h2>
          <p>Hi ${escapeHtml(name)},</p>
          <p>We've received your inquiry${data.projectType ? ` about ${escapeHtml(data.projectType)}` : ""} and will get back to you within 24 hours.</p>
          <p><strong>${BRAND_CONFIG.motto}</strong></p>
          <p>We treat every client like family and deliver only the best in service, quality, and satisfaction.</p>
          ${getCustomerEmailSignature()}
        `,
      });
    } catch (confirmError) {
      console.error("Confirmation email failed (non-critical):", confirmError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving lead:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}

