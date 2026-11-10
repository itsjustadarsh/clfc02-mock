"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { QuizAttempt, AchievementDef, XPResult } from "@/lib/types";
import { DOMAINS } from "@/lib/types";
import { getLevelProgress, getLevelUpMessage } from "@/lib/gamification";
import { playComplete, playLevelUp, playAchievement } from "@/lib/sounds";
import { fireCelebration, fireBurst, fireStars } from "@/lib/confetti";
import { Button3D } from "@/components/ui/button-3d";
import { RotateCcw, Eye, AlertTriangle, Sparkles, Trophy, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizResultsProps {
  attempt: QuizAttempt;
  onRetry?: () => void;
  xpResult?: XPResult | null;
  newAchievements?: AchievementDef[];
  encouragingMessage?: string;
}

export function QuizResults({
  attempt,
  onRetry,
  xpResult,
  newAchievements,
  encouragingMessage,
}: QuizResultsProps) {
  const passed = attempt.passed;
  const timePerQ = attempt.timeSpent > 0
    ? Math.round(attempt.timeSpent / attempt.totalQuestions)
    : 0;

  const [showXP, setShowXP] = useState(false);
  const [showLevel, setShowLevel] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);

  const levelInfo = xpResult ? getLevelProgress(xpResult.totalXP) : null;

  useEffect(() => {
    // Sound + confetti effects
    playComplete();
    if (passed) fireCelebration();
    else fireBurst();

    const t1 = setTimeout(() => setShowXP(true), 400);
    const t2 = setTimeout(() => {
      setShowLevel(true);
      if (xpResult?.leveledUp) {
        playLevelUp();
        fireStars();
      }
    }, 800);
    const t3 = setTimeout(() => {
      setShowAchievements(true);
      if (newAchievements && newAchievements.length > 0) playAchievement();
    }, 1200);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="mx-auto max-w-lg space-y-4 animate-fade-in">
      {/* Encouraging message */}
      {encouragingMessage && (
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-2 text-sm font-extrabold text-primary animate-celebrate">
            <Sparkles className="h-4 w-4" />
            {encouragingMessage}
          </div>
        </div>
      )}

      {/* Score ring */}
      <div className="text-center">
        <div
          className="score-ring mx-auto mb-3 h-28 w-28"
          style={{
            background: `conic-gradient(${passed ? "var(--success)" : "var(--danger)"} ${attempt.score * 3.6}deg, var(--muted) 0deg)`,
          }}
        >
          <div className="flex h-22 w-22 flex-col items-center justify-center rounded-full bg-background">
            <span className={cn("text-3xl font-extrabold", passed ? "text-success" : "text-danger")}>
              {attempt.score}%
            </span>
          </div>
        </div>
        <h2 className="text-xl font-extrabold">
          {passed ? "Congratulations!" : "Keep Practicing"}
        </h2>
        <p className="text-xs text-muted-foreground">
          {passed ? "You passed!" : "70% needed to pass."}
        </p>
      </div>

      {/* XP Earned */}
      {xpResult && showXP && (
        <div className="animate-xp-pop rounded-2xl border border-xp/20 bg-xp/5 p-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Star className="h-6 w-6 text-xp fill-xp" />
            <span className="text-3xl font-extrabold text-xp">+{xpResult.newXP} XP</span>
          </div>
          {xpResult.leveledUp && (
            <div className="mt-2 animate-level-up">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-4 py-1.5 text-sm font-extrabold text-primary">
                <Trophy className="h-4 w-4" />
                {getLevelUpMessage()}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Level Progress */}
      {levelInfo && showLevel && (
        <div className="animate-slide-up rounded-2xl border bg-card p-4">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-extrabold">
              Lv.{levelInfo.current.level} {levelInfo.current.title}
            </span>
            {levelInfo.next && (
              <span className="text-muted-foreground">
                {levelInfo.xpInLevel}/{levelInfo.xpForLevel} XP
              </span>
            )}
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="animate-shimmer h-full rounded-full"
              style={{ width: `${Math.max(levelInfo.progress * 100, 2)}%` }}
            />
          </div>
          {levelInfo.next && (
            <p className="mt-1.5 text-[10px] text-muted-foreground">
              {levelInfo.xpForLevel - levelInfo.xpInLevel} XP to {levelInfo.next.title}
            </p>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="rounded-2xl border bg-card p-4">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-xl font-extrabold">
              {attempt.correctCount}/{attempt.totalQuestions}
            </div>
            <div className="text-[10px] text-muted-foreground">Correct</div>
          </div>
          <div>
            <div className="text-xl font-extrabold">
              {Math.floor(attempt.timeSpent / 60)}m {attempt.timeSpent % 60}s
            </div>
            <div className="text-[10px] text-muted-foreground">Time</div>
          </div>
          <div>
            <div className="text-xl font-extrabold">{timePerQ}s</div>
            <div className="text-[10px] text-muted-foreground">Per Question</div>
          </div>
        </div>
        {attempt.violations && attempt.violations > 0 && (
          <div className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-amber-500/10 px-3 py-1.5 text-xs text-amber-500">
            <AlertTriangle className="h-3 w-3" />
            {attempt.violations} tab switch{attempt.violations !== 1 ? "es" : ""} detected
          </div>
        )}
      </div>

      {/* Achievements unlocked */}
      {newAchievements && newAchievements.length > 0 && showAchievements && (
        <div className="space-y-2">
          {newAchievements.map((achievement, i) => (
            <div
              key={achievement.id}
              className="animate-slide-up flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-3"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-extrabold">{achievement.title}</div>
                <div className="text-xs text-muted-foreground">{achievement.description}</div>
              </div>
              <div className="ml-auto text-xs font-extrabold text-primary">Unlocked!</div>
            </div>
          ))}
        </div>
      )}

      {/* Domain breakdown */}
      <div className="rounded-2xl border bg-card p-4">
        <h3 className="mb-3 text-sm font-extrabold">Domain Breakdown</h3>
        <div className="space-y-2.5">
          {attempt.domainBreakdown.map((ds) => {
            const domain = DOMAINS.find((d) => d.id === ds.domain);
            const pct = ds.total > 0 ? Math.round((ds.correct / ds.total) * 100) : 0;
            return (
              <div key={ds.domain}>
                <div className="mb-0.5 flex items-center justify-between text-xs">
                  <span className="font-bold">{domain?.shortName ?? `D${ds.domain}`}</span>
                  <span className={cn("font-bold", pct >= 70 ? "text-success" : "text-danger")}>
                    {ds.correct}/{ds.total} ({pct}%)
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      pct >= 70 ? "bg-success" : "bg-danger"
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Link href={`/practice/review/${attempt.id}`} className="flex-1">
          <Button3D variant="ghost" size="md" className="w-full flex items-center justify-center gap-1.5">
            <Eye className="h-4 w-4" />
            Review
          </Button3D>
        </Link>
        {onRetry && (
          <Button3D variant="primary" size="md" onClick={onRetry} className="flex-1 flex items-center justify-center gap-1.5">
            <RotateCcw className="h-4 w-4" />
            Try Again
          </Button3D>
        )}
      </div>
    </div>
  );
}
