import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import { BRAND_CONFIG } from "@/lib/utils";

function escapeHtml(str: string | undefined): string {
  if (str == null || typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB - Resend limit is 40 MB per email
const ALLOWED_EXTENSIONS = ["pdf", "jpg", "jpeg", "png", "doc", "docx"];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const productType = (formData.get("productType") as string) || "";
    const rawInquiryType = ((formData.get("inquiryType") as string) || "product").toLowerCase();
    const inquiryType = rawInquiryType === "service" ? "service" : "product";
    const file = formData.get("quoteFile") as File | null;

    if (!email?.trim()) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    let attachment: { filename: string; content: Buffer } | null = null;
    if (file && file.size > 0) {
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "File is too large. Maximum size is 10 MB." },
          { status: 400 }
        );
      }
      const ext = (file.name?.toLowerCase().split(".").pop() || "").replace(/[^a-z0-9]/g, "");
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        return NextResponse.json(
          { error: "Invalid file type. Allowed: PDF, JPG, PNG, DOC, DOCX" },
          { status: 400 }
        );
      }
      const bytes = await file.arrayBuffer();
      attachment = {
        filename: file.name || "competitor-quote.pdf",
        content: Buffer.from(bytes),
      };
    }

    const hasAttachment = !!attachment;
    const categoryLabel = productType?.trim() || (inquiryType === "service" ? "General Service" : "General Product");
    const sourceSlug = inquiryType === "service" ? "services_price_beat" : "products_price_beat";

    // Save to Supabase if configured
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from("leads").insert({
          name: name || null,
          email,
          phone: null,
          project_type: `Price Beat (${inquiryType === "service" ? "Service" : "Product"}): ${categoryLabel}`,
          message: `Type: ${inquiryType === "service" ? "Service" : "Product"}\nCategory: ${categoryLabel}\n\nCompetitor quote attached: ${hasAttachment ? "Yes" : "No"}`,
          source: sourceSlug,
        });
      } catch (dbError) {
        console.error("Database error (non-critical):", dbError);
      }
    }

    // Send email to admin with attachment if present
    const adminResult = await sendEmail({
      to: BRAND_CONFIG.contact.email,
      subject: `Price Beat Request (${inquiryType === "service" ? "Service" : "Product"}) - ${categoryLabel}`,
      html: `
        <h2>New Price Beat Request</h2>
        <p><strong>Type:</strong> ${inquiryType === "service" ? "Service" : "Product"}</p>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Category:</strong> ${escapeHtml(categoryLabel)}</p>
        <p><strong>Competitor Quote Attached:</strong> ${hasAttachment ? `Yes (${attachment!.filename})` : "No"}</p>
      `,
      attachments: attachment ? [attachment] : undefined,
    });

    // Send confirmation to user
    const confirmResult = await sendEmail({
      to: email,
      subject: `Thank you for your price beat request - ${BRAND_CONFIG.shortName}`,
      html: `
        <h2>Thank you for your price beat request!</h2>
        <p>Hi ${escapeHtml(name) || "there"},</p>
        <p>We've received your request and will review your competitor quote. Our team will get back to you within 24 hours with our best price—guaranteed to beat your quote by at least 5%.</p>
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Price beat submit error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}
