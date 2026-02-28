import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { analyzeIdea } from "@/lib/ai/llm-client";

const requestSchema = z.object({
  idea: z
    .string()
    .min(20, "Please describe your idea in at least 20 characters")
    .max(2000),
  targetMarket: z.string().max(200).optional(),
  category: z.string().max(100).optional(),
  budget: z.string().max(100).optional(),
  timeline: z.string().max(100).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid request",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error:
            "Gemini API key not configured. Please add GEMINI_API_KEY to your environment variables.",
        },
        { status: 503 },
      );
    }

    const report = await analyzeIdea(parsed.data);
    return NextResponse.json(report);
  } catch (error: unknown) {
    console.error("Analysis error:", error);
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
