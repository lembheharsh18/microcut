"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SearchIcon, AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface StatusEntry {
  fromStatus: string;
  toStatus: string;
  changedAt: string;
}

interface OrderTracking {
  orderId: string;
  partName: string;
  clientName: string;
  status: string;
  createdAt: string;
  statusHistory: StatusEntry[];
}

const ORDER_STAGES = [
  "RECEIVED",
  "IN_QUEUE",
  "IN_PROGRESS",
  "QUALITY_CHECK",
  "DISPATCHED"
];

const DISPLAY_STAGES: Record<string, string> = {
  "RECEIVED": "Received",
  "IN_QUEUE": "In Queue",
  "IN_PROGRESS": "In Progress",
  "QUALITY_CHECK": "Quality Check",
  "DISPATCHED": "Dispatched"
};

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trackingData, setTrackingData] = useState<OrderTracking | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setIsLoading(true);
    setError(null);
    setTrackingData(null);

    try {
      const response = await fetch(`/api/public/track/${orderId.trim()}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Order not found. Please check your tracking ID.");
        }
        throw new Error("Failed to fetch order details. Please try again.");
      }
      
      const data = await response.json();
      setTrackingData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const currentStageIndex = trackingData ? ORDER_STAGES.indexOf(trackingData.status) : -1;

  return (
    <div className="min-h-screen bg-navy-950 pt-32 pb-24 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1b2735_1px,transparent_1px),linear-gradient(to_bottom,#1b2735_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white capitalize-first"
          >
            Track Your Order
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-steel-200/70 text-lg max-w-xl mx-auto"
          >
            Enter your Order ID below to get real-time status updates on your manufacturing progress.
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSearch} className="relative flex items-center group">
            <div className="absolute left-6 text-steel-400 group-focus-within:text-steel-300 transition-colors">
              <SearchIcon size={20} />
            </div>
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. ORD-1001"
              className="w-full bg-navy-900/50 backdrop-blur-md border md:h-16 h-14 border-steel-500/20 rounded-2xl pl-14 pr-36 text-lg text-white placeholder-steel-200/30 focus:outline-none focus:border-steel-400 focus:ring-1 focus:ring-steel-400 transition-all shadow-xl"
            />
            <div className="absolute right-2">
              <Button 
                type="submit" 
                variant="primary" 
                className="md:h-12 h-10 px-6 rounded-xl relative"
                disabled={isLoading || !orderId.trim()}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white/100 rounded-full animate-spin"></span>
                    Searching...
                  </span>
                ) : (
                  "Track"
                )}
              </Button>
            </div>
          </form>
          
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 flex items-center gap-2 text-red-400 bg-red-500/10 px-4 py-3 rounded-lg border border-red-500/20"
              >
                <AlertCircle size={18} />
                <p className="text-sm">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Tracking Results Area */}
        <AnimatePresence mode="wait">
          {trackingData && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Order summary card */}
              <div className="bg-navy-900/40 border border-steel-500/15 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Clock size={120} />
                </div>
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <h2 className="text-sm font-bold text-steel-400 tracking-widest uppercase mb-1">
                      Order Details
                    </h2>
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {trackingData.partName}
                    </h3>
                    <p className="text-steel-200/60 font-mono">
                      {trackingData.orderId} • {trackingData.clientName}
                    </p>
                  </div>
                  
                  <div className="text-left md:text-right">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-steel-500/20 text-steel-300 rounded-full text-sm font-medium border border-steel-500/30">
                      <Clock size={14} /> Created {new Date(trackingData.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Stepper */}
              <div className="bg-navy-900/40 border border-steel-500/15 rounded-2xl p-6 md:p-10 backdrop-blur-sm shadow-2xl">
                <div className="relative">
                  {/* Connecting Line */}
                  <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-steel-500/20 md:left-0 md:right-0 md:top-[15px] md:bottom-auto md:h-0.5 md:w-full"></div>
                  
                  {/* Active Line (animated) */}
                  <motion.div 
                    initial={{ height: 0, width: 0 }}
                    animate={{ 
                      height: { md: '0.125rem', default: `${(currentStageIndex / (ORDER_STAGES.length - 1)) * 100}%` }, 
                      width: { md: `${(currentStageIndex / (ORDER_STAGES.length - 1)) * 100}%`, default: '0.125rem' } 
                    }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="absolute left-[15px] top-4 w-0.5 bg-green-500 md:left-0 md:top-[15px] md:h-0.5 md:w-full z-0 block md:hidden"
                  />
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStageIndex / (ORDER_STAGES.length - 1)) * 100}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="absolute left-0 top-[15px] h-0.5 bg-green-500 z-0 hidden md:block"
                  />

                  <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4 relative z-10">
                    {ORDER_STAGES.map((stage, idx) => {
                      const isCompleted = idx < currentStageIndex;
                      const isCurrent = idx === currentStageIndex;
                      
                      // Find timestamp for this stage if available
                      const entryForStage = trackingData.statusHistory.find(h => h.toStatus === stage);
                      // Stage 'RECEIVED' might just use createdAt
                      let timeString = "";
                      if (stage === "RECEIVED") {
                        timeString = new Date(trackingData.createdAt).toLocaleDateString();
                      } else if (entryForStage) {
                        timeString = new Date(entryForStage.changedAt).toLocaleDateString();
                      }

                      return (
                        <div key={stage} className="flex md:flex-col items-center gap-4 md:gap-3 text-left md:text-center w-full group">
                          
                          {/* Circle Icon */}
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500
                            ${isCompleted ? 'bg-green-500 border-green-500 text-navy-950 shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 
                              isCurrent ? 'bg-navy-900 border-green-500 text-green-500 ring-4 ring-green-500/20' : 
                              'bg-navy-900 border-steel-500/30 text-steel-500/50'}`}>
                            {isCompleted ? (
                              <CheckCircle2 size={16} className="text-navy-950" strokeWidth={3} />
                            ) : (
                              <div className={`w-2.5 h-2.5 rounded-full ${isCurrent ? 'bg-green-500 animate-pulse' : 'bg-steel-500/30'}`} />
                            )}
                          </div>

                          {/* Text Info */}
                          <div className={`flex flex-col ${isCurrent ? 'text-white' : isCompleted ? 'text-steel-200' : 'text-steel-200/40'}`}>
                            <span className="font-bold tracking-tight">
                              {DISPLAY_STAGES[stage]}
                            </span>
                            <span className="text-xs uppercase font-mono mt-0.5 opacity-60">
                              {timeString || "Pending"}
                            </span>
                          </div>
                          
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Status History Logs (Optional detailed view) */}
              {trackingData.statusHistory.length > 0 && (
                <div className="bg-navy-900/40 border border-steel-500/15 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-2xl">
                   <h3 className="text-lg font-bold text-white mb-6 border-b border-steel-500/10 pb-4">Detailed Timeline</h3>
                   <div className="space-y-4">
                     {trackingData.statusHistory.slice().reverse().map((entry, i) => (
                       <div key={i} className="flex gap-4">
                         <div className="w-12 text-right">
                           <div className="text-xs font-mono text-steel-200/50">
                             {new Date(entry.changedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                           </div>
                           <div className="text-[10px] text-steel-200/30">
                             {new Date(entry.changedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                           </div>
                         </div>
                         <div className="w-px bg-steel-500/20 relative">
                           <div className="absolute top-1 -left-[3px] w-1.5 h-1.5 rounded-full bg-steel-400"></div>
                         </div>
                         <div className="pb-4 border-b border-steel-500/10 flex-1">
                           <p className="text-sm font-medium text-steel-200">
                             Status updated to <span className="text-white font-bold">{DISPLAY_STAGES[entry.toStatus] || entry.toStatus}</span>
                           </p>
                           {entry.fromStatus && (
                             <p className="text-xs text-steel-200/50 mt-1">
                               Previous: {DISPLAY_STAGES[entry.fromStatus] || entry.fromStatus}
                             </p>
                           )}
                         </div>
                       </div>
                     ))}
                   </div>
                </div>
              )}

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
