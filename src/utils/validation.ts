import { z } from "zod";

const phoneRegex = /^[+]?[\d\s-]{7,15}$/;

export const bookingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  contactNumber: z
    .string()
    .min(7, "Valid contact number is required")
    .regex(phoneRegex, "Enter a valid phone number"),
  message: z.string().optional(),
});

export const querySchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  contactNumber: z
    .string()
    .min(7, "Valid contact number is required")
    .regex(phoneRegex, "Enter a valid phone number"),
  query: z.string().min(10, "Please describe your query (min 10 characters)"),
});

export const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export function validateFile(
  file: File | undefined,
  required = false,
): string | true {
  if (!file || file.size === 0) {
    return required ? "File is required" : true;
  }
  if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
    return "Only JPG, PNG, or PDF files are allowed";
  }
  if (file.size > MAX_FILE_SIZE) {
    return "File must be smaller than 5 MB";
  }
  return true;
}
