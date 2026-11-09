"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cloud, BookOpen, ClipboardList, History, Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { useState } from "react";

const links = [
  { href: "/study", label: "Study", icon: BookOpen },
  { href: "/practice", label: "Practice", icon: ClipboardList },
  { href: "/history", label: "History", icon: History },
];

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold" onClick={() => setMobileOpen(false)}>
          <Cloud className="h-5 w-5 text-primary" />
          <span>CLF-C02 Prep</span>
        </Link>

        <div className="hidden items-center gap-1 sm:flex">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname.startsWith(href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-1 sm:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
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
                "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                pathname.startsWith(href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
