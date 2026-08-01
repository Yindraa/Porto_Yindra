"use client";

import { useRef, type ComponentType } from "react";
import Image from "next/image";
import { Briefcase, GraduationCap, Layers, MapPin } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";
import { ScrambleText } from "@/components/scramble-text";
import { FadeText } from "@/components/fade-text";
import { TiltCard } from "@/components/tilt-card";
import { SpotlightPanel } from "@/components/spotlight-panel";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/i18n/types";
import { GradientText } from "../gradient-text";

type TimelineItem = Dictionary["about"]["timeline"][number];

const FACT_ICONS = [MapPin, Layers, GraduationCap];
const FACT_ROTATE = ["-rotate-2", "rotate-1", "-rotate-1"];
const TIMELINE_ROTATE = ["-rotate-1", "rotate-1", "-rotate-2", "rotate-2"];

/** Alive's multi-color identity — cycled by index instead of a single
 * --accent everywhere, so cards read as genuinely different, not just
 * re-skinned. Kept off small pills' shape (see .alive-shape-* in
 * globals.css), but their color still cycles through this palette. */
const ACCENT_TEXT = ["text-accent", "text-accent-2", "text-accent-3"];
const ACCENT_BADGE = ["bg-accent/10 text-accent", "bg-accent-2/10 text-accent-2", "bg-accent-3/10 text-accent-3"];
const SHAPES = ["alive-shape-1", "alive-shape-2", "alive-shape-3"];

export function About() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const photoFloat = prefersReducedMotion ? undefined : { y: [0, -10, 0] };

  return (
    <section id="about" className="mx-auto w-full max-w-3xl scroll-mt-24 px-6 py-28">
      <Reveal>
        <p className="text-small font-medium tracking-tight text-accent">
          <ScrambleText text={t.about.eyebrow} />
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-4">
        {/* Raw text, not <ScrambleText>: background-clip:text needs the
            gradient span to own the text node directly, a nested child
            span would just render invisible (inherits color:transparent
            without the background it's clipped to). */}
        <GradientText className="block text-h2 font-bold">{t.about.heading}</GradientText>
      </Reveal>

      <div className="mt-12 grid gap-12 sm:grid-cols-[1.6fr_1fr] sm:items-start">
        <div className="space-y-4 sm:-rotate-1">
          {t.about.body.map((paragraph, i) => (
            <Reveal key={i} delay={0.15 + i * 0.08}>
              <p className="text-body-lg leading-relaxed text-foreground-muted">
                <FadeText text={paragraph} />
              </p>
            </Reveal>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <Reveal delay={0.2}>
            <motion.div
              animate={photoFloat}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="sm:-rotate-2"
            >
              <TiltCard className={cn("relative aspect-4/5 w-full overflow-hidden shadow-soft", SHAPES[0])}>
                <Image
                  src="/about/4x6.jpg.jpeg"
                  alt={siteConfig.name}
                  fill
                  sizes="(min-width: 640px) 240px, 100vw"
                  className="object-cover"
                />
              </TiltCard>
            </motion.div>
          </Reveal>

          <div className="flex flex-wrap gap-3">
            {t.about.facts.map((fact, i) => (
              <FactChip
                key={i}
                icon={FACT_ICONS[i]}
                label={fact.label}
                value={fact.value}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-24">
        <Reveal>
          <p className="text-small font-medium tracking-tight text-accent">
            <ScrambleText text={t.about.timelineLabel} />
          </p>
        </Reveal>

        <div className="mt-8 space-y-6">
          {t.about.timeline.map((item, i) => (
            <TimelineCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Fact chips get two layers of interaction on top of the base entrance:
 * a scroll-tied parallax drift (via `style={{ y }}`, driven by how far the
 * chip has traveled through the viewport) and a pointer tilt from
 * `TiltCard` — motion that responds to the user, not just an autonomous
 * loop, which is what "alive" is supposed to mean here.
 */
function FactChip({
  icon: Icon,
  label,
  value,
  index,
}: {
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  label: string;
  value: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const range: [number, number] = prefersReducedMotion
    ? [0, 0]
    : index % 2 === 0
      ? [30, -30]
      : [-30, 30];
  const y = useTransform(scrollYProgress, [0, 1], range);

  return (
    <Reveal delay={0.3 + index * 0.1}>
      <motion.div ref={ref} style={{ y }} className={FACT_ROTATE[index]}>
        <TiltCard maxTilt={6}>
          <SpotlightPanel className="glass rounded-full px-4 py-2.5">
            <div className="flex items-center gap-2">
              {Icon && (
                <Icon size={14} strokeWidth={1.75} className={ACCENT_TEXT[index % ACCENT_TEXT.length]} />
              )}
              <span className="text-caption text-foreground-subtle">
                <ScrambleText text={label} />
              </span>
              <span className="text-small font-medium text-foreground">
                <ScrambleText text={value} />
              </span>
            </div>
          </SpotlightPanel>
        </TiltCard>
      </motion.div>
    </Reveal>
  );
}

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const range: [number, number] = prefersReducedMotion
    ? [0, 0]
    : index % 2 === 0
      ? [40, -40]
      : [-40, 40];
  const y = useTransform(scrollYProgress, [0, 1], range);

  return (
    <Reveal delay={index * 0.1}>
      <motion.div
        ref={ref}
        style={{ y }}
        className={cn(
          "sm:max-w-xl",
          index % 2 === 1 && "sm:ml-auto",
          TIMELINE_ROTATE[index % TIMELINE_ROTATE.length],
        )}
      >
        <TiltCard maxTilt={5}>
          <SpotlightPanel className={cn("glass p-5", SHAPES[index % SHAPES.length])}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="flex items-center gap-2 text-h3 text-foreground">
                <Briefcase
                  size={16}
                  strokeWidth={1.75}
                  className={ACCENT_TEXT[index % ACCENT_TEXT.length]}
                />
                <ScrambleText text={item.role} />
              </h3>
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-caption",
                  ACCENT_BADGE[index % ACCENT_BADGE.length],
                )}
              >
                <ScrambleText text={item.duration} />
              </span>
            </div>
            <p className="mt-1 text-small text-foreground-muted">
              <ScrambleText text={item.company} />
            </p>

            <ul className="mt-3 space-y-1.5">
              {item.description.map((line, j) => (
                <li key={j} className="text-body text-foreground-muted">
                  <FadeText text={line} />
                </li>
              ))}
            </ul>

            <div className="mt-3 flex flex-wrap gap-2">
              {item.skillTags.map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-caption",
                    ACCENT_BADGE[index % ACCENT_BADGE.length],
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          </SpotlightPanel>
        </TiltCard>
      </motion.div>
    </Reveal>
  );
}
