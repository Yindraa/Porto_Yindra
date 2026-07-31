"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { en } from "@/lib/i18n/en";
import { id } from "@/lib/i18n/id";
import type { Dictionary } from "@/lib/i18n/types";

export type Language = "en" | "id";

const dictionaries: Record<Language, Dictionary> = { en, id };
const STORAGE_KEY = "language";

const LanguageContext = createContext<{
  language: Language;
  t: Dictionary;
  setLanguage: (language: Language) => void;
} | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "id") {
      // Reading the persisted preference only happens once on mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, t: dictionaries[language], setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
