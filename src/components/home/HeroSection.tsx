"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, PackageCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

/* ── Animation helpers ────────────────────────────────────────────── */

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Floating glow circle ─────────────────────────────────────────── */

function GlowCircle({
  size,
  color,
  top,
  left,
  delay = 0,
}: {
  size: number;
  color: string;
  top: string;
  left: string;
  delay?: number;
}) {
  return (
    <motion.div
      aria-hidden
      animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
      transition={{
        duration: 8 + delay * 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
      }}
      className="absolute rounded-full pointer-events-none blur-3xl"
      style={{
        width: size,
        height: size,
        background: color,
        top,
        left,
        opacity: 0.18,
      }}
    />
  );
}

/* ── Stats data ───────────────────────────────────────────────────── */

const stats = [
  {
    icon: Users,
    value: 40,
    suffix: "+",
    label: "Workers",
  },
  {
    icon: PackageCheck,
    value: 500,
    suffix: "+",
    label: "Orders Delivered",
  },
  {
    icon: Clock,
    value: 15,
    suffix: "+",
    label: "Years Experience",
  },
] as const;

/* ── Hero Section ─────────────────────────────────────────────────── */

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Gradient background ───────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-900 to-navy-700"
      />

      {/* ── Blueprint grid ────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(37,99,168,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,168,1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Fine sub-grid ─────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(37,99,168,1) 0.5px, transparent 0.5px),
            linear-gradient(90deg, rgba(37,99,168,1) 0.5px, transparent 0.5px)
          `,
          backgroundSize: "15px 15px",
        }}
      />

      {/* ── Glow circles ──────────────────────────────────────── */}
      <GlowCircle
        size={500}
        color="radial-gradient(circle, rgba(37,99,168,0.5) 0%, transparent 70%)"
        top="-8%"
        left="-10%"
        delay={0}
      />
      <GlowCircle
        size={400}
        color="radial-gradient(circle, rgba(30,77,140,0.45) 0%, transparent 70%)"
        top="55%"
        left="70%"
        delay={1.5}
      />
      <GlowCircle
        size={300}
        color="radial-gradient(circle, rgba(27,42,82,0.6) 0%, transparent 70%)"
        top="30%"
        left="45%"
        delay={3}
      />

      {/* ── Bottom vignette ───────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-900 to-transparent"
      />

      {/* ── Content ───────────────────────────────────────────── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center flex flex-col items-center pt-24 pb-12"
      >
        {/* Badge */}
        <motion.div variants={fadeUp}>
          <span className="inline-flex items-center rounded-full border border-steel-500/40 bg-steel-500/[0.08] px-4 py-1.5 text-xs font-medium tracking-wide text-steel-300 shadow-[0_0_15px_rgba(37,99,168,0.12)]">
            Precision CNC &amp; VMC Manufacturing
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="mt-8 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight"
        >
          <span className="text-white">Engineering</span>
          <br />
          <span className="bg-gradient-to-r from-steel-400 via-steel-300 to-steel-500 bg-clip-text text-transparent">
            Precision.
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={fadeUp}
          className="mt-6 text-base sm:text-lg text-steel-200/50 tracking-wide"
        >
          CNC Turning &nbsp;·&nbsp; VMC Milling &nbsp;·&nbsp; Surface Finishing
          &nbsp;·&nbsp; Custom Orders
        </motion.p>

        {/* Body */}
        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-2xl text-sm sm:text-base text-steel-200/40 leading-relaxed"
        >
          Pune&apos;s trusted precision machining partner. 40+ skilled workers,
          state-of-the-art CNC and VMC machines, delivering tight-tolerance
          components across automotive, aerospace, and industrial sectors.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <Button
            variant="accent"
            size="lg"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Request a Quote
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() =>
              document
                .getElementById("services")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View Our Services
          </Button>
        </motion.div>

        {/* Trust stats */}
        <motion.div
          variants={fadeUp}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12"
        >
          {stats.map(({ icon: Icon, value, suffix, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-steel-500/10 text-steel-400 mb-1">
                <Icon size={20} strokeWidth={1.8} />
              </div>
              <span className="text-3xl sm:text-4xl font-bold text-white">
                <AnimatedCounter target={value} suffix={suffix} duration={2.2} />
              </span>
              <span className="text-xs tracking-wider uppercase text-steel-200/45">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
