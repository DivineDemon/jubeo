import { BarChart2, FileText, TrendingUp, Zap } from "lucide-react";

export const CATEGORIES = [
  "SaaS / B2B",
  "Consumer App",
  "Marketplace",
  "E-commerce",
  "EdTech",
  "FinTech",
  "HealthTech",
  "Social / Community",
  "Developer Tools",
  "AI / ML Product",
  "Gaming",
  "Other",
];

export const BUDGET_OPTIONS = [
  "Bootstrapped (< $10k)",
  "Small ($10k - $50k)",
  "Medium ($50k - $250k)",
  "Large ($250k - $1M)",
  "Funded (> $1M)",
];

export const TIMELINE_OPTIONS = [
  "MVP in 1 month",
  "MVP in 3 months",
  "MVP in 6 months",
  "MVP in 12 months",
  "Long-term (> 1 year)",
];

export const EXAMPLE_IDEAS = [
  "An AI-powered personal finance app that analyzes spending patterns and automatically moves money between accounts to maximize savings and reduce fees",
  "A marketplace connecting freelance software developers with early-stage startups for equity-based compensation instead of cash",
  "A platform where local restaurants can offer cooking classes and sell meal kits directly to customers, bypassing food delivery platforms",
];

export const FEATURES = [
  {
    icon: Zap,
    title: "AI-Powered Analysis",
    description:
      "Gemini analyzes your idea against 6 key validation dimensions.",
  },
  {
    icon: BarChart2,
    title: "Validation Score",
    description:
      "Get a 0-100 score with detailed metric breakdowns and rationale.",
  },
  {
    icon: TrendingUp,
    title: "Market Research",
    description:
      "TAM/SAM/SOM estimates, growth rates, trends, and demographics.",
  },
  {
    icon: FileText,
    title: "Export Report",
    description:
      "Download your full analysis as Markdown or PDF, or share it with your team.",
  },
];

export const STEPS = [
  { label: "Parsing your idea…", duration: 2000 },
  { label: "Researching market size and trends…", duration: 4000 },
  { label: "Identifying competitors…", duration: 4000 },
  { label: "Evaluating technical feasibility…", duration: 3000 },
  { label: "Assessing monetization potential…", duration: 3000 },
  { label: "Generating improvement suggestions…", duration: 4000 },
  { label: "Scoring and compiling report…", duration: 3000 },
];
