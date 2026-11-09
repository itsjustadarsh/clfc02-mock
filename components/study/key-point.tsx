import { Lightbulb } from "lucide-react";

interface KeyPointProps {
  tip: string;
}

export function KeyPoint({ tip }: KeyPointProps) {
  return (
    <div className="mt-3 flex gap-2 rounded-lg border border-primary/20 bg-primary/5 p-2.5">
      <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
      <div>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">Exam Tip</span>
        <p className="mt-0.5 text-xs text-primary/80">{tip}</p>
      </div>
    </div>
  );
}
