"use client";

import { useState } from "react";
import { ValidationReport } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { ScoreBreakdown } from "@/components/ScoreBreakdown";
import { CompetitorAnalysis } from "@/components/CompetitorAnalysis";
import { ImprovementSuggestions } from "@/components/ImprovementSuggestions";
import { AlternativeIdeas } from "@/components/AlternativeIdeas";
import { ExportButtons } from "@/components/ExportButtons";
import {
  getScoreColor,
  getScoreBgColor,
  getVerdictColor,
  formatDate,
} from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import {
  BarChart3,
  Users,
  TrendingUp,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  RefreshCw,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ReportDisplayProps {
  report: ValidationReport;
  onReset: () => void;
}

type TabId = "overview" | "metrics" | "market" | "competitors" | "improvements" | "alternatives";

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const TABS: Tab[] = [
  { id: "overview", label: "Overview", icon: <BarChart3 className="w-4 h-4" /> },
  { id: "metrics", label: "Metrics", icon: <TrendingUp className="w-4 h-4" /> },
  { id: "market", label: "Market", icon: <Globe className="w-4 h-4" /> },
  { id: "competitors", label: "Competitors", icon: <Users className="w-4 h-4" /> },
  { id: "improvements", label: "Improvements", icon: <Lightbulb className="w-4 h-4" /> },
  { id: "alternatives", label: "Alternatives", icon: <ArrowRight className="w-4 h-4" /> },
];

function VerdictBadge({ verdict }: { verdict: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border",
        getVerdictColor(verdict)
      )}
    >
      {verdict}
    </span>
  );
}

export function ReportDisplay({ report, onReset }: ReportDisplayProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Validation Report</h2>
          <p className="text-sm text-slate-500 mt-0.5">{formatDate(report.createdAt)}</p>
        </div>
        <div className="flex items-center gap-2">
          <ExportButtons report={report} />
          <Button variant="ghost" size="sm" onClick={onReset}>
            <RefreshCw className="w-4 h-4" />
            New Analysis
          </Button>
        </div>
      </div>

      <div id="report-content">
        <Card variant="elevated" className="overflow-hidden">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 px-6 py-8 text-white">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <p className="text-indigo-200 text-xs font-medium uppercase tracking-widest mb-2">
                  App Idea Validated
                </p>
                <h3 className="text-lg font-bold leading-snug mb-2">{report.ideaSummary}</h3>
                <p className="text-indigo-200 text-sm leading-relaxed line-clamp-3">
                  {report.originalIdea}
                </p>
              </div>
              <div className="text-center shrink-0">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                    <circle cx="48" cy="48" r="42" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
                    <circle
                      cx="48"
                      cy="48"
                      r="42"
                      fill="none"
                      stroke="white"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 42}`}
                      strokeDashoffset={`${2 * Math.PI * 42 * (1 - report.overallScore / 100)}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-extrabold">{report.overallScore}</span>
                    <span className="text-indigo-200 text-xs">/100</span>
                  </div>
                </div>
                <div className="mt-2">
                  <VerdictBadge verdict={report.verdict} />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-slate-200 overflow-x-auto">
            <nav className="flex min-w-max">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                    activeTab === tab.id
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  )}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <CardContent className="py-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">Executive Summary</h4>
                  <div className="text-sm text-slate-600 leading-relaxed space-y-3">
                    {report.executiveSummary.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {report.metrics.map((metric) => (
                    <div
                      key={metric.name}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-medium text-slate-600">{metric.name}</p>
                        <span className={cn("text-base font-bold tabular-nums", getScoreColor(metric.score))}>
                          {metric.score}
                        </span>
                      </div>
                      <Progress
                        value={metric.score}
                        barClassName={getScoreBgColor(metric.score)}
                        size="sm"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                    <h5 className="text-sm font-semibold text-red-800 flex items-center gap-1.5 mb-3">
                      <AlertTriangle className="w-4 h-4" /> Key Risks
                    </h5>
                    <ul className="space-y-1.5">
                      {report.riskFactors.map((risk, i) => (
                        <li key={i} className="text-xs text-red-700 flex items-start gap-1.5">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 shrink-0" />
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <h5 className="text-sm font-semibold text-emerald-800 flex items-center gap-1.5 mb-3">
                      <CheckCircle className="w-4 h-4" /> Success Factors
                    </h5>
                    <ul className="space-y-1.5">
                      {report.successFactors.map((factor, i) => (
                        <li key={i} className="text-xs text-emerald-700 flex items-start gap-1.5">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                  <h5 className="text-sm font-semibold text-indigo-800 flex items-center gap-1.5 mb-3">
                    <ArrowRight className="w-4 h-4" /> Recommended Next Steps
                  </h5>
                  <ol className="space-y-2">
                    {report.nextSteps.map((step, i) => (
                      <li key={i} className="text-xs text-indigo-700 flex items-start gap-2">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-indigo-200 text-indigo-800 flex items-center justify-center font-bold text-[10px]">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {activeTab === "metrics" && <ScoreBreakdown metrics={report.metrics} />}

            {activeTab === "market" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Total Addressable Market", value: report.marketInsights.tamEstimate },
                    { label: "Serviceable Addressable", value: report.marketInsights.samEstimate },
                    { label: "Obtainable Market", value: report.marketInsights.somEstimate },
                    { label: "Growth Rate", value: report.marketInsights.growthRate },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center"
                    >
                      <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                      <p className="text-sm font-bold text-slate-800">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-indigo-500" /> Key Market Trends
                    </h5>
                    <ul className="space-y-2">
                      {report.marketInsights.keyTrends.map((trend, i) => (
                        <li
                          key={i}
                          className="text-sm text-slate-600 flex items-start gap-2 p-3 bg-slate-50 rounded-lg"
                        >
                          <span className="mt-0.5 text-indigo-500 font-bold text-xs shrink-0">{i + 1}.</span>
                          {trend}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-indigo-500" /> Target Demographics
                    </h5>
                    <ul className="space-y-2">
                      {report.marketInsights.targetDemographics.map((demo, i) => (
                        <li
                          key={i}
                          className="text-sm text-slate-600 flex items-start gap-2 p-3 bg-slate-50 rounded-lg"
                        >
                          <span className="mt-0.5 text-indigo-500">👤</span>
                          {demo}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "competitors" && (
              <CompetitorAnalysis competitors={report.competitors} />
            )}

            {activeTab === "improvements" && (
              <ImprovementSuggestions improvements={report.improvements} />
            )}

            {activeTab === "alternatives" && (
              <div className="space-y-4">
                <p className="text-sm text-slate-600">
                  Consider these related ideas that might have better market fit or fewer competitive barriers.
                </p>
                <AlternativeIdeas alternatives={report.alternativeIdeas} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
