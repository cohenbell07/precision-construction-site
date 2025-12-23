import { NextRequest, NextResponse } from "next/server";
import { generateBlogPost } from "@/lib/ai";
import { BRAND_CONFIG } from "@/lib/utils";
import fs from "fs";
import path from "path";

// Simple admin check - in production, use proper authentication
const ADMIN_KEY = process.env.ADMIN_KEY || "change-me-in-production";

export async function POST(request: NextRequest) {
  try {
    // Check admin key
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${ADMIN_KEY}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { topic, category } = await request.json();

    if (!topic || !category) {
      return NextResponse.json(
        { error: "Topic and category are required" },
        { status: 400 }
      );
    }

    // Generate blog post
    const { title, content, error } = await generateBlogPost(topic, category);

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    // Create blog directory if it doesn't exist
    const blogDir = path.join(process.cwd(), "content/blog");
    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir, { recursive: true });
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Create markdown file
    const frontmatter = `---
title: "${title}"
description: "AI-generated blog post about ${topic}"
date: "${new Date().toISOString()}"
category: "${category}"
author: "${BRAND_CONFIG.shortName}"
---

${content}
`;

    const filePath = path.join(blogDir, `${slug}.md`);
    fs.writeFileSync(filePath, frontmatter);

    return NextResponse.json({
      success: true,
      slug,
      title,
      message: "Blog post generated successfully",
    });
  } catch (error) {
    console.error("Error generating blog post:", error);
    return NextResponse.json(
      { error: "Failed to generate blog post" },
      { status: 500 }
    );
  }
}

