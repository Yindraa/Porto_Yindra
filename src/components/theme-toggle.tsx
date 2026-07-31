"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // next-themes only knows the resolved theme after client mount; this flag
    // avoids rendering a theme-dependent icon that would mismatch during SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="relative flex h-9 w-9 items-center justify-center rounded-full text-foreground-muted transition-colors duration-fast ease-standard hover:bg-accent-soft hover:text-foreground"
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center"
          >
            {isDark ? <Moon size={17} strokeWidth={1.75} /> : <Sun size={17} strokeWidth={1.75} />}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
