import { NextRequest, NextResponse } from "next/server";
import { generateProjectPlan } from "@/lib/aiTools";

export async function POST(request: NextRequest) {
  try {
    const { description, projectType } = await request.json();

    if (!description) {
      return NextResponse.json(
        { error: "Description required" },
        { status: 400 }
      );
    }

    const plan = await generateProjectPlan(description, projectType);

    return NextResponse.json({ plan });
  } catch (error) {
    console.error("Plan API error:", error);
    return NextResponse.json({
      plan: {
        suggestions: ["We'll work with you to design the perfect solution"],
        materials: ["Premium materials selected based on your preferences"],
        considerations: ["All projects require consultation and permits"],
        estimatedCost: "Contact us for a detailed estimate",
      },
    });
  }
}

