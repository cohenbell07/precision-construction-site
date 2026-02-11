import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import { BRAND_CONFIG } from "@/lib/utils";
import {
  getAdminEstimateLeadEmail,
  getEstimateConfirmationEmail,
} from "@/lib/emailTemplates";
import type { EstimateResult } from "@/lib/aiTools";

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, projectType, squareFootage, materials, estimate } =
      await request.json();

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
          phone: phone || null,
          project_type: projectType || null,
          project_details: JSON.stringify({
            squareFootage,
            materials,
            estimate,
          }),
          source: "instant_estimate",
        });
      } catch (dbError) {
        console.error("Database error (non-critical):", dbError);
      }
    }

    // Send emails
    const adminEmail = getAdminEstimateLeadEmail({
      name,
      email,
      projectType,
      projectDetails: {
        squareFootage,
        materials,
      },
      estimate: estimate as EstimateResult,
    });

    const adminResult = await sendEmail({
      to: BRAND_CONFIG.contact.email,
      subject: adminEmail.subject,
      html: adminEmail.html,
    });

    const confirmationEmail = getEstimateConfirmationEmail({
      name,
      email,
      projectType,
      estimate: estimate as EstimateResult,
    });

    const confirmResult = await sendEmail({
      to: email,
      subject: confirmationEmail.subject,
      html: confirmationEmail.html,
    });

    if (!adminResult.success || !confirmResult.success) {
      console.error("Email send failed:", adminResult.error ?? confirmResult.error);
      return NextResponse.json(
        { success: false, error: "Failed to send confirmation. Please try again or contact us directly." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating lead from estimate:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}

