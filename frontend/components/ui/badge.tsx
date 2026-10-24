import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded px-2 py-0.5 text-[11px] font-medium tracking-tight transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "border border-zinc-800 bg-zinc-900 text-zinc-300",
        secondary:
          "border border-zinc-850 bg-zinc-900 text-zinc-400",
        planner:
          "border border-zinc-700/80 bg-zinc-800/60 text-zinc-200",
        performer:
          "border border-zinc-700/80 bg-zinc-800/60 text-zinc-200",
        crew:
          "border border-zinc-700/80 bg-zinc-800/60 text-zinc-200",
        outline: "border border-zinc-800 text-zinc-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
