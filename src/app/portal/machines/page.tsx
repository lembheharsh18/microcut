"use client";

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Settings,
  X,
  Activity,
  Calendar,
  User,
  Wrench,
  Power,
  PowerOff,
  AlertTriangle,
  History,
  CheckCircle2,
  Filter
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";

/* ═══════════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════════ */

type MachineStatus = "AVAILABLE" | "IN_USE" | "MAINTENANCE" | "OFFLINE";

interface MaintenanceLog {
  id: string;
  date: string;
  workDone: string;
  technician: string;
  nextDue: string;
}

interface Machine {
  id: string;
  name: string;
  make: string;
  model: string;
  type: string;
  status: MachineStatus;
  assignedTo?: string;
  currentOrder?: string;
  lastMaintained: string;
  
  // Specs
  axisCount: number;
  maxDimensions: string;
  spindleSpeed: number;
  yearPurchased: number;
  nextServiceDate: string;
  
  maintenanceLogs?: MaintenanceLog[];
  utilizationOrders: number;
  utilizationHours: number;
}

const statusConfig: Record<MachineStatus, { label: string; border: string; bg: string; text: string; icon: any }> = {
  AVAILABLE: { label: "Available", border: "border-green-500/30", bg: "bg-green-500/10", text: "text-green-400", icon: CheckCircle2 },
  IN_USE: { label: "In Use", border: "border-blue-500/30", bg: "bg-blue-500/10", text: "text-blue-400", icon: Activity },
  MAINTENANCE: { label: "Maintenance", border: "border-orange-500/30", bg: "bg-orange-500/10", text: "text-orange-400", icon: Wrench },
  OFFLINE: { label: "Offline", border: "border-red-500/30", bg: "bg-red-500/10", text: "text-red-400", icon: PowerOff },
};

/* ═══════════════════════════════════════════════════════════════════
   MOCK DATA
   ═══════════════════════════════════════════════════════════════════ */

const mockMachines: Machine[] = [
  {
    id: "MAC-001", name: "Alpha Turner", make: "Tsugami", model: "B0205-III", type: "CNC Lathe", status: "IN_USE",
    assignedTo: "John Doe", currentOrder: "ORD-1042", lastMaintained: "2024-08-15",
    axisCount: 5, maxDimensions: "20x200 mm", spindleSpeed: 10000, yearPurchased: 2021, nextServiceDate: "2024-11-15",
    utilizationOrders: 1420, utilizationHours: 3500,
    maintenanceLogs: [ { id: "LOG-1", date: "2024-08-15", workDone: "Spindle bearing replaced", technician: "Mike S.", nextDue: "2024-11-15" } ]
  },
  {
    id: "MAC-002", name: "Titan Miller", make: "Haas", model: "VF-2", type: "VMC", status: "AVAILABLE",
    lastMaintained: "2024-09-01",
    axisCount: 3, maxDimensions: "762x406x508 mm", spindleSpeed: 8100, yearPurchased: 2019, nextServiceDate: "2025-01-01",
    utilizationOrders: 3200, utilizationHours: 8900, maintenanceLogs: []
  },
  {
    id: "MAC-003", name: "Precision Grinder", make: "Chevalier", model: "FSG-1224", type: "Surface Grinder", status: "MAINTENANCE",
    lastMaintained: "2024-09-20",
    axisCount: 2, maxDimensions: "300x600 mm", spindleSpeed: 3600, yearPurchased: 2015, nextServiceDate: "2024-10-20",
    utilizationOrders: 512, utilizationHours: 1200, maintenanceLogs: []
  },
  {
    id: "MAC-004", name: "Beta Turner", make: "Doosan", model: "ST-20", type: "CNC Lathe", status: "OFFLINE",
    lastMaintained: "2024-01-10",
    axisCount: 2, maxDimensions: "381x533 mm", spindleSpeed: 4000, yearPurchased: 2017, nextServiceDate: "2024-07-10",
    utilizationOrders: 4100, utilizationHours: 10500, maintenanceLogs: []
  }
];

/* ═══════════════════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════════════════ */

