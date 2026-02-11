import { NextRequest, NextResponse } from "next/server";
import {
  runSalesChat,
  extractProjectDetailsFromConversation,
  type ChatConversation,
} from "@/lib/aiTools";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { conversation, currentPage } = body;

    if (!Array.isArray(conversation)) {
      return NextResponse.json(
        { error: "Invalid conversation format" },
        { status: 400 }
      );
    }

    const conv = conversation as ChatConversation[];
    const { reply, shouldCollectContact } = await runSalesChat(conv, {
      currentPage: typeof currentPage === "string" ? currentPage : undefined,
    });

    const projectDetails = await extractProjectDetailsFromConversation(conv, reply);

    return NextResponse.json({
      response: reply,
      projectDetails,
      shouldCollectContact,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        error: "Chat service temporarily unavailable",
        response:
          "I'm having trouble right now. Please contact us directly—we'd love to help.",
        shouldCollectContact: false,
        projectDetails: {},
      },
      { status: 500 }
    );
  }
}
