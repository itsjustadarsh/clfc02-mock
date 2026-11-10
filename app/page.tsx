"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, ClipboardList, Award, Zap, Layers, ExternalLink, Flame, Star, Database, GraduationCap } from "lucide-react";
import { hasProfile, getProfile } from "@/lib/storage";
import { migrateExistingData, getLevelProgress } from "@/lib/gamification";
import { Button3D } from "@/components/ui/button-3d";
import type { UserProfile } from "@/lib/types";

export default function Home() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    migrateExistingData();
    if (hasProfile()) {
      setProfile(getProfile());
    }
    setMounted(true);
  }, []);

  const levelInfo = profile ? getLevelProgress(profile.xp) : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 animate-fade-in">
      {/* Hero */}
      <div className="mb-10 text-center">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary">
          <Award className="h-3.5 w-3.5" />
          AWS Certified Cloud Practitioner
        </div>
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
          {mounted && profile ? "Continue Your Journey" : "CLF-C02 Exam Prep"}
        </h1>
        <p className="mx-auto max-w-lg text-sm text-muted-foreground">
          1,050 practice questions. 4 domains. Flashcards. Free &amp; open source.
        </p>

        {/* Returning user stats */}
        {mounted && profile && levelInfo && (
          <div className="mx-auto mt-4 flex max-w-sm items-center justify-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-extrabold text-primary">
              <Star className="h-3.5 w-3.5 text-xp" />
              Lv.{levelInfo.current.level} {levelInfo.current.title}
            </div>
            {profile.streak > 0 && (
              <div className="flex items-center gap-1 rounded-full bg-streak/10 px-3 py-1.5 text-xs font-extrabold text-streak">
                <Flame className="h-3.5 w-3.5 animate-streak-glow" />
                {profile.streak} day streak
              </div>
            )}
            <div className="flex items-center gap-1 rounded-full bg-xp/10 px-3 py-1.5 text-xs font-extrabold text-xp">
              <Star className="h-3 w-3" />
              {profile.xp.toLocaleString()} XP
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-center gap-3">
          {mounted && profile ? (
            <>
              <Link href="/dashboard">
                <Button3D variant="ghost" size="lg">Dashboard</Button3D>
              </Link>
              <Link href="/learn">
                <Button3D variant="primary" size="lg" className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Start Lesson
                </Button3D>
              </Link>
            </>
          ) : (
            <>
              <Link href="/study">
                <Button3D variant="ghost" size="lg">Start Studying</Button3D>
              </Link>
              <Link href="/learn">
                <Button3D variant="primary" size="lg" className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Start Learning
                </Button3D>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Stats strip */}
      <div className="mb-10 flex items-center justify-center gap-6 text-center text-sm sm:gap-10">
        <div>
          <div className="text-lg font-extrabold">65</div>
          <div className="text-xs text-muted-foreground">Questions</div>
        </div>
        <div className="h-6 w-px bg-border" />
        <div>
          <div className="text-lg font-extrabold">90 min</div>
          <div className="text-xs text-muted-foreground">Time Limit</div>
        </div>
        <div className="h-6 w-px bg-border" />
        <div>
          <div className="text-lg font-extrabold">70%</div>
          <div className="text-xs text-muted-foreground">To Pass</div>
        </div>
        <div className="h-6 w-px bg-border" />
        <div>
          <div className="text-lg font-extrabold">4</div>
          <div className="text-xs text-muted-foreground">Domains</div>
        </div>
      </div>

      {/* Quick actions — 3D style cards */}
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/learn"
          className="card-hover flex items-center gap-3 rounded-2xl border-2 border-primary/30 bg-card p-4 shadow-[0_4px_0_#7c22ce30] transition-all hover:translate-y-[-2px]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-extrabold">Lessons</div>
            <div className="text-xs text-muted-foreground">Step-by-step path</div>
          </div>
        </Link>

        <Link
          href="/practice/exam"
          className="card-hover flex items-center gap-3 rounded-2xl border bg-card p-4 shadow-[0_4px_0_var(--border)] transition-all hover:translate-y-[-2px]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ClipboardList className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-extrabold">Mock Exam</div>
            <div className="text-xs text-muted-foreground">65 Qs · 90 min</div>
          </div>
        </Link>

        <Link
          href="/practice/quick"
          className="card-hover flex items-center gap-3 rounded-2xl border bg-card p-4 shadow-[0_4px_0_var(--border)] transition-all hover:translate-y-[-2px]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-extrabold">Quick Quiz</div>
            <div className="text-xs text-muted-foreground">10-30 Qs · No timer</div>
          </div>
        </Link>

        <Link
          href="/practice/flashcards"
          className="card-hover flex items-center gap-3 rounded-2xl border bg-card p-4 shadow-[0_4px_0_var(--border)] transition-all hover:translate-y-[-2px]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-extrabold">Flashcards</div>
            <div className="text-xs text-muted-foreground">Flip & learn</div>
          </div>
        </Link>
      </div>

      {/* Domain cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { name: "Cloud Concepts", weight: 24, color: "bg-blue-500", shadow: "shadow-[0_3px_0_#2563eb]", questions: 187 },
          { name: "Security & Compliance", weight: 30, color: "bg-red-500", shadow: "shadow-[0_3px_0_#dc2626]", questions: 247 },
          { name: "Technology & Services", weight: 34, color: "bg-green-500", shadow: "shadow-[0_3px_0_#16a34a]", questions: 384 },
          { name: "Billing & Support", weight: 12, color: "bg-purple-500", shadow: "shadow-[0_3px_0_#7c3aed]", questions: 232 },
        ].map((domain) => (
          <div key={domain.name} className={`rounded-2xl border bg-card p-3 ${domain.shadow}`}>
            <div className="mb-1.5 flex items-center gap-2">
              <div className={`h-2.5 w-2.5 rounded-full ${domain.color}`} />
              <span className="text-xs font-bold">{domain.name}</span>
            </div>
            <div className="mb-1 flex items-end justify-between">
              <span className="text-xl font-extrabold">{domain.weight}%</span>
              <span className="text-xs text-muted-foreground">{domain.questions} Qs</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full ${domain.color}`}
                style={{ width: `${domain.weight}%`, maxWidth: "100%" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Data warning for new users */}
      {mounted && !profile && (
        <div className="mt-8 flex items-center justify-center gap-2 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-xs text-muted-foreground">
          <Database className="h-4 w-4 text-primary" />
          <span>Your progress is stored locally — <strong className="text-foreground">don&apos;t clear your browser data</strong> or you&apos;ll lose everything.</span>
        </div>
      )}

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
