"use client";

import { useMemo, useState } from "react";
import type { Dictionary } from "@/lib/i18n/types";

export type ProjectItem = Dictionary["projects"]["items"][number];

const ALL_KEY = "all";

/**
 * Category filtering + gallery-modal state shared by every theme's Projects
 * section — this is business logic, not design, so it's kept in one place
 * instead of being re-implemented three times.
 */
export function useProjectFilter(items: ProjectItem[], filterAllLabel: string) {
  const [activeCategoryKey, setActiveCategoryKey] = useState<string>(ALL_KEY);
  const [openProject, setOpenProject] = useState<ProjectItem | null>(null);

  const filterOptions = useMemo(() => {
    const seen = new Map<string, string>();
    for (const item of items) {
      if (!seen.has(item.categoryKey)) seen.set(item.categoryKey, item.category);
    }
    return [
      { key: ALL_KEY, label: filterAllLabel },
      ...Array.from(seen, ([key, label]) => ({ key, label })),
    ];
  }, [items, filterAllLabel]);

  const filtered = useMemo(() => {
    if (activeCategoryKey === ALL_KEY) return items;
    return items.filter((p) => p.categoryKey === activeCategoryKey);
  }, [items, activeCategoryKey]);

  const featured = filtered.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return {
    filterOptions,
    activeCategoryKey,
    setActiveCategoryKey,
    featured,
    rest,
    openProject,
    setOpenProject,
  };
}
