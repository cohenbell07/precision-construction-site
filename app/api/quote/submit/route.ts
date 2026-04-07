import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import { generateAIResponse } from "@/lib/ai";
import { BRAND_CONFIG } from "@/lib/utils";
import { env } from "@/lib/env";
import { getActiveDealsSummaryForEmail, getDealsForService } from "@/lib/deals";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
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
    } = data;

    if (!email || !projectDetails) {
      return NextResponse.json(
        { error: "Email and project details are required" },
        { status: 400 }
      );
    }

    const projectTitle = serviceTitle || "Service";
    const projectDescription = `SERVICE QUOTE REQUEST
Service: ${projectTitle}
Name: ${name || "Not provided"}
Email: ${email}
Phone: ${phone || "Not provided"}
Address: ${address || "Not provided"}
Project Details: ${projectDetails}
Timeline: ${timeline || "Not specified"}
Budget Range: ${budgetMin ? `$${budgetMin}` : "Not specified"} - ${budgetMax ? `$${budgetMax}` : "Not specified"}`;

    // Save to Supabase if configured
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from("leads").insert({
          name: name || null,
          email,
          phone: phone || null,
          address: address || null,
          project_type: projectTitle,
          message: projectDescription,
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
      to: BRAND_CONFIG.contact.email,
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
        ${getActiveDealsSummaryForEmail(serviceId || "")}
      `,
    });

    // Build deal info for customer confirmation
    const customerDeals = serviceId ? getDealsForService(serviceId) : [];
    const dealNote = customerDeals.length > 0
      ? `<p style="margin-top:12px;padding:10px 14px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;color:#166534;font-size:14px;">
          <strong>Good news!</strong> Your selected service qualifies for: ${customerDeals.map(d => `<strong>${d.discount} — ${d.name}</strong>`).join(", ")}. We'll apply the best available deal to your quote.
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
        <p>Best regards,<br>${BRAND_CONFIG.owner}<br>${BRAND_CONFIG.name}<br>${BRAND_CONFIG.contact.phoneFormatted}</p>
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
