import { notFound } from "next/navigation";
import { ReportDisplay } from "@/components/core/report-display";
import { getReportById } from "@/lib/db";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ResultPage({ params }: PageProps) {
  const { id } = await params;
  const report = await getReportById(id);

  if (!report) {
    notFound();
  }

  return <ReportDisplay report={report} />;
}
