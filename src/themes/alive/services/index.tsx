"use client";

import { Code2, Palette, Server, Smartphone, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";
import { useLanguage } from "@/components/language-provider";
import { ScrambleText } from "@/components/scramble-text";
import { FadeText } from "@/components/fade-text";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/i18n/types";
import { GradientText } from "../gradient-text";

type ServiceItem = Dictionary["services"]["items"][number];

const ICONS: LucideIcon[] = [Code2, Smartphone, Server, Palette];
const SHAPES = ["alive-shape-1", "alive-shape-2", "alive-shape-3"];
const ROTATE = ["-rotate-1", "rotate-1", "-rotate-2", "rotate-2"];
const ACCENT_BADGE = [
  "bg-accent/10 text-accent",
  "bg-accent-2/10 text-accent-2",
  "bg-accent-3/10 text-accent-3",
];

/**
 * A third composition, not a repeat of Projects (alternating rows) or
 * Skills (scattered tag cloud): an asymmetric 2-column grid where the
 * primary service gets a tall, featured spot instead of every card being
 * the same size.
 */
export function Services() {
  const { t } = useLanguage();
  const [primary, ...rest] = t.services.items;

  return (
    <section id="services" className="mx-auto w-full max-w-3xl scroll-mt-24 px-6 py-28">
      <Reveal>
        <p className="text-small font-medium tracking-tight text-accent">
          <ScrambleText text={t.services.eyebrow} />
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-4">
        {/* Raw text, not <ScrambleText>: background-clip:text needs the
            gradient span to own the text node directly (see About heading). */}
        <GradientText className="block text-h2 font-bold">{t.services.heading}</GradientText>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {primary && (
          <ServiceCard item={primary} icon={ICONS[0]} index={0} className="sm:row-span-3" featured />
        )}
        {rest.map((item, i) => (
          <ServiceCard key={item.title} item={item} icon={ICONS[(i + 1) % ICONS.length]} index={i + 1} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({
  item,
  icon: Icon,
  index,
  featured = false,
  className,
}: {
  item: ServiceItem;
  icon: LucideIcon;
  index: number;
  featured?: boolean;
  className?: string;
}) {
  return (
    <Reveal delay={0.15 + index * 0.08} className={className}>
      <div className={cn("h-full", ROTATE[index % ROTATE.length])}>
        <TiltCard maxTilt={featured ? 4 : 6} className="h-full">
          <div
            className={cn(
              "glass flex h-full flex-col p-5",
              featured ? "sm:p-7" : undefined,
              SHAPES[index % SHAPES.length],
            )}
          >
            <div
              className={cn(
                "flex items-center gap-2 text-foreground-muted",
                featured && "text-accent",
              )}
            >
              <Icon size={featured ? 20 : 16} strokeWidth={1.75} />
              <h3 className={cn("font-medium text-foreground", featured ? "text-h3" : "text-small")}>
                {item.title}
              </h3>
            </div>
            <p className="mt-3 flex-1 text-small leading-relaxed text-foreground-muted">
              <FadeText text={item.desc} />
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.relatedSkills.map((skill) => (
                <span
                  key={skill}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-caption",
                    ACCENT_BADGE[index % ACCENT_BADGE.length],
                  )}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </TiltCard>
      </div>
    </Reveal>
  );
}
