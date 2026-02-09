import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { BRAND_CONFIG } from "@/lib/utils";
import { getServiceMaterialsInquiryEmail } from "@/lib/emailTemplates";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { serviceName, name, email, message } = body;

    if (!email || !serviceName || !message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Service name, email, and message are required" },
        { status: 400 }
      );
    }

    const adminEmail = getServiceMaterialsInquiryEmail({
      serviceName: String(serviceName).trim(),
      name: name ? String(name).trim() : undefined,
      email: String(email).trim(),
      message: String(message).trim(),
    });

    await sendEmail({
      to: BRAND_CONFIG.contact.email,
      subject: adminEmail.subject,
      html: adminEmail.html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Service materials inquiry API error:", error);
    return NextResponse.json(
      { error: "Failed to send inquiry" },
      { status: 500 }
    );
  }
}
