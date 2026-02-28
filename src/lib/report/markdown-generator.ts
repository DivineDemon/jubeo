import { formatDate } from "@/lib/utils/format";
import type { ValidationReport } from "@/types";

function getScoreBar(score: number): string {
  const filled = Math.round(score / 10);
  const empty = 10 - filled;
  return `${"█".repeat(filled) + "░".repeat(empty)} ${score}/100`;
}

export function generateMarkdownReport(report: ValidationReport): string {
  const lines: string[] = [];

  lines.push(`# App Idea Validator Report`);
  lines.push(`**Generated:** ${formatDate(report.createdAt)}  `);
  lines.push(`**Report ID:** \`${report.id}\``);
  lines.push("");

  lines.push(`---`);
  lines.push("");

  lines.push(`## 📋 Idea Summary`);
  lines.push("");
  lines.push(`> ${report.ideaSummary}`);
  lines.push("");
  lines.push(`**Original Idea:**`);
  lines.push(`> ${report.originalIdea}`);
  lines.push("");

  lines.push(`---`);
  lines.push("");

  lines.push(`## 🎯 Overall Verdict`);
  lines.push("");
  lines.push(`| Metric | Value |`);
  lines.push(`|--------|-------|`);
  lines.push(`| **Overall Score** | **${report.overallScore}/100** |`);
  lines.push(`| **Verdict** | **${report.verdict}** |`);
  lines.push("");

  lines.push(`## 📊 Executive Summary`);
  lines.push("");
  lines.push(report.executiveSummary);
  lines.push("");

  lines.push(`---`);
  lines.push("");

  lines.push(`## 📈 Scoring Breakdown`);
  lines.push("");
  for (const metric of report.metrics) {
    lines.push(`### ${metric.name}`);
    lines.push(`**Score:** ${getScoreBar(metric.score)}`);
    lines.push("");
    lines.push(metric.rationale);
    lines.push("");
    lines.push("**Key Findings:**");
    for (const detail of metric.details) {
      lines.push(`- ${detail}`);
    }
    lines.push("");
  }

  lines.push(`---`);
  lines.push("");

  lines.push(`## 🌍 Market Insights`);
  lines.push("");
  lines.push(`| Market Level | Estimate |`);
  lines.push(`|-------------|----------|`);
  lines.push(
    `| Total Addressable Market (TAM) | ${report.marketInsights.tamEstimate} |`,
  );
  lines.push(
    `| Serviceable Addressable Market (SAM) | ${report.marketInsights.samEstimate} |`,
  );
  lines.push(
    `| Serviceable Obtainable Market (SOM) | ${report.marketInsights.somEstimate} |`,
  );
  lines.push(`| Growth Rate | ${report.marketInsights.growthRate} |`);
  lines.push("");

  lines.push(`### Key Market Trends`);
  for (const trend of report.marketInsights.keyTrends) {
    lines.push(`- ${trend}`);
  }
  lines.push("");

  lines.push(`### Target Demographics`);
  for (const demo of report.marketInsights.targetDemographics) {
    lines.push(`- ${demo}`);
  }
  lines.push("");

  lines.push(`---`);
  lines.push("");

  lines.push(`## 🏆 Competitor Analysis`);
  lines.push("");
  for (const competitor of report.competitors) {
    lines.push(`### ${competitor.name}`);
    if (competitor.url) lines.push(`**Website:** ${competitor.url}`);
    lines.push(`**Overview:** ${competitor.description}`);
    if (competitor.fundingStage)
      lines.push(`**Funding:** ${competitor.fundingStage}`);
    if (competitor.estimatedUsers)
      lines.push(`**Scale:** ${competitor.estimatedUsers}`);
    if (competitor.pricing) lines.push(`**Pricing:** ${competitor.pricing}`);
    lines.push("");
    lines.push("**Strengths:**");
    for (const s of competitor.strengths) lines.push(`- ${s}`);
    lines.push("");
    lines.push("**Weaknesses:**");
    for (const w of competitor.weaknesses) lines.push(`- ${w}`);
    lines.push("");
  }

  lines.push(`---`);
  lines.push("");

  lines.push(`## 💡 Improvement Suggestions`);
  lines.push("");
  const highPriority = report.improvements.filter((i) => i.priority === "high");
  const medPriority = report.improvements.filter(
    (i) => i.priority === "medium",
  );
  const lowPriority = report.improvements.filter((i) => i.priority === "low");

  for (const group of [
    { label: "🔴 High Priority", items: highPriority },
    { label: "🟡 Medium Priority", items: medPriority },
    { label: "🔵 Low Priority", items: lowPriority },
  ]) {
    if (group.items.length === 0) continue;
    lines.push(`### ${group.label}`);
    lines.push("");
    for (const item of group.items) {
      lines.push(`**[${item.category}]** ${item.suggestion}`);
      lines.push(`> ${item.rationale}`);
      lines.push("");
    }
  }

  lines.push(`---`);
  lines.push("");

  lines.push(`## 🔀 Alternative Ideas`);
  lines.push("");
  for (const alt of report.alternativeIdeas) {
    lines.push(`### ${alt.title} — Score: ${alt.viabilityScore}/100`);
    lines.push(alt.description);
    lines.push("");
    lines.push(`**Why consider this:** ${alt.differentiator}`);
    lines.push("");
  }

  lines.push(`---`);
  lines.push("");

  lines.push(`## ⚠️ Risk Factors`);
  lines.push("");
  for (const risk of report.riskFactors) {
    lines.push(`- ${risk}`);
  }
  lines.push("");

  lines.push(`## ✅ Success Factors`);
  lines.push("");
  for (const factor of report.successFactors) {
    lines.push(`- ${factor}`);
  }
  lines.push("");

  lines.push(`## 🚀 Recommended Next Steps`);
  lines.push("");
  report.nextSteps.forEach((step, i) => {
    lines.push(`${i + 1}. ${step}`);
  });
  lines.push("");

  lines.push(`---`);
  lines.push("");
  lines.push(
    `*Report generated by [App Idea Validator](/) — AI-powered startup validation*`,
  );

  return lines.join("\n");
}
