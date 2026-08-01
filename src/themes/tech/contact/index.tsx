"use client";

import { Download } from "lucide-react";
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
      <Reveal>
        <p className="text-small font-medium tracking-tight text-accent">
          <ScrambleText text={t.contact.eyebrow} />
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-4">
        <h2 className="text-h2 text-foreground">
          <ScrambleText text={t.contact.heading} />
        </h2>
      </Reveal>

      <Reveal delay={0.15} className="mt-10">
        <div className="glass overflow-hidden rounded-md">
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            <span className="ml-2 text-caption text-foreground-subtle">~/portfolio/contact.sh</span>
          </div>

          <div className="p-5 text-small leading-relaxed sm:p-6">
            <p className="text-foreground-muted">
              <span className="text-accent">$</span> whoami --contact
            </p>
            <div className="mt-2 space-y-1">
              <p>
                <span className="text-accent">location:</span>{" "}
                <span className="text-foreground">{siteConfig.location}</span>
              </p>
              <p>
                <span className="text-accent">local_time:</span>{" "}
                <span className="text-foreground">
                  <LocalClock timeZone={siteConfig.timeZone} />
                </span>
              </p>
            </div>

            <p className="mt-3 text-foreground-muted">
              <FadeText text={t.contact.body} />
            </p>

            <a
              href={siteConfig.resumeHref}
              download
              className="mt-3 inline-flex items-center gap-1.5 text-foreground-muted transition-colors duration-fast ease-standard hover:text-accent"
            >
              <Download size={14} strokeWidth={1.75} /> curl -O resume.pdf
            </a>

            <div className="mt-6 border-t border-border pt-5">
              <p className="text-foreground-muted">
                <span className="text-accent">$</span> send-message --to=me
              </p>
              <div className="mt-3">
                <ContactForm labels={t.contact.form} />
              </div>
            </div>

            <div className="mt-6 border-t border-border pt-5">
              <p className="text-foreground-muted">
                <span className="text-accent">$</span> ls ~/socials
              </p>
              <div className="mt-2 space-y-1.5">
                {t.contact.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-1.5 text-foreground-muted transition-colors duration-fast ease-standard hover:text-accent"
                  >
                    <span className="text-accent">$</span> open --{link.label.toLowerCase()}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
