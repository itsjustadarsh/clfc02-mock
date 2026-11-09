"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { StudySection } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ServiceCard } from "./service-card";
import { KeyPoint } from "./key-point";

interface TopicSectionProps {
  section: StudySection;
  defaultOpen?: boolean;
}

export function TopicSection({ section, defaultOpen = true }: TopicSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-lg border bg-card">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-4 text-left font-semibold transition-colors hover:bg-muted/50"
      >
        <span>{section.heading}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="border-t px-4 pb-4 pt-3">
          <ul className="space-y-2">
            {section.points.map((point, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {section.comparison && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    {section.comparison.headers.map((h, i) => (
                      <th
                        key={i}
                        className="border-b bg-muted/50 px-3 py-2 text-left font-medium"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.comparison.rows.map((row, i) => (
                    <tr key={i} className="border-b last:border-0">
                      {row.map((cell, j) => (
                        <td key={j} className="px-3 py-2">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {section.services && section.services.length > 0 && (
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {section.services.map((service) => (
                <ServiceCard key={service.name} service={service} />
              ))}
            </div>
          )}

          {section.tip && <KeyPoint tip={section.tip} />}
        </div>
      )}
    </div>
  );
}
