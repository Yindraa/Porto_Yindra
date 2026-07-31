"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/components/language-provider";
import { ScrambleText } from "@/components/scramble-text";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { href: "#about", label: t.nav.about },
    { href: "#projects", label: t.nav.projects },
    { href: "#skills", label: t.nav.skills },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6">
      <div
        className={cn(
          "glass flex w-full max-w-3xl items-center justify-between rounded-lg px-5 py-3",
        )}
      >
        <a
          href="#top"
          className="text-small font-medium tracking-tight text-foreground"
        >
          {siteConfig.name}
        </a>

        <nav className="hidden items-center gap-7 sm:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-small text-foreground-muted transition-colors duration-fast ease-standard hover:text-foreground"
            >
              <ScrambleText text={item.label} />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground-muted transition-colors duration-fast ease-standard hover:bg-accent-soft hover:text-foreground sm:hidden"
          >
            {open ? <X size={18} strokeWidth={1.75} /> : <Menu size={18} strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="glass absolute inset-x-4 top-[4.5rem] flex flex-col gap-1 rounded-lg p-3 sm:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-body text-foreground-muted transition-colors duration-fast ease-standard hover:bg-accent-soft hover:text-foreground"
              >
                <ScrambleText text={item.label} />
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
