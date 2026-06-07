import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pill } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/ui/file-upload";
import { FormField } from "@/components/FormField";
import { submitBooking } from "@/services/bookingService";
import { bookingSchema, validateFile } from "@/utils/validation";
import type { z } from "zod";

type BookingFormValues = z.infer<typeof bookingSchema>;

export function MedicineBookingForm() {
  const [prescription, setPrescription] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      contactNumber: "",
      message: "",
    },
  });

  const onSubmit = async (data: BookingFormValues) => {
    const fileValidation = validateFile(prescription ?? undefined, false);
    if (fileValidation !== true) {
      setFileError(fileValidation);
      return;
    }
    setFileError(undefined);

    try {
      await submitBooking({ ...data, prescription });
      toast.success("Booking submitted!", {
        description: "We will contact you shortly about your medicine order.",
      });
      reset();
      setPrescription(null);
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
          <Pill className="h-5 w-5 text-teal-brand" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Medicine Booking
          </h2>
          <p className="text-sm text-slate-500">
            Order medicines from RMT Medical Store
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label="Full Name"
          htmlFor="booking-fullName"
          required
          error={errors.fullName?.message}
        >
          <Input
            id="booking-fullName"
            placeholder="Your full name"
            {...register("fullName")}
          />
        </FormField>

        <FormField
          label="Contact Number"
          htmlFor="booking-contact"
          required
          error={errors.contactNumber?.message}
        >
          <Input
            id="booking-contact"
            type="tel"
            placeholder="+91 98765 43210"
            {...register("contactNumber")}
          />
        </FormField>
      </div>



      <FormField
        label="Message"
        htmlFor="booking-message"
        error={errors.message?.message}
      >
        <Textarea
          id="booking-message"
          placeholder="Any special instructions..."
          rows={3}
          {...register("message")}
        />
      </FormField>

      <FileUpload
        id="booking-prescription"
        label="Prescription Upload"
        file={prescription}
        error={fileError}
        onChange={(file) => {
          setPrescription(file);
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
          "Submit Booking"
        )}
      </Button>
    </form>
  );
}
