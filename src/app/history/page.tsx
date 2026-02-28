import { FileText } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { getReportsByIds } from "@/lib/db";
import { getRecentIds, RECENT_IDS_COOKIE } from "@/lib/recent-ids";
import { formatDate } from "@/lib/utils";
import type { ValidationReport } from "@/types";

export default async function HistoryPage() {
  const cookieStore = await cookies();
  const ids = getRecentIds(cookieStore.get(RECENT_IDS_COOKIE)?.value);
  const reports = await getReportsByIds(ids);

  return (
    <MaxWidthWrapper parentBorder="border-b">
      <div className="w-full h-[calc(100vh-134px)] flex flex-col items-start justify-start p-5 gap-5 overflow-y-auto">
        <h1 className="w-full text-left text-xl font-bold text-foreground">
          Analysis History
        </h1>
        {reports.length === 0 ? (
          <p className="text-muted-foreground">No analysis history yet.</p>
        ) : (
          reports.map((report: ValidationReport) => (
            <Link
              key={report.id}
              href={`/results/${report.id}`}
              className="flex items-start justify-start gap-5 p-5 rounded-lg border hover:bg-muted/50 transition-colors text-left"
            >
              <FileText className="size-5 mt-1 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground line-clamp-1">
                  {report.ideaSummary}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {formatDate(report.createdAt)} · {report.verdict}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </MaxWidthWrapper>
  );
}
