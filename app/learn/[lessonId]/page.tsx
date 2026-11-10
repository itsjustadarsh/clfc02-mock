import { Suspense } from "react";
import { LessonClient } from "./client";

export const instant = false;

export default async function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    }>
      <LessonClient lessonId={lessonId} />
    </Suspense>
  );
}
