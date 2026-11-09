"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export function useTimer(initialSeconds: number, onExpire?: () => void) {
  const [timeRemaining, setTimeRemaining] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    if (!isRunning || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          onExpireRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setTimeRemaining(initialSeconds);
    setIsRunning(false);
  }, [initialSeconds]);

  const elapsed = initialSeconds - timeRemaining;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return {
    timeRemaining,
    elapsed,
    isRunning,
    formatted: formatTime(timeRemaining),
    start,
    pause,
    reset,
  };
}
