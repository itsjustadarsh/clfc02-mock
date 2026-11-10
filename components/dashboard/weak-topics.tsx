"use client";

import Link from "next/link";
import type { DomainMastery } from "@/lib/types";
import { AlertTriangle, ArrowRight } from "lucide-react";

interface WeakTopicsProps {
  mastery: DomainMastery[];
}

export function WeakTopics({ mastery }: WeakTopicsProps) {
  const weak = mastery
    .filter((m) => m.status === "weak" || (m.status === "improving" && m.accuracy < 80))
    .sort((a, b) => a.accuracy - b.accuracy);

  if (weak.length === 0) return null;

  return (
    <div className="rounded-xl border border-danger/15 bg-danger/5 p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium">
        <AlertTriangle className="h-4 w-4 text-danger" />
        Focus Areas
      </div>
      <div className="space-y-2">
        {weak.map((m) => (
          <Link
            key={m.domain}
            href={`/practice/domain/${m.domain}`}
            className="flex items-center justify-between rounded-lg border bg-card p-3 transition-colors hover:border-primary/30"
          >
            <div>
              <div className="text-sm font-medium">{m.name}</div>
              <div className="text-xs text-muted-foreground">
                {m.accuracy}% accuracy ({m.correct}/{m.seen})
              </div>
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-primary">
              Practice <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
