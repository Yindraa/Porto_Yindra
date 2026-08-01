"use client";

import { useVariant } from "@/components/variant-provider";
import { Contact as AuroraContact } from "@/themes/aurora/contact";
import { Contact as TechContact } from "@/themes/tech/contact";
import { Contact as AliveContact } from "@/themes/alive/contact";

export function Contact() {
  const { variant } = useVariant();

  if (variant === "tech") return <TechContact />;
  if (variant === "alive") return <AliveContact />;
  return <AuroraContact />;
}
