import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-brand/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
          variant === "default" &&
            "bg-teal-brand text-white shadow-md shadow-teal-brand/25 hover:bg-teal-dark active:scale-[0.98]",
          variant === "outline" &&
            "border-2 border-teal-brand/30 bg-white text-teal-brand hover:bg-teal-brand/5",
          variant === "ghost" && "text-teal-brand hover:bg-teal-brand/10",
          size === "default" && "h-11 px-6 text-sm",
          size === "sm" && "h-9 px-4 text-xs",
          size === "lg" && "h-12 px-8 text-base",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
