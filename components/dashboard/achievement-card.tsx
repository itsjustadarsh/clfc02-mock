"use client";

import type { AchievementDef, AchievementStore } from "@/lib/types";
import { ACHIEVEMENTS } from "@/lib/gamification";
import {
  Trophy, Star, Target, Crown, GraduationCap, Cloud, Shield, Cpu,
  CreditCard, Flame, Zap, Rocket, Timer, Moon, Sunrise, Award, Lock,
  Footprints, Milestone,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Trophy, Star, Target, Crown, GraduationCap, Cloud, Shield, Cpu,
  CreditCard, Flame, Zap, Rocket, Timer, Moon, Sunrise, Award,
  Footprints, Milestone,
};

interface AchievementsShowcaseProps {
  store: AchievementStore;
}

export function AchievementsShowcase({ store }: AchievementsShowcaseProps) {
  const unlockedCount = Object.keys(store).length;

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <Trophy className="h-4 w-4 text-primary" />
          Achievements
        </h3>
        <span className="text-xs text-muted-foreground">
          {unlockedCount}/{ACHIEVEMENTS.length}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {ACHIEVEMENTS.map((achievement) => {
          const unlocked = !!store[achievement.id];
          const Icon = iconMap[achievement.icon] || Trophy;
          return (
            <div
              key={achievement.id}
              className={cn(
                "flex flex-col items-center gap-1 rounded-lg p-2 text-center transition-colors",
                unlocked
                  ? "bg-primary/10"
                  : "bg-muted/50 opacity-50"
              )}
              title={`${achievement.title}: ${achievement.description}`}
            >
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg",
                unlocked ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
              )}>
                {unlocked ? <Icon className="h-4 w-4" /> : <Lock className="h-3.5 w-3.5" />}
              </div>
              <span className={cn(
                "text-[9px] font-medium leading-tight",
                unlocked ? "text-foreground" : "text-muted-foreground"
              )}>
                {achievement.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
