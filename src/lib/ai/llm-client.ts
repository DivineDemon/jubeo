import { GoogleGenAI } from "@google/genai";
import type { IdeaFormData, ValidationReport } from "@/types";
import { ANALYSIS_SYSTEM_PROMPT, buildAnalysisPrompt } from "./prompts";

function generateId(): string {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}

function parseAnalysisResponse(
  jsonText: string,
): Omit<ValidationReport, "id" | "createdAt" | "originalIdea"> {
  const cleaned = jsonText
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  const parsed = JSON.parse(cleaned);

  const scoreFromMetrics = parsed.metrics.reduce(
    (acc: number, m: { score: number; weight: number }) =>
      acc + (m.score * m.weight) / 100,
    0,
  );
  const overallScore = parsed.overallScore ?? Math.round(scoreFromMetrics);

  return {
    ideaSummary: parsed.ideaSummary,
    executiveSummary: parsed.executiveSummary,
    overallScore,
    verdict: parsed.verdict,
    metrics: parsed.metrics,
    marketInsights: parsed.marketInsights,
    competitors: parsed.competitors || [],
    improvements: parsed.improvements || [],
    alternativeIdeas: parsed.alternativeIdeas || [],
    riskFactors: parsed.riskFactors || [],
    successFactors: parsed.successFactors || [],
    nextSteps: parsed.nextSteps || [],
  };
}

export async function analyzeIdea(
  formData: IdeaFormData,
): Promise<ValidationReport> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not set. Please add it to your environment variables.",
    );
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = buildAnalysisPrompt(
    formData.idea,
    formData.targetMarket,
    formData.category,
    formData.budget,
    formData.timeline,
  );

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: ANALYSIS_SYSTEM_PROMPT,
      temperature: 0.7,
      maxOutputTokens: 4000,
    },
  });

  const text = response.text ?? "";
  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  const parsed = parseAnalysisResponse(text);

  return {
    id: generateId(),
    createdAt: new Date().toISOString(),
    originalIdea: formData.idea,
    ...parsed,
  };
}
