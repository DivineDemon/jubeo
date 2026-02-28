"use client";

import { ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import type { IdeaFormData } from "@/types";

const CATEGORIES = [
  "SaaS / B2B",
  "Consumer App",
  "Marketplace",
  "E-commerce",
  "EdTech",
  "FinTech",
  "HealthTech",
  "Social / Community",
  "Developer Tools",
  "AI / ML Product",
  "Gaming",
  "Other",
];

const BUDGET_OPTIONS = [
  "Bootstrapped (< $10k)",
  "Small ($10k - $50k)",
  "Medium ($50k - $250k)",
  "Large ($250k - $1M)",
  "Funded (> $1M)",
];

const TIMELINE_OPTIONS = [
  "MVP in 1 month",
  "MVP in 3 months",
  "MVP in 6 months",
  "MVP in 12 months",
  "Long-term (> 1 year)",
];

const EXAMPLE_IDEAS = [
  "An AI-powered personal finance app that analyzes spending patterns and automatically moves money between accounts to maximize savings and reduce fees",
  "A marketplace connecting freelance software developers with early-stage startups for equity-based compensation instead of cash",
  "A platform where local restaurants can offer cooking classes and sell meal kits directly to customers, bypassing food delivery platforms",
];

interface IdeaFormProps {
  onSubmit: (data: IdeaFormData) => void;
  isLoading: boolean;
}

export function IdeaForm({ onSubmit, isLoading }: IdeaFormProps) {
  const [idea, setIdea] = useState("");
  const [targetMarket, setTargetMarket] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [error, setError] = useState("");

  const charCount = idea.length;
  const minChars = 20;
  const maxChars = 2000;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (idea.trim().length < minChars) {
      setError(`Please describe your idea in at least ${minChars} characters.`);
      return;
    }
    setError("");
    onSubmit({ idea: idea.trim(), targetMarket, category, budget, timeline });
  }

  function applyExample(example: string) {
    setIdea(example);
    setError("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="idea"
          className="block text-sm font-semibold text-slate-700 mb-2"
        >
          Describe Your App Idea <span className="text-red-500">*</span>
        </label>
        <textarea
          id="idea"
          value={idea}
          onChange={(e) => {
            setIdea(e.target.value);
            if (error) setError("");
          }}
          placeholder="Describe your app idea in detail. What problem does it solve? Who is it for? What makes it unique? The more detail you provide, the better the analysis..."
          rows={6}
          maxLength={maxChars}
          className={cn(
            "w-full px-4 py-3 text-slate-800 placeholder-slate-400 bg-white border rounded-xl resize-none",
            "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
            "transition-all duration-200 text-sm leading-relaxed",
            error ? "border-red-300 bg-red-50" : "border-slate-300",
          )}
        />
        <div className="flex items-center justify-between mt-1.5">
          <p
            className={cn(
              "text-xs",
              error ? "text-red-500 font-medium" : "text-slate-500",
            )}
          >
            {error || `Minimum ${minChars} characters for quality analysis`}
          </p>
          <span
            className={cn(
              "text-xs tabular-nums",
              charCount > maxChars * 0.9 ? "text-amber-600" : "text-slate-400",
            )}
          >
            {charCount}/{maxChars}
          </span>
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">
          Try an example idea
        </p>
        <div className="flex flex-col gap-2">
          {EXAMPLE_IDEAS.map((ex) => (
            <button
              key={ex.slice(0, 60)}
              type="button"
              onClick={() => applyExample(ex)}
              className="text-left text-xs text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-3 py-2 rounded-lg border border-indigo-100 transition-colors line-clamp-2"
            >
              <Lightbulb className="inline w-3 h-3 mr-1 shrink-0" />
              {ex}
            </button>
          ))}
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
        >
          {showAdvanced ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
          {showAdvanced ? "Hide" : "Show"} optional details (improves analysis
          accuracy)
        </button>

        {showAdvanced && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <label
                htmlFor="category"
                className="block text-xs font-semibold text-slate-600 mb-1.5"
              >
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm text-slate-700 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select category…</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="targetMarket"
                className="block text-xs font-semibold text-slate-600 mb-1.5"
              >
                Target Market
              </label>
              <input
                id="targetMarket"
                type="text"
                value={targetMarket}
                onChange={(e) => setTargetMarket(e.target.value)}
                placeholder="e.g. SMB owners in the US"
                maxLength={200}
                className="w-full px-3 py-2 text-sm text-slate-700 placeholder-slate-400 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="budget"
                className="block text-xs font-semibold text-slate-600 mb-1.5"
              >
                Budget
              </label>
              <select
                id="budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-3 py-2 text-sm text-slate-700 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select budget…</option>
                {BUDGET_OPTIONS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="timeline"
                className="block text-xs font-semibold text-slate-600 mb-1.5"
              >
                Timeline
              </label>
              <select
                id="timeline"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full px-3 py-2 text-sm text-slate-700 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select timeline…</option>
                {TIMELINE_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        loading={isLoading}
        disabled={isLoading || charCount < minChars}
        className="w-full"
      >
        {isLoading ? "Analyzing your idea…" : "Validate My Idea →"}
      </Button>

      <p className="text-xs text-center text-slate-400">
        Analysis typically takes 15–30 seconds using GPT-4o
      </p>
    </form>
  );
}
