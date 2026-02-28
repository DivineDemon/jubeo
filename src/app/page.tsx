"use client";

import { AnalysisProgress } from "@/components/core/analysis-progress";
import { ReportDisplay } from "@/components/core/report-display";
import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import Features from "@/components/landing/features";
import FormContainer from "@/components/landing/form-container";
import Hero from "@/components/landing/hero";
import { useAnalysis } from "@/hooks/use-analysis";
import type { ValidationReport } from "@/types";

export default function Home() {
  const { state, analyze, reset } = useAnalysis();

  const isIdle = state.status === "idle";
  const isError = state.status === "error";
  const isComplete = state.status === "complete";
  const isAnalyzing = state.status === "analyzing";

  return (
    <>
      <Navbar />
      {isAnalyzing ? (
        <AnalysisProgress />
      ) : isComplete ? (
        <ReportDisplay
          report={state.report as ValidationReport}
          onReset={reset}
        />
      ) : (
        <>
          <Hero />
          <Features />
          {(isIdle || isError) && (
            <FormContainer
              isError={isError}
              onSubmit={analyze}
              isAnalyzing={isAnalyzing}
            />
          )}
        </>
      )}
      <Footer />
    </>
  );
}
