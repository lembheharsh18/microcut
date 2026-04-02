"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  CircleDot,
  Grid3X3,
  Layers,
  Target,
  Settings,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

/* ═══════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════ */

interface ServiceDetail {
  icon: LucideIcon;
  name: string;
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
}

const services: ServiceDetail[] = [
  {
    icon: CircleDot,
    name: "CNC Turning",
    tagline: "Precision lathe work for cylindrical components",
    description:
      "Our state-of-the-art CNC lathes deliver high-precision turned components with exceptional surface finish and dimensional accuracy. From single prototypes to high-volume production runs, we handle shafts, bushings, connectors, and complex contoured parts with ease. Every piece undergoes rigorous in-process inspection to guarantee conformance to your exact specifications.",
    specs: [
      { label: "Materials", value: "Mild Steel, Stainless Steel, Aluminum, Brass, Copper" },
      { label: "Tolerance", value: "±0.005 mm" },
      { label: "Max Diameter", value: "350 mm" },
      { label: "Max Length", value: "600 mm" },
    ],
  },
  {
    icon: Grid3X3,
    name: "VMC Milling",
    tagline: "Multi-axis machining for complex geometries",
    description:
      "Our vertical machining centers provide 3-axis and 4-axis capability for intricate parts that demand tight tolerances and complex surface profiles. We machine housings, brackets, fixtures, and precision tooling components with repeatable accuracy across production batches. Advanced CAM programming ensures optimal tool paths for efficient cycle times and superior surface finishes.",
    specs: [
      { label: "Axes", value: "3-axis & 4-axis VMC" },
      { label: "Tolerance", value: "±0.01 mm" },
      { label: "Table Size", value: "800 × 400 mm" },
      { label: "Materials", value: "Steel, Aluminum, Brass, Plastics" },
    ],
  },
  {
    icon: Layers,
    name: "Surface Finishing",
    tagline: "Flawless surfaces for every application",
    description:
      "We offer comprehensive surface finishing services including precision grinding, mirror polishing, bead blasting, and coordination of anodizing and plating through our trusted partners. Surface quality directly impacts part performance, corrosion resistance, and aesthetics — our finishing operations ensure your components meet the highest standards for their intended application.",
    specs: [
      { label: "Processes", value: "Grinding, Polishing, Bead Blasting" },
      { label: "Surface Finish", value: "Up to Ra 0.2 µm" },
      { label: "Coatings", value: "Anodizing, Zinc Plating, Hard Chrome" },
      { label: "Inspection", value: "Surface roughness tester verified" },
    ],
  },
  {
    icon: Target,
    name: "Drilling & Boring",
    tagline: "Accurate hole-making with tight diameter tolerances",
    description:
      "Precision drilling and boring operations for holes requiring exact diameter, roundness, and positional accuracy. We handle deep-hole drilling up to 10× diameter ratios, precision boring for bearing seats, and multi-hole patterns with tight true-position tolerances. Every bore is verified with calibrated plug gauges and CMM inspection.",
    specs: [
      { label: "Min Hole Dia", value: "1.0 mm" },
      { label: "Max Depth Ratio", value: "10:1 (L/D)" },
      { label: "Position Accuracy", value: "±0.02 mm" },
      { label: "Materials", value: "All machinable metals" },
    ],
  },
  {
    icon: Settings,
    name: "Custom Orders",
    tagline: "Bespoke parts engineered to your exact needs",
    description:
      "From one-off prototypes to full production runs, we take on non-standard machining challenges that require creative engineering solutions. Our team works directly with your design engineers to optimize part geometry for manufacturability, select the right materials, and establish inspection criteria that ensure every component meets functional requirements.",
    specs: [
      { label: "Volume", value: "Prototype to 10,000+ units" },
      { label: "Design Support", value: "DFM consultation included" },
      { label: "File Formats", value: "STEP, IGES, DXF, PDF drawings" },
      { label: "Lead Time", value: "As fast as 5 business days" },
    ],
  },
];

