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

  // Position offsets for the zigzag path
  const offsetClass =
    position === "left" ? "-translate-x-12 sm:-translate-x-16" :
    position === "right" ? "translate-x-12 sm:translate-x-16" :
    "";

  return (
    <div className={cn("flex flex-col items-center", offsetClass)}>
      <button
        onClick={handleClick}
        disabled={!unlocked}
        className={cn(
          "lesson-node",
          !unlocked && "locked",
          isCompleted && "bg-success text-white",
          !isCompleted && unlocked && "bg-primary text-white",
          !unlocked && "bg-muted text-muted-foreground",
          // Shadow
          isCompleted && "shadow-[0_4px_0_#16a34a]",
          !isCompleted && unlocked && "shadow-[0_4px_0_#7c22ce]",
          !unlocked && "shadow-[0_4px_0_var(--border)]",
        )}
      >
        {!unlocked ? (
          <Lock className="h-6 w-6" />
        ) : isCompleted ? (
          <Check className="h-7 w-7" strokeWidth={3} />
        ) : (
          <Play className="h-6 w-6 ml-0.5" fill="currentColor" />
        )}

        {/* Stars */}
        {isCompleted && stars > 0 && (
          <div className="star-row">
            {[1, 2, 3].map((s) => (
              <Star
                key={s}
                className={cn(
                  "h-3.5 w-3.5",
                  s <= stars ? "text-xp fill-xp" : "text-muted-foreground/30"
                )}
              />
            ))}
          </div>
        )}
      </button>

      {/* Label */}
      <span className={cn(
        "mt-3 text-xs font-bold",
        !unlocked && "text-muted-foreground/50",
        isCompleted && "text-success",
        !isCompleted && unlocked && "text-primary",
      )}>
        {lesson.title}
      </span>
    </div>
  );
}
