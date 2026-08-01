"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";
import { ScrambleText } from "@/components/scramble-text";
import { ProjectFilter } from "./project-filter";
import { ProjectCard } from "./project-card";
import { FeaturedProjectCard } from "./featured-project-card";
import { ProjectModal } from "./project-modal";
import type { Dictionary } from "@/lib/i18n/types";

type ProjectItem = Dictionary["projects"]["items"][number];

const EASE = [0.22, 1, 0.36, 1] as const;

export function Projects() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openProject, setOpenProject] = useState<ProjectItem | null>(null);

  const activeFilter = activeCategory ?? t.projects.filterAll;

  const categories = useMemo(() => {
    const unique = Array.from(new Set(t.projects.items.map((p) => p.category)));
    return [t.projects.filterAll, ...unique];
  }, [t.projects.items, t.projects.filterAll]);

  const filtered = useMemo(() => {
    if (activeFilter === t.projects.filterAll) return t.projects.items;
    return t.projects.items.filter((p) => p.category === activeFilter);
  }, [t.projects.items, activeFilter, t.projects.filterAll]);

  const featured = filtered.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <section id="projects" className="mx-auto w-full max-w-3xl scroll-mt-24 px-6 py-28">
      <Reveal>
        <p className="text-small font-medium tracking-tight text-accent">
          <ScrambleText text={t.projects.eyebrow} />
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-4">
        <h2 className="text-h2 text-foreground">
          <ScrambleText text={t.projects.heading} />
        </h2>
      </Reveal>

      <Reveal delay={0.15} className="mt-8">
        <ProjectFilter
          categories={categories}
          active={activeFilter}
          onChange={(category) =>
            setActiveCategory(category === t.projects.filterAll ? null : category)
          }
        />
      </Reveal>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="mt-8 grid gap-5 sm:grid-cols-2"
        >
          {featured && (
            <FeaturedProjectCard
              project={featured}
              statusLabels={t.projects.statusLabels}
              featuredLabel={t.projects.featuredLabel}
              onOpenGallery={() => setOpenProject(featured)}
            />
          )}
          {rest.map((project, i) => {
            const isLoneTrailing = rest.length % 2 === 1 && i === rest.length - 1;
            const delay = 0.1 + i * 0.06;

            if (isLoneTrailing) {
              return (
                <FeaturedProjectCard
                  key={project.id}
                  project={project}
                  statusLabels={t.projects.statusLabels}
                  featuredLabel={t.projects.featuredLabel}
                  isFeatured={false}
                  delay={delay}
                  onOpenGallery={() => setOpenProject(project)}
                />
              );
            }

            return (
              <ProjectCard
                key={project.id}
                project={project}
                statusLabels={t.projects.statusLabels}
                delay={delay}
                onOpenGallery={() => setOpenProject(project)}
              />
            );
          })}
        </motion.div>
      </AnimatePresence>

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
}
