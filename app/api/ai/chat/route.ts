import { NextRequest, NextResponse } from "next/server";
import { qualifyLeadThroughChat } from "@/lib/aiTools";
import type { ChatConversation } from "@/lib/aiTools";

export async function POST(request: NextRequest) {
  try {
    const { conversation } = await request.json();

    if (!Array.isArray(conversation)) {
      return NextResponse.json(
        { error: "Invalid conversation format" },
        { status: 400 }
      );
    }

    // Qualify lead and get next question
    const result = await qualifyLeadThroughChat(conversation as ChatConversation[]);

    // Determine if we should collect contact info
    const shouldCollectContact =
      result.qualified &&
      conversation.length >= 4 &&
      (result.projectDetails.projectType || result.projectDetails.budget);

    return NextResponse.json({
      response: result.nextQuestion || "How can I help you with your project?",
      projectDetails: result.projectDetails,
      shouldCollectContact,
      qualified: result.qualified,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({
      response: "Thanks for your interest! Would you like to provide your contact information so we can follow up?",
      shouldCollectContact: true,
      projectDetails: {},
      qualified: false,
    });
  }
}

