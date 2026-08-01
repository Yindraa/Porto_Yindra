"use client";

import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";
import { ScrambleText } from "@/components/scramble-text";
import { FadeText } from "@/components/fade-text";
import { siteConfig } from "@/lib/site-config";

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

      <Reveal delay={0.15} className="mt-10">
        <div className="glass overflow-hidden rounded-md">
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            <span className="ml-2 text-caption text-foreground-subtle">~/portfolio/about.sh</span>
          </div>

          <div className="grid gap-8 p-5 text-small leading-relaxed sm:grid-cols-[1.6fr_1fr] sm:p-6">
            <div className="space-y-4">
              <p className="text-foreground-muted">
                <span className="text-accent">$</span> cat about.md
              </p>
              <div className="space-y-4 text-foreground">
                {t.about.body.map((paragraph, i) => (
                  <p key={i}>
                    <FadeText text={paragraph} />
                  </p>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-md border border-border-strong">
                <span className="absolute left-2 top-2 z-10 rounded bg-glass px-1.5 py-0.5 text-caption text-foreground-subtle">
                  [photo.jpg]
                </span>
                <Image
                  src="/about/4x6.jpg.jpeg"
                  alt={siteConfig.name}
                  fill
                  sizes="(min-width: 640px) 240px, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="space-y-1.5">
                <p className="text-foreground-muted">
                  <span className="text-accent">$</span> neofetch --minimal
                </p>
                {t.about.facts.map((fact, i) => (
                  <p key={i}>
                    <span className="text-accent">
                      <ScrambleText text={fact.label.toLowerCase()} />:
                    </span>{" "}
                    <span className="text-foreground">
                      <ScrambleText text={fact.value} />
                    </span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2} className="mt-10">
        <div className="glass overflow-hidden rounded-md">
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            <span className="ml-2 text-caption text-foreground-subtle">~/portfolio/timeline.sh</span>
          </div>

          <div className="space-y-6 p-5 text-small leading-relaxed sm:p-6">
            <p className="text-foreground-muted">
              <span className="text-accent">$</span> git log --reverse
            </p>

            {t.about.timeline.map((item) => (
              <div key={item.id} className="border-l-2 border-border-strong pl-4">
                <p className="text-accent">
                  commit <ScrambleText text={item.id} />
                </p>
                <p className="text-foreground-muted">
                  Author: <ScrambleText text={item.role} className="text-foreground" /> &lt;
                  <ScrambleText text={item.company} />
                  &gt;
                </p>
                <p className="text-foreground-muted">
                  Date:   <ScrambleText text={item.duration} />
                </p>

                <div className="mt-2 space-y-1 pl-4 text-foreground">
                  {item.description.map((line, j) => (
                    <p key={j}>
                      <FadeText text={line} />
                    </p>
                  ))}
                </div>

                <p className="mt-2 pl-4 text-foreground-subtle">
                  tags: {item.skillTags.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
