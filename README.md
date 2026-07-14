# Vértice App

The full Vértice Criativo platform — **one repo, two apps** (the vault's Option A: public front + `/admin`).

```
Vertice APP/
├── apps/
│   ├── web/   → public marketing site (Vite · React · TS · Tailwind · Framer Motion)
│   └── api/   → GoBoiler backend + /admin SPA (Bun · Hono · Better Auth · Drizzle · Postgres · Stripe · Resend · viem · SIWE)
└── package.json  → convenience scripts (no workspace hoisting — web=npm/Vite, api=bun)
```

## Architecture

- **`apps/web`** — the marketing shell (Hero · work marquee · services · flagship · selected work · contact). Fast/static; talks to the API only for the contact form → leads.
- **`apps/api`** — GoBoiler: auth (Better Auth + **SIWE**), Stripe billing, Resend email, S3 storage, AI Skills + MCP registry, jobs/cron, audit log, and the React admin panel at `/admin`. The complete admin system.
- **Database** — self-hosted **Supabase = Postgres** (Coolify/NAS) under Drizzle. (Better Auth is the auth layer; Supabase is used purely as the DB.)
- **Host** — Coolify on the NAS. i18n: PT for PT IPs, EN otherwise.

## Dev

```bash
# one-time
npm run install:web && npm run install:api
cp apps/api/.env.example apps/api/.env   # fill DB / Stripe / Resend / RPC

# run
npm run dev:web    # Vite front  (:5173)
npm run dev:api    # GoBoiler API (bun --watch)
```

## Roadmap (plug-in order)
1. **Leads seam** — `apps/web` contact form → GoBoiler `leads` endpoint (inbox in /admin).
2. **Admin auth** — SIWE wallet login for the operator.
3. **Orçamento generator** — pass-through +20% → PDF via Resend (from the vault template).
4. **Billing** — Stripe for clock-in.pt + product subscriptions.
5. **Products / Crypto-AI** — clock-in remake, push service, commercial MCPs, attested agents all plug into the same auth/billing/AI substrate.

> Front source of truth lives here now (migrated from the `~/vertice-site` prototype).