function AddMachineModal({ isOpen, onClose, onSuccess }: { isOpen: boolean, onClose: () => void, onSuccess: () => void }) {
  const { token } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const form = e.target as HTMLFormElement;
      const data = Object.fromEntries(new FormData(form));
      await axios.post("/api/portal/machines", data, { headers: { Authorization: `Bearer ${token}` } });
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      onSuccess(); // Fallback for local demo
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm">
        <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-navy-900 border border-steel-500/20 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
          <div className="px-6 py-4 border-b border-steel-500/10 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2"><Plus size={20} className="text-steel-400" /> Register Machine</h2>
            <button onClick={onClose} className="p-1 text-steel-200/60 hover:text-white rounded"><X size={20} /></button>
          </div>
          <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
            <form id="macForm" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs text-steel-400 mb-1">Machine Name</label><input required name="name" type="text" className="w-full bg-navy-950/50 border border-steel-500/20 rounded-lg px-3 py-2 text-white outline-none focus:border-steel-400" /></div>
                <div>
                  <label className="block text-xs text-steel-400 mb-1">Machine Type</label>
                  <select required name="type" className="w-full bg-navy-950/50 border border-steel-500/20 rounded-lg px-3 py-2 text-white outline-none focus:border-steel-400">
                    <option value="CNC Lathe">CNC Lathe</option>
                    <option value="VMC">VMC</option>
                    <option value="Surface Grinder">Surface Grinder</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div><label className="block text-xs text-steel-400 mb-1">Make / Brand</label><input required name="make" type="text" className="w-full bg-navy-950/50 border border-steel-500/20 rounded-lg px-3 py-2 text-white outline-none focus:border-steel-400" /></div>
                <div><label className="block text-xs text-steel-400 mb-1">Model Number</label><input required name="model" type="text" className="w-full bg-navy-950/50 border border-steel-500/20 rounded-lg px-3 py-2 text-white outline-none focus:border-steel-400" /></div>
                
                <div><label className="block text-xs text-steel-400 mb-1">Axis Count</label><input required name="axisCount" type="number" min="1" className="w-full bg-navy-950/50 border border-steel-500/20 rounded-lg px-3 py-2 text-white outline-none focus:border-steel-400" /></div>
                <div><label className="block text-xs text-steel-400 mb-1">Max Dimensions (LxWxH)</label><input required name="maxDimensions" type="text" placeholder="e.g. 100x100x100 mm" className="w-full bg-navy-950/50 border border-steel-500/20 rounded-lg px-3 py-2 text-white outline-none focus:border-steel-400" /></div>
                <div><label className="block text-xs text-steel-400 mb-1">Spindle Speed (RPM)</label><input required name="spindleSpeed" type="number" className="w-full bg-navy-950/50 border border-steel-500/20 rounded-lg px-3 py-2 text-white outline-none focus:border-steel-400" /></div>
                <div><label className="block text-xs text-steel-400 mb-1">Year Purchased</label><input required name="yearPurchased" type="number" min="1950" className="w-full bg-navy-950/50 border border-steel-500/20 rounded-lg px-3 py-2 text-white outline-none focus:border-steel-400" /></div>
                
                <div><label className="block text-xs text-steel-400 mb-1">Last Service Date</label><input required name="lastMaintained" type="date" className="w-full bg-navy-950/50 border border-steel-500/20 rounded-lg px-3 py-2 text-white outline-none focus:border-steel-400 [color-scheme:dark]" /></div>
                <div><label className="block text-xs text-steel-400 mb-1">Next Service Date</label><input required name="nextServiceDate" type="date" className="w-full bg-navy-950/50 border border-steel-500/20 rounded-lg px-3 py-2 text-white outline-none focus:border-steel-400 [color-scheme:dark]" /></div>
              </div>
            </form>
          </div>
          <div className="px-6 py-4 border-t border-steel-500/10 flex justify-end gap-3">
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button variant="primary" type="submit" form="macForm" loading={isSubmitting}>Register Machine</Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function MachineDetailDrawer({ machine, onClose }: { machine: Machine | null, onClose: () => void }) {
  if (!machine) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-navy-950/60 backdrop-blur-sm flex justify-end"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="w-full max-w-md h-full bg-navy-900 border-l border-steel-500/20 shadow-2xl flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6 border-b border-steel-500/10 flex items-center justify-between sticky top-0 bg-navy-900 z-10">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">{machine.name}</h2>
              <p className="text-sm text-steel-400">{machine.id} • {machine.type}</p>
            </div>
            <button onClick={onClose} className="p-2 bg-navy-800 rounded-full text-steel-400 hover:text-white transition-colors"><X size={18} /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
            
            {/* Status & Utilization */}
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-navy-800/40 p-4 rounded-xl border border-steel-500/10">
                 <p className="text-xs text-steel-400 mb-1">Status</p>
                 <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md border ${statusConfig[machine.status].bg} ${statusConfig[machine.status].text} ${statusConfig[machine.status].border}`}>
                   {React.createElement(statusConfig[machine.status].icon, { size: 12 })}
                   {statusConfig[machine.status].label}
                 </span>
               </div>
               <div className="bg-navy-800/40 p-4 rounded-xl border border-steel-500/10">
                 <p className="text-xs text-steel-400 mb-1">Current Assignee</p>
                 <p className="text-sm font-medium text-white">{machine.assignedTo || "None"}</p>
               </div>
               <div className="bg-navy-800/40 p-4 rounded-xl border border-steel-500/10">
                 <p className="text-xs text-steel-400 mb-1">Total Orders</p>
                 <p className="text-lg font-bold text-white">{machine.utilizationOrders.toLocaleString()}</p>
               </div>
               <div className="bg-navy-800/40 p-4 rounded-xl border border-steel-500/10">
                 <p className="text-xs text-steel-400 mb-1">Operation Hours</p>
                 <p className="text-lg font-bold text-white">{machine.utilizationHours.toLocaleString()}h</p>
               </div>
            </div>

            {/* Specifications */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-steel-400 uppercase tracking-wider flex items-center gap-2 border-b border-steel-500/10 pb-2">
                <Settings size={16} /> Technical Specifications
              </h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <div><span className="text-steel-500 block text-xs">Make</span><span className="text-steel-100 font-medium">{machine.make}</span></div>
                <div><span className="text-steel-500 block text-xs">Model</span><span className="text-steel-100 font-medium">{machine.model}</span></div>
                <div><span className="text-steel-500 block text-xs">Max Dimensions</span><span className="text-steel-100 font-medium">{machine.maxDimensions}</span></div>
                <div><span className="text-steel-500 block text-xs">Spindle Speed</span><span className="text-steel-100 font-medium">{machine.spindleSpeed} RPM</span></div>
                <div><span className="text-steel-500 block text-xs">Axis Count</span><span className="text-steel-100 font-medium">{machine.axisCount}-Axis</span></div>
                <div><span className="text-steel-500 block text-xs">Year Purchased</span><span className="text-steel-100 font-medium">{machine.yearPurchased}</span></div>
              </div>
            </div>

            {/* Maintenance */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-steel-500/10 pb-2">
                <h3 className="text-sm font-bold text-steel-400 uppercase tracking-wider flex items-center gap-2">
                  <History size={16} /> Maintenance Records
                </h3>
                <button className="text-xs text-steel-300 hover:text-white flex items-center gap-1"><Plus size={12}/> Add Log</button>
              </div>
              
              <div className="space-y-3">
                {(!machine.maintenanceLogs || machine.maintenanceLogs.length === 0) ? (
                  <p className="text-sm text-steel-500 italic p-4 text-center border border-dashed border-steel-500/20 rounded-lg">No maintenance logs found.</p>
                ) : (
                  machine.maintenanceLogs.map(log => (
                    <div key={log.id} className="bg-navy-950/50 border border-steel-500/15 rounded-lg p-3 text-sm relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-steel-500/30 before:rounded-l-lg overflow-hidden">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold text-steel-200">{log.workDone}</span>
                        <span className="text-[10px] text-steel-500 bg-navy-900 px-1.5 py-0.5 rounded">{log.date}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs mt-2">
                        <span className="text-steel-400 flex items-center gap-1"><Wrench size={12}/> {log.technician}</span>
                        <span className="text-steel-400">Next: {log.nextDue}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE MAIN
   ═══════════════════════════════════════════════════════════════════ */

export default function MachineManagementPage() {
  const { token, user } = useAuth();
  const [machines, setMachines] = useState<Machine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<MachineStatus | "ALL">("ALL");
  const [search, setSearch] = useState("");
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);

  const fetchMachines = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const res = await axios.get<Machine[]>("/api/portal/machines", { headers: { Authorization: `Bearer ${token}` }});
      setMachines(res.data);
    } catch (err) {
      console.warn("API unavailable, using mock dat for machines");
      setMachines(mockMachines);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchMachines(); }, [token]);

  const handleStatusChange = async (machineId: string, newStatus: MachineStatus) => {
    if ((newStatus === "MAINTENANCE" || newStatus === "OFFLINE") && 
        !confirm(`Are you sure you want to set this machine to ${newStatus}?`)) {
      return;
    }
    
    // Optimistic Update
    setMachines(prev => prev.map(m => m.id === machineId ? { ...m, status: newStatus } : m));
    
    try {
      await axios.patch(`/api/portal/machines/${machineId}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error("Failed to update status", err);
      // Revert if error
      fetchMachines();
    }
  };

  const filteredMachines = useMemo(() => {
    return machines.filter(m => {
      const matchesFilter = filter === "ALL" || m.status === filter;
      const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || 
                            m.id.toLowerCase().includes(search.toLowerCase()) ||
                            m.make.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [machines, filter, search]);

  if (!user) return null;
  const canManage = user.role === "ADMIN" || user.role === "MANAGER";

  return (
    <div className="h-full flex flex-col max-w-[1600px] mx-auto space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Machine Management</h1>
          <p className="text-sm text-steel-200/50 mt-1">Monitor operational status and maintenance schedules</p>
        </div>
        {canManage && (
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus size={16} /> Register Machine
          </Button>
        )}
      </div>

      {/* FILTER BAR */}
      <div className="bg-navy-800/40 p-2 md:p-3 rounded-xl border border-steel-500/15 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-steel-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search ID, Name, or Make..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-navy-900 border border-steel-500/30 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-steel-400 outline-none"
          />
        </div>
        <div className="flex overflow-x-auto w-full md:w-auto bg-navy-900 border border-steel-500/20 rounded-lg p-1 custom-scrollbar">
          {(["ALL", "AVAILABLE", "IN_USE", "MAINTENANCE", "OFFLINE"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as MachineStatus | "ALL")}
              className={`flex-shrink-0 px-4 py-1.5 rounded text-xs font-semibold tracking-wide transition-colors ${
                filter === f ? "bg-steel-500/20 text-steel-100" : "text-steel-500 hover:text-steel-300"
              }`}
            >
              {f.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="h-64 bg-navy-800/30 rounded-2xl border border-steel-500/10 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMachines.map(machine => {
            const conf = statusConfig[machine.status];
            const StatusIcon = conf.icon;
            
            return (
              <motion.div 
                key={machine.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -4 }}
                className="bg-navy-800/40 border border-steel-500/15 rounded-2xl shadow-lg shadow-navy-950/50 flex flex-col overflow-hidden group cursor-pointer"
                onClick={() => setSelectedMachine(machine)}
              >
                {/* Card Header */}
                <div className="p-5 border-b border-steel-500/10 relative">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-mono font-bold bg-navy-900 border border-steel-500/20 text-steel-400 px-2 py-0.5 rounded">
                      {machine.id}
                    </span>
                    
                    {/* Status Dropdown (Stop propagation so click doesn't open drawer) */}
                    <div className="relative group/dropdown" onClick={e => e.stopPropagation()}>
                      <button className={`flex items-center gap-1.5 px-2 py-1 text-[10px] uppercase font-bold rounded border transition-colors ${conf.bg} ${conf.text} ${conf.border}`}>
                        <StatusIcon size={10} /> {conf.label}
                      </button>
                      
                      {canManage && (
                        <div className="absolute right-0 mt-1 w-36 bg-navy-900 border border-steel-500/20 rounded-lg shadow-xl opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all z-10 py-1">
                          {(Object.keys(statusConfig) as MachineStatus[]).map(st => (
                            <button 
                              key={st} 
                              onClick={() => handleStatusChange(machine.id, st)}
                              className="w-full text-left px-3 py-1.5 text-xs text-steel-300 hover:bg-steel-500/10 hover:text-white"
                            >
                              Set {statusConfig[st].label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white">{machine.name}</h3>
                  <p className="text-xs text-steel-400">{machine.make} {machine.model}</p>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-navy-900 border border-steel-500/20 flex items-center justify-center text-steel-400">
                      <User size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] text-steel-500 uppercase tracking-wider font-semibold">Current Operator</p>
                      <p className="text-sm font-medium text-steel-200">{machine.assignedTo || "Unassigned"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-navy-900 border border-steel-500/20 flex items-center justify-center text-steel-400">
                      <Activity size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] text-steel-500 uppercase tracking-wider font-semibold">Active Order</p>
                      <p className="text-sm font-medium text-steel-200">{machine.currentOrder || "None"}</p>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 py-3 border-t border-steel-500/10 bg-navy-900/30 flex justify-between items-center text-xs">
                  <span className="text-steel-500 flex items-center gap-1.5">
                    <Wrench size={12} className={new Date(machine.nextServiceDate) < new Date() ? "text-red-400" : ""} /> 
                    Serviced: {machine.lastMaintained}
                  </span>
                  {new Date(machine.nextServiceDate) < new Date() && (
                    <span className="text-red-400 font-medium">Service Due</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Components */}
      <AddMachineModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSuccess={fetchMachines} />
      <MachineDetailDrawer machine={selectedMachine} onClose={() => setSelectedMachine(null)} />
    </div>
  );
}
