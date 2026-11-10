"use client";

import { LessonPath } from "@/components/learn/lesson-path";
import { useProfile } from "@/hooks/use-profile";
import { XPBar } from "@/components/dashboard/xp-bar";
import { StreakDisplay } from "@/components/dashboard/streak-display";
import Link from "next/link";
import { ClipboardList, Zap, Layers } from "lucide-react";

export default function LearnPage() {
  const { profile } = useProfile();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 animate-fade-in">
      {/* Top stats */}
      {profile && (
        <div className="mb-6 space-y-3">
          <XPBar xp={profile.xp} />
          <div className="flex items-center justify-between">
            <StreakDisplay streak={profile.streak} compact />
            <div className="flex gap-2">
              <Link
                href="/practice/exam"
                className="btn-3d btn-shadow-secondary flex items-center gap-1.5 rounded-xl bg-muted px-3 py-1.5 text-xs font-bold"
              >
                <ClipboardList className="h-3.5 w-3.5" />
                Mock Exam
              </Link>
              <Link
                href="/practice/quick"
                className="btn-3d btn-shadow-secondary flex items-center gap-1.5 rounded-xl bg-muted px-3 py-1.5 text-xs font-bold"
              >
                <Zap className="h-3.5 w-3.5" />
                Quick Quiz
              </Link>
              <Link
                href="/practice/flashcards"
                className="btn-3d btn-shadow-secondary flex items-center gap-1.5 rounded-xl bg-muted px-3 py-1.5 text-xs font-bold"
              >
                <Layers className="h-3.5 w-3.5" />
                Flashcards
              </Link>
            </div>
          </div>
        </div>
      )}

      <h1 className="mb-6 text-center text-2xl font-extrabold">Lesson Path</h1>

      <LessonPath />
    </div>
  );
}
