"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Phone } from 'lucide-react';
import Link from 'next/link';

export default function FloatingElements() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center gap-4 z-50">
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <Link
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="p-4 bg-green-500 text-white rounded-full shadow-xl hover:bg-green-600 transition cursor-pointer"
          aria-label="Contact on WhatsApp"
        >
          <Phone size={24} fill="currentColor" />
        </motion.div>
      </Link>
    </div>
  );
}
