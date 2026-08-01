"use client";

import Image from "next/image";
import {
  Award,
  Code2,
  Database,
  Palette,
  Server,
  Smartphone,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";
import { ScrambleText } from "@/components/scramble-text";
import { skillCategoryOrder, skills, type SkillCategoryKey } from "@/lib/skills-data";
import { SkillsMarquee } from "./skills-marquee";

const CATEGORY_ICONS: Record<SkillCategoryKey, LucideIcon> = {
  frontend: Code2,
  mobileDesktop: Smartphone,
  backend: Server,
  database: Database,
  design: Palette,
  tools: Wrench,
};

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

      <Reveal delay={0.15} className="mt-10">
        <SkillsMarquee />
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {skillCategoryOrder.map((key, i) => {
          const items = skills.filter((skill) => skill.category === key);
          if (items.length === 0) return null;
          const Icon = CATEGORY_ICONS[key];

          return (
            <Reveal key={key} delay={0.2 + i * 0.06}>
              <div className="glass flex h-full flex-col rounded-lg p-5">
                <div className="flex items-center gap-2 text-foreground-muted">
                  <Icon size={15} strokeWidth={1.75} />
                  <h3 className="text-small font-medium">
                    <ScrambleText text={t.skills.categoryLabels[key]} />
                  </h3>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-2 rounded-full border border-border py-1.5 pl-1.5 pr-3 text-small text-foreground transition-all duration-fast ease-standard hover:-translate-y-0.5 hover:border-accent/30 hover:bg-accent-soft"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#18181b]">
                        {/* eslint-disable-next-line @next/next/no-img-element -- tiny external SVG icons, next/image is unnecessary overhead here */}
                        <img src={skill.logo} alt="" width={12} height={12} className="h-3 w-3" />
                      </span>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.5} className="mt-10">
        <h3 className="flex items-center gap-2 text-small font-medium text-foreground-muted">
          <Award size={15} strokeWidth={1.75} />
          <ScrambleText text={t.skills.certificatesLabel} />
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {t.skills.certificates.map((cert, i) => (
            <a
              key={i}
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass flex items-center gap-3 rounded-lg p-3 transition-transform duration-base ease-standard hover:-translate-y-0.5"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
                <Image src={cert.credentialUrl} alt={cert.title} fill sizes="48px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-small font-medium text-foreground">
                  <ScrambleText text={cert.title} />
                </p>
                <p className="text-caption text-foreground-subtle">
                  {cert.issuer} &middot; {cert.date}
                </p>
              </div>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
