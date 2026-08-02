"use client";

import { useVariant } from "@/components/variant-provider";
import { Stats as AuroraStats } from "@/themes/aurora/stats";
import { Stats as TechStats } from "@/themes/tech/stats";
import { Stats as AliveStats } from "@/themes/alive/stats";

export function Stats() {
  const { variant } = useVariant();

  if (variant === "tech") return <TechStats />;
  if (variant === "alive") return <AliveStats />;
  return <AuroraStats />;
}
