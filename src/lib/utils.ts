import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatScore(score: number): string {
  return Math.round(score).toString();
}

export function getScoreColor(score: number): string {
  if (score >= 75) return "text-emerald-600";
  if (score >= 55) return "text-amber-600";
  if (score >= 35) return "text-orange-600";
  return "text-red-600";
}

export function getScoreBgColor(score: number): string {
  if (score >= 75) return "bg-emerald-500";
  if (score >= 55) return "bg-amber-500";
  if (score >= 35) return "bg-orange-500";
  return "bg-red-500";
}

export function getScoreBorderColor(score: number): string {
  if (score >= 75) return "bg-emerald-500/20 text-emerald-500";
  if (score >= 55) return "bg-amber-500/20 text-amber-500";
  if (score >= 35) return "bg-orange-500/20 text-orange-500";
  return "bg-red-500/20 text-red-500";
}

export function getVerdictColor(verdict: string): string {
  switch (verdict) {
    case "Strong Opportunity":
      return "text-emerald-500 bg-emerald-500/20";
    case "Promising":
      return "text-blue-500 bg-blue-500/20";
    case "Needs Work":
      return "text-amber-500 bg-amber-500/20";
    case "Risky":
      return "text-orange-500 bg-orange-500/20";
    case "Not Viable":
      return "text-red-500 bg-red-500/20";
    default:
      return "text-gray-500 bg-gray-500/20";
  }
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case "high":
      return "text-red-700 bg-red-100";
    case "medium":
      return "text-amber-700 bg-amber-100";
    case "low":
      return "text-blue-700 bg-blue-100";
    default:
      return "text-gray-700 bg-gray-100";
  }
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return `${text.slice(0, length).trimEnd()}…`;
}
