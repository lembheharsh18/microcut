"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/Button";

/* ── Animation variants ───────────────────────────────────────────── */

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
};

/* ── Component ────────────────────────────────────────────────────── */

export function DealerPartnerCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 px-4 md:px-8 overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, rgba(37,99,168,0.06) 0%, transparent 50%),
          linear-gradient(180deg, #0a0f1e 0%, #0d1526 100%)
        `,
      }}
    >
      {/* Subtle noise / texture overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(37,99,168,0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(37,99,168,0.2) 0%, transparent 50%)
          `,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="rounded-2xl border border-steel-500/15 bg-navy-800/50 backdrop-blur-sm overflow-hidden">
          {/* Steel blue left accent */}
          <div className="flex">
            <div
              aria-hidden
              className="w-1 md:w-1.5 shrink-0 bg-gradient-to-b from-steel-400 via-steel-500 to-steel-600"
            />

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 p-8 md:p-12 lg:p-16 items-center">
              {/* ── Left content ──────────────────────────────── */}
              <motion.div
                variants={slideLeft}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <span className="inline-block text-xs uppercase tracking-[0.2em] text-steel-400/70 font-medium mb-4">
                  Partnership
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                  Become an{" "}
                  <span className="bg-gradient-to-r from-steel-400 to-steel-300 bg-clip-text text-transparent">
                    Authorized Dealer
                  </span>
                </h2>
                <p className="mt-4 text-sm sm:text-base text-steel-200/45 leading-relaxed max-w-lg">
                  Join our growing network of authorized dealers and gain
                  exclusive access to competitive pricing, priority order
                  fulfillment, dedicated technical support, and co-branded
                  marketing materials to expand your business.
                </p>
              </motion.div>

              {/* ── Right buttons ─────────────────────────────── */}
              <motion.div
                variants={slideRight}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-start lg:items-center gap-4 md:justify-end"
              >
                <Button variant="accent" size="lg">
                  Apply Now
                </Button>
                <Button variant="secondary" size="lg">
                  Learn More
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
