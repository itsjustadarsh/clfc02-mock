"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Award, Flame, Star, Database, GraduationCap, ClipboardList, Zap, Layers, ArrowRight } from "lucide-react";
import { hasProfile, getProfile } from "@/lib/storage";
import { migrateExistingData, getLevelProgress } from "@/lib/gamification";
import { Button3D } from "@/components/ui/button-3d";
import type { UserProfile } from "@/lib/types";

export default function Home() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    migrateExistingData();
    if (hasProfile()) setProfile(getProfile());
    setMounted(true);
  }, []);

  const levelInfo = profile ? getLevelProgress(profile.xp) : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 animate-fade-in">
      {/* Hero */}
      <div className="mb-14 text-center">
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          <Award className="h-3 w-3" />
          AWS Certified Cloud Practitioner
        </div>

        <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-5xl">
          {mounted && profile ? (
            "Welcome back"
          ) : (
            <>
              Master the{" "}
              <span className="text-gradient">CLF-C02</span>
            </>
          )}
        </h1>

        <p className="mx-auto max-w-md text-sm text-muted-foreground leading-relaxed">
          1,050 practice questions across 4 domains. Track progress, find weak spots, and pass with confidence.
        </p>

        {mounted && profile && levelInfo && (
          <div className="mx-auto mt-5 flex items-center justify-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 font-medium text-primary">
              <Star className="h-3.5 w-3.5" />
              Lv.{levelInfo.current.level}
            </span>
            {profile.streak > 0 && (
              <span className="flex items-center gap-1 font-medium text-streak">
                <Flame className="h-3.5 w-3.5 animate-streak-glow" />
                {profile.streak}d
              </span>
            )}
            <span className="font-medium text-xp">
              {profile.xp.toLocaleString()} XP
            </span>
          </div>
        )}

        <div className="mt-8 flex justify-center gap-3">
          <Link href="/learn">
            <Button3D variant="primary" size="lg" className="gap-2">
              <GraduationCap className="h-4 w-4" />
              {mounted && profile ? "Continue Learning" : "Start Learning"}
            </Button3D>
          </Link>
          <Link href={mounted && profile ? "/dashboard" : "/practice"}>
            <Button3D variant="ghost" size="lg">
              {mounted && profile ? "Dashboard" : "Practice Tests"}
            </Button3D>
          </Link>
        </div>
      </div>

      {/* Exam info strip */}
      <div className="mb-12 flex items-center justify-center gap-8 text-center">
        {[
          { value: "65", label: "Questions" },
          { value: "90 min", label: "Time Limit" },
          { value: "70%", label: "To Pass" },
          { value: "4", label: "Domains" },
        ].map((stat, i) => (
          <div key={i}>
            <div className="text-lg font-semibold">{stat.value}</div>
            <div className="text-[11px] text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Feature cards */}
      <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/learn" className="card-glow group p-4 transition-transform hover:scale-[1.02]">
          <GraduationCap className="mb-3 h-5 w-5 text-primary" />
          <h3 className="text-sm font-semibold">Lessons</h3>
          <p className="mt-1 text-xs text-muted-foreground">Step-by-step learning path</p>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary transition-all group-hover:gap-1.5">
            Start <ArrowRight className="h-3 w-3" />
          </span>
        </Link>

        <Link href="/practice/exam" className="rounded-xl border bg-card p-4 transition-all hover:border-accent/30 hover:scale-[1.02]">
          <ClipboardList className="mb-3 h-5 w-5 text-accent" />
          <h3 className="text-sm font-semibold">Mock Exam</h3>
          <p className="mt-1 text-xs text-muted-foreground">65 Qs · 90 min · Timed</p>
        </Link>

        <Link href="/practice/quick" className="rounded-xl border bg-card p-4 transition-all hover:border-success/30 hover:scale-[1.02]">
          <Zap className="mb-3 h-5 w-5 text-success" />
          <h3 className="text-sm font-semibold">Quick Quiz</h3>
          <p className="mt-1 text-xs text-muted-foreground">10–30 Qs · Untimed</p>
        </Link>

        <Link href="/practice/flashcards" className="rounded-xl border bg-card p-4 transition-all hover:border-xp/30 hover:scale-[1.02]">
          <Layers className="mb-3 h-5 w-5 text-xp" />
          <h3 className="text-sm font-semibold">Flashcards</h3>
          <p className="mt-1 text-xs text-muted-foreground">Flip & learn key concepts</p>
        </Link>
      </div>

      {/* Domains */}
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { name: "Cloud Concepts", weight: 24, accent: "bg-cyan-500/10 text-cyan-500", qs: 187 },
          { name: "Security", weight: 30, accent: "bg-rose-500/10 text-rose-500", qs: 247 },
          { name: "Technology", weight: 34, accent: "bg-emerald-500/10 text-emerald-500", qs: 384 },
          { name: "Billing", weight: 12, accent: "bg-violet-500/10 text-violet-500", qs: 232 },
        ].map((d) => (
          <div key={d.name} className="rounded-xl border bg-card p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{d.name}</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${d.accent}`}>{d.weight}%</span>
            </div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
              <div className={`h-full rounded-full ${d.accent.split(" ")[0].replace("/10", "")}`} style={{ width: `${d.weight}%` }} />
            </div>
            <div className="mt-1.5 text-[10px] text-muted-foreground">{d.qs} questions</div>
          </div>
        ))}
      </div>

      {/* Data warning */}
      {mounted && !profile && (
        <div className="mt-10 flex items-center justify-center gap-2 rounded-lg border border-primary/10 bg-primary/5 px-4 py-3 text-xs text-muted-foreground">
          <Database className="h-3.5 w-3.5 text-primary" />
          Progress stored locally — <strong className="text-foreground">don't clear browser data</strong>.
        </div>
      )}

      {/* GitHub */}
      <div className="mt-8 text-center">
        <a
          href="https://github.com/itsjustadarsh/clfc02-mock"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          Open source on GitHub
        </a>
      </div>
    </div>
  );
}
