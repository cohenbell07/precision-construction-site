import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import { BRAND_CONFIG } from "@/lib/utils";
import {
  getDealQuoteAdminEmail,
  getDealQuoteConfirmationEmail,
  getDealQuoteLabels,
  type DealQuoteData,
} from "@/lib/emailTemplates";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      dealType,
      name,
      email,
      phone,
      selectedOptions,
      projectDetails,
      address,
      timeline,
      budgetMin,
      budgetMax,
    } = body;

    if (!email || !dealType || !Array.isArray(selectedOptions) || selectedOptions.length === 0) {
      return NextResponse.json(
        { error: "Email, deal type, and at least one option are required" },
        { status: 400 }
      );
    }

    if (dealType !== "bundle" && dealType !== "supplier" && dealType !== "basement") {
      return NextResponse.json({ error: "Invalid deal type" }, { status: 400 });
    }

    const data: DealQuoteData = {
      dealType,
      name: name || undefined,
      email,
      phone: phone || undefined,
      selectedOptions,
      projectDetails: projectDetails || undefined,
      timeline: timeline || undefined,
      budgetMin: budgetMin || undefined,
      budgetMax: budgetMax || undefined,
    };

    // Save to Supabase if configured
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        const { label } = getDealQuoteLabels(data);
        const message = `Selected: ${data.selectedOptions.join(", ")}${data.projectDetails ? `\nDetails: ${data.projectDetails}` : ""}${data.timeline ? `\nTimeline: ${data.timeline}` : ""}${data.budgetMin || data.budgetMax ? `\nBudget: ${data.budgetMin || "—"} to ${data.budgetMax || "—"}` : ""}`;
        const sourceMap: Record<string, string> = { bundle: "deal_quote_bundle", basement: "deal_quote_basement", supplier: "deal_quote_seasonal" };
        await supabase.from("leads").insert({
          name: data.name || null,
          email: data.email,
          phone: data.phone || null,
          address: address || null,
          project_type: label,
          message,
          source: sourceMap[dealType] || `deal_quote_${dealType}`,
        });
      }
    } catch (dbError) {
      console.error("Supabase save error (non-critical):", dbError);
    }

    const adminEmail = getDealQuoteAdminEmail(data);
    await sendEmail({
      to: BRAND_CONFIG.contact.email,
      subject: adminEmail.subject,
      html: adminEmail.html,
    });

    const confirmationEmail = getDealQuoteConfirmationEmail(data);
    await sendEmail({
      to: email,
      subject: confirmationEmail.subject,
      html: confirmationEmail.html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Deal quote API error:", error);
    return NextResponse.json(
      { error: "Failed to submit quote request" },
      { status: 500 }
    );
  }
}
