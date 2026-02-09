import { generateAIResponse, generateChatCompletion, type ChatMessage } from "./ai";
import { BRAND_CONFIG } from "./utils";
import { getChatSystemPrompt } from "./chatPrompt";

/**
 * AI Tools Library
 * Provides AI-powered functions for lead generation, estimation, and project planning
 * All functions gracefully degrade if OpenAI is not configured
 */

export interface ChatConversation {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

export interface ProjectDetails {
  projectType?: string;
  serviceId?: string;
  serviceName?: string;
  productInterest?: string;
  squareFootage?: string;
  materials?: string;
  timeline?: string;
  budget?: string;
  description?: string;
}

export interface EstimateResult {
  costRange: string;
  timeline: string;
  breakdown: string;
  confidence: "high" | "medium" | "low";
}

export interface LeadScore {
  score: "high" | "medium" | "low";
  reasoning: string;
}

const READY_FOR_QUOTE_TAG = "[READY_FOR_QUOTE]";

/**
 * Run the full sales + FAQ chat: one AI reply with full conversation history.
 * Strips [READY_FOR_QUOTE] from the reply and sets shouldCollectContact when the AI asks for contact info.
 */
export async function runSalesChat(
  conversation: ChatConversation[],
  context?: { currentPage?: string }
): Promise<{ reply: string; shouldCollectContact: boolean }> {
  const systemPrompt = getChatSystemPrompt(context);
  const messages: ChatMessage[] = [{ role: "system", content: systemPrompt }];

  for (const msg of conversation) {
    if (msg.role === "user") {
      messages.push({ role: "user", content: msg.content });
    } else {
      messages.push({ role: "assistant", content: msg.content });
    }
  }

  const { response } = await generateChatCompletion(messages, { max_tokens: 600, temperature: 0.7 });
  let reply = response.trim();
  const shouldCollectContact = reply.includes(READY_FOR_QUOTE_TAG);
  if (shouldCollectContact) {
    reply = reply.replace(READY_FOR_QUOTE_TAG, "").replace(/\n\n+$/, "").trim();
  }
  return { reply, shouldCollectContact };
}

/**
 * Extract structured project details from the conversation + last assistant reply.
 * Used to prefill quote form and send complete info to the owner by email.
 */
export async function extractProjectDetailsFromConversation(
  conversation: ChatConversation[],
  lastAssistantReply: string
): Promise<ProjectDetails> {
  const conversationText = conversation
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n");

  const systemPrompt = `You are a data extraction assistant for ${BRAND_CONFIG.name}. Extract structured project/quote details from the conversation. Return only valid JSON.`;

  const prompt = `From this conversation and the assistant's last message, extract any mentioned project details into this JSON. Use empty string or omit keys if not mentioned.

Conversation:
${conversationText}

Assistant's last message:
${lastAssistantReply}

Return a single JSON object with only these keys (use empty string if unknown):
{
  "projectType": "e.g. kitchen renovation, flooring, custom shower",
  "serviceId": "our service id if mentioned (flooring, showers, countertops, cabinets, carpentry, basements, garages, etc.)",
  "serviceName": "full service name if clear",
  "productInterest": "e.g. quartz countertops, LVP flooring, custom cabinets",
  "squareFootage": "if mentioned",
  "materials": "if mentioned",
  "timeline": "if mentioned",
  "budget": "if mentioned",
  "description": "brief 1-2 sentence summary of the project"
}`;

  const { response } = await generateAIResponse(prompt, systemPrompt);

  try {
    const cleaned = response.replace(/```json?\s*/g, "").replace(/```\s*$/g, "").trim();
    const parsed = JSON.parse(cleaned) as ProjectDetails;
    return {
      projectType: parsed.projectType || undefined,
      serviceId: parsed.serviceId || undefined,
      serviceName: parsed.serviceName || undefined,
      productInterest: parsed.productInterest || undefined,
      squareFootage: parsed.squareFootage || undefined,
      materials: parsed.materials || undefined,
      timeline: parsed.timeline || undefined,
      budget: parsed.budget || undefined,
      description: parsed.description || undefined,
    };
  } catch {
    return {};
  }
}

/**
 * AI Chatbot - Qualifies leads through conversation (legacy; used as fallback)
 */
export async function qualifyLeadThroughChat(
  conversation: ChatConversation[]
): Promise<{ qualified: boolean; projectDetails: ProjectDetails; nextQuestion?: string }> {
  const systemPrompt = `You are a helpful construction assistant for ${BRAND_CONFIG.name}.
  
  Your goal is to:
  1. Greet users warmly and ask about their project
  2. Ask follow-up questions about project type, size, timeline, and budget
  3. Qualify leads by understanding their needs
  4. Encourage them to provide contact information for follow-up
  
  Be friendly, professional, and ask one question at a time.`;

  const conversationText = conversation
    .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
    .join("\n");

  const prompt = `Based on this conversation, determine:
1. Is the user qualified (showing genuine interest)?
2. What project details have we gathered?
3. What should we ask next?

Conversation:
${conversationText}

Respond in JSON format:
{
  "qualified": true/false,
  "projectDetails": {
    "projectType": "...",
    "squareFootage": "...",
    "timeline": "...",
    "budget": "..."
  },
  "nextQuestion": "What should we ask next?"
}`;

  const { response } = await generateAIResponse(prompt, systemPrompt);

  try {
    const parsed = JSON.parse(response);
    return {
      qualified: parsed.qualified || false,
      projectDetails: parsed.projectDetails || {},
      nextQuestion: parsed.nextQuestion,
    };
  } catch {
    return {
      qualified: conversation.length >= 3,
      projectDetails: {},
      nextQuestion: "Would you like to provide your contact information so we can follow up?",
    };
  }
}

/**
 * AI Instant Quote Estimator
 */
export async function generateInstantEstimate(
  projectType: string,
  squareFootage: string,
  materials: string,
  timeline?: string
): Promise<EstimateResult> {
  const systemPrompt = `You are a construction cost estimator for ${BRAND_CONFIG.name} in Calgary, Alberta.
  
  Provide realistic cost estimates based on:
  - Project type
  - Square footage
  - Material selections
  - Local Calgary market rates
  
  Always provide a range (e.g., "$25K-$35K") and explain the breakdown.`;

  const prompt = `Estimate the cost for:
- Project Type: ${projectType}
- Square Footage: ${squareFootage}
- Materials: ${materials}
${timeline ? `- Timeline: ${timeline}` : ""}

Provide:
1. Cost range (e.g., "$22K-$35K")
2. Timeline estimate
3. Brief breakdown of costs
4. Confidence level (high/medium/low)

Respond in JSON:
{
  "costRange": "...",
  "timeline": "...",
  "breakdown": "...",
  "confidence": "high|medium|low"
}`;

  const { response } = await generateAIResponse(prompt, systemPrompt);

  try {
    const parsed = JSON.parse(response);
    return {
      costRange: parsed.costRange || "$15K-$50K",
      timeline: parsed.timeline || "4-8 weeks",
      breakdown: parsed.breakdown || "Estimate based on standard rates",
      confidence: parsed.confidence || "medium",
    };
  } catch {
    // Fallback estimate
    return {
      costRange: "$20K-$40K",
      timeline: "6-10 weeks",
      breakdown: "Based on average project costs for this type of work in Calgary",
      confidence: "medium",
    };
  }
}

/**
 * AI Project Planning Assistant
 */
export async function generateProjectPlan(
  description: string,
  projectType?: string
): Promise<{
  suggestions: string[];
  materials: string[];
  considerations: string[];
  estimatedCost: string;
}> {
  const systemPrompt = `You are a construction project planning expert for ${BRAND_CONFIG.name}.
  
  Analyze project descriptions and provide:
  - Layout suggestions
  - Material recommendations
  - Cost considerations
  - Timeline estimates`;

  const prompt = `Analyze this project description and provide planning recommendations:

${description}
${projectType ? `Project Type: ${projectType}` : ""}

Provide:
1. 3-5 layout/design suggestions
2. Recommended materials
3. Important considerations
4. Rough cost estimate

Respond in JSON:
{
  "suggestions": ["...", "..."],
  "materials": ["...", "..."],
  "considerations": ["...", "..."],
  "estimatedCost": "..."
}`;

  const { response } = await generateAIResponse(prompt, systemPrompt);

  try {
    const parsed = JSON.parse(response);
    return {
      suggestions: parsed.suggestions || ["Consult with our team for custom recommendations"],
      materials: parsed.materials || ["Standard construction materials"],
      considerations: parsed.considerations || ["Permits may be required"],
      estimatedCost: parsed.estimatedCost || "Contact for detailed estimate",
    };
  } catch {
    return {
      suggestions: ["We'll work with you to design the perfect solution"],
      materials: ["Premium materials selected based on your preferences"],
      considerations: ["All projects require consultation and permits"],
      estimatedCost: "Contact us for a detailed estimate",
    };
  }
}

/**
 * Lead Scoring
 */
export async function scoreLead(projectDetails: ProjectDetails, source: string): Promise<LeadScore> {
  const systemPrompt = `You are a lead scoring system for ${BRAND_CONFIG.name}.
  
  Score leads as high/medium/low based on:
  - Project type (commercial = higher)
  - Budget indicators
  - Timeline urgency
  - Source quality`;

  const prompt = `Score this lead:
- Project Type: ${projectDetails.projectType || "Unknown"}
- Budget: ${projectDetails.budget || "Unknown"}
- Timeline: ${projectDetails.timeline || "Unknown"}
- Source: ${source}

Respond in JSON:
{
  "score": "high|medium|low",
  "reasoning": "..."
}`;

  const { response } = await generateAIResponse(prompt, systemPrompt);

  try {
    const parsed = JSON.parse(response);
    return {
      score: parsed.score || "medium",
      reasoning: parsed.reasoning || "Standard lead",
    };
  } catch {
    // Simple heuristic fallback
    let score: "high" | "medium" | "low" = "medium";
    if (projectDetails.budget && projectDetails.budget.includes("$")) {
      score = "high";
    } else if (!projectDetails.projectType) {
      score = "low";
    }

    return {
      score,
      reasoning: "Scored based on available information",
    };
  }
}

/**
 * Generate personalized CTA based on user behavior
 */
export async function generatePersonalizedCTA(
  pagesVisited: string[],
  projectType?: string
): Promise<string> {
  if (projectType) {
    return `Ready to discuss your ${projectType} project?`;
  }

  // Analyze pages visited to infer interest
  const hasKitchen = pagesVisited.some((p) => p.includes("kitchen") || p.includes("services"));
  const hasBasement = pagesVisited.some((p) => p.includes("basement"));
  const hasBathroom = pagesVisited.some((p) => p.includes("bathroom"));

  if (hasKitchen) return "Ready to transform your kitchen?";
  if (hasBasement) return "Curious about finishing your basement?";
  if (hasBathroom) return "Ready to upgrade your bathroom?";

  return "Ready to start your project?";
}

