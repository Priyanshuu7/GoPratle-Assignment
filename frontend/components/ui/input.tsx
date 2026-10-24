import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-zinc-800 bg-zinc-950/80 px-3 py-1.5 text-xs text-zinc-100 placeholder:text-zinc-600 transition-colors focus-visible:outline-none focus-visible:border-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-500 disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500/80 focus-visible:border-red-500 focus-visible:ring-red-500",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
