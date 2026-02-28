"use client";

import { AlertTriangle, ArrowRight, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TABS } from "@/lib/constants";
import { cn, formatDate, getScoreColor, getVerdictColor } from "@/lib/utils";
import type { ValidationReport } from "@/types";
import MaxWidthWrapper from "../ui/max-width-wrapper";
import { Progress } from "../ui/progress";
import { AlternativeIdeas } from "./alternative-ideas";
import { CompetitorAnalysis } from "./competitor-analysis";
import { ExportButtons } from "./export-buttons";
import { ImprovementSuggestions } from "./improvement-suggestions";
import { ScoreBreakdown } from "./score-breakdown";

interface ReportDisplayProps {
  report: ValidationReport;
}

function VerdictBadge({ verdict }: { verdict: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border",
        getVerdictColor(verdict),
      )}
    >
      {verdict}
    </span>
  );
}

export function ReportDisplay({ report }: ReportDisplayProps) {
  const _router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("overview");

  return (
    <div className="w-full h-[calc(100vh-134px)] flex flex-col items-start justify-start overflow-y-auto">
      <MaxWidthWrapper parentBorder="border-b">
        <div className="w-full flex items-center justify-center p-5">
          <div className="flex-1 flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold w-full text-left">
              Validation Report
            </h2>
            <p className="text-sm w-full text-left text-muted-foreground">
              {formatDate(report.createdAt)}
            </p>
          </div>
          <ExportButtons report={report} />
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper parentBorder="border-b">
        <div className="w-full flex flex-col items-center justify-center p-5 gap-5">
          <div className="relative w-24 h-24">
            <svg
              className="w-24 h-24 -rotate-90"
              viewBox="0 0 96 96"
              role="img"
              aria-label="Overall score"
            >
              <title>Overall score</title>
              <circle
                cx="48"
                cy="48"
                r="42"
                fill="none"
                strokeWidth="8"
                stroke="rgba(255,255,255,0.2)"
              />
              <circle
                cx="48"
                cy="48"
                r="42"
                fill="none"
                strokeWidth="8"
                strokeLinecap="round"
                stroke="var(--primary)"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - report.overallScore / 100)}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-extrabold">
                {report.overallScore}
              </span>
              <span className="text-indigo-200 text-xs">/100</span>
            </div>
          </div>
          <VerdictBadge verdict={report.verdict} />
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper parentBorder="border-b">
        <div className="w-full flex flex-col items-center justify-center p-5 gap-2.5">
          <p className="text-primary text-xs font-medium uppercase tracking-widest w-full text-left">
            App Idea Validated
          </p>
          <h3 className="text-xl font-bold leading-snug w-full text-left">
            {report.ideaSummary}
          </h3>
          <p className="w-full text-left text-sm leading-relaxed line-clamp-3">
            {report.originalIdea}
          </p>
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper parentBorder="border-b">
        <div className="w-full grid grid-cols-6 items-center justify-center">
          {TABS.map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center justify-center gap-2 py-4 text-xs font-medium hover:text-primary border-b-2 transition-colors whitespace-nowrap",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent",
              )}
            >
              <tab.icon className="size-3.5 shrink-0 text-primary" />
              {tab.label}
            </button>
          ))}
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper parentBorder="border-b" showPlusIcons={false}>
        <div className="w-full flex flex-col items-center justify-center">
          {activeTab === "overview" && (
            <>
              <h4 className="text-sm font-semibold w-full text-left p-5 border-b">
                Executive Summary
              </h4>
              <div className="text-sm leading-relaxed space-y-3 w-full text-left p-5 border-b">
                {report.executiveSummary.split("\n\n").map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
              </div>
              <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-5 p-5 border-b">
                {report.metrics.map((metric) => (
                  <div
                    key={metric.name}
                    className="p-4 shadow rounded-xl border"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-medium text-muted-foreground">
                        {metric.name}
                      </p>
                      <span
                        className={cn(
                          "text-base font-bold tabular-nums",
                          getScoreColor(metric.score),
                        )}
                      >
                        {metric.score}
                      </span>
                    </div>
                    <Progress value={metric.score} />
                  </div>
                ))}
              </div>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 border-b">
                <div className="p-4 bg-red-500/10 rounded-xl">
                  <h5 className="text-sm font-semibold text-red-500 flex items-center gap-1.5 mb-3">
                    <AlertTriangle className="w-4 h-4" /> Key Risks
                  </h5>
                  <ul className="space-y-1.5">
                    {report.riskFactors.map((risk) => (
                      <li
                        key={risk}
                        className="text-xs text-red-700 flex items-start gap-1.5"
                      >
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 shrink-0" />
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-emerald-500/10 rounded-xl">
                  <h5 className="text-sm font-semibold text-emerald-500 flex items-center gap-1.5 mb-3">
                    <CheckCircle className="w-4 h-4" /> Success Factors
                  </h5>
                  <ul className="space-y-1.5">
                    {report.successFactors.map((factor) => (
                      <li
                        key={factor}
                        className="text-xs text-emerald-700 flex items-start gap-1.5"
                      >
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="w-full p-5 flex items-center justify-center">
                <div className="w-full p-5 bg-indigo-500/10 rounded-xl">
                  <h5 className="text-sm font-semibold text-indigo-500 flex items-center gap-1.5 mb-3">
                    <ArrowRight className="w-4 h-4" /> Recommended Next Steps
                  </h5>
                  <ol className="space-y-2">
                    {report.nextSteps.map((step, i) => (
                      <li
                        key={step}
                        className="text-xs text-indigo-700 flex items-start gap-2"
                      >
                        <span className="shrink-0 w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-[10px]">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </>
          )}
          {activeTab === "metrics" && (
            <ScoreBreakdown metrics={report.metrics} />
          )}
          {activeTab === "market" && (
            <>
              <h4 className="text-sm font-semibold w-full text-left p-5 border-b">
                Market Size
              </h4>
              <div className="w-full grid grid-cols-2 gap-5 p-5 border-b">
                {[
                  {
                    label: "Total Addressable Market",
                    value: report.marketInsights.tamEstimate,
                  },
                  {
                    label: "Serviceable Addressable",
                    value: report.marketInsights.samEstimate,
                  },
                  {
                    label: "Obtainable Market",
                    value: report.marketInsights.somEstimate,
                  },
                  {
                    label: "Growth Rate",
                    value: report.marketInsights.growthRate,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-4 shadow rounded-xl border text-center"
                  >
                    <p className="w-full text-left text-xs text-muted-foreground mb-1">
                      {item.label}
                    </p>
                    <p className="w-full text-left text-sm font-bold">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <h4 className="text-sm font-semibold w-full text-left p-5 border-b">
                Key Market Trends
              </h4>
              <div className="w-full p-5 border-b">
                <ul className="space-y-2">
                  {report.marketInsights.keyTrends.map((trend, i) => (
                    <li
                      key={trend}
                      className="text-sm text-muted-foreground flex items-start gap-2 p-3 bg-indigo-500/10 rounded-xl border"
                    >
                      <span className="mt-0.5 text-primary font-bold text-xs shrink-0">
                        {i + 1}.
                      </span>
                      {trend}
                    </li>
                  ))}
                </ul>
              </div>

              <h4 className="text-sm font-semibold w-full text-left p-5 border-b">
                Target Demographics
              </h4>
              <div className="w-full p-5 flex items-center justify-center">
                <ul className="w-full space-y-2">
                  {report.marketInsights.targetDemographics.map((demo) => (
                    <li
                      key={demo}
                      className="text-sm text-muted-foreground flex items-start gap-2 p-3 bg-indigo-500/10 rounded-xl border"
                    >
                      <span className="mt-0.5 text-primary">👤</span>
                      {demo}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
          {activeTab === "competitors" && (
            <>
              <h4 className="text-sm font-semibold text-left p-5 w-full border-b">
                Competitors
              </h4>
              <div className="w-full p-5 flex flex-col items-center justify-center gap-5">
                <CompetitorAnalysis competitors={report.competitors} />
              </div>
            </>
          )}
          {activeTab === "improvements" && (
            <>
              <h4 className="w-full text-left border-b text-sm font-semibold p-5">
                Improvement Suggestions
              </h4>
              <div className="w-full p-5 flex flex-col items-center justify-center gap-5">
                <ImprovementSuggestions improvements={report.improvements} />
              </div>
            </>
          )}

          {activeTab === "alternatives" && (
            <>
              <h4 className="text-sm font-semibold w-full text-left p-5 border-b">
                Alternative Ideas
              </h4>

              <div className="w-full p-5 flex flex-col items-center justify-center gap-5">
                <p className="text-sm leading-relaxed text-muted-foreground w-full text-left">
                  Consider these related ideas that might have better market fit
                  or fewer competitive barriers.
                </p>
                <AlternativeIdeas alternatives={report.alternativeIdeas} />
              </div>
            </>
          )}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
