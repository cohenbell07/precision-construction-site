import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import { BRAND_CONFIG } from "@/lib/utils";
import {
  getAdminChatLeadEmail,
  getChatLeadConfirmationEmail,
} from "@/lib/emailTemplates";
import { scoreLead } from "@/lib/aiTools";

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, projectDetails, conversation } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // Score the lead
    const leadScore = await scoreLead(projectDetails || {}, "ai_chat");

    // Save to Supabase
    const supabase = getSupabaseAdmin();
    if (supabase) {
      try {
        await supabase.from("leads").insert({
          name: name || null,
          email,
          phone: phone || null,
          project_type: projectDetails?.projectType || null,
          project_details: JSON.stringify(projectDetails || {}),
          message: conversation || null,
          source: "ai_chat",
          // Add lead_score if column exists (optional)
          // lead_score: leadScore.score,
        });
      } catch (dbError) {
        console.error("Database error (non-critical):", dbError);
        // Continue even if DB fails
      }
    }

    // Send emails
    const adminEmail = getAdminChatLeadEmail({
      name,
      email,
      phone,
      projectType: projectDetails?.projectType,
      projectDetails,
      conversationSummary: conversation,
    });

    await sendEmail({
      to: BRAND_CONFIG.contact.email,
      subject: adminEmail.subject,
      html: adminEmail.html,
    });

    const confirmationEmail = getChatLeadConfirmationEmail({
      name,
      email,
      projectType: projectDetails?.projectType,
      conversationSummary: conversation,
    });

    await sendEmail({
      to: email,
      subject: confirmationEmail.subject,
      html: confirmationEmail.html,
    });

    return NextResponse.json({
      success: true,
      leadScore: leadScore.score,
    });
  } catch (error) {
    console.error("Error creating lead from chat:", error);
    // Always return success for graceful degradation
    return NextResponse.json({ success: true });
  }
}

