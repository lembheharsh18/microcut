"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Clock, 
  User, 
  Calendar, 
  Settings, 
  FileText, 
  Download,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";

// Assuming matching types from list page
type OrderStatus =
  | "Received"
  | "In Queue"
  | "In Progress"
  | "Quality Check"
  | "Dispatched";

interface OrderDetail {
  id: string;
  clientCompany: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;

  partName: string;
  partDrawingNumber: string;
  material: string;
  quantity: number;
  serviceType: string;
  priority: string;

  status: OrderStatus;
  
  assigneeName: string | null;
  machineName: string | null;
  startDate: string;
  deadlineDate: string;
  
  notes: string;
  createdAt: string;
}

const statusColors: Record<OrderStatus, { border: string; bg: string; text: string }> = {
  Received: { border: "border-gray-500/30", bg: "bg-gray-500/10", text: "text-gray-300" },
  "In Queue": { border: "border-steel-500/30", bg: "bg-steel-500/10", text: "text-steel-300" },
  "In Progress": { border: "border-blue-500/30", bg: "bg-blue-500/10", text: "text-blue-300" },
  "Quality Check": { border: "border-orange-500/30", bg: "bg-orange-500/10", text: "text-orange-300" },
  Dispatched: { border: "border-green-500/30", bg: "bg-green-500/10", text: "text-green-300" },
};

const KANBAN_COLUMNS: OrderStatus[] = [
  "Received",
  "In Queue",
  "In Progress",
  "Quality Check",
  "Dispatched",
];

