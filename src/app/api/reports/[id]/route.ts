import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import type { ValidationReport } from "@/types";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const row = await prisma.report.findUnique({
    where: { id },
  });

  if (!row || typeof row.report !== "string") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const report = JSON.parse(row.report) as ValidationReport;
    return NextResponse.json(report);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
