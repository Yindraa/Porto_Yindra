import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function GradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={cn("gradient-text-alive", className)}>{children}</span>;
}
