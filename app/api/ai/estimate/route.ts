import { NextRequest, NextResponse } from "next/server";
import { generateInstantEstimate } from "@/lib/aiTools";

export async function POST(request: NextRequest) {
  try {
    const { projectType, squareFootage, materials, timeline } = await request.json();

    if (!projectType || !squareFootage || !materials) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const estimate = await generateInstantEstimate(
      projectType,
      squareFootage,
      materials,
      timeline
    );

    return NextResponse.json({ estimate });
  } catch (error) {
    console.error("Estimate API error:", error);
    // Return fallback estimate
    return NextResponse.json({
      estimate: {
        costRange: "$20K-$40K",
        timeline: "6-10 weeks",
        breakdown: "Based on average project costs. Contact us for a detailed quote.",
        confidence: "medium",
      },
    });
  }
}

