import { NextRequest, NextResponse } from "next/server";
import { processSocialMessage, formatSocialLead } from "@/lib/socialBots";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import { BRAND_CONFIG } from "@/lib/utils";

/**
 * Facebook Messenger Webhook
 * 
 * Setup instructions:
 * 1. Create Facebook App at https://developers.facebook.com
 * 2. Add Messenger product
 * 3. Set webhook URL: https://yourdomain.com/api/social/facebook
 * 4. Subscribe to 'messages' events
 * 5. Set verify token in env: FACEBOOK_VERIFY_TOKEN
 */

const VERIFY_TOKEN = process.env.FACEBOOK_VERIFY_TOKEN || "your_verify_token";

export async function GET(request: NextRequest) {
  // Webhook verification
  const mode = request.nextUrl.searchParams.get("hub.mode");
  const token = request.nextUrl.searchParams.get("hub.verify_token");
  const challenge = request.nextUrl.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Handle Facebook webhook payload
    if (body.object === "page") {
      for (const entry of body.entry) {
        for (const event of entry.messaging || []) {
          if (event.message && !event.message.is_echo) {
            const userId = event.sender.id;
            const messageText = event.message.text;

            // Process message
            const response = await processSocialMessage({
              platform: "facebook",
              userId,
              message: messageText,
              timestamp: new Date(),
            });

            // TODO: Send response back via Facebook Graph API
            // This requires FACEBOOK_PAGE_ACCESS_TOKEN
            // Example:
            // await fetch(`https://graph.facebook.com/v18.0/me/messages?access_token=${token}`, {
            //   method: "POST",
            //   body: JSON.stringify({
            //     recipient: { id: userId },
            //     message: { text: response.message }
            //   })
            // });

            // If contact info provided, create lead
            if (response.shouldCollectContact) {
              // In a real implementation, you'd extract contact info from conversation
              // For now, this is a stub
              const leadData = formatSocialLead("facebook", userId, [messageText]);

              const supabase = getSupabaseAdmin();
              if (supabase) {
                try {
                  await supabase.from("leads").insert(leadData);
                } catch (error) {
                  console.error("Database error:", error);
                }
              }

              await sendEmail({
                to: BRAND_CONFIG.contact.email,
                subject: "New Facebook Messenger Lead",
                html: `
                  <h2>New Lead from Facebook Messenger</h2>
                  <p><strong>User ID:</strong> ${userId}</p>
                  <p><strong>Message:</strong> ${messageText}</p>
                `,
              });
            }
          }
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Facebook webhook error:", error);
    return NextResponse.json({ success: true }); // Always return success to avoid retries
  }
}

