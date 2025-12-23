/**
 * Social Channel Automation - Webhook Handlers
 * 
 * This file contains stub implementations for social media bot integrations.
 * To set up these bots, you'll need to:
 * 
 * 1. FACEBOOK MESSENGER:
 *    - Create a Facebook App and Page
 *    - Set up webhook at: https://yourdomain.com/api/social/facebook
 *    - Subscribe to 'messages' events
 *    - Verify webhook token matches FACEBOOK_VERIFY_TOKEN env var
 * 
 * 2. INSTAGRAM DM:
 *    - Use Facebook Graph API (Instagram is owned by Meta)
 *    - Similar setup to Facebook Messenger
 *    - Webhook: https://yourdomain.com/api/social/instagram
 * 
 * 3. WHATSAPP:
 *    - Use Meta WhatsApp Business API or Twilio
 *    - Webhook: https://yourdomain.com/api/social/whatsapp
 *    - Configure in Meta Business Manager or Twilio Console
 * 
 * All bots should:
 * - Greet users with: "Thanks for your message! What kind of project are you planning?"
 * - Ask follow-up questions about project type, size, timeline
 * - Collect contact information
 * - Create leads via /api/leads/create-from-tool
 * - Send confirmation emails via Resend
 */

import { generateAIResponse } from "./ai";
import { BRAND_CONFIG } from "./utils";

export interface SocialMessage {
  platform: "facebook" | "instagram" | "whatsapp";
  userId: string;
  message: string;
  timestamp: Date;
}

export interface SocialResponse {
  message: string;
  shouldCollectContact?: boolean;
}

/**
 * Process incoming social media message
 */
export async function processSocialMessage(
  message: SocialMessage
): Promise<SocialResponse> {
  const systemPrompt = `You are a helpful construction assistant for ${BRAND_CONFIG.name}.
  
  Respond to social media messages (${message.platform}) in a friendly, concise way.
  Ask about their project and guide them to provide contact information.`;

  const { response } = await generateAIResponse(message.message, systemPrompt);

  // Simple logic to determine if we should collect contact
  const shouldCollectContact =
    message.message.toLowerCase().includes("quote") ||
    message.message.toLowerCase().includes("estimate") ||
    message.message.toLowerCase().includes("contact");

  return {
    message: response,
    shouldCollectContact,
  };
}

/**
 * Format lead data from social conversation
 */
export function formatSocialLead(
  platform: string,
  userId: string,
  conversation: string[],
  contactInfo?: { name?: string; email?: string; phone?: string }
) {
  return {
    name: contactInfo?.name || null,
    email: contactInfo?.email || null,
    phone: contactInfo?.phone || null,
    project_type: null, // Extract from conversation if possible
    project_details: JSON.stringify({
      platform,
      userId,
      conversation,
    }),
    message: conversation.join("\n"),
    source: `social_${platform}`,
  };
}

/**
 * Example webhook payload structures:
 * 
 * Facebook Messenger:
 * {
 *   "object": "page",
 *   "entry": [{
 *     "messaging": [{
 *       "sender": { "id": "USER_ID" },
 *       "recipient": { "id": "PAGE_ID" },
 *       "message": { "text": "Hello" }
 *     }]
 *   }]
 * }
 * 
 * WhatsApp (Meta):
 * {
 *   "messages": [{
 *     "from": "PHONE_NUMBER",
 *     "text": { "body": "Hello" }
 *   }]
 * }
 */

