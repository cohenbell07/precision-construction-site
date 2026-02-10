import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { BRAND_CONFIG } from "@/lib/utils";
import {
  getDealQuoteAdminEmail,
  getDealQuoteConfirmationEmail,
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
