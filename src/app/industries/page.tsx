"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  ChevronRight,
  Car,
  Plane,
  Shield,
  Droplet,
  Factory,
  HeartPulse,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";

/* ═══════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════ */

interface Industry {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  components: string[];
}

const industries: Industry[] = [
  {
    id: "automotive",
    name: "Automotive",
    icon: Car,
    description:
      "Delivering high-performance powertrain and suspension components for both internal combustion and electric vehicles. Our rigorous quality control ensures components withstand extreme cyclic loading.",
    components: ["Engine components", "Transmission brackets", "Drive shafts", "Custom housings"],
  },
  {
    id: "aerospace",
    name: "Aerospace",
    icon: Plane,
    description:
      "Advanced machining of exotic alloys and lightweight materials for aviation and space exploration. We meet the strict safety, traceability, and tolerance standards required by Tier 1 contractors.",
    components: ["Lightweight precision parts", "Structural components", "Landing gear fittings"],
  },
  {
    id: "defense",
    name: "Defense",
    icon: Shield,
    description:
      "Providing mission-critical machined parts for military and defense contractors. Our secure facilities handle ITAR-compliant projects with absolute confidentiality and precision.",
    components: ["Mission-critical machined parts", "Tactical enclosures", "Weapon system components"],
  },
  {
    id: "oil-gas",
    name: "Oil & Gas",
    icon: Droplet,
    description:
      "Manufacturing robust, corrosion-resistant components capable of performing in extreme pressure and high-temperature environments. We specialize in hard-to-machine alloys like Inconel and Monel.",
    components: ["Flow-control flanges", "High-pressure valves", "Custom fittings", "Downhole tools"],
  },
  {
    id: "industrial",
    name: "Industrial Equipment",
    icon: Factory,
    description:
      "Supporting automation, robotics, and heavy machinery with robust and precise mechanical components. Our batch manufacturing capabilities scale right alongside your production demands.",
    components: ["Heavy-duty gears", "Gearbox housings", "Automated assembly fixtures", "Pulleys"],
  },
  {
    id: "medical",
    name: "Medical Devices",
    icon: HeartPulse,
    description:
      "Producing biocompatible implant-grade components and precision surgical instruments. Manufactured with extreme cleanliness and exact dimensional conformity for life-saving applications.",
    components: ["Implant-grade components", "Precision surgical instruments", "Diagnostic enclosures"],
  },
];

/* ═══════════════════════════════════════════════════════════════════
   ANIMATION HELPERS
   ═══════════════════════════════════════════════════════════════════ */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUpCard = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ═══════════════════════════════════════════════════════════════════
   PAGE HERO
   ═══════════════════════════════════════════════════════════════════ */

function PageHero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        minHeight: "40vh",
        background:
          "linear-gradient(180deg, #0a0f1e 0%, #111d35 60%, #0a0f1e 100%)",
      }}
    >
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
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(37,99,168,0.1) 0%, transparent 70%)",
        }}
      />
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
        <nav
          aria-label="Breadcrumb"
          className="flex items-center justify-center gap-1.5 text-xs text-steel-200/40 mb-6"
        >
          <Link href="/" className="hover:text-steel-300 transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-steel-300">Industries</span>
        </nav>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
          Industries We Serve
        </h1>
        <p className="mt-4 text-steel-200/50 text-sm sm:text-base tracking-wide max-w-2xl mx-auto">
          Precision components for sectors that demand perfection
        </p>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   INDUSTRY CARDS GRID
   ═══════════════════════════════════════════════════════════════════ */

function IndustryCard({ industry }: { industry: Industry }) {
  const Icon = industry.icon;

  return (
    <motion.div
      variants={fadeUpCard}
      className="group relative flex flex-col p-6 sm:p-8 rounded-2xl bg-navy-800/40 border border-steel-500/15 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-steel-400/40 hover:bg-navy-800/70 hover:shadow-[0_12px_40px_rgba(37,99,168,0.12)]"
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-steel-500/0 via-transparent to-transparent group-hover:from-steel-500/[0.05] transition-colors duration-500" />

      {/* Icon */}
      <div className="relative mb-6">
        <div className="w-14 h-14 rounded-xl bg-steel-500/10 flex items-center justify-center border border-steel-500/20 group-hover:bg-steel-500/20 transition-colors duration-300">
          <Icon className="w-7 h-7 text-steel-300" strokeWidth={1.5} />
        </div>
      </div>

      {/* Content */}
      <div className="relative flex-grow">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-steel-200 transition-colors">
          {industry.name}
        </h3>
        <p className="text-sm text-steel-200/60 leading-relaxed mb-6">
          {industry.description}
        </p>

        <ul className="space-y-2 mb-8">
          {industry.components.map((item, i) => (
            <li key={i} className="flex items-start text-sm text-steel-200/50">
              <span className="mr-2.5 mt-1.5 w-1 h-1 rounded-full bg-steel-400/50 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Link */}
      <div className="relative mt-auto pt-4 border-t border-steel-500/10">
        <Link
          href={`/industries/${industry.id}`}
          className="inline-flex items-center text-sm font-medium text-steel-300 hover:text-white transition-colors group-hover:text-steel-200"
        >
          Learn More
          <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}

function IndustriesGrid() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper>
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {industries.map((ind) => (
          <IndustryCard key={ind.id} industry={ind} />
        ))}
      </motion.div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BOTTOM CTA
   ═══════════════════════════════════════════════════════════════════ */

function IndustriesCTA() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-navy-900 border-t border-steel-500/10" />
      
      {/* Background patterns */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at bottom center, rgba(37,99,168,0.15) 0%, transparent 70%)",
        }}
      />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Don&apos;t see your industry?
        </h2>
        <p className="text-steel-200/60 mb-8 sm:text-lg">
          We work with all sectors requiring precision machining. Our versatile capabilities and engineering expertise allow us to adapt to your unique industry requirements.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" tabIndex={-1}>
            <Button variant="primary" size="lg">
              Contact Engineering <ArrowRight size={16} />
            </Button>
          </Link>
          <Link href="/services" tabIndex={-1}>
            <Button variant="secondary" size="lg" className="bg-navy-950/50">
              Explore Services
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE MAIN
   ═══════════════════════════════════════════════════════════════════ */

export default function IndustriesPage() {
  return (
    <>
      <PageHero />
      <IndustriesGrid />
      <IndustriesCTA />
    </>
  );
}
