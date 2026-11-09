import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 text-xs text-muted-foreground">
        <span>CLF-C02 Exam Prep</span>
        <a
          href="https://github.com/itsjustadarsh/clfc02-mock"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 transition-colors hover:text-foreground"
        >
          <ExternalLink className="h-3 w-3" />
          GitHub
        </a>
      </div>
    </footer>
  );
}
