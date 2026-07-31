"use client";

import { motion } from "framer-motion";

export function ScrollCue() {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex h-9 w-5 items-start justify-center rounded-full border border-border-strong p-1.5">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-foreground-subtle"
          animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
