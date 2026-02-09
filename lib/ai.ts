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

export async function generateBlogPost(
  topic: string,
  category: string
): Promise<{ content: string; title: string; error?: string }> {
  if (!env.openai.enabled || !openai) {
    return {
      title: topic,
      content: `# ${topic}\n\nThis is a placeholder blog post. AI features are not configured.`,
      error: "OpenAI not configured",
    };
  }

  try {
    const prompt = `Write a professional, informative blog post about "${topic}" in the category "${category}" for a construction company. 
    The post should be 800-1000 words, well-structured with headings, and provide valuable information to homeowners and business owners.
    Format the response as markdown with proper headings, paragraphs, and lists.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content:
            "You are a professional content writer specializing in construction and home improvement topics. Write engaging, informative content.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 2000,
    });

    const content = completion.choices[0]?.message?.content || "";
    const title = topic;

    return { title, content };
  } catch (error) {
    console.error("OpenAI blog generation error:", error);
    return {
      title: topic,
      content: `# ${topic}\n\nError generating content. Please try again.`,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

