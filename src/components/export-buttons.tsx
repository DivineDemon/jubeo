"use client";

import { CheckCheck, Copy, Download, FileText } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { generateMarkdownReport } from "@/lib/report/markdown-generator";
import type { ValidationReport } from "@/types";

interface ExportButtonsProps {
  report: ValidationReport;
}

export function ExportButtons({ report }: ExportButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  function downloadMarkdown() {
    const md = generateMarkdownReport(report);
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `idea-validation-${report.id}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  async function copyMarkdown() {
    const md = generateMarkdownReport(report);
    await navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function downloadPdf() {
    setPdfLoading(true);
    try {
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import("jspdf"),
        import("html2canvas"),
      ]);

      const reportEl = document.getElementById("report-content");
      if (!reportEl) return;

      const canvas = await html2canvas(reportEl, {
        scale: 1.5,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = pdfWidth / imgWidth;
      const scaledHeight = imgHeight * ratio;

      let position = 0;
      let remaining = scaledHeight;

      while (remaining > 0) {
        pdf.addImage(imgData, "PNG", 0, position * -1, pdfWidth, scaledHeight);
        remaining -= pdfHeight;
        if (remaining > 0) {
          position += pdfHeight;
          pdf.addPage();
        }
      }

      pdf.save(`idea-validation-${report.id}.pdf`);
    } finally {
      setPdfLoading(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onClick={downloadMarkdown}>
        <FileText className="w-4 h-4" />
        Download .md
      </Button>
      <Button
        variant="outline"
        size="sm"
        loading={pdfLoading}
        onClick={downloadPdf}
      >
        <Download className="w-4 h-4" />
        Download PDF
      </Button>
      <Button variant="outline" size="sm" onClick={copyMarkdown}>
        {copied ? (
          <CheckCheck className="w-4 h-4 text-emerald-600" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
        {copied ? "Copied!" : "Copy Markdown"}
      </Button>
    </div>
  );
}
