"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-steel-500 text-white hover:shadow-[0_0_20px_rgba(37,99,168,0.4)]",
  secondary:
    "bg-transparent border border-steel-500 text-steel-300 hover:bg-steel-500/10 hover:shadow-[0_0_15px_rgba(37,99,168,0.2)]",
  accent:
    "bg-accent text-white hover:shadow-[0_0_20px_rgba(232,114,12,0.4)]",
  ghost:
    "bg-transparent text-white hover:bg-white/5",
} as const;

const sizes = {
  sm: "px-3.5 py-1.5 text-sm rounded-md gap-1.5",
  md: "px-5 py-2.5 text-sm rounded-lg gap-2",
  lg: "px-7 py-3.5 text-base rounded-lg gap-2.5",
} as const;

type ButtonVariant = keyof typeof variants;
type ButtonSize = keyof typeof sizes;

interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: React.ReactNode;
}

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || loading ? 1 : 1.03 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        disabled={disabled || loading}
        className={cn(
          "relative inline-flex items-center justify-center font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-steel-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading && <Spinner className="shrink-0" />}
        <span className={cn(loading && "opacity-80")}>{children}</span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
