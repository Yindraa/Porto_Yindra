"use client";

import { motion } from "framer-motion";
import { Sparkles, Terminal, Zap } from "lucide-react";
import { useVariant, type Variant } from "@/components/variant-provider";
import { cn } from "@/lib/cn";

const OPTIONS: { value: Variant; label: string; icon: typeof Sparkles }[] = [
  { value: "aurora", label: "Aurora", icon: Sparkles },
  { value: "tech", label: "Tech", icon: Terminal },
  { value: "alive", label: "Alive", icon: Zap },
];

export function VariantToggle() {
  const { variant, setVariant } = useVariant();

  return (
    <div className="relative flex items-center gap-0.5 rounded-full border border-border-strong p-0.5">
      {OPTIONS.map((option) => {
        const isActive = variant === option.value;
        const Icon = option.icon;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setVariant(option.value)}
            aria-pressed={isActive}
            aria-label={`Switch to ${option.label} theme`}
            className="relative flex h-7 w-7 items-center justify-center rounded-full"
          >
            {isActive && (
              <motion.span
                layoutId="variant-pill"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
              />
            )}
            <Icon
              size={13}
              strokeWidth={1.75}
              className={cn(
                "relative z-10 transition-colors duration-fast ease-standard",
                isActive ? "text-accent-foreground" : "text-foreground-muted hover:text-foreground",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
