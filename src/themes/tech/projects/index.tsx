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

const EASE = [0.16, 1, 0.3, 1] as const;

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
        <h2 className="text-h2 text-foreground">
          <ScrambleText text={t.projects.heading} />
        </h2>
      </Reveal>

      <Reveal delay={0.15} className="mt-10">
        <div className="glass overflow-hidden rounded-md">
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            <span className="ml-2 text-caption text-foreground-subtle">~/portfolio/projects.sh</span>
          </div>

          <div className="p-5 text-small leading-relaxed sm:p-6">
            <ProjectFilter
              options={filterOptions}
              activeKey={activeCategoryKey}
              onChange={setActiveCategoryKey}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategoryKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="mt-5 space-y-5"
              >
                {featured && (
                  <FeaturedProjectCard
                    project={featured}
                    statusLabels={t.projects.statusLabels}
                    featuredLabel={t.projects.featuredLabel}
                    onOpenGallery={() => setOpenProject(featured)}
                  />
                )}

                {rest.length > 0 && (
                  <div className="border-t border-border">
                    {rest.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        statusLabels={t.projects.statusLabels}
                        onOpenGallery={() => setOpenProject(project)}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
}
