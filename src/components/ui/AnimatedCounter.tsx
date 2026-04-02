"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  /** Target number to count up to */
  target: number;
  /** Duration in seconds (default 2) */
  duration?: number;
  /** Text displayed after the number, e.g. "+" or "%" */
  suffix?: string;
  /** Text displayed before the number */
  prefix?: string;
  /** Number of decimal places (default 0) */
  decimals?: number;
  className?: string;
}

function AnimatedCounter({
  target,
  duration = 2,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const startTime = performance.now();
    const durationMs = duration * 1000;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Ease-out cubic for a satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    }

    requestAnimationFrame(tick);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export { AnimatedCounter };
export type { AnimatedCounterProps };
