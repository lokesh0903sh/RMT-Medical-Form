import { Upload, X } from "lucide-react";
import { cn } from "@/utils/cn";

interface FileUploadProps {
  id: string;
  label: string;
  accept?: string;
  required?: boolean;
  file: File | null;
  error?: string;
  onChange: (file: File | null) => void;
}

export function FileUpload({
  id,
  label,
  accept = ".jpg,.jpeg,.png,.pdf",
  required,
  file,
  error,
  onChange,
}: FileUploadProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
        {required ? (
          <span className="text-teal-brand"> *</span>
        ) : (
          <span className="ml-1 font-normal text-slate-400">(Optional)</span>
        )}
      </label>
      <div
        className={cn(
          "relative rounded-xl border-2 border-dashed bg-white p-4 transition-colors",
          error
            ? "border-red-400 bg-red-50/50"
            : "border-teal-brand/25 hover:border-teal-brand/50",
        )}
      >
        <input
          id={id}
          type="file"
          accept={accept}
          className="absolute inset-0 cursor-pointer opacity-0"
          onChange={(e) => {
            const selected = e.target.files?.[0] ?? null;
            onChange(selected);
          }}
        />
        {!file ? (
          <div className="flex flex-col items-center gap-2 py-2 text-center">
            <Upload className="h-8 w-8 text-teal-brand/70" />
            <p className="text-sm text-slate-600">
              Tap to upload JPG, PNG, or PDF
            </p>
            <p className="text-xs text-slate-400">Max 5 MB</p>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-800">
                {file.name}
              </p>
              <p className="text-xs text-slate-500">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
