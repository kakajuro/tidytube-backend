"use client";

// Added inline prop

import { useRef } from "react";
import { AnimatePresence, motion, useInView, Variants } from "framer-motion";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
  inline?: boolean;
}

export default function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
  inline = false
}: BlurFadeProps) {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = !inView || inViewResult;
  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: -yOffset, opacity: 1, filter: `blur(0px)` },
  };
  const combinedVariants = variant || defaultVariants;
  
  switch (inline) {
    case true:
      return (
        <AnimatePresence>
          <motion.a
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            exit="hidden"
            variants={combinedVariants}
            transition={{
              delay: 0.04 + delay,
              duration,
              ease: "easeOut",
            }}
            className={className}
          >
            {children}
          </motion.a>
        </AnimatePresence>
      );
    case false:
      return (
        <AnimatePresence>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            exit="hidden"
            variants={combinedVariants}
            transition={{
              delay: 0.04 + delay,
              duration,
              ease: "easeOut",
            }}
            className={className}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      );
    default:
      break
  }

}
