"use client";

import type { Lesson, LessonProgress } from "@/lib/lessons";
import { cn } from "@/lib/utils";
import { Lock, Star, Check, Play } from "lucide-react";
import { playClick } from "@/lib/sounds";

interface LessonNodeProps {
  lesson: Lesson;
  progress: LessonProgress;
  unlocked: boolean;
  onClick: () => void;
  position: "left" | "center" | "right";
}

export function LessonNode({ lesson, progress, unlocked, onClick, position }: LessonNodeProps) {
  const isCompleted = progress.completed;
  const stars = progress.stars;

  function handleClick() {
    if (!unlocked) return;
    playClick();
    onClick();
  }

  const offsetClass =
    position === "left" ? "-translate-x-12 sm:-translate-x-16" :
    position === "right" ? "translate-x-12 sm:translate-x-16" : "";

  return (
    <div className={cn("flex flex-col items-center", offsetClass)}>
      <button
        onClick={handleClick}
        disabled={!unlocked}
        className={cn(
          "lesson-bubble",
          !unlocked && "locked",
          isCompleted && "bg-success text-white",
          !isCompleted && unlocked && "bg-primary text-white available",
          !unlocked && "bg-muted text-muted-foreground",
        )}
      >
        {!unlocked ? (
          <Lock className="h-5 w-5" />
        ) : isCompleted ? (
          <Check className="h-6 w-6" strokeWidth={2.5} />
        ) : (
          <Play className="h-5 w-5 ml-0.5" fill="currentColor" />
        )}

        {isCompleted && stars > 0 && (
          <div className="star-row">
            {[1, 2, 3].map((s) => (
              <Star
                key={s}
                className={cn(
                  "h-3 w-3",
                  s <= stars ? "text-xp fill-xp" : "text-muted-foreground/20"
                )}
              />
            ))}
          </div>
        )}
      </button>

      <span className={cn(
        "mt-2.5 text-[11px] font-medium",
        !unlocked && "text-muted-foreground/40",
        isCompleted && "text-success",
        !isCompleted && unlocked && "text-primary",
      )}>
        {lesson.title}
      </span>
    </div>
  );
}
