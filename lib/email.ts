import { Resend } from "resend";
import { env } from "./env";

const resend = env.resend.enabled ? new Resend(env.resend.apiKey!) : null;

/**
 * Server-only routing target for every lead notification email (the `to:`
 * field on Resend sends). Honors a `CONTACT_EMAIL` override in `.env.local`
 * so John can route test submissions to his own inbox during local QA;
 * production env sets this to johnpcnd@gmail.com.
 *
 * IMPORTANT: only import this from API routes (`app/api/*`). It must never
 * appear in a client-rendered component — the override would create a
 * server/client hydration mismatch. The publicly-displayed email lives at
 * `BRAND_CONFIG.contact.email` and is a pure constant for that reason.
 */
export const LEAD_INBOX_EMAIL: string =
  process.env.CONTACT_EMAIL || "johnpcnd@gmail.com";

export interface EmailAttachment {
  filename: string;
  content: Buffer;
}

export interface EmailData {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  attachments?: EmailAttachment[];
}

export async function sendEmail(data: EmailData): Promise<{ success: boolean; error?: string }> {
  if (!env.resend.enabled || !resend) {
    console.log("Email service not configured. Would send:", data);
    return { success: true }; // Graceful no-op
  }

  try {
    await resend.emails.send({
      from: data.from || env.resend.fromEmail,
      to: Array.isArray(data.to) ? data.to : [data.to],
      subject: data.subject,
      html: data.html,
      ...(data.attachments && data.attachments.length > 0 && {
        attachments: data.attachments.map((a) => ({
          filename: a.filename,
          content: a.content,
        })),
      }),
    });
    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

