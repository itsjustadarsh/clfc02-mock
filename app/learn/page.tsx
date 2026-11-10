"use client";

import { LessonPath } from "@/components/learn/lesson-path";
import { useProfile } from "@/hooks/use-profile";
import { XPBar } from "@/components/dashboard/xp-bar";
import Link from "next/link";
import { ClipboardList, Zap, Layers } from "lucide-react";

export default function LearnPage() {
  const { profile } = useProfile();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 animate-fade-in">
      {profile && (
        <div className="mb-6 space-y-3">
          <XPBar xp={profile.xp} />
          <div className="flex items-center justify-end gap-2">
            {[
              { href: "/practice/exam", icon: ClipboardList, label: "Exam" },
              { href: "/practice/quick", icon: Zap, label: "Quiz" },
              { href: "/practice/flashcards", icon: Layers, label: "Cards" },
            ].map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className="btn btn-secondary flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs"
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <h1 className="mb-6 text-center text-xl font-semibold">Lesson Path</h1>
      <LessonPath />
    </div>
  );
}
