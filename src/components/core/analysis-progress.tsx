"use client";

import { useEffect, useState } from "react";
import { STEPS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import MaxWidthWrapper from "../ui/max-width-wrapper";

const CIRCLE_R = 34;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_R;

export function AnalysisProgress() {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    let elapsed = 0;
    let currentStep = 0;
    const totalDuration = STEPS.reduce((acc, s) => acc + s.duration, 0);

    const timer = setInterval(() => {
      elapsed += 150;
      let cumulative = 0;

      for (let i = 0; i < STEPS.length; i++) {
        cumulative += STEPS[i].duration;
        if (elapsed <= cumulative) {
          if (i !== currentStep) {
            currentStep = i;
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

  const strokeDashoffset = CIRCLE_CIRCUMFERENCE * (1 - progress / 100);

  return (
    <MaxWidthWrapper parentBorder="border-b">
      <div className="h-[calc(100vh-134px)] w-full px-5 py-8 flex flex-col items-center justify-center gap-10">
        <div className="text-center space-y-1">
          <h2 className="text-lg font-semibold text-foreground tracking-tight">
            Analyzing your idea
          </h2>
          <p className="text-sm text-muted-foreground">
            This usually takes about 30 seconds
          </p>
        </div>
        <div className="relative">
          <div className="relative w-24 h-24">
            <svg
              className="w-24 h-24 -rotate-90"
              viewBox="0 0 96 96"
              role="img"
              aria-label="Analysis progress"
            >
              <title>Analysis progress</title>
              <circle
                r={CIRCLE_R}
                cx="48"
                cy="48"
                fill="none"
                strokeWidth="8"
                className="stroke-muted"
              />
              <circle
                cx="48"
                cy="48"
                r={CIRCLE_R}
                fill="none"
                strokeWidth="8"
                strokeLinecap="round"
                stroke="var(--primary)"
                strokeDasharray={CIRCLE_CIRCUMFERENCE}
                strokeDashoffset={strokeDashoffset}
                className="transition-[stroke-dashoffset] duration-300 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-semibold tabular-nums text-foreground">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </div>
        <div className="w-full max-w-xs">
          <div
            className="h-1.5 w-full rounded-full bg-muted overflow-hidden"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="w-full max-w-sm">
          <ul className="space-y-0">
            {STEPS.map((step, i) => {
              const isComplete = i < stepIndex;
              const isCurrent = i === stepIndex;
              const isPending = i > stepIndex;

              return (
                <li
                  key={step.label}
                  className={cn(
                    "relative flex gap-3 py-2.5 pl-1 transition-colors duration-300",
                    isCurrent && "rounded-lg bg-muted/50 -mx-1 px-3",
                  )}
                >
                  {i < STEPS.length - 1 && (
                    <span
                      className={cn(
                        "absolute left-[11px] top-10 bottom-0 w-px -mb-2.5",
                        isComplete ? "bg-primary/30" : "bg-border",
                      )}
                      aria-hidden
                    />
                  )}
                  <span
                    className={cn(
                      "relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-medium transition-all duration-300",
                      isComplete &&
                        "border-primary bg-primary text-primary-foreground",
                      isCurrent &&
                        "border-primary bg-primary/10 text-primary ring-2 ring-primary/20",
                      isPending &&
                        "border-border bg-muted/30 text-muted-foreground",
                    )}
                  >
                    {isComplete ? (
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        role="img"
                        aria-label="Complete"
                      >
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    ) : isCurrent ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    ) : (
                      <span className="text-[10px]">{i + 1}</span>
                    )}
                  </span>

                  <span
                    className={cn(
                      "pt-0.5 text-sm leading-snug transition-colors duration-300",
                      isComplete && "text-muted-foreground",
                      isCurrent && "font-medium text-foreground",
                      isPending && "text-muted-foreground",
                    )}
                  >
                    {step.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
