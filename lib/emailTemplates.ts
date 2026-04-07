import { BRAND_CONFIG, escapeHtml } from "./utils";
import { ProjectDetails, EstimateResult } from "./aiTools";

/**
 * Email Templates Library
 * Reusable email templates for lead generation automation
 */

export interface EmailTemplateData {
  name?: string;
  email: string;
  phone?: string;
  projectType?: string;
  projectDetails?: ProjectDetails;
  estimate?: EstimateResult;
  conversationSummary?: string;
}

/**
 * Admin notification - New lead from chat (full quote context)
 */
export function getAdminChatLeadEmail(data: EmailTemplateData): { subject: string; html: string } {
  const pd = data.projectDetails;
  const projectLabel = pd?.serviceName || pd?.projectType || pd?.productInterest || "General Inquiry";
  return {
    subject: `New AI Chat Lead: ${escapeHtml(projectLabel)}`,
    html: `
      <h2>New Lead from AI Chatbot</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name) || "Not provided"}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone) || "Not provided"}</p>
      <p><strong>Project Type:</strong> ${escapeHtml(data.projectType || pd?.projectType) || "Not specified"}</p>
      ${pd?.serviceId ? `<p><strong>Service:</strong> ${escapeHtml(pd.serviceName || pd.serviceId)}</p>` : ""}
      ${pd?.productInterest ? `<p><strong>Product Interest:</strong> ${escapeHtml(pd.productInterest)}</p>` : ""}
      ${pd?.description ? `<p><strong>Description:</strong> ${escapeHtml(pd.description)}</p>` : ""}
      ${pd?.squareFootage ? `<p><strong>Square Footage:</strong> ${escapeHtml(pd.squareFootage)}</p>` : ""}
      ${pd?.materials ? `<p><strong>Materials:</strong> ${escapeHtml(pd.materials)}</p>` : ""}
      ${pd?.timeline ? `<p><strong>Timeline:</strong> ${escapeHtml(pd.timeline)}</p>` : ""}
      ${pd?.budget ? `<p><strong>Budget:</strong> ${escapeHtml(pd.budget)}</p>` : ""}
      ${data.conversationSummary ? `<p><strong>Conversation:</strong></p><pre style="white-space:pre-wrap;font-family:sans-serif;">${escapeHtml(data.conversationSummary)}</pre>` : ""}
      <p><strong>Source:</strong> AI Chatbot</p>
      <p>${BRAND_CONFIG.motto}</p>
    `,
  };
}

/**
 * Lead confirmation - Chat lead
 */
export function getChatLeadConfirmationEmail(data: EmailTemplateData): { subject: string; html: string } {
  return {
    subject: `Thank you for contacting ${BRAND_CONFIG.shortName}`,
    html: `
      <h2>Thank you for reaching out!</h2>
      <p>Hi ${escapeHtml(data.name) || "there"},</p>
      <p>We've received your inquiry about ${escapeHtml(data.projectType) || "your project"} and will get back to you within 24 hours.</p>
      ${data.conversationSummary ? `<p><strong>Project Summary:</strong></p><p>${escapeHtml(data.conversationSummary)}</p>` : ""}
      <p><strong>${BRAND_CONFIG.motto}</strong></p>
      <p>We treat every client like family and deliver only the best in service, quality, and satisfaction.</p>
      <p>If you have any immediate questions, feel free to call us at ${BRAND_CONFIG.contact.phoneFormatted}.</p>
      <p>Best regards,<br>${BRAND_CONFIG.owner}<br>${BRAND_CONFIG.name}</p>
    `,
  };
}

/**
 * Admin notification - Instant estimate lead
 */
