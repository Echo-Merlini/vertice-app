import { Hono } from "hono";
import { db } from "@/db/client";
import { contentCard, siteText } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export const contentRoutes = new Hono();

type Row = typeof contentCard.$inferSelect;

function parseJson<T>(raw: string | null | undefined, fallback: T): T {
  try { const v = JSON.parse(raw ?? ""); return v ?? fallback; } catch { return fallback; }
}
function safeTags(raw: string | null | undefined): string[] {
  const v = parseJson<unknown>(raw, []);
  return Array.isArray(v) ? v.map(String) : [];
}

// Overlay Portuguese fields from row.i18n.pt onto the EN row, per-field fallback.
function pick(row: Row, lang: string) {
  const t = lang === "pt" ? (parseJson<Record<string, any>>(row.i18n, {}).pt ?? {}) : {};
  const g = (en: string | null, k: string) => (t[k] != null && String(t[k]) !== "" ? String(t[k]) : (en ?? undefined));
  const tags = Array.isArray(t.tags) && t.tags.length ? t.tags.map(String) : safeTags(row.tags);
  return {
    slug: row.slug,
    n: row.n,
    category: g(row.category, "category"),
    name: g(row.name, "name") ?? row.name,
    body: g(row.body, "body") ?? row.body,
    tags,
    accent: row.accent ?? undefined,
    href: row.href ?? undefined,
    image: row.image ?? undefined,
  };
}

// Public: the marketing front hydrates from this. ?lang=pt overlays PT.
contentRoutes.get("/", async (c) => {
  const lang = c.req.query("lang") === "pt" ? "pt" : "en";
  const [cards, texts] = await Promise.all([
    db.select().from(contentCard).where(eq(contentCard.visible, true)).orderBy(asc(contentCard.sortOrder)),
    db.select().from(siteText),
  ]);

  const text: Record<string, string> = {};
  for (const t of texts) text[t.key] = lang === "pt" && t.valuePt?.trim() ? t.valuePt : t.value;

  return c.json({
    lang,
    cards: {
      work: cards.filter(r => r.section === "work").map(r => pick(r, lang)),
      services: cards.filter(r => r.section === "services").map(r => pick(r, lang)),
    },
    text,
  });
});

// Public: full detail record for a single work card's dedicated page.
contentRoutes.get("/work/:slug", async (c) => {
  const lang = c.req.query("lang") === "pt" ? "pt" : "en";
  const slug = c.req.param("slug");
  const [r] = await db.select().from(contentCard).where(eq(contentCard.slug, slug)).limit(1);
  if (!r || !r.visible) return c.json({ error: "Not found" }, 404);
  const base = pick(r, lang);
  const t = lang === "pt" ? (parseJson<Record<string, any>>(r.i18n, {}).pt ?? {}) : {};
  const gv = (en: string | null, k: string) => (t[k] != null && String(t[k]) !== "" ? String(t[k]) : (en ?? undefined));
  return c.json({
    ...base,
    section: r.section,
    detail: t.detail != null && String(t.detail) !== "" ? String(t.detail) : r.detail,
    gallery: safeTags(r.gallery),
    year: gv(r.year, "year"),
    role: gv(r.role, "role"),
  });
});
