import Link from "next/link";
import { DOMAINS } from "@/lib/types";
import { ClipboardList, Timer, Zap, BookOpen } from "lucide-react";

export const metadata = { title: "Practice" };

export default function PracticePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Practice Tests</h1>
      <p className="mb-8 text-muted-foreground">
        Choose a practice mode. 1,050 questions with detailed explanations.
      </p>

      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        <Link
          href="/practice/exam"
          className="flex flex-col gap-3 rounded-xl border bg-card p-6 transition-colors hover:border-primary/50 hover:bg-primary/5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ClipboardList className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-semibold">Full Mock Exam</h2>
          <p className="text-sm text-muted-foreground">
            65 questions, 90-minute timer. Weighted by domain like the real exam.
          </p>
          <div className="mt-auto flex items-center gap-2 text-sm text-primary font-medium">
            <Timer className="h-4 w-4" />
            90 minutes
          </div>
        </Link>

        <Link
          href="/practice/quick"
          className="flex flex-col gap-3 rounded-xl border bg-card p-6 transition-colors hover:border-primary/50 hover:bg-primary/5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
            <Zap className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-semibold">Quick Quiz</h2>
          <p className="text-sm text-muted-foreground">
            10, 15, or 20 random questions from all domains. No timer.
          </p>
          <div className="mt-auto flex items-center gap-2 text-sm text-green-500 font-medium">
            <Zap className="h-4 w-4" />
            Untimed
          </div>
        </Link>

        <div className="flex flex-col gap-3 rounded-xl border bg-card p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
            <BookOpen className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-semibold">Domain Practice</h2>
          <p className="text-sm text-muted-foreground">
            Focus on a specific domain. Pick below.
          </p>
        </div>
      </div>

      <h2 className="mb-4 text-xl font-semibold">Practice by Domain</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {DOMAINS.map((domain) => {
          const colors: Record<string, string> = {
            blue: "bg-blue-500/10 text-blue-500 hover:border-blue-500/50",
            red: "bg-red-500/10 text-red-500 hover:border-red-500/50",
            green: "bg-green-500/10 text-green-500 hover:border-green-500/50",
            orange: "bg-amber-500/10 text-amber-500 hover:border-amber-500/50",
          };
          const colorClass = colors[domain.color] ?? colors.blue;

          return (
            <Link
              key={domain.id}
              href={`/practice/domain/${domain.id}`}
              className={`flex items-center gap-4 rounded-xl border bg-card p-5 transition-colors ${colorClass.split(" ").slice(2).join(" ")}`}
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg text-lg font-bold ${colorClass.split(" ").slice(0, 2).join(" ")}`}>
                {domain.id}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold">{domain.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {domain.questionCount} questions &middot; {Math.round(domain.weight * 100)}% of exam
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
