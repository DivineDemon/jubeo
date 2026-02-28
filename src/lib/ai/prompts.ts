export const ANALYSIS_SYSTEM_PROMPT = `You are an expert startup analyst, venture capitalist, and product strategist with 20 years of experience evaluating app ideas. Your role is to provide brutally honest, data-driven, comprehensive validation reports for app ideas.

You analyze ideas across six key dimensions:
1. Market Size (TAM/SAM/SOM estimates, growth rates)
2. Competition Level (density, quality, moat potential)
3. Market Timing (trend direction, adoption curve position)
4. Technical Feasibility (complexity, time-to-market, team requirements)
5. Monetization Potential (revenue models, willingness to pay)
6. Uniqueness / Differentiation (USP strength, defensibility)

You provide structured JSON responses with precise scores (0-100), detailed rationale, and actionable insights.

Guidelines:
- Be honest about weaknesses, not just strengths
- Provide specific, real-world examples and comparisons
- Score conservatively - most ideas score 40-65, exceptional ones 70+
- Always suggest concrete improvements and alternatives
- Base estimates on realistic market data`;

export function buildAnalysisPrompt(
  idea: string,
  targetMarket?: string,
  category?: string,
  budget?: string,
  timeline?: string,
): string {
  const context = [
    targetMarket && `Target Market: ${targetMarket}`,
    category && `Category: ${category}`,
    budget && `Budget: ${budget}`,
    timeline && `Timeline: ${timeline}`,
  ]
    .filter(Boolean)
    .join("\n");

  return `Analyze this app idea and return a comprehensive validation report as JSON.

APP IDEA:
${idea}

${context ? `ADDITIONAL CONTEXT:\n${context}\n` : ""}

Return a JSON object with EXACTLY this structure:
{
  "ideaSummary": "A concise 1-2 sentence summary of the core idea",
  "executiveSummary": "3-4 paragraph executive summary covering the opportunity, key findings, major risks, and overall assessment",
  "overallScore": <number 0-100>,
  "verdict": <"Strong Opportunity" | "Promising" | "Needs Work" | "Risky" | "Not Viable">,
  "metrics": [
    {
      "name": "Market Size",
      "score": <0-100>,
      "weight": 20,
      "rationale": "2-3 sentence explanation of this score",
      "details": ["specific finding 1", "specific finding 2", "specific finding 3"]
    },
    {
      "name": "Competition Level",
      "score": <0-100>,
      "weight": 20,
      "rationale": "2-3 sentence explanation",
      "details": ["finding 1", "finding 2", "finding 3"]
    },
    {
      "name": "Market Timing",
      "score": <0-100>,
      "weight": 15,
      "rationale": "2-3 sentence explanation",
      "details": ["finding 1", "finding 2", "finding 3"]
    },
    {
      "name": "Technical Feasibility",
      "score": <0-100>,
      "weight": 20,
      "rationale": "2-3 sentence explanation",
      "details": ["finding 1", "finding 2", "finding 3"]
    },
    {
      "name": "Monetization Potential",
      "score": <0-100>,
      "weight": 15,
      "rationale": "2-3 sentence explanation",
      "details": ["finding 1", "finding 2", "finding 3"]
    },
    {
      "name": "Uniqueness",
      "score": <0-100>,
      "weight": 10,
      "rationale": "2-3 sentence explanation",
      "details": ["finding 1", "finding 2", "finding 3"]
    }
  ],
  "marketInsights": {
    "tamEstimate": "Global TAM estimate with explanation (e.g. '$45B global market')",
    "samEstimate": "Serviceable addressable market estimate",
    "somEstimate": "Realistic 3-year SOM target",
    "growthRate": "CAGR or growth rate description",
    "keyTrends": ["trend 1", "trend 2", "trend 3", "trend 4"],
    "targetDemographics": ["demographic 1", "demographic 2", "demographic 3"]
  },
  "competitors": [
    {
      "name": "Competitor Name",
      "description": "What they do and their market position",
      "url": "competitor.com",
      "strengths": ["strength 1", "strength 2"],
      "weaknesses": ["weakness 1", "weakness 2"],
      "fundingStage": "Series B / Bootstrapped / Public etc",
      "estimatedUsers": "Estimated user count or ARR",
      "pricing": "Pricing model description"
    }
  ],
  "improvements": [
    {
      "category": "Category name (e.g. 'Product', 'Go-to-Market', 'Monetization')",
      "suggestion": "Specific actionable suggestion",
      "priority": <"high" | "medium" | "low">,
      "rationale": "Why this improvement matters"
    }
  ],
  "alternativeIdeas": [
    {
      "title": "Alternative Idea Title",
      "description": "Brief description of the pivot/alternative",
      "differentiator": "How this differs and why it might be better",
      "viabilityScore": <0-100>
    }
  ],
  "riskFactors": ["risk 1", "risk 2", "risk 3", "risk 4", "risk 5"],
  "successFactors": ["factor 1", "factor 2", "factor 3", "factor 4"],
  "nextSteps": ["step 1", "step 2", "step 3", "step 4", "step 5"]
}

Include 3-5 real competitors, 4-6 improvements, 3 alternative ideas, 5+ risk factors, 4+ success factors, and 5+ next steps. Be specific and reference real market data where possible.`;
}
