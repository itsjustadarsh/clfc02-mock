import Link from "next/link";
import { DOMAINS } from "@/lib/types";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "Study" };

const domainColors: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "bg-blue-500/10", text: "text-blue-500", border: "hover:border-blue-500/40" },
  red: { bg: "bg-red-500/10", text: "text-red-500", border: "hover:border-red-500/40" },
  green: { bg: "bg-green-500/10", text: "text-green-500", border: "hover:border-green-500/40" },
  orange: { bg: "bg-amber-500/10", text: "text-amber-500", border: "hover:border-amber-500/40" },
};

export default function StudyPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 animate-fade-in">
      <h1 className="mb-6 text-2xl font-bold">Study Material</h1>

      <div className="grid gap-3">
        {DOMAINS.map((domain) => {
          const colors = domainColors[domain.color] ?? domainColors.blue;
          return (
            <Link
              key={domain.id}
              href={`/study/${domain.id}`}
              className={`card-hover group flex items-center gap-4 rounded-xl border bg-card p-4 transition-colors ${colors.border}`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-base font-bold ${colors.bg} ${colors.text}`}
              >
                {domain.id}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold">{domain.name}</h2>
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${colors.bg} ${colors.text}`}>
                    {Math.round(domain.weight * 100)}%
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{domain.questionCount} questions</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
