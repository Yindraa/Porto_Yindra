"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { ScrambleText } from "@/components/scramble-text";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/cn";
import { GradientText } from "../gradient-text";

const SPRING = { type: "spring", stiffness: 400, damping: 15 } as const;
const ACCENT_TEXT = ["text-accent", "text-accent-2", "text-accent-3"];

export function Footer() {
  const { t } = useLanguage();

  const navItems = [
    { href: "#about", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#projects", label: t.nav.projects },
    { href: "#skills", label: t.nav.skills },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <a href="#top">
          {/* Raw text, not <ScrambleText>: background-clip:text needs the
              gradient span to own the text node directly (see About heading). */}
          <GradientText className="text-small font-bold">{siteConfig.name}</GradientText>
        </a>

        <nav className="flex flex-wrap items-center justify-center gap-1">
          {navItems.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? -4 : 4 }}
              whileTap={{ scale: 0.92 }}
              transition={SPRING}
              className={cn(
                "rounded-full px-2.5 py-1 text-caption",
                ACCENT_TEXT[i % ACCENT_TEXT.length],
              )}
            >
              <ScrambleText text={item.label} />
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {t.contact.links.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                "text-caption transition-opacity duration-fast ease-standard hover:opacity-70",
                ACCENT_TEXT[i % ACCENT_TEXT.length],
              )}
            >
              {link.label}
            </a>
          ))}
          <motion.a
            href="#top"
            aria-label="Back to top"
            whileHover={{ scale: 1.15, rotate: -8 }}
            whileTap={{ scale: 0.9 }}
            transition={SPRING}
            className="glass flex h-8 w-8 items-center justify-center rounded-full text-foreground-muted"
          >
            <ArrowUp size={14} strokeWidth={1.75} />
          </motion.a>
        </div>
      </div>

      <div className="mx-auto mt-8 flex w-full max-w-3xl flex-col items-center justify-between gap-2 border-t border-border pt-6 text-caption text-foreground-subtle sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}.{" "}
          <ScrambleText text={t.footer.rights} />
        </p>
        <p>
          <ScrambleText text={t.footer.builtWith} />
        </p>
      </div>
    </footer>
  );
}
