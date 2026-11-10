"use client";

import Link from "next/link";
import { Lightbulb, ArrowRight } from "lucide-react";

interface SuggestionCardProps {
  text: string;
  action: string;
  href: string;
}

export function SuggestionCard({ text, action, href }: SuggestionCardProps) {
  return (
    <div className="rounded-xl border border-primary/15 bg-gradient-to-r from-primary/5 to-accent/5 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Lightbulb className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <p className="text-sm">{text}</p>
          <Link
            href={href}
            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-accent"
          >
            {action} <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
