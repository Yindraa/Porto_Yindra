"use client";

import { motion } from "framer-motion";
import { useLanguage, type Language } from "@/components/language-provider";
import { cn } from "@/lib/cn";

const OPTIONS: Language[] = ["id", "en"];

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative flex items-center gap-0.5 rounded-full border border-border-strong p-0.5">
      {OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLanguage(option)}
          aria-pressed={language === option}
          aria-label={`Switch language to ${option === "id" ? "Indonesian" : "English"}`}
          className="relative rounded-full px-2.5 py-1 text-caption font-medium uppercase"
        >
          {language === option && (
            <motion.span
              layoutId="language-pill"
              className="absolute inset-0 rounded-full bg-accent"
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
            />
          )}
          <span
            className={cn(
              "relative z-10 transition-colors duration-fast ease-standard",
              language === option ? "text-accent-foreground" : "text-foreground-muted hover:text-foreground",
            )}
          >
            {option}
          </span>
        </button>
      ))}
    </div>
  );
}
