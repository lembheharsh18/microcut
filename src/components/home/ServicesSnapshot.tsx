"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  CircleDot,
  Grid3X3,
  Layers,
  Target,
  Settings,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ── Data ─────────────────────────────────────────────────────────── */

interface Service {
  icon: LucideIcon;
  name: string;
  description: string;
}

const services: Service[] = [
  {
    icon: CircleDot,
    name: "CNC Turning",
    description: "High-precision lathe operations for cylindrical components.",
  },
  {
    icon: Grid3X3,
    name: "VMC Milling",
    description: "Multi-axis vertical machining for complex geometries.",
  },
  {
    icon: Layers,
    name: "Surface Finishing",
    description: "Polishing, coating & treatment for flawless surfaces.",
  },
  {
    icon: Target,
    name: "Drilling & Boring",
    description: "Accurate hole-making with tight diameter tolerances.",
  },
  {
    icon: Settings,
    name: "Custom Orders",
    description: "Bespoke parts engineered to your exact specifications.",
  },
];

/* ── Animation variants ───────────────────────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Component ────────────────────────────────────────────────────── */

export function ServicesSnapshot() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="services"
      className="relative py-24 px-4 md:px-8 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0a0f1e 0%, #111d35 50%, #0a0f1e 100%)",
      }}
    >
      {/* Subtle grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(37,99,168,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,168,1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ── Heading ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-steel-400 via-steel-300 to-steel-500 bg-clip-text text-transparent">
            What We Do
          </h2>
          <p className="mt-4 text-steel-200/50 text-sm sm:text-base tracking-wide">
            From raw material to finished precision component
          </p>
        </motion.div>

        {/* ── Service cards grid ──────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5"
        >
          {services.map(({ icon: Icon, name, description }) => (
            <motion.div
              key={name}
              variants={cardVariants}
              whileHover={{
                y: -6,
                borderColor: "rgba(37, 99, 168, 0.5)",
                boxShadow: "0 0 25px rgba(37, 99, 168, 0.15)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group relative rounded-xl border border-steel-500/15 bg-navy-800/80 backdrop-blur-sm p-5 md:p-6 cursor-pointer transition-colors duration-300"
            >
              {/* Glow top line */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px rounded-t-xl bg-gradient-to-r from-transparent via-steel-500/0 to-transparent group-hover:via-steel-400/60 transition-all duration-500"
              />

              {/* Icon */}
              <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-steel-500/10 text-steel-400 mb-4 group-hover:bg-steel-500/20 transition-colors duration-300">
                <Icon size={22} strokeWidth={1.6} />
              </div>

              {/* Name */}
              <h3 className="text-sm md:text-base font-semibold text-white mb-1.5">
                {name}
              </h3>

              {/* Description */}
              <p className="text-xs md:text-sm text-steel-200/45 leading-relaxed">
                {description}
              </p>

              {/* Arrow on hover */}
              <div className="mt-3 flex items-center gap-1 text-steel-400 opacity-0 translate-x-[-4px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <span className="text-xs font-medium">Learn more</span>
                <ArrowRight size={14} strokeWidth={2} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── View All link ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <a
            href="#services"
            className="inline-flex items-center gap-2 text-steel-400 hover:text-steel-300 text-sm font-medium tracking-wide group/link transition-colors duration-200"
          >
            View All Services
            <ArrowRight
              size={16}
              className="group-hover/link:translate-x-1 transition-transform duration-200"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
