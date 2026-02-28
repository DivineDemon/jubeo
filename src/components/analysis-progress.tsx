"use client";

import { useEffect, useState } from "react";

const STEPS = [
  { label: "Parsing your idea…", duration: 2000 },
  { label: "Researching market size and trends…", duration: 4000 },
  { label: "Identifying competitors…", duration: 4000 },
  { label: "Evaluating technical feasibility…", duration: 3000 },
  { label: "Assessing monetization potential…", duration: 3000 },
  { label: "Generating improvement suggestions…", duration: 4000 },
  { label: "Scoring and compiling report…", duration: 3000 },
];

export function AnalysisProgress() {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let elapsed = 0;
    const totalDuration = STEPS.reduce((acc, s) => acc + s.duration, 0);
    let _stepStart = 0;
    let currentStep = 0;

    const timer = setInterval(() => {
      elapsed += 150;

      let cumulative = 0;
      for (let i = 0; i < STEPS.length; i++) {
        cumulative += STEPS[i].duration;
        if (elapsed <= cumulative) {
          if (i !== currentStep) {
            currentStep = i;
            _stepStart = cumulative - STEPS[i].duration;
            setStepIndex(i);
          }
          break;
        }
      }

      const raw = (elapsed / totalDuration) * 95;
      setProgress(Math.min(raw, 95));
    }, 150);

    return () => clearInterval(timer);
  }, []);

  const currentLabel = STEPS[Math.min(stepIndex, STEPS.length - 1)].label;

  return (
    <div className="py-8 px-4 text-center space-y-6">
      <div className="relative w-20 h-20 mx-auto">
        <svg
          className="w-20 h-20 -rotate-90"
          viewBox="0 0 80 80"
          role="img"
          aria-label="Analysis progress"
        >
          <title>Analysis progress</title>
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="6"
          />
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke="#6366f1"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 34}`}
            strokeDashoffset={`${2 * Math.PI * 34 * (1 - progress / 100)}`}
            className="transition-all duration-300 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-indigo-600">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold text-slate-800 mb-1">
          Analyzing Your Idea
        </h3>
        <p className="text-sm text-slate-500 animate-pulse">{currentLabel}</p>
      </div>

      <div className="max-w-xs mx-auto space-y-2">
        {STEPS.map((step, i) => (
          <div
            key={step.label}
            className={`flex items-center gap-2 text-xs transition-all duration-300 ${
              i < stepIndex
                ? "text-emerald-600"
                : i === stepIndex
                  ? "text-indigo-600 font-medium"
                  : "text-slate-300"
            }`}
          >
            <span className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0">
              {i < stepIndex ? "✓" : i === stepIndex ? "●" : "○"}
            </span>
            {step.label}
          </div>
        ))}
      </div>
    </div>
  );
}
