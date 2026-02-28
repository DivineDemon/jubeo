export interface IdeaFormData {
  idea: string;
  targetMarket?: string;
  category?: string;
  budget?: string;
  timeline?: string;
}

export interface ScoreMetric {
  name: string;
  score: number;
  weight: number;
  rationale: string;
  details: string[];
}

export interface Competitor {
  name: string;
  description: string;
  url?: string;
  strengths: string[];
  weaknesses: string[];
  fundingStage?: string;
  estimatedUsers?: string;
  pricing?: string;
}

export interface MarketInsight {
  tamEstimate: string;
  samEstimate: string;
  somEstimate: string;
  growthRate: string;
  keyTrends: string[];
  targetDemographics: string[];
}

export interface ImprovementSuggestion {
  category: string;
  suggestion: string;
  priority: "high" | "medium" | "low";
  rationale: string;
}

export interface AlternativeIdea {
  title: string;
  description: string;
  differentiator: string;
  viabilityScore: number;
}

export interface ValidationReport {
  id: string;
  createdAt: string;
  ideaSummary: string;
  originalIdea: string;
  overallScore: number;
  verdict: "Strong Opportunity" | "Promising" | "Needs Work" | "Risky" | "Not Viable";
  executiveSummary: string;
  metrics: ScoreMetric[];
  marketInsights: MarketInsight;
  competitors: Competitor[];
  improvements: ImprovementSuggestion[];
  alternativeIdeas: AlternativeIdea[];
  riskFactors: string[];
  successFactors: string[];
  nextSteps: string[];
}

export interface AnalysisState {
  status: "idle" | "analyzing" | "complete" | "error";
  progress: number;
  currentStep: string;
  report: ValidationReport | null;
  error: string | null;
}
