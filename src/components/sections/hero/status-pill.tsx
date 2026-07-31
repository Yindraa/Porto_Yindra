import { ScrambleText } from "@/components/scramble-text";

export function StatusPill({
  label = "Available for work",
}: {
  label?: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border-strong px-3 py-1.5 text-caption text-foreground-muted">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      <ScrambleText text={label} />
    </div>
  );
}
