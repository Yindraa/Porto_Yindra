"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";
import { useLanguage } from "@/components/language-provider";
import { skills } from "@/lib/skills-data";
import { cn } from "@/lib/cn";

const SHAPES = ["alive-shape-1", "alive-shape-2", "alive-shape-3"];
const ROTATE = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];
const ACCENT_TEXT = ["text-accent", "text-accent-2", "text-accent-3", "text-accent"];

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
      <div className="flex flex-wrap items-center justify-center gap-5">
        {items.map((item, i) => (
          <StatBadge key={item.label} value={item.value} label={item.label} index={i} />
        ))}
      </div>
    </section>
  );
}

function StatBadge({ value, label, index }: { value: number; label: string; index: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Reveal delay={index * 0.08}>
      <motion.div
        animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
        transition={{
          duration: 3.5 + index * 0.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.25,
        }}
        className={ROTATE[index % ROTATE.length]}
      >
        <TiltCard maxTilt={8}>
          <div
            className={cn(
              "glass flex min-w-28 flex-col items-center gap-1 px-6 py-4",
              SHAPES[index % SHAPES.length],
            )}
          >
            <span className={cn("text-h1 font-bold", ACCENT_TEXT[index % ACCENT_TEXT.length])}>
              {value}
            </span>
            <span className="text-caption text-foreground-subtle">{label}</span>
          </div>
        </TiltCard>
      </motion.div>
    </Reveal>
  );
}
