"use client";

import { useVariant } from "@/components/variant-provider";
import { Skills as AuroraSkills } from "@/themes/aurora/skills";
import { Skills as TechSkills } from "@/themes/tech/skills";
import { Skills as AliveSkills } from "@/themes/alive/skills";

export function Skills() {
  const { variant } = useVariant();

  if (variant === "tech") return <TechSkills />;
  if (variant === "alive") return <AliveSkills />;
  return <AuroraSkills />;
}
