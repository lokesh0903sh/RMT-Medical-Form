import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/ui/file-upload";
import { FormField } from "@/components/FormField";
import { submitQuery } from "@/services/queryService";
import { querySchema, validateFile } from "@/utils/validation";
import type { z } from "zod";

type QueryFormValues = z.infer<typeof querySchema>;

export function MedicalQueryForm() {
  const [attachment, setAttachment] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QueryFormValues>({
    resolver: zodResolver(querySchema),
    defaultValues: {
      fullName: "",
      contactNumber: "",
      query: "",
    },
  });

  const onSubmit = async (data: QueryFormValues) => {
    const fileValidation = validateFile(attachment ?? undefined, false);
    if (fileValidation !== true) {
      setFileError(fileValidation);
      return;
    }
    setFileError(undefined);

    try {
      await submitQuery({ ...data, attachment });
      toast.success("Query submitted!", {
        description: "Our team will respond to you soon.",
      });
      reset();
      setAttachment(null);
    } catch (err) {
      toast.error("Submission failed", {
        description:
          err instanceof Error ? err.message : "Please try again later.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-2xl bg-white p-6 shadow-lg shadow-teal-brand/5 ring-1 ring-teal-brand/10 sm:p-8"
    >
      <div className="flex items-center gap-3 border-b border-teal-brand/10 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-brand/10">
          <MessageCircle className="h-5 w-5 text-teal-brand" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Medical Query</h2>
          <p className="text-sm text-slate-500">
            Ask our pharmacists for medical guidance
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label="Full Name"
          htmlFor="query-fullName"
          required
          error={errors.fullName?.message}
        >
          <Input
            id="query-fullName"
            placeholder="Your full name"
            {...register("fullName")}
          />
        </FormField>

        <FormField
          label="Contact Number"
          htmlFor="query-contact"
          required
          error={errors.contactNumber?.message}
        >
          <Input
            id="query-contact"
            type="tel"
            placeholder="+91 98765 43210"
            {...register("contactNumber")}
          />
        </FormField>
      </div>

      <FormField
        label="Your Query"
        htmlFor="query-text"
        required
        error={errors.query?.message}
      >
        <Textarea
          id="query-text"
          placeholder="Describe your medical question..."
          rows={5}
          {...register("query")}
        />
      </FormField>

      <FileUpload
        id="query-attachment"
        label="File Upload"
        file={attachment}
        error={fileError}
        onChange={(file) => {
          setAttachment(file);
          if (file) {
            const result = validateFile(file);
            setFileError(result === true ? undefined : result);
          } else {
            setFileError(undefined);
          }
        }}
      />

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Query"
        )}
      </Button>
    </form>
  );
}
