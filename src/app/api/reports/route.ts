import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getReportsByIds } from "@/lib/db";
import { getRecentIds, RECENT_IDS_COOKIE } from "@/lib/recent-ids";

export async function GET() {
  const cookieStore = await cookies();
  const ids = getRecentIds(cookieStore.get(RECENT_IDS_COOKIE)?.value);
  const reports = await getReportsByIds(ids);
  return NextResponse.json({ reports });
}
