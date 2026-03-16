"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

/* ── Data ─────────────────────────────────────────────────────────── */

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 40, suffix: "+", label: "Skilled Workers" },
  { value: 500, suffix: "+", label: "Orders Delivered" },
  { value: 12, suffix: "+", label: "Machine Units" },
  { value: 99, suffix: "%", label: "On-Time Delivery" },
];

/* ── Component ────────────────────────────────────────────────────── */

export function WhyChooseUsStats() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-24 px-4 md:px-8 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 40%, rgba(37,99,168,0.12) 0%, transparent 70%),
          linear-gradient(180deg, #0a0f1e 0%, #0d1526 50%, #0a0f1e 100%)
        `,
      }}
    >
      {/* Top & bottom subtle lines */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-steel-500/20 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-steel-500/20 to-transparent"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-5xl mx-auto"
      >
        {/* ── Heading (optional subtle label) ───────────────── */}
        <p className="text-center text-xs uppercase tracking-[0.25em] text-steel-400/60 mb-12 md:mb-14 font-medium">
          Why Choose Us
        </p>

        {/* ── Stats row ──────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {stats.map(({ value, suffix, label }, i) => (
            <div
              key={label}
              className="relative flex flex-col items-center text-center"
            >
              {/* Vertical divider (visible md+ and not first item) */}
              {i !== 0 && (
                <div
                  aria-hidden
                  className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 bg-gradient-to-b from-transparent via-steel-500/25 to-transparent"
                />
              )}

              {/* Number */}
              <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
                <AnimatedCounter
                  target={value}
                  suffix={suffix}
                  duration={2.4}
                />
              </span>

              {/* Label */}
              <span className="mt-2 text-xs sm:text-sm tracking-wider uppercase text-steel-200/45 font-medium">
                {label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
