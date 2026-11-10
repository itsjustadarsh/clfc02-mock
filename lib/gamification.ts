import type {
  QuizAttempt,
  UserProfile,
  QuestionStats,
  AchievementStore,
  LevelDef,
  AchievementDef,
  DomainMastery,
  XPResult,
  UserAnswer,
  Question,
} from "./types";
import { DOMAINS } from "./types";
import {
  getProfile,
  saveProfile,
  getQuestionStats,
  saveQuestionStats,
  getAchievementStore,
  saveAchievementStore,
  getAttempts,
  hasProfile,
} from "./storage";

// --- Levels ---

export const LEVELS: LevelDef[] = [
  { level: 1, title: "Cloud Novice", xpRequired: 0 },
  { level: 2, title: "Cloud Explorer", xpRequired: 100 },
  { level: 3, title: "Cloud Student", xpRequired: 300 },
  { level: 4, title: "Cloud Enthusiast", xpRequired: 600 },
  { level: 5, title: "Cloud Apprentice", xpRequired: 1000 },
  { level: 6, title: "Cloud Practitioner", xpRequired: 1800 },
  { level: 7, title: "Cloud Specialist", xpRequired: 3000 },
  { level: 8, title: "Cloud Professional", xpRequired: 5000 },
  { level: 9, title: "Cloud Expert", xpRequired: 8000 },
  { level: 10, title: "Cloud Architect", xpRequired: 12000 },
  { level: 11, title: "Cloud Master", xpRequired: 18000 },
  { level: 12, title: "AWS Sage", xpRequired: 25000 },
];

export function getLevelForXP(xp: number): LevelDef {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xpRequired) return LEVELS[i];
  }
  return LEVELS[0];
}

export function getLevelProgress(xp: number): {
  current: LevelDef;
  next: LevelDef | null;
  progress: number;
  xpInLevel: number;
  xpForLevel: number;
} {
  const current = getLevelForXP(xp);
  const nextIdx = LEVELS.findIndex((l) => l.level === current.level) + 1;
  const next = nextIdx < LEVELS.length ? LEVELS[nextIdx] : null;

  if (!next) {
    return { current, next: null, progress: 1, xpInLevel: 0, xpForLevel: 0 };
  }

  const xpInLevel = xp - current.xpRequired;
  const xpForLevel = next.xpRequired - current.xpRequired;
  const progress = xpForLevel > 0 ? xpInLevel / xpForLevel : 1;

  return { current, next, progress, xpInLevel, xpForLevel };
}

// --- XP Calculation ---

export function calculateXPForAttempt(attempt: QuizAttempt): number {
  let xp = 0;

  // 10 XP per correct answer
  xp += attempt.correctCount * 10;

  // Completion bonus
  xp += 25;

  // Exam mode bonus
  if (attempt.mode === "exam") xp += 50;

  // Perfect score bonus
  if (attempt.score === 100) xp += 100;

  return xp;
}

export function addXP(amount: number): XPResult {
  const profile = getProfile();
  const oldLevel = getLevelForXP(profile.xp).level;
  const today = new Date().toISOString().split("T")[0];

  // Streak bonus on first quiz of day
  let streakBonus = 0;
  if (profile.lastActiveDate !== today && profile.streak > 0) {
    streakBonus = profile.streak * 5;
  }

  const totalAmount = amount + streakBonus;
  profile.xp += totalAmount;

  const newLevelDef = getLevelForXP(profile.xp);
  profile.level = newLevelDef.level;

  // Update streak
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  if (profile.lastActiveDate === today) {
    // Already active today, no streak change
  } else if (profile.lastActiveDate === yesterdayStr) {
    profile.streak += 1;
  } else if (profile.lastActiveDate === "") {
    profile.streak = 1;
  } else {
    profile.streak = 1; // Reset streak
  }
  profile.lastActiveDate = today;

  // Daily progress
  if (profile.dailyProgressDate !== today) {
    profile.dailyProgress = 0;
    profile.dailyProgressDate = today;
  }

  saveProfile(profile);

  return {
    newXP: totalAmount,
    totalXP: profile.xp,
    leveledUp: newLevelDef.level > oldLevel,
    oldLevel,
    newLevel: newLevelDef.level,
  };
}

export function addDailyProgress(questionsAnswered: number): void {
  const profile = getProfile();
  const today = new Date().toISOString().split("T")[0];

  if (profile.dailyProgressDate !== today) {
    profile.dailyProgress = 0;
    profile.dailyProgressDate = today;
  }

  profile.dailyProgress += questionsAnswered;
  saveProfile(profile);
}

// --- Question Stats ---

export function updateQuestionStats(answers: UserAnswer[]): void {
  const stats = getQuestionStats();
  const today = new Date().toISOString().split("T")[0];

  for (const answer of answers) {
    const existing = stats[answer.questionId] || { seen: 0, correct: 0, lastSeen: "" };
    existing.seen += 1;
    if (answer.isCorrect) existing.correct += 1;
    existing.lastSeen = today;
    stats[answer.questionId] = existing;
  }

  saveQuestionStats(stats);
}

