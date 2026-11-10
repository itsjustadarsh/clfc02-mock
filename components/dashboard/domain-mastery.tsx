"use client";

import Link from "next/link";
import type { DomainMastery as DomainMasteryType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AlertTriangle, TrendingUp, CheckCircle2, HelpCircle } from "lucide-react";

interface DomainMasteryProps {
  mastery: DomainMasteryType[];
}

const statusConfig = {
  weak: { color: "text-danger", icon: AlertTriangle, label: "Needs Work" },
  improving: { color: "text-xp", icon: TrendingUp, label: "Improving" },
  strong: { color: "text-success", icon: CheckCircle2, label: "Strong" },
  unseen: { color: "text-muted-foreground", icon: HelpCircle, label: "Not Started" },
};

export function DomainMasteryGrid({ mastery }: DomainMasteryProps) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <h3 className="mb-3 text-sm font-medium">Domain Mastery</h3>
      <div className="grid grid-cols-2 gap-3">
        {mastery.map((m) => {
          const config = statusConfig[m.status];
          const Icon = config.icon;
          return (
            <Link
              key={m.domain}
              href={`/practice/domain/${m.domain}`}
              className="group rounded-lg border p-3 transition-colors hover:border-primary/30"
            >
              <div className="mb-2 flex items-center gap-3">
                <div
                  className="score-ring h-12 w-12 shrink-0"
                  style={{
                    background: m.status === "unseen"
                      ? "var(--muted)"
                      : `conic-gradient(${m.accuracy >= 70 ? "var(--success)" : m.accuracy >= 50 ? "var(--xp)" : "var(--danger)"} ${m.accuracy * 3.6}deg, var(--muted) 0deg)`,
                  }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-xs font-medium">
                    {m.status === "unseen" ? "—" : `${m.accuracy}%`}
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="truncate text-xs font-medium">{m.name}</div>
                  <div className={cn("flex items-center gap-1 text-[10px]", config.color)}>
                    <Icon className="h-3 w-3" />
                    {config.label}
                  </div>
                  {m.seen > 0 && (
                    <div className="text-[10px] text-muted-foreground">{m.correct}/{m.seen} correct</div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
