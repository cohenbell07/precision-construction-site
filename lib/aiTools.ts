import { generateAIResponse } from "./ai";
import { BRAND_CONFIG } from "./utils";

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

/**
 * AI Chatbot - Qualifies leads through conversation
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
    // Try to parse JSON response
    const parsed = JSON.parse(response);
    return {
      qualified: parsed.qualified || false,
      projectDetails: parsed.projectDetails || {},
      nextQuestion: parsed.nextQuestion,
    };
  } catch {
    // Fallback if AI doesn't return JSON
    return {
      qualified: conversation.length >= 3, // Simple heuristic
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

