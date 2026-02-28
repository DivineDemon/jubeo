"use client";

import { useCallback, useState } from "react";
import type { AnalysisState, IdeaFormData } from "@/types";

const INITIAL_STATE: AnalysisState = {
  status: "idle",
  progress: 0,
  currentStep: "",
  report: null,
  error: null,
};

export function useAnalysis() {
  const [state, setState] = useState<AnalysisState>(INITIAL_STATE);

  const analyze = useCallback(
    async (formData: IdeaFormData): Promise<string | null> => {
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

        if (response.status === 201 && typeof data.id === "string") {
          return data.id;
        }

        setState({
          status: "error",
          progress: 0,
          currentStep: "",
          report: null,
          error: "Unexpected response from server",
        });
        return null;
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";
        setState({
          status: "error",
          progress: 0,
          currentStep: "",
          report: null,
          error: message,
        });
        return null;
      }
    },
    [],
  );

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return { state, analyze, reset };
}
