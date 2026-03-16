"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  Crosshair,
  Clock,
  Handshake,
  MapPin,
  Users,
  Cpu,
  Award,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

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
   SECTION 1 — PAGE HERO
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
          <span className="text-steel-300">About</span>
        </nav>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
          About Microcut Technology
        </h1>
        <p className="mt-4 text-steel-200/50 text-sm sm:text-base tracking-wide max-w-2xl mx-auto">
          Built on precision. Driven by quality. Trusted by industry.
        </p>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 2 — OUR STORY
   ═══════════════════════════════════════════════════════════════════ */

const keyFacts = [
  { label: "Founded", value: "2015" },
  { label: "Location", value: "Pune, Maharashtra" },
  { label: "Workers", value: "40+" },
  { label: "Machines", value: "12+" },
  { label: "Specialization", value: "CNC & VMC Machining" },
];

function OurStory() {
  return (
    <AnimatedSection className="py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
      {/* Left — Narrative */}
      <motion.div variants={fadeUp}>
        <span className="inline-block text-xs uppercase tracking-[0.2em] text-steel-400/60 font-medium mb-3">
          Our Story
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
          Who We Are
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-steel-200/50 leading-relaxed">
          <p>
            Microcut Technology is a Pune-based precision CNC and VMC
            manufacturing company founded with a singular mission: deliver
            components that meet exact tolerances, every single time. What
            started as a small workshop with a handful of machines has grown
            into a full-scale precision machining facility trusted by clients
            across India.
          </p>
          <p>
            Over the years, we have expanded to a team of 40+ skilled
            machinists, toolmakers, and quality inspectors operating 12+
            advanced CNC and VMC machines. Our investment in modern equipment,
            rigorous training, and continuous process improvement allows us to
            handle everything from one-off prototypes to high-volume production
            runs with consistent quality.
          </p>
          <p>
            Today, we proudly serve automotive, aerospace, and industrial
            clients who depend on our reliability, technical expertise, and
            commitment to on-time delivery. Every component that leaves our
            shop floor has been measured, inspected, and verified — because at
            Microcut, precision is not just a promise; it&apos;s our standard.
          </p>
        </div>
      </motion.div>

      {/* Right — Key Facts card */}
      <motion.div variants={fadeUp}>
        <div className="rounded-2xl border border-steel-500/15 bg-navy-800/60 backdrop-blur-sm overflow-hidden">
          {/* Glow top */}
          <div
            aria-hidden
            className="h-px bg-gradient-to-r from-transparent via-steel-400/40 to-transparent"
          />

          <div className="p-8 md:p-10">
            <h3 className="text-lg font-semibold text-white mb-6">
              At a Glance
            </h3>

            <div className="space-y-5">
              {keyFacts.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between border-b border-steel-500/10 pb-4 last:border-0 last:pb-0"
                >
                  <span className="text-sm text-steel-200/40 uppercase tracking-wider">
                    {label}
                  </span>
                  <span className="text-sm font-medium text-white/85">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 3 — COMPANY VALUES
   ═══════════════════════════════════════════════════════════════════ */

const values = [
  {
    icon: Crosshair,
    title: "Precision First",
    description:
      "Every component is machined to exact tolerance specifications. We never cut corners — only metal, with micrometer-level accuracy.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description:
      "Reliable turnaround with no excuses. Our production planning and scheduling ensures your parts arrive when promised.",
  },
  {
    icon: Handshake,
    title: "Client Partnership",
    description:
      "We build long-term relationships, not one-time transactions. Your success drives our growth, and we invest in understanding your needs.",
  },
];

function CompanyValues() {
  return (
    <AnimatedSection className="py-16 md:py-24 border-t border-steel-500/10">
      <motion.div variants={fadeUp} className="text-center mb-14">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-steel-400 via-steel-300 to-steel-500 bg-clip-text text-transparent">
          Our Values
        </h2>
        <p className="mt-3 text-steel-200/45 text-sm sm:text-base">
          The principles that guide every job we take on
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {values.map(({ icon: Icon, title, description }) => (
          <motion.div
            key={title}
            variants={fadeUp}
            whileHover={{
              y: -4,
              borderColor: "rgba(37, 99, 168, 0.4)",
              boxShadow: "0 8px 30px rgba(37, 99, 168, 0.08)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="relative rounded-xl border border-steel-500/15 bg-navy-800/60 backdrop-blur-sm p-7 md:p-8 group"
          >
            {/* Glowing top border */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px rounded-t-xl bg-gradient-to-r from-transparent via-steel-400/40 to-transparent"
            />

            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-steel-500/10 text-steel-400 mb-5 group-hover:bg-steel-500/20 transition-colors">
              <Icon size={24} strokeWidth={1.5} />
            </div>

            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-sm text-steel-200/45 leading-relaxed">
              {description}
            </p>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 4 — TIMELINE
   ═══════════════════════════════════════════════════════════════════ */

const milestones = [
  { year: "2015", title: "Company Founded", description: "Microcut Technology established in Pune with a vision to deliver precision-machined components to Indian industry." },
  { year: "2016", title: "First CNC Machine Added", description: "Installed our first CNC turning center, marking the shift from conventional to computer-controlled machining." },
  { year: "2018", title: "Expanded to 10+ Machines", description: "Rapid growth in client demand fueled investment in additional CNC and VMC machines across our facility." },
  { year: "2020", title: "Reached 40 Workers", description: "Team expanded to 40+ skilled machinists, tool setters, and quality inspectors to support growing operations." },
  { year: "2022", title: "500+ Orders Milestone", description: "Successfully delivered over 500 precision orders across automotive, aerospace, and industrial sectors." },
  { year: "2024", title: "ISO Quality Process", description: "Implemented ISO-aligned quality management processes to ensure consistent, traceable manufacturing excellence." },
];

function TimelineDot() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="w-4 h-4 rounded-full bg-steel-500 border-2 border-navy-900 shadow-[0_0_12px_rgba(37,99,168,0.4)] z-10" />
    </div>
  );
}

function Timeline() {
  return (
    <AnimatedSection className="py-16 md:py-24 border-t border-steel-500/10">
      <motion.div variants={fadeUp} className="text-center mb-14">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-steel-400 via-steel-300 to-steel-500 bg-clip-text text-transparent">
          Our Journey
        </h2>
        <p className="mt-3 text-steel-200/45 text-sm sm:text-base">
          Key milestones that shaped who we are today
        </p>
      </motion.div>

      {/* Desktop timeline */}
      <div className="relative">
        {/* Vertical center line — desktop only */}
        <div
          aria-hidden
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-steel-500/30 via-steel-500/15 to-transparent -translate-x-px"
        />

        <div className="space-y-8 md:space-y-0">
          {milestones.map((m, i) => {
            const isLeft = i % 2 === 0;
            return (
              <TimelineItem key={m.year} milestone={m} isLeft={isLeft} index={i} />
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

function TimelineItem({
  milestone,
  isLeft,
  index,
}: {
  milestone: (typeof milestones)[number];
  isLeft: boolean;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      className="relative grid grid-cols-1 md:grid-cols-[1fr_40px_1fr] gap-4 md:gap-0 md:py-6"
    >
      {/* Left content */}
      <div
        className={`${
          isLeft ? "md:text-right md:pr-10" : "md:order-3 md:pl-10"
        }`}
      >
        <span className="inline-block text-xs font-bold text-steel-400 tracking-wider mb-1">
          {milestone.year}
        </span>
        <h3 className="text-lg font-semibold text-white mb-1.5">
          {milestone.title}
        </h3>
        <p className="text-sm text-steel-200/45 leading-relaxed max-w-sm ml-auto">
          {milestone.description}
        </p>
      </div>

      {/* Center dot */}
      <div className="hidden md:flex items-start justify-center pt-1 md:order-2">
        <TimelineDot />
      </div>

      {/* Empty space on opposite side — desktop */}
      <div className={`hidden md:block ${isLeft ? "md:order-3" : "md:order-1"}`} />

      {/* Mobile dot */}
      <div className="md:hidden flex items-center gap-3 order-first">
        <TimelineDot />
        <span className="text-xs font-bold text-steel-400 tracking-wider">
          {milestone.year}
        </span>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 5 — TEAM
   ═══════════════════════════════════════════════════════════════════ */

const team = [
  { name: "Rajesh Patil", role: "Owner & Founder", bio: "20+ years in precision manufacturing, driving Microcut's vision from day one." },
  { name: "Sunil Jadhav", role: "Production Manager", bio: "Oversees daily shop floor operations, scheduling, and machine utilization." },
  { name: "Priya Kulkarni", role: "Quality Head", bio: "Leads inspection protocols and ensures every part meets client specs." },
  { name: "Amit Deshmukh", role: "Operations Lead", bio: "Coordinates logistics, procurement, and client communication workflows." },
];

function TeamSection() {
  return (
    <AnimatedSection className="py-16 md:py-24 border-t border-steel-500/10">
      <motion.div variants={fadeUp} className="text-center mb-14">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          The People Behind the Precision
        </h2>
        <p className="mt-3 text-steel-200/45 text-sm sm:text-base">
          A dedicated team committed to manufacturing excellence
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {team.map(({ name, role, bio }) => (
          <motion.div
            key={name}
            variants={fadeUp}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="group rounded-xl border border-steel-500/15 bg-navy-800/60 backdrop-blur-sm p-6 text-center cursor-default"
          >
            {/* Avatar placeholder */}
            <div className="w-20 h-20 rounded-full bg-navy-700 border border-steel-500/20 mx-auto mb-4 flex items-center justify-center group-hover:border-steel-500/40 transition-colors">
              <User size={32} strokeWidth={1.2} className="text-steel-400/50" />
            </div>

            <h3 className="text-base font-semibold text-white group-hover:text-steel-300 transition-colors">
              {name}
            </h3>
            <p className="text-xs uppercase tracking-wider text-steel-400/60 font-medium mt-1 mb-3">
              {role}
            </p>
            <p className="text-sm text-steel-200/40 leading-relaxed">
              {bio}
            </p>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 6 — BOTTOM CTA
   ═══════════════════════════════════════════════════════════════════ */

function BottomCTA() {
  return (
    <AnimatedSection className="py-16 md:py-24 border-t border-steel-500/10">
      <motion.div
        variants={fadeUp}
        className="rounded-2xl border border-steel-500/15 bg-navy-800/50 backdrop-blur-sm p-10 md:p-16 text-center"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to work with us?
        </h2>
        <p className="text-steel-200/50 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
          Whether you need a single prototype or a full production run, our team
          is ready to deliver precision-machined components to your exact
          specifications.
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
            Get a Quote
            <ArrowRight size={16} className="ml-1" />
          </Button>
          <Button variant="secondary" size="lg">
            Contact Us
          </Button>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════ */

export default function AboutPage() {
  return (
    <>
      <PageHero />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <OurStory />
        <CompanyValues />
        <Timeline />
        <TeamSection />
        <BottomCTA />
      </div>
    </>
  );
}
