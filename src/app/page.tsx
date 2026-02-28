"use client";

import { useRouter } from "next/navigation";
import { AnalysisProgress } from "@/components/core/analysis-progress";
import Features from "@/components/landing/features";
import FormContainer from "@/components/landing/form-container";
import Hero from "@/components/landing/hero";
import { useAnalysis } from "@/hooks/use-analysis";
import type { IdeaFormData } from "@/types";

export default function Home() {
  const router = useRouter();
  const { state, analyze } = useAnalysis();

  const isIdle = state.status === "idle";
  const isError = state.status === "error";
  const isAnalyzing = state.status === "analyzing";

  async function handleSubmit(formData: IdeaFormData) {
    const id = await analyze(formData);
    if (id) router.push(`/results/${id}`);
  }

  return isAnalyzing ? (
    <AnalysisProgress />
  ) : (
    <>
      <Hero />
      <Features />
      {(isIdle || isError) && (
        <FormContainer
          isError={isError}
          onSubmit={handleSubmit}
          isAnalyzing={isAnalyzing}
        />
      )}
    </>
  );
}
