"use client";

import { ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn, getScoreColor } from "@/lib/utils";
import type { AlternativeIdea } from "@/types";

interface AlternativeIdeasProps {
  alternatives: AlternativeIdea[];
}

export function AlternativeIdeas({ alternatives }: AlternativeIdeasProps) {
  if (!alternatives.length) return null;

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {alternatives.map((alt) => (
        <div
          key={`${alt.title}-${alt.viabilityScore}`}
          className="p-5 shadow rounded-xl border flex flex-col gap-3"
        >
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-semibold leading-snug">{alt.title}</h4>
            <span
              className={cn(
                "text-lg font-bold tabular-nums shrink-0",
                getScoreColor(alt.viabilityScore),
              )}
            >
              {alt.viabilityScore}
            </span>
          </div>
          <Progress value={alt.viabilityScore} />
          <p className="text-xs text-muted-foreground leading-relaxed">
            {alt.description}
          </p>
          <div className="flex mt-auto items-start gap-1.5 text-xs text-indigo-700 bg-indigo-500/10 rounded-xl border p-3">
            <ArrowRight className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <p className="leading-relaxed">{alt.differentiator}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
