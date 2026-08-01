"use client";

import { useVariant } from "@/components/variant-provider";
import { About as AuroraAbout } from "@/themes/aurora/about";
import { About as TechAbout } from "@/themes/tech/about";
import { About as AliveAbout } from "@/themes/alive/about";

export function About() {
  const { variant } = useVariant();

  if (variant === "tech") return <TechAbout />;
  if (variant === "alive") return <AliveAbout />;
  return <AuroraAbout />;
}
