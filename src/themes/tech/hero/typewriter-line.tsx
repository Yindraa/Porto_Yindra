"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Types `text` out character by character once, on mount. Parent components
 * control *when* that mount happens (conditional rendering keyed off a
 * phase counter), rather than this component tracking a "start" flag itself
 * — simpler, and it means each line only ever types once.
 */
export function TypewriterLine({
  text,
  className,
  speed = 24,
  cursor = false,
  onDone,
}: {
  text: string;
  className?: string;
  speed?: number;
  cursor?: boolean;
  onDone?: () => void;
}) {
  const [display, setDisplay] = useState("");
  const [typing, setTyping] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      // Reduced-motion visitors get the final text immediately, no typing.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay(text);
      setTyping(false);
      onDone?.();
      return;
    }

    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setDisplay(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setTyping(false);
        onDone?.();
      }
    }, speed);

    return () => clearInterval(id);
    // Intentionally mount-only: this line types exactly once. The parent
    // never mutates `text` on an already-mounted instance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span className={className}>
      {display}
      {cursor && typing && <span className="tech-cursor" aria-hidden="true" />}
    </span>
  );
}
