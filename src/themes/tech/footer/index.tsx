"use client";

import { useLanguage } from "@/components/language-provider";
import { ScrambleText } from "@/components/scramble-text";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const { t } = useLanguage();

  const navItems = [
    { href: "#about", label: t.nav.about },
    { href: "#projects", label: t.nav.projects },
    { href: "#skills", label: t.nav.skills },
    { href: "#contact", label: t.nav.contact },
  ];
  const slug = siteConfig.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <footer className="border-t border-border px-6 py-8 text-small">
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-foreground-muted">
          <span className="text-accent">visitor@{slug}</span>
          <span>:~$</span>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors duration-fast ease-standard hover:text-accent"
            >
              [<ScrambleText text={item.label} />]
            </a>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-foreground-subtle">
          <div className="flex flex-wrap items-center gap-4">
            {t.contact.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors duration-fast ease-standard hover:text-accent"
              >
                <span className="text-accent">$</span> open --{link.label.toLowerCase()}
              </a>
            ))}
          </div>
          <a
            href="#top"
            aria-label="Back to top"
            className="transition-colors duration-fast ease-standard hover:text-accent"
          >
            [ cd ~/top ]
          </a>
        </div>

        <div className="mt-4 space-y-1 text-foreground-subtle">
          <p>
            # <ScrambleText text={t.footer.builtWith} />
          </p>
          <p>
            # &copy; {new Date().getFullYear()} {siteConfig.name} &mdash;{" "}
            <ScrambleText text={t.footer.rights} />
          </p>
        </div>
      </div>
    </footer>
  );
}
