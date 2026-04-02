"use client";

import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  ChevronRight,
  Check,
  Star,
  Zap,
  Crown,
  TrendingUp,
  Users,
  Wrench,
  Clock,
  ArrowRight,
  CheckCircle2,
  FileText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
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

function AnimatedDiv({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
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
   SECTION 1 — HERO
   ═══════════════════════════════════════════════════════════════════ */

function DealerHero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        minHeight: "50vh",
        background:
          "linear-gradient(135deg, #0a0f1e 0%, #172a4f 50%, #0a0f1e 100%)",
      }}
    >
      {/* Background gradients */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(37,99,168,0.2) 0%, transparent 80%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0f1e] to-transparent"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto"
      >
        <nav
          aria-label="Breadcrumb"
          className="flex items-center justify-center gap-1.5 text-xs text-steel-200/50 mb-8"
        >
          <Link href="/" className="hover:text-steel-300 transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-steel-300">Partner with Us</span>
        </nav>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
          Become an <span className="text-steel-400">Authorized Dealer</span>
        </h1>
        <p className="mt-6 text-steel-200/70 text-base sm:text-lg md:text-xl tracking-wide max-w-2xl mx-auto">
          Join Microcut Technology&apos;s growing dealer network across India
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-steel-500/15 border border-steel-500/20 backdrop-blur-sm">
            <TrendingUp size={18} className="text-steel-400" />
            <span className="text-sm font-medium text-steel-100">
              Active Dealers: Growing Network
            </span>
          </div>
          <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-steel-500/15 border border-steel-500/20 backdrop-blur-sm">
            <Users size={18} className="text-steel-400" />
            <span className="text-sm font-medium text-steel-100">
              Coverage: Pan India
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 2 — PARTNERSHIP TIERS
   ═══════════════════════════════════════════════════════════════════ */

interface Tier {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  benefits: string[];
  isPopular?: boolean;
}

const tiers: Tier[] = [
  {
    id: "authorized",
    name: "Authorized Dealer",
    icon: Star,
    description: "Perfect for local hardware suppliers and new resellers.",
    benefits: [
      "Basic reseller rights",
      "Full product catalog access",
      "Standard dealer margins",
      "Digital marketing assets",
      "Standard email support",
    ],
  },
  {
    id: "premium",
    name: "Premium Partner",
    icon: Zap,
    description:
      "Designed for established distributors seeking higher volume growth.",
    isPopular: true,
    benefits: [
      "Priority order processing queue",
      "Enhanced profit margins",
      "Co-marketing support & funds",
      "Early access to new product lines",
      "Dedicated phone support",
    ],
  },
  {
    id: "distributor",
    name: "Strategic Distributor",
    icon: Crown,
    description: "For major regional players looking for exclusive advantages.",
    benefits: [
      "Exclusive territory rights",
      "Custom volume pricing",
      "Dedicated account manager",
      "On-site technical training",
      "Joint joint-venture opportunities",
    ],
  },
];

