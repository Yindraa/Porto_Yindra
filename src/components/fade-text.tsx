"use client";

import { AnimatePresence, motion } from "framer-motion";

export function FadeText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={text}
        initial={{ opacity: 0, filter: "blur(6px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(6px)" }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {text}
      </motion.span>
    </AnimatePresence>
  );
}