export function getAdminEstimateLeadEmail(data: EmailTemplateData): { subject: string; html: string } {
  return {
    subject: `New Instant Estimate Lead: ${data.projectType || "General"}`,
    html: `
      <h2>New Lead from Instant Estimate Tool</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name) || "Not provided"}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Project Type:</strong> ${escapeHtml(data.projectType) || "Not specified"}</p>
      ${data.estimate ? `
        <p><strong>Estimated Cost Range:</strong> ${escapeHtml(data.estimate.costRange)}</p>
        <p><strong>Estimated Timeline:</strong> ${escapeHtml(data.estimate.timeline)}</p>
        <p><strong>Breakdown:</strong> ${escapeHtml(data.estimate.breakdown)}</p>
      ` : ""}
      ${data.projectDetails?.squareFootage ? `<p><strong>Square Footage:</strong> ${escapeHtml(data.projectDetails.squareFootage)}</p>` : ""}
      ${data.projectDetails?.materials ? `<p><strong>Materials:</strong> ${escapeHtml(data.projectDetails.materials)}</p>` : ""}
      <p><strong>Source:</strong> Instant Estimate Tool</p>
      <p>${BRAND_CONFIG.motto}</p>
    `,
  };
}

/**
 * Lead confirmation - Instant estimate
 */
export function getEstimateConfirmationEmail(data: EmailTemplateData): { subject: string; html: string } {
  return {
    subject: `Your ${BRAND_CONFIG.shortName} Estimate`,
    html: `
      <h2>Thank you for your interest!</h2>
      <p>Hi ${escapeHtml(data.name) || "there"},</p>
      <p>Thank you for using our instant estimate tool for your ${escapeHtml(data.projectType) || "project"}.</p>
      ${data.estimate ? `
        <h3>Preliminary Estimate</h3>
        <p><strong>Cost Range:</strong> ${escapeHtml(data.estimate.costRange)}</p>
        <p><strong>Timeline:</strong> ${escapeHtml(data.estimate.timeline)}</p>
        <p><strong>Breakdown:</strong></p>
        <p>${escapeHtml(data.estimate.breakdown)}</p>
        <p><em>Note: This is a preliminary estimate. A detailed quote will be provided after consultation.</em></p>
      ` : ""}
      <p>We'll contact you within 24 hours to discuss your project in detail and provide a comprehensive quote.</p>
      <p><strong>${BRAND_CONFIG.motto}</strong></p>
      <p>Best regards,<br>${BRAND_CONFIG.owner}<br>${BRAND_CONFIG.name}</p>
      <p>${BRAND_CONFIG.contact.cta}</p>
    `,
  };
}

/**
 * Follow-up email - Day 2 (Tips)
 */
export function getFollowUpTipsEmail(data: EmailTemplateData): { subject: string; html: string } {
  const projectType = data.projectType || "project";
  return {
    subject: `Tips for planning your ${projectType}`,
    html: `
      <h2>Tips for Planning Your ${projectType}</h2>
      <p>Hi ${data.name || "there"},</p>
      <p>We wanted to share some helpful tips as you plan your ${projectType}:</p>
      <ul>
        <li>Consider your timeline and any upcoming events</li>
        <li>Think about your budget and financing options</li>
        <li>Gather inspiration photos or ideas</li>
        <li>Check if permits are required for your project</li>
        <li>Plan for temporary accommodations if needed</li>
      </ul>
      <p>Ready to move forward? <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/get-quote">Book a free consultation</a> with us.</p>
      <p><strong>${BRAND_CONFIG.motto}</strong></p>
      <p>Best regards,<br>${BRAND_CONFIG.owner}<br>${BRAND_CONFIG.name}</p>
    `,
  };
}

/**
 * Follow-up email - Day 4 (Consultation)
 */
export function getFollowUpConsultationEmail(data: EmailTemplateData): { subject: string; html: string } {
  return {
    subject: `Book your free consultation with ${BRAND_CONFIG.shortName}`,
    html: `
      <h2>Ready to discuss your project?</h2>
      <p>Hi ${data.name || "there"},</p>
      <p>We'd love to discuss your ${data.projectType || "project"} in detail and provide you with a comprehensive quote.</p>
      <p>Book a free consultation with us:</p>
      <p><strong>Phone:</strong> ${BRAND_CONFIG.contact.phoneFormatted}</p>
      <p><strong>Email:</strong> ${BRAND_CONFIG.contact.email}</p>
      <p>Or <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/get-quote">request a quote online</a>.</p>
      <p><strong>${BRAND_CONFIG.motto}</strong></p>
      <p>We treat every client like family and deliver only the best.</p>
      <p>Best regards,<br>${BRAND_CONFIG.owner}<br>${BRAND_CONFIG.name}</p>
    `,
  };
}

