"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { VariantToggle } from "@/components/variant-toggle";
import { useLanguage } from "@/components/language-provider";
import { useVariant } from "@/components/variant-provider";
import { ScrambleText } from "@/components/scramble-text";
import { siteConfig } from "@/lib/site-config";
import { useActiveSection } from "@/lib/hooks/use-active-section";
import { useScrolled } from "@/lib/hooks/use-scrolled";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;
const SECTION_IDS = ["about", "projects", "skills", "contact"] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const { variant } = useVariant();
  const activeSection = useActiveSection(SECTION_IDS, variant);
  const scrolled = useScrolled();

  const navItems = [
    { id: "about", href: "#about", label: t.nav.about },
    { id: "projects", href: "#projects", label: t.nav.projects },
    { id: "skills", href: "#skills", label: t.nav.skills },
    { id: "contact", href: "#contact", label: t.nav.contact },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6">
      {/* Relative wrapper: the dropdown below positions itself off this
          box's actual rendered height (top-full), instead of a guessed
          pixel offset that can drift out of sync with the bar's height. */}
      <div className="relative w-full max-w-3xl">
        <div
          className={cn(
            "relative z-20 flex w-full items-center justify-between rounded-lg px-5 py-3 transition-colors duration-base ease-standard",
            scrolled ? "glass-solid" : "glass",
          )}
        >
          <a
            href="#top"
            className="group relative text-small font-medium tracking-tight text-foreground"
          >
            {siteConfig.name}
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-foreground transition-transform duration-base ease-standard group-hover:scale-x-100" />
          </a>

          <nav className="hidden items-center gap-7 sm:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative py-1 text-small transition-colors duration-fast ease-standard",
                    isActive ? "text-foreground" : "text-foreground-muted hover:text-foreground",
                  )}
                >
                  <ScrambleText text={item.label} />
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-px bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* On mobile these move into the dropdown below instead, so the
                bar itself stays down to just the logo + menu button. */}
            <div className="hidden items-center gap-2 sm:flex">
              <LanguageToggle />
              <VariantToggle />
              {variant === "aurora" && <ThemeToggle />}
            </div>
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
            <>
              <motion.div
                key="scrim"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="fixed inset-0 z-10 bg-canvas/70 backdrop-blur-sm sm:hidden"
                aria-hidden="true"
              />
              <motion.nav
                key="menu"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="glass-solid absolute inset-x-0 top-full z-20 mt-3 flex flex-col gap-1 rounded-lg p-3 sm:hidden"
              >
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-md px-3 py-2 text-body transition-colors duration-fast ease-standard hover:bg-accent-soft hover:text-foreground",
                        isActive ? "text-foreground" : "text-foreground-muted",
                      )}
                    >
                      <ScrambleText text={item.label} />
                    </a>
                  );
                })}

                <div className="mt-2 flex items-center justify-center gap-2 border-t border-border pt-3">
                  <LanguageToggle />
                  <VariantToggle />
                  {variant === "aurora" && <ThemeToggle />}
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
