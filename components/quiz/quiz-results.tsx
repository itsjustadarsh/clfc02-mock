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
  const timePerQ = attempt.timeSpent > 0 ? Math.round(attempt.timeSpent / attempt.totalQuestions) : 0;

  const [showXP, setShowXP] = useState(false);
  const [showLevel, setShowLevel] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);

  const levelInfo = xpResult ? getLevelProgress(xpResult.totalXP) : null;

  useEffect(() => {
    playComplete();
    if (passed) fireCelebration();
    else fireBurst();

    const t1 = setTimeout(() => setShowXP(true), 400);
    const t2 = setTimeout(() => {
      setShowLevel(true);
      if (xpResult?.leveledUp) { playLevelUp(); fireStars(); }
    }, 800);
    const t3 = setTimeout(() => {
      setShowAchievements(true);
      if (newAchievements && newAchievements.length > 0) playAchievement();
    }, 1200);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="mx-auto max-w-lg space-y-4 animate-fade-in">
      {encouragingMessage && (
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary animate-celebrate">
            <Sparkles className="h-4 w-4" />
            {encouragingMessage}
          </div>
        </div>
      )}

      {/* Score */}
      <div className="text-center">
        <div
          className="score-ring mx-auto mb-3 h-24 w-24"
          style={{
            background: `conic-gradient(${passed ? "var(--success)" : "var(--danger)"} ${attempt.score * 3.6}deg, var(--muted) 0deg)`,
          }}
        >
          <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-background">
            <span className={cn("text-2xl font-bold", passed ? "text-success" : "text-danger")}>
              {attempt.score}%
            </span>
          </div>
        </div>
        <h2 className="text-lg font-semibold">{passed ? "Congratulations!" : "Keep Practicing"}</h2>
        <p className="text-xs text-muted-foreground">{passed ? "You passed!" : "70% needed to pass."}</p>
      </div>

      {/* XP */}
      {xpResult && showXP && (
        <div className="animate-xp-pop rounded-xl border border-xp/20 bg-xp/5 p-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Star className="h-5 w-5 text-xp fill-xp" />
            <span className="text-2xl font-bold text-xp">+{xpResult.newXP} XP</span>
          </div>
          {xpResult.leveledUp && (
            <div className="mt-2 animate-level-up">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <Trophy className="h-3.5 w-3.5" />
                {getLevelUpMessage()}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Level */}
      {levelInfo && showLevel && (
        <div className="animate-slide-up rounded-xl border bg-card p-4">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-medium">Lv.{levelInfo.current.level} {levelInfo.current.title}</span>
            {levelInfo.next && (
              <span className="text-muted-foreground">{levelInfo.xpInLevel}/{levelInfo.xpForLevel} XP</span>
            )}
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="animate-shimmer h-full rounded-full" style={{ width: `${Math.max(levelInfo.progress * 100, 2)}%` }} />
          </div>
          {levelInfo.next && (
            <p className="mt-1.5 text-[10px] text-muted-foreground">
              {levelInfo.xpForLevel - levelInfo.xpInLevel} XP to {levelInfo.next.title}
            </p>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="rounded-xl border bg-card p-4">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-lg font-semibold">{attempt.correctCount}/{attempt.totalQuestions}</div>
            <div className="text-[10px] text-muted-foreground">Correct</div>
          </div>
          <div>
            <div className="text-lg font-semibold">{Math.floor(attempt.timeSpent / 60)}m {attempt.timeSpent % 60}s</div>
            <div className="text-[10px] text-muted-foreground">Time</div>
          </div>
          <div>
            <div className="text-lg font-semibold">{timePerQ}s</div>
            <div className="text-[10px] text-muted-foreground">Per Question</div>
          </div>
        </div>
        {attempt.violations && attempt.violations > 0 && (
          <div className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-xp/10 px-3 py-1.5 text-xs text-xp">
            <AlertTriangle className="h-3 w-3" />
            {attempt.violations} tab switch{attempt.violations !== 1 ? "es" : ""} detected
          </div>
        )}
      </div>

      {/* Achievements */}
      {newAchievements && newAchievements.length > 0 && showAchievements && (
        <div className="space-y-2">
          {newAchievements.map((a, i) => (
            <div
              key={a.id}
              className="animate-slide-up flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Trophy className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{a.title}</div>
                <div className="text-xs text-muted-foreground">{a.description}</div>
              </div>
              <span className="text-xs font-medium text-primary">Unlocked!</span>
            </div>
          ))}
        </div>
      )}

      {/* Domain breakdown */}
      <div className="rounded-xl border bg-card p-4">
        <h3 className="mb-3 text-sm font-medium">Domain Breakdown</h3>
        <div className="space-y-2.5">
          {attempt.domainBreakdown.map((ds) => {
            const domain = DOMAINS.find((d) => d.id === ds.domain);
            const pct = ds.total > 0 ? Math.round((ds.correct / ds.total) * 100) : 0;
            return (
              <div key={ds.domain}>
                <div className="mb-0.5 flex items-center justify-between text-xs">
                  <span className="font-medium">{domain?.shortName ?? `D${ds.domain}`}</span>
                  <span className={cn("font-medium", pct >= 70 ? "text-success" : "text-danger")}>
                    {ds.correct}/{ds.total} ({pct}%)
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn("h-full rounded-full transition-all", pct >= 70 ? "bg-success" : "bg-danger")}
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
          <Button3D variant="ghost" size="md" className="w-full gap-1.5">
            <Eye className="h-4 w-4" />
            Review
          </Button3D>
        </Link>
        {onRetry && (
          <Button3D variant="primary" size="md" onClick={onRetry} className="flex-1 gap-1.5">
            <RotateCcw className="h-4 w-4" />
            Try Again
          </Button3D>
        )}
      </div>
    </div>
  );
}
