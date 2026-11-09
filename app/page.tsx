import Link from "next/link";
import { BookOpen, ClipboardList, Award, Clock, HelpCircle, Target } from "lucide-react";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          <Award className="h-4 w-4" />
          AWS Certified Cloud Practitioner
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          CLF-C02 Exam Prep
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Master the AWS Cloud Practitioner exam with 1,050 practice questions and
          comprehensive study material covering all four domains.
        </p>
      </div>

      <div className="mb-12 grid gap-4 sm:grid-cols-2">
        <Link
          href="/study"
          className="group flex flex-col gap-3 rounded-xl border bg-card p-6 transition-colors hover:border-primary/50 hover:bg-primary/5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Study Material</h2>
            <p className="text-sm text-muted-foreground">
              Concise, exam-focused content covering all services and concepts across 4 domains.
            </p>
          </div>
        </Link>

        <Link
          href="/practice"
          className="group flex flex-col gap-3 rounded-xl border bg-card p-6 transition-colors hover:border-primary/50 hover:bg-primary/5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
            <ClipboardList className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Practice Tests</h2>
            <p className="text-sm text-muted-foreground">
              1,050 questions with detailed explanations. Full mock exams, domain practice, and quick quizzes.
            </p>
          </div>
        </Link>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold">Exam Overview</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-start gap-3">
            <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
            <div>
              <div className="font-medium">65 Questions</div>
              <div className="text-sm text-muted-foreground">Multiple choice &amp; multi-select</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
            <div>
              <div className="font-medium">90 Minutes</div>
              <div className="text-sm text-muted-foreground">~1.4 min per question</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Target className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
            <div>
              <div className="font-medium">700 / 1000</div>
              <div className="text-sm text-muted-foreground">Passing score (~70%)</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Award className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
            <div>
              <div className="font-medium">4 Domains</div>
              <div className="text-sm text-muted-foreground">Cloud, Security, Tech, Billing</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { name: "Cloud Concepts", weight: "24%", color: "bg-blue-500", questions: 187 },
          { name: "Security & Compliance", weight: "30%", color: "bg-red-500", questions: 247 },
          { name: "Technology & Services", weight: "34%", color: "bg-green-500", questions: 384 },
          { name: "Billing & Support", weight: "12%", color: "bg-amber-500", questions: 232 },
        ].map((domain) => (
          <div key={domain.name} className="rounded-lg border bg-card p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className={`h-2.5 w-2.5 rounded-full ${domain.color}`} />
              <span className="text-sm font-medium">{domain.name}</span>
            </div>
            <div className="text-2xl font-bold">{domain.weight}</div>
            <div className="text-sm text-muted-foreground">{domain.questions} questions</div>
          </div>
        ))}
      </div>
    </div>
  );
}
