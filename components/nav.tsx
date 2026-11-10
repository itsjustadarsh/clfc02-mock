"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cloud, BookOpen, GraduationCap, LayoutDashboard, ClipboardList, Menu, X, ExternalLink, Flame, Star } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { SoundToggle } from "./ui/sound-toggle";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { getProfile, hasProfile } from "@/lib/storage";
import { migrateExistingData, getLevelForXP } from "@/lib/gamification";

const links = [
  { href: "/learn", label: "Learn", icon: GraduationCap },
  { href: "/practice", label: "Practice", icon: ClipboardList },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    migrateExistingData();
    if (hasProfile()) {
      const p = getProfile();
      setStreak(p.streak);
      setLevel(p.level);
    }
  }, [pathname]);

  return (
    <nav className="glass sticky top-0 z-50">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold" onClick={() => setMobileOpen(false)}>
          <Cloud className="h-5 w-5 text-primary" />
          <span className="text-sm">CLF-C02</span>
        </Link>

        <div className="hidden items-center gap-1 sm:flex">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}

          {level > 0 && (
            <>
              <div className="mx-2 h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                {streak > 0 && (
                  <span className="flex items-center gap-0.5 text-xs font-medium text-streak">
                    <Flame className="h-3.5 w-3.5 animate-streak-glow" />
                    {streak}
                  </span>
                )}
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                  Lv.{level}
                </span>
              </div>
            </>
          )}

          <div className="mx-1.5 h-4 w-px bg-border" />
          <SoundToggle />
          <ThemeToggle />
          <a
            href="https://github.com/itsjustadarsh/clfc02-mock"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="flex items-center gap-1 sm:hidden">
          {streak > 0 && (
            <span className="mr-1 flex items-center gap-0.5 text-xs font-medium text-streak">
              <Flame className="h-3.5 w-3.5 animate-streak-glow" />
              {streak}
            </span>
          )}
          <SoundToggle />
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
        <div className="border-t px-4 py-2 sm:hidden animate-fade-in">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
          <a
            href="https://github.com/itsjustadarsh/clfc02-mock"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted"
          >
            <ExternalLink className="h-4 w-4" />
            GitHub
          </a>
        </div>
      )}
    </nav>
  );
}
