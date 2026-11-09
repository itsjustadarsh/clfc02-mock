import Link from "next/link";
import { BookOpen, ClipboardList, Award, Clock, HelpCircle, Target, Zap, Layers, ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 animate-fade-in">
      {/* Hero */}
      <div className="mb-10 text-center">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Award className="h-3.5 w-3.5" />
          AWS Certified Cloud Practitioner
        </div>
        <h1 className="mb-3 text-4xl font-bold tracking-tight sm:text-5xl">
          CLF-C02 Exam Prep
        </h1>
        <p className="mx-auto max-w-lg text-sm text-muted-foreground">
          1,050 practice questions. 4 domains. Flashcards. Free &amp; open source.
        </p>
        <div className="mt-5 flex justify-center gap-3">
          <Link
            href="/study"
            className="rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            Start Studying
          </Link>
          <Link
            href="/practice"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Practice Now
          </Link>
        </div>
      </div>

      {/* Stats strip */}
      <div className="mb-10 flex items-center justify-center gap-6 text-center text-sm sm:gap-10">
        <div>
          <div className="text-lg font-bold">65</div>
          <div className="text-xs text-muted-foreground">Questions</div>
        </div>
        <div className="h-6 w-px bg-border" />
        <div>
          <div className="text-lg font-bold">90 min</div>
          <div className="text-xs text-muted-foreground">Time Limit</div>
        </div>
        <div className="h-6 w-px bg-border" />
        <div>
          <div className="text-lg font-bold">70%</div>
          <div className="text-xs text-muted-foreground">To Pass</div>
        </div>
        <div className="h-6 w-px bg-border" />
        <div>
          <div className="text-lg font-bold">4</div>
          <div className="text-xs text-muted-foreground">Domains</div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/practice/exam"
          className="card-hover flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-primary/30"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ClipboardList className="h-4.5 w-4.5" />
          </div>
          <div>
            <div className="text-sm font-semibold">Mock Exam</div>
            <div className="text-xs text-muted-foreground">65 Qs · 90 min</div>
          </div>
        </Link>

        <Link
          href="/practice/quick"
          className="card-hover flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-green-500/30"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
            <Zap className="h-4.5 w-4.5" />
          </div>
          <div>
            <div className="text-sm font-semibold">Quick Quiz</div>
            <div className="text-xs text-muted-foreground">10–30 Qs · No timer</div>
          </div>
        </Link>

        <Link
          href="/practice/flashcards"
          className="card-hover flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-violet-500/30"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
            <Layers className="h-4.5 w-4.5" />
          </div>
          <div>
            <div className="text-sm font-semibold">Flashcards</div>
            <div className="text-xs text-muted-foreground">Flip & learn</div>
          </div>
        </Link>

        <Link
          href="/study"
          className="card-hover flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-blue-500/30"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
            <BookOpen className="h-4.5 w-4.5" />
          </div>
          <div>
            <div className="text-sm font-semibold">Study Material</div>
            <div className="text-xs text-muted-foreground">All 4 domains</div>
          </div>
        </Link>
      </div>

      {/* Domain cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { name: "Cloud Concepts", weight: 24, color: "bg-blue-500", questions: 187 },
          { name: "Security & Compliance", weight: 30, color: "bg-red-500", questions: 247 },
          { name: "Technology & Services", weight: 34, color: "bg-green-500", questions: 384 },
          { name: "Billing & Support", weight: 12, color: "bg-amber-500", questions: 232 },
        ].map((domain) => (
          <div key={domain.name} className="rounded-lg border bg-card p-3">
            <div className="mb-1.5 flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${domain.color}`} />
              <span className="text-xs font-medium">{domain.name}</span>
            </div>
            <div className="mb-1 flex items-end justify-between">
              <span className="text-xl font-bold">{domain.weight}%</span>
              <span className="text-xs text-muted-foreground">{domain.questions} Qs</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full ${domain.color}`}
                style={{ width: `${domain.weight}%`, maxWidth: "100%" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Repo link */}
      <div className="mt-8 text-center">
        <a
          href="https://github.com/itsjustadarsh/clfc02-mock"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ExternalLink className="h-3 w-3" />
          Open source — star on GitHub
        </a>
      </div>
    </div>
  );
}
