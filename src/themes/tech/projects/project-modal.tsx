"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, GitFork, X } from "lucide-react";
import { ScrambleText } from "@/components/scramble-text";
import type { Dictionary } from "@/lib/i18n/types";

type ProjectItem = Dictionary["projects"]["items"][number];

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Styled like a man page rather than the magazine-style stacked layout the
 * other two themes use: framed thumbnail + text nav on the left, labeled
 * monospace sections (NAME/DESCRIPTION/TAGS/LINKS) on the right.
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
          transition={{ duration: 0.2, ease: EASE }}
          onClick={onClose}
          className="fixed inset-0 z-100 flex items-center justify-center bg-canvas/85 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2, ease: EASE }}
            onClick={(event) => event.stopPropagation()}
            className="glass-solid relative flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-md"
          >
            <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
              <span className="ml-2 truncate text-caption text-foreground-subtle">
                man ~/projects/{project.id}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded text-foreground-muted transition-colors duration-fast ease-standard hover:text-foreground"
              >
                <X size={14} strokeWidth={1.75} />
              </button>
            </div>

            <div className="flex flex-col overflow-y-auto text-small sm:flex-row">
              <div className="shrink-0 border-b border-border p-5 sm:w-56 sm:border-b-0 sm:border-r sm:p-6">
                <div className="relative aspect-square w-full overflow-hidden rounded-sm border border-border-strong">
                  <span className="absolute left-1.5 top-1.5 z-10 rounded bg-glass px-1.5 py-0.5 text-caption text-foreground-subtle">
                    [preview]
                  </span>
                  {images.map((src, i) => (
                    <motion.div
                      key={src + i}
                      className="absolute inset-0"
                      initial={false}
                      animate={{ opacity: i === index ? 1 : 0 }}
                      transition={{ duration: 0.2, ease: EASE }}
                    >
                      <Image
                        src={src}
                        alt={`${project.title} ${i + 1}`}
                        fill
                        sizes="224px"
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                </div>

                {images.length > 1 && (
                  <div className="mt-3 flex items-center justify-between text-caption text-foreground-subtle">
                    <button
                      type="button"
                      onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
                      aria-label="Previous image"
                      className="transition-colors duration-fast ease-standard hover:text-accent"
                    >
                      [ prev ]
                    </button>
                    <span>
                      {index + 1}/{images.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIndex((i) => (i + 1) % images.length)}
                      aria-label="Next image"
                      className="transition-colors duration-fast ease-standard hover:text-accent"
                    >
                      [ next ]
                    </button>
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1 space-y-4 p-5 leading-relaxed sm:p-6">
                <section>
                  <p className="text-caption font-medium text-accent">NAME</p>
                  <p className="mt-1 pl-4 text-h3 text-foreground">
                    <ScrambleText text={project.title} />
                  </p>
                </section>

                <section>
                  <p className="text-caption font-medium text-accent">DESCRIPTION</p>
                  <p className="mt-1 pl-4 text-foreground-muted">{project.description}</p>
                </section>

                <section>
                  <p className="text-caption font-medium text-accent">TAGS</p>
                  <p className="mt-1 pl-4 text-foreground-subtle">{project.tags.join(", ")}</p>
                </section>

                {(hasGithub || hasLive) && (
                  <section>
                    <p className="text-caption font-medium text-accent">LINKS</p>
                    <div className="mt-1 space-y-1 pl-4">
                      {hasGithub && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-foreground-muted transition-colors duration-fast ease-standard hover:text-accent"
                        >
                          <GitFork size={14} strokeWidth={1.75} /> git clone {project.githubUrl}
                        </a>
                      )}
                      {hasLive && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-foreground-muted transition-colors duration-fast ease-standard hover:text-accent"
                        >
                          <ExternalLink size={14} strokeWidth={1.75} /> open --live {project.liveUrl}
                        </a>
                      )}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
