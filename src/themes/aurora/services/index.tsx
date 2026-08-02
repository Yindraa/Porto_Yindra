"use client";

import { Code2, Palette, Server, Smartphone, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";
import { ScrambleText } from "@/components/scramble-text";
import { FadeText } from "@/components/fade-text";

const ICONS: LucideIcon[] = [Code2, Smartphone, Server, Palette];

export function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="mx-auto w-full max-w-3xl scroll-mt-24 px-6 py-28">
      <Reveal>
        <p className="text-small font-medium tracking-tight text-accent">
          <ScrambleText text={t.services.eyebrow} />
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-4">
        <h2 className="text-h2 text-foreground">
          <ScrambleText text={t.services.heading} />
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {t.services.items.map((service, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <Reveal key={service.title} delay={0.15 + i * 0.06}>
              <div className="glass flex h-full flex-col rounded-lg p-5">
                <div className="flex items-center gap-2 text-foreground-muted">
                  <Icon size={16} strokeWidth={1.75} className="text-accent" />
                  <h3 className="text-small font-medium text-foreground">{service.title}</h3>
                </div>
                <p className="mt-3 flex-1 text-small leading-relaxed text-foreground-muted">
                  <FadeText text={service.desc} />
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.relatedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border-strong px-2.5 py-1 text-caption text-foreground-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
