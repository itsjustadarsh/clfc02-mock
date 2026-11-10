import Link from "next/link";
import { DOMAINS } from "@/lib/types";
import { ClipboardList, Timer, Zap, BookOpen, Layers, GraduationCap } from "lucide-react";

export const metadata = { title: "Practice" };

export default function PracticePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 animate-fade-in">
      <h1 className="mb-6 text-2xl font-extrabold">Practice Tests</h1>

      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/learn"
          className="flex flex-col gap-2 rounded-2xl border-2 border-primary/30 bg-card p-4 shadow-[0_4px_0_#7c22ce30] transition-all hover:translate-y-[-2px] active:translate-y-0 active:shadow-none"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <GraduationCap className="h-5 w-5" />
          </div>
          <h2 className="text-sm font-extrabold">Lessons</h2>
          <div className="flex items-center gap-1.5 text-xs text-primary font-bold">
            <GraduationCap className="h-3 w-3" />
            Step-by-step path
          </div>
        </Link>

        <Link
          href="/practice/exam"
          className="flex flex-col gap-2 rounded-2xl border bg-card p-4 shadow-[0_4px_0_var(--border)] transition-all hover:translate-y-[-2px] active:translate-y-0 active:shadow-none"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ClipboardList className="h-5 w-5" />
          </div>
          <h2 className="text-sm font-extrabold">Full Mock Exam</h2>
          <div className="flex items-center gap-1.5 text-xs text-primary font-bold">
            <Timer className="h-3 w-3" />
            65 Qs · 90 min
          </div>
        </Link>

        <Link
          href="/practice/quick"
          className="flex flex-col gap-2 rounded-2xl border bg-card p-4 shadow-[0_4px_0_var(--border)] transition-all hover:translate-y-[-2px] active:translate-y-0 active:shadow-none"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
            <Zap className="h-5 w-5" />
          </div>
          <h2 className="text-sm font-extrabold">Quick Quiz</h2>
          <div className="flex items-center gap-1.5 text-xs text-green-500 font-bold">
            <Zap className="h-3 w-3" />
            10-30 Qs · Untimed
          </div>
        </Link>

        <Link
          href="/practice/flashcards"
          className="flex flex-col gap-2 rounded-2xl border bg-card p-4 shadow-[0_4px_0_var(--border)] transition-all hover:translate-y-[-2px] active:translate-y-0 active:shadow-none"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
            <Layers className="h-5 w-5" />
          </div>
          <h2 className="text-sm font-extrabold">Flashcards</h2>
          <div className="flex items-center gap-1.5 text-xs text-violet-500 font-bold">
            <Layers className="h-3 w-3" />
            Flip & learn
          </div>
        </Link>
      </div>

      <h2 className="mb-3 text-lg font-extrabold">By Domain</h2>
      <div className="grid gap-2 sm:grid-cols-2">
        {DOMAINS.map((domain) => {
          const colors: Record<string, string> = {
            blue: "bg-blue-500/10 text-blue-500 hover:border-blue-500/40",
            red: "bg-red-500/10 text-red-500 hover:border-red-500/40",
            green: "bg-green-500/10 text-green-500 hover:border-green-500/40",
            orange: "bg-amber-500/10 text-amber-500 hover:border-amber-500/40",
          };
          const colorClass = colors[domain.color] ?? colors.blue;

          return (
            <Link
              key={domain.id}
              href={`/practice/domain/${domain.id}`}
              className={`flex items-center gap-3 rounded-2xl border bg-card p-4 shadow-[0_3px_0_var(--border)] transition-all hover:translate-y-[-2px] active:translate-y-0 active:shadow-none ${colorClass.split(" ").slice(2).join(" ")}`}
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-base font-extrabold ${colorClass.split(" ").slice(0, 2).join(" ")}`}>
                {domain.id}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-extrabold">{domain.name}</h3>
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
