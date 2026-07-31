"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";
import { ScrambleText } from "@/components/scramble-text";
import { FadeText } from "@/components/fade-text";
import { siteConfig } from "@/lib/site-config";
import { MagneticButton } from "./magnetic-button";
import { StatusPill } from "./status-pill";
import { ScrollCue } from "./scroll-cue";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] flex-col items-center justify-center px-6 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <StatusPill label={t.hero.status} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        className="mt-5 text-small font-medium tracking-tight text-accent"
      >
        <ScrambleText text={t.hero.role} />
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        className="mt-4 max-w-3xl text-display text-foreground"
      >
        {siteConfig.name}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
        className="mt-6 max-w-xl text-body-lg text-foreground-muted"
      >
        <FadeText text={t.hero.subtitle} />
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
        className="mt-10 flex items-center gap-4"
      >
        <MagneticButton
          href="#projects"
          className="inline-block rounded-full bg-accent px-6 py-3 text-small font-medium text-accent-foreground"
        >
          <ScrambleText text={t.hero.ctaPrimary} />
        </MagneticButton>
        <MagneticButton
          href="#contact"
          className="glass inline-block rounded-full px-6 py-3 text-small font-medium text-foreground"
        >
          <ScrambleText text={t.hero.ctaSecondary} />
        </MagneticButton>
      </motion.div>

      <ScrollCue />
    </section>
  );
}