/**
 * Deal quote types for 15% bundle, 10% supplier, and 15% basement forms
 */
export interface DealQuoteData {
  dealType: "bundle" | "supplier" | "basement";
  name?: string;
  email: string;
  phone?: string;
  /** Selected options (e.g. "Flooring + install", "Full basement renovation") */
  selectedOptions: string[];
  /** Bundle/basement: project details. Supplier: quantity / how much needed */
  projectDetails?: string;
  timeline?: string;
  budgetMin?: string;
  budgetMax?: string;
}

export function getDealQuoteLabels(data: DealQuoteData): { discount: string; label: string; projectDetailsLabel: string } {
  if (data.dealType === "bundle") return { discount: "15%", label: "15% Bundle Savings", projectDetailsLabel: "Project / service details:" };
  if (data.dealType === "basement") return { discount: "15%", label: "15% Basement Renovation", projectDetailsLabel: "Project / service details:" };
  return { discount: "10%", label: "10% Seasonal Special", projectDetailsLabel: "Project / service details:" };
}

export function getDealQuoteAdminEmail(data: DealQuoteData): { subject: string; html: string } {
  const { discount, label, projectDetailsLabel } = getDealQuoteLabels(data);
  return {
    subject: `${label} Quote Request — ${data.name || "Unknown"}`,
    html: `
      <h2>${label} Quote Request</h2>
      <p><strong>Discount:</strong> ${discount} off</p>
      <p><strong>Name:</strong> ${data.name || "Not provided"}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
      <p><strong>Selected options (${data.selectedOptions.length}):</strong></p>
      <ul>${data.selectedOptions.map((o) => `<li>${escapeHtml(o)}</li>`).join("")}</ul>
      ${data.projectDetails ? `<p><strong>${projectDetailsLabel}</strong></p><p>${escapeHtml(data.projectDetails)}</p>` : ""}
      ${data.timeline ? `<p><strong>Timeline:</strong> ${data.timeline}</p>` : ""}
      ${data.budgetMin || data.budgetMax ? `<p><strong>Budget range:</strong> ${data.budgetMin ? `$${data.budgetMin}` : "—"} to ${data.budgetMax ? `$${data.budgetMax}` : "—"}</p>` : ""}
      <p><strong>Source:</strong> ${label} form</p>
      <p>${BRAND_CONFIG.motto}</p>
    `,
  };
}

export function getDealQuoteConfirmationEmail(data: DealQuoteData): { subject: string; html: string } {
  const { discount, label } = getDealQuoteLabels(data);
  const shortLabel = data.dealType === "basement" ? "Basement Renovation" : label.replace(/^\d+% /, "");
  return {
    subject: `We received your ${shortLabel} quote request — ${BRAND_CONFIG.shortName}`,
    html: `
      <h2>Thank you for your ${discount} ${shortLabel} quote request</h2>
      <p>Hi ${data.name || "there"},</p>
      <p>We've received your request and will get back to you within 24 hours with a quote.</p>
      <p><strong>Your selections:</strong> ${data.selectedOptions.join(", ")}</p>
      <p><strong>${BRAND_CONFIG.motto}</strong></p>
      <p>If you have any questions, call us at ${BRAND_CONFIG.contact.phoneFormatted}.</p>
      <p>Best regards,<br>${BRAND_CONFIG.owner}<br>${BRAND_CONFIG.name}</p>
    `,
  };
}

/**
 * Service page "materials / questions" inquiry (owner notification)
 */
export function getServiceMaterialsInquiryEmail(data: {
  serviceName: string;
  name?: string;
  email: string;
  message: string;
}): { subject: string; html: string } {
  return {
    subject: `Materials/Service inquiry: ${data.serviceName} — ${data.name || "Unknown"}`,
    html: `
      <h2>Materials or service question</h2>
      <p><strong>Service page:</strong> ${data.serviceName}</p>
      <p><strong>Name:</strong> ${data.name || "Not provided"}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Message / materials request:</strong></p>
      <pre style="white-space:pre-wrap;font-family:sans-serif;background:#f0f0f0;padding:12px;border-radius:8px;">${escapeHtml(data.message)}</pre>
      <p><strong>Source:</strong> Service page materials inquiry form</p>
      <p>${BRAND_CONFIG.motto}</p>
    `,
  };
}

