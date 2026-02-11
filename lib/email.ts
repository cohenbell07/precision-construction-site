import { Resend } from "resend";
import { env } from "./env";

const resend = env.resend.enabled ? new Resend(env.resend.apiKey!) : null;

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

