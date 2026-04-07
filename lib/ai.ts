import Anthropic from "@anthropic-ai/sdk";
import { env } from "./env";

const anthropic = env.anthropic.enabled
  ? new Anthropic({ apiKey: env.anthropic.apiKey! })
  : null;

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

/**
 * Multi-turn chat completion with full conversation history.
 * Uses Claude claude-sonnet-4-20250514 for fast, high-quality responses.
 */
export async function generateChatCompletion(
  messages: ChatMessage[],
  options?: { max_tokens?: number; temperature?: number }
): Promise<{ response: string; error?: string }> {
  if (!env.anthropic.enabled || !anthropic) {
    return {
      response: "AI features are not currently configured. Please contact us directly for assistance.",
      error: "Anthropic not configured",
    };
  }

  try {
    // Separate system message from conversation messages
    const systemMessage = messages.find((m) => m.role === "system")?.content || "";
    const conversationMessages = messages
      .filter((m) => m.role !== "system")
      .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: options?.max_tokens ?? 700,
      temperature: options?.temperature ?? 0.7,
      system: systemMessage,
      messages: conversationMessages,
    });

    const text =
      response.content[0]?.type === "text"
        ? response.content[0].text.trim()
        : "I'm sorry, I couldn't generate a response.";

    return { response: text };
  } catch (error) {
    console.error("Claude chat error:", error);
    return {
      response: "I'm having trouble right now. Please contact us directly — we'd love to help.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Single-turn AI response with optional system prompt.
 * Used for data extraction, lead scoring, estimates, etc.
 */
export async function generateAIResponse(
  prompt: string,
  systemPrompt?: string
): Promise<{ response: string; error?: string }> {
  if (!env.anthropic.enabled || !anthropic) {
    return {
      response: "AI features are not currently configured. Please contact us directly for assistance.",
      error: "Anthropic not configured",
    };
  }

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 600,
      temperature: 0.7,
      ...(systemPrompt ? { system: systemPrompt } : {}),
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      response.content[0]?.type === "text"
        ? response.content[0].text
        : "I'm sorry, I couldn't generate a response.";

    return { response: text };
  } catch (error) {
    console.error("Claude error:", error);
    return {
      response: "I'm having trouble processing your request. Please contact us directly.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