/**
 * Project plan summary email
 */
export function getProjectPlanEmail(data: EmailTemplateData & { plan: any }): { subject: string; html: string } {
  return {
    subject: `Your ${BRAND_CONFIG.shortName} Project Plan`,
    html: `
      <h2>Your Project Planning Summary</h2>
      <p>Hi ${data.name || "there"},</p>
      <p>Thank you for using our project planning assistant. Here's your personalized plan:</p>
      ${data.plan.suggestions ? `
        <h3>Design Suggestions</h3>
        <ul>
          ${data.plan.suggestions.map((s: string) => `<li>${s}</li>`).join("")}
        </ul>
      ` : ""}
      ${data.plan.materials ? `
        <h3>Recommended Materials</h3>
        <ul>
          ${data.plan.materials.map((m: string) => `<li>${m}</li>`).join("")}
        </ul>
      ` : ""}
      ${data.plan.considerations ? `
        <h3>Important Considerations</h3>
        <ul>
          ${data.plan.considerations.map((c: string) => `<li>${c}</li>`).join("")}
        </ul>
      ` : ""}
      <p><strong>Estimated Cost:</strong> ${data.plan.estimatedCost || "Contact for detailed estimate"}</p>
      <p>Ready to move forward? <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/get-quote">Get a detailed quote</a>.</p>
      <p><strong>${BRAND_CONFIG.motto}</strong></p>
      <p>Best regards,<br>${BRAND_CONFIG.owner}<br>${BRAND_CONFIG.name}</p>
    `,
  };
}

// ─── Review System Email Templates ───────────────────────────────────────────

/**
 * Initial feedback request email sent to customer after project completion
 */
