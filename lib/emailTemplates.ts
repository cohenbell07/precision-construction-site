import { BRAND_CONFIG } from "./utils";
import { ProjectDetails, EstimateResult } from "./aiTools";

/**
 * Email Templates Library
 * Reusable email templates for lead generation automation
 */

export interface EmailTemplateData {
  name?: string;
  email: string;
  projectType?: string;
  projectDetails?: ProjectDetails;
  estimate?: EstimateResult;
  conversationSummary?: string;
}

/**
 * Admin notification - New lead from chat
 */
export function getAdminChatLeadEmail(data: EmailTemplateData): { subject: string; html: string } {
  return {
    subject: `New AI Chat Lead: ${data.projectType || "General Inquiry"}`,
    html: `
      <h2>New Lead from AI Chatbot</h2>
      <p><strong>Name:</strong> ${data.name || "Not provided"}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Project Type:</strong> ${data.projectType || "Not specified"}</p>
      ${data.conversationSummary ? `<p><strong>Conversation Summary:</strong></p><p>${data.conversationSummary}</p>` : ""}
      ${data.projectDetails?.squareFootage ? `<p><strong>Square Footage:</strong> ${data.projectDetails.squareFootage}</p>` : ""}
      ${data.projectDetails?.budget ? `<p><strong>Budget:</strong> ${data.projectDetails.budget}</p>` : ""}
      ${data.projectDetails?.timeline ? `<p><strong>Timeline:</strong> ${data.projectDetails.timeline}</p>` : ""}
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
      <p>Hi ${data.name || "there"},</p>
      <p>We've received your inquiry about ${data.projectType || "your project"} and will get back to you within 24 hours.</p>
      ${data.conversationSummary ? `<p><strong>Project Summary:</strong></p><p>${data.conversationSummary}</p>` : ""}
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
      <p><strong>Name:</strong> ${data.name || "Not provided"}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Project Type:</strong> ${data.projectType || "Not specified"}</p>
      ${data.estimate ? `
        <p><strong>Estimated Cost Range:</strong> ${data.estimate.costRange}</p>
        <p><strong>Estimated Timeline:</strong> ${data.estimate.timeline}</p>
        <p><strong>Breakdown:</strong> ${data.estimate.breakdown}</p>
      ` : ""}
      ${data.projectDetails?.squareFootage ? `<p><strong>Square Footage:</strong> ${data.projectDetails.squareFootage}</p>` : ""}
      ${data.projectDetails?.materials ? `<p><strong>Materials:</strong> ${data.projectDetails.materials}</p>` : ""}
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
      <p>Hi ${data.name || "there"},</p>
      <p>Thank you for using our instant estimate tool for your ${data.projectType || "project"}.</p>
      ${data.estimate ? `
        <h3>Preliminary Estimate</h3>
        <p><strong>Cost Range:</strong> ${data.estimate.costRange}</p>
        <p><strong>Timeline:</strong> ${data.estimate.timeline}</p>
        <p><strong>Breakdown:</strong></p>
        <p>${data.estimate.breakdown}</p>
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

