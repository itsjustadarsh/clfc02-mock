import Link from "next/link";
import { DOMAINS } from "@/lib/types";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "Study" };

const accents: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "bg-cyan-500/10", text: "text-cyan-500", border: "hover:border-cyan-500/30" },
  red: { bg: "bg-rose-500/10", text: "text-rose-500", border: "hover:border-rose-500/30" },
  green: { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "hover:border-emerald-500/30" },
  orange: { bg: "bg-amber-500/10", text: "text-amber-500", border: "hover:border-amber-500/30" },
};

export default function StudyPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 animate-fade-in">
      <h1 className="mb-6 text-xl font-semibold">Study Material</h1>

      <div className="grid gap-2">
        {DOMAINS.map((domain) => {
          const a = accents[domain.color] ?? accents.blue;
          return (
            <Link
              key={domain.id}
              href={`/study/${domain.id}`}
              className={`group flex items-center gap-4 rounded-xl border bg-card p-4 transition-all hover:scale-[1.005] ${a.border}`}
            >
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${a.bg} ${a.text}`}>
                {domain.id}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-medium">{domain.name}</h2>
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${a.bg} ${a.text}`}>
                    {Math.round(domain.weight * 100)}%
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{domain.questionCount} questions</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
