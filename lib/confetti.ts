"use client";

import confetti from "canvas-confetti";

// Big celebration (quiz complete, level up)
export function fireCelebration() {
  const duration = 2000;
  const end = Date.now() + duration;

  const colors = ["#a855f7", "#c084fc", "#22c55e", "#facc15", "#f97316"];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// Small burst (achievement, correct answer streak)
export function fireBurst() {
  confetti({
    particleCount: 40,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#a855f7", "#c084fc", "#facc15"],
  });
}

// Stars (level up)
export function fireStars() {
  const defaults = {
    spread: 360,
    ticks: 80,
    gravity: 0.5,
    decay: 0.94,
    startVelocity: 20,
    colors: ["#a855f7", "#facc15", "#22c55e", "#f97316"],
  };

  confetti({ ...defaults, particleCount: 30, scalar: 1.2, shapes: ["star"] });
  confetti({ ...defaults, particleCount: 20, scalar: 0.8, shapes: ["circle"] });
}

// Side cannons (pass exam)
export function fireCannons() {
  const end = Date.now() + 1500;
  const colors = ["#a855f7", "#c084fc", "#22c55e", "#facc15"];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 40,
      origin: { x: 0, y: 0.8 },
      colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 40,
      origin: { x: 1, y: 0.8 },
      colors,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
