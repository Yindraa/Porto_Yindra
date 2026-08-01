"use client";

import Image from "next/image";
import { ExternalLink, GitFork } from "lucide-react";
import { ScrambleText } from "@/components/scramble-text";
import { FadeText } from "@/components/fade-text";
import type { Dictionary } from "@/lib/i18n/types";

type ProjectItem = Dictionary["projects"]["items"][number];
type StatusLabels = Dictionary["projects"]["statusLabels"];

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
    <div className="rounded-md border border-border-strong p-4 sm:p-5">
      <p className="text-foreground-muted">
        <span className="text-accent">$</span> cat {project.id}/README.md
      </p>

      <div className="mt-3 flex flex-col gap-4 sm:flex-row">
        <button
          type="button"
          onClick={onOpenGallery}
          aria-label="Open project gallery"
          className="relative aspect-video w-full shrink-0 overflow-hidden rounded-sm border border-border-strong sm:w-48"
        >
          <span className="absolute left-1.5 top-1.5 z-10 rounded bg-glass px-1.5 py-0.5 text-caption text-foreground-subtle">
            [preview]
          </span>
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 640px) 192px, 100vw"
            className="object-cover"
          />
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-accent">
              # <ScrambleText text={featuredLabel} />
            </span>
            {project.status !== "completed" && (
              <span className="text-caption text-foreground-subtle">
                [
                <ScrambleText
                  text={project.status === "live" ? statusLabels.live : statusLabels.inProgress}
                />
                ]
              </span>
            )}
          </div>

          <h3 className="mt-1 text-h3 text-foreground">
            <ScrambleText text={project.title} />
          </h3>

          <p className="mt-2 text-foreground-muted">
            <FadeText text={project.description} />
          </p>

          <p className="mt-3 text-foreground-subtle">tags: {project.tags.join(", ")}</p>

          {(hasGithub || hasLive) && (
            <div className="mt-3 flex flex-wrap items-center gap-4">
              {hasGithub && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-foreground-muted transition-colors duration-fast ease-standard hover:text-accent"
                >
                  <GitFork size={14} strokeWidth={1.75} /> git clone
                </a>
              )}
              {hasLive && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-foreground-muted transition-colors duration-fast ease-standard hover:text-accent"
                >
                  <ExternalLink size={14} strokeWidth={1.75} /> open --live
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
