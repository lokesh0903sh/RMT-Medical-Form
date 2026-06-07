import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/cloudflare-pages";
import {
  escapeHtml,
  sendTelegramDocument,
  sendTelegramMessage,
} from "../telegram";
import type { Env } from "../env";

const app = new Hono<{ Bindings: Env }>();

app.use("/api/*", cors());

app.post("/api/booking", async (c) => {
  const token = c.env.TELEGRAM_BOT_TOKEN;
  const chatId = c.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return c.json({ error: "Telegram is not configured on the server." }, 500);
  }

  try {
    const formData = await c.req.formData();
    const fullName = String(formData.get("fullName") ?? "").trim();
    const contactNumber = String(formData.get("contactNumber") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const prescription = formData.get("prescription");

    if (!fullName || !contactNumber) {
      return c.json({ error: "Please fill all required fields." }, 400);
    }

    const text = [
      "<b>New Medical Booking</b>",
      "",
      `<b>Name:</b> ${escapeHtml(fullName)}`,
      `<b>Phone:</b> ${escapeHtml(contactNumber)}`,
      `<b>Message:</b> ${escapeHtml(message || "—")}`,
    ].join("\n");

    await sendTelegramMessage(token, chatId, text);

    if (prescription instanceof File && prescription.size > 0) {
      await sendTelegramDocument(
        token,
        chatId,
        prescription,
        `Prescription — ${fullName}`,
      );
    }

    return c.json({ success: true });
  } catch (error) {
    console.error("Booking error:", error);
    return c.json({ error: "Failed to submit booking. Please try again." }, 500);
  }
});

app.post("/api/query", async (c) => {
  const token = c.env.TELEGRAM_BOT_TOKEN;
  const chatId = c.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return c.json({ error: "Telegram is not configured on the server." }, 500);
  }

  try {
    const formData = await c.req.formData();
    const fullName = String(formData.get("fullName") ?? "").trim();
    const contactNumber = String(formData.get("contactNumber") ?? "").trim();
    const query = String(formData.get("query") ?? "").trim();
    const attachment = formData.get("attachment");

    if (!fullName || !contactNumber || !query) {
      return c.json({ error: "Please fill all required fields." }, 400);
    }

    const text = [
      "<b>New Medical Query</b>",
      "",
      `<b>Name:</b> ${escapeHtml(fullName)}`,
      `<b>Phone:</b> ${escapeHtml(contactNumber)}`,
      `<b>Query:</b> ${escapeHtml(query)}`,
    ].join("\n");

    await sendTelegramMessage(token, chatId, text);

    if (attachment instanceof File && attachment.size > 0) {
      await sendTelegramDocument(
        token,
        chatId,
        attachment,
        `Query attachment — ${fullName}`,
      );
    }

    return c.json({ success: true });
  } catch (error) {
    console.error("Query error:", error);
    return c.json({ error: "Failed to submit query. Please try again." }, 500);
  }
});

export const onRequest = handle(app);
