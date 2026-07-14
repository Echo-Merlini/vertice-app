import { db } from "@/db/client";
import { contentCard, siteText } from "@/db/schema";
import { count } from "drizzle-orm";
import { nanoid } from "@/lib/utils";

// Default marketing content — mirrors the hardcoded values the front shipped
// with, so seeding on first boot leaves the site visually identical until an
// admin edits it from /admin → Content.

type CardSeed = {
  section: "work" | "services";
  slug: string; n: string; category?: string; name: string; body: string;
  tags: string[]; accent?: string; href?: string;
};

export const DEFAULT_CARDS: CardSeed[] = [
  // ── Work / selected-work cards ───────────────────────────
  { section: "work", slug: "work-01", n: "01", category: "Events", name: "Turnkey Live Production",
    body: "Venue secured, crew and gear assembled, sound·AV·staging·lighting delivered end to end — the client walks in to a finished show.",
    tags: ["Venue sourcing", "FOH", "Staging", "Lighting"], accent: "#A15E1E" },
  { section: "work", slug: "work-02", n: "02", category: "Broadcast", name: "Broadcast Audio",
    body: "15+ years of live and broadcast sound — FOH, mastering and TV audio delivered to air, on schedule, at broadcast standard.",
    tags: ["Live sound", "Mastering", "TV / broadcast"], accent: "#5C616D" },
  { section: "work", slug: "work-03", n: "03", category: "On-chain AI", name: "Attested Agents",
    body: "Autonomous on-chain AI agents whose every verdict recomputes from public data — verification over trust, on infrastructure we own.",
    tags: ["Recompute Kit", "ERC-8004", "MCPs", "CCIP"], accent: "#E0A24C" },

  // ── Services (the four disciplines) ──────────────────────
  { section: "services", slug: "services", n: "01", name: "Technical AV",
    body: "Billable AV & engineering from a bench of senior technicians on call — FOH, mastering, broadcast. We put a roster on the job, not one name.",
    tags: ["FOH", "Mastering", "Broadcast", "Training"] },
  { section: "services", slug: "events", n: "02", name: "Turnkey Events",
    body: "From venue to final bow. Top-tier venues secured through 20+ years of relationships, assembled with a partner-equipment network — end to end.",
    tags: ["Venues", "Production", "Staging", "Lighting"] },
  { section: "services", slug: "products", n: "03", name: "Products",
    body: "Productized software with recurring revenue — clock-in.pt, PWA Push, commercial MCPs, n8n automation — plus bespoke builds for clients.",
    tags: ["SaaS", "MCPs", "Automation", "Bespoke"] },
  { section: "services", slug: "crypto", n: "04", name: "On-chain AI",
    body: "Verifiable, recomputable on-chain AI — the Recompute Kit, attested autonomous agents, specialized MCPs, and A2A micro-payments.",
    tags: ["Recompute Kit", "Agents", "CCIP", "A2A"] },
];

export const DEFAULT_TEXT: Record<string, string> = {
  "hero.title1": "Vértice",
  "hero.title2": "Criativo",
  "hero.taglinePre": "Don't trust.",
  "hero.taglineAccent": "Recompute.",
  "hero.eyebrow": "Technical AV · Turnkey Events · Products · On-chain AI",
  "hero.cta": "Start a project",
  "assistant.heading": "AI, built the Vértice way",
  "assistant.sub": "Verifiable assistants — trained on what we build.",
  "assistant.description": "We design and deploy AI assistants and agents for real businesses — grounded in your own data, running on infrastructure you own. From customer-facing chat to on-chain AI whose every answer recomputes from public data, we build systems you can trust because you can check them.\n\nThe assistant on the left is our own, trained on everything Vértice. Ask it anything — or explore what we can build for you.",
  "assistant.linkLabel": "Explore our AI services",
  "assistant.linkUrl": "#services",
  "assistant.intro": "Hi — I'm the Vértice assistant. Ask me anything about what we do and how we work.",
  "assistant.placeholder": "Ask about Vértice…",
  "assistant.reply": "I'm still being trained on the full Vértice knowledge base — that goes live soon. Meanwhile, drop your question in the contact form below and we'll get right back to you.",
  "services.heading1": "Four disciplines,",
  "services.heading2": "one vértice.",
  "services.sub": "Commercial products and technical services, delivered on infrastructure we own.",
  "contact.heading1": "Let's build something",
  "contact.heading2": "that verifies itself.",
  "contact.sub": "A stage to run, a product to ship, an agent to prove — start here.",
};

/** Idempotent: only seeds when the tables are empty. */
export async function seedContent() {
  const [{ total: cardCount }] = await db.select({ total: count() }).from(contentCard);
  if (cardCount === 0) {
    await db.insert(contentCard).values(
      DEFAULT_CARDS.map((c, i) => ({
        id: nanoid(),
        section: c.section,
        slug: c.slug,
        n: c.n,
        category: c.category ?? null,
        name: c.name,
        body: c.body,
        tags: JSON.stringify(c.tags),
        accent: c.accent ?? null,
        href: c.href ?? null,
        sortOrder: i,
        visible: true,
      }))
    );
    console.log(`✓ Seeded ${DEFAULT_CARDS.length} content cards`);
  }

  // Insert any missing default text keys without overwriting edited values —
  // so new keys shipped in a later release appear automatically on boot.
  let added = 0;
  for (const [key, value] of Object.entries(DEFAULT_TEXT)) {
    const res = await db.insert(siteText).values({ key, value }).onConflictDoNothing({ target: siteText.key });
    if ((res as any).rowCount ?? 0) added++;
  }
  if (added) console.log(`✓ Seeded ${added} new site-text entrie(s)`);
}
