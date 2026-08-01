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

type ProjectItem = Dictionary["projects"]["items"][number];
type StatusLabels = Dictionary["projects"]["statusLabels"];

const ROTATE = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

/**
 * Same signature interaction as the About timeline/fact cards: cursor-tilt
 * via `TiltCard` plus a scroll-tied `y` drift, so motion here responds to
 * the user (pointer, scroll) instead of just looping on its own.
 */
export function ProjectCard({
  project,
  statusLabels,
  index,
  delay,
  onOpenGallery,
}: {
  project: ProjectItem;
  statusLabels: StatusLabels;
  index: number;
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

  return (
    <Reveal delay={delay}>
      <motion.div ref={ref} style={{ y }} className={ROTATE[index % ROTATE.length]}>
        <TiltCard maxTilt={6}>
          <div className="glass group flex h-full flex-col overflow-hidden rounded-lg">
            <button
              type="button"
              onClick={onOpenGallery}
              aria-label="Open project gallery"
              className="relative aspect-video w-full overflow-hidden"
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

            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-caption text-foreground-subtle">
                    <ScrambleText text={project.category} />
                  </p>
                  <h3 className="mt-1 text-h3 text-foreground">
                    <ScrambleText text={project.title} />
                  </h3>
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
                      text={
                        project.status === "live" ? statusLabels.live : statusLabels.inProgress
                      }
                    />
                  </span>
                )}
              </div>

              <p className="mt-3 flex-1 text-small leading-relaxed text-foreground-muted">
                <FadeText text={project.description} />
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-accent-soft px-2.5 py-1 text-caption text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {(hasGithub || hasLive) && (
                <div className="mt-5 flex items-center gap-4 border-t border-border pt-4">
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
          </div>
        </TiltCard>
      </motion.div>
    </Reveal>
  );
}
