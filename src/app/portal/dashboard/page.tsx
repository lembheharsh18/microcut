"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardList,
  Cpu,
  Wrench,
  AlertOctagon,
  Eye,
  Edit,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  PlayCircle
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";

/* ═══════════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════════ */

interface DashboardStats {
  activeOrders: number;
  machinesAvailable: number;
  totalMachines: number;
  machinesInMaintenance: number;
  overdueOrders: number;
}

interface Order {
  id: string;
  client: string;
  partName: string;
  assignedTo: string | null;
  machine: string | null;
  status: "In Queue" | "In Progress" | "Quality Check" | "Completed" | "Overdue";
  deadline: string;
}

interface Machine {
  id: string;
  name: string;
  status: "Available" | "In Use" | "Maintenance" | "Offline";
  operator: string | null;
  currentOrder: string | null;
}

interface OperatorDashboardData {
  myOrders: Order[];
  myMachine: Machine | null;
}

/* ═══════════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════════ */

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

const statusColors: Record<Order["status"], string> = {
  "In Queue": "bg-steel-500/20 text-steel-300 border-steel-500/30",
  "In Progress": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Quality Check": "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Completed: "bg-green-500/20 text-green-300 border-green-500/30",
  Overdue: "bg-red-500/20 text-red-400 border-red-500/30",
};

const machineStatusColors: Record<Machine["status"], string> = {
  Available: "bg-green-500/20 text-green-400 border-green-500/30",
  "In Use": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Maintenance: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Offline: "bg-red-500/20 text-red-400 border-red-500/30",
};

/* ═══════════════════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════════════════ */

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 bg-navy-800/50 rounded-xl animate-pulse border border-steel-500/10"></div>
        ))}
      </div>
      <div className="h-64 bg-navy-800/50 rounded-xl animate-pulse border border-steel-500/10"></div>
      <div className="h-64 bg-navy-800/50 rounded-xl animate-pulse border border-steel-500/10"></div>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-navy-800/40 rounded-2xl border border-red-500/20 text-center min-h-[400px]">
      <AlertCircle className="w-16 h-16 text-red-400 mb-4 opacity-80" />
      <h3 className="text-xl font-bold text-white mb-2">Could not load data</h3>
      <p className="text-steel-200/60 mb-6">
        There was a problem connecting to the server. Please try again.
      </p>
      <Button variant="secondary" onClick={onRetry} className="border-steel-500/30 text-white">
        <RefreshCw className="w-4 h-4 mr-2" /> Retry
      </Button>
    </div>
  );
}

/* ── MANAGER DASHBOARD ────────────────────────────────────────────── */

