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
      className="w-full p-5 shadow rounded-xl border flex flex-col gap-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-semibold">{competitor.name}</h4>
            {competitor.fundingStage && (
              <Badge variant="outline">{competitor.fundingStage}</Badge>
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
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-0.5"
            >
              {competitor.url}
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
        <div className="text-right text-xs text-muted-foreground space-y-0.5">
          {competitor.estimatedUsers && (
            <p className="font-medium">{competitor.estimatedUsers}</p>
          )}
          {competitor.pricing && <p>{competitor.pricing}</p>}
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {competitor.description}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="p-4 bg-emerald-500/10 rounded-xl">
          <h5 className="text-sm font-semibold text-emerald-500 flex items-center gap-1.5 mb-3">
            <CheckCircle2 className="w-4 h-4" /> Strengths
          </h5>
          <ul className="space-y-1.5">
            {competitor.strengths.map((s) => (
              <li
                key={s}
                className="text-xs text-emerald-700 flex items-start gap-1.5"
              >
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 bg-red-500/10 rounded-xl">
          <h5 className="text-sm font-semibold text-red-500 flex items-center gap-1.5 mb-3">
            <XCircle className="w-4 h-4" /> Weaknesses
          </h5>
          <ul className="space-y-1.5">
            {competitor.weaknesses.map((w) => (
              <li
                key={w}
                className="text-xs text-red-700 flex items-start gap-1.5"
              >
                <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 shrink-0" />
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ));
}
