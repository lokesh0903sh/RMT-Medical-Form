import * as React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-xl border border-teal-brand/20 bg-white px-4 text-sm text-slate-800 shadow-sm transition-colors placeholder:text-slate-400 focus-visible:border-teal-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-brand/20 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
