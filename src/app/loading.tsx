"use client";
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <motion.div 
        animate={{ opacity: [0.5, 1, 0.5], scale: [0.98, 1, 0.98] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="text-slate-300 text-3xl font-bold tracking-widest"
      >
        MICROC<span className="text-blue-500">U</span>T
      </motion.div>
    </div>
  );
}
