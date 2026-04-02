"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  ClipboardList,
  Cpu,
  Users,
  BarChart2,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useAuth, AuthProvider } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

function PortalLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated && pathname !== "/portal/login") {
        router.replace("/portal/login");
      } else if (isAuthenticated && pathname === "/portal") {
        router.replace("/portal/dashboard");
      }
    }
  }, [isLoading, isAuthenticated, pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-steel-500/30 border-t-steel-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // If not authenticated and trying to access a protected page, or if we are exactly on the login page (whether auth or not, though logic redirects away)
  if (pathname === "/portal/login") {
    return <main className="min-h-screen bg-navy-950">{children}</main>;
  }

  if (!isAuthenticated && pathname !== "/portal/login") {
     return null; // Will redirect shortly from useEffect
  }

  const isOperator = user?.role === "OPERATOR";

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/portal/dashboard" },
    { icon: ClipboardList, label: "Orders", href: "/portal/orders" },
    { icon: Cpu, label: "Machines", href: "/portal/machines" },
    ...(!isOperator ? [{ icon: Users, label: "Employees", href: "/portal/employees" }] : []),
    ...(!isOperator ? [{ icon: BarChart2, label: "Reports", href: "/portal/reports" }] : []),
  ];

  return (
    <div className="min-h-screen bg-navy-950 flex font-sans text-steel-100">
      {/* Mobile menu toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-navy-800 rounded-md border border-steel-500/30 text-steel-200"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar background overlay for mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isMobileMenuOpen ? 0 : "-100%" }}
        className={cn(
          "fixed md:sticky top-0 left-0 h-screen w-64 bg-[#0d1526] border-r border-steel-500/10 flex flex-col z-50 md:translate-x-0 transition-transform duration-300",
          !isMobileMenuOpen && "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-6 border-b border-steel-500/10">
          <Link href="/portal/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-steel-500/20 flex items-center justify-center">
              <Cpu className="text-steel-400" size={20} />
            </div>
            <span className="font-bold text-lg tracking-wide text-white">
              MICRO<span className="text-steel-400">CUT</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 font-medium",
                  isActive
                    ? "bg-steel-500 text-white shadow-md shadow-steel-500/10"
                    : "text-steel-300/70 hover:bg-steel-500/10 hover:text-steel-100"
                )}
              >
                <Icon size={20} className={isActive ? "text-white" : "text-steel-400/70"} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-steel-500/10 mt-auto">
          <div className="bg-navy-900/50 rounded-xl p-4 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-steel-600/30 flex items-center justify-center text-steel-200 font-bold text-lg mb-3 shadow-[0_0_15px_rgba(37,99,168,0.2)]">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="text-center mb-4">
              <p className="text-white text-sm font-semibold truncate max-w-[160px]">
                {user?.name || "Employee"}
              </p>
              <span className="inline-block mt-1 px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md bg-steel-500/20 text-steel-400 border border-steel-500/20">
                {user?.role || "STAFF"}
              </span>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors font-medium border border-red-500/20"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto bg-navy-950">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <PortalLayoutContent>{children}</PortalLayoutContent>
    </AuthProvider>
  );
}
