"use client";

import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { ScrambleText } from "@/components/scramble-text";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/i18n/types";

type ProjectItem = Dictionary["projects"]["items"][number];
type StatusLabels = Dictionary["projects"]["statusLabels"];

export function ProjectCard({
  project,
  statusLabels,
  onOpenGallery,
}: {
  project: ProjectItem;
  statusLabels: StatusLabels;
  onOpenGallery: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpenGallery}
      aria-label="Open project gallery"
      className="group flex w-full items-center gap-4 border-b border-border py-3 text-left transition-colors duration-fast ease-standard last:border-b-0 hover:bg-accent-soft/40"
    >
      <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm border border-border-strong">
        <Image src={project.image} alt={project.title} fill sizes="56px" className="object-cover" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate text-foreground">
            <ScrambleText text={project.title} />
          </span>
          {project.status !== "completed" && (
            <span
              className={cn(
                "shrink-0 text-caption",
                project.status === "live" ? "text-accent" : "text-foreground-subtle",
              )}
            >
              [
              <ScrambleText
                text={project.status === "live" ? statusLabels.live : statusLabels.inProgress}
              />
              ]
            </span>
          )}
        </span>
        <span className="mt-0.5 block truncate text-caption text-foreground-subtle">
          # <ScrambleText text={project.category} />
        </span>
        <span className="mt-1 flex flex-wrap gap-x-2 text-caption text-foreground-muted">
          {project.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </span>
      </span>

      <Maximize2
        size={14}
        strokeWidth={1.75}
        className="shrink-0 text-foreground-subtle opacity-0 transition-opacity duration-fast ease-standard group-hover:opacity-100"
      />
    </button>
  );
}
