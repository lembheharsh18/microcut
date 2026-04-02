"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, LayoutGroup } from "framer-motion";
import Link from "next/link";
import {
  ChevronRight,
  CircleDot,
  Grid3X3,
  Layers,
  Settings,
  X,
  Eye,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
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
   DATA
   ═══════════════════════════════════════════════════════════════════ */

type GalleryCategory =
  | "All"
  | "CNC Turning"
  | "VMC Milling"
  | "Surface Finishing"
  | "Custom Parts";

interface GalleryItem {
  id: number;
  name: string;
  category: Exclude<GalleryCategory, "All">;
  icon: LucideIcon;
  material: string;
  tolerance: string;
  description: string;
}

const categories: GalleryCategory[] = [
  "All",
  "CNC Turning",
  "VMC Milling",
  "Surface Finishing",
  "Custom Parts",
];

const categoryIcons: Record<Exclude<GalleryCategory, "All">, LucideIcon> = {
  "CNC Turning": CircleDot,
  "VMC Milling": Grid3X3,
  "Surface Finishing": Layers,
  "Custom Parts": Settings,
};

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    name: "Precision Turned Shaft",
    category: "CNC Turning",
    icon: CircleDot,
    material: "Stainless Steel 304",
    tolerance: "±0.005 mm",
    description:
      "High-precision shaft turned on CNC lathe for automotive drive assembly. Mirror-finished surface with ground bearing seats and keyway slot.",
  },
  {
    id: 2,
    name: "Milled Flange Plate",
    category: "VMC Milling",
    icon: Grid3X3,
    material: "Mild Steel EN8",
    tolerance: "±0.01 mm",
    description:
      "Multi-bolt pattern flange machined on 4-axis VMC with precision bore and face finishing. Used in hydraulic pipeline connections.",
  },
  {
    id: 3,
    name: "Polished Valve Body",
    category: "Surface Finishing",
    icon: Layers,
    material: "Brass CZ121",
    tolerance: "Ra 0.4 µm",
    description:
      "Valve body with mirror polish finish for fluid control application. Internal passages honed to exact flow specifications.",
  },
  {
    id: 4,
    name: "Custom Fixture Block",
    category: "Custom Parts",
    icon: Settings,
    material: "Aluminum 6061-T6",
    tolerance: "±0.02 mm",
    description:
      "Bespoke fixture block designed for automated assembly line. Features precision dowel holes and clamping surfaces.",
  },
  {
    id: 5,
    name: "CNC Turned Bushing",
    category: "CNC Turning",
    icon: CircleDot,
    material: "Phosphor Bronze",
    tolerance: "±0.005 mm",
    description:
      "Self-lubricating bushings turned in batch production for industrial conveyor systems. Oil grooves cut on CNC lathe.",
  },
  {
    id: 6,
    name: "Milled Gear Housing",
    category: "VMC Milling",
    icon: Grid3X3,
    material: "Cast Iron FG260",
    tolerance: "±0.01 mm",
    description:
      "Complex gear housing with multiple internal bores and mounting faces machined to precise parallelism and perpendicularity.",
  },
  {
    id: 7,
    name: "Bored Housing Assembly",
    category: "CNC Turning",
    icon: CircleDot,
    material: "Stainless Steel 316",
    tolerance: "±0.008 mm",
    description:
      "Precision bored housing for bearing assembly with interference-fit tolerances. Includes chamfered edges and O-ring grooves.",
  },
  {
    id: 8,
    name: "Anodized Cover Panel",
    category: "Surface Finishing",
    icon: Layers,
    material: "Aluminum 5052",
    tolerance: "Type III Hard Anodize",
    description:
      "CNC-machined cover panel with Type III hard anodize finish for corrosion resistance in marine applications.",
  },
  {
    id: 9,
    name: "Milled Mounting Bracket",
    category: "VMC Milling",
    icon: Grid3X3,
    material: "Mild Steel IS2062",
    tolerance: "±0.015 mm",
    description:
      "Heavy-duty mounting bracket with multiple tapped holes and slotted adjustments for industrial equipment installation.",
  },
  {
    id: 10,
    name: "Precision Connector Pin",
    category: "CNC Turning",
    icon: CircleDot,
    material: "Copper C101",
    tolerance: "±0.003 mm",
    description:
      "High-precision connector pins turned in high-volume for electrical distribution panels. Gold-plated contact surfaces.",
  },
  {
    id: 11,
    name: "Custom Jig Plate",
    category: "Custom Parts",
    icon: Settings,
    material: "Tool Steel D2",
    tolerance: "±0.005 mm",
    description:
      "Hardened and ground jig plate for quality inspection. Precision dowel and locating features for repeatable part positioning.",
  },
  {
    id: 12,
    name: "Chrome Plated Piston Rod",
    category: "Surface Finishing",
    icon: Layers,
    material: "EN19 Steel",
    tolerance: "Ra 0.2 µm",
    description:
      "Hard chrome plated piston rod with super-finished surface for hydraulic cylinder application. Ground to exact diameter.",
  },
];

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
          <span className="text-steel-300">Gallery</span>
        </nav>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
          Our Work
        </h1>
        <p className="mt-4 text-steel-200/50 text-sm sm:text-base tracking-wide max-w-2xl mx-auto">
          Precision components crafted for demanding industries
        </p>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FILTER BAR
   ═══════════════════════════════════════════════════════════════════ */

