"use client";

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  X,
  Mail,
  Phone,
  Briefcase,
  CheckCircle2,
  CalendarDays,
  User,
  MoreVertical,
  ShieldAlert
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";

/* ═══════════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════════ */

type Role = "ADMIN" | "MANAGER" | "OPERATOR" | "QC_INSPECTOR" | "HR";
type Shift = "Morning" | "Evening" | "Night";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  skills: string[];
  shift: Shift;
  joinDate: string;
  status: "ACTIVE" | "ON_LEAVE";
  currentOrder?: string | null;
  avatarUrl?: string;
  performanceScore?: number;
}

const roleColors: Record<Role, { bg: string; text: string; border: string }> = {
  ADMIN: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/30" },
  MANAGER: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/30" },
  OPERATOR: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
  QC_INSPECTOR: { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/30" },
  HR: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30" },
};

/* ═══════════════════════════════════════════════════════════════════
   MOCK DATA
   ═══════════════════════════════════════════════════════════════════ */

const mockEmployees: Employee[] = [
  { id: "EMP-001", name: "John Doe", email: "john@microcut.com", phone: "+1 555-0100", role: "OPERATOR", skills: ["CNC Turning", "VMC Milling"], shift: "Morning", joinDate: "2021-03-15", status: "ACTIVE", currentOrder: "ORD-1042", performanceScore: 92 },
  { id: "EMP-002", name: "Sarah Smith", email: "sarah@microcut.com", phone: "+1 555-0101", role: "MANAGER", skills: ["Management", "QA"], shift: "Morning", joinDate: "2019-11-01", status: "ACTIVE", currentOrder: null, performanceScore: 98 },
  { id: "EMP-003", name: "Mike Johnson", email: "mike@microcut.com", phone: "+1 555-0102", role: "QC_INSPECTOR", skills: ["Quality Inspection", "CMM"], shift: "Evening", joinDate: "2020-05-20", status: "ON_LEAVE", currentOrder: null, performanceScore: 88 },
  { id: "EMP-004", name: "Emily Chen", email: "emily@microcut.com", phone: "+1 555-0103", role: "OPERATOR", skills: ["Surface Finishing"], shift: "Night", joinDate: "2022-08-10", status: "ACTIVE", currentOrder: null, performanceScore: 85 },
];

/* ═══════════════════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════════════════ */

function EmployeeModal({ isOpen, onClose, onSuccess, initialData = null }: { isOpen: boolean, onClose: () => void, onSuccess: () => void, initialData?: Employee | null }) {
  const { token } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(initialData?.skills || []);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const form = e.target as HTMLFormElement;
      const data = Object.fromEntries(new FormData(form));
      const payload = { ...data, skills: selectedSkills };

      if (initialData) {
        await axios.put(`/api/portal/employees/${initialData.id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await axios.post("/api/portal/employees", payload, { headers: { Authorization: `Bearer ${token}` } });
      }
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
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              {initialData ? <><User size={20} className="text-steel-400" /> Edit Employee</> : <><Plus size={20} className="text-steel-400" /> Add Employee</>}
            </h2>
            <button onClick={onClose} className="p-1 text-steel-200/60 hover:text-white rounded"><X size={20} /></button>
          </div>
          
          <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
            <form id="empForm" onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info */}
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs text-steel-400 mb-1">Full Name</label><input required name="name" defaultValue={initialData?.name} type="text" className="w-full bg-navy-950/50 border border-steel-500/20 rounded-lg px-3 py-2 text-white outline-none focus:border-steel-400" /></div>
                <div><label className="block text-xs text-steel-400 mb-1">Employee ID</label><input required name="id" defaultValue={initialData?.id} disabled={!!initialData} type="text" className="w-full bg-navy-950/50 border border-steel-500/20 rounded-lg px-3 py-2 text-white outline-none focus:border-steel-400 disabled:opacity-50" /></div>
                <div><label className="block text-xs text-steel-400 mb-1">Email</label><input required name="email" defaultValue={initialData?.email} type="email" className="w-full bg-navy-950/50 border border-steel-500/20 rounded-lg px-3 py-2 text-white outline-none focus:border-steel-400" /></div>
                <div><label className="block text-xs text-steel-400 mb-1">Phone</label><input required name="phone" defaultValue={initialData?.phone} type="tel" className="w-full bg-navy-950/50 border border-steel-500/20 rounded-lg px-3 py-2 text-white outline-none focus:border-steel-400" /></div>
              </div>

              {/* Role & Dept */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-steel-400 mb-1">Role</label>
                  <select required name="role" defaultValue={initialData?.role} className="w-full bg-navy-950/50 border border-steel-500/20 rounded-lg px-3 py-2 text-white outline-none focus:border-steel-400">
                    <option value="OPERATOR">Operator</option>
                    <option value="QC_INSPECTOR">QC Inspector</option>
                    <option value="MANAGER">Manager</option>
                    <option value="ADMIN">Admin</option>
                    <option value="HR">HR</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-steel-400 mb-1">Shift</label>
                  <select required name="shift" defaultValue={initialData?.shift} className="w-full bg-navy-950/50 border border-steel-500/20 rounded-lg px-3 py-2 text-white outline-none focus:border-steel-400">
                    <option value="Morning">Morning</option>
                    <option value="Evening">Evening</option>
                    <option value="Night">Night</option>
                  </select>
                </div>
                <div><label className="block text-xs text-steel-400 mb-1">Join Date</label><input required name="joinDate" defaultValue={initialData?.joinDate} type="date" className="w-full bg-navy-950/50 border border-steel-500/20 rounded-lg px-3 py-2 text-white outline-none focus:border-steel-400 [color-scheme:dark]" /></div>
              </div>

              {/* Skills Multi-Select */}
              <div>
                <label className="block text-xs text-steel-400 mb-2">Technical Skills</label>
                <div className="flex flex-wrap gap-2">
                  {["CNC Turning", "VMC Milling", "Surface Finishing", "Drilling", "Quality Inspection", "CMM", "Management"].map(skill => (
                    <button
                      type="button"
                      key={skill}
                      onClick={() => handleSkillToggle(skill)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        selectedSkills.includes(skill)
                          ? "bg-steel-500 text-navy-950 border-steel-500"
                          : "bg-navy-950/50 text-steel-300 border-steel-500/30 hover:border-steel-400"
                      }`}
                    >
                      {skill} {selectedSkills.includes(skill) && <CheckCircle2 size={12} className="inline ml-1 mb-0.5" />}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>
          
          <div className="px-6 py-4 border-t border-steel-500/10 flex justify-end gap-3">
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button variant="primary" type="submit" form="empForm" loading={isSubmitting}>{initialData ? "Save Changes" : "Create Profile"}</Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE MAIN
   ═══════════════════════════════════════════════════════════════════ */

export default function EmployeeManagementPage() {
  const router = useRouter();
  const { token, user } = useAuth();
  
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  // ROLES CHECK
  useEffect(() => {
    if (user && user.role === "OPERATOR") {
      router.push("/portal/unauthorized");
    }
  }, [user, router]);

  const fetchEmployees = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const res = await axios.get<Employee[]>("/api/portal/employees", { headers: { Authorization: `Bearer ${token}` }});
      setEmployees(res.data);
    } catch (err) {
      console.warn("API unavailable, using mock dat for employees");
      setEmployees(mockEmployees);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchEmployees(); }, [token]);

  const filteredEmployees = useMemo(() => {
    return employees.filter(e => 
      e.name.toLowerCase().includes(search.toLowerCase()) || 
      e.id.toLowerCase().includes(search.toLowerCase()) ||
      e.role.toLowerCase().includes(search.toLowerCase())
    );
  }, [employees, search]);

  const handleEditClick = (e: Employee) => {
    setEditingEmployee(e);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setEditingEmployee(null), 300); // Wait for transition
  };

  if (!user || user.role === "OPERATOR") {
    // Show a loading/blank state briefly while redirecting
    return <div className="h-full flex items-center justify-center text-steel-400"><ShieldAlert className="animate-pulse mr-2"/> Verifying access...</div>;
  }

  return (
    <div className="h-full flex flex-col max-w-[1600px] mx-auto space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Workforce Roster</h1>
          <p className="text-sm text-steel-200/50 mt-1">Manage employee profiles, access roles, and assignments</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={16} /> Add Employee
        </Button>
      </div>

      {/* FILTER BAR */}
      <div className="bg-navy-800/40 p-2 md:p-3 rounded-xl border border-steel-500/15 flex flex-col md:flex-row gap-3 items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-steel-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search by name, ID, or role..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-navy-900 border border-steel-500/30 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-steel-400 outline-none"
          />
        </div>
        <div className="text-sm font-medium text-steel-400 px-3 bg-navy-900 border border-steel-500/20 py-2 rounded-lg ml-auto">
          Total Directory: <span className="text-white">{employees.length} Active</span>
        </div>
      </div>

      {/* GRID */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="h-64 bg-navy-800/30 rounded-2xl border border-steel-500/10 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEmployees.map(employee => {
            const roleConf = roleColors[employee.role];
            
            return (
              <motion.div 
                key={employee.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-navy-800/40 border border-steel-500/15 rounded-2xl shadow-lg flex flex-col overflow-hidden relative"
              >
                {/* Status Indicator */}
                <div className={`absolute top-4 right-4 w-2.5 h-2.5 rounded-full ring-4 ring-navy-900 ${employee.status === "ACTIVE" ? "bg-green-500" : "bg-orange-500"}`} title={employee.status} />

                {/* Profile Header */}
                <div className="p-6 pb-4 flex flex-col items-center border-b border-steel-500/10">
                  <div className="w-20 h-20 rounded-full bg-navy-900 border-4 border-navy-800 mb-3 flex items-center justify-center text-2xl font-bold text-steel-400 shadow-inner overflow-hidden">
                    {employee.avatarUrl ? <img src={employee.avatarUrl} alt={employee.name} className="w-full h-full object-cover"/> : employee.name.charAt(0)}
                  </div>
                  <h3 className="text-lg font-bold text-white text-center leading-tight">
                    <Link href={`/portal/employees/${employee.id}`} className="hover:text-steel-300 transition-colors">{employee.name}</Link>
                  </h3>
                  <span className="text-xs text-steel-400 mb-2 font-mono">{employee.id}</span>
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${roleConf.bg} ${roleConf.text} ${roleConf.border}`}>
                    {employee.role.replace("_", " ")}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm flex items-center gap-2 text-steel-300"><Mail size={14} className="text-steel-500" /> {employee.email}</p>
                    <p className="text-sm flex items-center gap-2 text-steel-300"><Phone size={14} className="text-steel-500" /> {employee.phone}</p>
                    <p className="text-sm flex items-center gap-2 text-steel-300"><CalendarDays size={14} className="text-steel-500" /> Shift: {employee.shift}</p>
                  </div>

                  <div className="pt-2">
                    <p className="text-[10px] text-steel-500 uppercase tracking-wider font-semibold mb-2">Capabilities</p>
                    <div className="flex flex-wrap gap-1.5">
                      {employee.skills.slice(0, 3).map(skill => (
                        <span key={skill} className="px-2 py-0.5 rounded text-[10px] bg-steel-500/10 text-steel-300 border border-steel-500/20">
                          {skill}
                        </span>
                      ))}
                      {employee.skills.length > 3 && (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-steel-500/10 text-steel-400 border border-steel-500/20">
                          +{employee.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-3 border-t border-steel-500/10 bg-navy-900/30 flex justify-between gap-2">
                  <Link href={`/portal/employees/${employee.id}`} className="flex-1">
                    <Button variant="secondary" className="w-full text-xs h-8">View Profile</Button>
                  </Link>
                  <Button variant="ghost" onClick={() => handleEditClick(employee)} className="px-2 h-8">
                    <MoreVertical size={16} className="text-steel-400"/>
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <EmployeeModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSuccess={fetchEmployees}
        initialData={editingEmployee}
      />
    </div>
  );
}
