import Link from "next/link";
import { DOMAINS } from "@/lib/types";
import { ClipboardList, Timer, Zap, Layers, GraduationCap } from "lucide-react";

export const metadata = { title: "Practice" };

export default function PracticePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 animate-fade-in">
      <h1 className="mb-6 text-xl font-semibold">Practice Tests</h1>

      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/learn"
          className="card-glow group p-4 transition-transform hover:scale-[1.02]"
        >
          <GraduationCap className="mb-2 h-5 w-5 text-primary" />
          <h2 className="text-sm font-semibold">Lessons</h2>
          <p className="mt-1 text-xs text-primary">Step-by-step path</p>
        </Link>

        <Link
          href="/practice/exam"
          className="rounded-xl border bg-card p-4 transition-all hover:border-accent/30 hover:scale-[1.02]"
        >
          <ClipboardList className="mb-2 h-5 w-5 text-accent" />
          <h2 className="text-sm font-semibold">Full Mock Exam</h2>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Timer className="h-3 w-3" />
            65 Qs · 90 min
          </div>
        </Link>

        <Link
          href="/practice/quick"
          className="rounded-xl border bg-card p-4 transition-all hover:border-success/30 hover:scale-[1.02]"
        >
          <Zap className="mb-2 h-5 w-5 text-success" />
          <h2 className="text-sm font-semibold">Quick Quiz</h2>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Zap className="h-3 w-3" />
            10-30 Qs · Untimed
          </div>
        </Link>

        <Link
          href="/practice/flashcards"
          className="rounded-xl border bg-card p-4 transition-all hover:border-xp/30 hover:scale-[1.02]"
        >
          <Layers className="mb-2 h-5 w-5 text-xp" />
          <h2 className="text-sm font-semibold">Flashcards</h2>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Layers className="h-3 w-3" />
            Flip & learn
          </div>
        </Link>
      </div>

      <h2 className="mb-3 text-base font-semibold">By Domain</h2>
      <div className="grid gap-2 sm:grid-cols-2">
        {DOMAINS.map((domain) => {
          const accents: Record<string, string> = {
            blue: "text-cyan-500 bg-cyan-500/10 hover:border-cyan-500/30",
            red: "text-rose-500 bg-rose-500/10 hover:border-rose-500/30",
            green: "text-emerald-500 bg-emerald-500/10 hover:border-emerald-500/30",
            orange: "text-amber-500 bg-amber-500/10 hover:border-amber-500/30",
          };
          const accent = accents[domain.color] ?? accents.blue;
          const parts = accent.split(" ");

          return (
            <Link
              key={domain.id}
              href={`/practice/domain/${domain.id}`}
              className={`flex items-center gap-3 rounded-xl border bg-card p-4 transition-all hover:scale-[1.01] ${parts[2]}`}
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold ${parts[1]} ${parts[0]}`}>
                {domain.id}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium">{domain.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {domain.questionCount} Qs · {Math.round(domain.weight * 100)}%
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