export function getReviewRequestEmail(data: {
  firstName: string;
  projectType?: string;
  feedbackUrl: string;
}): { subject: string; html: string } {
  const projectLabel = data.projectType ? escapeHtml(data.projectType) : "recent project";
  return {
    subject: `How was your experience with ${BRAND_CONFIG.shortName}?`,
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #101820; color: #ffffff; padding: 0;">
        <div style="background: linear-gradient(135deg, #1F1F1F 0%, #101820 100%); padding: 40px 30px; text-align: center; border-bottom: 2px solid #D4AF37;">
          <h1 style="color: #D4AF37; font-size: 24px; margin: 0 0 8px 0; font-weight: 700;">${BRAND_CONFIG.shortName}</h1>
          <p style="color: #B0B0B0; font-size: 13px; margin: 0;">${BRAND_CONFIG.motto}</p>
        </div>
        <div style="padding: 40px 30px;">
          <p style="font-size: 18px; color: #ffffff; margin: 0 0 20px 0;">Hi ${escapeHtml(data.firstName)},</p>
          <p style="font-size: 16px; color: #E8E8E8; line-height: 1.6; margin: 0 0 16px 0;">
            Thank you for trusting us with your ${projectLabel}. We hope everything turned out great!
          </p>
          <p style="font-size: 16px; color: #E8E8E8; line-height: 1.6; margin: 0 0 30px 0;">
            We'd love to hear how your experience was. It only takes about 30 seconds and means a lot to our family business.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.feedbackUrl}" style="display: inline-block; background: linear-gradient(135deg, #D4AF37 0%, #B8941F 100%); color: #101820; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 700; letter-spacing: 0.5px;">Share Your Feedback</a>
          </div>
          <p style="font-size: 14px; color: #808080; text-align: center; margin: 20px 0 0 0;">Takes less than 30 seconds</p>
        </div>
        <div style="background-color: #1F1F1F; padding: 24px 30px; text-align: center; border-top: 1px solid #2E2E2E;">
          <p style="color: #B0B0B0; font-size: 13px; margin: 0 0 4px 0;">Warm regards,</p>
          <p style="color: #D4AF37; font-size: 14px; font-weight: 600; margin: 0 0 4px 0;">${BRAND_CONFIG.owner}</p>
          <p style="color: #808080; font-size: 12px; margin: 0;">${BRAND_CONFIG.name}</p>
          <p style="color: #808080; font-size: 12px; margin: 4px 0 0 0;">${BRAND_CONFIG.contact.phoneFormatted}</p>
        </div>
      </div>
    `,
  };
}

/**
 * Follow-up reminder email (sent ~48hrs after initial if no response)
 */
export function getReviewFollowUpEmail(data: {
  firstName: string;
  projectType?: string;
  feedbackUrl: string;
}): { subject: string; html: string } {
  const projectLabel = data.projectType ? escapeHtml(data.projectType) : "recent project";
  return {
    subject: `Quick reminder — your feedback means a lot to us`,
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #101820; color: #ffffff; padding: 0;">
        <div style="background: linear-gradient(135deg, #1F1F1F 0%, #101820 100%); padding: 32px 30px; text-align: center; border-bottom: 2px solid #D4AF37;">
          <h1 style="color: #D4AF37; font-size: 22px; margin: 0;">${BRAND_CONFIG.shortName}</h1>
        </div>
        <div style="padding: 36px 30px;">
          <p style="font-size: 17px; color: #ffffff; margin: 0 0 18px 0;">Hi ${escapeHtml(data.firstName)},</p>
          <p style="font-size: 15px; color: #E8E8E8; line-height: 1.6; margin: 0 0 24px 0;">
            Just a friendly follow-up — we'd really value hearing about your experience with your ${projectLabel}. Your feedback helps us keep improving and means a lot to our team.
          </p>
          <div style="text-align: center; margin: 28px 0;">
            <a href="${data.feedbackUrl}" style="display: inline-block; background: linear-gradient(135deg, #D4AF37 0%, #B8941F 100%); color: #101820; padding: 14px 36px; text-decoration: none; border-radius: 8px; font-size: 15px; font-weight: 700;">Quick 30-Second Feedback</a>
          </div>
        </div>
        <div style="background-color: #1F1F1F; padding: 20px 30px; text-align: center; border-top: 1px solid #2E2E2E;">
          <p style="color: #B0B0B0; font-size: 13px; margin: 0;">Thanks so much,</p>
          <p style="color: #D4AF37; font-size: 14px; font-weight: 600; margin: 4px 0 0 0;">${BRAND_CONFIG.owner} &amp; the ${BRAND_CONFIG.shortName} team</p>
        </div>
      </div>
    `,
  };
}

/**
 * Alert email sent to John when a customer leaves negative feedback (1-3 stars)
 */
export function getNegativeFeedbackAlertEmail(data: {
  customerName: string;
  email: string;
  rating: number;
  comment?: string;
  detailedFeedback: string;
  contactPreference: string;
  projectType?: string;
}): { subject: string; html: string } {
  const stars = "★".repeat(data.rating) + "☆".repeat(5 - data.rating);
  return {
    subject: `Customer Feedback Alert: ${data.rating}/5 stars from ${escapeHtml(data.customerName)}`,
    html: `
      <h2 style="color: #cc0000;">Customer Feedback Alert</h2>
      <p><strong>Customer:</strong> ${escapeHtml(data.customerName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Project:</strong> ${escapeHtml(data.projectType || "Not specified")}</p>
      <p><strong>Rating:</strong> ${stars} (${data.rating}/5)</p>
      ${data.comment ? `<p><strong>Initial comment:</strong> ${escapeHtml(data.comment)}</p>` : ""}
      <p><strong>Detailed feedback:</strong></p>
      <pre style="white-space:pre-wrap;font-family:sans-serif;background:#f5f5f5;padding:16px;border-radius:8px;border-left:4px solid #cc0000;">${escapeHtml(data.detailedFeedback)}</pre>
      <p><strong>Contact preference:</strong> ${escapeHtml(data.contactPreference)}</p>
      <hr style="border:none;border-top:1px solid #ddd;margin:24px 0;">
      <p style="color:#666;font-size:14px;">This feedback was submitted privately and was <strong>not</strong> posted to Google Reviews. Consider reaching out to this customer to resolve their concerns.</p>
    `,
  };
}

