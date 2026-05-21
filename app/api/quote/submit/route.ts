import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { sendEmail, LEAD_INBOX_EMAIL } from "@/lib/email";
import { generateAIResponse } from "@/lib/ai";
import { BRAND_CONFIG } from "@/lib/utils";
import { env } from "@/lib/env";
import { getActiveOffersEmailHtml, getOffersForService } from "@/lib/deals";
import { getCustomerEmailSignature } from "@/lib/emailTemplates";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as {
      name?: string;
      email?: string;
      phone?: string;
      serviceTitle?: string;
      serviceId?: string;
      address?: string;
      projectDetails?: string;
      timeline?: string;
      budgetMin?: string | number;
      budgetMax?: string | number;
      referralSource?: string;
      photos?: string[];
    };
    const {
      name,
      email,
      phone,
      serviceTitle,
      serviceId,
      address,
      projectDetails,
      timeline,
      budgetMin,
      budgetMax,
      referralSource,
      photos,
    } = data;

    if (!email || !projectDetails) {
      return NextResponse.json(
        { error: "Email and project details are required" },
        { status: 400 }
      );
    }

    const projectTitle = serviceTitle || "Service";
    const photoUrls: string[] = Array.isArray(photos)
      ? photos.filter((u): u is string => typeof u === "string" && u.startsWith("http"))
      : [];

    /* Budget range as a single human-readable string for the `budget`
       column (the table stores it as text, not two numbers). */
    const budgetRange =
      budgetMin || budgetMax
        ? `${budgetMin ? `$${budgetMin}` : "—"} to ${budgetMax ? `$${budgetMax}` : "—"}`
        : null;

    /* `message` holds only the leftovers that have no dedicated column —
       photo URLs and the referral source. Everything else lands in its
       own structured column so John's dashboard is filterable. */
    const messageExtras = [
      photoUrls.length ? `Photos:\n${photoUrls.join("\n")}` : null,
      referralSource ? `How they found us: ${referralSource}` : null,
    ]
      .filter(Boolean)
      .join("\n\n");

    // Save to Supabase if configured
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from("leads").insert({
          /* `name` is NOT NULL in the table; the form validates it
             client-side via validateLeadForm, so it's always present. */
          name: name || "Not provided",
          email,
          phone: phone || null,
          address: address || null,
          project_type: projectTitle,
          project_details: projectDetails || null,
          timeline: timeline || null,
          budget: budgetRange,
          message: messageExtras || null,
          source: "quote_tool",
        });
      } catch (dbError) {
        console.error("Database error (non-critical):", dbError);
      }
    }

    // Generate AI summary
    let summary =
      "Thank you for your quote request! We'll review your project details and get back to you within 24 hours with a detailed quote.";
    if (env.anthropic.enabled) {
      const prompt = `Generate a professional quote summary for a ${projectTitle} project.
      Project details: ${projectDetails}
      Timeline: ${timeline || "Not specified"}
      Budget: ${budgetMin ? `$${budgetMin}` : "Not specified"} - ${budgetMax ? `$${budgetMax}` : "Not specified"}
      Provide a brief, professional response.`;
      const aiResult = await generateAIResponse(prompt);
      if (aiResult?.response) {
        summary = aiResult.response;
      }
    }

    // Escape user input for safe HTML
    const safe = (s: string | undefined) =>
      (s ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    // Send email to admin
    const adminResult = await sendEmail({
      to: LEAD_INBOX_EMAIL,
      subject: `New Quote Request - ${projectTitle}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Type:</strong> Service</p>
        <p><strong>Service:</strong> ${safe(projectTitle)}</p>
        <p><strong>Name:</strong> ${safe(name)}</p>
        <p><strong>Email:</strong> ${safe(email)}</p>
        <p><strong>Phone:</strong> ${safe(phone) || "Not provided"}</p>
        <p><strong>Address:</strong> ${safe(address) || "Not provided"}</p>
        <p><strong>Project Details:</strong></p>
        <p>${safe(projectDetails)}</p>
        <p><strong>Timeline:</strong> ${safe(timeline) || "Not specified"}</p>
        <p><strong>Budget Range:</strong> ${budgetMin ? `$${budgetMin}` : "Not specified"} - ${budgetMax ? `$${budgetMax}` : "Not specified"}</p>
        ${referralSource ? `<p><strong>How They Found Us:</strong> ${safe(referralSource)}</p>` : ""}
        ${photoUrls.length ? `
          <p><strong>Project Photos:</strong></p>
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px;">
            ${photoUrls.map((url, i) => `
              <a href="${url}" target="_blank" rel="noopener noreferrer" style="display:inline-block;">
                <img src="${url}" alt="Project photo ${i + 1}" width="160" style="display:block;border-radius:6px;border:1px solid #d9d0be;object-fit:cover;" />
              </a>
            `).join("")}
          </div>
          <p style="font-size:12px;color:#666;">Tap any photo to open at full size.</p>
        ` : ""}
        ${getActiveOffersEmailHtml()}
      `,
    });

    /* Customer-facing call-out for the limited-time promo. The Price Beat
       Guarantee is mentioned in passing so the customer knows it exists
       (it applies vs. a competitor quote, not on top of our discount —
       phrased here so it doesn't read like a stacked "+5%" offer). */
    const customerOffers = getOffersForService(serviceId);
    const limitedTime = customerOffers.find((o) => o.limitedTime);
    const dealNote = limitedTime
      ? `<p style="margin-top:12px;padding:10px 14px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;color:#166534;font-size:14px;">
          <strong>Good news!</strong> Your project is eligible for our <strong>${limitedTime.name}</strong>${limitedTime.endsAtDisplay ? ` — valid through <strong>${limitedTime.endsAtDisplay}</strong>` : ""}. We also stand by our 5% Price Beat Guarantee if you've got a comparable competitor quote in hand.
        </p>`
      : "";

    // Send confirmation to user
    const confirmResult = await sendEmail({
      to: email,
      subject: `Your ${safe(projectTitle)} Quote Request - ${BRAND_CONFIG.shortName}`,
      html: `
        <h2>Thank you for your ${safe(projectTitle)} quote request!</h2>
        <p>Hi ${safe(name) || "there"},</p>
        <p>${safe(summary)}</p>
        ${dealNote}
        <p>We'll review your <strong>${safe(projectTitle)}</strong> project details and get back to you within 24 hours with a detailed quote.</p>
        <p><strong>${BRAND_CONFIG.motto}</strong></p>
        <p>We treat every client like family and deliver only the best.</p>
        ${getCustomerEmailSignature()}
      `,
    });

    if (!adminResult.success || !confirmResult.success) {
      console.error("Email send failed:", adminResult.error ?? confirmResult.error);
      return NextResponse.json(
        { error: "Failed to send confirmation email. Please try again or contact us directly." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, summary });
  } catch (error) {
    console.error("Quote submit error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}
