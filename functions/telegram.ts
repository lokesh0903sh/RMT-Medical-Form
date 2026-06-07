const TELEGRAM_API = "https://api.telegram.org/bot";

export async function sendTelegramMessage(
  token: string,
  chatId: string,
  text: string,
): Promise<void> {
  const response = await fetch(`${TELEGRAM_API}${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram sendMessage failed: ${body}`);
  }
}

export async function sendTelegramDocument(
  token: string,
  chatId: string,
  file: File,
  caption?: string,
): Promise<void> {
  const formData = new FormData();
  formData.append("chat_id", chatId);
  formData.append("document", file, file.name);
  if (caption) {
    formData.append("caption", caption);
  }

  const response = await fetch(`${TELEGRAM_API}${token}/sendDocument`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram sendDocument failed: ${body}`);
  }
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