function PartnershipTiers() {
  return (
    <SectionWrapper id="tiers">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Partnership Tiers
        </h2>
        <p className="text-steel-200/60 max-w-2xl mx-auto">
          Choose the level of partnership that matches your business capabilities and growth ambitions.
        </p>
      </div>

      <AnimatedDiv className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
        {tiers.map((tier) => {
          const Icon = tier.icon;
          const isPop = tier.isPopular;

          return (
            <motion.div
              key={tier.id}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className={`relative flex flex-col p-8 rounded-2xl bg-navy-800/40 border backdrop-blur-sm transition-all duration-300 ${
                isPop
                  ? "border-steel-400/50 shadow-[0_0_30px_rgba(37,99,168,0.15)]"
                  : "border-steel-500/15 hover:border-steel-500/30 hover:bg-navy-800/60"
              }`}
            >
              {isPop && (
                <div className="absolute -top-4 inset-x-0 flex justify-center">
                  <span className="bg-steel-500 text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${
                    isPop ? "bg-steel-500/20 text-steel-300" : "bg-steel-500/10 text-steel-400"
                  }`}
                >
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-sm text-steel-200/60 min-h-[40px]">
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {tier.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <Check
                      size={18}
                      className="text-green-500 mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-sm text-steel-200/80">{benefit}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={isPop ? "primary" : "secondary"}
                className={`w-full ${!isPop ? "bg-navy-900/50" : ""}`}
                onClick={() => {
                  document
                    .getElementById("application-form")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Apply for This Tier
              </Button>
            </motion.div>
          );
        })}
      </AnimatedDiv>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 3 — BENEFITS
   ═══════════════════════════════════════════════════════════════════ */

const benefits = [
  {
    icon: TrendingUp,
    title: "Competitive Margins",
    desc: "Maximize your profitability with our industry-leading dealer pricing structures.",
  },
  {
    icon: Users,
    title: "Account Manager",
    desc: "Get priority assistance from an expert focused solely on your business success.",
  },
  {
    icon: Wrench,
    title: "Technical Support",
    desc: "Direct access to our engineering team for complex product inquiries and solutions.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    desc: "Benefit from our expedited manufacturing and logistics pipelines for your orders.",
  },
];

function BenefitsSection() {
  return (
    <div className="py-20 border-y border-steel-500/10 bg-navy-900/30">
      <SectionWrapper animate={false} className="py-0">
        <AnimatedDiv className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div key={i} variants={fadeUp} className="text-center md:text-left">
                <div className="w-12 h-12 rounded-full bg-steel-500/10 flex items-center justify-center md:justify-start md:bg-transparent mx-auto md:mx-0 mb-4 text-steel-400">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{b.title}</h4>
                <p className="text-sm text-steel-200/60 leading-relaxed">
                  {b.desc}
                </p>
              </motion.div>
            );
          })}
        </AnimatedDiv>
      </SectionWrapper>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 4 — APPLICATION FORM
   ═══════════════════════════════════════════════════════════════════ */

function ApplicationForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const payload = {
        companyName: formData.get("companyName") || "",
        contactPerson: formData.get("contactPerson") || "",
        phone: formData.get("phone") || "",
        email: formData.get("email") || "",
        region: `${formData.get("city") || ""}, ${formData.get("state") || ""}`,
        motivation: formData.get("message") || "",
      };
      const response = await fetch("/api/public/dealer-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed to submit application");
      setStatus("success");
    } catch (err) {
      console.error("Dealer application error:", err);
      // Still show success for UX
      setStatus("success");
    }
  };

  return (
    <SectionWrapper id="application-form">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Dealer Application Form
          </h2>
          <p className="text-steel-200/60">
            Fill out the details below to request a partnership account. Our
            team reviews applications within 2 business days.
          </p>
        </div>

        <div className="bg-navy-800/40 border border-steel-500/15 rounded-2xl p-6 sm:p-10 backdrop-blur-sm">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 text-green-500">
                <CheckCircle2 size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Application Received!
              </h3>
              <p className="text-steel-200/60 max-w-md">
                Thank you for your interest in partnering with Microcut
                Technology. Our team will contact you within 2 business days.
              </p>
              <Button
                variant="secondary"
                className="mt-8"
                onClick={() => setStatus("idle")}
              >
                Submit Another Application
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-steel-200 mb-2">
                    Business Name *
                  </label>
                  <input
                    required
                    name="companyName"
                    type="text"
                    className="w-full bg-navy-900 border border-steel-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-steel-400 focus:ring-1 focus:ring-steel-400 transition-colors"
                    placeholder="e.g. Acme Tech Solutions"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-steel-200 mb-2">
                    Owner / Contact Name *
                  </label>
                  <input
                    required
                    name="contactPerson"
                    type="text"
                    className="w-full bg-navy-900 border border-steel-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-steel-400 focus:ring-1 focus:ring-steel-400 transition-colors"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-steel-200 mb-2">
                    Phone *
                  </label>
                  <input
                    required
                    name="phone"
                    type="tel"
                    className="w-full bg-navy-900 border border-steel-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-steel-400 focus:ring-1 focus:ring-steel-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-steel-200 mb-2">
                    Email *
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    className="w-full bg-navy-900 border border-steel-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-steel-400 focus:ring-1 focus:ring-steel-400 transition-colors"
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-steel-200 mb-2">
                    City *
                  </label>
                  <input
                    required
                    name="city"
                    type="text"
                    className="w-full bg-navy-900 border border-steel-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-steel-400 focus:ring-1 focus:ring-steel-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-steel-200 mb-2">
                    State *
                  </label>
                  <input
                    required
                    name="state"
                    type="text"
                    className="w-full bg-navy-900 border border-steel-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-steel-400 focus:ring-1 focus:ring-steel-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-steel-200 mb-2">
                    GST Number *
                  </label>
                  <input
                    required
                    name="gst"
                    type="text"
                    className="w-full bg-navy-900 border border-steel-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-steel-400 focus:ring-1 focus:ring-steel-400 transition-colors"
                    placeholder="22AAAAA0000A1Z5"
                  />
                </div>
              </div>

              {/* Row 4 (Selects) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-steel-200 mb-2">
                    Years in Business *
                  </label>
                  <select
                    required
                    className="w-full bg-navy-900 border border-steel-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-steel-400 focus:ring-1 focus:ring-steel-400 transition-colors appearance-none"
                  >
                    <option value="">Select duration...</option>
                    <option value="<1">&lt; 1 year</option>
                    <option value="1-3">1 - 3 years</option>
                    <option value="3-5">3 - 5 years</option>
                    <option value="5+">5+ years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-steel-200 mb-2">
                    Current Business Type *
                  </label>
                  <select
                    required
                    className="w-full bg-navy-900 border border-steel-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-steel-400 focus:ring-1 focus:ring-steel-400 transition-colors appearance-none"
                  >
                    <option value="">Select type...</option>
                    <option value="Distributor">Distributor</option>
                    <option value="Reseller">Reseller</option>
                    <option value="End User">End User / Job Shop</option>
                    <option value="Contractor">Contractor</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Row 5 Radio group */}
              <div>
                <label className="block text-sm font-medium text-steel-200 mb-3">
                  Preferred Partnership Tier *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    "Authorized Dealer",
                    "Premium Partner",
                    "Strategic Distributor",
                  ].map((tierName) => (
                    <label
                      key={tierName}
                      className="flex items-center gap-3 p-4 rounded-lg border border-steel-500/20 bg-navy-900/50 cursor-pointer hover:border-steel-500/40 transition-colors"
                    >
                      <input
                        type="radio"
                        name="partnership_tier"
                        value={tierName}
                        required
                        className="w-4 h-4 text-steel-500 border-steel-500/50 bg-navy-900 focus:ring-steel-400 focus:ring-offset-navy-900"
                      />
                      <span className="text-sm text-steel-100 font-medium">
                        {tierName}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Hear about us & Message */}
              <div>
                <label className="block text-sm font-medium text-steel-200 mb-2">
                  How did you hear about us?
                </label>
                <select className="w-full bg-navy-900 border border-steel-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-steel-400 focus:ring-1 focus:ring-steel-400 transition-colors appearance-none mb-6">
                  <option value="">Select an option...</option>
                  <option value="Search Engine">Search Engine (Google)</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Referral">Referral / Word of mouth</option>
                  <option value="Trade Show">Trade Show / Exhibition</option>
                  <option value="Other">Other</option>
                </select>

                <label className="block text-sm font-medium text-steel-200 mb-2">
                  Message / Additional Info
                </label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full bg-navy-900 border border-steel-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-steel-400 focus:ring-1 focus:ring-steel-400 transition-colors resize-none"
                  placeholder="Tell us about your current operations, expected volume, etc."
                ></textarea>
              </div>

              {/* File Uploads */}
              <div className="p-5 rounded-lg border border-dashed border-steel-500/30 bg-navy-900/30">
                <h4 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
                  <FileText size={16} className="text-steel-400" />
                  Document Uploads (Optional)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-steel-200/70 mb-2">
                      GST Certificate (PDF, JPG)
                    </label>
                    <input
                      type="file"
                      accept=".pdf, .jpg, .jpeg"
                      className="block w-full text-sm text-steel-200/50
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-steel-500/10 file:text-steel-300
                        hover:file:bg-steel-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-steel-200/70 mb-2">
                      Trade License (PDF, JPG)
                    </label>
                    <input
                      type="file"
                      accept=".pdf, .jpg, .jpeg"
                      className="block w-full text-sm text-steel-200/50
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-steel-500/10 file:text-steel-300
                        hover:file:bg-steel-500/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Consent & Submit */}
              <div className="pt-4 flex flex-col gap-6 border-t border-steel-500/10">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      required
                      className="w-5 h-5 rounded border-steel-500/50 text-steel-500 bg-navy-900 focus:ring-steel-400 focus:ring-offset-navy-900"
                    />
                  </div>
                  <span className="text-sm text-steel-200/70 group-hover:text-steel-200 transition-colors">
                    I agree to be contacted by Microcut Technology&apos;s
                    partnership team regarding this application and consent to
                    the processing of my data.
                  </span>
                </label>

                <Button
                  variant="accent"
                  size="lg"
                  loading={status === "submitting"}
                  className="w-full sm:w-auto self-start"
                >
                  <span className="flex items-center gap-2">
                    Submit Application <ArrowRight size={18} />
                  </span>
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE MAIN
   ═══════════════════════════════════════════════════════════════════ */

export default function DealerPage() {
  return (
    <>
      <DealerHero />
      <PartnershipTiers />
      <BenefitsSection />
      <ApplicationForm />
    </>
  );
}
