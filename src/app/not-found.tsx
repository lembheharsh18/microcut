"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        className="text-blue-600 mb-6"
      >
        <Settings size={64} />
      </motion.div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">404 - Page Not Found</h1>
      <p className="text-slate-600 mb-8 max-w-lg">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <Link href="/">
        <Button className="bg-slate-900 text-white hover:bg-slate-800">Return Home</Button>
      </Link>
    </div>
  );
}
