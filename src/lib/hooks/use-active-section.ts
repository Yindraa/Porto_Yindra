"use client";

import { useEffect, useState } from "react";

/**
 * `resetKey` forces re-querying the DOM and re-creating the observer, e.g.
 * pass the active theme variant: section components are swapped out (and
 * their DOM nodes destroyed/recreated) when the variant changes, which
 * would otherwise leave the observer watching detached elements forever.
 */
export function useActiveSection(ids: readonly string[], resetKey?: unknown) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    // `entries` in the callback below only lists targets whose intersection
    // state just changed, not every observed target — so the current
    // "most visible" section has to be tracked cumulatively across calls,
    // not recomputed from a single (possibly partial) entries batch.
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let bestId: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        setActiveId(bestId);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, resetKey]);

  return activeId;
}
