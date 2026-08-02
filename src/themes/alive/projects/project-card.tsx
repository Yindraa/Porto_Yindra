"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, GitFork, Maximize2 } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";
import { ScrambleText } from "@/components/scramble-text";
import { FadeText } from "@/components/fade-text";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/i18n/types";
import { GradientText } from "../gradient-text";

type ProjectItem = Dictionary["projects"]["items"][number];
type StatusLabels = Dictionary["projects"]["statusLabels"];

const SHAPES = ["alive-shape-1", "alive-shape-2", "alive-shape-3"];
const ACCENT_BADGE = ["bg-accent/10 text-accent", "bg-accent-2/10 text-accent-2", "bg-accent-3/10 text-accent-3"];

/**
 * A full-width row, image and content side by side, alternating which side
 * the image sits on per index — a story/timeline composition, not a grid
 * of uniform image-on-top cards like Aurora. `featured` just widens the
 * image and swaps the title to `GradientText`; everything else (tilt,
 * parallax, tags, links) stays the same shape of component, so a second
 * near-duplicate "featured" file isn't needed anymore.
 */
export function ProjectCard({
  project,
  statusLabels,
  index,
  featured = false,
  featuredLabel,
  delay,
  onOpenGallery,
}: {
  project: ProjectItem;
  statusLabels: StatusLabels;
  index: number;
  featured?: boolean;
  featuredLabel?: string;
  delay: number;
  onOpenGallery: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const range: [number, number] = prefersReducedMotion
    ? [0, 0]
    : index % 2 === 0
      ? [24, -24]
      : [-24, 24];
  const y = useTransform(scrollYProgress, [0, 1], range);

  const hasGithub = Boolean(project.githubUrl && project.githubUrl !== "#");
  const hasLive = Boolean(project.liveUrl);
  const imageFirst = index % 2 === 0;

  return (
    <Reveal delay={delay} className="mb-10 last:mb-0">
      <motion.div
        ref={ref}
        style={{ y }}
        className={cn(
          "group flex flex-col gap-6 sm:items-center sm:gap-8",
          imageFirst ? "sm:flex-row" : "sm:flex-row-reverse",
        )}
      >
        <TiltCard
          className={cn(
            "relative aspect-video w-full shrink-0 overflow-hidden",
            featured ? "sm:w-2/5" : "sm:w-1/3",
            SHAPES[index % SHAPES.length],
          )}
          maxTilt={6}
        >
          <button
            type="button"
            onClick={onOpenGallery}
            aria-label="Open project gallery"
            className="absolute inset-0"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 640px) 380px, 100vw"
              className="object-cover transition-transform duration-slow ease-standard group-hover:scale-105"
            />
            <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-canvas/70 text-foreground-muted opacity-0 backdrop-blur-sm transition-opacity duration-fast ease-standard group-hover:opacity-100">
              <Maximize2 size={14} strokeWidth={1.75} />
            </span>
          </button>
        </TiltCard>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              {featured && featuredLabel && (
                <p className="text-caption font-medium text-accent">
                  <ScrambleText text={featuredLabel} />
                </p>
              )}
              <p className={cn("text-caption text-foreground-subtle", featured && "mt-1")}>
                <ScrambleText text={project.category} />
              </p>
            </div>
            {project.status !== "completed" && (
              <span
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-full border px-2.5 py-1 text-caption",
                  project.status === "live"
                    ? "border-accent/30 bg-accent-soft text-accent"
                    : "border-border-strong text-foreground-muted",
                )}
              >
                <ScrambleText
                  text={project.status === "live" ? statusLabels.live : statusLabels.inProgress}
                />
              </span>
            )}
          </div>

          {featured ? (
            // Raw text, not <ScrambleText>: background-clip:text needs the
            // gradient span to own the text node directly (see About heading).
            <GradientText className="mt-1 block text-h2 font-bold">{project.title}</GradientText>
          ) : (
            <h3 className="mt-1 text-h3 text-foreground">
              <ScrambleText text={project.title} />
            </h3>
          )}

          <p className="mt-3 text-small leading-relaxed text-foreground-muted">
            <FadeText text={project.description} />
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
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

          {(hasGithub || hasLive) && (
            <div className="mt-4 flex items-center gap-4 border-t border-border pt-4">
              {hasGithub && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-caption text-foreground-muted transition-colors duration-fast ease-standard hover:text-accent"
                >
                  <GitFork size={14} strokeWidth={1.75} />
                  GitHub
                </a>
              )}
              {hasLive && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-caption text-foreground-muted transition-colors duration-fast ease-standard hover:text-accent"
                >
                  <ExternalLink size={14} strokeWidth={1.75} />
                  Live
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </Reveal>
  );
}
