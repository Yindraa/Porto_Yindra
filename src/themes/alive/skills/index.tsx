"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
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
import { TiltCard } from "@/components/tilt-card";
import { useLanguage } from "@/components/language-provider";
import { ScrambleText } from "@/components/scramble-text";
import { skillCategoryOrder, skills, type Skill, type SkillCategoryKey } from "@/lib/skills-data";
import type { Dictionary } from "@/lib/i18n/types";
import { cn } from "@/lib/cn";
import { GradientText } from "../gradient-text";
import { SkillsMarquee } from "./skills-marquee";

const CATEGORY_ICONS: Record<SkillCategoryKey, LucideIcon> = {
  frontend: Code2,
  mobileDesktop: Smartphone,
  backend: Server,
  database: Database,
  design: Palette,
  tools: Wrench,
};

const CARD_ROTATE = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-1", "rotate-2"];
const SHAPES = ["alive-shape-1", "alive-shape-2", "alive-shape-3"];
const ACCENT_TEXT = ["text-accent", "text-accent-2", "text-accent-3"];

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
        {/* Raw text, not <ScrambleText>: background-clip:text needs the
            gradient span to own the text node directly (see About heading). */}
        <GradientText className="block text-h2 font-bold">{t.skills.heading}</GradientText>
      </Reveal>

      <Reveal delay={0.15} className="mt-10">
        <SkillsMarquee />
      </Reveal>

      <div className="mt-10 columns-1 gap-5 sm:columns-2">
        {categoryEntries.map(({ key, items }, i) => (
          <SkillCategoryCard
            key={key}
            icon={CATEGORY_ICONS[key]}
            label={t.skills.categoryLabels[key]}
            items={items}
            index={i}
          />
        ))}
      </div>

      <Reveal delay={0.5} className="mt-10">
        <h3 className="flex items-center gap-2 text-small font-medium text-foreground-muted">
          <Award size={15} strokeWidth={1.75} />
          <ScrambleText text={t.skills.certificatesLabel} />
        </h3>
        <div className="mt-4 columns-1 gap-4 sm:columns-2">
          {t.skills.certificates.map((cert, i) => (
            <CertificateCard key={i} cert={cert} index={i} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/** Same signature interaction as the About/Projects cards: cursor-tilt via
 * `TiltCard` plus a scroll-tied `y` drift, layered under a static rotation. */
function SkillCategoryCard({
  icon: Icon,
  label,
  items,
  index,
}: {
  icon: LucideIcon;
  label: string;
  items: Skill[];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const range: [number, number] = prefersReducedMotion
    ? [0, 0]
    : index % 2 === 0
      ? [20, -20]
      : [-20, 20];
  const y = useTransform(scrollYProgress, [0, 1], range);

  return (
    <Reveal delay={0.2 + index * 0.06} className="mb-5 break-inside-avoid">
      <motion.div ref={ref} style={{ y }} className={CARD_ROTATE[index % CARD_ROTATE.length]}>
        <TiltCard maxTilt={5}>
          <div className={cn("glass flex h-full flex-col p-5", SHAPES[index % SHAPES.length])}>
            <div className="flex items-center gap-2 text-foreground-muted">
              <Icon size={15} strokeWidth={1.75} className={ACCENT_TEXT[index % ACCENT_TEXT.length]} />
              <h3 className="text-small font-medium">
                <ScrambleText text={label} />
              </h3>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {items.map((skill) => (
                <span
                  key={skill.name}
                  className="inline-flex items-center gap-2 rounded-full border border-border py-1.5 pl-1.5 pr-3 text-small text-foreground"
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
        </TiltCard>
      </motion.div>
    </Reveal>
  );
}

function CertificateCard({
  cert,
  index,
}: {
  cert: Dictionary["skills"]["certificates"][number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const range: [number, number] = prefersReducedMotion
    ? [0, 0]
    : index % 2 === 0
      ? [16, -16]
      : [-16, 16];
  const y = useTransform(scrollYProgress, [0, 1], range);

  return (
    <Reveal delay={0.55 + index * 0.06} className="mb-4 break-inside-avoid">
      <motion.div ref={ref} style={{ y }} className={CARD_ROTATE[(index + 3) % CARD_ROTATE.length]}>
        <TiltCard maxTilt={5}>
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("glass flex items-center gap-3 p-3", SHAPES[(index + 1) % SHAPES.length])}
          >
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
              <Image
                src={cert.credentialUrl}
                alt={cert.title}
                fill
                sizes="48px"
                className="object-cover"
              />
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
        </TiltCard>
      </motion.div>
    </Reveal>
  );
}
