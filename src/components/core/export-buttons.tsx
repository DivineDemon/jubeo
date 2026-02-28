"use client";

import { Download, FileText } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { generateMarkdownReport } from "@/lib/report/markdown-generator";
import type { ValidationReport } from "@/types";

interface ExportButtonsProps {
  report: ValidationReport;
}

export function ExportButtons({ report }: ExportButtonsProps) {
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

  async function downloadPdf() {
    setPdfLoading(true);
    try {
      const [{ default: jsPDF }, { default: html2canvas }, { marked }] =
        await Promise.all([
          import("jspdf"),
          import("html2canvas"),
          import("marked"),
        ]);

      const md = generateMarkdownReport(report);
      const html = await marked.parse(md);

      const container = document.createElement("div");
      container.style.cssText = [
        "position:absolute;left:-9999px;top:0;",
        "width:600px;padding:24px;background:#fff;",
        "font-family:system-ui,-apple-system,sans-serif;font-size:14px;line-height:1.5;color:#1e293b;",
      ].join(" ");
      container.innerHTML = [
        "<style>",
        "h1{font-size:1.5rem;margin:0 0 0.75rem;}",
        "h2{font-size:1.2rem;margin:1rem 0 0.5rem;border-bottom:1px solid #e2e8f0;}",
        "h3{font-size:1rem;margin:0.75rem 0 0.25rem;}",
        "table{border-collapse:collapse;width:100%;margin:0.5rem 0;}",
        "th,td{border:1px solid #e2e8f0;padding:6px 10px;text-align:left;}",
        "th{background:#f8fafc;}",
        "ul,ol{margin:0.5rem 0;padding-left:1.5rem;}",
        "blockquote{border-left:4px solid #e2e8f0;margin:0.5rem 0;padding-left:1rem;color:#64748b;}",
        "hr{margin:1rem 0;border:none;border-top:1px solid #e2e8f0;}",
        "</style>",
        html,
      ].join("");

      document.body.appendChild(container);

      const canvas = await html2canvas(container, {
        scale: 1.5,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      document.body.removeChild(container);

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
        disabled={pdfLoading}
        onClick={downloadPdf}
      >
        <Download className="w-4 h-4" />
        Download PDF
      </Button>
    </div>
  );
}
