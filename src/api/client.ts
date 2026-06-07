export async function postFormData(
  endpoint: string,
  formData: FormData,
): Promise<{ success?: boolean; error?: string }> {
  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  const data = (await response.json().catch(() => ({}))) as {
    success?: boolean;
    error?: string;
  };

  if (!response.ok) {
    throw new Error(data.error ?? "Something went wrong. Please try again.");
  }

  return data;
}
