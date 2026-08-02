"use client";

import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";
import { ScrambleText } from "@/components/scramble-text";
import { FadeText } from "@/components/fade-text";

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

      <Reveal delay={0.15} className="mt-10">
        <div className="glass overflow-hidden rounded-md">
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            <span className="ml-2 text-caption text-foreground-subtle">~/portfolio/services.sh</span>
          </div>

          <div className="p-5 text-small leading-relaxed sm:p-6">
            <p className="text-foreground-muted">
              <span className="text-accent">$</span> ./services --list
            </p>

            <div className="mt-4 space-y-5">
              {t.services.items.map((service, i) => (
                <div key={service.title} className="border-l-2 border-border-strong pl-4">
                  <p className="text-foreground">
                    <span className="text-accent">[{i + 1}]</span> {service.title}
                  </p>
                  <p className="mt-1 pl-4 text-foreground-muted">
                    <FadeText text={service.desc} />
                  </p>
                  <p className="mt-1 pl-4 text-foreground-subtle">
                    stack: {service.relatedSkills.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