// Mock Timeline data
const mockTimeline = [
  { id: 1, action: "Order Created", by: "Admin System", date: "2024-10-12 09:00 AM" },
  { id: 2, action: "Assigned to John D.", by: "Manager Alex", date: "2024-10-12 11:30 AM" },
  { id: 3, action: "Status changed to In Queue", by: "Manager Alex", date: "2024-10-12 11:30 AM" },
  { id: 4, action: "Status changed to In Progress", by: "John D.", date: "2024-10-14 08:15 AM" },
];

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { token, user } = useAuth();
  
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!token) return;
    
    setIsLoading(true);
    axios.get<OrderDetail>(`/api/portal/orders/${params.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setOrder(res.data))
    .catch(err => {
      console.error(err);
      // Fallback Mock Data
      setOrder({
        id: params.id,
        clientCompany: "Acme Corp",
        clientName: "Jane Doe",
        clientPhone: "+1 (555) 123-4567",
        clientEmail: "jane@acmecorp.com",
        partName: "Titanium Sub-Assembly",
        partDrawingNumber: "DWG-2048-A",
        material: "Titanium Grade 5",
        quantity: 500,
        serviceType: "CNC Turning",
        priority: "High",
        status: "In Progress",
        assigneeName: "John D.",
        machineName: "Tsugami B0205-III",
        startDate: "2024-10-14",
        deadlineDate: "2024-11-01",
        notes: "Requires tight tolerances. See attached technical drawings for spline specs.",
        createdAt: "2024-10-12"
      });
    })
    .finally(() => setIsLoading(false));
  }, [token, params.id]);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as OrderStatus;
    if (!order || newStatus === order.status) return;

    setIsUpdatingStatus(true);
    try {
      await axios.put(`/api/portal/orders/${order.id}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrder({ ...order, status: newStatus });
    } catch (err) {
      console.error(err);
      // Optimistic update for UI feel on local
      setOrder({ ...order, status: newStatus });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to completely delete this order? This cannot be undone.")) return;
    
    setIsDeleting(true);
    try {
      await axios.delete(`/api/portal/orders/${order?.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      router.push("/portal/orders");
    } catch (err) {
      console.error(err);
      // fallback navigate
      router.push("/portal/orders");
    }
  };

  if (!user) return null;

  const canEditOrDelete = user.role === "ADMIN" || user.role === "MANAGER";

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-steel-400"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-8 text-center text-steel-400">
        Order not found
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.push("/portal/orders")} className="px-2">
             <ArrowLeft size={18} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              {order.id} 
              <span className={`text-xs px-2.5 py-1 rounded-full border normal-case tracking-normal ${statusColors[order.status].bg} ${statusColors[order.status].text} ${statusColors[order.status].border}`}>
                {order.status}
              </span>
            </h1>
            <p className="text-sm text-steel-200/60 mt-1">{order.partName} • {order.clientCompany}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Dropdown */}
          <div className="relative flex items-center bg-navy-900 border border-steel-500/20 rounded-lg pr-3">
            {isUpdatingStatus && <div className="absolute left-3 w-3 h-3 border-2 border-steel-400 border-t-transparent rounded-full animate-spin"></div>}
            <select 
              value={order.status}
              onChange={handleStatusChange}
              disabled={isUpdatingStatus}
              className={`pl-8 pr-4 py-2 bg-transparent text-sm font-medium text-white outline-none cursor-pointer appearance-none ${isUpdatingStatus ? "opacity-50" : ""}`}
            >
              {KANBAN_COLUMNS.map(col => (
                <option key={col} value={col} className="bg-navy-900 text-white">{col}</option>
              ))}
            </select>
          </div>
          
          {canEditOrDelete && (
            <>
              <Button variant="secondary"><Edit size={16} /> Edit</Button>
              <Button variant="secondary" onClick={handleDelete} loading={isDeleting} className="text-red-400 hover:text-red-300 hover:border-red-500/30 hover:bg-red-500/10">
                <Trash2 size={16} /> Delete
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* MAIN DETAILS AREA */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-navy-800/40 border border-steel-500/15 rounded-xl p-6">
            <h3 className="text-sm font-bold text-steel-400 uppercase tracking-wider mb-4 border-b border-steel-500/10 pb-3">Part Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-xs text-steel-200/50 mb-1">Part Name</p>
                <p className="font-semibold text-white">{order.partName}</p>
              </div>
              <div>
                <p className="text-xs text-steel-200/50 mb-1">Drawing #</p>
                <p className="font-medium text-steel-200">{order.partDrawingNumber}</p>
              </div>
              <div>
                <p className="text-xs text-steel-200/50 mb-1">Material</p>
                <p className="font-medium text-steel-200">{order.material}</p>
              </div>
              <div>
                <p className="text-xs text-steel-200/50 mb-1">Quantity</p>
                <p className="font-semibold text-white">{order.quantity}</p>
              </div>
              <div>
                <p className="text-xs text-steel-200/50 mb-1">Service Type</p>
                <p className="font-medium text-steel-200">{order.serviceType}</p>
              </div>
              <div>
                <p className="text-xs text-steel-200/50 mb-1">Priority</p>
                <p className={`font-semibold ${order.priority === 'High' || order.priority === 'Urgent' ? 'text-red-400' : 'text-steel-200'}`}>{order.priority}</p>
              </div>
            </div>
            {order.notes && (
              <div className="mt-6 pt-4 border-t border-steel-500/10">
                <p className="text-xs text-steel-200/50 mb-2">Additional Notes</p>
                <p className="text-sm text-steel-200/80 leading-relaxed bg-navy-900/50 p-4 rounded-lg border border-steel-500/10">{order.notes}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CLIENT BOX */}
            <div className="bg-navy-800/40 border border-steel-500/15 rounded-xl p-6">
              <h3 className="text-sm font-bold text-steel-400 uppercase tracking-wider mb-4 border-b border-steel-500/10 pb-3">Client Info</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-steel-200/50">Company</p>
                  <p className="font-medium text-white">{order.clientCompany}</p>
                </div>
                <div>
                  <p className="text-xs text-steel-200/50">Contact Person</p>
                  <p className="font-medium text-steel-200">{order.clientName}</p>
                </div>
                <div>
                  <p className="text-xs text-steel-200/50">Email</p>
                  <a href={`mailto:${order.clientEmail}`} className="text-sm text-steel-400 hover:text-steel-300 transition-colors">{order.clientEmail}</a>
                </div>
                <div>
                  <p className="text-xs text-steel-200/50">Phone</p>
                  <a href={`tel:${order.clientPhone}`} className="text-sm text-steel-400 hover:text-steel-300 transition-colors">{order.clientPhone}</a>
                </div>
              </div>
            </div>

            {/* SCHEDULE & ASSIGNMENT */}
            <div className="bg-navy-800/40 border border-steel-500/15 rounded-xl p-6">
              <h3 className="text-sm font-bold text-steel-400 uppercase tracking-wider mb-4 border-b border-steel-500/10 pb-3">Assignment & Schedule</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                   <User className="w-4 h-4 text-steel-400 mt-0.5" />
                   <div>
                     <p className="text-xs text-steel-200/50">Assigned To</p>
                     <p className="font-medium text-white">{order.assigneeName || "Unassigned"}</p>
                   </div>
                </div>
                <div className="flex items-start gap-3">
                   <Settings className="w-4 h-4 text-steel-400 mt-0.5" />
                   <div>
                     <p className="text-xs text-steel-200/50">Machine</p>
                     <p className="font-medium text-white">{order.machineName || "TBD"}</p>
                   </div>
                </div>
                <div className="flex items-start gap-3">
                   <Calendar className="w-4 h-4 text-steel-400 mt-0.5" />
                   <div>
                     <p className="text-xs text-steel-200/50">Start Date</p>
                     <p className="font-medium text-steel-200">{order.startDate}</p>
                   </div>
                </div>
                <div className="flex items-start gap-3">
                   <Clock className="w-4 h-4 text-red-400 mt-0.5" />
                   <div>
                     <p className="text-xs text-red-400/70">Deadline</p>
                     <p className="font-medium text-red-400">{order.deadlineDate}</p>
                   </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* SIDEBAR (Timeline & Attachments) */}
        <div className="space-y-6">
          
          <div className="bg-navy-800/40 border border-steel-500/15 rounded-xl p-6">
            <h3 className="text-sm font-bold text-steel-400 uppercase tracking-wider mb-4">Attachments & Drawings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-navy-900/50 border border-steel-500/20 rounded-lg group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileText className="w-8 h-8 text-blue-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">DWG-2048-A.pdf</p>
                    <p className="text-xs text-steel-200/50">2.4 MB • Drawing</p>
                  </div>
                </div>
                <button className="p-2 text-steel-400 hover:text-white hover:bg-steel-500/20 rounded transition-colors shrink-0">
                  <Download size={16} />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-navy-900/50 border border-steel-500/20 rounded-lg group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileText className="w-8 h-8 text-orange-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">Material_Cert.pdf</p>
                    <p className="text-xs text-steel-200/50">800 KB • Certification</p>
                  </div>
                </div>
                <button className="p-2 text-steel-400 hover:text-white hover:bg-steel-500/20 rounded transition-colors shrink-0">
                  <Download size={16} />
                </button>
              </div>
            </div>
            {canEditOrDelete && (
              <Button variant="secondary" className="w-full mt-4 text-xs">Upload Document</Button>
            )}
          </div>

          <div className="bg-navy-800/40 border border-steel-500/15 rounded-xl p-6">
            <h3 className="text-sm font-bold text-steel-400 uppercase tracking-wider mb-6">Activity Log</h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-steel-500/20 before:to-transparent">
              {mockTimeline.map((item, i) => (
                <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border border-steel-500 bg-navy-900 text-steel-400 group-[.is-active]:bg-steel-500 group-[.is-active]:text-navy-950 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                    <CheckCircle2 size={12} className="opacity-0 group-[.is-active]:opacity-100" />
                  </div>
                  <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-3 rounded border border-steel-500/10 bg-navy-900/30">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-sm text-steel-200">{item.action}</h4>
                    </div>
                    <div className="text-xs text-steel-400 flex items-center justify-between">
                       <span>{item.by}</span>
                       <span className="text-[10px] text-steel-200/40">{item.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
