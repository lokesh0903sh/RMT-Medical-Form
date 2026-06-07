import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/cn";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  required,
  error,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={htmlFor}>
        {label}
        {required ? (
          <span className="text-teal-brand"> *</span>
        ) : (
          <span className="ml-1 font-normal text-slate-400">(Optional)</span>
        )}
      </Label>
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
