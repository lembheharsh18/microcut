"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Lock, Mail, KeyRound, AlertCircle, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";

export default function PortalLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Connect to Spring Boot endpoint
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      
      // Backend returns flat: { token, id, employeeId, email, role, name }
      const user = {
        id: data.employeeId || String(data.id),
        name: data.name,
        email: data.email,
        role: data.role,
      };
      login(data.token, user, rememberMe);
      
      router.push("/portal/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to authenticate");
      setShake(true);
      // reset shake animation state so it can happen again
      setTimeout(() => setShake(false), 500); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-navy-950">
      {/* Background elements */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,168,0.15)_0%,transparent_70%)]" />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <motion.div
          animate={shake ? { x: [-10, 10, -10, 10, -5, 5, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="bg-navy-900/80 backdrop-blur-md rounded-2xl border border-steel-500/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] p-8 sm:p-10 relative overflow-hidden"
        >
          {/* Top glowing line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-steel-400 to-transparent opacity-60" />

          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-navy-800 rounded-xl border border-steel-500/20 shadow-inner flex items-center justify-center mx-auto mb-5 relative">
              <div className="absolute inset-0 bg-steel-400/10 rounded-xl blur-sm" />
              <Lock className="text-steel-400 w-6 h-6 relative z-10" />
            </div>
            
            <h1 className="text-2xl font-bold text-white tracking-tight mb-2 flex items-center justify-center gap-2">
              MICROCUT <span className="text-steel-400">PORTAL</span>
            </h1>
            <p className="text-steel-200/50 text-sm">
              Authorized employee access only
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-3">
                <AlertCircle className="text-red-400 w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-200/90">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-steel-200 mb-1.5 ml-1">
                  Employee Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="w-4 h-4 text-steel-400/50" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-navy-950/50 border border-steel-500/30 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-steel-200/30 focus:outline-none focus:border-steel-400 focus:ring-1 focus:ring-steel-400 transition-all font-medium"
                    placeholder="name@microcut.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5 px-1">
                  <label className="block text-sm font-medium text-steel-200">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <KeyRound className="w-4 h-4 text-steel-400/50" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-navy-950/50 border border-steel-500/30 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-steel-200/30 focus:outline-none focus:border-steel-400 focus:ring-1 focus:ring-steel-400 transition-all font-medium"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-1">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-steel-500/50 text-steel-500 bg-navy-950 focus:ring-steel-400 focus:ring-offset-navy-900 cursor-pointer"
                />
                <span className="text-sm text-steel-200/70 group-hover:text-steel-200 transition-colors">
                  Remember me
                </span>
              </label>
              
              <a href="#" className="text-sm font-medium text-steel-400 hover:text-steel-300 transition-colors">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3.5 text-base flex justify-center items-center h-12"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Sign In to Portal <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>
          
          <div className="mt-8 text-center border-t border-steel-500/10 pt-6">
            <p className="text-xs text-steel-200/40">
              Microcut Technology © {new Date().getFullYear()}. All internal system activities are monitored and logged.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
