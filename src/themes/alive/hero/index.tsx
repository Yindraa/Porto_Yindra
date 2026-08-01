"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";
import { useIntro } from "@/components/intro-provider";
import { ScrambleText } from "@/components/scramble-text";
import { FadeText } from "@/components/fade-text";
import { siteConfig } from "@/lib/site-config";
import { GradientText } from "../gradient-text";

const EASE = [0.22, 1, 0.36, 1] as const;
const SPRING = { type: "spring", stiffness: 400, damping: 10 } as const;

export function Hero() {
  const { t } = useLanguage();
  const { introDone } = useIntro();
  const prefersReducedMotion = useReducedMotion();

  const idleFloat = prefersReducedMotion ? undefined : { y: [0, -10, 0] };
  const idleFloatSlow = prefersReducedMotion ? undefined : { y: [0, -14, 0] };

  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 py-32 text-center sm:items-start sm:text-left"
    >
      <div className="mx-auto w-full max-w-2xl sm:ml-[8%]">
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={introDone ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={{ duration: 0.6, ease: EASE }}
          className="inline-block sm:-rotate-2"
        >
          <motion.div animate={introDone ? idleFloat : undefined} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border-strong px-3 py-1.5 text-caption text-foreground-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <ScrambleText text={t.hero.status} />
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={introDone ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="mt-6 sm:ml-6"
        >
          <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-small font-medium text-accent sm:rotate-1">
            <ScrambleText text={t.hero.role} />
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
          animate={introDone ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        >
          <motion.div
            animate={introDone ? idleFloatSlow : undefined}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <GradientText className="mt-4 block text-h1 sm:text-display font-bold">
              {siteConfig.name}
            </GradientText>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={introDone ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="mt-6 max-w-xl text-body-lg text-foreground-muted sm:ml-4"
        >
          <FadeText text={t.hero.subtitle} />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={introDone ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:justify-start"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.1, rotate: -2 }}
            whileTap={{ scale: 0.9 }}
            transition={SPRING}
            className="inline-block rounded-full bg-accent px-6 py-3 text-small font-medium text-accent-foreground"
          >
            <ScrambleText text={t.hero.ctaPrimary} />
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.9 }}
            transition={SPRING}
            className="glass inline-block rounded-full px-6 py-3 text-small font-medium text-foreground"
          >
            <ScrambleText text={t.hero.ctaSecondary} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
