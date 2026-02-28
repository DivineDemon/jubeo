"use client";

import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn, getScoreBgColor, getScoreColor } from "@/lib/utils";
import type { AlternativeIdea } from "@/types";

interface AlternativeIdeasProps {
  alternatives: AlternativeIdea[];
}

export function AlternativeIdeas({ alternatives }: AlternativeIdeasProps) {
  if (!alternatives.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {alternatives.map((alt) => (
        <Card
          key={`${alt.title}-${alt.viabilityScore}`}
          className="border border-slate-200 hover:border-indigo-200 transition-colors"
        >
          <CardContent className="pt-5 pb-5 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-sm font-semibold text-slate-800 leading-snug">
                {alt.title}
              </h4>
              <span
                className={cn(
                  "text-lg font-bold tabular-nums shrink-0",
                  getScoreColor(alt.viabilityScore),
                )}
              >
                {alt.viabilityScore}
              </span>
            </div>

            <Progress
              value={alt.viabilityScore}
              className={cn(getScoreBgColor(alt.viabilityScore))}
            />

            <p className="text-xs text-slate-600 leading-relaxed">
              {alt.description}
            </p>

            <div className="flex items-start gap-1.5 text-xs text-indigo-700 bg-indigo-50 rounded-lg p-2.5">
              <ArrowRight className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <p className="leading-relaxed">{alt.differentiator}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
