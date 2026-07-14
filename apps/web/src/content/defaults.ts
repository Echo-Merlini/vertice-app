// Unified card shape for both the Work marquee/stack and the Services list.
export type Card = {
  slug: string;            // anchor target, e.g. "work-01" / "services"
  n: string;               // display index "01"
  category?: string;       // eyebrow (work cards)
  name: string;
  body: string;            // outcome / description
  tags: string[];
  accent?: string;         // glow / tint color (#hex)
  href?: string;
  image?: string;          // thumbnail / hero image path (/uploads/…)
};

// Full detail record for a work card's dedicated page (GET /content/work/:slug).
export type CardDetail = Card & {
  section: string;
  detail: string;          // long description (blank-line separated paragraphs)
  gallery: string[];       // image paths
  year?: string;
  role?: string;
};

export type SiteContent = {
  cards: { work: Card[]; services: Card[] };
  text: Record<string, string>;
};

// Defaults mirror what the API seeds — used for first paint and as an offline
// fallback so the site never renders blank if the API is unreachable.
export const DEFAULT_CONTENT: SiteContent = {
  cards: {
    work: [
      { slug: "work-01", n: "01", category: "Events", name: "Turnkey Live Production",
        body: "Venue secured, crew and gear assembled, sound·AV·staging·lighting delivered end to end — the client walks in to a finished show.",
        tags: ["Venue sourcing", "FOH", "Staging", "Lighting"], accent: "#A15E1E" },
      { slug: "work-02", n: "02", category: "Broadcast", name: "Broadcast Audio",
        body: "15+ years of live and broadcast sound — FOH, mastering and TV audio delivered to air, on schedule, at broadcast standard.",
        tags: ["Live sound", "Mastering", "TV / broadcast"], accent: "#5C616D" },
      { slug: "work-03", n: "03", category: "On-chain AI", name: "Attested Agents",
        body: "Autonomous on-chain AI agents whose every verdict recomputes from public data — verification over trust, on infrastructure we own.",
        tags: ["Recompute Kit", "ERC-8004", "MCPs", "CCIP"], accent: "#E0A24C" },
    ],
    services: [
      { slug: "services", n: "01", name: "Technical AV",
        body: "Billable AV & engineering from a bench of senior technicians on call — FOH, mastering, broadcast. We put a roster on the job, not one name.",
        tags: ["FOH", "Mastering", "Broadcast", "Training"] },
      { slug: "events", n: "02", name: "Turnkey Events",
        body: "From venue to final bow. Top-tier venues secured through 20+ years of relationships, assembled with a partner-equipment network — end to end.",
        tags: ["Venues", "Production", "Staging", "Lighting"] },
      { slug: "products", n: "03", name: "Products",
        body: "Productized software with recurring revenue — clock-in.pt, PWA Push, commercial MCPs, n8n automation — plus bespoke builds for clients.",
        tags: ["SaaS", "MCPs", "Automation", "Bespoke"] },
      { slug: "crypto", n: "04", name: "On-chain AI",
        body: "Verifiable, recomputable on-chain AI — the Recompute Kit, attested autonomous agents, specialized MCPs, and A2A micro-payments.",
        tags: ["Recompute Kit", "Agents", "CCIP", "A2A"] },
    ],
  },
  text: {
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
    "services.heading1": "Four disciplines,",
    "services.heading2": "one vértice.",
    "services.sub": "Commercial products and technical services, delivered on infrastructure we own.",
    "contact.heading1": "Let's build something",
    "contact.heading2": "that verifies itself.",
    "contact.sub": "A stage to run, a product to ship, an agent to prove — start here.",
    "contact.form.name": "Your name",
    "contact.form.email": "Email",
    "contact.form.message": "What are you building?",
    "contact.form.submit": "Start a project",
    "contact.form.sending": "Sending…",
    "contact.form.thanks": "Thanks",
    "contact.form.thanksSub": "We'll be in touch shortly.",
    "contact.form.error": "Couldn't send — try again, or email us directly below.",
  },
};
