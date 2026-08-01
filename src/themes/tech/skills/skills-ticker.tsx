import { Check } from "lucide-react";
import { skills } from "@/lib/skills-data";

export function SkillsTicker() {
  // Duplicated once so the -50% translateX loop is seamless.
  const loop = [...skills, ...skills];

  return (
    <div className="marquee-mask relative overflow-hidden">
      <div className="marquee-track flex w-max items-center gap-6">
        {loop.map((skill, i) => (
          <div
            key={`${skill.name}-${i}`}
            className="flex shrink-0 items-center gap-1.5 text-foreground-muted"
          >
            <Check size={12} strokeWidth={2.5} className="text-accent" />
            <span className="whitespace-nowrap">
              + {skill.name.toLowerCase().replace(/\s+/g, "-")}@latest
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
