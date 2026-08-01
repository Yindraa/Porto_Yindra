"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";
import { ScrambleText } from "@/components/scramble-text";
import { useProjectFilter } from "@/lib/hooks/use-project-filter";
import { ProjectFilter } from "./project-filter";
import { ProjectCard } from "./project-card";
import { FeaturedProjectCard } from "./featured-project-card";
import { ProjectModal } from "./project-modal";
import { GradientText } from "../gradient-text";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Projects() {
  const { t } = useLanguage();
  const {
    filterOptions,
    activeCategoryKey,
    setActiveCategoryKey,
    featured,
    rest,
    openProject,
    setOpenProject,
  } = useProjectFilter(t.projects.items, t.projects.filterAll);

  return (
    <section id="projects" className="mx-auto w-full max-w-3xl scroll-mt-24 px-6 py-28">
      <Reveal>
        <p className="text-small font-medium tracking-tight text-accent">
          <ScrambleText text={t.projects.eyebrow} />
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-4">
        {/* Raw text, not <ScrambleText>: background-clip:text needs the
            gradient span to own the text node directly (see About heading). */}
        <GradientText className="block text-h2 font-bold">{t.projects.heading}</GradientText>
      </Reveal>

      <Reveal delay={0.15} className="mt-8">
        <ProjectFilter
          options={filterOptions}
          activeKey={activeCategoryKey}
          onChange={setActiveCategoryKey}
        />
      </Reveal>

      {/* Keyed by the stable category key (not the translated label), so a
          language switch doesn't look like a filter change and remount the
          whole grid instead of letting each ScrambleText/FadeText animate
          its own text change. */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategoryKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="mt-8 columns-1 gap-5 sm:columns-2"
        >
          {featured && (
            <FeaturedProjectCard
              project={featured}
              statusLabels={t.projects.statusLabels}
              featuredLabel={t.projects.featuredLabel}
              onOpenGallery={() => setOpenProject(featured)}
            />
          )}
          {rest.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              statusLabels={t.projects.statusLabels}
              index={i}
              delay={0.1 + i * 0.06}
              onOpenGallery={() => setOpenProject(project)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
}
