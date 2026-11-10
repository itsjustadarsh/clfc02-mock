"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cloud, BookOpen, ClipboardList, LayoutDashboard, Menu, X, ExternalLink, Flame, Star } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { getProfile, hasProfile } from "@/lib/storage";
import { migrateExistingData, getLevelForXP } from "@/lib/gamification";

const links = [
  { href: "/study", label: "Study", icon: BookOpen },
  { href: "/practice", label: "Practice", icon: ClipboardList },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(0);
  const [xp, setXp] = useState(0);

  useEffect(() => {
    migrateExistingData();
    if (hasProfile()) {
      const p = getProfile();
      setStreak(p.streak);
      setLevel(p.level);
      setXp(p.xp);
    }
  }, [pathname]); // refresh on route change

  return (
    <nav className="glass sticky top-0 z-50" style={{ boxShadow: "var(--shadow-sm)" }}>
      <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold" onClick={() => setMobileOpen(false)}>
          <Cloud className="h-4.5 w-4.5 text-primary" />
          <span className="text-sm">CLF-C02</span>
        </Link>

        <div className="hidden items-center gap-0.5 sm:flex">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors",
                pathname.startsWith(href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </Link>
          ))}

          {/* Gamification indicators */}
          {level > 0 && (
            <>
              <div className="mx-1 h-4 w-px bg-border" />
              <div className="flex items-center gap-2 px-1.5">
                {streak > 0 && (
                  <div className="flex items-center gap-0.5 text-xs font-bold text-streak">
                    <Flame className="h-3.5 w-3.5 animate-streak-glow" />
                    {streak}
                  </div>
                )}
                <div className="flex items-center gap-0.5 text-xs font-medium text-primary">
                  <Star className="h-3 w-3 text-xp" />
                  Lv.{level}
                </div>
              </div>
            </>
          )}

          <div className="mx-1 h-4 w-px bg-border" />
          <a
            href="https://github.com/itsjustadarsh/clfc02-mock"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-1 sm:hidden">
          {/* Mobile gamification indicators */}
          {streak > 0 && (
            <div className="flex items-center gap-0.5 text-xs font-bold text-streak mr-1">
              <Flame className="h-3.5 w-3.5 animate-streak-glow" />
              {streak}
            </div>
          )}
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t px-4 py-2 sm:hidden">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname.startsWith(href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
          <a
            href="https://github.com/itsjustadarsh/clfc02-mock"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
          >
            <ExternalLink className="h-4 w-4" />
            GitHub
          </a>
        </div>
      )}
    </nav>
  );
}
