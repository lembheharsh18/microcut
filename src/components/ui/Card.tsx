"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  glowTop?: boolean;
  hoverLift?: boolean;
  className?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, glowTop = false, hoverLift = true, className, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={
          hoverLift
            ? { y: -4, borderColor: "rgba(37, 99, 168, 0.4)" }
            : undefined
        }
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={cn(
          "relative rounded-xl bg-surface border border-steel-500/20 p-6 transition-shadow duration-300",
          hoverLift && "hover:shadow-[0_8px_30px_rgba(37,99,168,0.08)]",
          className
        )}
        {...props}
      >
        {/* Glowing top border */}
        {glowTop && (
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-steel-400 to-transparent"
          />
        )}
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

/* ── Sub-components ───────────────────────────────────────────────── */

function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  );
}

function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn("text-lg font-semibold text-white", className)}>
      {children}
    </h3>
  );
}

function CardDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-sm text-steel-200/70 mt-1", className)}>
      {children}
    </p>
  );
}

function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn(className)}>{children}</div>;
}

function CardFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mt-6 flex items-center gap-3", className)}>
      {children}
    </div>
  );
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
export type { CardProps };
