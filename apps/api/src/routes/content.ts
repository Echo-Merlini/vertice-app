import { Hono } from "hono";
import { db } from "@/db/client";
import { contentCard, siteText } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export const contentRoutes = new Hono();

// Public: the marketing front fetches this once on load to hydrate cards + text.
// Returns only visible cards, grouped by section and ordered; text as a flat map.
contentRoutes.get("/", async (c) => {
  const [cards, texts] = await Promise.all([
    db.select().from(contentCard).where(eq(contentCard.visible, true)).orderBy(asc(contentCard.sortOrder)),
    db.select().from(siteText),
  ]);

  const shape = (r: typeof cards[number]) => ({
    slug: r.slug,
    n: r.n,
    category: r.category ?? undefined,
    name: r.name,
    body: r.body,
    tags: safeTags(r.tags),
    accent: r.accent ?? undefined,
    href: r.href ?? undefined,
    image: r.image ?? undefined,
  });

  const text: Record<string, string> = {};
  for (const t of texts) text[t.key] = t.value;

  return c.json({
    cards: {
      work: cards.filter(r => r.section === "work").map(shape),
      services: cards.filter(r => r.section === "services").map(shape),
    },
    text,
  });
});

// Public: full detail record for a single work card's dedicated page.
contentRoutes.get("/work/:slug", async (c) => {
  const slug = c.req.param("slug");
  const [r] = await db.select().from(contentCard).where(eq(contentCard.slug, slug)).limit(1);
  if (!r || !r.visible) return c.json({ error: "Not found" }, 404);
  return c.json({
    slug: r.slug,
    section: r.section,
    n: r.n,
    category: r.category ?? undefined,
    name: r.name,
    body: r.body,
    detail: r.detail,
    tags: safeTags(r.tags),
    accent: r.accent ?? undefined,
    href: r.href ?? undefined,
    image: r.image ?? undefined,
    gallery: safeTags(r.gallery),
    year: r.year ?? undefined,
    role: r.role ?? undefined,
  });
});

function safeTags(raw: string): string[] {
  try { const v = JSON.parse(raw); return Array.isArray(v) ? v.map(String) : []; }
  catch { return []; }
}
