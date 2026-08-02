"use client";

import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";
import { skills } from "@/lib/skills-data";

export function Stats() {
  const { t } = useLanguage();

  const items = [
    { value: t.projects.items.length, label: t.stats.projectsLabel },
    { value: skills.length, label: t.stats.skillsLabel },
    { value: t.skills.certificates.length, label: t.stats.certificatesLabel },
    { value: t.about.timeline.length, label: t.stats.experienceLabel },
  ];

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="grid grid-cols-2 gap-6 border-y border-border py-8 sm:grid-cols-4">
        {items.map((item) => (
          <Reveal key={item.label} className="text-center">
            <p className="text-h1 font-semibold text-accent">{item.value}</p>
            <p className="mt-1 text-caption text-foreground-subtle">{item.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
