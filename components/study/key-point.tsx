import { Lightbulb } from "lucide-react";

interface KeyPointProps {
  tip: string;
}

export function KeyPoint({ tip }: KeyPointProps) {
  return (
    <div className="mt-4 flex gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3">
      <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <p className="text-sm text-primary">{tip}</p>
    </div>
  );
}
