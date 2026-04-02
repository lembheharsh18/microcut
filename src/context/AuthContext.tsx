"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User, rememberMe?: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for token and user in localStorage on mount
    try {
      const storedToken = localStorage.getItem("microcut_portal_token");
      const storedUser = localStorage.getItem("microcut_portal_user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse stored auth data", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (newToken: string, newUser: User, rememberMe: boolean = false) => {
    setToken(newToken);
    setUser(newUser);
    
    // Simplistic storage, could add session storage if rememberMe is false, but sticking to localStorage for now
    localStorage.setItem("microcut_portal_token", newToken);
    localStorage.setItem("microcut_portal_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("microcut_portal_token");
    localStorage.removeItem("microcut_portal_user");
    router.push("/portal/login");
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
