"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Download, MapPin } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";
import { useLanguage } from "@/components/language-provider";
import { ScrambleText } from "@/components/scramble-text";
import { FadeText } from "@/components/fade-text";
import { LocalClock } from "@/components/local-clock";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/cn";
import { GradientText } from "../gradient-text";
import { ContactForm } from "./contact-form";

const SPRING = { type: "spring", stiffness: 400, damping: 15 } as const;
const ACCENT_BADGE = [
  "border-accent/30 bg-accent/10 text-accent",
  "border-accent-2/30 bg-accent-2/10 text-accent-2",
  "border-accent-3/30 bg-accent-3/10 text-accent-3",
];

export function Contact() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="contact" className="mx-auto w-full max-w-3xl scroll-mt-24 px-6 py-28">
      <Reveal>
        <p className="text-small font-medium tracking-tight text-accent">
          <ScrambleText text={t.contact.eyebrow} />
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-4">
        {/* Raw text, not <ScrambleText>: background-clip:text needs the
            gradient span to own the text node directly (see About heading). */}
        <GradientText className="block text-h2 font-bold">{t.contact.heading}</GradientText>
      </Reveal>

      {/* Side-by-side, not Aurora's single centered column: intro + meta +
          links on one side, the form standing alone as its own card on the
          other — same asymmetric split already used for Projects/About. */}
      <div className="mt-10 grid gap-10 sm:grid-cols-[1fr_1.1fr] sm:items-start">
        <div className="space-y-6 sm:-rotate-1">
          <Reveal delay={0.15}>
            <p className="text-body text-foreground-muted">
              <FadeText text={t.contact.body} />
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <motion.div
              animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex rotate-1"
            >
              <div className="glass inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-caption text-foreground-subtle">
                <MapPin size={13} strokeWidth={1.75} className="text-accent" />
                <span>{siteConfig.location}</span>
                <span>&middot;</span>
                <ScrambleText text={t.contact.localTimeLabel} />
                <LocalClock timeZone={siteConfig.timeZone} />
              </div>
            </motion.div>
          </Reveal>

          <Reveal delay={0.25}>
            <motion.a
              href={siteConfig.resumeHref}
              download
              whileHover={{ scale: 1.06, rotate: -2 }}
              whileTap={{ scale: 0.92 }}
              transition={SPRING}
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-small font-medium text-foreground"
            >
              <Download size={14} strokeWidth={1.75} />
              <ScrambleText text={t.contact.downloadCv} />
            </motion.a>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-wrap gap-3">
              {t.contact.links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{ scale: 1.08, rotate: i % 2 === 0 ? -3 : 3 }}
                  whileTap={{ scale: 0.92 }}
                  transition={SPRING}
                  className={cn(
                    "rounded-full border px-4 py-2 text-small",
                    ACCENT_BADGE[i % ACCENT_BADGE.length],
                  )}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="sm:rotate-1">
            <TiltCard maxTilt={4}>
              <div className="glass alive-shape-1 p-6 sm:p-8">
                <ContactForm labels={t.contact.form} />
              </div>
            </TiltCard>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
