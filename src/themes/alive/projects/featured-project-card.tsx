"use client";

import Image from "next/image";
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

const ACCENT_BADGE = "bg-accent-2/10 text-accent-2";

export function FeaturedProjectCard({
  project,
  statusLabels,
  featuredLabel,
  onOpenGallery,
}: {
  project: ProjectItem;
  statusLabels: StatusLabels;
  featuredLabel: string;
  onOpenGallery: () => void;
}) {
  const hasGithub = Boolean(project.githubUrl && project.githubUrl !== "#");
  const hasLive = Boolean(project.liveUrl);

  return (
    <Reveal className="alive-span-all mb-5">
      <div className="sm:-rotate-1">
        <TiltCard maxTilt={4}>
          <div className="glass alive-shape-2 group flex flex-col overflow-hidden sm:flex-row">
            <button
              type="button"
              onClick={onOpenGallery}
              aria-label="Open project gallery"
              className="relative aspect-video w-full shrink-0 overflow-hidden sm:aspect-auto sm:w-2/5"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 640px) 420px, 100vw"
                className="object-cover transition-transform duration-slow ease-standard group-hover:scale-105"
              />
              <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-canvas/70 text-foreground-muted opacity-0 backdrop-blur-sm transition-opacity duration-fast ease-standard group-hover:opacity-100">
                <Maximize2 size={14} strokeWidth={1.75} />
              </span>
            </button>

            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-caption font-medium text-accent">
                    <ScrambleText text={featuredLabel} />
                  </p>
                  <p className="mt-1 text-caption text-foreground-subtle">
                    <ScrambleText text={project.category} />
                  </p>
                </div>
                {project.status !== "completed" && (
                  <span className="shrink-0 whitespace-nowrap rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 text-caption text-accent">
                    <ScrambleText
                      text={
                        project.status === "live" ? statusLabels.live : statusLabels.inProgress
                      }
                    />
                  </span>
                )}
              </div>

              {/* Raw text, not <ScrambleText>: background-clip:text needs the
                  gradient span to own the text node directly (see About heading). */}
              <GradientText className="mt-2 block text-h2 font-bold">
                {project.title}
              </GradientText>

              <p className="mt-4 flex-1 text-small leading-relaxed text-foreground-muted">
                <FadeText text={project.description} />
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={cn("rounded-full px-2.5 py-1 text-caption", ACCENT_BADGE)}
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
      </div>
    </Reveal>
  );
}
