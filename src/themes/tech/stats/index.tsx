"use client";

import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";
import { skills } from "@/lib/skills-data";

export function Stats() {
  const { t } = useLanguage();

  const items = [
    { label: t.stats.projectsLabel, value: t.projects.items.length },
    { label: t.stats.skillsLabel, value: skills.length },
    { label: t.stats.certificatesLabel, value: t.skills.certificates.length },
    { label: t.stats.experienceLabel, value: t.about.timeline.length },
  ];

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-12">
      <Reveal>
        <div className="glass overflow-hidden rounded-md">
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            <span className="ml-2 text-caption text-foreground-subtle">~/portfolio/stats.sh</span>
          </div>

          <div className="p-5 text-small leading-relaxed sm:p-6">
            <p className="text-foreground-muted">
              <span className="text-accent">$</span> stats --summary
            </p>
            <div className="mt-2 space-y-1">
              {items.map((item) => (
                <p key={item.label}>
                  <span className="text-accent">{item.label.toLowerCase().replace(/\s+/g, "_")}:</span>{" "}
                  <span className="text-foreground">{item.value}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