function ManagerDashboard({
  stats,
  orders,
  machines,
}: {
  stats: DashboardStats;
  orders: Order[];
  machines: Machine[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* STATS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-navy-800/40 border border-steel-500/15 rounded-xl p-5 flex items-center shadow-lg">
          <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mr-4">
            <ClipboardList className="text-blue-400" size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-steel-200/60">Active Orders</p>
            <h4 className="text-2xl font-bold text-white">{stats.activeOrders}</h4>
          </div>
        </div>

        <div className="bg-navy-800/40 border border-steel-500/15 rounded-xl p-5 flex items-center shadow-lg">
          <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mr-4">
            <Cpu className="text-green-400" size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-steel-200/60">Machines Available</p>
            <h4 className="text-2xl font-bold text-white">
              {stats.machinesAvailable} <span className="text-steel-400 text-sm font-medium">/ {stats.totalMachines}</span>
            </h4>
          </div>
        </div>

        <div className="bg-navy-800/40 border border-steel-500/15 rounded-xl p-5 flex items-center shadow-lg">
          <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mr-4">
            <Wrench className="text-orange-400" size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-steel-200/60">In Maintenance</p>
            <h4 className="text-2xl font-bold text-white">{stats.machinesInMaintenance}</h4>
          </div>
        </div>

        <div className="bg-navy-800/40 border border-steel-500/15 rounded-xl p-5 flex items-center shadow-lg relative overflow-hidden">
          <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mr-4 relative">
            {stats.overdueOrders > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75" />
            )}
            {stats.overdueOrders > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            )}
            <AlertOctagon className="text-red-400" size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-steel-200/60">Overdue Orders</p>
            <h4 className="text-2xl font-bold text-white">{stats.overdueOrders}</h4>
          </div>
        </div>
      </div>

      {/* RECENT ORDERS TABLE */}
      <div className="bg-navy-800/40 border border-steel-500/15 rounded-xl shadow-lg overflow-hidden flex flex-col">
        <div className="p-5 border-b border-steel-500/10 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Recent Orders</h3>
          <Link
            href="/portal/orders"
            className="text-sm text-steel-400 hover:text-steel-300 font-medium flex items-center gap-1 transition-colors"
          >
            View All Orders <ArrowRight size={14} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-steel-100">
            <thead className="bg-navy-900/50 text-steel-200/60 text-xs uppercase tracking-wide">
              <tr>
                <th className="px-5 py-3 font-medium">Order ID</th>
                <th className="px-5 py-3 font-medium">Client</th>
                <th className="px-5 py-3 font-medium leading-none">Part Name</th>
                <th className="px-5 py-3 font-medium">Assigned To</th>
                <th className="px-5 py-3 font-medium">Machine</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Deadline</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-steel-500/10">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-8 text-center text-steel-200/50">
                    No recent orders found.
                  </td>
                </tr>
              ) : (
                orders.map((o) => (
                  <tr key={o.id} className="hover:bg-steel-500/5 transition-colors group">
                    <td className="px-5 py-3 font-medium text-white">{o.id}</td>
                    <td className="px-5 py-3">{o.client}</td>
                    <td className="px-5 py-3">{o.partName}</td>
                    <td className="px-5 py-3 text-steel-200/80">{o.assignedTo || "—"}</td>
                    <td className="px-5 py-3 text-steel-200/80">{o.machine || "—"}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs border ${statusColors[o.status]}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">{o.deadline}</td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-steel-400 hover:text-white rounded-md hover:bg-steel-500/20 transition-colors" title="View">
                          <Eye size={16} />
                        </button>
                        <button className="p-1.5 text-blue-400 hover:text-blue-300 rounded-md hover:bg-blue-500/20 transition-colors" title="Edit">
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MACHINE STATUS GRID */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Machine Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {machines.map((m) => (
            <div key={m.id} className="bg-navy-800/40 border border-steel-500/15 rounded-xl p-5 shadow-lg flex flex-col hover:border-steel-500/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-white mb-1">{m.name}</h4>
                  <p className="text-xs text-steel-200/60 uppercase tracking-wider">{m.id}</p>
                </div>
                <span className={`inline-flex px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${machineStatusColors[m.status]}`}>
                  {m.status}
                </span>
              </div>
              <div className="mt-auto space-y-2 text-sm">
                <div className="flex justify-between border-b border-steel-500/10 pb-2">
                  <span className="text-steel-200/50">Operator</span>
                  <span className="font-medium text-steel-100">{m.operator || "Unassigned"}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-steel-200/50">Current Order</span>
                  <span className="font-medium text-steel-100">{m.currentOrder || "None"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── OPERATOR DASHBOARD ───────────────────────────────────────────── */

function OperatorDashboard({ data }: { data: OperatorDashboardData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: My Assigned Orders */}
        <div className="lg:col-span-2">
          <div className="bg-navy-800/40 border border-steel-500/15 rounded-xl shadow-lg overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-steel-500/10">
              <h3 className="text-lg font-bold text-white">My Assigned Orders</h3>
            </div>
            <div className="overflow-x-auto p-2">
              <table className="w-full text-left text-sm text-steel-100">
                <thead className="bg-navy-900/50 text-steel-200/60 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="px-4 py-3 font-medium">Order / Part Name</th>
                    <th className="px-4 py-3 font-medium">Deadline</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-steel-500/10">
                  {data.myOrders.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-steel-200/50">
                        No assigned orders right now.
                      </td>
                    </tr>
                  ) : (
                    data.myOrders.map((o) => (
                      <tr key={o.id} className="hover:bg-steel-500/5 transition-colors">
                        <td className="px-4 py-3">
                          <p className="font-bold text-white mb-0.5">{o.partName}</p>
                          <p className="text-xs text-steel-200/60">{o.id} • {o.client}</p>
                        </td>
                        <td className="px-4 py-3 text-steel-200/80">{o.deadline}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs border ${statusColors[o.status]}`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="secondary" size="sm" className="h-8 py-0">
                            Update Status
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Col: My Machine */}
        <div className="lg:col-span-1">
          <div className="bg-navy-800/40 border border-steel-500/15 rounded-xl shadow-lg p-5">
            <h3 className="text-lg font-bold text-white mb-4">My Machine Today</h3>
            {data.myMachine ? (
              <div className="p-4 bg-navy-900/50 border border-steel-500/20 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-steel-500/20 rounded-lg flex items-center justify-center text-steel-300">
                    <Cpu size={24} />
                  </div>
                  <span className={`inline-flex px-2 py-1 rounded text-xs font-bold uppercase tracking-wider border ${machineStatusColors[data.myMachine.status]}`}>
                    {data.myMachine.status}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white mb-1">{data.myMachine.name}</h4>
                <p className="text-sm text-steel-200/60 font-mono mb-4">{data.myMachine.id}</p>
                
                <div className="space-y-2 border-t border-steel-500/10 pt-4 text-sm mt-4">
                  <div className="flex justify-between">
                    <span className="text-steel-200/50">Current Order</span>
                    <span className="font-medium text-white">{data.myMachine.currentOrder || "None"}</span>
                  </div>
                  <div className="pt-4">
                     <Button variant={data.myMachine.status === "In Use" ? "secondary" : "primary"} className="w-full flex gap-2">
                        {data.myMachine.status === "In Use" ? (
                          <>Pause Machine</>
                        ) : (
                          <><PlayCircle size={16}/> Start Operating</>
                        )}
                     </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center border border-dashed border-steel-500/30 rounded-lg bg-navy-900/30 text-steel-200/60">
                You are not assigned to any machine today.
              </div>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE MAIN
   ═══════════════════════════════════════════════════════════════════ */

export default function DashboardPage() {
  const { user, token } = useAuth();
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // States for Manager
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);

  // States for Operator
  const [operatorData, setOperatorData] = useState<OperatorDashboardData | null>(null);

  const fetchDashboardData = useCallback(async () => {
    if (!token || !user) return;
    
    setError(false);
    
    try {
      const isManager = user.role === "ADMIN" || user.role === "MANAGER";
      
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      if (isManager) {
        const [statsRes, ordersRes, machinesRes] = await Promise.all([
          axios.get<DashboardStats>("/api/portal/dashboard/stats", config),
          axios.get<Order[]>("/api/portal/orders/recent", config),
          axios.get<Machine[]>("/api/portal/machines", config),
        ]);
        setStats(statsRes.data);
        setOrders(ordersRes.data);
        setMachines(machinesRes.data);
      } else {
        const res = await axios.get<OperatorDashboardData>("/api/portal/operator/dashboard", config);
        setOperatorData(res.data);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      // Because we may not have the Spring Boot backend running locally, we show the explicit error state.
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [token, user]);

  useEffect(() => {
    fetchDashboardData();

    // Auto-refresh every 60 seconds
    const intervalId = setInterval(() => {
      fetchDashboardData();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [fetchDashboardData]);

  if (!user) return null; // Let the layout protect it

  const isManager = user.role === "ADMIN" || user.role === "MANAGER";

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-steel-500/10 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {getGreeting()}, <span className="text-steel-400">{user.name.split(" ")[0]}</span>
          </h1>
          <p className="text-steel-200/50 mt-1 capitalize-first">
            {formatDate(new Date())}
          </p>
        </div>
        
        {!isLoading && !error && (
          <div className="flex items-center text-xs text-steel-200/40 gap-1.5 mt-auto bg-steel-500/5 px-3 py-1.5 rounded-full border border-steel-500/10">
            <RefreshCw size={12} className={isLoading ? "animate-spin" : ""} />
            Auto-refreshes every 60s
          </div>
        )}
      </div>

      {/* CONTENT */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : error ? (
        <ErrorState onRetry={() => { setIsLoading(true); fetchDashboardData(); }} />
      ) : isManager && stats ? (
        <ManagerDashboard stats={stats} orders={orders} machines={machines} />
      ) : operatorData ? (
        <OperatorDashboard data={operatorData} />
      ) : null}
    </div>
  );
}
