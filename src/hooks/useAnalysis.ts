"use client";

import { useState, useCallback } from "react";
import { AnalysisState, IdeaFormData, ValidationReport } from "@/types";

const INITIAL_STATE: AnalysisState = {
  status: "idle",
  progress: 0,
  currentStep: "",
  report: null,
  error: null,
};

export function useAnalysis() {
  const [state, setState] = useState<AnalysisState>(INITIAL_STATE);

  const analyze = useCallback(async (formData: IdeaFormData) => {
    setState({
      status: "analyzing",
      progress: 0,
      currentStep: "Initializing analysis…",
      report: null,
      error: null,
    });

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Server error: ${response.status}`);
      }

      const report = data as ValidationReport;
      setState({
        status: "complete",
        progress: 100,
        currentStep: "Analysis complete",
        report,
        error: null,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred";
      setState({
        status: "error",
        progress: 0,
        currentStep: "",
        report: null,
        error: message,
      });
    }
  }, []);

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return { state, analyze, reset };
}
