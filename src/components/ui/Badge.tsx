import React from "react";
import { cn } from "@/lib/utils";

const variantStyles = {
  success: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
  warning: "bg-amber-500/15 text-amber-400 border border-amber-500/25",
  danger: "bg-red-500/15 text-red-400 border border-red-500/25",
  info: "bg-steel-500/15 text-steel-300 border border-steel-500/25",
  neutral: "bg-white/10 text-gray-300 border border-white/15",
} as const;

type BadgeVariant = keyof typeof variantStyles;

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "neutral", className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium leading-5 whitespace-nowrap",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
export type { BadgeProps, BadgeVariant };
