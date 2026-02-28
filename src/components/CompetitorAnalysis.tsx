"use client";

import { Competitor } from "@/types";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ExternalLink, CheckCircle2, XCircle } from "lucide-react";

interface CompetitorAnalysisProps {
  competitors: Competitor[];
}

export function CompetitorAnalysis({ competitors }: CompetitorAnalysisProps) {
  if (!competitors.length) {
    return (
      <p className="text-sm text-slate-500 italic">No competitors identified.</p>
    );
  }

  return (
    <div className="space-y-4">
      {competitors.map((competitor) => (
        <Card key={competitor.name} className="border border-slate-200">
          <CardContent className="pt-5 pb-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-base font-semibold text-slate-800">{competitor.name}</h4>
                  {competitor.fundingStage && (
                    <Badge variant="purple">{competitor.fundingStage}</Badge>
                  )}
                </div>
                {competitor.url && (
                  <a
                    href={competitor.url.startsWith("http") ? competitor.url : `https://${competitor.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 mt-0.5"
                  >
                    {competitor.url}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <div className="text-right text-xs text-slate-500 space-y-0.5">
                {competitor.estimatedUsers && (
                  <p className="font-medium text-slate-700">{competitor.estimatedUsers}</p>
                )}
                {competitor.pricing && (
                  <p>{competitor.pricing}</p>
                )}
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-4 leading-relaxed">{competitor.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Strengths
                </p>
                <ul className="space-y-1">
                  {competitor.strengths.map((s, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                      <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-red-700 flex items-center gap-1 mb-2">
                  <XCircle className="w-3.5 h-3.5" /> Weaknesses
                </p>
                <ul className="space-y-1">
                  {competitor.weaknesses.map((w, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                      <span className="mt-1 w-1 h-1 rounded-full bg-red-400 shrink-0" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
