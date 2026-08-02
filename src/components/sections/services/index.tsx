"use client";

import { useVariant } from "@/components/variant-provider";
import { Services as AuroraServices } from "@/themes/aurora/services";
import { Services as TechServices } from "@/themes/tech/services";
import { Services as AliveServices } from "@/themes/alive/services";

export function Services() {
  const { variant } = useVariant();

  if (variant === "tech") return <TechServices />;
  if (variant === "alive") return <AliveServices />;
  return <AuroraServices />;
}
