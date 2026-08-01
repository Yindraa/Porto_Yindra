"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Fragment } from "react";

/** Splits on **bold** markers and wraps them for scannable emphasis. */
function renderWithEmphasis(text: string) {
  const parts = text.split(/(\*\*.+?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-medium text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

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
        {renderWithEmphasis(text)}
      </motion.span>
    </AnimatePresence>
  );
}
