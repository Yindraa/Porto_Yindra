"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
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

const ROTATE = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "rotate-3", "-rotate-3"];
const SHAPES = ["alive-shape-1", "alive-shape-2", "alive-shape-3"];
const ACCENT_TEXT = ["text-accent", "text-accent-2", "text-accent-3"];
const ACCENT_BORDER = ["border-accent/40", "border-accent-2/40", "border-accent-3/40"];

export function Skills() {
  const { t } = useLanguage();
  const [hoveredChip, setHoveredChip] = useState<number | null>(null);

  const categoryEntries = skillCategoryOrder
    .map((key) => ({ key, items: skills.filter((skill) => skill.category === key) }))
    .filter((entry) => entry.items.length > 0);

  // Running index across every chip regardless of category, so "neighbor"
  // means "next to it in the flow" — not scoped per category.
  let chipIndex = 0;

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

      {/* One flowing cluster, not a grid of boxed category cards — the
          category label is just a colored word inline in the flow, and
          every skill chip after it borrows that same color. Category is a
          color, not a container. */}
      <div className="mt-12 flex flex-wrap items-center gap-x-2 gap-y-4">
        {categoryEntries.map(({ key, items }, ci) => {
          const Icon = CATEGORY_ICONS[key];
          const colorClass = ACCENT_TEXT[ci % ACCENT_TEXT.length];
          const borderClass = ACCENT_BORDER[ci % ACCENT_BORDER.length];

          return (
            <Fragment key={key}>
              <span className={cn("mr-1 flex items-center gap-1.5 text-small font-medium", colorClass)}>
                <Icon size={14} strokeWidth={1.75} />
                <ScrambleText text={t.skills.categoryLabels[key]} />
              </span>
              {items.map((skill) => {
                const index = chipIndex++;
                return (
                  <SkillChip
                    key={skill.name}
                    skill={skill}
                    borderClass={borderClass}
                    index={index}
                    hoveredIndex={hoveredChip}
                    onHover={setHoveredChip}
                  />
                );
              })}
            </Fragment>
          );
        })}
      </div>

      <Reveal delay={0.5} className="mt-16">
        <h3 className="flex items-center gap-2 text-small font-medium text-foreground-muted">
          <Award size={15} strokeWidth={1.75} />
          <ScrambleText text={t.skills.certificatesLabel} />
        </h3>
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-6">
          {t.skills.certificates.map((cert, i) => (
            <CertificatePolaroid key={i} cert={cert} index={i} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/**
 * Idle-bob instead of scroll parallax — dozens of these exist at once, so
 * each gets a cheap looping float (no scroll listener) plus cursor-tilt,
 * staggered by `index` so the cluster doesn't bob in unison.
 *
 * Hovering one chip nudges its immediate neighbors a few px away (a
 * transform, not a layout change, so wrapping never breaks) and dims/
 * shrinks everything further away — reads as the cluster reacting to the
 * hovered chip without needing real physics or freeform positioning.
 */
function SkillChip({
  skill,
  borderClass,
  index,
  hoveredIndex,
  onHover,
}: {
  skill: Skill;
  borderClass: string;
  index: number;
  hoveredIndex: number | null;
  onHover: (index: number | null) => void;
}) {
  const prefersReducedMotion = useReducedMotion();

  const isHovered = hoveredIndex === index;
  const isNeighbor = hoveredIndex !== null && Math.abs(hoveredIndex - index) === 1;
  const isDimmed = hoveredIndex !== null && !isHovered && !isNeighbor;
  const nudge = isNeighbor ? (index < (hoveredIndex as number) ? -8 : 8) : 0;

  return (
    <motion.div
      onHoverStart={() => onHover(index)}
      onHoverEnd={() => onHover(null)}
      animate={{
        y: prefersReducedMotion ? 0 : [0, -4, 0],
        x: nudge,
        scale: isHovered ? 1.15 : isDimmed ? 0.94 : 1,
        opacity: isDimmed ? 0.5 : 1,
      }}
      transition={{
        y: prefersReducedMotion
          ? { duration: 0 }
          : {
              duration: 2.5 + (index % 5) * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (index % 7) * 0.15,
            },
        x: { type: "spring", stiffness: 400, damping: 22 },
        scale: { type: "spring", stiffness: 400, damping: 22 },
        opacity: { duration: 0.2 },
      }}
      className={cn(ROTATE[index % ROTATE.length], "relative")}
      style={{ zIndex: isHovered ? 10 : 1 }}
    >
      <TiltCard maxTilt={10}>
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3 text-small text-foreground",
            borderClass,
          )}
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#18181b]">
            {/* eslint-disable-next-line @next/next/no-img-element -- tiny external SVG icons, next/image is unnecessary overhead here */}
            <img src={skill.logo} alt="" width={12} height={12} className="h-3 w-3" />
          </span>
          {skill.name}
        </span>
      </TiltCard>
    </motion.div>
  );
}

/** Pinned photos on a corkboard, not a listing grid: framed thumbnail only
 * (no card background), caption floats free underneath. */
function CertificatePolaroid({
  cert,
  index,
}: {
  cert: Dictionary["skills"]["certificates"][number];
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Reveal delay={0.55 + index * 0.06}>
      <motion.a
        href={cert.credentialUrl}
        target="_blank"
        rel="noopener noreferrer"
        animate={prefersReducedMotion ? undefined : { y: [0, index % 2 === 0 ? -5 : 5, 0] }}
        transition={{
          duration: 4 + (index % 4),
          repeat: Infinity,
          ease: "easeInOut",
          delay: (index % 5) * 0.3,
        }}
        className={cn("block w-32", ROTATE[index % ROTATE.length])}
      >
        <TiltCard maxTilt={8}>
          <div
            className={cn(
              "relative aspect-square w-full overflow-hidden border",
              SHAPES[index % SHAPES.length],
              ACCENT_BORDER[index % ACCENT_BORDER.length],
            )}
          >
            <Image
              src={cert.credentialUrl}
              alt={cert.title}
              fill
              sizes="128px"
              className="object-cover"
            />
          </div>
        </TiltCard>
        <p className="mt-2 truncate text-caption font-medium text-foreground">
          <ScrambleText text={cert.title} />
        </p>
        <p className="truncate text-caption text-foreground-subtle">
          {cert.issuer} &middot; {cert.date}
        </p>
      </motion.a>
    </Reveal>
  );
}
