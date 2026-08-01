"use client";

import { useVariant } from "@/components/variant-provider";
import { Hero as AuroraHero } from "@/themes/aurora/hero";
import { Hero as TechHero } from "@/themes/tech/hero";
import { Hero as AliveHero } from "@/themes/alive/hero";

export function Hero() {
  const { variant } = useVariant();

  if (variant === "tech") return <TechHero />;
  if (variant === "alive") return <AliveHero />;
  return <AuroraHero />;
}
