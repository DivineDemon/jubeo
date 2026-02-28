"use client";

import { ImprovementSuggestion } from "@/types";
import { getPriorityColor } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

interface ImprovementSuggestionsProps {
  improvements: ImprovementSuggestion[];
}

export function ImprovementSuggestions({ improvements }: ImprovementSuggestionsProps) {
  const grouped = {
    high: improvements.filter((i) => i.priority === "high"),
    medium: improvements.filter((i) => i.priority === "medium"),
    low: improvements.filter((i) => i.priority === "low"),
  };

  const groups: { label: string; key: keyof typeof grouped; emoji: string }[] = [
    { label: "High Priority", key: "high", emoji: "🔴" },
    { label: "Medium Priority", key: "medium", emoji: "🟡" },
    { label: "Low Priority", key: "low", emoji: "🔵" },
  ];

  return (
    <div className="space-y-6">
      {groups.map((group) => {
        const items = grouped[group.key];
        if (!items.length) return null;
        return (
          <div key={group.key}>
            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
              <span>{group.emoji}</span> {group.label}
            </h4>
            <div className="space-y-3">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200"
                >
                  <div className="shrink-0 pt-0.5">
                    <span
                      className={cn(
                        "inline-block px-2 py-0.5 rounded-full text-xs font-medium",
                        getPriorityColor(item.priority)
                      )}
                    >
                      {item.category}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800 mb-1">{item.suggestion}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.rationale}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
