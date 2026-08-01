"use client";

import { useVariant } from "@/components/variant-provider";
import { Projects as AuroraProjects } from "@/themes/aurora/projects";
import { Projects as TechProjects } from "@/themes/tech/projects";
import { Projects as AliveProjects } from "@/themes/alive/projects";

export function Projects() {
  const { variant } = useVariant();

  if (variant === "tech") return <TechProjects />;
  if (variant === "alive") return <AliveProjects />;
  return <AuroraProjects />;
}
