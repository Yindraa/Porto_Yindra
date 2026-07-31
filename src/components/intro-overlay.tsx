"use client";

import { useEffect, useState } from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { ScrambleText } from "@/components/scramble-text";
import { siteConfig } from "@/lib/site-config";

const EASE = [0.22, 1, 0.36, 1] as const;
const SCRAMBLE_DURATION = 600;
const HOLD_AFTER_MS = 450;

export function IntroOverlay({ onComplete }: { onComplete: () => void }) {
  const prefersReducedMotion = useReducedMotion();
  const controls = useAnimationControls();
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete();
      // Reduced-motion visitors skip the curtain entirely, no hold/fade.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFinished(true);
      return;
    }

    let cancelled = false;

    async function run() {
      await new Promise((resolve) => setTimeout(resolve, SCRAMBLE_DURATION + HOLD_AFTER_MS));
      if (cancelled) return;
      await controls.start({ opacity: 0, transition: { duration: 0.6, ease: EASE } });
      if (cancelled) return;
      onComplete();
      setFinished(true);
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [controls, onComplete, prefersReducedMotion]);

  if (finished) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={controls}
      className="pointer-events-none fixed inset-0 z-100 flex flex-col items-center justify-center gap-4 bg-canvas px-6 text-center"
      aria-hidden="true"
    >
      <ScrambleText
        text={siteConfig.name}
        scrambleOnMount
        duration={SCRAMBLE_DURATION}
        className="text-h2 text-foreground sm:text-h1"
      />
      <motion.span
        className="h-px bg-accent"
        initial={{ width: 0 }}
        animate={{ width: 56 }}
        transition={{ delay: SCRAMBLE_DURATION / 1000, duration: 0.3, ease: EASE }}
      />
    </motion.div>
  );
}
