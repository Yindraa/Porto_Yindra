"use client";

import { motion } from "framer-motion";
import { ScrambleText } from "@/components/scramble-text";
import { cn } from "@/lib/cn";

const SPRING = { type: "spring", stiffness: 500, damping: 20 } as const;

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
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = activeKey === option.key;
        return (
          <motion.button
            key={option.key}
            type="button"
            onClick={() => onChange(option.key)}
            aria-pressed={isActive}
            whileHover={{ scale: 1.08, rotate: -2 }}
            whileTap={{ scale: 0.9 }}
            transition={SPRING}
            className={cn(
              "relative rounded-full border px-3.5 py-1.5 text-small",
              isActive ? "border-transparent" : "border-border-strong",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="project-filter-pill-alive"
                className="absolute inset-0 rounded-full bg-accent"
                transition={SPRING}
              />
            )}
            <span
              className={cn(
                "relative z-10 transition-colors duration-fast ease-standard",
                isActive ? "text-accent-foreground" : "text-foreground-muted hover:text-foreground",
              )}
            >
              <ScrambleText text={option.label} />
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
