"use client";

import Image from "next/image";
import { Briefcase, GraduationCap, Layers, MapPin } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";
import { ScrambleText } from "@/components/scramble-text";
import { FadeText } from "@/components/fade-text";
import { TiltCard } from "@/components/tilt-card";
import { SpotlightPanel } from "@/components/spotlight-panel";
import { siteConfig } from "@/lib/site-config";

const FACT_ICONS = [MapPin, Layers, GraduationCap];

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="mx-auto w-full max-w-3xl scroll-mt-24 px-6 py-28">
      <Reveal>
        <p className="text-small font-medium tracking-tight text-accent">
          <ScrambleText text={t.about.eyebrow} />
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-4">
        <h2 className="text-h2 text-foreground">
          <ScrambleText text={t.about.heading} />
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-10 sm:grid-cols-[1.6fr_1fr] sm:items-start">
        <div className="space-y-4">
          {t.about.body.map((paragraph, i) => (
            <Reveal key={i} delay={0.15 + i * 0.08}>
              <p className="text-body-lg leading-relaxed text-foreground-muted">
                <FadeText text={paragraph} />
              </p>
            </Reveal>
          ))}
        </div>

        <div className="flex flex-col gap-5">
          <Reveal delay={0.2}>
            <TiltCard className="relative aspect-4/5 w-full overflow-hidden rounded-lg shadow-soft">
              <Image
                src="/about/4x6.jpg.jpeg"
                alt={siteConfig.name}
                fill
                sizes="(min-width: 640px) 240px, 100vw"
                className="object-cover transition-transform duration-slow ease-standard hover:scale-105"
              />
            </TiltCard>
          </Reveal>

          <Reveal delay={0.3}>
            <SpotlightPanel className="glass rounded-lg">
              <div className="flex flex-col divide-y divide-border p-5">
                {t.about.facts.map((fact, i) => {
                  const Icon = FACT_ICONS[i];
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                    >
                      <span className="flex items-center gap-2 text-caption text-foreground-subtle">
                        {Icon && <Icon size={14} strokeWidth={1.75} />}
                        <ScrambleText text={fact.label} />
                      </span>
                      <span className="text-right text-small font-medium text-foreground">
                        <ScrambleText text={fact.value} />
                      </span>
                    </div>
                  );
                })}
              </div>
            </SpotlightPanel>
          </Reveal>
        </div>
      </div>

      <div className="mt-24">
        <Reveal>
          <p className="text-small font-medium tracking-tight text-accent">
            <ScrambleText text={t.about.timelineLabel} />
          </p>
        </Reveal>

        <div className="mt-8 space-y-10 border-l border-border pl-6 sm:pl-8">
          {t.about.timeline.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08} className="relative">
              <span className="absolute -left-7.5 top-1.5 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-2 border-accent bg-canvas sm:-left-9.5">
                <Briefcase size={11} strokeWidth={2} className="text-accent" />
              </span>

              <p className="text-caption font-medium uppercase tracking-wide text-foreground-subtle">
                <ScrambleText text={item.duration} />
              </p>
              <h3 className="mt-1 text-h3 text-foreground">
                <ScrambleText text={item.role} />
              </h3>
              <p className="text-small text-accent">
                <ScrambleText text={item.company} />
              </p>

              <ul className="mt-3 space-y-1.5">
                {item.description.map((line, j) => (
                  <li key={j} className="text-body text-foreground-muted">
                    <FadeText text={line} />
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex flex-wrap gap-2">
                {item.skillTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-accent-soft px-2.5 py-1 text-caption text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
