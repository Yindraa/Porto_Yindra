"use client";

import { motion, useReducedMotion } from "framer-motion";
import { skills } from "@/lib/skills-data";

export function SkillsMarquee() {
  const prefersReducedMotion = useReducedMotion();
  // Duplicated once so the -50% translateX loop is seamless.
  const loop = [...skills, ...skills];

  return (
    <div className="marquee-mask relative overflow-hidden">
      <div className="marquee-track flex w-max items-center gap-8">
        {loop.map((skill, i) => (
          <motion.div
            key={`${skill.name}-${i}`}
            animate={prefersReducedMotion ? undefined : { y: [0, -4, 0] }}
            transition={{
              duration: 2.5 + (i % 5) * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 7) * 0.2,
            }}
            className="flex shrink-0 items-center gap-2"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#18181b]">
              {/* eslint-disable-next-line @next/next/no-img-element -- tiny external SVG icons, next/image is unnecessary overhead here */}
              <img src={skill.logo} alt="" width={14} height={14} className="h-3.5 w-3.5" />
            </span>
            <span className="whitespace-nowrap text-small text-foreground-subtle">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
