"use client";

import { useEffect } from "react";

export function useKeyboardShortcuts(
  handlers: Record<string, () => void>,
  enabled: boolean
) {
  useEffect(() => {
    if (!enabled) return;

    function onKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      const key = e.ctrlKey || e.metaKey ? `Ctrl+${e.key}` : e.key;
      const handler = handlers[key];
      if (handler) {
        e.preventDefault();
        handler();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [handlers, enabled]);
}
