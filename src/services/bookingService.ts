import { postFormData } from "@/api/client";

export interface BookingPayload {
  fullName: string;
  contactNumber: string;
  message?: string;
  prescription?: File | null;
}

export async function submitBooking(payload: BookingPayload) {
  const formData = new FormData();
  formData.append("fullName", payload.fullName);
  formData.append("contactNumber", payload.contactNumber);
  formData.append("message", payload.message ?? "");

  if (payload.prescription) {
    formData.append("prescription", payload.prescription);
  }

  return postFormData("/api/booking", formData);
}
