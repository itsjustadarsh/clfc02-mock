"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUnits, getAllLessonProgress, isLessonUnlocked } from "@/lib/lessons";
import type { Unit, LessonProgress } from "@/lib/lessons";
import { LessonNode } from "./lesson-node";
import { UnitHeader } from "./unit-header";

export function LessonPath() {
  const router = useRouter();
  const [units, setUnits] = useState<Unit[]>([]);
  const [progress, setProgress] = useState<Record<string, LessonProgress>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUnits(getUnits());
    setProgress(getAllLessonProgress());
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const positionPattern: ("left" | "center" | "right")[] = [
    "center", "right", "center", "left", "center", "right", "center", "left",
  ];

  return (
    <div className="flex flex-col items-center gap-0 pb-20">
      {units.map((unit, unitIndex) => (
        <div key={unit.domain} className="w-full">
          <div className="mb-8 mt-4 first:mt-0">
            <UnitHeader unit={unit} index={unitIndex} />
          </div>

          <div className="flex flex-col items-center">
            {unit.lessons.map((lesson, lessonIndex) => {
              const lessonProgress = progress[lesson.id] || {
                completed: false,
                bestScore: 0,
                attempts: 0,
                stars: 0,
              };
              const unlocked = isLessonUnlocked(lesson.id);
              const pos = positionPattern[lessonIndex % positionPattern.length];

              const prevCompleted = lessonIndex > 0 &&
                (progress[unit.lessons[lessonIndex - 1].id]?.completed ?? false);

              return (
                <div key={lesson.id} className="flex flex-col items-center">
                  {lessonIndex > 0 && (
                    <div className={`path-line h-7 ${prevCompleted ? "done" : ""}`} />
                  )}
                  <LessonNode
                    lesson={lesson}
                    progress={lessonProgress}
                    unlocked={unlocked}
                    position={pos}
                    onClick={() => router.push(`/learn/${lesson.id}`)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
