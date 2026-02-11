import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import { generateAIResponse } from "@/lib/ai";
import { BRAND_CONFIG } from "@/lib/utils";
import { env } from "@/lib/env";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      name,
      email,
      phone,
      projectType,
      message,
      quoteType,
      serviceTitle,
      productTitle,
      address,
      projectDetails,
      timeline,
      budgetMin,
      budgetMax,
    } = data;

    if (!email || !projectDetails) {
      return NextResponse.json(
        { error: "Email and project details are required" },
        { status: 400 }
      );
    }

    const projectTitle =
      quoteType === "service" ? serviceTitle || "Service" : productTitle || "Product";
    const projectDescription = `${quoteType === "service" ? "SERVICE" : "PRODUCT"} QUOTE REQUEST
${quoteType === "service" ? `Service: ${projectTitle}` : `Product: ${projectTitle}`}
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
    if (env.openai.enabled) {
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
        <p><strong>Type:</strong> ${quoteType === "service" ? "Service" : "Product"}</p>
        <p><strong>${quoteType === "service" ? "Service" : "Product"}:</strong> ${safe(projectTitle)}</p>
        <p><strong>Name:</strong> ${safe(name)}</p>
        <p><strong>Email:</strong> ${safe(email)}</p>
        <p><strong>Phone:</strong> ${safe(phone) || "Not provided"}</p>
        <p><strong>Address:</strong> ${safe(address) || "Not provided"}</p>
        <p><strong>Project Details:</strong></p>
        <p>${safe(projectDetails)}</p>
        <p><strong>Timeline:</strong> ${safe(timeline) || "Not specified"}</p>
        <p><strong>Budget Range:</strong> ${budgetMin ? `$${budgetMin}` : "Not specified"} - ${budgetMax ? `$${budgetMax}` : "Not specified"}</p>
      `,
    });

    // Send confirmation to user
    const confirmResult = await sendEmail({
      to: email,
      subject: `Thank you for your quote request - ${BRAND_CONFIG.shortName}`,
      html: `
        <h2>Thank you for your quote request!</h2>
        <p>Hi ${safe(name) || "there"},</p>
        <p>${safe(summary)}</p>
        <p>We'll review your request and get back to you within 24 hours.</p>
        <p><strong>${BRAND_CONFIG.motto}</strong></p>
        <p>We treat every client like family and deliver only the best.</p>
        <p>Best regards,<br>${BRAND_CONFIG.owner}<br>${BRAND_CONFIG.name}</p>
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
