"use client";

import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";
import { ScrambleText } from "@/components/scramble-text";
import { FadeText } from "@/components/fade-text";

export function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="mx-auto w-full max-w-3xl px-6 py-28">
      <Reveal>
        <p className="text-small font-medium tracking-tight text-accent">
          <ScrambleText text={t.projects.eyebrow} />
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-4">
        <h2 className="text-h2 text-foreground">
          <ScrambleText text={t.projects.heading} />
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {t.projects.items.map((project, i) => (
          <Reveal key={i} delay={0.1 + i * 0.08}>
            <a
              href={project.href}
              className="glass group flex h-full flex-col rounded-lg p-6 transition-transform duration-base ease-standard hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-h3 text-foreground">
                  <ScrambleText text={project.title} />
                </h3>
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.75}
                  className="text-foreground-subtle transition-colors duration-fast ease-standard group-hover:text-accent"
                />
              </div>
              <p className="mt-3 flex-1 text-small leading-relaxed text-foreground-muted">
                <FadeText text={project.description} />
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border-strong px-2.5 py-1 text-caption text-foreground-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
