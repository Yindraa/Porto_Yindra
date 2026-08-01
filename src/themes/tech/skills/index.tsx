"use client";

import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";
import { ScrambleText } from "@/components/scramble-text";
import { skillCategoryOrder, skills } from "@/lib/skills-data";
import { SkillsTicker } from "./skills-ticker";

export function Skills() {
  const { t } = useLanguage();

  const categoryEntries = skillCategoryOrder
    .map((key) => ({ key, items: skills.filter((skill) => skill.category === key) }))
    .filter((entry) => entry.items.length > 0);

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

      <Reveal delay={0.15} className="mt-10">
        <div className="glass overflow-hidden rounded-md">
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            <span className="ml-2 text-caption text-foreground-subtle">~/portfolio/skills.json</span>
          </div>

          <div className="p-5 text-small leading-relaxed sm:p-6">
            <p className="text-foreground-muted">
              <span className="text-accent">$</span> npm install
            </p>
            <div className="mt-3">
              <SkillsTicker />
            </div>

            <p className="mt-6 text-foreground-muted">
              <span className="text-accent">$</span> cat stack.json
            </p>
            <div className="mt-2 text-foreground">
              <span className="text-foreground-subtle">{"{"}</span>
              <div className="pl-4">
                {categoryEntries.map(({ key, items }, i) => (
                  <div key={key}>
                    <span className="text-accent">
                      &quot;
                      <ScrambleText text={t.skills.categoryLabels[key]} />
                      &quot;
                    </span>
                    <span className="text-foreground-subtle">: [</span>
                    {items.map((skill, j) => (
                      <span key={skill.name}>
                        &quot;{skill.name}&quot;
                        {j < items.length - 1 ? ", " : ""}
                      </span>
                    ))}
                    <span className="text-foreground-subtle">
                      ]{i < categoryEntries.length - 1 ? "," : ""}
                    </span>
                  </div>
                ))}
              </div>
              <span className="text-foreground-subtle">{"}"}</span>
            </div>

            <div className="mt-6 border-t border-border pt-5">
              <p className="text-foreground-muted">
                <span className="text-accent">$</span> ls ~/certificates
              </p>
              <div className="mt-2 divide-y divide-border border-t border-border">
                {t.skills.certificates.map((cert, i) => (
                  <a
                    key={i}
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 py-3 transition-colors duration-fast ease-standard hover:bg-accent-soft/40"
                  >
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-sm border border-border-strong">
                      <Image
                        src={cert.credentialUrl}
                        alt={cert.title}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-foreground">
                        <ScrambleText text={cert.title} />
                      </span>
                      <span className="block truncate text-caption text-foreground-subtle">
                        {cert.issuer} &middot; {cert.date}
                      </span>
                    </span>
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
