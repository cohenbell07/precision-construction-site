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

function getDealQuoteLabels(data: DealQuoteData): { discount: string; label: string; projectDetailsLabel: string } {
  if (data.dealType === "bundle") return { discount: "15%", label: "15% Bundle Savings", projectDetailsLabel: "Project / service details:" };
  if (data.dealType === "basement") return { discount: "15%", label: "15% Basement Renovation", projectDetailsLabel: "Project / service details:" };
  return { discount: "10%", label: "10% Supplier Discount", projectDetailsLabel: "Quantity / how much needed:" };
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

