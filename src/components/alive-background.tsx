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
  { className: "alive-blob-1", depth: 90 },
  { className: "alive-blob-2", depth: 120 },
  { className: "alive-blob-3", depth: 70 },
  { className: "alive-blob-4", depth: 140 },
  { className: "alive-blob-5", depth: 100 },
  { className: "alive-blob-6", depth: 160 },
];

export function AliveBackground() {
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
    <div className="alive-layer" aria-hidden="true">
      {BLOBS.map((blob) => (
        <AliveBlob
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

function AliveBlob({
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
  const x = useSpring(rawX, { stiffness: 55, damping: 18, mass: 1 });
  const y = useSpring(rawY, { stiffness: 55, damping: 18, mass: 1 });

  return (
    <motion.div className="aurora-blob-wrap" style={{ x, y }}>
      <div className={`alive-blob ${className}`} />
    </motion.div>
  );
}
