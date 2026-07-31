"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

const BLOBS = [
  { className: "aurora-blob-1", depth: 55 },
  { className: "aurora-blob-2", depth: 75 },
  { className: "aurora-blob-3", depth: 40 },
];

export function AuroraBackground() {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  useEffect(() => {
    if (prefersReducedMotion) return;

    function handlePointerMove(event: PointerEvent) {
      pointerX.set(event.clientX / window.innerWidth - 0.5);
      pointerY.set(event.clientY / window.innerHeight - 0.5);
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [prefersReducedMotion, pointerX, pointerY]);

  return (
    <div className="aurora-layer" aria-hidden="true">
      {BLOBS.map((blob) => (
        <AuroraBlob
          key={blob.className}
          className={blob.className}
          depth={blob.depth}
          pointerX={pointerX}
          pointerY={pointerY}
        />
      ))}
    </div>
  );
}

function AuroraBlob({
  className,
  depth,
  pointerX,
  pointerY,
}: {
  className: string;
  depth: number;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}) {
  const rawX = useTransform(pointerX, (v) => v * depth);
  const rawY = useTransform(pointerY, (v) => v * depth);
  const x = useSpring(rawX, { stiffness: 40, damping: 20, mass: 1 });
  const y = useSpring(rawY, { stiffness: 40, damping: 20, mass: 1 });

  return (
    <motion.div className="aurora-blob-wrap" style={{ x, y }}>
      <div className={`aurora-blob ${className}`} />
    </motion.div>
  );
}
