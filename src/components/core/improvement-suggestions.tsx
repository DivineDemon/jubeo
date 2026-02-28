"use client";

import { cn, getPriorityColor } from "@/lib/utils";
import type { ImprovementSuggestion } from "@/types";

interface ImprovementSuggestionsProps {
  improvements: ImprovementSuggestion[];
}

export function ImprovementSuggestions({
  improvements,
}: ImprovementSuggestionsProps) {
  const grouped = {
    high: improvements.filter((i) => i.priority === "high"),
    medium: improvements.filter((i) => i.priority === "medium"),
    low: improvements.filter((i) => i.priority === "low"),
  };

  const groups: { label: string; key: keyof typeof grouped; emoji: string }[] =
    [
      { label: "High Priority", key: "high", emoji: "🔴" },
      { label: "Medium Priority", key: "medium", emoji: "🟡" },
      { label: "Low Priority", key: "low", emoji: "🔵" },
    ];

  return groups.map((group) => {
    const items = grouped[group.key];
    if (!items.length) return null;
    return (
      <div key={group.key} className="space-y-3">
        <h5 className="text-sm font-semibold flex items-center gap-1.5">
          <span>{group.emoji}</span> {group.label}
        </h5>
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={`${item.category}-${item.suggestion}`}
              className="flex items-start gap-3 p-4 shadow rounded-xl border"
            >
              <div className="shrink-0 pt-0.5">
                <span
                  className={cn(
                    "inline-block px-2 py-0.5 rounded-full text-xs font-medium",
                    getPriorityColor(item.priority),
                  )}
                >
                  {item.category}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">{item.suggestion}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.rationale}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  });
}
