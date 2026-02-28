"use client";

import {
  AlertTriangle,
  BarChart2,
  FileText,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AnalysisProgress } from "@/components/analysis-progress";
import { IdeaForm } from "@/components/idea-form";
import { ReportDisplay } from "@/components/report-display";
import { Card, CardContent } from "@/components/ui/card";
import { useAnalysis } from "@/hooks/use-analysis";

const FEATURES = [
  {
    icon: <Zap className="w-5 h-5 text-amber-500" />,
    title: "AI-Powered Analysis",
    description:
      "Gemini analyzes your idea against 6 key validation dimensions",
  },
  {
    icon: <BarChart2 className="w-5 h-5 text-indigo-500" />,
    title: "Validation Score",
    description:
      "Get a 0-100 score with detailed metric breakdowns and rationale",
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-emerald-500" />,
    title: "Market Research",
    description:
      "TAM/SAM/SOM estimates, growth rates, trends, and demographics",
  },
  {
    icon: <FileText className="w-5 h-5 text-rose-500" />,
    title: "Export Report",
    description: "Download your full analysis as Markdown or PDF",
  },
];

export default function Home() {
  const { state, analyze, reset } = useAnalysis();

  const isIdle = state.status === "idle";
  const isAnalyzing = state.status === "analyzing";
  const isComplete = state.status === "complete";
  const isError = state.status === "error";

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-900 text-sm">
              App Idea Validator
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              Powered by Gemini
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {(isIdle || isError) && (
          <>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold mb-4 border border-indigo-200">
                <Zap className="w-3.5 h-3.5" />
                AI-Powered Startup Validation
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
                Validate Your App Idea
                <br />
                <span className="text-indigo-600">Before You Build</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Get a comprehensive reality-check on your startup idea. AI
                analyzes market size, competitors, feasibility, monetization
                potential and more — in under 30 seconds.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white rounded-xl p-4 border border-slate-200 text-center"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-3">
                    {feature.icon}
                  </div>
                  <p className="text-xs font-semibold text-slate-800 mb-1">
                    {feature.title}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed hidden sm:block">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="max-w-2xl mx-auto">
              <Card variant="elevated">
                <CardContent className="py-6">
                  {isError && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-red-800 mb-1">
                          Analysis Failed
                        </p>
                        <p className="text-sm text-red-700">{state.error}</p>
                        <p className="text-xs text-red-600 mt-1">
                          Make sure your GEMINI_API_KEY is set in your
                          .env.local file.
                        </p>
                      </div>
                    </div>
                  )}
                  <IdeaForm onSubmit={analyze} isLoading={isAnalyzing} />
                </CardContent>
              </Card>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
                <span>✓ No account required</span>
                <span>✓ Results in ~20 seconds</span>
                <span>✓ Export to PDF or Markdown</span>
                <span>✓ 6 validation dimensions</span>
              </div>
            </div>
          </>
        )}

        {isAnalyzing && (
          <div className="max-w-md mx-auto">
            <Card variant="elevated">
              <CardContent className="py-4">
                <AnalysisProgress />
              </CardContent>
            </Card>
          </div>
        )}

        {isComplete && state.report && (
          <ReportDisplay report={state.report} onReset={reset} />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-center text-xs text-slate-400 space-y-1">
          <p className="font-medium text-slate-600">App Idea Validator</p>
          <p>
            AI-powered startup validation for entrepreneurs, investors, and
            developers
          </p>
          <p className="mt-2">
            Analysis powered by Google Gemini. Results are for informational
            purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
}
