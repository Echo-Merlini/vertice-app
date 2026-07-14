import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "@/db/client";
import { lead } from "@/db/schema";
import { nanoid } from "@/lib/utils";

export const leadRoutes = new Hono();

// Public: the marketing site's contact form posts here (rate-limited in index.ts).
leadRoutes.post(
  "/",
  zValidator(
    "json",
    z.object({
      name: z.string().min(1).max(120),
      email: z.string().email().max(200),
      message: z.string().max(4000).optional(),
      source: z.string().max(60).optional(),
    })
  ),
  async (c) => {
    const b = c.req.valid("json");
    const meta = JSON.stringify({
      ip: c.req.header("x-forwarded-for") ?? null,
      ua: c.req.header("user-agent") ?? null,
      referer: c.req.header("referer") ?? null,
    });
    await db.insert(lead).values({
      id: nanoid(),
      name: b.name.trim(),
      email: b.email.trim().toLowerCase(),
      message: b.message?.trim() || null,
      source: b.source?.trim() || "website",
      meta,
    });
    return c.json({ ok: true });
  }
);
