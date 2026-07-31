"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { IntroOverlay } from "@/components/intro-overlay";

const IntroContext = createContext<{ introDone: boolean } | null>(null);

export function IntroProvider({ children }: { children: ReactNode }) {
  const [introDone, setIntroDone] = useState(false);

  const handleComplete = useCallback(() => setIntroDone(true), []);

  return (
    <IntroContext.Provider value={{ introDone }}>
      {children}
      <IntroOverlay onComplete={handleComplete} />
    </IntroContext.Provider>
  );
}

export function useIntro() {
  const ctx = useContext(IntroContext);
  if (!ctx) throw new Error("useIntro must be used within IntroProvider");
  return ctx;
}
