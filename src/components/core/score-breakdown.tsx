"use client";

import {
  Clock,
  Cpu,
  DollarSign,
  Sparkles,
  Swords,
  TrendingUp,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn, getScoreBorderColor, getScoreColor } from "@/lib/utils";
import type { ScoreMetric } from "@/types";

const METRIC_ICONS: Record<string, React.ReactNode> = {
  "Market Size": <TrendingUp className="w-4 h-4" />,
  "Competition Level": <Swords className="w-4 h-4" />,
  "Market Timing": <Clock className="w-4 h-4" />,
  "Technical Feasibility": <Cpu className="w-4 h-4" />,
  "Monetization Potential": <DollarSign className="w-4 h-4" />,
  Uniqueness: <Sparkles className="w-4 h-4" />,
};

interface ScoreBreakdownProps {
  metrics: ScoreMetric[];
}

export function ScoreBreakdown({ metrics }: ScoreBreakdownProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center p-5 gap-5">
      {metrics.map((metric) => (
        <div
          key={metric.name}
          className="w-full flex flex-col items-center justify-center rounded-xl border shadow p-5 gap-5"
        >
          <div className="w-full flex items-center justify-center">
            <div className="flex-1 flex items-center justify-start gap-2.5">
              <span
                className={cn(
                  "p-2 rounded-lg",
                  getScoreBorderColor(metric.score),
                )}
              >
                {METRIC_ICONS[metric.name] ?? (
                  <TrendingUp className="w-4 h-4" />
                )}
              </span>
              <div className="flex flex-col items-center justify-center">
                <h4 className="text-sm font-semibold w-full text-left">
                  {metric.name}
                </h4>
                <p className="text-xs text-muted-foreground w-full text-left">
                  Weight: {metric.weight}%
                </p>
              </div>
            </div>
            <div className="text-right">
              <span
                className={cn(
                  "text-2xl font-bold tabular-nums",
                  getScoreColor(metric.score),
                )}
              >
                {metric.score}
              </span>
              <span className="text-sm">/100</span>
            </div>
          </div>
          <Progress value={metric.score} />
          <p className="w-full text-left text-sm text-muted-foreground leading-relaxed">
            {metric.rationale}
          </p>
          <ul className="w-full flex flex-col items-start justify-start text-muted-foreground">
            {metric.details.map((detail) => (
              <li key={detail} className="text-xs">
                •&nbsp;&nbsp;&nbsp;{detail}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
