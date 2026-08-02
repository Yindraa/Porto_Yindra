"use client";

import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { ScrambleText } from "@/components/scramble-text";
import { siteConfig } from "@/lib/site-config";

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
        <a href="#top" className="text-small font-medium text-foreground">
          {siteConfig.name}
        </a>

        <nav className="flex flex-wrap items-center justify-center gap-5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-caption text-foreground-muted transition-colors duration-fast ease-standard hover:text-foreground"
            >
              <ScrambleText text={item.label} />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {t.contact.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-caption text-foreground-muted transition-colors duration-fast ease-standard hover:text-accent"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#top"
            aria-label="Back to top"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border-strong text-foreground-muted transition-colors duration-fast ease-standard hover:border-accent hover:text-accent"
          >
            <ArrowUp size={14} strokeWidth={1.75} />
          </a>
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
