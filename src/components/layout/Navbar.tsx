"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";

/* ── Navigation data ──────────────────────────────────────────────── */

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Industries", href: "/industries" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Gallery", href: "/gallery" },
  { label: "Track Order", href: "/track" },
] as const;

/* ── Component ────────────────────────────────────────────────────── */

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      setMobileOpen(false);
      setActiveHash(href);

      if (href.startsWith("#")) {
        e.preventDefault();
        const id = href.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      // Non-hash links (e.g. "/services") navigate normally
    },
    []
  );

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled
            ? "rgba(13, 21, 38, 0.85)"
            : "rgba(13, 21, 38, 0)",
        }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-[backdrop-filter] duration-300",
          scrolled && "backdrop-blur-md shadow-lg shadow-black/10"
        )}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-16 lg:h-[72px]">
          {/* ── Logo ──────────────────────────────────────────── */}
          <Link
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-baseline gap-1 select-none"
          >
            <span className="text-xl font-bold tracking-wider text-steel-400">
              MICROCUT
            </span>
            <span className="text-xl font-bold tracking-wider text-white">
              TECHNOLOGY
            </span>
          </Link>

          {/* ── Desktop links ─────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="relative px-3 py-2 text-sm font-medium text-steel-100/80 hover:text-white transition-colors"
              >
                {label}
                {activeHash === href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 inset-x-3 h-0.5 rounded-full bg-steel-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* ── CTA + hamburger ────────────────────────────────── */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <Button
                variant="accent"
                size="sm"
                onClick={() => {
                  const el = document.getElementById("contact");
                  el?.scrollIntoView({ behavior: "smooth" });
                  setActiveHash("#contact");
                }}
              >
                Get a Quote
              </Button>
            </div>

            <button
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden p-2 text-white hover:text-steel-300 transition-colors"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile drawer ─────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-navy-900/98 backdrop-blur-lg pt-20 px-6 flex flex-col gap-2 lg:hidden overflow-y-auto"
          >
            {navLinks.map(({ label, href }, i) => (
              <motion.a
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                className={cn(
                  "text-lg font-medium py-3 border-b border-steel-500/10 transition-colors",
                  activeHash === href
                    ? "text-steel-400"
                    : "text-steel-100/70 hover:text-white"
                )}
              >
                {label}
              </motion.a>
            ))}

            <div className="mt-6">
              <Button
                variant="accent"
                size="lg"
                className="w-full"
                onClick={() => {
                  setMobileOpen(false);
                  setActiveHash("#contact");
                  const el = document.getElementById("contact");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Get a Quote
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
