"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { toast } from "sonner";

export function useAntiCheat(enabled: boolean) {
  const [violations, setViolations] = useState(0);
  const violationsRef = useRef(0);

  const requestFullscreen = useCallback(() => {
    document.documentElement.requestFullscreen?.().catch(() => {});
  }, []);

  useEffect(() => {
    if (!enabled) return;

    function onVisibilityChange() {
      if (document.hidden) {
        violationsRef.current += 1;
        setViolations(violationsRef.current);
        toast.warning(`Tab switch detected (${violationsRef.current}). Stay on this tab during the exam.`);
      }
    }

    function preventCopy(e: Event) {
      e.preventDefault();
      toast.warning("Copy/paste is disabled during the exam.");
    }

    function preventContext(e: Event) {
      e.preventDefault();
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    document.addEventListener("copy", preventCopy);
    document.addEventListener("cut", preventCopy);
    document.addEventListener("paste", preventCopy);
    document.addEventListener("contextmenu", preventContext);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("copy", preventCopy);
      document.removeEventListener("cut", preventCopy);
      document.removeEventListener("paste", preventCopy);
      document.removeEventListener("contextmenu", preventContext);
    };
  }, [enabled]);

  return { violations, requestFullscreen };
}
