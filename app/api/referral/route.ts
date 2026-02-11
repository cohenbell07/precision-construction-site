import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { BRAND_CONFIG } from "@/lib/utils";
import { env } from "@/lib/env";

function escapeHtml(str: string | undefined): string {
  if (str == null || typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { yourName, yourEmail, friendName, friendEmail, message } = data;

    if (!yourName || !yourEmail || !friendName || !friendEmail) {
      return NextResponse.json(
        { error: "All fields (your name, your email, friend's name, friend's email) are required" },
        { status: 400 }
      );
    }

    const siteUrl = env.site.url;

    // Send email to friend
    const friendResult = await sendEmail({
      to: friendEmail,
      subject: `${yourName} recommended ${BRAND_CONFIG.shortName} to you!`,
      html: `
        <h2>You've been referred to ${BRAND_CONFIG.name}!</h2>
        <p>Hi ${escapeHtml(friendName)},</p>
        <p>${escapeHtml(yourName)} thought you might be interested in our construction services.</p>
        ${message ? `<p><em>"${escapeHtml(message)}"</em></p>` : ""}
        <p>We're a family-owned, 3rd generation Calgary construction company. ${BRAND_CONFIG.motto}</p>
        <p>We provide premium construction and renovation services in Calgary, including:</p>
        <ul>
          <li>Flooring installation (LVP, carpet, tile, large format porcelain, marmoleum)</li>
          <li>Custom showers and steam showers</li>
          <li>Cabinets & Millwork (any style/color, custom closets, Murphy beds)</li>
          <li>Countertops (granite, quartz, porcelain slab, arborite, stainless, natural stone)</li>
          <li>Interior finishing, framing, drywall, painting</li>
          <li>Basement developments, garage builds, decks, fences</li>
          <li>Home additions, full home renovations</li>
          <li>Commercial & multi-unit building experience</li>
          <li>And much more!</li>
        </ul>
        <p><strong>${BRAND_CONFIG.motto}</strong> We treat every client like family.</p>
        <p>Visit our website to learn more or <a href="${siteUrl}/get-quote">request a free quote</a>.</p>
        <p>${BRAND_CONFIG.contact.cta}</p>
        <p>Best regards,<br>${BRAND_CONFIG.owner}<br>${BRAND_CONFIG.name}</p>
      `,
    });

    // Send confirmation to referrer
    const confirmResult = await sendEmail({
      to: yourEmail,
      subject: "Thank you for your referral!",
      html: `
        <h2>Thank you for referring ${escapeHtml(friendName)}!</h2>
        <p>Hi ${escapeHtml(yourName)},</p>
        <p>We've sent your friend ${escapeHtml(friendName)} information about our services.</p>
        <p>We appreciate your trust in us and your referral! ${BRAND_CONFIG.motto}</p>
        <p>Best regards,<br>${BRAND_CONFIG.owner}<br>${BRAND_CONFIG.name}</p>
      `,
    });

    if (!friendResult.success || !confirmResult.success) {
      console.error("Email send failed:", friendResult.error ?? confirmResult.error);
      return NextResponse.json(
        { error: "Failed to send referral emails. Please try again or contact us directly." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Referral submit error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}
