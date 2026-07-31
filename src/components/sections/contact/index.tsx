"use client";

import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";
import { ScrambleText } from "@/components/scramble-text";
import { FadeText } from "@/components/fade-text";

export function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="mx-auto w-full max-w-3xl px-6 py-28">
      <Reveal>
        <div className="glass flex flex-col items-center rounded-xl px-8 py-16 text-center">
          <p className="text-small font-medium tracking-tight text-accent">
            <ScrambleText text={t.contact.eyebrow} />
          </p>
          <h2 className="mt-4 max-w-md text-h2 text-foreground">
            <ScrambleText text={t.contact.heading} />
          </h2>
          <p className="mt-4 max-w-sm text-body text-foreground-muted">
            <FadeText text={t.contact.body} />
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {t.contact.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full border border-border-strong px-5 py-2.5 text-small text-foreground transition-colors duration-fast ease-standard hover:bg-accent-soft hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
