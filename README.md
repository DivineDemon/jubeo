# App Idea Validator

An AI-powered web application that validates startup app ideas using Google Gemini. Get a comprehensive reality-check report with validation scores, market research, competitor analysis, improvement suggestions, and alternative ideas.

## Features

- **AI-Powered Analysis** — Google Gemini analyzes ideas across 6 validation dimensions
- **Validation Score** — 0–100 score with weighted metric breakdown
- **Market Research** — TAM/SAM/SOM estimates, growth rates, key trends
- **Competitor Analysis** — Real competitor discovery with strengths/weaknesses
- **Improvement Suggestions** — Prioritized, actionable recommendations
- **Alternative Ideas** — Related pivots with viability scores
- **Export Reports** — Download as Markdown (.md) or PDF

## Getting Started

### Prerequisites

- Node.js 18+
- A [Google AI Studio API key](https://aistudio.google.com/apikey) (Gemini)

### Installation

```bash
# Install dependencies (using Bun)
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your GEMINI_API_KEY

# Start the development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | ✅ Yes | Google Gemini API key for AI analysis ([get one](https://aistudio.google.com/apikey)) |

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: @google/genai + Google Gemini
- **Validation**: Zod
- **Icons**: Lucide React
- **PDF Export**: jsPDF + html2canvas
- **Markdown**: react-markdown + remark-gfm

## Project Structure

```
src/
├── app/
│   ├── api/analyze/route.ts    # Analysis API endpoint
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
├── components/
│   ├── IdeaForm.tsx            # Input form
│   ├── AnalysisProgress.tsx    # Loading state
│   ├── ReportDisplay.tsx       # Full report view
│   ├── ScoreBreakdown.tsx      # Metrics display
│   ├── CompetitorAnalysis.tsx  # Competitor section
│   ├── ImprovementSuggestions.tsx
│   ├── AlternativeIdeas.tsx
│   ├── ExportButtons.tsx       # PDF/MD export
│   └── ui/                     # Reusable UI components
├── lib/
│   ├── ai/                     # AI prompts + client
│   ├── report/                 # Report generators
│   └── utils/                  # Utilities
├── hooks/
│   └── useAnalysis.ts          # Analysis state hook
└── types/
    └── index.ts                # TypeScript types
```

## Usage

1. Enter your app idea description (minimum 20 characters)
2. Optionally add target market, category, budget, and timeline
3. Click "Validate My Idea"
4. Wait ~20 seconds for the AI analysis
5. Browse the tabbed report (Overview, Metrics, Market, Competitors, Improvements, Alternatives)
6. Export as PDF or Markdown

## Scoring Dimensions

| Dimension | Weight | Description |
|-----------|--------|-------------|
| Market Size | 20% | TAM/SAM/SOM potential |
| Competition Level | 20% | Competitive landscape |
| Technical Feasibility | 20% | Build complexity |
| Market Timing | 15% | Trend alignment |
| Monetization Potential | 15% | Revenue viability |
| Uniqueness | 10% | Differentiation strength |

## License

MIT
