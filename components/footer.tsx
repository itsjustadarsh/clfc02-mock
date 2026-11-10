export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 text-xs text-muted-foreground">
        <span>CLF-C02 Exam Prep</span>
        <a
          href="https://github.com/itsjustadarsh/clfc02-mock"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-foreground"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
