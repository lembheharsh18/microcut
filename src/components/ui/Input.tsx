"use client";

import React, { useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  hint?: string;
  inputSize?: "sm" | "md" | "lg";
}

const inputSizes = {
  sm: "px-3 py-1.5 text-sm rounded-md",
  md: "px-4 py-2.5 text-sm rounded-lg",
  lg: "px-4 py-3.5 text-base rounded-lg",
} as const;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      inputSize = "md",
      className,
      id: externalId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const errorId = `${id}-error`;
    const hintId = `${id}-hint`;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-steel-200"
          >
            {label}
          </label>
        )}

        <motion.input
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-describedby={
            [error ? errorId : null, hint ? hintId : null]
              .filter(Boolean)
              .join(" ") || undefined
          }
          whileFocus={{ scale: 1.005 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className={cn(
            "w-full bg-navy-800 border border-steel-500/20 text-white placeholder:text-steel-200/40 outline-none transition-all duration-200",
            "focus:border-steel-400 focus:ring-2 focus:ring-steel-500/30",
            error &&
              "border-red-500/60 focus:border-red-500 focus:ring-red-500/20",
            inputSizes[inputSize],
            className
          )}
          {...props}
        />

        {hint && !error && (
          <p id={hintId} className="text-xs text-steel-200/50">
            {hint}
          </p>
        )}

        {error && (
          <motion.p
            id={errorId}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-red-400"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
export type { InputProps };
