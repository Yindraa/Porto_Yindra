"use client";

import { ScrambleText } from "@/components/scramble-text";
import { cn } from "@/lib/cn";

export function ProjectFilter({
  options,
  activeKey,
  onChange,
}: {
  options: { key: string; label: string }[];
  activeKey: string;
  onChange: (key: string) => void;
}) {
  return (
    <div>
      <p className="text-foreground-muted">
        <span className="text-accent">$</span> ls ~/projects --filter
      </p>
      <div className="mt-2 flex flex-wrap gap-3">
        {options.map((option) => {
          const isActive = activeKey === option.key;
          return (
            <button
              key={option.key}
              type="button"
              onClick={() => onChange(option.key)}
              aria-pressed={isActive}
              className={cn(
                "transition-colors duration-fast ease-standard",
                isActive ? "text-accent" : "text-foreground-subtle hover:text-foreground-muted",
              )}
            >
              [<ScrambleText text={option.label} />]
            </button>
          );
        })}
      </div>
    </div>
  );
}
