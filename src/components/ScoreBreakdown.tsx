"use client";

import { ScoreMetric } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { getScoreColor, getScoreBgColor, getScoreBorderColor } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import {
  TrendingUp,
  Swords,
  Clock,
  Cpu,
  DollarSign,
  Sparkles,
} from "lucide-react";

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
    <div className="space-y-4">
      {metrics.map((metric) => (
        <Card key={metric.name} className={cn("border", getScoreBorderColor(metric.score))}>
          <CardContent className="pt-5 pb-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={cn("p-1.5 rounded-lg", getScoreBorderColor(metric.score))}>
                  {METRIC_ICONS[metric.name] ?? <TrendingUp className="w-4 h-4" />}
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">{metric.name}</h4>
                  <p className="text-xs text-slate-500">Weight: {metric.weight}%</p>
                </div>
              </div>
              <div className="text-right">
                <span className={cn("text-2xl font-bold tabular-nums", getScoreColor(metric.score))}>
                  {metric.score}
                </span>
                <span className="text-sm text-slate-400">/100</span>
              </div>
            </div>

            <Progress
              value={metric.score}
              barClassName={getScoreBgColor(metric.score)}
              className="mb-3"
              size="md"
            />

            <p className="text-sm text-slate-600 leading-relaxed mb-3">{metric.rationale}</p>

            <ul className="space-y-1">
              {metric.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
                  <span className="mt-0.5 w-1 h-1 rounded-full bg-slate-400 shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