function FilterBar({
  active,
  onChange,
}: {
  active: GalleryCategory;
  onChange: (c: GalleryCategory) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`relative px-5 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
            active === cat
              ? "bg-steel-500 text-white"
              : "text-steel-200/60 hover:text-white hover:bg-steel-500/10"
          }`}
        >
          {cat}
          {active === cat && (
            <motion.span
              layoutId="filter-underline"
              className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-steel-300"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   GALLERY CARD
   ═══════════════════════════════════════════════════════════════════ */

function GalleryCard({
  item,
  onSelect,
}: {
  item: GalleryItem;
  onSelect: (item: GalleryItem) => void;
}) {
  const Icon = item.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-xl border border-steel-500/15 bg-navy-800/60 backdrop-blur-sm overflow-hidden cursor-pointer"
      onClick={() => onSelect(item)}
    >
      {/* Image placeholder area */}
      <div className="relative w-full aspect-[4/3] bg-navy-900/80 flex items-center justify-center overflow-hidden">
        {/* Grid pattern on placeholder */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(37,99,168,1) 0.5px, transparent 0.5px),
              linear-gradient(90deg, rgba(37,99,168,1) 0.5px, transparent 0.5px)
            `,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Category icon */}
        <div className="relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:opacity-40">
          <div className="w-20 h-20 rounded-full bg-steel-500/[0.08] flex items-center justify-center">
            <Icon
              size={40}
              strokeWidth={1}
              className="text-steel-400/60"
            />
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-navy-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
          <div className="flex items-center gap-2 text-white text-sm font-medium">
            <Eye size={18} />
            View Details
          </div>
        </div>
      </div>

      {/* Card content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-white group-hover:text-steel-300 transition-colors">
            {item.name}
          </h3>
        </div>

        {/* Tag badge */}
        <span className="inline-block px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-medium rounded-full bg-steel-500/15 text-steel-400 border border-steel-500/10 mb-3">
          {item.category}
        </span>

        <div className="flex items-center gap-4 text-xs text-steel-200/40">
          <span>{item.material}</span>
          <span className="w-1 h-1 rounded-full bg-steel-500/30" />
          <span>{item.tolerance}</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FULLSCREEN MODAL
   ═══════════════════════════════════════════════════════════════════ */

function GalleryModal({
  item,
  onClose,
}: {
  item: GalleryItem;
  onClose: () => void;
}) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-navy-900/95 backdrop-blur-md" />

      {/* Modal content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-3xl bg-navy-800 border border-steel-500/20 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow top */}
        <div
          aria-hidden
          className="h-px bg-gradient-to-r from-transparent via-steel-400/40 to-transparent"
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-navy-900/80 border border-steel-500/20 flex items-center justify-center text-steel-200/60 hover:text-white hover:bg-navy-900 transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Image area */}
        <div className="w-full aspect-video bg-navy-900 flex items-center justify-center relative">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(37,99,168,1) 0.5px, transparent 0.5px),
                linear-gradient(90deg, rgba(37,99,168,1) 0.5px, transparent 0.5px)
              `,
              backgroundSize: "30px 30px",
            }}
          />
          <div className="w-28 h-28 rounded-full bg-steel-500/[0.08] flex items-center justify-center">
            <Icon size={56} strokeWidth={1} className="text-steel-400/50" />
          </div>
        </div>

        {/* Details */}
        <div className="p-8 md:p-10">
          <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-wider font-medium rounded-full bg-steel-500/15 text-steel-400 border border-steel-500/10 mb-4">
            {item.category}
          </span>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            {item.name}
          </h2>

          <p className="text-sm text-steel-200/50 leading-relaxed mb-6">
            {item.description}
          </p>

          {/* Specs grid */}
          <div className="grid grid-cols-2 gap-4 p-5 rounded-xl bg-navy-900/50 border border-steel-500/10">
            <div>
              <span className="block text-xs uppercase tracking-wider text-steel-200/35 mb-1">
                Material
              </span>
              <span className="text-sm text-white/85 font-medium">
                {item.material}
              </span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wider text-steel-200/35 mb-1">
                Tolerance
              </span>
              <span className="text-sm text-white/85 font-medium">
                {item.tolerance}
              </span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wider text-steel-200/35 mb-1">
                Process
              </span>
              <span className="text-sm text-white/85 font-medium">
                {item.category}
              </span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wider text-steel-200/35 mb-1">
                Quality
              </span>
              <span className="text-sm text-white/85 font-medium">
                100% Inspected
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button variant="accent" size="md">
              Request Quote <ArrowRight size={14} className="ml-1" />
            </Button>
            <Button variant="secondary" size="md" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   GALLERY SECTION
   ═══════════════════════════════════════════════════════════════════ */

function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filtered =
    activeFilter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <AnimatedSection className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
      <motion.div variants={fadeUp}>
        <LayoutGroup>
          <FilterBar active={activeFilter} onChange={setActiveFilter} />
        </LayoutGroup>
      </motion.div>

      <motion.div variants={fadeUp}>
        <LayoutGroup>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  onSelect={setSelectedItem}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </motion.div>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {selectedItem && (
          <GalleryModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════ */

export default function GalleryPage() {
  return (
    <>
      <PageHero />
      <GallerySection />
    </>
  );
}
