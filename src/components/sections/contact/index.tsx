"use client";

import { Download, MapPin } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";
import { ScrambleText } from "@/components/scramble-text";
import { FadeText } from "@/components/fade-text";
import { LocalClock } from "@/components/local-clock";
import { siteConfig } from "@/lib/site-config";
import { ContactForm } from "./contact-form";

export function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="mx-auto w-full max-w-3xl scroll-mt-24 px-6 py-28">
      <div className="text-center">
        <Reveal>
          <p className="text-small font-medium tracking-tight text-accent">
            <ScrambleText text={t.contact.eyebrow} />
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-4">
          <h2 className="mx-auto max-w-md text-h2 text-foreground">
            <ScrambleText text={t.contact.heading} />
          </h2>
        </Reveal>

        <Reveal delay={0.2} className="mt-4">
          <p className="mx-auto max-w-sm text-body text-foreground-muted">
            <FadeText text={t.contact.body} />
          </p>
        </Reveal>

        <Reveal delay={0.25} className="mt-4">
          <div className="inline-flex items-center gap-1.5 text-caption text-foreground-subtle">
            <MapPin size={13} strokeWidth={1.75} />
            <span>{siteConfig.location}</span>
            <span>&middot;</span>
            <ScrambleText text={t.contact.localTimeLabel} />
            <LocalClock timeZone={siteConfig.timeZone} />
          </div>
        </Reveal>

        <Reveal delay={0.28} className="mt-6">
          <a
            href={siteConfig.resumeHref}
            download
            className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-small font-medium text-foreground transition-transform duration-fast ease-standard hover:scale-[1.02]"
          >
            <Download size={14} strokeWidth={1.75} />
            <ScrambleText text={t.contact.downloadCv} />
          </a>
        </Reveal>
      </div>

      <Reveal delay={0.3} className="mt-10">
        <div className="glass mx-auto max-w-md rounded-xl p-6 sm:p-8">
          <ContactForm labels={t.contact.form} />

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="whitespace-nowrap text-caption text-foreground-subtle">
              <ScrambleText text={t.contact.orDivider} />
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {t.contact.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full border border-border-strong px-4 py-2 text-small text-foreground transition-colors duration-fast ease-standard hover:bg-accent-soft hover:text-accent"
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
