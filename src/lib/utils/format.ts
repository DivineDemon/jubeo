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
  if (score >= 75) return "border-emerald-200 bg-emerald-50";
  if (score >= 55) return "border-amber-200 bg-amber-50";
  if (score >= 35) return "border-orange-200 bg-orange-50";
  return "border-red-200 bg-red-50";
}

export function getVerdictColor(verdict: string): string {
  switch (verdict) {
    case "Strong Opportunity":
      return "text-emerald-700 bg-emerald-100 border-emerald-200";
    case "Promising":
      return "text-blue-700 bg-blue-100 border-blue-200";
    case "Needs Work":
      return "text-amber-700 bg-amber-100 border-amber-200";
    case "Risky":
      return "text-orange-700 bg-orange-100 border-orange-200";
    case "Not Viable":
      return "text-red-700 bg-red-100 border-red-200";
    default:
      return "text-gray-700 bg-gray-100 border-gray-200";
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
