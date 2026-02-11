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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving lead:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}

