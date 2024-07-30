"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";

export default function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  compact = false,
}: {
  value: number|null;
  direction?: "up" | "down";
  className?: string;
  delay?: number; // delay in s
  compact?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    isInView &&
      setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value);
      }, delay * 1000);
  }, [motionValue, isInView, delay, value, direction]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US", {notation: compact ? "compact" : "standard"}).format(
            latest.toFixed(0),
          );
        }
      }),
    [springValue],
  );

  if (value == 0) {
    return (
      <span
        className={cn(
          "inline-block tracking-wider",
          className,
        )}>0</span>
    );
  } else if (value == null) {
    return (
      <span
        className={cn(
          "inline-block tracking-wider",
          className,
        )}>---</span>
    );
  } else {
    return (
      <span
        className={cn(
          "inline-block tracking-wider",
          className,
        )}
        ref={ref}
      />
    );
  }

}
