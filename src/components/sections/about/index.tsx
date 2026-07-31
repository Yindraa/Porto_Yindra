"use client";

import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";
import { ScrambleText } from "@/components/scramble-text";
import { FadeText } from "@/components/fade-text";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="mx-auto w-full max-w-3xl px-6 py-28">
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

      <Reveal delay={0.2} className="mt-6">
        <p className="text-body-lg leading-relaxed text-foreground-muted">
          <FadeText text={t.about.body} />
        </p>
      </Reveal>
    </section>
  );
}
