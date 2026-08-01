"use client";

import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";
import { ScrambleText } from "@/components/scramble-text";

export function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="mx-auto w-full max-w-3xl scroll-mt-24 px-6 py-28">
      <Reveal>
        <p className="text-small font-medium tracking-tight text-accent">
          <ScrambleText text={t.skills.eyebrow} />
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-4">
        <h2 className="text-h2 text-foreground">
          <ScrambleText text={t.skills.heading} />
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {t.skills.groups.map((group, i) => (
          <Reveal key={i} delay={0.1 + i * 0.06}>
            <h3 className="text-small font-medium text-foreground-muted">
              <ScrambleText text={group.category} />
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border px-3 py-1.5 text-small text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
