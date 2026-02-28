import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { analyzeIdea } from "@/lib/ai/llm-client";
import { prisma } from "@/lib/db";
import type { ValidationReport } from "@/types";

const RECENT_IDS_COOKIE = "jubeo_recent_result_ids";
const MAX_RECENT_IDS = 20;

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

function getRecentIds(cookieValue: string | undefined): string[] {
  if (!cookieValue) return [];
  try {
    const parsed = JSON.parse(cookieValue) as unknown;
    if (Array.isArray(parsed) && parsed.every((x) => typeof x === "string")) {
      return parsed;
    }
  } catch {
    // ignore
  }
  return [];
}

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
    const id = crypto.randomUUID();
    const reportWithId: ValidationReport = {
      ...report,
      id,
      createdAt: new Date().toISOString(),
    };

    await prisma.report.create({
      data: {
        id,
        report: JSON.stringify(reportWithId),
      },
    });

    const cookieStore = await cookies();
    const current = getRecentIds(cookieStore.get(RECENT_IDS_COOKIE)?.value);
    const nextIds = [id, ...current].slice(0, MAX_RECENT_IDS);
    const cookieValue = encodeURIComponent(JSON.stringify(nextIds));
    const setCookieHeader = `${RECENT_IDS_COOKIE}=${cookieValue}; Path=/; Max-Age=${60 * 60 * 24 * 365}; HttpOnly; SameSite=Lax`;

    return new NextResponse(JSON.stringify({ id }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": setCookieHeader,
      },
    });
  } catch (error: unknown) {
    console.error("Analysis error:", error);
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
