import { skills } from "@/lib/skills-data";

export function SkillsMarquee() {
  // Duplicated once so the -50% translateX loop is seamless.
  const loop = [...skills, ...skills];

  return (
    <div className="marquee-mask relative overflow-hidden">
      <div className="marquee-track flex w-max items-center gap-8">
        {loop.map((skill, i) => (
          <div key={`${skill.name}-${i}`} className="flex shrink-0 items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#18181b]">
              {/* eslint-disable-next-line @next/next/no-img-element -- tiny external SVG icons, next/image is unnecessary overhead here */}
              <img src={skill.logo} alt="" width={14} height={14} className="h-3.5 w-3.5" />
            </span>
            <span className="whitespace-nowrap text-small text-foreground-subtle">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