// --- Domain Mastery ---

export function getDomainMastery(questions: Question[]): DomainMastery[] {
  const stats = getQuestionStats();

  return DOMAINS.map((domain) => {
    const domainQuestions = questions.filter((q) => q.domain === domain.id);
    let seen = 0;
    let correct = 0;

    for (const q of domainQuestions) {
      const stat = stats[q.id];
      if (stat) {
        seen += stat.seen;
        correct += stat.correct;
      }
    }

    const accuracy = seen > 0 ? Math.round((correct / seen) * 100) : 0;
    let status: DomainMastery["status"] = "unseen";
    if (seen > 0) {
      if (accuracy < 70) status = "weak";
      else if (accuracy < 85) status = "improving";
      else status = "strong";
    }

    return {
      domain: domain.id,
      name: domain.name,
      accuracy,
      seen,
      correct,
      status,
    };
  });
}

// --- Achievements ---

export const ACHIEVEMENTS: AchievementDef[] = [
  // Progress
  { id: "first_steps", title: "First Steps", description: "Complete your first quiz", icon: "Footprints", category: "progress" },
  { id: "century_club", title: "Century Club", description: "Answer 100 questions", icon: "Target", category: "progress" },
  { id: "half_way", title: "Halfway There", description: "Answer 500 questions", icon: "Milestone", category: "progress" },
  { id: "question_master", title: "Question Master", description: "Answer all 1,050 questions", icon: "Crown", category: "progress" },
  // Mastery
  { id: "perfect_score", title: "Perfect Score", description: "Get 100% on any quiz", icon: "Star", category: "mastery" },
  { id: "passing_grade", title: "Passing Grade", description: "Score 70%+ on a mock exam", icon: "GraduationCap", category: "mastery" },
  { id: "domain_expert_1", title: "Cloud Expert", description: "Score 90%+ on Cloud Concepts", icon: "Cloud", category: "mastery" },
  { id: "domain_expert_2", title: "Security Expert", description: "Score 90%+ on Security", icon: "Shield", category: "mastery" },
  { id: "domain_expert_3", title: "Tech Expert", description: "Score 90%+ on Technology", icon: "Cpu", category: "mastery" },
  { id: "domain_expert_4", title: "Billing Expert", description: "Score 90%+ on Billing", icon: "CreditCard", category: "mastery" },
  // Streak
  { id: "streak_3", title: "Streak Starter", description: "3-day study streak", icon: "Flame", category: "streak" },
  { id: "streak_7", title: "On Fire", description: "7-day study streak", icon: "Zap", category: "streak" },
  { id: "streak_14", title: "Unstoppable", description: "14-day study streak", icon: "Rocket", category: "streak" },
  // Special
  { id: "speed_demon", title: "Speed Demon", description: "Under 30s per question avg", icon: "Timer", category: "special" },
  { id: "night_owl", title: "Night Owl", description: "Study after 10 PM", icon: "Moon", category: "special" },
  { id: "early_bird", title: "Early Bird", description: "Study before 7 AM", icon: "Sunrise", category: "special" },
  // Level
  { id: "level_5", title: "Apprentice", description: "Reach level 5", icon: "Award", category: "level" },
  { id: "level_10", title: "Architect", description: "Reach level 10", icon: "Trophy", category: "level" },
];

export function checkAchievements(
  attempt: QuizAttempt,
  profile: UserProfile,
): AchievementDef[] {
  const store = getAchievementStore();
  const attempts = getAttempts();
  const totalQs = attempts.reduce((s, a) => s + a.totalQuestions, 0);
  const uniqueQs = new Set(attempts.flatMap((a) => a.questionIds)).size;
  const newlyUnlocked: AchievementDef[] = [];

  const hour = new Date(attempt.date).getHours();
  const timePerQ = attempt.timeSpent > 0 ? attempt.timeSpent / attempt.totalQuestions : Infinity;

  const checks: Record<string, boolean> = {
    first_steps: attempts.length >= 1,
    century_club: totalQs >= 100,
    half_way: totalQs >= 500,
    question_master: uniqueQs >= 1050,
    perfect_score: attempt.score === 100,
    passing_grade: attempt.mode === "exam" && attempt.passed,
    domain_expert_1: attempts.some((a) => a.mode === "domain" && a.domain === 1 && a.score >= 90),
    domain_expert_2: attempts.some((a) => a.mode === "domain" && a.domain === 2 && a.score >= 90),
    domain_expert_3: attempts.some((a) => a.mode === "domain" && a.domain === 3 && a.score >= 90),
    domain_expert_4: attempts.some((a) => a.mode === "domain" && a.domain === 4 && a.score >= 90),
    streak_3: profile.streak >= 3,
    streak_7: profile.streak >= 7,
    streak_14: profile.streak >= 14,
    speed_demon: timePerQ < 30 && attempt.totalQuestions >= 10,
    night_owl: hour >= 22 || hour < 4,
    early_bird: hour >= 4 && hour < 7,
    level_5: profile.level >= 5,
    level_10: profile.level >= 10,
  };

  for (const achievement of ACHIEVEMENTS) {
    if (!store[achievement.id] && checks[achievement.id]) {
      store[achievement.id] = { unlockedAt: new Date().toISOString() };
      newlyUnlocked.push(achievement);
    }
  }

  if (newlyUnlocked.length > 0) {
    saveAchievementStore(store);
  }

  return newlyUnlocked;
}

