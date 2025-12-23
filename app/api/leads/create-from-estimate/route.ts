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

    await sendEmail({
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

    await sendEmail({
      to: email,
      subject: confirmationEmail.subject,
      html: confirmationEmail.html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating lead from estimate:", error);
    return NextResponse.json({ success: true });
  }
}

