import * as React from "react";
import { cn } from "@/lib/utils";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-xs font-medium text-zinc-300 block mb-1.5 flex items-center gap-1",
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-zinc-500 font-normal">*</span>}
    </label>
  )
);
Label.displayName = "Label";

export { Label };
