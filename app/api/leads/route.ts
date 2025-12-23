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

    // Send email if configured
    await sendEmail({
      to: BRAND_CONFIG.contact.email,
      subject: `New Lead: ${data.projectType || "General Inquiry"}`,
      html: `
        <h2>New Lead Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
        <p><strong>Project Type:</strong> ${data.projectType || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message || "N/A"}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving lead:", error);
    return NextResponse.json({ success: true }); // Always return success for graceful degradation
  }
}

