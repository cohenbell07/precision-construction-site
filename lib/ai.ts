import OpenAI from "openai";
import { env } from "./env";

const openai = env.openai.enabled ? new OpenAI({ apiKey: env.openai.apiKey! }) : null;

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

/**
 * Multi-turn chat completion with full conversation history.
 * Used for the sales/FAQ chat that needs context.
 */
export async function generateChatCompletion(
  messages: ChatMessage[],
  options?: { max_tokens?: number; temperature?: number }
): Promise<{ response: string; error?: string }> {
  if (!env.openai.enabled || !openai) {
    return {
      response: "AI features are not currently configured. Please contact us directly for assistance.",
      error: "OpenAI not configured",
    };
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
      temperature: options?.temperature ?? 0.7,
      max_tokens: options?.max_tokens ?? 600,
    });

    const response = completion.choices[0]?.message?.content?.trim() || "I'm sorry, I couldn't generate a response.";
    return { response };
  } catch (error) {
    console.error("OpenAI chat error:", error);
    return {
      response: "I'm having trouble right now. Please contact us directly—we'd love to help.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function generateAIResponse(
  prompt: string,
  systemPrompt?: string
): Promise<{ response: string; error?: string }> {
  if (!env.openai.enabled || !openai) {
    return {
      response: "AI features are not currently configured. Please contact us directly for assistance.",
      error: "OpenAI not configured",
    };
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        ...(systemPrompt ? [{ role: "system" as const, content: systemPrompt }] : []),
        { role: "user" as const, content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
    return { response };
  } catch (error) {
    console.error("OpenAI error:", error);
    return {
      response: "I'm having trouble processing your request. Please contact us directly.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
