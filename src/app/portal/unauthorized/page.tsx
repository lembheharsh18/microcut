"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-md p-8 bg-navy-800/40 rounded-2xl border border-steel-500/10 shadow-xl"
      >
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-red-400">
          <ShieldAlert size={40} strokeWidth={1.5} />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-3">
          Access Restricted
        </h1>
        
        <p className="text-steel-200/60 mb-8 leading-relaxed">
          You don&apos;t have the necessary role or permissions to view this page. 
          If you believe this is an error, please contact your system administrator.
        </p>

        <Link href="/portal/dashboard" tabIndex={-1}>
          <Button variant="secondary" className="w-full sm:w-auto">
            <ArrowLeft size={18} className="mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
