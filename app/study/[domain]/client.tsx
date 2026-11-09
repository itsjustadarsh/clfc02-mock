"use client";

import Link from "next/link";
import { DOMAINS } from "@/lib/types";
import type { StudyTopic } from "@/lib/types";
import { TopicSection } from "@/components/study/topic-section";
import { ArrowLeft, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

async function loadStudyData(domainId: number): Promise<StudyTopic[]> {
  switch (domainId) {
    case 1:
      return (await import("@/data/study/domain1")).domain1Topics;
    case 2:
      return (await import("@/data/study/domain2")).domain2Topics;
    case 3:
      return (await import("@/data/study/domain3")).domain3Topics;
    case 4:
      return (await import("@/data/study/domain4")).domain4Topics;
    default:
      return [];
  }
}

export function StudyDomainClient({ domainId }: { domainId: number }) {
  const domain = DOMAINS.find((d) => d.id === domainId);
  const [topics, setTopics] = useState<StudyTopic[]>([]);
  const [activeTopic, setActiveTopic] = useState<string>("");

  useEffect(() => {
    loadStudyData(domainId).then((data) => {
      setTopics(data);
      if (data.length > 0) setActiveTopic(data[0].slug);
    });
  }, [domainId]);

  if (!domain) {
    return (
      <div className="px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Domain not found</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <Link
        href="/study"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        All Domains
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Domain {domain.id}: {domain.name}
        </h1>
        <p className="mt-1 text-muted-foreground">
          {Math.round(domain.weight * 100)}% of exam &middot; {domain.description}
        </p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar TOC - desktop only */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-20">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Topics
            </p>
            <nav className="space-y-0.5">
              {topics.map((topic) => (
                <a
                  key={topic.slug}
                  href={`#${topic.slug}`}
                  onClick={() => setActiveTopic(topic.slug)}
                  className={cn(
                    "block rounded-lg px-3 py-1.5 text-sm transition-colors",
                    activeTopic === topic.slug
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {topic.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="min-w-0 flex-1 space-y-8">
          {topics.map((topic) => (
            <div key={topic.slug} id={topic.slug}>
              <h2 className="mb-4 text-xl font-bold">{topic.title}</h2>
              <div className="space-y-3">
                {topic.sections.map((section, i) => (
                  <TopicSection key={i} section={section} />
                ))}
              </div>
            </div>
          ))}

          {topics.length > 0 && (
            <div className="rounded-xl border bg-primary/5 p-6 text-center">
              <h3 className="mb-2 text-lg font-semibold">Ready to practice?</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Test your knowledge of {domain.name} with practice questions.
              </p>
              <Link
                href={`/practice/domain/${domain.id}`}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 font-medium text-primary-foreground hover:bg-primary/90"
              >
                <ClipboardList className="h-4 w-4" />
                Practice Domain {domain.id}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
