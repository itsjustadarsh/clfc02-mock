"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { QuizAttempt, DomainMastery, AchievementStore as AchievementStoreType, UserProfile } from "@/lib/types";
import { DOMAINS } from "@/lib/types";
import { getAttempts, getProfile, getAchievementStore, hasProfile } from "@/lib/storage";
import { getDomainMastery, getSuggestion, migrateExistingData, calculateXPForAttempt } from "@/lib/gamification";
import { getAllQuestions } from "@/lib/questions";
import { DataWarning } from "./data-warning";
import { XPBar } from "./xp-bar";
import { StreakDisplay } from "./streak-display";
import { DomainMasteryGrid } from "./domain-mastery";
import { WeakTopics } from "./weak-topics";
import { AchievementsShowcase } from "./achievement-card";
import { SuggestionCard } from "./suggestion-card";
import { cn } from "@/lib/utils";
import { History, Flame, Target, Star, Eye, LayoutDashboard } from "lucide-react";

export function DashboardContent() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [mastery, setMastery] = useState<DomainMastery[]>([]);
  const [achievementStore, setAchievementStore] = useState<AchievementStoreType>({});
  const [warningDismissed, setWarningDismissed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    migrateExistingData();
    const p = getProfile();
    const a = getAttempts();
    const questions = getAllQuestions();
    const m = getDomainMastery(questions);
    const store = getAchievementStore();

    setProfile(p);
    setAttempts(a);
    setMastery(m);
    setAchievementStore(store);
    setWarningDismissed(p.warningDismissed ?? false);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!profile || (!hasProfile() && attempts.length === 0)) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8 animate-fade-in">
        <div className="py-14 text-center">
          <LayoutDashboard className="mx-auto mb-3 h-8 w-8 text-muted-foreground/30" />
          <h2 className="text-base font-medium">Welcome!</h2>
          <p className="mb-4 text-sm text-muted-foreground">Complete your first quiz to start tracking progress.</p>
          <Link
            href="/practice"
            className="btn btn-primary inline-flex items-center gap-1.5 rounded-lg px-5 py-2 text-sm"
          >
            Start Practicing
          </Link>
        </div>
      </div>
    );
  }

  const suggestion = getSuggestion(profile, mastery);
  const today = new Date().toISOString().split("T")[0];
  const dailyProgress = profile.dailyProgressDate === today ? profile.dailyProgress : 0;
  const dailyGoalPct = Math.min((dailyProgress / profile.dailyGoal) * 100, 100);
  const recentAttempts = attempts.slice(0, 5);
  const trendData = attempts.slice(0, 20).reverse();
  const totalQs = attempts.reduce((s, a) => s + a.totalQuestions, 0);
  const avgScore = attempts.length > 0
    ? Math.round(attempts.reduce((s, a) => s + a.score, 0) / attempts.length)
    : 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 animate-fade-in">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <Link
          href="/history"
          className="flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <History className="h-3.5 w-3.5" />
          History
        </Link>
      </div>

      <div className="space-y-4">
        <DataWarning dismissed={warningDismissed} onDismiss={() => setWarningDismissed(true)} />
        <XPBar xp={profile.xp} />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex items-center gap-2 rounded-xl border bg-card p-3">
            <Flame className={cn("h-5 w-5", profile.streak > 0 ? "text-streak animate-streak-glow" : "text-muted-foreground")} />
            <div>
              <div className="text-lg font-semibold">{profile.streak}</div>
              <div className="text-[10px] text-muted-foreground">Day Streak</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl border bg-card p-3">
            <Target className="h-5 w-5 text-primary" />
            <div>
              <div className="text-lg font-semibold">{avgScore}%</div>
              <div className="text-[10px] text-muted-foreground">Avg Score</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl border bg-card p-3">
            <Star className="h-5 w-5 text-xp" />
            <div>
              <div className="text-lg font-semibold">{totalQs}</div>
              <div className="text-[10px] text-muted-foreground">Questions</div>
            </div>
          </div>
        </div>

        {/* Daily goal */}
        <div className="rounded-xl border bg-card p-4">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-medium">Daily Goal</span>
            <span className="text-muted-foreground">{dailyProgress}/{profile.dailyGoal} questions</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                dailyGoalPct >= 100 ? "bg-success" : "animate-shimmer"
              )}
              style={{ width: `${Math.max(dailyGoalPct, 2)}%` }}
            />
          </div>
          {dailyGoalPct >= 100 && (
            <p className="mt-1.5 text-[10px] text-success">Daily goal complete!</p>
          )}
        </div>

        <SuggestionCard text={suggestion.text} action={suggestion.action} href={suggestion.href} />
        <DomainMasteryGrid mastery={mastery} />
        <WeakTopics mastery={mastery} />
        <AchievementsShowcase store={achievementStore} />

        {/* Recent */}
        {recentAttempts.length > 0 && (
          <div className="rounded-xl border bg-card p-4">
            <h3 className="mb-3 text-sm font-medium">Recent Activity</h3>
            <div className="space-y-1.5">
              {recentAttempts.map((attempt) => {
                const date = new Date(attempt.date);
                const now = new Date();
                const diffMs = now.getTime() - date.getTime();
                const diffHrs = Math.floor(diffMs / 3600000);
                const diffDays = Math.floor(diffMs / 86400000);
                const timeAgo = diffHrs < 1 ? "just now" : diffHrs < 24 ? `${diffHrs}h ago` : `${diffDays}d ago`;

                const modeName =
                  attempt.mode === "exam" ? "Mock Exam"
                    : attempt.mode === "domain" ? `D${attempt.domain}: ${DOMAINS.find((d) => d.id === attempt.domain)?.shortName ?? ""}`
                    : "Quick Quiz";

                const xp = calculateXPForAttempt(attempt);

                return (
                  <div key={attempt.id} className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/30">
                    <div className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-medium",
                      attempt.passed ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
                    )}>
                      {attempt.score}%
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-medium">{modeName}</div>
                      <div className="text-[10px] text-muted-foreground">{timeAgo}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-xp">+{xp} XP</span>
                      <Link
                        href={`/practice/review/${attempt.id}`}
                        className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        <Eye className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Trend */}
        {trendData.length > 1 && (
          <div className="rounded-xl border bg-card p-4">
            <div className="mb-2 text-xs text-muted-foreground">Score Trend</div>
            <div className="flex items-end gap-1" style={{ height: "40px" }}>
              {trendData.map((a, i) => (
                <div
                  key={i}
                  className={cn("flex-1 rounded-t-sm", a.passed ? "bg-success/50" : "bg-danger/50")}
                  style={{ height: `${Math.max(a.score, 5)}%` }}
                  title={`${a.score}%`}
                />
              ))}
            </div>
            <div className="mt-1 flex justify-between text-[9px] text-muted-foreground">
              <span>Oldest</span>
              <span>Latest</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
