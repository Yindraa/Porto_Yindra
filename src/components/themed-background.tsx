"use client";

import { useVariant } from "@/components/variant-provider";
import { AuroraBackground } from "@/components/aurora-background";
import { TechBackground } from "@/components/tech-background";
import { AliveBackground } from "@/components/alive-background";

export function ThemedBackground() {
  const { variant } = useVariant();

  if (variant === "tech") return <TechBackground />;
  if (variant === "alive") return <AliveBackground />;
  return <AuroraBackground />;
}
