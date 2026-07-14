# GoBoiler API — mirrors the proven ens-boiler gateway pattern:
# bun install happens at IMAGE-BUILD time (bun's installer works in docker build
# on this host, and respects bun.lock → correct pinned deps incl better-auth 1.2.x).
FROM oven/bun:1 AS base
WORKDIR /app

# install deps from the lockfile first (cached layer)
COPY package.json bun.lock ./
RUN bun install

# app source (node_modules / .env excluded via .dockerignore)
COPY . .

# build the admin SPA bundle (admin/app.tsx -> public/admin/app.js); the server
# serves this static file, so it must exist in the image or /admin/app.js 500s.
RUN bun run admin:build

EXPOSE 3000
CMD ["bun", "run", "src/index.ts"]
