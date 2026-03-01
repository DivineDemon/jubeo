"use client";

import { CheckCircle2, ExternalLink, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Competitor } from "@/types";

interface CompetitorAnalysisProps {
  competitors: Competitor[];
}

export function CompetitorAnalysis({ competitors }: CompetitorAnalysisProps) {
  if (!competitors.length) {
    return (
      <p className="text-sm text-muted-foreground italic">
        No competitors identified.
      </p>
    );
  }

  return competitors.map((competitor) => (
    <div
      key={competitor.name}
      className="w-full min-w-0 p-4 sm:p-5 shadow rounded-xl border flex flex-col gap-4 sm:gap-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-3 min-w-0">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-semibold wrap-break-word">
              {competitor.name}
            </h4>
            {competitor.fundingStage && (
              <Badge variant="outline" className="shrink-0">
                {competitor.fundingStage}
              </Badge>
            )}
          </div>
          {competitor.url && (
            <a
              href={
                competitor.url.startsWith("http")
                  ? competitor.url
                  : `https://${competitor.url}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-0.5 break-all min-h-[44px] sm:min-h-0 py-2 sm:py-0 -my-1 sm:my-0 -mx-1 px-1 sm:mx-0 sm:px-0 rounded"
            >
              <span className="break-all">{competitor.url}</span>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          )}
        </div>
        <div className="text-left sm:text-right text-xs text-muted-foreground space-y-0.5 shrink-0">
          {competitor.estimatedUsers && (
            <p className="font-medium">{competitor.estimatedUsers}</p>
          )}
          {competitor.pricing && (
            <p className="wrap-break-word">{competitor.pricing}</p>
          )}
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed wrap-break-word">
        {competitor.description}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 min-w-0">
        <div className="p-3 sm:p-4 bg-emerald-500/10 rounded-xl min-w-0">
          <h5 className="text-sm font-semibold text-emerald-500 flex items-center gap-1.5 mb-2 sm:mb-3">
            <CheckCircle2 className="w-4 h-4 shrink-0" /> Strengths
          </h5>
          <ul className="space-y-1.5">
            {competitor.strengths.map((s) => (
              <li
                key={s}
                className="text-xs text-emerald-700 flex items-start gap-1.5 wrap-break-word"
              >
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-3 sm:p-4 bg-red-500/10 rounded-xl min-w-0">
          <h5 className="text-sm font-semibold text-red-500 flex items-center gap-1.5 mb-2 sm:mb-3">
            <XCircle className="w-4 h-4 shrink-0" /> Weaknesses
          </h5>
          <ul className="space-y-1.5">
            {competitor.weaknesses.map((w) => (
              <li
                key={w}
                className="text-xs text-red-700 flex items-start gap-1.5 wrap-break-word"
              >
                <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 shrink-0" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ));
}
