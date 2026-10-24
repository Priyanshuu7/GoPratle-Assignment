import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.99]",
  {
    variants: {
      variant: {
        default:
          "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 shadow-xs font-semibold",
        destructive:
          "border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20",
        outline:
          "border border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 hover:border-zinc-700",
        secondary:
          "bg-zinc-800 text-zinc-200 hover:bg-zinc-700/80",
        ghost: "hover:bg-zinc-850 hover:text-zinc-100 text-zinc-400",
        link: "text-zinc-300 underline-offset-4 hover:underline hover:text-zinc-100",
      },
      size: {
        default: "h-9 px-3.5 py-1.5",
        sm: "h-8 rounded-md px-2.5 text-xs",
        lg: "h-10 rounded-md px-5 text-sm",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
