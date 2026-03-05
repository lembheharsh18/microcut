"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  id?: string;
}

const SectionWrapper = React.forwardRef<HTMLElement, SectionWrapperProps>(
  ({ children, className, animate = true, id }, ref) => {
    const internalRef = useRef<HTMLElement>(null);
    const sectionRef = (ref as React.RefObject<HTMLElement>) ?? internalRef;
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    const content = (
      <section
        ref={sectionRef}
        id={id}
        className={cn(
          "py-20 px-4 md:px-8 max-w-7xl mx-auto",
          className
        )}
      >
        {children}
      </section>
    );

    if (!animate) return content;

    return (
      <motion.section
        ref={sectionRef}
        id={id}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "py-20 px-4 md:px-8 max-w-7xl mx-auto",
          className
        )}
      >
        {children}
      </motion.section>
    );
  }
);

SectionWrapper.displayName = "SectionWrapper";

export { SectionWrapper };
export type { SectionWrapperProps };
