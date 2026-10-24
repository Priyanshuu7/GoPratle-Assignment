import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[75px] w-full rounded-md border border-zinc-800 bg-zinc-950/80 px-3 py-2 text-xs text-zinc-100 placeholder:text-zinc-600 transition-colors focus-visible:outline-none focus-visible:border-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 resize-y",
          error && "border-red-500/80 focus-visible:border-red-500 focus-visible:ring-red-500",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