/* ── Capability table ─────────────────────────────────────────────── */

const capabilityRows = [
  {
    service: "CNC Turning",
    materials: "MS, SS, Al, Brass, Cu",
    tolerance: "±0.005 mm",
    leadTime: "5–10 days",
    minQty: "1 pc",
  },
  {
    service: "VMC Milling",
    materials: "Steel, Al, Brass, Plastics",
    tolerance: "±0.01 mm",
    leadTime: "7–12 days",
    minQty: "1 pc",
  },
  {
    service: "Surface Finishing",
    materials: "All metals",
    tolerance: "Ra 0.2 µm",
    leadTime: "3–5 days",
    minQty: "1 pc",
  },
  {
    service: "Drilling & Boring",
    materials: "All machinable metals",
    tolerance: "±0.02 mm",
    leadTime: "5–8 days",
    minQty: "1 pc",
  },
  {
    service: "Custom Orders",
    materials: "Per requirement",
    tolerance: "Per drawing",
    leadTime: "5–15 days",
    minQty: "1 pc",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   ANIMATION HELPERS
   ═══════════════════════════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function AnimatedSection({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      id={id}
      variants={stagger}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE HEADER
   ═══════════════════════════════════════════════════════════════════ */

function PageHeader() {
  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        minHeight: "40vh",
        background:
          "linear-gradient(180deg, #0a0f1e 0%, #111d35 60%, #0a0f1e 100%)",
      }}
    >
      {/* Blueprint grid */}
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

      {/* Radial glow */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(37,99,168,0.1) 0%, transparent 70%)",
        }}
      />

      {/* Bottom vignette */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0f1e] to-transparent"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center px-4"
      >
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center justify-center gap-1.5 text-xs text-steel-200/40 mb-6"
        >
          <Link
            href="/"
            className="hover:text-steel-300 transition-colors"
          >
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-steel-300">Services</span>
        </nav>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
          Our Services
        </h1>
        <p className="mt-4 text-steel-200/50 text-sm sm:text-base tracking-wide max-w-xl mx-auto">
          Precision machining solutions tailored to your specifications
        </p>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SERVICE DETAIL SECTION
   ═══════════════════════════════════════════════════════════════════ */

function ServiceSection({
  service,
  index,
}: {
  service: ServiceDetail;
  index: number;
}) {
  const isReversed = index % 2 === 1;
  const Icon = service.icon;

  return (
    <AnimatedSection
      className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-16 md:py-24 ${
        index !== 0
          ? "border-t border-steel-500/10"
          : ""
      }`}
    >
      {/* ── Icon card ──────────────────────────────────────── */}
      <motion.div
        variants={fadeUp}
        className={`flex items-center justify-center ${
          isReversed ? "lg:order-2" : ""
        }`}
      >
        <div className="relative w-full max-w-[400px] aspect-square rounded-2xl border border-steel-500/15 bg-navy-800/60 backdrop-blur-sm flex items-center justify-center group">
          {/* Glow top */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-steel-500/30 to-transparent"
          />
          {/* Corner accents */}
          <div
            aria-hidden
            className="absolute top-3 left-3 w-6 h-6 border-t border-l border-steel-500/25 rounded-tl-lg"
          />
          <div
            aria-hidden
            className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-steel-500/25 rounded-br-lg"
          />

          {/* Background circle */}
          <div className="absolute w-40 h-40 rounded-full bg-steel-500/[0.06] group-hover:bg-steel-500/[0.1] transition-colors duration-500" />

          {/* Icon */}
          <Icon
            size={80}
            strokeWidth={1}
            className="relative z-10 text-steel-400 group-hover:text-steel-300 transition-colors duration-300"
          />

          {/* Label below icon */}
          <span className="absolute bottom-6 text-xs uppercase tracking-[0.2em] text-steel-400/40 font-medium">
            {service.name}
          </span>
        </div>
      </motion.div>

      {/* ── Content ────────────────────────────────────────── */}
      <motion.div
        variants={fadeUp}
        className={isReversed ? "lg:order-1" : ""}
      >
        <span className="inline-block text-xs uppercase tracking-[0.2em] text-steel-400/60 font-medium mb-3">
          {service.tagline}
        </span>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
          {service.name}
        </h2>

        <p className="text-sm sm:text-base text-steel-200/50 leading-relaxed mb-8">
          {service.description}
        </p>

        {/* Specs list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {service.specs.map(({ label, value }) => (
            <div
              key={label}
              className="flex items-start gap-2.5 text-sm"
            >
              <CheckCircle2
                size={16}
                className="mt-0.5 shrink-0 text-steel-400/70"
              />
              <div>
                <span className="text-steel-200/40 block text-xs uppercase tracking-wider">
                  {label}
                </span>
                <span className="text-white/80">{value}</span>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="accent"
          size="md"
          onClick={() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Request This Service
          <ArrowRight size={16} className="ml-1" />
        </Button>
      </motion.div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CAPABILITY TABLE
   ═══════════════════════════════════════════════════════════════════ */

function CapabilityTable() {
  return (
    <AnimatedSection className="py-16 md:py-24 border-t border-steel-500/10">
      <motion.div variants={fadeUp} className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-steel-400 via-steel-300 to-steel-500 bg-clip-text text-transparent">
          Capability Overview
        </h2>
        <p className="mt-3 text-steel-200/45 text-sm sm:text-base">
          A quick reference of our machining capabilities
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="bg-steel-500/15 text-left">
              <th className="px-5 py-3.5 font-semibold text-steel-300 rounded-tl-lg">
                Service
              </th>
              <th className="px-5 py-3.5 font-semibold text-steel-300">
                Materials
              </th>
              <th className="px-5 py-3.5 font-semibold text-steel-300">
                Tolerance
              </th>
              <th className="px-5 py-3.5 font-semibold text-steel-300">
                Lead Time
              </th>
              <th className="px-5 py-3.5 font-semibold text-steel-300 rounded-tr-lg">
                Min Order Qty
              </th>
            </tr>
          </thead>
          <tbody>
            {capabilityRows.map((row, i) => (
              <tr
                key={row.service}
                className={`${
                  i % 2 === 0 ? "bg-navy-800/40" : "bg-navy-800/20"
                } border-b border-steel-500/[0.07] hover:bg-steel-500/[0.06] transition-colors`}
              >
                <td className="px-5 py-3.5 font-medium text-white/90">
                  {row.service}
                </td>
                <td className="px-5 py-3.5 text-steel-200/55">
                  {row.materials}
                </td>
                <td className="px-5 py-3.5 text-steel-200/55">
                  {row.tolerance}
                </td>
                <td className="px-5 py-3.5 text-steel-200/55">
                  {row.leadTime}
                </td>
                <td className="px-5 py-3.5 text-steel-200/55">
                  {row.minQty}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CONTACT CTA
   ═══════════════════════════════════════════════════════════════════ */

function ContactCTA() {
  return (
    <AnimatedSection className="py-16 md:py-24 border-t border-steel-500/10">
      <motion.div
        variants={fadeUp}
        className="rounded-2xl border border-steel-500/15 bg-navy-800/50 backdrop-blur-sm p-10 md:p-16 text-center"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
          Not sure what you need?
        </h2>
        <p className="text-steel-200/50 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
          Our engineering team can review your drawings, recommend the best
          machining process, and provide a detailed quote — all within 24 hours.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="accent"
            size="lg"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Contact Us
            <ArrowRight size={16} className="ml-1" />
          </Button>
          <Button variant="secondary" size="lg">
            Download Capability Sheet
          </Button>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════ */

export default function ServicesPage() {
  return (
    <>
      <PageHeader />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {services.map((service, i) => (
          <ServiceSection key={service.name} service={service} index={i} />
        ))}

        <CapabilityTable />
        <ContactCTA />
      </div>
    </>
  );
}
