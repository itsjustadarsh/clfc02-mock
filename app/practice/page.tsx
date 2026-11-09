import Link from "next/link";
import { DOMAINS } from "@/lib/types";
import { ClipboardList, Timer, Zap, BookOpen, Layers } from "lucide-react";

export const metadata = { title: "Practice" };

export default function PracticePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 animate-fade-in">
      <h1 className="mb-6 text-2xl font-bold">Practice Tests</h1>

      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/practice/exam"
          className="card-hover flex flex-col gap-2 rounded-xl border bg-card p-4 transition-colors hover:border-primary/30"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ClipboardList className="h-4.5 w-4.5" />
          </div>
          <h2 className="text-sm font-semibold">Full Mock Exam</h2>
          <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
            <Timer className="h-3 w-3" />
            65 Qs · 90 min
          </div>
        </Link>

        <Link
          href="/practice/quick"
          className="card-hover flex flex-col gap-2 rounded-xl border bg-card p-4 transition-colors hover:border-green-500/30"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
            <Zap className="h-4.5 w-4.5" />
          </div>
          <h2 className="text-sm font-semibold">Quick Quiz</h2>
          <div className="flex items-center gap-1.5 text-xs text-green-500 font-medium">
            <Zap className="h-3 w-3" />
            10–30 Qs · Untimed
          </div>
        </Link>

        <Link
          href="/practice/flashcards"
          className="card-hover flex flex-col gap-2 rounded-xl border bg-card p-4 transition-colors hover:border-violet-500/30"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
            <Layers className="h-4.5 w-4.5" />
          </div>
          <h2 className="text-sm font-semibold">Flashcards</h2>
          <div className="flex items-center gap-1.5 text-xs text-violet-500 font-medium">
            <Layers className="h-3 w-3" />
            Flip & learn
          </div>
        </Link>

        <div className="flex flex-col gap-2 rounded-xl border bg-card p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
            <BookOpen className="h-4.5 w-4.5" />
          </div>
          <h2 className="text-sm font-semibold">Domain Practice</h2>
          <div className="text-xs text-muted-foreground">Pick a domain below</div>
        </div>
      </div>

      <h2 className="mb-3 text-lg font-semibold">By Domain</h2>
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
              className={`card-hover flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors ${colorClass.split(" ").slice(2).join(" ")}`}
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-base font-bold ${colorClass.split(" ").slice(0, 2).join(" ")}`}>
                {domain.id}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold">{domain.name}</h3>
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
