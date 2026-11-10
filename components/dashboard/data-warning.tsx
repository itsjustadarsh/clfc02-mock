"use client";

import { Database, X } from "lucide-react";
import { getProfile, saveProfile } from "@/lib/storage";

interface DataWarningProps {
  dismissed: boolean;
  onDismiss: () => void;
}

export function DataWarning({ dismissed, onDismiss }: DataWarningProps) {
  if (dismissed) return null;

  function handleDismiss() {
    const profile = getProfile();
    profile.warningDismissed = true;
    saveProfile(profile);
    onDismiss();
  }

  return (
    <div className="flex items-start gap-3 rounded-xl border border-primary/15 bg-primary/5 p-4">
      <Database className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <div className="flex-1">
        <p className="text-sm font-medium">Your progress is saved locally</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          All data is stored in your browser. <span className="text-foreground">Don&apos;t clear browser data or use incognito</span> — you&apos;ll lose everything.
        </p>
      </div>
      <button onClick={handleDismiss} className="shrink-0 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
