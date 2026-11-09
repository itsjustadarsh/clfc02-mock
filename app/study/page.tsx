import Link from "next/link";
import { DOMAINS } from "@/lib/types";
import { BookOpen, ArrowRight } from "lucide-react";

export const metadata = { title: "Study" };

const domainColors: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "bg-blue-500/10", text: "text-blue-500", border: "hover:border-blue-500/50" },
  red: { bg: "bg-red-500/10", text: "text-red-500", border: "hover:border-red-500/50" },
  green: { bg: "bg-green-500/10", text: "text-green-500", border: "hover:border-green-500/50" },
  orange: { bg: "bg-amber-500/10", text: "text-amber-500", border: "hover:border-amber-500/50" },
};

export default function StudyPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Study Material</h1>
        <p className="text-muted-foreground">
          Comprehensive, concise content covering every topic on the CLF-C02 exam.
          Organized by the 4 exam domains.
        </p>
      </div>

      <div className="grid gap-4">
        {DOMAINS.map((domain) => {
          const colors = domainColors[domain.color] ?? domainColors.blue;
          return (
            <Link
              key={domain.id}
              href={`/study/${domain.id}`}
              className={`group flex items-center gap-5 rounded-xl border bg-card p-6 transition-colors ${colors.border}`}
            >
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-xl font-bold ${colors.bg} ${colors.text}`}
              >
                {domain.id}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">{domain.name}</h2>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${colors.bg} ${colors.text}`}>
                    {Math.round(domain.weight * 100)}%
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{domain.description}</p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>
          );
        })}
      </div>

      <div className="mt-8 rounded-xl border bg-card p-6">
        <h2 className="mb-3 text-lg font-semibold">Study Tips</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>Focus on <strong className="text-foreground">Domain 2 (Security)</strong> and <strong className="text-foreground">Domain 3 (Technology)</strong> — they make up 64% of the exam.</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>The <strong className="text-foreground">Shared Responsibility Model</strong> is the single most tested concept.</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>Know the differences between services: Security Groups vs NACLs, S3 storage classes, Support Plans, EC2 purchasing options.</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>After studying a domain, immediately practice it using the <strong className="text-foreground">Domain Practice</strong> mode.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
