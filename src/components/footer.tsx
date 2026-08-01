"use client";

import { useVariant } from "@/components/variant-provider";
import { Footer as AuroraFooter } from "@/themes/aurora/footer";
import { Footer as TechFooter } from "@/themes/tech/footer";
import { Footer as AliveFooter } from "@/themes/alive/footer";

export function Footer() {
  const { variant } = useVariant();

  if (variant === "tech") return <TechFooter />;
  if (variant === "alive") return <AliveFooter />;
  return <AuroraFooter />;
}