// --- Encouraging Messages ---

const MESSAGES_PASS = [
  "You're crushing it!",
  "Amazing work! Keep going!",
  "That's how it's done!",
  "You're on your way to certification!",
  "Incredible progress!",
  "The cloud is yours!",
  "AWS would be proud!",
  "Keep this momentum going!",
];

const MESSAGES_FAIL = [
  "Every attempt makes you stronger!",
  "Don't give up — you're learning!",
  "Progress, not perfection!",
  "Review the explanations and try again!",
  "You've got this — keep practicing!",
  "Each question teaches you something new!",
  "The path to mastery takes time!",
];

const MESSAGES_LEVEL_UP = [
  "LEVEL UP! You're unstoppable!",
  "New level unlocked! Keep climbing!",
  "You just leveled up! Amazing!",
  "Higher and higher! New level!",
];

export function getEncouragingMessage(passed: boolean): string {
  const arr = passed ? MESSAGES_PASS : MESSAGES_FAIL;
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getLevelUpMessage(): string {
  return MESSAGES_LEVEL_UP[Math.floor(Math.random() * MESSAGES_LEVEL_UP.length)];
}

// --- Migration ---

export function migrateExistingData(): void {
  if (hasProfile()) return;

  const attempts = getAttempts();
  if (attempts.length === 0) return;

  // Calculate retroactive XP
  let totalXP = 0;
  for (const attempt of attempts) {
    totalXP += calculateXPForAttempt(attempt);
  }

  // Build question stats from history
  const stats: Record<string, { seen: number; correct: number; lastSeen: string }> = {};
  for (const attempt of attempts) {
    for (const answer of attempt.answers) {
      const existing = stats[answer.questionId] || { seen: 0, correct: 0, lastSeen: "" };
      existing.seen += 1;
      if (answer.isCorrect) existing.correct += 1;
      existing.lastSeen = attempt.date.split("T")[0];
      stats[answer.questionId] = existing;
    }
  }

  const level = getLevelForXP(totalXP);
  const oldestDate = attempts.length > 0
    ? attempts[attempts.length - 1].date.split("T")[0]
    : new Date().toISOString().split("T")[0];

  // Calculate streak from attempts
  const days = new Set(attempts.map((a) => new Date(a.date).toDateString()));
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

  const profile: UserProfile = {
    xp: totalXP,
    level: level.level,
    streak,
    lastActiveDate: attempts[0]?.date.split("T")[0] || "",
    dailyGoal: 20,
    dailyProgress: 0,
    dailyProgressDate: "",
    joinDate: oldestDate,
  };

  saveProfile(profile);
  saveQuestionStats(stats);

  // Check achievements retroactively
  if (attempts.length > 0) {
    checkAchievements(attempts[0], profile);
  }
}

// --- Suggestion Engine ---

export function getSuggestion(
  profile: UserProfile,
  mastery: DomainMastery[],
): { text: string; action: string; href: string } {
  const today = new Date().toISOString().split("T")[0];
  const daysSinceActive = profile.lastActiveDate
    ? Math.floor((Date.now() - new Date(profile.lastActiveDate).getTime()) / 86400000)
    : 999;

  // Haven't practiced recently
  if (daysSinceActive >= 2) {
    return {
      text: `You haven't practiced in ${daysSinceActive} days. Jump back in!`,
      action: "Quick Quiz",
      href: "/practice/quick",
    };
  }

  // Weak domain
  const weakest = mastery
    .filter((m) => m.status === "weak" && m.seen > 0)
    .sort((a, b) => a.accuracy - b.accuracy)[0];

  if (weakest) {
    return {
      text: `${weakest.name} needs work (${weakest.accuracy}% accuracy). Focus here!`,
      action: `Practice Domain ${weakest.domain}`,
      href: `/practice/domain/${weakest.domain}`,
    };
  }

  // Daily goal not met
  if (profile.dailyProgressDate === today && profile.dailyProgress < profile.dailyGoal) {
    const remaining = profile.dailyGoal - profile.dailyProgress;
    return {
      text: `${remaining} more questions to hit your daily goal!`,
      action: "Quick Quiz",
      href: "/practice/quick",
    };
  }

  // No unseen domains
  const unseen = mastery.filter((m) => m.status === "unseen");
  if (unseen.length > 0) {
    return {
      text: `You haven't tried ${unseen[0].name} yet. Give it a shot!`,
      action: `Practice Domain ${unseen[0].domain}`,
      href: `/practice/domain/${unseen[0].domain}`,
    };
  }

  // Default: mock exam
  return {
    text: "Ready for the real thing? Take a full mock exam!",
    action: "Mock Exam",
    href: "/practice/exam",
  };
}
