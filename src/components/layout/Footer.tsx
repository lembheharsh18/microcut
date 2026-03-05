"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";

/* ── Data ─────────────────────────────────────────────────────────── */

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const services = [
  "CNC Milling",
  "CNC Turning",
  "Surface Grinding",
  "Wire EDM",
  "Jig Boring",
  "Quality Inspection",
];

/* ── Animated link ────────────────────────────────────────────────── */

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      onClick={(e) => {
        if (href.startsWith("#")) {
          e.preventDefault();
          const id = href.replace("#", "");
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }
      }}
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="block text-sm text-steel-200/60 hover:text-steel-300 transition-colors py-1"
    >
      {children}
    </motion.a>
  );
}

/* ── Social icon button ───────────────────────────────────────────── */

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.15, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className="flex items-center justify-center w-9 h-9 rounded-lg bg-steel-500/10 text-steel-300/70 hover:text-steel-200 hover:bg-steel-500/20 transition-colors"
    >
      {children}
    </motion.a>
  );
}

/* ── Footer ───────────────────────────────────────────────────────── */

export function Footer() {
  return (
    <footer className="relative bg-navy-900 border-t border-steel-500/20">
      {/* Glowing top line */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-steel-500/50 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* ── Column 1: Company ────────────────────────────── */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="#home" className="inline-flex items-baseline gap-1 mb-4">
              <span className="text-lg font-bold tracking-wider text-steel-400">
                MICROCUT
              </span>
              <span className="text-lg font-bold tracking-wider text-white">
                TECHNOLOGY
              </span>
            </Link>
            <p className="text-sm text-steel-200/50 leading-relaxed max-w-xs">
              Precision CNC machining and manufacturing solutions. Delivering
              excellence in every component since inception.
            </p>
            <div className="flex gap-2 mt-5">
              <SocialIcon href="#" label="LinkedIn">
                <Linkedin size={16} />
              </SocialIcon>
              <SocialIcon href="#" label="YouTube">
                <Youtube size={16} />
              </SocialIcon>
            </div>
          </div>

          {/* ── Column 2: Quick Links ─────────────────────────── */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-0.5">
              {quickLinks.map(({ label, href }) => (
                <FooterLink key={href} href={href}>
                  {label}
                </FooterLink>
              ))}
            </nav>
          </div>

          {/* ── Column 3: Services ────────────────────────────── */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">
              Services
            </h4>
            <nav className="flex flex-col gap-0.5">
              {services.map((s) => (
                <FooterLink key={s} href="#services">
                  {s}
                </FooterLink>
              ))}
            </nav>
          </div>

          {/* ── Column 4: Contact ─────────────────────────────── */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">
              Contact
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-steel-200/60">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 shrink-0 text-steel-400/60" />
                <span>Pune, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="shrink-0 text-steel-400/60" />
                <a
                  href="tel:+919999999999"
                  className="hover:text-steel-300 transition-colors"
                >
                  +91 99999 99999
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="shrink-0 text-steel-400/60" />
                <a
                  href="mailto:info@microcuttech.com"
                  className="hover:text-steel-300 transition-colors"
                >
                  info@microcuttech.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────── */}
      <div className="border-t border-steel-500/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-steel-200/40">
          <span>
            &copy; 2025 Microcut Technology. All Rights Reserved.
          </span>
          <span>Pune, Maharashtra</span>
        </div>
      </div>
    </footer>
  );
}
