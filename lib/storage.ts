import type { QuizAttempt, UserProfile, QuestionStats, AchievementStore } from "./types";

const ATTEMPTS_KEY = "clf-c02-attempts";
const PROFILE_KEY = "clf-c02-profile";
const QUESTION_STATS_KEY = "clf-c02-question-stats";
const ACHIEVEMENTS_KEY = "clf-c02-achievements";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

// --- Attempts ---

export function saveAttempt(attempt: QuizAttempt): void {
  if (!isBrowser()) return;
  const attempts = getAttempts();
  attempts.unshift(attempt);
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts));
}

export function getAttempts(): QuizAttempt[] {
  if (!isBrowser()) return [];
  try {
    const data = localStorage.getItem(ATTEMPTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getAttempt(id: string): QuizAttempt | undefined {
  return getAttempts().find((a) => a.id === id);
}

export function clearHistory(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(ATTEMPTS_KEY);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

export function getStreak(): number {
  const attempts = getAttempts();
  if (attempts.length === 0) return 0;

  const days = new Set(
    attempts.map((a) => new Date(a.date).toDateString())
  );

  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    if (days.has(d.toDateString())) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  return streak;
}

export function getTotalQuestionsAnswered(): number {
  return getAttempts().reduce((sum, a) => sum + a.totalQuestions, 0);
}

// --- Profile ---

const DEFAULT_PROFILE: UserProfile = {
  xp: 0,
  level: 1,
  streak: 0,
  lastActiveDate: "",
  dailyGoal: 20,
  dailyProgress: 0,
  dailyProgressDate: "",
  joinDate: new Date().toISOString().split("T")[0],
};

export function getProfile(): UserProfile {
  if (!isBrowser()) return { ...DEFAULT_PROFILE };
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    if (data) return JSON.parse(data);
    return { ...DEFAULT_PROFILE };
  } catch {
    return { ...DEFAULT_PROFILE };
  }
}

export function saveProfile(profile: UserProfile): void {
  if (!isBrowser()) return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function hasProfile(): boolean {
  if (!isBrowser()) return false;
  return localStorage.getItem(PROFILE_KEY) !== null;
}

// --- Question Stats ---

export function getQuestionStats(): QuestionStats {
  if (!isBrowser()) return {};
  try {
    const data = localStorage.getItem(QUESTION_STATS_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function saveQuestionStats(stats: QuestionStats): void {
  if (!isBrowser()) return;
  localStorage.setItem(QUESTION_STATS_KEY, JSON.stringify(stats));
}

// --- Achievements ---

export function getAchievementStore(): AchievementStore {
  if (!isBrowser()) return {};
  try {
    const data = localStorage.getItem(ACHIEVEMENTS_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function saveAchievementStore(store: AchievementStore): void {
  if (!isBrowser()) return;
  localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(store));
}
