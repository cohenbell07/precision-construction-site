import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import { BRAND_CONFIG } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Save to Supabase if configured
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.from("leads").insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        project_type: data.projectType,
        message: data.message,
        source: data.source || "api",
      });
    }

    const { escapeHtml } = await import("@/lib/utils");
    const emailResult = await sendEmail({
      to: BRAND_CONFIG.contact.email,
      subject: `New Lead: ${escapeHtml(data.projectType) || "General Inquiry"}`,
      html: `
        <h2>New Lead Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
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
    if (data.email) {
      try {
        await sendEmail({
          to: data.email,
          subject: `Thank you for contacting us — ${BRAND_CONFIG.shortName}`,
          html: `
            <h2>Thank you for reaching out!</h2>
            <p>Hi ${escapeHtml(data.name) || "there"},</p>
            <p>We've received your inquiry${data.projectType ? ` about ${escapeHtml(data.projectType)}` : ""} and will get back to you within 24 hours.</p>
            <p><strong>${BRAND_CONFIG.motto}</strong></p>
            <p>We treat every client like family and deliver only the best in service, quality, and satisfaction.</p>
            <p>If you have any immediate questions, feel free to call us at ${BRAND_CONFIG.contact.phoneFormatted}.</p>
            <p>Best regards,<br>${BRAND_CONFIG.owner}<br>${BRAND_CONFIG.name}</p>
          `,
        });
      } catch (confirmError) {
        console.error("Confirmation email failed (non-critical):", confirmError);
      }
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

