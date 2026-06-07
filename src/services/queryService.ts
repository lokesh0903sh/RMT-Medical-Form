import { postFormData } from "@/api/client";

export interface QueryPayload {
  fullName: string;
  contactNumber: string;
  query: string;
  attachment?: File | null;
}

export async function submitQuery(payload: QueryPayload) {
  const formData = new FormData();
  formData.append("fullName", payload.fullName);
  formData.append("contactNumber", payload.contactNumber);
  formData.append("query", payload.query);

  if (payload.attachment) {
    formData.append("attachment", payload.attachment);
  }

  return postFormData("/api/query", formData);
}
