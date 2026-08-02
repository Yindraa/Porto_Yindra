"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Variant = "aurora" | "tech" | "alive";

const STORAGE_KEY = "theme-variant";
const VALID_VARIANTS: Variant[] = ["aurora", "tech", "alive"];

const VariantContext = createContext<{
  variant: Variant;
  setVariant: (variant: Variant) => void;
} | null>(null);

export function VariantProvider({ children }: { children: ReactNode }) {
  const [variant, setVariantState] = useState<Variant>("aurora");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && VALID_VARIANTS.includes(stored as Variant)) {
      // Reading the persisted preference only happens once on mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVariantState(stored as Variant);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-variant", variant);
  }, [variant]);

  const setVariant = useCallback((next: Variant) => {
    setVariantState(next);
    localStorage.setItem(STORAGE_KEY, next);

    // Section heights differ enough between themes that keeping the same
    // pixel scroll offset can land mid-page in a visually broken spot.
    // Scrolling back to the top makes a theme switch read as a deliberate
    // reset instead.
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "instant" : "smooth" });
  }, []);

  return (
    <VariantContext.Provider value={{ variant, setVariant }}>{children}</VariantContext.Provider>
  );
}

export function useVariant() {
  const ctx = useContext(VariantContext);
  if (!ctx) throw new Error("useVariant must be used within VariantProvider");
  return ctx;
}
