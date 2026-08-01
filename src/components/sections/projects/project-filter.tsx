"use client";

import { motion } from "framer-motion";
import { ScrambleText } from "@/components/scramble-text";
import { cn } from "@/lib/cn";

export function ProjectFilter({
  categories,
  active,
  onChange,
}: {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const isActive = active === category;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            aria-pressed={isActive}
            className={cn(
              "relative rounded-full border px-3.5 py-1.5 text-small transition-colors duration-fast ease-standard",
              isActive ? "border-transparent" : "border-border-strong",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="project-filter-pill"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span
              className={cn(
                "relative z-10 transition-colors duration-fast ease-standard",
                isActive ? "text-accent-foreground" : "text-foreground-muted hover:text-foreground",
              )}
            >
              <ScrambleText text={category} />
            </span>
          </button>
        );
      })}
    </div>
  );
}
