import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "@/db/client";
import { subscriber, newsletter, siteText } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { nanoid } from "@/lib/utils";

export const newsRoutes = new Hono();

async function getText(key: string): Promise<string> {
  const [r] = await db.select().from(siteText).where(eq(siteText.key, key)).limit(1);
  return r?.value ?? "";
}

// ── Public: subscribe to the newsletter ──
newsRoutes.post(
  "/subscribe",
  zValidator("json", z.object({ email: z.string().email().max(200), lang: z.enum(["en", "pt"]).optional() })),
  async (c) => {
    const { email, lang } = c.req.valid("json");
    await db.insert(subscriber)
      .values({ id: nanoid(), email: email.trim().toLowerCase(), lang: lang ?? "en", source: "news" })
      .onConflictDoUpdate({ target: subscriber.email, set: { status: "active", lang: lang ?? "en" } });
    return c.json({ ok: true });
  }
);

// ── Public: latest sent issues (for the News page) ──
newsRoutes.get("/latest", async (c) => {
  const rows = await db.select().from(newsletter).where(eq(newsletter.status, "sent")).orderBy(desc(newsletter.sentAt)).limit(20);
  return c.json(rows.map(n => ({
    id: n.id, subject: n.subject, excerpt: n.excerpt ?? "", body: n.body, lang: n.lang, sentAt: n.sentAt,
  })));
});

// ── Public: proxy + parse the externally-configured RSS feed ──
newsRoutes.get("/rss-external", async (c) => {
  const url = (await getText("news.rssUrl")).trim();
  const title = (await getText("news.rssTitle")).trim();
  if (!url) return c.json({ url: "", title, items: [] });
  try {
    const res = await fetch(url, { headers: { "User-Agent": "VerticeBot/1.0" }, signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    const xml = await res.text();
    return c.json({ url, title, items: parseFeed(xml).slice(0, 12) });
  } catch (e: any) {
    return c.json({ url, title, items: [], error: e.message });
  }
});

// ── Public: our own RSS feed, built from sent newsletters ──
newsRoutes.get("/feed.xml", async (c) => {
  const site = process.env.APP_URL ?? "";
  const rows = await db.select().from(newsletter).where(eq(newsletter.status, "sent")).orderBy(desc(newsletter.sentAt)).limit(30);
  const items = rows.map(n => `    <item>
      <title>${esc(n.subject)}</title>
      <description>${esc(n.excerpt || stripTags(n.body).slice(0, 400))}</description>
      <pubDate>${(n.sentAt ?? n.createdAt).toUTCString?.() ?? new Date(n.sentAt ?? n.createdAt as any).toUTCString()}</pubDate>
      <guid isPermaLink="false">${n.id}</guid>
    </item>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Vértice Criativo — News</title>
    <link>${esc(site)}/news</link>
    <description>Newsletters and updates from Vértice Criativo.</description>
${items}
  </channel>
</rss>`;
  return c.body(xml, 200, { "Content-Type": "application/rss+xml; charset=utf-8" });
});

// ── minimal RSS / Atom parser (no deps) ──
function parseFeed(xml: string) {
  const blocks = matchAll(xml, /<(item|entry)\b[\s\S]*?<\/\1>/gi);
  return blocks.map(b => {
    const title = stripTags(tag(b, "title"));
    let link = tag(b, "link");
    const href = /<link[^>]*href="([^"]+)"/i.exec(b);          // Atom
    if ((!link || /</.test(link)) && href) link = href[1];
    const date = tag(b, "pubDate") || tag(b, "updated") || tag(b, "published") || tag(b, "dc:date");
    const desc = stripTags(tag(b, "description") || tag(b, "summary") || tag(b, "content"));
    return { title: title.trim(), link: (link || "").trim(), date: date.trim(), excerpt: desc.trim().slice(0, 240) };
  }).filter(i => i.title);
}
function tag(s: string, name: string): string {
  const m = new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)</${name}>`, "i").exec(s);
  return m ? uncdata(m[1]) : "";
}
function matchAll(s: string, re: RegExp): string[] { const out: string[] = []; let m; while ((m = re.exec(s))) out.push(m[0]); return out; }
function uncdata(s: string): string { return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1"); }
function stripTags(s: string): string { return uncdata(s).replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ").trim(); }
function esc(s: string): string { return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
