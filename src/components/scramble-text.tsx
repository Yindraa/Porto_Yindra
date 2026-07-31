"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const MIXED = UPPER + LOWER;

function randomGlyphFor(char: string | undefined) {
  if (char && /[A-Z]/.test(char)) return UPPER[Math.floor(Math.random() * UPPER.length)];
  if (char && /[a-z]/.test(char)) return LOWER[Math.floor(Math.random() * LOWER.length)];
  return MIXED[Math.floor(Math.random() * MIXED.length)];
}

function shuffledIndices(length: number) {
  const indices = Array.from({ length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

export function ScrambleText({
  text,
  className,
  duration = 520,
  glyphInterval = 70,
  scrambleOnMount = false,
}: {
  text: string;
  className?: string;
  duration?: number;
  glyphInterval?: number;
  /** Scramble in on first mount too, instead of only reacting to text changes. */
  scrambleOnMount?: boolean;
}) {
  const [display, setDisplay] = useState(scrambleOnMount ? "" : text);
  const [isScrambling, setIsScrambling] = useState(false);
  const prevText = useRef(scrambleOnMount ? "" : text);
  const frameRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prevText.current === text) return;
    const from = prevText.current;
    const to = text;
    prevText.current = text;

    if (prefersReducedMotion) {
      // Reduced-motion users get the final text immediately, no scramble.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay(to);
      return;
    }

    setIsScrambling(true);

    const length = Math.max(from.length, to.length);
    const revealOrder = shuffledIndices(length);
    const revealedAt = new Map<number, number>();
    revealOrder.forEach((index, order) => revealedAt.set(index, order));

    // Glyphs only refresh every `glyphInterval` ms per position, so the
    // effect reads as a slow, deliberate cipher rather than a fast flicker.
    const glyphCache = Array.from({ length }, (_, i) => randomGlyphFor(to[i] ?? from[i]));
    const lastGlyphUpdate = new Array(length).fill(0);

    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const revealCount = Math.floor(progress * length);

      let next = "";
      for (let i = 0; i < length; i++) {
        const isRevealed = (revealedAt.get(i) ?? length) < revealCount;
        if (isRevealed || progress >= 1) {
          next += to[i] ?? "";
        } else if (to[i] === " " || from[i] === " ") {
          next += " ";
        } else {
          if (now - lastGlyphUpdate[i] >= glyphInterval) {
            glyphCache[i] = randomGlyphFor(to[i] ?? from[i]);
            lastGlyphUpdate[i] = now;
          }
          next += glyphCache[i];
        }
      }
      setDisplay(next);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setIsScrambling(false);
      }
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text, duration, glyphInterval, prefersReducedMotion]);

  return (
    <motion.span
      className={className}
      animate={{ filter: isScrambling ? "blur(1.5px)" : "blur(0px)" }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      {display}
    </motion.span>
  );
}
