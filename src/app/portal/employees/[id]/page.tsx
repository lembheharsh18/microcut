"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  CalendarDays, 
  MapPin, 
  Briefcase, 
  Award,
  Clock,
  CheckCircle2,
  FileText,
  Upload,
  Download,
  AlertTriangle
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";

// Assuming matching types from list page
type Role = "ADMIN" | "MANAGER" | "OPERATOR" | "QC_INSPECTOR" | "HR";

interface EmployeeProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  skills: string[];
  shift: string;
  joinDate: string;
  status: string;
  address: string;
  
  // Performance Metrics
  totalOrders: number;
  onTimePercentage: number;
  averageCompletionTime: string; // e.g., "4.2 hours"
  
  // History
  orderHistory: {
    id: string;
    partName: string;
    client: string;
    date: string;
    status: string;
  }[];
}

const roleColors: Record<Role, { bg: string; text: string; border: string }> = {
  ADMIN: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/30" },
  MANAGER: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/30" },
  OPERATOR: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
  QC_INSPECTOR: { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/30" },
  HR: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30" },
};

export default function EmployeeProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { token, user } = useAuth();
  
  const [profile, setProfile] = useState<EmployeeProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback check
  useEffect(() => {
    if (user && user.role === "OPERATOR" && user.id !== params.id) {
       router.push("/portal/unauthorized");
    }
  }, [user, params.id, router]);

  useEffect(() => {
    if (!token) return;
    setIsLoading(true);
    axios.get<EmployeeProfile>(`/api/portal/employees/${params.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setProfile(res.data))
    .catch(err => {
      console.error("API error, using mock data", err);
      // Mock Fallback
      setProfile({
        id: params.id,
        name: params.id === "EMP-001" ? "John Doe" : "Sarah Smith",
        email: "employee@microcut.com",
        phone: "+1 (555) 123-0192",
        role: params.id === "EMP-001" ? "OPERATOR" : "MANAGER",
        skills: ["CNC Turning", "VMC Milling", "G-Code Programming"],
        shift: "Morning",
        joinDate: "2021-03-15",
        status: "ACTIVE",
        address: "123 Industrial Parkway, Suite 100, Cityville",
        totalOrders: 142,
        onTimePercentage: 94.5,
        averageCompletionTime: "3.8 hours",
        orderHistory: [
          { id: "ORD-1042", partName: "Drive Shaft", client: "Acme Corp", date: "2024-10-15", status: "Completed" },
          { id: "ORD-1038", partName: "Valve Body", client: "Global Tech", date: "2024-10-12", status: "Completed" },
          { id: "ORD-1035", partName: "Flange Bracket", client: "Aerodyne", date: "2024-10-10", status: "Failed QC" },
          { id: "ORD-1029", partName: "Titanium Pin", client: "Medical Inc", date: "2024-10-05", status: "Completed" },
        ]
      });
    })
    .finally(() => setIsLoading(false));
  }, [token, params.id]);


  if (isLoading) {
    return (
      <div className="h-full flex flex-col gap-6 max-w-[1200px] mx-auto animate-pulse">
        <div className="h-32 bg-navy-800/40 rounded-2xl border border-steel-500/10"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-64 bg-navy-800/40 rounded-2xl border border-steel-500/10"></div>
          <div className="md:col-span-2 h-96 bg-navy-800/40 rounded-2xl border border-steel-500/10"></div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return <div className="p-8 text-center text-steel-400">Employee not found.</div>;
  }

  const roleConf = roleColors[profile.role] || roleColors["OPERATOR"];

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      
      {/* HEADER CARD */}
      <div className="relative bg-navy-800/40 border border-steel-500/15 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 overflow-hidden">
        {/* Abstract Background element */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-steel-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <Button variant="ghost" onClick={() => router.push("/portal/employees")} className="absolute top-6 left-6 px-2 hidden md:flex">
          <ArrowLeft size={18} />
        </Button>

        <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-full bg-navy-900 border-4 border-navy-800 shadow-xl flex items-center justify-center text-4xl font-bold text-steel-400 z-10 md:ml-12">
          {profile.name.charAt(0)}
        </div>

        <div className="flex-1 text-center md:text-left z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white tracking-tight">{profile.name}</h1>
            <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider border inline-block w-max mx-auto md:mx-0 ${roleConf.bg} ${roleConf.text} ${roleConf.border}`}>
              {profile.role.replace("_", " ")}
            </span>
            <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider border inline-block w-max mx-auto md:mx-0 ${profile.status === 'ACTIVE' ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'}`}>
              {profile.status}
            </span>
          </div>
          
          <p className="text-steel-400 font-mono text-sm mb-4">ID: {profile.id}</p>

          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-steel-300">
            <span className="flex items-center gap-2"><Mail size={16} className="text-steel-500" /> {profile.email}</span>
            <span className="flex items-center gap-2"><Phone size={16} className="text-steel-500" /> {profile.phone}</span>
            <span className="flex items-center gap-2"><MapPin size={16} className="text-steel-500" /> {profile.address}</span>
            <span className="flex items-center gap-2"><CalendarDays size={16} className="text-steel-500" /> Joined: {profile.joinDate}</span>
          </div>
        </div>

        {user?.role === "ADMIN" && (
          <div className="absolute top-6 right-6 z-10 hidden md:block">
            <Button variant="secondary">Edit Profile</Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Stats & Skills */}
        <div className="space-y-6">
          
          {/* Performance Summary */}
          <div className="bg-navy-800/40 border border-steel-500/15 rounded-xl p-6">
            <h3 className="text-sm font-bold text-steel-400 uppercase tracking-wider mb-5 flex items-center gap-2">
              <Award size={16} /> Performance Metrics
            </h3>
            
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-end mb-1">
                  <span className="text-xs text-steel-400">Total Orders Handled</span>
                  <span className="text-lg font-bold text-white">{profile.totalOrders}</span>
                </div>
                <div className="w-full bg-navy-900 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '100%' }}></div></div>
              </div>
              
              <div>
                <div className="flex justify-between items-end mb-1">
                  <span className="text-xs text-steel-400">On-Time Delivery</span>
                  <span className={`text-lg font-bold ${profile.onTimePercentage > 90 ? 'text-green-400' : 'text-orange-400'}`}>{profile.onTimePercentage}%</span>
                </div>
                <div className="w-full bg-navy-900 rounded-full h-1.5"><div className={`h-1.5 rounded-full ${profile.onTimePercentage > 90 ? 'bg-green-500' : 'bg-orange-500'}`} style={{ width: `${profile.onTimePercentage}%` }}></div></div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-1">
                  <span className="text-xs text-steel-400">Avg. Completion Time</span>
                  <span className="text-lg font-bold text-white flex items-center gap-1.5">
                    <Clock size={16} className="text-steel-500" /> {profile.averageCompletionTime}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Context */}
          <div className="bg-navy-800/40 border border-steel-500/15 rounded-xl p-6">
             <h3 className="text-sm font-bold text-steel-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Briefcase size={16} /> Technical Endorsements
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1.5 rounded bg-steel-500/10 text-steel-200 border border-steel-500/20 text-sm flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-green-400" /> {skill}
                </span>
              ))}
              {profile.skills.length === 0 && <span className="text-steel-500 italic text-sm">No specific skills registered.</span>}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: History & Documents */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Order History Table */}
          <div className="bg-navy-800/40 border border-steel-500/15 rounded-xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-steel-500/10 flex justify-between items-center bg-navy-800/50">
               <h3 className="text-sm font-bold text-steel-400 uppercase tracking-wider">Recent Orders History</h3>
               <Button variant="ghost" className="h-8 text-xs px-3 text-steel-400">View All</Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-steel-100">
                <thead className="bg-navy-900/50 text-steel-200/60 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="px-5 py-3 font-medium">Order ID</th>
                    <th className="px-5 py-3 font-medium">Part / Client</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-steel-500/10">
                  {profile.orderHistory.map((order, i) => (
                    <tr key={i} className="hover:bg-steel-500/5 transition-colors">
                      <td className="px-5 py-3 font-medium text-steel-300">{order.id}</td>
                      <td className="px-5 py-3">
                        <p className="text-white">{order.partName}</p>
                        <p className="text-xs text-steel-500">{order.client}</p>
                      </td>
                      <td className="px-5 py-3 text-steel-400">{order.date}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${order.status === 'Completed' ? 'text-green-400 bg-green-500/10' : order.status === 'Failed QC' ? 'text-red-400 bg-red-500/10' : 'text-blue-400 bg-blue-500/10'}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {profile.orderHistory.length === 0 && (
                    <tr><td colSpan={4} className="text-center p-6 text-steel-500">No operations history logged.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Documents Section */}
          <div className="bg-navy-800/40 border border-steel-500/15 rounded-xl p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-sm font-bold text-steel-400 uppercase tracking-wider flex items-center gap-2">
                <FileText size={16} /> Employee Documents
              </h3>
              {(user?.role === "ADMIN" || user?.role === "HR") && (
                <Button variant="secondary" className="h-8 text-xs py-0"><Upload size={14} className="mr-1.5" /> Upload File</Button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-navy-900/50 border border-steel-500/20 rounded-lg group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">ID Proof (Passport)</p>
                    <p className="text-xs text-steel-500">Uploaded on {profile.joinDate}</p>
                  </div>
                </div>
                <button className="p-2 text-steel-400 hover:text-white rounded bg-navy-800 transition-colors"><Download size={16} /></button>
              </div>

              <div className="flex items-center justify-between p-4 bg-navy-900/50 border border-steel-500/20 rounded-lg group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-green-500/10 text-green-400 flex items-center justify-center shrink-0">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Signed NDA / Contract</p>
                    <p className="text-xs text-steel-500">Uploaded on {profile.joinDate}</p>
                  </div>
                </div>
                <button className="p-2 text-steel-400 hover:text-white rounded bg-navy-800 transition-colors"><Download size={16} /></button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
