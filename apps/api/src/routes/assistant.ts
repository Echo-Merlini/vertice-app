import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "@/db/client";
import { siteText } from "@/db/schema";
import { eq } from "drizzle-orm";

export const assistantRoutes = new Hono();

// Shown until the real assistant is configured.
const FALLBACK =
  "I'm still being trained on the full Vértice knowledge base — that goes live soon. " +
  "Meanwhile, drop your question in the contact form below and we'll get right back to you.";

// Public: the marketing site's "Ask Vértice" chat box posts here.
// PREVIEW STAGE — returns a configurable canned reply (editable in /admin →
// Content → Site Text, key `assistant.reply`). The real Vértice-trained
// assistant (LLM + knowledge base over services/products/on-chain AI) plugs in
// right here later; the request/response shape is already the final one.
assistantRoutes.post(
  "/chat",
  zValidator(
    "json",
    z.object({
      message: z.string().min(1).max(2000),
      lang: z.enum(["en", "pt"]).optional(),
      history: z
        .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(4000) }))
        .max(20)
        .optional(),
    })
  ),
  async (c) => {
    const { lang } = c.req.valid("json");
    const [row] = await db.select().from(siteText).where(eq(siteText.key, "assistant.reply")).limit(1);
    const reply = (lang === "pt" && row?.valuePt?.trim()) || row?.value?.trim() || FALLBACK;
    return c.json({ reply, stage: "preview" });
  }
);
