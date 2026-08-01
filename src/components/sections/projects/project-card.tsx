"use client";

import Image from "next/image";
import { ExternalLink, GitFork, Maximize2 } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";
import { ScrambleText } from "@/components/scramble-text";
import { FadeText } from "@/components/fade-text";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/i18n/types";

type ProjectItem = Dictionary["projects"]["items"][number];
type StatusLabels = Dictionary["projects"]["statusLabels"];

export function ProjectCard({
  project,
  statusLabels,
  delay,
  onOpenGallery,
}: {
  project: ProjectItem;
  statusLabels: StatusLabels;
  delay: number;
  onOpenGallery: () => void;
}) {
  const hasGithub = Boolean(project.githubUrl && project.githubUrl !== "#");
  const hasLive = Boolean(project.liveUrl);

  return (
    <Reveal delay={delay}>
      <div className="glass group flex h-full flex-col overflow-hidden rounded-lg transition-transform duration-base ease-standard hover:-translate-y-1">
        <button
          type="button"
          onClick={onOpenGallery}
          aria-label="Open project gallery"
          className="relative aspect-video w-full overflow-hidden"
        >
          <TiltCard className="absolute inset-0" maxTilt={6}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 640px) 380px, 100vw"
              className="object-cover transition-transform duration-slow ease-standard group-hover:scale-105"
            />
          </TiltCard>
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
                  text={project.status === "live" ? statusLabels.live : statusLabels.inProgress}
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
                className="rounded-full border border-border-strong px-2.5 py-1 text-caption text-foreground-muted"
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
    </Reveal>
  );
}
