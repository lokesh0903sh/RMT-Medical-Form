import * as React from "react";
import { cn } from "@/utils/cn";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "flex min-h-[100px] w-full resize-y rounded-xl border border-teal-brand/20 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm transition-colors placeholder:text-slate-400 focus-visible:border-teal-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-brand/20 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
