import { NextRequest, NextResponse } from "next/server";
import { processSocialMessage, formatSocialLead } from "@/lib/socialBots";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import { BRAND_CONFIG } from "@/lib/utils";

/**
 * Instagram DM Webhook
 * 
 * Setup instructions:
 * 1. Use Facebook Graph API (Instagram is owned by Meta)
 * 2. Set webhook URL: https://yourdomain.com/api/social/instagram
 * 3. Subscribe to 'messages' events
 * 4. Similar setup to Facebook Messenger
 */

export async function GET(request: NextRequest) {
  // Webhook verification (similar to Facebook)
  const mode = request.nextUrl.searchParams.get("hub.mode");
  const token = request.nextUrl.searchParams.get("hub.verify_token");
  const challenge = request.nextUrl.searchParams.get("hub.challenge");

  const VERIFY_TOKEN = process.env.INSTAGRAM_VERIFY_TOKEN || "your_verify_token";

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Handle Instagram webhook payload (structure similar to Facebook)
    // Implementation would process Instagram-specific payload format
    // This is a stub - implement based on Instagram Graph API documentation

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Instagram webhook error:", error);
    return NextResponse.json({ success: true });
  }
}

