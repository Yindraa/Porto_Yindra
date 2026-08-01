"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, GitFork, X } from "lucide-react";
import { ScrambleText } from "@/components/scramble-text";
import { TiltCard } from "@/components/tilt-card";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/i18n/types";
import { GradientText } from "../gradient-text";

type ProjectItem = Dictionary["projects"]["items"][number];

const EASE = [0.22, 1, 0.36, 1] as const;
const SPRING = { type: "spring", stiffness: 320, damping: 22 } as const;

/**
 * Side-by-side like the featured project card, not stacked like the other
 * two themes: image on one side (tilted, cursor-reactive), title in the
 * same moving gradient used across the theme, on the other.
 */
export function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectItem | null;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [trackedProject, setTrackedProject] = useState(project);
  const images = project ? [project.image, ...project.gallery] : [];
  const hasGithub = Boolean(project?.githubUrl && project.githubUrl !== "#");
  const hasLive = Boolean(project?.liveUrl);

  // Reset the gallery position when a new project opens. Adjusting state
  // during render (React's recommended pattern for this) instead of an
  // effect avoids an extra render pass.
  if (project !== trackedProject) {
    setTrackedProject(project);
    setIndex(0);
  }

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (event.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [project, images.length, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          onClick={onClose}
          className="fixed inset-0 z-100 flex items-center justify-center bg-canvas/80 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 24, scale: 0.9, rotate: -2 }}
            transition={SPRING}
            onClick={(event) => event.stopPropagation()}
            className="glass-solid relative flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl sm:flex-row"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-canvas/70 text-foreground-muted backdrop-blur-sm transition-colors duration-fast ease-standard hover:text-foreground"
            >
              <X size={18} strokeWidth={1.75} />
            </button>

            <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-canvas sm:aspect-auto sm:w-2/5">
              <TiltCard className="absolute inset-0" maxTilt={5}>
                {images.map((src, i) => (
                  <motion.div
                    key={src + i}
                    className="absolute inset-0"
                    initial={false}
                    animate={{ opacity: i === index ? 1 : 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    <Image
                      src={src}
                      alt={`${project.title} ${i + 1}`}
                      fill
                      sizes="(min-width: 640px) 420px, 100vw"
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </TiltCard>

              {images.length > 1 && (
                <>
                  <motion.button
                    type="button"
                    onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
                    aria-label="Previous image"
                    whileHover={{ scale: 1.15, rotate: -6 }}
                    whileTap={{ scale: 0.9 }}
                    transition={SPRING}
                    className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-canvas/70 text-foreground backdrop-blur-sm hover:text-accent"
                  >
                    <ChevronLeft size={18} strokeWidth={1.75} />
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setIndex((i) => (i + 1) % images.length)}
                    aria-label="Next image"
                    whileHover={{ scale: 1.15, rotate: 6 }}
                    whileTap={{ scale: 0.9 }}
                    transition={SPRING}
                    className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-canvas/70 text-foreground backdrop-blur-sm hover:text-accent"
                  >
                    <ChevronRight size={18} strokeWidth={1.75} />
                  </motion.button>
                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {images.map((src, i) => (
                      <button
                        key={src + i}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Go to image ${i + 1}`}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-fast ease-standard",
                          i === index ? "w-4 bg-accent" : "w-1.5 bg-canvas/70",
                        )}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="min-w-0 flex-1 overflow-y-auto p-6 sm:p-8">
              <p className="text-caption text-foreground-subtle">
                <ScrambleText text={project.category} />
              </p>
              {/* Raw text, not <ScrambleText>: background-clip:text needs the
                  gradient span to own the text node directly (see About heading). */}
              <GradientText className="mt-1 block text-h2 font-bold">
                {project.title}
              </GradientText>
              <p className="mt-3 text-small leading-relaxed text-foreground-muted">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
