"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("App boundary caught an error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
      <h2 className="text-3xl font-bold text-slate-800 mb-4">Something went wrong</h2>
      <p className="text-slate-600 mb-8 max-w-md">We apologize for the inconvenience. An unexpected error occurred.</p>
      <Button onClick={() => reset()} className="bg-blue-600 hover:bg-blue-700 text-white">Try Again</Button>
    </div>
  );
}
