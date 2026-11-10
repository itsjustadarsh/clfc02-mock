"use client";

import { useState, useEffect } from "react";
import type { UserProfile } from "@/lib/types";
import { getProfile, hasProfile } from "@/lib/storage";
import { migrateExistingData } from "@/lib/gamification";

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    migrateExistingData();
    const p = getProfile();
    setProfile(hasProfile() ? p : null);
    setLoading(false);
  }, []);

  function refresh() {
    const p = getProfile();
    setProfile(p);
  }

  return { profile, loading, refresh };
}
