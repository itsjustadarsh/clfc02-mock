import type { Question } from "./types";
import { DOMAINS } from "./types";
import { getQuestionsByDomain } from "./questions";
import { getQuestionStats } from "./storage";

const QUESTIONS_PER_LESSON = 10;

export interface Lesson {
  id: string;
  domain: number;
  domainName: string;
  lessonNumber: number;
  title: string;
  questionIds: string[];
  totalQuestions: number;
}

export interface LessonProgress {
  completed: boolean;
  bestScore: number;
  attempts: number;
  stars: number; // 0-3 stars based on score
  lastAttempted?: string;
}

export interface Unit {
  domain: number;
  name: string;
  shortName: string;
  color: string;
  weight: number;
  lessons: Lesson[];
  progress: { completed: number; total: number };
}

const STORAGE_KEY = "clf-c02-lesson-progress";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

// Generate lessons from questions deterministically (sorted by id)
function generateLessonsForDomain(domain: number): Lesson[] {
  const questions = getQuestionsByDomain(domain).sort((a, b) => a.id.localeCompare(b.id));
  const domainInfo = DOMAINS.find((d) => d.id === domain)!;
  const lessons: Lesson[] = [];

  for (let i = 0; i < questions.length; i += QUESTIONS_PER_LESSON) {
    const chunk = questions.slice(i, i + QUESTIONS_PER_LESSON);
    const lessonNum = Math.floor(i / QUESTIONS_PER_LESSON) + 1;
    lessons.push({
      id: `d${domain}-l${lessonNum}`,
      domain,
      domainName: domainInfo.name,
      lessonNumber: lessonNum,
      title: `${domainInfo.shortName} ${lessonNum}`,
      questionIds: chunk.map((q) => q.id),
      totalQuestions: chunk.length,
    });
  }

  return lessons;
}

let _allLessons: Lesson[] | null = null;

export function getAllLessons(): Lesson[] {
  if (_allLessons) return _allLessons;
  _allLessons = [1, 2, 3, 4].flatMap(generateLessonsForDomain);
  return _allLessons;
}

export function getLessonsForDomain(domain: number): Lesson[] {
  return getAllLessons().filter((l) => l.domain === domain);
}

export function getLesson(lessonId: string): Lesson | undefined {
  return getAllLessons().find((l) => l.id === lessonId);
}

export function getQuestionsForLesson(lessonId: string): Question[] {
  const lesson = getLesson(lessonId);
  if (!lesson) return [];
  const domainQuestions = getQuestionsByDomain(lesson.domain);
  return lesson.questionIds
    .map((id) => domainQuestions.find((q) => q.id === id))
    .filter(Boolean) as Question[];
}

// --- Progress ---

export function getAllLessonProgress(): Record<string, LessonProgress> {
  if (!isBrowser()) return {};
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveLessonProgress(progress: Record<string, LessonProgress>): void {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getLessonProgress(lessonId: string): LessonProgress {
  const all = getAllLessonProgress();
  return all[lessonId] || { completed: false, bestScore: 0, attempts: 0, stars: 0 };
}

export function scoreToStars(score: number): number {
  if (score >= 95) return 3;
  if (score >= 80) return 2;
  if (score >= 60) return 1;
  return 0;
}

export function completeLessonAttempt(lessonId: string, score: number): LessonProgress {
  const all = getAllLessonProgress();
  const existing = all[lessonId] || { completed: false, bestScore: 0, attempts: 0, stars: 0 };

  const stars = scoreToStars(score);
  const updated: LessonProgress = {
    completed: true,
    bestScore: Math.max(existing.bestScore, score),
    attempts: existing.attempts + 1,
    stars: Math.max(existing.stars, stars),
    lastAttempted: new Date().toISOString(),
  };

  all[lessonId] = updated;
  saveLessonProgress(all);
  return updated;
}

// --- Units (grouped lessons with progress) ---

export function getUnits(): Unit[] {
  const progress = getAllLessonProgress();

  return DOMAINS.map((domain) => {
    const lessons = getLessonsForDomain(domain.id);
    const completed = lessons.filter((l) => progress[l.id]?.completed).length;

    return {
      domain: domain.id,
      name: domain.name,
      shortName: domain.shortName,
      color: domain.color,
      weight: domain.weight,
      lessons,
      progress: { completed, total: lessons.length },
    };
  });
}

// Is a lesson unlocked? First lesson always unlocked, others require previous completed
export function isLessonUnlocked(lessonId: string): boolean {
  const lesson = getLesson(lessonId);
  if (!lesson) return false;
  if (lesson.lessonNumber === 1) return true;

  const prevId = `d${lesson.domain}-l${lesson.lessonNumber - 1}`;
  const progress = getLessonProgress(prevId);
  return progress.completed;
}

// Get next recommended lesson across all domains
export function getNextLesson(): Lesson | null {
  const units = getUnits();
  const progress = getAllLessonProgress();

  // Find the first incomplete lesson in order (cycling through domains)
  for (const unit of units) {
    for (const lesson of unit.lessons) {
      if (!progress[lesson.id]?.completed && isLessonUnlocked(lesson.id)) {
        return lesson;
      }
    }
  }

  return null;
}
