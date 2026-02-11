import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import { BRAND_CONFIG } from "@/lib/utils";
import { getProjectPlanEmail } from "@/lib/emailTemplates";

export async function POST(request: NextRequest) {
  try {
    const { name, email, description, projectType, plan } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // Save to Supabase
    const supabase = getSupabaseAdmin();
    if (supabase) {
      try {
        await supabase.from("leads").insert({
          name: name || null,
          email,
          project_type: projectType || null,
          project_details: JSON.stringify({ description, plan }),
          message: description,
          source: "project_planner",
        });
      } catch (dbError) {
        console.error("Database error (non-critical):", dbError);
      }
    }

    // Send project plan email to user
    const planEmail = getProjectPlanEmail({
      name,
      email,
      projectType,
      plan,
    });

    const planResult = await sendEmail({
      to: email,
      subject: planEmail.subject,
      html: planEmail.html,
    });

    const { escapeHtml } = await import("@/lib/utils");
    const adminResult = await sendEmail({
      to: BRAND_CONFIG.contact.email,
      subject: `New Project Planner Lead: ${escapeHtml(projectType) || "General"}`,
      html: `
        <h2>New Lead from Project Planner</h2>
        <p><strong>Name:</strong> ${escapeHtml(name) || "Not provided"}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Project Type:</strong> ${escapeHtml(projectType) || "Not specified"}</p>
        <p><strong>Description:</strong></p>
        <p>${escapeHtml(description)}</p>
        <p><strong>Source:</strong> Project Planner</p>
      `,
    });

    if (!planResult.success || !adminResult.success) {
      console.error("Email send failed:", planResult.error ?? adminResult.error);
      return NextResponse.json(
        { success: false, error: "Failed to send. Please try again or contact us directly." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating lead from planner:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}

